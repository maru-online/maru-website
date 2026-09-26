# Maru Online — Copy Deck: POPIA-safe repositioning

> **Status:** APPROVED 26 Sep 2026 by Jimmy Motsei (v1, with the CHANGE-MAP.md §5 decisions).
> **Source of truth for positioning:** `docs/positioning/POSITIONING.md`.
> **Rules for the builder (Claude Code):** use the copy below verbatim. Do not write new copy. If a slot
> in the code has no copy here, list it in `CHANGE-MAP.md` as a gap and leave the existing text.
> Items marked **[CONFIRM]** ship only after Jimmy confirms. Until then, omit the element.
> Items marked **[ALT]** are A/B alternatives. Ship the primary.

---

## 1. Global

### `app/layout.tsx`: default metadata
- **title:** `POPIA-Safe AI & Automation for SA Businesses | Maru Online`
- **description:** `Your team already uses AI. We make it POPIA-safe: we map where client data goes, fix the risks, and build workflows that save time. Fixed price.`
- **OG title:** `AI your business can use, without the POPIA risk`
- **OG description:** same as description.

### `config/site.ts`: `siteConfig.description`
`Maru Online makes AI safe for South African businesses. We map where client data goes, fix POPIA risks, and build workflows that save time.`

### `components/seo/JsonLd.tsx`: Organization
- **description:** same as `siteConfig.description`.
- **add** `knowsAbout`: `["POPIA", "Protection of Personal Information Act", "AI implementation", "Workflow automation", "Data protection"]`
- Keep `areaServed: South Africa`.

### `components/ui/Footer.tsx`
- **Tagline:** `POPIA-safe AI for South African businesses.`
  (replaces "Building AI-powered workflows for growing SMEs.")
- **Services list:** rename `Operations Diagnostic` → `POPIA-Safe AI Audit` (link follows the route decision in §3).

### `components/ui/Nav.tsx`
- No label changes. Keep: About · Services · Process · Pricing · Insights · Contact · [Start the assessment].

---

## 2. Homepage: `app/page.tsx`

### Metadata
- **title:** `POPIA-Safe AI for South African Businesses | Maru Online`
- **description:** `Your team is already using AI. We find where client data leaks, fix the POPIA risk, and build workflows that save hours every week. Fixed price.`

### Hero
- **Eyebrow:** `POPIA-safe AI for South African businesses`
  (replaces "AI Implementation Consultancy")
- **H1 (two lines):** `Your team already uses AI.` / `Is your client data safe?`
  - [ALT] `Use AI without putting` / `your clients' data at risk.`
- **Subhead:** `We map where client data goes through your AI tools, spreadsheets and WhatsApp, then rebuild those workflows to save time and stay within POPIA.`
- **Supporting line:** `Most businesses don't have an AI problem. They have an integration problem. In South Africa, that makes it a POPIA problem.`
- **Primary CTA:** `Book a POPIA-safe AI call` → `/booking`
- **Secondary CTA:** `Start the free assessment` → `/operations-assessment`

### StatBand: `components/ui/StatBand.tsx`
| # | Value | Label |
|---|---|---|
| 1 | Free | `Assessment: see where your data goes` |
| 2 | 48hr | `Turnaround on your audit report` |
| 3 | 30 days | `To your first safe workflow running live` |
| 4 | Fixed | `Price agreed before work starts` |

### Problem section ("The operational gap")
- **Eyebrow:** `The hidden risk`
- **H2 (two lines):** `Your team is using AI.` / `Nobody's tracking the data.`
- **Intro:** `Free AI tools, offshore apps and WhatsApp groups are how SA businesses get work done. They are also where client information slips outside the law.`
- **Cards, in this order:**
  1. **`Client data is leaving the country.`** `Most AI and automation tools store data offshore. POPIA section 72 restricts that.`
  2. **`Staff paste client records into free AI tools.`** `No policy, no record, and no answer when a client asks where their data went.`
  3. **`Your tools don't talk to each other.`** `So people copy client data by hand, into more places than you know.`
  4. **`Admin is eating your week.`** `Re-entering data quietly costs days every month.`
- **Closing line:** `None of this needs new software. We fix it with the systems you already have, and make them safe.`
- **Remove:** the "You're deciding on old numbers" card. Four cards maximum, risk first.

### Services section ("Pick the problem")
- **H2 (two lines):** `Pick the problem.` / `We'll make it safe.`
- **Intro:** `Every engagement starts with a POPIA-Safe AI Audit: where your data goes, what it costs you, and what to fix first.`
- Service cards: use the §3 card copy.

### REMOVE entirely: "Need more than workflows? We build the rest too."
Delete the section and its three cards (Strategy & Consultation, Design & Development, Digital Marketing Support).
This is the Law of Sacrifice. Do not re-home these offers anywhere on the site.

### Process teaser
- **H2 (two lines):** `From audit to safe, live workflows` / `in about 30 days.`
- **Sub:** `Four steps. Fixed price. Measured outcome.` (unchanged)
- **Link:** `See how it works` → `/process` (unchanged)

### Closing section
- **H2 (two lines):** `We don't replace your team.` / `We give them their time back.` (unchanged)
- **Add sub-line:** `Without putting your clients' data at risk.`

### Trust strip: "How we practise it" [CONFIRM: ship only confirmed rows]
Place directly above the closing section, reusing an existing proof/strip component (no new design).
- **Heading:** `We hold ourselves to the same standard.`
- [CONFIRM] `Maru's Information Officer is registered with the Information Regulator.`
- [CONFIRM] `Our PAIA manual is published.` → link to the manual
- `We host on South African infrastructure where possible, and document every cross-border transfer.`
- `Maru is not a law firm. We design for POPIA requirements, and we tell you when you need a legal opinion.`

---

## 3. Services

### Route decision (recommended)
Rename `/services/operations-diagnostic` → `/services/popia-safe-ai-audit`, with a **301 redirect** from the old URL
in `next.config.ts`. Update every internal link, the sitemap, the footer and pricing. If Jimmy vetoes the rename,
keep the old URL and change the display name only.

### Card copy (homepage services section, `/services` index, footer)
| Service | Card description |
|---|---|
| **POPIA-Safe AI Audit** | `A written map of every tool, AI app and data flow in your business, with POPIA exposure flagged and savings sized. Report in 48 hours. R4,500.` |
| **Workflow Integration** | `We connect your tools and automate the work, with consent, access and data location built in from day one.` |
| **Team Training & Handover** | `Your team learns the new workflows and the rules that keep them POPIA-safe: what goes into AI tools, and what never does.` |
| **Results Optimisation** | `Thirty days after go-live we measure hours saved and risks closed, then tune what the data shows.` |

### `/services` index: `app/services/page.tsx`
- **title:** `Services: POPIA-Safe AI Audit, Integration & Training | Maru Online`
- **description:** `Four fixed-price steps to AI your business can defend: a POPIA-Safe AI Audit, workflow integration, team training, and measured results.`
- **H1 (split):** `Four steps to AI` / `your business can defend.`

### `/services/popia-safe-ai-audit` (was operations-diagnostic)
- **title:** `POPIA-Safe AI Audit | Maru Online`
- **description:** `Find out where your client data goes. We map every tool, AI app and data flow, flag POPIA exposure and size the savings. 48-hour report, R4,500.`
- **H1:** `POPIA-Safe AI Audit`
- **Lead paragraph:** `Before anything gets built, we find out where your client information actually goes: which AI tools see it, which apps store it offshore, and which workflows copy it by hand. You get a written report within 48 hours: the risks, ranked, and the time and money each fix will save.`
- **What you get (list):**
  - `A data-flow map of your tools, AI apps and WhatsApp workflows`
  - `POPIA exposure flagged: cross-border transfers (s72), automated decisions (s71), consent gaps`
  - `The manual work costing you time, sized in hours per week`
  - `A fixed-price plan for what to fix first`
- **Keep:** existing price, turnaround and FAQ blocks. Replace the word "diagnostic" with "audit" throughout the page.

### `/services/workflow-integration`
- **description:** `Fixed-scope integration built on your audit. We connect your tools and automate the work, with consent, access controls and data location built in.`
- **Lead paragraph (replace first paragraph only):** `We build on what the audit found. Your existing tools get connected, the manual work gets automated, and every workflow is designed so client data stays where POPIA allows: logged, permissioned and documented.`

### `/services/team-training-handover`
- **description:** `Hands-on training on your new workflows, including the rules that keep them POPIA-safe: what goes into AI tools, and what never does.`
- **Add bullet to the curriculum list:** `An AI-use policy for your team: which tools are approved, and what client data must never be pasted into them.`

### `/services/results-optimisation`
- **description:** `Thirty days after go-live we measure hours saved and POPIA risks closed, then run a fixed-scope sprint on what the data shows.`

---

## 4. Pricing: `app/pricing/page.tsx`
- **description:** `Every Maru engagement begins with the POPIA-Safe AI Audit (R4,500). Fixed scope, fixed price, clear deliverables at every stage.`
- Rename tier `Operations Diagnostic` → `POPIA-Safe AI Audit`. **Prices unchanged** (R4,500 · from R35,000 · from R15,000).
- Line at ~521: `The POPIA-Safe AI Audit that follows is R4,500.`

## 5. Process: `app/process/page.tsx`
- Phase 1 title: `We map your data before we touch anything.` (was "We map the gaps before we configure anything.")
- **description:** `A four-phase process: POPIA-Safe AI Audit, fixed-scope build, team handover and a 30-day measurement report. Fixed price throughout.`

## 6. About: `app/about/page.tsx` (light touch only)
- **Lead / mission line:** `Maru exists so South African businesses can use AI without gambling with their clients' trust.`
- Leave the rest of the page unchanged in this pass.

---

## 7. Trust and liability fixes (ship in the same release)

| File | Current | Replace with |
|---|---|---|
| `app/terms-conditions/page.tsx` (~l.109) | "All systems we build are POPIA-compliant and hosted on South African cloud infrastructure where possible." | `We design every system we build to meet POPIA requirements, and host on South African infrastructure where possible.` |
| `app/resources/popia-ai-checklist/POPIAChecklistPageClient.tsx`: STATS | "83% of SA businesses unknowingly non-compliant" (unsourced) | `R10M` / `Maximum administrative fine under POPIA` |
| same: STATS | "R10M maximum penalty" | `1,220+` / `Breach notifications to the Regulator in five months of 2026` (source link: Polity, 1 Sep 2026) |
| same: STATS | "30 days to respond to data subject requests" | `Verify against PAIA/POPIA s23 before shipping, or remove` |
| same: form `onSubmit` | **Simulated.** Collects name, email and consent, then sends nothing. | **Wire to the existing Brevo path** (`/api/newsletter` or `/api/lead`) with the checklist delivered by email, **or unpublish the page** until it works. A POPIA-safe brand cannot run a form that collects personal information and does nothing with it. |
| `app/insights/articles.ts` (~l.243) | "The Information Regulator established an AI-focused committee in 2024…" | Verify and cite, or remove the sentence. |
| `app/privacy-policy/page.tsx` title | "Privacy Policy \| Maru AI - PAIA Compliant \| South Africa" | `Privacy Policy \| Maru Online` |
