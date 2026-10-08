import "server-only";

import type { TransactionalEmail } from "./brevo";

/**
 * Emails for the guide flow. Code-built htmlContent, the same way the
 * assessment builds Jimmy's brief, so no Brevo template is created or edited
 * (entry 19 §12: templates 2, 3, 4 and 6 are off limits).
 */

/** Absolute site URL for links in emails: the preview's own URL on a preview. */
export function siteUrl(): string {
  if (process.env.VERCEL_ENV === "production") return "https://maruonline.com";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

const wrap = (inner: string) => `<!doctype html>
<html lang="en-ZA"><body style="margin:0;padding:0;background:#ffffff;">
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a1a;font-size:15px;line-height:1.6;">
${inner}
</div></body></html>`;

const signature = `<p style="margin:32px 0 0;font-size:13px;color:#555;line-height:1.5;">
Maru Online<br>POPIA-conscious AI implementation<br>hello@maruonline.com · Gauteng, South Africa</p>`;

/**
 * Entry 19 §5, verbatim. Transactional: no marketing content, not framed as a
 * subscription. The download link is the on-site route (§6).
 */
export function buildDeliveryEmail(params: { email: string; firstName: string; downloadUrl: string }): TransactionalEmail {
  const name = escapeHtml(params.firstName);
  const checkUrl = "https://maruonline.com/popia-ai-check";
  const html = wrap(`
<p style="margin:0 0 16px;">Hi ${name},</p>
<p style="margin:0 0 20px;">Here is your copy of AI and POPIA: A Guide for South African Business Owners.</p>
<p style="margin:0 0 20px;"><a href="${params.downloadUrl}" style="display:inline-block;background:#0069A0;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:6px;">Download the guide (PDF)</a></p>
<p style="margin:0 0 16px;">It takes about ten minutes to read and ends with a one-page self-check.</p>
<p style="margin:0 0 16px;">If you want to see where your business stands, the free POPIA AI check asks questions across the same five areas and sends you a report: <a href="${checkUrl}" style="color:#0069A0;">maruonline.com/popia-ai-check</a></p>
<p style="margin:0 0 16px;">This guide is general information, not legal advice.</p>
${signature}`);

  const text = [
    `Hi ${params.firstName},`,
    "",
    "Here is your copy of AI and POPIA: A Guide for South African Business Owners.",
    "",
    `Download the guide (PDF): ${params.downloadUrl}`,
    "",
    "It takes about ten minutes to read and ends with a one-page self-check.",
    "",
    "If you want to see where your business stands, the free POPIA AI check asks questions across the same five areas and sends you a report: maruonline.com/popia-ai-check",
    "",
    "This guide is general information, not legal advice.",
    "",
    "Maru Online",
    "POPIA-conscious AI implementation",
    "hello@maruonline.com · Gauteng, South Africa",
  ].join("\n");

  return {
    to: { email: params.email, name: params.firstName },
    subject: "Your guide: AI and POPIA",
    htmlContent: html,
    textContent: text,
    tags: ["guide-ai-popia", "guide-delivery"],
  };
}

/**
 * Double opt-in confirmation (entry 19 §7: "Only ticked contacts go through a
 * double opt-in (confirmation email)").
 *
 * DRAFT WORDING — NOT APPROVED. Entry 19 gives no copy for this email. Written
 * for the preview test only, to the voice rules; listed in rebuild log #10 for
 * Jimmy to approve or replace before go-live.
 */
export function buildConfirmEmail(params: { email: string; firstName: string; confirmUrl: string }): TransactionalEmail {
  const name = escapeHtml(params.firstName);
  const html = wrap(`
<p style="margin:0 0 16px;">Hi ${name},</p>
<p style="margin:0 0 16px;">You asked for practical notes on AI and POPIA from Maru Online. Please confirm that you want them.</p>
<p style="margin:0 0 20px;"><a href="${params.confirmUrl}" style="display:inline-block;background:#0069A0;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:6px;">Yes, send me the notes</a></p>
<p style="margin:0 0 16px;">If you didn't ask for this, ignore this email. We won't add you.</p>
<p style="margin:0 0 16px;">Your guide is not affected either way.</p>
${signature}`);

  const text = [
    `Hi ${params.firstName},`,
    "",
    "You asked for practical notes on AI and POPIA from Maru Online. Please confirm that you want them.",
    "",
    `Yes, send me the notes: ${params.confirmUrl}`,
    "",
    "If you didn't ask for this, ignore this email. We won't add you.",
    "",
    "Your guide is not affected either way.",
    "",
    "Maru Online",
    "POPIA-conscious AI implementation",
    "hello@maruonline.com · Gauteng, South Africa",
  ].join("\n");

  return {
    to: { email: params.email, name: params.firstName },
    subject: "Please confirm: notes on AI and POPIA",
    htmlContent: html,
    textContent: text,
    tags: ["guide-ai-popia", "notes-double-opt-in"],
  };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
