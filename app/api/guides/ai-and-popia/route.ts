/**
 * POST /api/guides/ai-and-popia — request the "AI and POPIA" guide.
 * Copy handover entry 19 §3, §5, §7, §12.
 *
 * 1. Validate; a filled honeypot gets a quiet fake success and nothing stored.
 * 2. Rate limit from our own table (in-memory limits don't survive serverless).
 * 3. Write the consent log row BEFORE answering, so every request on record
 *    has the exact wording the visitor saw.
 * 4. Answer. The thank-you page's download link works from here on, even if
 *    email is slow (§4).
 * 5. After the response (waitUntil): Brevo Guide Downloads list, delivery
 *    email with retry, and — only if ticked — the double opt-in email. Each
 *    outcome is recorded on the row.
 */

import { createHash, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { and, eq, gt, sql } from "drizzle-orm";
import { z } from "zod";
import { dbLeadEngine } from "@/lib/db";
import { guideRequests } from "@/lib/db/schema/lead-engine";
import {
  GUIDE_CONSENT_SOURCE,
  GUIDE_CONSENT_TEXT_VERSION,
  GUIDE_LIVE,
  GUIDE_PDF_ROUTE,
  MARKETING_CONSENT_TEXT,
  PRIVACY_LINE_AFTER,
  PRIVACY_LINE_BEFORE,
  PRIVACY_LINE_LINK,
} from "@/lib/guides/config";
import { currentEnvironment, getGuideBrevo, withRetry, type GuideContact } from "@/lib/guides/brevo";
import { buildConfirmEmail, buildDeliveryEmail, siteUrl } from "@/lib/guides/emails";

const schema = z.object({
  firstName: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email().max(254),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  marketing: z.boolean(),
  // Honeypot: a field people never see. Bots fill every input.
  contactTime: z.string().optional(),
});

/** Per IP per hour, and per email per hour. Generous for people, tight for scripts. */
const MAX_PER_IP_PER_HOUR = 5;
const MAX_PER_EMAIL_PER_HOUR = 3;

export async function POST(req: NextRequest) {
  if (!GUIDE_LIVE) return NextResponse.json({ error: "Not found" }, { status: 404 });
  let body: z.infer<typeof schema>;
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    body = parsed.data;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (body.contactTime) {
    console.warn("guide request: honeypot filled, discarded");
    return NextResponse.json({ ok: true, marketing: false });
  }

  const ipHash = hashIp(clientIp(req));
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);

  try {
    const [byIp] = await dbLeadEngine
      .select({ n: sql<number>`count(*)::int` })
      .from(guideRequests)
      .where(and(eq(guideRequests.ipHash, ipHash), gt(guideRequests.createdAt, hourAgo)));
    const [byEmail] = await dbLeadEngine
      .select({ n: sql<number>`count(*)::int` })
      .from(guideRequests)
      .where(and(eq(guideRequests.email, body.email), gt(guideRequests.createdAt, hourAgo)));
    if ((byIp?.n ?? 0) >= MAX_PER_IP_PER_HOUR || (byEmail?.n ?? 0) >= MAX_PER_EMAIL_PER_HOUR) {
      console.warn("guide request: rate limited", { byIp: byIp?.n, byEmail: byEmail?.n });
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
  } catch (err) {
    // The table is the consent log; without it nothing can be recorded.
    console.error("guide request: rate-limit read failed", err);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }

  const now = new Date();
  const confirmToken = body.marketing ? randomUUID() : null;
  let rowId: string;
  try {
    const [row] = await dbLeadEngine
      .insert(guideRequests)
      .values({
        guide: GUIDE_CONSENT_SOURCE,
        environment: currentEnvironment(),
        email: body.email,
        firstName: body.firstName,
        company: body.company || null,
        marketingTicked: body.marketing,
        consentText: MARKETING_CONSENT_TEXT,
        privacyText: `${PRIVACY_LINE_BEFORE}${PRIVACY_LINE_LINK}${PRIVACY_LINE_AFTER}`,
        consentTextVersion: GUIDE_CONSENT_TEXT_VERSION,
        confirmToken,
        ipHash,
        createdAt: now,
      })
      .returning({ id: guideRequests.id });
    rowId = row.id;
  } catch (err) {
    console.error("guide request: consent log write failed", err);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }

  waitUntil(deliver({ rowId, body, confirmToken, requestedAt: now.toISOString() }));

  console.log("guide request recorded", { rowId, marketing: body.marketing, environment: currentEnvironment() });
  return NextResponse.json({ ok: true, marketing: body.marketing });
}

async function deliver(params: {
  rowId: string;
  body: z.infer<typeof schema>;
  confirmToken: string | null;
  requestedAt: string;
}) {
  const { rowId, body, confirmToken, requestedAt } = params;
  const brevo = getGuideBrevo(body.email);
  const base = siteUrl();

  // Every requester is stored as CONSENT_MARKETING=false at this point, ticked
  // or not: consent to marketing exists only once they confirm (§7).
  const contact: GuideContact = {
    email: body.email,
    firstName: body.firstName,
    company: body.company || undefined,
    consentMarketing: false,
    consentDate: requestedAt,
    consentSource: GUIDE_CONSENT_SOURCE,
    consentTextVersion: GUIDE_CONSENT_TEXT_VERSION,
  };

  const contactResult = await withRetry(() => brevo.recordDownload(contact));
  const brevoStatus =
    brevo.mode === "stub" ? "stubbed" : contactResult.error ? `failed: ${errText(contactResult.error)}` : "recorded";

  const delivery = await withRetry(() =>
    brevo.sendTransactional(
      buildDeliveryEmail({ email: body.email, firstName: body.firstName, downloadUrl: `${base}${GUIDE_PDF_ROUTE}` }),
    ),
  );

  if (confirmToken) {
    const confirm = await withRetry(() =>
      brevo.sendTransactional(
        buildConfirmEmail({
          email: body.email,
          firstName: body.firstName,
          confirmUrl: `${base}/guides/ai-and-popia/confirm?token=${confirmToken}`,
        }),
      ),
    );
    if (confirm.error) console.error("guide request: confirmation email failed", { rowId, error: errText(confirm.error) });
  }

  const deliveryStatus = brevo.mode === "stub" ? "stubbed" : delivery.error ? "failed" : "sent";
  if (delivery.error) console.error("guide request: delivery email failed", { rowId, error: errText(delivery.error) });
  if (contactResult.error) console.error("guide request: Brevo contact failed", { rowId, error: errText(contactResult.error) });

  try {
    await dbLeadEngine
      .update(guideRequests)
      .set({
        deliveryStatus,
        deliveryAttempts: delivery.attempts,
        deliveryError: delivery.error ? errText(delivery.error) : null,
        brevoStatus,
      })
      .where(eq(guideRequests.id, rowId));
  } catch (err) {
    console.error("guide request: status update failed", { rowId, err });
  }

  console.log("guide request delivered", { rowId, brevoMode: brevo.mode, deliveryStatus, brevoStatus });
}

function errText(err: unknown): string {
  return (err instanceof Error ? err.message : String(err)).slice(0, 500);
}

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/** Salted hash: enough to count requests per address, not to recover the IP. */
function hashIp(ip: string): string {
  const salt = process.env.GUIDE_IP_SALT ?? "maru-guide-ai-popia-v1";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}
