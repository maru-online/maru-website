# Copy Deck Addendum 04: no-confusion sweep (LinkedIn + site)

> **Status:** APPROVED 28 Sep 2026 by Jimmy Motsei. All items approved as proposed. C5: primary (`Is it within POPIA?`).
> D: **No**, keep "POPIA-Compliant AI Integration" for proposals and contracts only, never on LinkedIn or the site (so A3 applies).
> Test applied to every line (CLAUDE.md, "No-confusion rules"): could a newcomer read it as
> (a) Maru stores their data, (b) a cybersecurity product, or (c) a compliance guarantee? If yes, it is rewritten below.
> Two patterns fail: "safe" standing alone (reads as cybersecurity) and "make it safe" (reads as a promise).

---

## A. LinkedIn (live copy; applied via Chrome once approved)

| # | Where | Current | Proposed | Why |
|---|---|---|---|---|
| A1 | Personal About, para 4 | your first safe workflow running live | `your first POPIA-safe workflow running live` | "safe" alone |
| A2 | Maru Online Experience entry, line 1 | We help owner-led businesses use AI without putting client data at risk. | `We help owner-led businesses use AI within POPIA.` | "at risk" reads as cybersecurity |
| A3 | Company Page specialities | POPIA-Compliant AI Integration | Remove (if the formal descriptor is retired, see D) | Collides with "POPIA-Safe AI Integration" |

## B. Banners (not yet built)

| # | Where | Planned | Proposed | Why |
|---|---|---|---|---|
| B1 | Company banner | Use AI without putting your clients' data at risk. | `Your team already uses AI. We help you do it within POPIA.` | "at risk"; reuses the headline promise |
| B2 | Personal banner / Facebook sub-line | We check where client data goes and make every workflow POPIA-safe. | `We check where client data goes and design every workflow for POPIA's requirements.` | "make every" reads as a guarantee |

Unchanged: eyebrow `POPIA-safe AI for South African businesses`; headline `Your clients trust you with their information.` / `Keep that trust as your team uses AI.`; proof line.

## C. Site (branch `positioning/popia-safe`, approved copy being revised)

**Guarantee-leaning**

| # | File | Current | Proposed |
|---|---|---|---|
| C1 | `app/layout.tsx:37, 44`, `app/page.tsx:30` (meta + OG description) | Your team already uses AI. We make it POPIA-safe: we map where client data goes, fix the risks, and build workflows that save time. Fixed price. | `Your team already uses AI. We help you do it within POPIA: we map where client data goes, fix the risks, and build workflows that save time. Fixed price.` |
| C2 | `app/page.tsx:277` (services H2, line 2) | We'll make it safe. | `We'll bring it within POPIA.` |
| C3 | `app/page.tsx:243` (problem closing line) | None of this needs new software. We fix it with the systems you already have, and make them safe. | `None of this needs new software. We fix it with the systems you already have, and bring them within POPIA.` |
| C4 | `app/page.tsx:407` (image band sub-line) | We check where client data goes and make every workflow POPIA-safe. | `We check where client data goes and design every workflow for POPIA's requirements.` |

**"Safe" standing alone**

| # | File | Current | Proposed |
|---|---|---|---|
| C5 | Homepage hero H1, line 2 | Is your client data safe? | `Is it within POPIA?` |
| C6 | `components/ui/StatBand.tsx:17` | To your first safe workflow running live | `To your first POPIA-safe workflow running live` |
| C7 | `app/page.tsx:315` (process teaser H2) | From audit to safe, live workflows | `From audit to POPIA-safe, live workflows` |
| C8 | `app/services/page.tsx:115` (step title) | We build it safe, then hand it over. | `We build it POPIA-safe, then hand it over.` |
| C9 | `app/services/page.tsx:136` (FAQ answer, opening) | We start by making what you have safe and useful. | `We start by bringing what you have within POPIA, and making it useful.` |

**C5 note (biggest call):** the current H1 is more emotive but invites the "is my data hacked?" reading. The proposal is calmer,
unambiguous, and mirrors the LinkedIn headline. [ALT] `Does POPIA allow how they use it?`

**Checked and passing:** category line; hero subhead ("stay within POPIA"); OG title; all POPIA-Safe AI Audit mentions;
trust strip; privacy policy "protect your information" (Maru's own handling of visitor data, where custody wording is accurate).

**Out of scope, flagged:** the unpublished checklist page (`app/resources/popia-ai-checklist/`) still says
"POPIA-compliant form. Your data is secure." and "Get compliant today." Fix before it is ever republished.

## D. Decision: formal descriptor

Retire "POPIA-Compliant AI Integration" and use "POPIA-Safe AI Integration" everywhere, including proposals?
- **Yes:** one term, no "are these different offers?" moment; drops the word closest to a guarantee. Update POSITIONING.md, CLAUDE.md, A3.
- **No:** keep it for proposals and contracts only, never on LinkedIn or the site.
