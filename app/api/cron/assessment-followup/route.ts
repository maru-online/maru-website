/**
 * GET /api/cron/assessment-followup — the one follow-up email, about two days
 * after a POPIA review report (owner decision, 6 Nov 2026).
 *
 * Who gets it: only people who ticked the follow-up box at the gate
 * (operations_reports.template.consent.followUp === true), once, between
 * MIN_AGE_HOURS and MAX_AGE_DAYS after their report. The upper bound means a
 * missed run or a late deploy never sends a stale "couple of days ago" email.
 * Addresses in RETENTION_KEEP_EMAILS (clients) are skipped.
 *
 * Sent at most once: the row is claimed first (template.followUp is set in a
 * single conditional UPDATE) and only then emailed. If the send fails the claim
 * is released, so the next daily run retries inside the window.
 *
 * Safe by default, like the retention jobs:
 *   - Needs `Authorization: Bearer $CRON_SECRET` (Vercel sends it); with no
 *     secret set it refuses every call.
 *   - Dry run unless `?apply=1`; sends only on production.
 *   - Needs BREVO_API_KEY. Sender: hello@maruonline.com, shown as
 *     FOLLOWUP_SENDER_NAME (default "Jimmy at Maru Online"); replies land there.
 */

import { NextRequest, NextResponse } from "next/server";
import { and, asc, eq, sql } from "drizzle-orm";
import { dbLeadEngine } from "@/lib/db";
import { operationsReports } from "@/lib/db/schema/lead-engine";
import { buildFollowUpEmail } from "@/lib/assessment/followUpEmail";

export const dynamic = "force-dynamic";

const MIN_AGE_HOURS = 46;
const MAX_AGE_DAYS = 5;
const BATCH = 50;

const followUpState = sql`${operationsReports.template} -> 'followUp'`;

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }
  const apply = req.nextUrl.searchParams.get("apply") === "1";
  const key = (process.env.BREVO_API_KEY ?? "").trim();
  const canSend = apply && Boolean(key) && process.env.VERCEL_ENV === "production";

  const keep = new Set(
    (process.env.RETENTION_KEEP_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean),
  );
  const now = Date.now();
  const newest = new Date(now - MIN_AGE_HOURS * 3_600_000).toISOString();
  const oldest = new Date(now - MAX_AGE_DAYS * 86_400_000).toISOString();

  const due = await dbLeadEngine
    .select({
      id: operationsReports.id,
      token: operationsReports.token,
      name: operationsReports.name,
      email: operationsReports.email,
      levelLabel: operationsReports.levelLabel,
    })
    .from(operationsReports)
    .where(
      and(
        sql`${operationsReports.createdAt} <= ${newest}::timestamptz`,
        sql`${operationsReports.createdAt} >= ${oldest}::timestamptz`,
        sql`${operationsReports.template} -> 'consent' ->> 'followUp' = 'true'`,
        sql`${followUpState} is null`,
      ),
    )
    .orderBy(asc(operationsReports.createdAt))
    .limit(BATCH);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://maruonline.com";
  const seen = new Set<string>();
  const result = { dryRun: !canSend, due: due.length, sent: 0, skipped: 0, failed: 0 };
  const wouldSend: string[] = [];

  for (const row of due) {
    const email = row.email.trim().toLowerCase();
    // One email per person, and none to clients.
    if (keep.has(email) || seen.has(email)) { result.skipped++; continue; }
    seen.add(email);
    // Someone who already had their follow-up on an earlier report.
    const earlier = await dbLeadEngine
      .select({ id: operationsReports.id })
      .from(operationsReports)
      .where(and(sql`lower(${operationsReports.email}) = ${email}`, sql`${followUpState} is not null`))
      .limit(1);
    if (earlier.length > 0) { result.skipped++; continue; }

    if (!canSend) { wouldSend.push(email); continue; }

    // Claim, then send.
    const claimed = await dbLeadEngine
      .update(operationsReports)
      .set({ template: sql`jsonb_set(${operationsReports.template}, '{followUp}', ${JSON.stringify({ claimedAt: new Date().toISOString() })}::jsonb)` })
      .where(and(eq(operationsReports.id, row.id), sql`${followUpState} is null`))
      .returning({ id: operationsReports.id });
    if (claimed.length === 0) { result.skipped++; continue; }

    try {
      const mail = buildFollowUpEmail({
        name: row.name,
        levelLabel: row.levelLabel,
        reportUrl: `${baseUrl}/report/${row.token}`,
      });
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": key },
        body: JSON.stringify({
          sender: { name: process.env.FOLLOWUP_SENDER_NAME || "Jimmy at Maru Online", email: "hello@maruonline.com" },
          replyTo: { email: "hello@maruonline.com" },
          to: [{ email: row.email, name: row.name }],
          subject: mail.subject,
          htmlContent: mail.htmlContent,
          textContent: mail.textContent,
          tags: ["assessment-followup"],
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`Brevo ${res.status}`);
      await dbLeadEngine
        .update(operationsReports)
        .set({ template: sql`jsonb_set(${operationsReports.template}, '{followUp}', ${JSON.stringify({ sentAt: new Date().toISOString() })}::jsonb)` })
        .where(eq(operationsReports.id, row.id));
      result.sent++;
    } catch (err) {
      console.error("assessment follow-up failed", { id: row.id, err: String(err) });
      // Release the claim so tomorrow's run retries inside the window.
      await dbLeadEngine
        .update(operationsReports)
        .set({ template: sql`${operationsReports.template} - 'followUp'` })
        .where(eq(operationsReports.id, row.id))
        .catch((e) => console.error("follow-up claim release failed", e));
      result.failed++;
    }
  }

  console.log("assessment follow-up run", result);
  return NextResponse.json({ ...result, ...(canSend ? {} : { wouldSend }) });
}
