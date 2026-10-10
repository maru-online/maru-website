/**
 * GET /api/cron/assessment-retention — the Exposure Check's 12-month rule
 * (privacy policy section 5, agreed by Jimmy 8 Oct 2026).
 *
 * Deletes Exposure Check results (operations_reports rows, including the
 * generated report) once a person's most recent check is older than
 * ASSESSMENT_RETENTION_MONTHS. The report link stops working with the row.
 *
 * The policy exempts people who have become clients. The site holds no client
 * record, so list their addresses (comma-separated) in the RETENTION_KEEP_EMAILS
 * environment variable, or pass `?keep=a@x.com,b@y.com` on a manual run.
 *
 * Brevo: if the person is on any list other than 21 (Assessment Leads), for
 * example the guide notes, they are only removed from list 21. If list 21 is
 * their only list, the contact is deleted.
 *
 * Order of work: Brevo first, then the database. A person's rows are deleted
 * only once their Brevo step has succeeded (or Brevo is not in play). If Brevo
 * fails, their rows are kept and the next monthly run retries them, so a Brevo
 * outage can never leave a contact behind with no database row to find it by.
 *
 * Safe by default:
 *   - Requires `Authorization: Bearer $CRON_SECRET`; with no secret set it
 *     refuses every call.
 *   - Dry run unless `?apply=1`: reports what it would delete, including the
 *     addresses (dry run only), so they can be checked against the client list.
 *   - Brevo is touched only in production.
 *   - Scheduled monthly in vercel.json with `?apply=1`. Vercel sends
 *     CRON_SECRET as the bearer token, so nothing runs until Jimmy sets it.
 *     Run a manual dry run (no `apply`) before setting it.
 */

import { NextRequest, NextResponse } from "next/server";
import { inArray, sql } from "drizzle-orm";
import { dbLeadEngine } from "@/lib/db";
import { operationsReports } from "@/lib/db/schema/lead-engine";

export const dynamic = "force-dynamic";

const ASSESSMENT_RETENTION_MONTHS = 12;
const BREVO_ASSESSMENT_LIST_ID = 21;

async function brevo(path: string, init: RequestInit & { key: string }) {
  const { key, ...rest } = init;
  return fetch(`https://api.brevo.com/v3${path}`, {
    ...rest,
    headers: { "api-key": key, "content-type": "application/json", ...(rest.headers ?? {}) },
  });
}

type BrevoOutcome = "removed" | "deleted" | "none" | "failed";

/** Takes one person out of Brevo: off list 21 only, or the whole contact if 21 is their only list. */
async function clearBrevo(email: string, key: string): Promise<BrevoOutcome> {
  const id = encodeURIComponent(email);
  const info = await brevo(`/contacts/${id}?identifierType=email_id`, { key, method: "GET" });
  if (info.status === 404) return "none";
  if (!info.ok) {
    console.error("assessment retention: Brevo lookup failed", { status: info.status });
    return "failed";
  }
  const contact = (await info.json()) as { listIds?: number[] };
  const lists = contact.listIds ?? [];
  if (lists.filter((l) => l !== BREVO_ASSESSMENT_LIST_ID).length > 0) {
    if (!lists.includes(BREVO_ASSESSMENT_LIST_ID)) return "none";
    const res = await brevo(`/contacts/lists/${BREVO_ASSESSMENT_LIST_ID}/contacts/remove`, {
      key,
      method: "POST",
      body: JSON.stringify({ emails: [email] }),
    });
    if (res.ok) return "removed";
    console.error("assessment retention: Brevo list removal failed", { status: res.status });
    return "failed";
  }
  const res = await brevo(`/contacts/${id}?identifierType=email_id`, { key, method: "DELETE" });
  if (res.ok || res.status === 404) return "deleted";
  console.error("assessment retention: Brevo delete failed", { status: res.status });
  return "failed";
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }
  const apply = req.nextUrl.searchParams.get("apply") === "1";
  const keep = new Set(
    [req.nextUrl.searchParams.get("keep") ?? "", process.env.RETENTION_KEEP_EMAILS ?? ""]
      .join(",")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );

  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - ASSESSMENT_RETENTION_MONTHS);

  // People whose most recent check is older than the cutoff. A newer check
  // restarts their clock, so all of their rows are kept.
  const lowerEmail = sql<string>`lower(${operationsReports.email})`;
  const rows = await dbLeadEngine
    .select({ email: lowerEmail })
    .from(operationsReports)
    .groupBy(lowerEmail)
    .having(sql`max(${operationsReports.createdAt}) < ${cutoff.toISOString()}::timestamptz`);
  const emails = rows.map((r) => r.email).filter((e) => !keep.has(e));

  if (!apply || emails.length === 0) {
    return NextResponse.json({
      dryRun: !apply,
      cutoff,
      count: emails.length,
      kept: keep.size,
      // Dry run only: who would be deleted, to check against the client list.
      ...(!apply ? { wouldDelete: emails } : {}),
    });
  }

  const key = (process.env.BREVO_API_KEY ?? "").trim();
  const useBrevo = Boolean(key) && process.env.VERCEL_ENV === "production";
  let brevoRemoved = 0;
  let brevoDeleted = 0;
  let brevoFailed = 0;

  // Brevo first. Only people whose Brevo step succeeded (or was not needed)
  // have their rows deleted; failures are retried on the next run.
  const deletable: string[] = [];
  for (const email of emails) {
    if (!useBrevo) {
      deletable.push(email);
      continue;
    }
    const outcome = await clearBrevo(email, key);
    if (outcome === "failed") {
      brevoFailed++;
      continue;
    }
    if (outcome === "removed") brevoRemoved++;
    if (outcome === "deleted") brevoDeleted++;
    deletable.push(email);
  }

  if (deletable.length > 0) {
    await dbLeadEngine.delete(operationsReports).where(inArray(lowerEmail, deletable));
  }

  console.log("assessment retention applied", {
    count: deletable.length,
    retryNextRun: brevoFailed,
    brevoRemoved,
    brevoDeleted,
  });
  return NextResponse.json({
    dryRun: false,
    cutoff,
    count: deletable.length,
    retryNextRun: brevoFailed,
    brevoRemoved,
    brevoDeleted,
  });
}
