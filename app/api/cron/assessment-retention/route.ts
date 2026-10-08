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
 * Safe by default:
 *   - Requires `Authorization: Bearer $CRON_SECRET`; with no secret set it
 *     refuses every call.
 *   - Dry run unless `?apply=1`: reports what it would delete.
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
    return NextResponse.json({ dryRun: !apply, cutoff, count: emails.length, kept: keep.size });
  }

  await dbLeadEngine.delete(operationsReports).where(inArray(lowerEmail, emails));

  const key = (process.env.BREVO_API_KEY ?? "").trim();
  let brevoRemoved = 0;
  let brevoDeleted = 0;
  let brevoFailed = 0;
  if (key && process.env.VERCEL_ENV === "production") {
    for (const email of emails) {
      const id = encodeURIComponent(email);
      const info = await brevo(`/contacts/${id}?identifierType=email_id`, { key, method: "GET" });
      if (info.status === 404) continue;
      if (!info.ok) {
        brevoFailed++;
        console.error("assessment retention: Brevo lookup failed", { status: info.status });
        continue;
      }
      const contact = (await info.json()) as { listIds?: number[] };
      const lists = contact.listIds ?? [];
      if (lists.filter((l) => l !== BREVO_ASSESSMENT_LIST_ID).length > 0) {
        if (!lists.includes(BREVO_ASSESSMENT_LIST_ID)) continue;
        const res = await brevo(`/contacts/lists/${BREVO_ASSESSMENT_LIST_ID}/contacts/remove`, {
          key,
          method: "POST",
          body: JSON.stringify({ emails: [email] }),
        });
        if (res.ok) brevoRemoved++;
        else {
          brevoFailed++;
          console.error("assessment retention: Brevo list removal failed", { status: res.status });
        }
      } else {
        const res = await brevo(`/contacts/${id}?identifierType=email_id`, { key, method: "DELETE" });
        if (res.ok || res.status === 404) brevoDeleted++;
        else {
          brevoFailed++;
          console.error("assessment retention: Brevo delete failed", { status: res.status });
        }
      }
    }
  }

  console.log("assessment retention applied", { count: emails.length, brevoRemoved, brevoDeleted, brevoFailed });
  return NextResponse.json({ dryRun: false, cutoff, count: emails.length, brevoRemoved, brevoDeleted, brevoFailed });
}
