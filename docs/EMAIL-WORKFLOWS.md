# Email workflows (as at the 6 Nov 2026 commit)

What sends what. Update this file when a send changes.

| Email | Trigger | Built where | Sender |
|---|---|---|---|
| Report email (3 levels) | POPIA review submitted | **Brevo templates** (`BREVO_TEMPLATE_LEVEL_1/2/3`) | Maru Online <hello@maruonline.com> |
| Lead alert to hello@ | POPIA review submitted | Code: `buildLeadAlertHtml` in `app/api/assessment/submit/route.ts` | Maru Online |
| **Follow-up about the results** | ~2 days after the report, **only if the follow-up box was ticked** | Code: `lib/assessment/followUpEmail.ts`, sent by `app/api/cron/assessment-followup` (daily 06:00 UTC) | "Jimmy at Maru Online" <hello@maruonline.com> |
| Guide delivery, confirm, reminder | Guide request | Code: `lib/guides/emails.ts` | Maru Online |
| Contact acknowledgement + notification | Contact form | Code: `app/api/contact/route.ts` | Maru Online |

## Follow-up rules
- Consent: a separate, unticked box ("Email me once, in about two days…"). Stored in `operations_reports.template.consent.followUp` with `textVersion` `2026-11-v1`. No tick, no email.
- Once only: the row is claimed (`template.followUp`) before sending; a failed send releases the claim; window is 46 hours to 5 days after the report.
- Skips addresses in `RETENTION_KEEP_EMAILS` (clients).
- Runs only in production, needs `CRON_SECRET` and `BREVO_API_KEY`. Dry run without `?apply=1`.
- Optional env: `FOLLOWUP_SENDER_NAME` (default "Jimmy at Maru Online").

## Brevo report templates (to review by hand in Brevo)
These live in Brevo and were not visible from the repo. Check each of the three level templates for:
- Any "discovery call", "book a call", "free assessment", "operations assessment", "retainer" or "cut costs" wording (retired).
- Any promise of a call or a proposal. The report email should only deliver the report: "Your report is ready, {{params.FIRSTNAME}}", the level `{{params.LEVEL_LABEL}}`, the link `{{params.REPORT_URL}}`, the guide line when `{{params.SHOW_GUIDE_LINK}}` (`{{params.GUIDE_URL}}`), and "This review is a starting point, not legal advice."
- Level names: "Exposed", "Partly in place", "Largely in place".
- A footer that does not say "we will call you". The follow-up email is the only contact, and only for people who ticked the box.

## Scheduled jobs (`vercel.json`)
| Job | Schedule (UTC) | Mode |
|---|---|---|
| `/api/cron/assessment-followup` | daily 06:00 | **Live** (sends only on production, only with consent) |
| `/api/cron/assessment-retention` | 1st of month 02:00 | **Dry run**: logs the count, deletes nothing |
| `/api/cron/guide-retention` | 1st of month 02:30 | **Dry run**: logs the count, deletes nothing |

To make a retention job live: set `CRON_SECRET`, run it once by hand without `apply`, check the list against clients (`RETENTION_KEEP_EMAILS`), then add `?apply=1` to its path in `vercel.json`.
