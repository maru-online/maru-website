/**
 * GET /api/cron/guide-retention — the guide's 12-month retention rule
 * (copy handover entry 19 §8, default (b) decided 8 Oct 2026).
 *
 * Deletes guide requesters older than GUIDE_RETENTION_MONTHS who never
 * confirmed the notes subscription and never took the Exposure Check.
 * Entry 19 also exempts people who "have become a customer"; the site holds
 * no customer record, so that exemption is Jimmy's to apply by hand.
 *
 * Safe by default:
 *   - NOT scheduled in vercel.json. Run it by hand, or schedule it once the
 *     privacy policy states the period.
 *   - Requires `Authorization: Bearer $CRON_SECRET`; with no secret set it
 *     refuses every call.
 *   - Dry run unless `?apply=1`: reports what it would delete.
 */

import { NextRequest, NextResponse } from "next/server";
import { and, inArray, isNull, lt, sql } from "drizzle-orm";
import { dbLeadEngine } from "@/lib/db";
import { guideRequests, operationsReports } from "@/lib/db/schema/lead-engine";
import { GUIDE_RETENTION_MONTHS } from "@/lib/guides/config";

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }
  const apply = req.nextUrl.searchParams.get("apply") === "1";

  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - GUIDE_RETENTION_MONTHS);

  // Never confirmed notes, older than the cutoff, and no POPIA AI check on record.
  const candidates = await dbLeadEngine
    .select({ email: guideRequests.email })
    .from(guideRequests)
    .where(
      and(
        lt(guideRequests.createdAt, cutoff),
        isNull(guideRequests.marketingConfirmedAt),
        sql`not exists (select 1 from ${operationsReports} r where lower(r.email) = ${guideRequests.email})`,
        // A confirmed subscription on ANY of their requests keeps them.
        sql`not exists (select 1 from ${guideRequests} g3 where g3.email = ${guideRequests.email} and g3.marketing_confirmed_at is not null)`,
        // A newer request from the same person restarts their clock.
        sql`not exists (select 1 from ${guideRequests} g2 where g2.email = ${guideRequests.email} and g2.created_at >= ${cutoff})`,
      ),
    );
  const emails = [...new Set(candidates.map((c) => c.email))];

  if (!apply || emails.length === 0) {
    return NextResponse.json({ dryRun: !apply, cutoff, count: emails.length });
  }

  await dbLeadEngine.delete(guideRequests).where(inArray(guideRequests.email, emails));

  // Brevo: these contacts never subscribed, so the contact itself goes.
  const key = (process.env.BREVO_API_KEY ?? "").trim();
  let brevoDeleted = 0;
  if (key && process.env.VERCEL_ENV === "production") {
    for (const email of emails) {
      const res = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}?identifierType=email_id`, {
        method: "DELETE",
        headers: { "api-key": key },
      });
      if (res.ok || res.status === 404) brevoDeleted++;
      else console.error("guide retention: Brevo delete failed", { status: res.status });
    }
  }

  console.log("guide retention applied", { count: emails.length, brevoDeleted });
  return NextResponse.json({ dryRun: false, cutoff, count: emails.length, brevoDeleted });
}
