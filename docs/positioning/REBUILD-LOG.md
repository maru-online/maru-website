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

**Open after #2–#4 (Jimmy to decide):**
- The hero button promises a **10-minute** assessment; the check page says **about 3 minutes** for 10 questions. One of them must change (handover backlog 7).
- Name of the free tool: the handover's terminology rule says "Operations Assessment", the ported check calls itself "POPIA AI check". Settle in the positioning discussion.
- Level labels "Partly protected" / "Well protected" are assurance words of the same kind as "safe". Handover entry 08 suggested "Exposed / Partly covered / Controlled".
- Report timing: the v3 check emails the report automatically within minutes, but the handover (entries 03, 09, 13) promises "2 business days" with Jimmy's review before sending. The code and the copy must agree before either ships.
- Still saying "POPIA compliant" (handover entries 04, 09, backlog 14, not yet built): `AssessmentFormSection`, `PrimaryServicesFilter`, `/process`, `/pricing`, `/services`, `/services/workflow-integration`, `/terms-conditions`, `/privacy-policy` title, `/resources/popia-ai-checklist`.
