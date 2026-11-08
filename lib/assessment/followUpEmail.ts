/**
 * The one follow-up email about a POPIA review report, sent about two days
 * after the report to people who ticked the follow-up box (6 Nov 2026).
 *
 * Wording rules: it is a message about the report the person asked for, not a
 * sales message. No offer, no price, no urgency, no marketing content. It says
 * it is the only one. Written in the owner's voice ("I"), as he asked. Code-
 * built like the guide emails, so the wording lives in version control and no
 * Brevo template has to be edited.
 */

export interface FollowUpEmail {
  subject: string;
  htmlContent: string;
  textContent: string;
}

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function buildFollowUpEmail(params: {
  name: string;
  levelLabel: string;
  reportUrl: string;
}): FollowUpEmail {
  const first = params.name.trim().split(/\s+/)[0] || params.name;
  const name = escapeHtml(first);
  const label = escapeHtml(params.levelLabel);
  const url = escapeHtml(params.reportUrl);

  const html = `<!doctype html>
<html lang="en-ZA"><body style="margin:0;padding:0;background:#ffffff;">
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a1a;font-size:15px;line-height:1.6;">
<p style="margin:0 0 16px;">Hi ${name},</p>
<p style="margin:0 0 16px;">A couple of days ago you asked for your POPIA review report, and you ticked the box to hear from me once about your results. This is that one email. Your result was: ${label}.</p>
<p style="margin:0 0 16px;">If you would like to talk through the results, reply to this email and tell me what you would like to look at. We can go through what the report found and which actions to start with.</p>
<p style="margin:0 0 16px;">If you would rather not, there is nothing to do. I will not email you about this again.</p>
<p style="margin:0 0 16px;">Your report is still here: <a href="${url}" style="color:#0069A0;">${url}</a></p>
<p style="margin:0 0 0;">Jimmy</p>
<p style="margin:32px 0 0;font-size:13px;color:#555;line-height:1.5;">Maru Online<br>POPIA-aware AI implementation<br>hello@maruonline.com · Gauteng, South Africa<br><br>The review is general information. It is not legal advice, and it does not guarantee POPIA compliance.</p>
</div></body></html>`;

  const text = [
    `Hi ${first},`,
    "",
    `A couple of days ago you asked for your POPIA review report, and you ticked the box to hear from me once about your results. This is that one email. Your result was: ${params.levelLabel}.`,
    "",
    "If you would like to talk through the results, reply to this email and tell me what you would like to look at. We can go through what the report found and which actions to start with.",
    "",
    "If you would rather not, there is nothing to do. I will not email you about this again.",
    "",
    `Your report is still here: ${params.reportUrl}`,
    "",
    "Jimmy",
    "",
    "Maru Online",
    "POPIA-aware AI implementation",
    "hello@maruonline.com · Gauteng, South Africa",
    "",
    "The review is general information. It is not legal advice, and it does not guarantee POPIA compliance.",
  ].join("\n");

  return { subject: "Your POPIA review: would you like to talk it through?", htmlContent: html, textContent: text };
}
