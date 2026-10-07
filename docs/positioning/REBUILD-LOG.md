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
