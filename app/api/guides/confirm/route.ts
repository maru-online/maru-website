/**
 * POST /api/guides/confirm — the second step of the double opt-in (entry 19 §7).
 *
 * The email links to a page with a button, and the button posts here. A GET
 * that subscribed people would be triggered by mail scanners that prefetch
 * every link, which would record consent nobody gave.
 *
 * Only now does the contact join the notes list with CONSENT_MARKETING=true.
 * The "downloaded the guide" fact (the row itself) is untouched.
 */

import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { dbLeadEngine } from "@/lib/db";
import { guideRequests } from "@/lib/db/schema/lead-engine";
import { getGuideBrevo, withRetry } from "@/lib/guides/brevo";

const schema = z.object({ token: z.string().uuid() });

export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ status: "invalid" }, { status: 400 });

  try {
    const [row] = await dbLeadEngine
      .select()
      .from(guideRequests)
      .where(eq(guideRequests.confirmToken, parsed.data.token))
      .limit(1);

    if (!row || !row.marketingTicked) return NextResponse.json({ status: "invalid" }, { status: 404 });
    if (row.marketingConfirmedAt) return NextResponse.json({ status: "already" });

    const confirmedAt = new Date();
    await dbLeadEngine
      .update(guideRequests)
      .set({ marketingConfirmedAt: confirmedAt })
      .where(eq(guideRequests.id, row.id));

    const brevo = getGuideBrevo(row.email);
    const result = await withRetry(() =>
      brevo.addToNotesList({
        email: row.email,
        firstName: row.firstName,
        company: row.company ?? undefined,
        consentMarketing: true,
        consentDate: confirmedAt.toISOString(),
        consentSource: row.guide,
        consentTextVersion: row.consentTextVersion,
      }),
    );
    if (result.error) {
      // The confirmation is on record either way; the list add can be redone
      // from the table. Log loudly so it is.
      console.error("guide confirm: Brevo notes-list add failed", { rowId: row.id, error: String(result.error) });
    }
    console.log("guide confirm recorded", { rowId: row.id, brevoMode: brevo.mode, listAdded: !result.error });
    return NextResponse.json({ status: "confirmed" });
  } catch (err) {
    console.error("guide confirm failed", err);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
