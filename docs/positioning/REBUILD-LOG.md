# POPIA-safe rebuild: change log

Branch `positioning/popia-rebuild`, started 5 Oct 2026 from `main` (pre-POPIA site plus the 1–2 Oct security
fixes). Each change is decided by Jimmy, one at a time, after the drift review
(`DRIFT-REVIEW-2026-10-05.md`). Newest at the bottom.

| # | Date | Where | Change | Source | Status |
|---|---|---|---|---|---|
| 1 | 5 Oct | Homepage hero, H1 | "AI-Powered Workflows That / Cut Your Operating Costs" → "Your team already uses AI. / Is it within POPIA?" | Last committed H1 on `positioning/popia-safe` (Addendum 04 C5, approved 28 Sep) | Done |
| 2 | 6 Oct | Homepage hero, paragraph + CTAs | Two cost-led paragraphs → one POPIA paragraph; primary button "Check your exposure: free 10-minute assessment" → `/popia-ai-check`; "Book a discovery call" demoted to a text link | Copy handover entry 01 (approved 5 Oct), verbatim. Handover's own H1 not used: Jimmy kept #1 | Done `72ded86` |
| 3 | 6 Oct | Assessment | POPIA AI check (assessment_v3) ported from `positioning/popia-safe` at `3bd931b`; `/operations-assessment` 308 → `/popia-ai-check`; all internal links repointed. Replaces handover entry 08 (extend the old tool) | Jimmy, 6 Oct | Done `fa29b99` |
| 4 | 6 Oct | Positioning, sitewide | "POPIA-safe" retired → "POPIA-conscious" (no supplier can promise POPIA safety or compliance; the business stays the responsible party). The check is named "POPIA AI check"; the report's "POPIA-Safe AI Audit" lines are dropped because the rebuild has no paid audit | Jimmy, 6 Oct; handover voice rules | Done `fa29b99` |
| 5 | 7 Oct | Homepage, footer, metadata | Handover entries 02, 03, 04, 05 (grid), 06, 07 (not the WhatsApp prefill), 09, 10, 11, 14 built verbatim. Question count kept at 10 (entry 09 open item 1). AI Use Safeguards card held. Foundation-service cards moved to `/services#foundations` | Copy handover (consolidated 7 Oct) | Done `9cee6cb`, `04e1292` |
| 6 | 7 Oct | `/process`, `/pricing` | Entry 13: four trimmed steps, "How we price" (no figure); `/pricing` 308 → `/process#how-we-price`; rest of `/process` kept with the entry's substitutions only | Copy handover entry 13 | Done `01fb25a` |
| 7 | 7 Oct | `/about` | Entry 16 approved sections (1–6, 8). Focus Over Volume shows a marked placeholder (open item 1), so `/about` is `noindex` until Jimmy gives the line. 7 Oct additions + entry 17 not built (PROPOSED) | Copy handover entry 16 | Done `2538bf8` |
| 8 | 7 Oct | `/services` + service pages | Not covered by an entry; Jimmy chose "fix what's false": Operations Assessment rename, marked Free, retired deliverables and all price figures removed, approved sentences only | Jimmy, 7 Oct | Done `89e2325` |
| 9 | 7 Oct | Homepage background lines | Entry 05 lines (extends the DisconnectDiagram's line language). Story variant not built | Copy handover entry 05 | Removed: rendered as solid black shapes on the preview; Jimmy asked for them to go entirely (reverted) |

**Open after #2–#4 (Jimmy to decide):**
- The hero button promises a **10-minute** assessment; the check page says **about 3 minutes** for 10 questions. One of them must change (handover backlog 7).
- Name of the free tool: the handover's terminology rule says "Operations Assessment", the ported check calls itself "POPIA AI check". Settle in the positioning discussion.
- Level labels "Partly protected" / "Well protected" are assurance words of the same kind as "safe". Handover entry 08 suggested "Exposed / Partly covered / Controlled".
- Report timing: the v3 check emails the report automatically within minutes, but the handover (entries 03, 09, 13) promises "2 business days" with Jimmy's review before sending. The code and the copy must agree before either ships.
- Still saying "POPIA compliant" (handover entries 04, 09, backlog 14, not yet built): `AssessmentFormSection`, `PrimaryServicesFilter`, `/process`, `/pricing`, `/services`, `/services/workflow-integration`, `/terms-conditions`, `/privacy-policy` title, `/resources/popia-ai-checklist`.

**Open after #5–#9 (Jimmy to decide):**
- "No marketing opt-in, just your results" (entry 09) and "We don't add you to a marketing list" (entry 15): the check has an optional, unticked marketing box that adds a ticker to Brevo list 21, and every submission creates a Brevo contact. The line reads as if no opt-in exists.
- Focus Over Volume needs a replacement line (entry 16 open item 1); `/about` stays `noindex` until then.
- The proof block links to `/case-studies/growthiq`, which is still a `noindex` scaffold with placeholders.
- Still saying an unmeasured time: `/services` final CTA "Twenty minutes will tell you."; hero/meta "10-minute"; check page "About 3 minutes".
- Untouched and still off-message: legal pages (Terms lists R4,999/R9,999 packages and "Operations Diagnostic"; privacy policy redraft is a release gate), hidden `/insights` (R4,500 diagnostic CTA), `lib/assessment/reportTemplates.ts` (v2 templates naming the Operations Diagnostic).
- Entry 18 (PROPOSED): site-wide JSON-LD still lists two street addresses, a phone number, the personal LinkedIn and X/Facebook/Instagram in `sameAs`.

---

## #10 — 8 Oct: entry 19, the "AI and POPIA" guide (PREVIEW ONLY)

Built overnight from copy handover entry 19 §12 on branch **`preview/lead-magnet-guide`** (cut from this branch at
`44b9a7d`). Not merged here, not on `main`, noindex. Preview (stable branch link):
https://maru-website-git-preview-lead-magnet-guide-maru-online.vercel.app/guides/ai-and-popia

### What was built (commit `8a3d006` + follow-up)

| §12 item | Built | Where |
|---|---|---|
| 1 Landing page, form, thank-you, failure states | §2–§4 verbatim; noindex; honeypot + rate limits, no CAPTCHA | `app/guides/ai-and-popia/` |
| 1 PDF route | `/downloads/ai-and-popia-guide.pdf`, inline, `X-Robots-Tag: noindex`, serves the **DRAFT** PDF | `app/downloads/…/route.ts`, `content/guides/` |
| 2 Brevo | Lists "Guide Downloads" + "AI and POPIA Notes" and the 5 attributes, created by the code on first use; double opt-in only when ticked; retry 3× with backoff; outcome on the row | `lib/guides/brevo.ts` |
| 3 Consent log | New table `guide_requests` in `maru_lead_engine` (additive SQL, applied by hand 8 Oct): exact wording, version, timestamps, IP hash, delivery/Brevo status | `lib/db/manual/2026-10-08_guide_requests.sql` |
| 4 Delivery email | §5 verbatim, code-built (no Brevo template created or edited) | `lib/guides/emails.ts` |
| 5 Assessment ↔ guide | "Want the basics…? Read the guide." on the check's results step and the v3 report, hidden once requested. Report email: params `SHOW_GUIDE_LINK` / `GUIDE_URL` passed to its template. Homepage strip built, **flag OFF** | `app/popia-ai-check`, `app/report/[token]`, `components/homepage/GuideStrip.tsx` |
| 6 Data flow + privacy draft | Separate files, not published | `docs/positioning/guide/` |
| 7 Consent test | Run on the preview: **FAILS** (below) | — |

Verbatim check: every quoted string in §2–§5 and §11 found in the source by script (33/33), plus the H1 and two
link lines confirmed in the rendered page.

### Test results on the preview (8 Oct, ~05:30)

- Validation: bad email → 400; empty submit shows both approved messages. Failure path shows the approved message.
- Honeypot: fake success, nothing stored.
- Preview guard: `stub-test@example.com` → consent row written (`environment=preview`, wording version, IP hash only),
  Brevo and email **stubbed**, thank-you page and download work.
- Double opt-in: opening the email link alone confirms nothing (mail scanners); pressing the button set
  `marketing_confirmed_at`; a bad token is refused.
- PDF served from the preview is byte-for-byte the DRAFT.
- Homepage strip, FAQ ending and sitemap entry: all absent (flags off).
- **Real send to hello@ (unticked): FAILED, correctly recorded.** Brevo's authorised-IP allowlist rejected Vercel's
  server (`34.228.70.169`, AWS us-east-1) with 401 — the same block that refuses the Mac. No lists or attributes
  could be created, no email went out, so the ticked live path (jimmym@) was not attempted. The on-page download
  link is unaffected.
- **Consent test (release gate 4): FAILS, site-wide, not caused by this build.** A fresh visitor who has not
  touched the cookie banner already loads the Meta Pixel (`connect.facebook.net/…/fbevents.js`) and gets the
  `_fbp` cookie. GA did not load. The consent fix exists on `positioning/popia-safe` and was never ported here.

### ⚠️ Found: Brevo blocks every Vercel call, so the live assessment's Brevo steps likely fail too

The assessment route uses the same key from the same Vercel IPs. Read-only checks through the Brevo connector
(8 Oct) agree: **none** of the attributes the assessment sends exist in Brevo (`ASSESSMENT_LEVEL`, `REPORT_URL`,
`MARKETING_CONSENT`, …), list 21 has 1 contact, and `operations_reports` has had no row since 5 Aug. Vercel
functions have no fixed IP on Hobby, so allow-listing addresses will not hold. **Jimmy's fix:** Brevo → Security →
Authorised IPs → turn off IP blocking for the API key (or deactivate the allowlist), then re-run the hello@ test.

### Defaults and assumptions (§12: "pick the more conservative reading")

1. §12 defaults as decided: no email frequency stated; `GUIDE_RETENTION_MONTHS = 12`; no tracking. **But** Brevo
   transactional open/click tracking is an account setting, not a per-email switch: check it is off in Brevo.
2. **Preview guard (not in the brief):** off production, Brevo writes and sends happen only for jimmym@ and hello@.
   The brief forbids real email to real addresses; a shared preview link would otherwise break that.
3. **Notes list name:** "AI and POPIA Notes" (entry 19 says "the notes list" without naming it).
4. **Confirmation email and confirm page wording are DRAFT** (entry 19 has no copy for them). Marked in
   `lib/guides/emails.ts` and `confirm/ConfirmNotes.tsx`. Needs Jimmy's approval or replacement.
5. Confirm is a **button on a page**, not the email link itself: link scanners would otherwise subscribe people.
6. **WhatsApp floating button hidden on `/guides/*`** ("No WhatsApp anywhere in this flow"). The footer WhatsApp
   link stays: it is site chrome approved in entry 07.
7. The **sitemap entry** follows `GUIDE_INDEXABLE` (§1 says list it, and also not index it before the gates).
8. **Consent log in the production database:** preview rows are written there, tagged `environment = preview`.
   Clean them before launch: `DELETE FROM guide_requests WHERE environment <> 'production';`
9. Retention purge route `/api/cron/guide-retention` is **not scheduled**, needs `CRON_SECRET` (not set), dry
   run by default. The "became a customer" exemption cannot be checked by code.
10. The thank-you page sets `localStorage maru-guide-requested` to hide the check's guide line (§11). Disclose it
    in the cookie policy as functional storage.

### Did not match entry 19

- **No footer "resources list" exists.** Adding one would change approved entry 07 and needs a label: not done.
- **Report email line:** the level emails are Brevo templates (off limits), so the line is not in them. Proposed
  for the template, after `REPORT_URL`, for Jimmy to approve before anyone edits Brevo:
  `{% if params.SHOW_GUIDE_LINK %}Want the basics behind these questions? <a href="{{ params.GUIDE_URL }}">Read the guide.</a>{% endif %}`
  (wording is §11's, verbatim; only the template syntax is new).
- **Brevo templates 2, 3, 4 and 6 ("Diagnostic" wording):** not read or edited (IP block + §12). Proposed new
  wording needs to start from their current text, which Claude cannot read; Jimmy to paste them into a session.
- **Rate limiting:** the in-memory middleware limit is per instance, so the route also limits from its own table
  (5 per IP per hour, 3 per email per hour).
- `npm run lint` fails on this branch **before** this work: 17 warnings in untouched files, plus 12 errors from
  another session's `.claude/worktrees/vigilant-cannon-d7db43/.next/` build output. Not changed here.

### Go-live steps for Jimmy (in this order)

1. **Brevo:** turn off the authorised-IP block for the API key; sign the DPA and read its sub-processors; confirm
   DKIM and DMARC for maruonline.com; switch off transactional open/click tracking.
2. Re-test on the preview: hello@ unticked, jimmym@ ticked → delivery email, confirmation email, confirm button,
   contact on "AI and POPIA Notes" only, unsubscribe link in a test campaign (release gate 6).
3. Approve the DRAFT confirmation email and confirm-page wording, the entry 09/15 rewording (§9), and the
   report-email template line above.
4. Fix the Meta Pixel consent gap (port the popia-safe consent fix), then re-run the consent test (gate 4).
5. Tick `lead-magnet-verification-v1.md`; refresh the PDF date if needed (gate 1).
6. Swap the PDF: copy `AI-and-POPIA-guide_clean.pdf` into `content/guides/` as `ai-and-popia-guide.pdf`, set
   `GUIDE_PDF_FILE` to that name in `lib/guides/config.ts`, and delete the DRAFT file.
7. Publish the redrafted privacy policy (gate 2; draft section in `docs/positioning/guide/GUIDE-PRIVACY-DRAFT.md`).
8. Delete preview rows from `guide_requests` (item 8 above).
9. Lift noindex: `GUIDE_INDEXABLE = true` (also adds the sitemap entry).
10. Last: `GUIDE_HOMEPAGE_STRIP = true` and, if wanted, `GUIDE_SECONDARY_LINKS = true` (FAQ ending).
