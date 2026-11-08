# Copy and messaging review: Maru Online website

Review date: 6 November 2026 · Branch reviewed: `review/final-release` · Status: **Phase 1 findings only. No site file has been changed, committed or pushed.**

Finding IDs are stable so you can approve them by ID for Phase 2. Items marked `[CONFIRM]` need a fact from you; nothing has been invented.

**Coverage statement.** This review is **not complete**. See "Coverage and limits" at the end for what was read in full, partly, or not at all.

---

## 1. Executive summary

**Overall.** The core pages (homepage, About, Invara, the published guides) are written in a measured, plain register, and the Invara data section and the "How much weight to put on these numbers" callout in the AI-landscape insight are good models of hedged, accurate writing. The site is let down less by tone than by **inconsistency between surfaces**: the metadata and a second, older content hub still describe a different business, the journey after the POPIA review promises a step that does not exist, and the process is described thinly and in several versions.

**Reachability note.** `next.config.ts` redirects `/booking`, `/careers`, `/ai-in-action`, `/design-system`, `/case-studies*` and `/resources/popia-ai-checklist`, and `/operations-assessment` now resolves to `/popia-ai-check`. Copy on those retired pages is therefore not public. It is listed once (CS-01, BK-01) as dead copy to delete or rewrite before any page returns.

### Highest-impact issues

1. **PC-01. The review's "next step" promise has no delivery.** The done screen says the report "will invite you to request a proposal" and that you then arrange a call. The v3 report has no such request or link. The privacy policy repeats the proposal path. The journey after the free review is described three different ways.
2. **SM-01 to SM-03. Site-wide metadata still sells the old business.** Root title, description, Open Graph, JSON-LD and `siteConfig` say "cut costs", "Free assessment", "AI That Actually Works", "bridge to the Age of AI", "cutting-edge". Search results and link previews are the first copy many due-diligence readers see.
3. **LG-01. A second, older content hub is still live at `/insights`.** It carries eight pre-repositioning articles (diagnostic language, ROI formulas, rand savings, retainer and fixed-scope pricing talk) that contradict the "no money claims" decision. `/resources` and `/knowledge` redirect to it, not to Guides & Resources.
4. **PR-01. The process is thin and exists in several versions.** Homepage (3 steps), About (3 verbs), Working With Us (no steps at all), Terms (the only timeline and client responsibilities), Invara (5 stages). "Scoped discovery process" is used once and never explained. The homepage step 3 measures "against an agreed baseline" that no step creates.
5. **HP-06 / HP-10. The homepage leads with one problem and sells another, and "POPIA-aware" is never defined.** The hero asks "Is it POPIA-aware?"; the problem section is about disconnected systems. There is no proof element on the homepage, and the one case (GrowthIQ) is credited inconsistently in dead files.
6. **PC-04. Absolute and assurance wording in the POPIA review.** "Well protected", "Your foundations are sound.", self-reported answers restated as fact ("Only the right people can reach client information…"). This sits next to a disclaimer saying the review is not a guarantee.
7. **PT-01. `/partners/[partnerId]` is live, uses retired gold, an outdated offer ("free digital audit", "marketing funnel is leaking"), and prints any name placed in the URL as a welcome.**
8. **Naming drift.** The review has six names and its deliverable six more; the guide hub has four spellings; the lead-magnet reading time is stated as 10 and 15 minutes.
9. **Colloquial wording and contractions** across guides and the assessment ("eat hours", "do not automate a mess", "scramble", "real digging", "slip through").
10. **Time-sensitive claims**: "Three things to do this month", the 30 November policy deadline, and "As at March 2026" for the Regulator's guidance all need a re-check or a dated label.

### Recommended fix order

| Order | Batch | Findings |
|---|---|---|
| 1 | Decisions needed first (no edits yet) | PC-01, LG-01, PT-01, PR-01 scope |
| 2 | Metadata and canonical terms | SM-01 to SM-06, PC-02, GR-01 |
| 3 | Journey copy: review, contact, errors | PC-01 (after decision), CT-01 to CT-04, SM-05 |
| 4 | Homepage, About, Working With Us | HP-*, AB-*, WW-*, PR-01 wording |
| 5 | Guides and insight entries | GR-*, LM-* |
| 6 | Invara | INV-* |
| 7 | POPIA review templates (needs addendum update first) | PC-04, PC-05 |

---

## 2. Site narrative map and where it breaks

| Stage | What the site says | Where | Break |
|---|---|---|---|
| Who we serve | "South African businesses" (home); "implementers who disburse on behalf of sponsors" (Invara). SME owners and enterprise buyers are never named. | `/`, `/invara` | Audience is implied, not stated. Legacy hub and `siteConfig` say "SMEs". |
| Problem | Hero: AI use and POPIA. Problem section: "Disconnected systems create unnecessary work." | `/` | **Two different problems.** No sentence connects them. (HP-06) |
| Offer | 3 capabilities, plus 3 steps, plus Working With Us "start with the problem, not a package". | `/`, `/working-with-us` | Capabilities, steps and engagement are three taxonomies. Which one is "the offer" is unclear. |
| Delivery | 3 steps (home), 3 verbs (About), none (Working With Us), 5 stages (Invara). | multiple | Thin and inconsistent. (PR-01) |
| Proof | GrowthIQ on About, with no outcomes yet (honestly stated). Tool ticker claims "we have delivered". | `/about`, `/` | No proof on the homepage. The ticker over-claims. |
| Next step | Free POPIA review → report → "request a proposal" → call; or Contact form. | `/popia-ai-check`, report, `/contact` | **Report has no next step.** (PC-01) |
| Guides | Guides & Resources hub (published) and a legacy Insights hub (live). | `/insights-resources`, `/insights` | Two hubs, two voices. (LG-01) |
| Invara | Separate product, pilot phase. | `/invara` | Voice is distinct (flag only). Tense mixes "is" and "is being built". (INV-01) |

---

## 3. Term and claim register

### Terms

| Concept | Variants found | Recommended canonical |
|---|---|---|
| The free review | "Free POPIA review" (nav, footer), "Free, informational POPIA review", "Take the free POPIA review", "POPIA AI check", "free review", "assessment", "operations assessment" (stale) | **Free POPIA review**; first mention on a page: "free, informational POPIA review". Retire "check", "assessment", "operations assessment". |
| What it produces | "short summary", "short report", "detailed report", "personalised report", "informational summary", "free detailed report" | **Your report** (page) and **summary email** (message with the link). [CONFIRM what the email contains] |
| Guides section | "Guides & Resources" (nav), "Guides and resources" (eyebrow), "Insights & Resources" (breadcrumbs), "Insights" (legacy) | **Guides & Resources** in titles and navigation; "guides and resources" in running text. |
| Section names | "AI insights for business" / "AI Insights for Business"; "Resources and best practice" / "Resources & Best Practice" | Sentence case, "and" in running text. |
| Process | "How we work" (3 steps), "Understand the business. Design the solution. Make it work.", "scoped discovery process", "defined implementation plan", 4-phase naming in `cc-handover/CLAUDE.md` (stale) | One three-step method (see section 6). |
| POPIA positioning | "POPIA-aware", "POPIA compliance", "protected" | **POPIA-aware** (defined, HP-10). Never "compliant" or "protected" as an outcome. |
| Disclaimer | Three variants (home, About, Working With Us) | One sentence (SM-06). |
| Lead magnet | "AI and POPIA" guide, "the guide", "free guide", "Get the guide" / "Read the guide." | **AI and POPIA guide**; CTA "Get the guide". |
| Location | "Gauteng, South Africa" (footer, OG); `siteConfig` also lists KZN (Ballito) and Gauteng (Linden) | [CONFIRM] which to show. |

### Claims

| Claim | Where | Status |
|---|---|---|
| Only the POPIA review is free | `CLAUDE.md`-style rule in code comments | `/booking` meta said a "free 20-minute discovery call" (dead page). Root metadata says "Free assessment". Fix SM-01. |
| "10 questions, about five minutes" | home, `/popia-ai-check` | [CONFIRM] timed. |
| Guide reading time | "About fifteen minutes" (landing), "About 15 minutes" (promo), "about ten minutes" (`/insights` promo, delivery email) | Conflict. LM-02. |
| Guide structure | "Two short primers, five parts, one self-check" | Five parts listed. LM-01. |
| GrowthIQ role | About: research, strategy, positioning, brand. Dead case-study files: "built" the platform. | About is the source of truth. CS-01. |
| Tools "we have delivered" | Ticker incl. Azure, Notion, Make, Calendly | [CONFIRM] each. Calendly is retired. HP-05. |
| Pilot delivery in 2–4 weeks | Terms §3 only | Not on any marketing page. [CONFIRM] whether to state. |
| No AI-specific statute in South Africa; no Regulator guidance on section 71 | Policy-reset and section 71 entries | Dated "as at March 2026". Re-check. GR-07. |

---

## 4. Duplication register

| ID | Cluster | Locations | Verdict | Source of truth and action |
|---|---|---|---|---|
| DUP-01 | POPIA disclaimer | Home (small tertiary text), About, Working With Us (different wording), entries' `legalNote`, report closing line | **Confusing**: three wordings | Use SM-06 wording once per page in the same place. Legal-note on entries is deliberate; keep. |
| DUP-02 | "POPIA-aware" explanation | Home section, About "Responsible implementation" (near verbatim) | **Confusing** | Home holds the definition (HP-10). About: one sentence and a link. AB-04. |
| DUP-03 | Process formulation | Home 3 steps; About "Understand the business…"; Working With Us; Invara 5 stages | **Confusing** (3 versions) | Home "How we work" is the source of truth. About links to it. Invara's stages are a product workflow, not the engagement method; label them so. |
| DUP-04 | Scope-and-investment chain | Working With Us, three places | **Confusing** | Keep once under the investment heading. WW-01. |
| DUP-05 | "Describe your challenge" prompt | Contact page, five times | **Confusing** | Keep form heading. CT-01. |
| DUP-06 | Contact acknowledgement | Success message, line under button, email | Deliberate in part | CT-02, CT-04. |
| DUP-07 | Meta descriptions | Home and About identical; root and OG stale | **Confusing** | AB-01, SM-01. |
| DUP-08 | Guide promotion | Landing, promo card, `/insights`, delivery email, results screen, report | Deliberate repetition, **conflicting facts** (time, structure) | One fact set in `lib/guides` config. LM-01, LM-02. |
| DUP-09 | POPIA review description | Nav, footer, home card, `/popia-ai-check`, hubs | Deliberate | Source: `/popia-ai-check`. Keep label consistent (PC-02). |
| DUP-10 | Two content hubs | `/insights` (legacy) and `/insights-resources` | **Confusing** | LG-01. |
| DUP-11 | GrowthIQ description | About, dead case-study files | Confusing if reinstated | About is source. CS-01. |
| DUP-12 | Invara side-by-side claims | Lines 476 and 479 ("AI speeds up capture…" and "designed to make review and approval clear…") | Low | INV-05. |

---

## 5. Page-by-page findings

Severity: High, Medium, Low. Criteria: Clarity, Duplication, Explanation, Coherence, Language.

### 5.1 Site-wide and shared (SM)

**SM-01 · `app/layout.tsx` metadata · Coherence · High**
Current: title "AI & Automation Consultants for Growing SMEs | Maru Online"; description "We find where your processes are costing you time and money — then build AI-powered workflows that cut costs and free your team. Free assessment."; Open Graph title "AI That Actually Works for Your Business — Not Just Another Tool" with "Free assessment for growing SMEs".
Issue: States a retired positioning, a cost-saving promise and a free "assessment" the site no longer offers.
Replace:
- Title: `POPIA-Aware AI Implementation for South African Businesses | Maru Online`
- Description: `Maru Online designs and implements practical AI-enabled workflows around the tools South African businesses already use, with POPIA-aware information handling.`
- OG title: `POPIA-aware AI implementation for South African businesses`
- OG description: `Practical AI-enabled workflows built around your existing tools. Start with the free, informational POPIA review.`

**SM-02 · `config/site.ts` description · Language · High**
Current: "We're your bridge to the Age of AI, combining comprehensive marketing solutions with cutting-edge AI technology to make your business smarter, faster, and more competitive."
Issue: Buzzwords, superlatives and a "marketing solutions" offer the site does not make.
Replace: `Maru Online designs and implements practical AI-enabled workflows and digital systems for South African businesses, with POPIA-aware information handling.`

**SM-03 · JSON-LD (root layout) · Coherence · Medium**
Current: "AI implementation consultancy for South African SMEs. We find where manual processes cost time and money, then build AI-powered workflows that cut those costs." `knowsAbout` includes "AI readiness assessment".
Replace: `AI implementation consultancy for South African businesses. We design and implement practical AI-enabled workflows around the tools teams already use.` Replace the `knowsAbout` entry with "POPIA-aware AI implementation". [CONFIRM] remaining `knowsAbout` items.

**SM-04 · `siteConfig` addresses vs footer · Coherence · Low**
Issue: `siteConfig` lists KZN (Ballito) and Gauteng (Linden) addresses and a phone number; footer and OG image say only "Gauteng, South Africa". [CONFIRM] which locations to show anywhere.

**SM-05 · `app/global-error.tsx` and missing 404 · Clarity · Medium**
Current: "Something went wrong" / "The page failed to load. Try again — if it keeps happening, please let us know."
Issue: No way to "let us know". There is no `app/not-found.tsx`, so missing pages show the framework default.
Replace (error): `This page could not be loaded` / `Please try again. If the problem continues, email hello@maruonline.com.`
Replace (new 404): `Page not found` / `This page does not exist or has moved. Return to the homepage, or contact us if you expected to find something here.`
Styling note (out of scope): `global-error.tsx` uses a gold-gradient button, which conflicts with "gold retired".

**SM-06 · Disclaimer, three variants · Duplication · Medium**
Current (home and About): "Maru Online provides implementation and design support. This is not legal advice or a blanket guarantee of POPIA compliance." Working With Us: "Our work focuses on business, systems, workflow, and implementation decisions…"
Issue: Three wordings; "blanket guarantee" implies a partial guarantee exists.
Replace (one canonical line): `Maru Online provides implementation and design support. This is not legal advice, and it does not guarantee POPIA compliance.`
Styling note (out of scope): on the homepage the line is set in tertiary ink (3.34:1), which the design system limits to non-essential text. This is essential text.

**SM-07 · Footer "Cookie Preferences" · Coherence · Low**
Issue: The cookie policy says the banner is one accept or decline choice with no preference centre. "Preferences" suggests more. Replace with `Cookie settings` [CONFIRM what the link opens].

**SM-08 · Redirect targets · Coherence · Medium**
Issue: `/resources` and `/knowledge*` redirect to `/insights` (legacy hub) rather than Guides & Resources. Decide with LG-01. Also, old article URLs go to `/operations-assessment` and then `/popia-ai-check` (two hops), although the config comment says single hop. Logic is out of scope; flagged for you.

### 5.2 Homepage (`app/page.tsx`, `components/homepage/*`)

**HP-01 · How we work intro · Clarity · Medium**
Current: intro names "design, integrate, test, and refine"; the three steps are "Business and workflow assessment", "AI system design and integration", "Optimisation and handover".
Issue: Four verbs, three steps; "test" and "refine" belong to no step.
Replace: `Each engagement follows three steps: assess the workflow, design and integrate the system, then optimise it and hand it over.`

**HP-02 · Step 3 baseline · Explanation · Medium**
Current: "Measure performance against an agreed baseline."
Issue: No earlier step creates a baseline.
Replace step 1 (add): `Record how the work is done today, including the time it takes, so improvement can be measured later.` Keep step 3 as is. Full wording in section 6.

**HP-03 · Problem cards · Language · Low**
Current: "Routine administration adds up." / "More manual work, more room for error." / intro "information-handling becomes harder to manage."
Replace: `Routine administration consumes staff time.` / `More manual work increases the risk of error.` / `information handling becomes harder to manage.` (no hyphen).

**HP-04 · Image band alt text · Clarity · Low**
Current alt: "Two professionals celebrating a win together in the office"
Issue: Describes a celebration the page does not claim; reads as an outcome claim.
Replace: `Two colleagues talking together in an office.` [CONFIRM against the image]

**HP-05 · Tools band · Coherence · Medium**
Current: "The platforms behind the websites, systems and automations we have delivered." Ticker items include Microsoft Azure, Notion, Make and Calendly, with "kind" labels such as "Interfaces", "Code" and "Language".
Issue: A delivery claim for each tool; Calendly is retired; labels are jargon to a non-technical owner.
Replace: `Platforms we work with.` Remove any tool not used in delivered work or no longer in use. [CONFIRM list]. Replace jargon labels with one neutral label or none.

**HP-06 · Hero to problem bridge · Coherence · High**
Issue: The hero raises POPIA and unmanaged AI use; the next section sells integration of disconnected systems.
Replace (add as the problem-section lead-in, one sentence): `Most businesses meet AI through the tools their team already uses. The same disconnection that creates manual work also makes it harder to see where personal information goes.`
Also add one proof pointer in the "next steps" band: `See an example: GrowthIQ, an AI-enabled supplier-development platform Maru Online contributed research, strategy and brand work to.` Link `/about#growthiq`.

**HP-07 · Capabilities · Language · Medium**
Current: "Connected infrastructure that evolves with the business"; "Websites, web applications, and e-commerce platforms"; card titles "Business and AI Strategy", "Digital Systems and Integration", "Data-Informed Growth Systems".
Replace: `Systems that can be extended as the business changes`; sentence-case titles ("Business and AI strategy" and so on). [CONFIRM] "e-commerce platforms" is a current capability. "Data-informed growth systems" is vague; [CONFIRM] what it covers before rewriting.

**HP-08 · Hero lead verb · Language · Low**
Current: "…helps South African businesses solve operational problems by designing and implementing practical AI-enabled workflows…"
Replace "solve" with "resolve".

**HP-09 · Next steps copy · Clarity · Low**
Current: "…Maru Online can help you identify a practical way forward."
Replace: `…Maru Online can help you identify a practical next step.` Card bullets are clear. Keep.

**HP-10 · "POPIA-aware" is undefined · Explanation · High**
Issue: The positioning term appears in the title, hero eyebrow, section and footer. A non-technical owner cannot explain it to a colleague.
Replace (home POPIA-aware section lead): `POPIA-aware means that, when we design a workflow, we consider how personal information is collected, stored, shared and kept, and we document those decisions with you. It does not mean the result is certified or guaranteed to comply.` [CONFIRM wording is true to practice]

### 5.3 Working With Us (`app/working-with-us/page.tsx`)

**WW-01 · Investment chain repeated · Duplication · Medium**
Current: "The business challenge determines the workflow… Those factors determine the scope and investment." Repeated as "Scope and complexity determine the investment" and "Investment depends on…".
Action: Keep the chain once, under the investment heading. Shorten the other two to one clause or remove.

**WW-02 · Title promises a process the page does not give · Explanation · High**
Current title: "Working With Us | How a Maru Online Engagement Takes Shape". The page has no steps, timeline or client responsibilities.
Replace title: `Working With Us | How a Maru Online Engagement Is Scoped`, **or** add the process block in section 6. Recommend adding the block.

**WW-03 · Final CTA terms undefined · Explanation · High**
Current: "a scoped discovery process, or a defined implementation plan".
Issue: Neither term is explained. Code comment says discovery is not described as free, so the page must not imply it is.
Replace: `After the informational POPIA review, the next step is either a scoped discovery phase, which confirms the problem, the systems involved and the scope, or a defined implementation plan where those are already clear. We agree scope and cost in writing before work starts.` [CONFIRM discovery is paid and the sequence]

**WW-04 · Disclaimer variant · Duplication · Medium** (see SM-06).

### 5.4 About (`app/about/page.tsx`)

**AB-01 · Meta description duplicates the homepage · Duplication · Medium**
Replace: `Maru Online is a South African consultancy that designs and implements AI-enabled workflows and digital systems, with POPIA-aware information handling. Read how we work and what we have contributed to.`

**AB-02 · Third process formulation · Coherence · Medium**
Current: "Understand the business. Design the solution. Make it work."
Replace: `Assess the workflow. Design and integrate the system. Optimise and hand over.` Link "How we work" on the homepage.

**AB-03 · GrowthIQ block 04 · Clarity · Medium**
Current: "translate that strategy into a distinctive digital experience"
Issue: Ambiguous about who built the platform; "distinctive" is promotional.
Replace: `Maru Online's brand and positioning work carried that strategy into the platform's identity.` [CONFIRM who designed and built the platform]. Keep the honest line "The platform has recently launched, so measurable post-launch business outcomes are not yet available." It is the best proof sentence on the site.

**AB-04 · "Responsible implementation" repeats the homepage · Duplication · Medium**
Action: Reduce to one sentence plus SM-06, linked to the homepage section. Draft: `We design with POPIA in mind and document how personal information is handled.` + SM-06.

**AB-05 · Closing CTA · Language · Low**
Current: "Let's solve the right problem." / "Let's identify the challenge, assess the opportunity, and outline a practical next step."
Replace: `Start with the right problem.` / `We identify the challenge, assess the opportunity and outline a practical next step.`

**AB-06 · Unspaced em dash · Language · Low**
Current: "problem—not …" (also Invara line 479). Spaced em dashes appear in legacy articles.
Replace: avoid em dashes in running copy; use a comma, colon or full stop.

**AB-07 · "Businesses do not necessarily need more tools" · Coherence · Low**
Issue: Sits uneasily beside Invara, a product. Flagged, not unified. Suggest a clause on Invara's page: "Invara is a Maru Online product, separate from our consulting work."

### 5.5 Contact (`app/contact`)

**CT-01 · Challenge prompt repeated five times · Duplication · Medium**
Current: hero "Let's discuss your" / "business challenge."; form heading "Describe your challenge."; intro, label and placeholder repeat it.
Replace: hero lead `Tell us what you want to resolve. We will reply with a suggested next step.`; label `What would you like to resolve?`; placeholder `A short description of the workflow, system or problem.` Keep the form heading.

**CT-02 · Success and under-button lines duplicate · Duplication · Low**
Current: "Thank you. We will review your enquiry and be in touch about the next step." and the same text under the button.
Replace under-button text with a fact: `We reply by email within [CONFIRM] business days.` Do not state a response time until confirmed.

**CT-03 · Raw API errors · Clarity · High**
Current: "Invalid input.", "Failed to send message.", "Something went wrong.", "reCAPTCHA not ready".
Replace: `Please check the fields marked and try again.` / `Your message could not be sent. Please try again, or email hello@maruonline.com.` / same as previous for the generic case / `The security check is still loading. Please wait a moment and try again.`

**CT-04 · Acknowledgement email · Language · Low**
Current: "Thank you. We'll be in touch to discuss your enquiry." signed "— The Maru Online Team".
Replace: `Thank you for contacting Maru Online. We have received your enquiry and will reply by email about the next step.` Sign: `Maru Online`.

**CT-05 · Invara arrivals · Coherence · Medium**
Issue: Invara CTA goes to `/contact?service=invara#contact-form`, but the hero speaks of a "business challenge". [CONFIRM] whether the form adapts to `service=invara`.

### 5.6 POPIA review (`app/popia-ai-check`, report, assessment libs)

**PC-01 · Done screen promises a proposal step the report lacks · Coherence · High**
Current: "The report will invite you to request a proposal. We then contact you to arrange a short call at a time that suits you… If there's no clear opportunity, we'll tell you."
Issue: The v3 report page contains no proposal request, call link or contact link. The privacy policy also refers to "a conversation with you if you ask for a proposal".
Decision needed (A or B):
- A. Add a "Discuss this report" link to `/contact` on the report (code change, outside copy scope), and use: `Your report is on its way. If you would like to discuss it, contact us and we will arrange a short call. If we do not see a clear opportunity, we will tell you.`
- B. Remove the promise: `Your report is on its way. It lists the areas to review and the actions to prioritise.`

**PC-02 · Names for the review and its output · Coherence · Medium**
See section 3. Replace "POPIA AI check", "assessment" and "check" in visible copy, including `REPORT_CLOSING_LINE` ("This check is a starting point, not legal advice.") → `This review is a starting point, not legal advice.` (approved text: update the addendum first).

**PC-03 · Repeated sentence · Duplication · Low**
Current: "Answer based on what happens today." followed by a near repeat.
Replace with one sentence: `Answer for how your business works today, not how it should work.`

**PC-04 · Absolute or assurance wording · Language · High**
Current: level "Well protected"; "Your foundations are sound."; "Only the right people can reach client information, and access ends on a leaver's last day."; "Both are exactly what clients and the Information Regulator ask about."
Issue: The levels and sentences state outcomes as fact from self-reported answers.
Replace:
- Levels: "Exposed" (keep), "Partly protected" → `Partly in place`, "Well protected" → `Largely in place`.
- `Your answers describe sound foundations.`
- `Based on your answers, only the right people can reach client information, and access ends on a leaver's last day.`
- `Clients and regulators commonly ask about both.`
Note: "approved verbatim" copy. Update COPY-DECK-ADDENDUM-02/03 before changing code.

**PC-05 · Colloquial wording and contractions · Language · Medium**
See section 7. Examples: "It's the quickest way to get things done" → `It is the quickest way to complete the work.`; "People use whatever they like" → `Staff choose their own tools.`; "We'd scramble" → `We would struggle to respond.`; "real digging" → `detailed investigation`; "slip through" → `go unnoticed`; "an open door" → `unrestricted access`; "no guard rails" → `no controls`. Exact sentences must be edited in context. Same addendum rule.

**PC-06 · Time claim · Clarity · Low** "Answer 10 questions in about five minutes" [CONFIRM timed].

**PC-07 · Two consent wordings · Coherence · Medium**
Current (review gate): "Also send me occasional notes on using AI safely under POPIA. Unsubscribe from any email." The guide uses `MARKETING_CONSENT_TEXT`, which is verbatim handover text.
Issue: Two different consent texts for the same list. [CONFIRM] whether the review should use the same constant. Not rewritten.

**PC-08 · Area statuses · Language · Low**
"Critical gap", "Significant gap", "Partial", "Strong" mix adjectives and a noun. Replace "Partial" with `Partly in place` and "Strong" with `Largely in place` for consistency with PC-04.

### 5.7 Guides & Resources (`app/insights-resources`, entries)

**GR-01 · Section naming · Coherence · Medium**
See section 3. Standardise breadcrumbs to "Guides & Resources"; sentence-case section names.

**GR-02 · Empty states · Language · Low**
Current: "The first featured piece is in preparation." / "Nothing here yet."
Replace: `Featured guidance will appear here.` / `There are no entries in this section yet.`

**GR-03 · "Download" label on a web page · Clarity · Medium**
`Cards.tsx` `actionLabel` shows "Download" for worksheet cards, but the readiness worksheet is a web page. Replace with `Open`.

**GR-04 · Titles end with full stops · Language · Low**
e.g. "Automation and workflows guide: turn repeated administration into a reliable process." Remove trailing full stops from titles; keep sentence case. Mixed curly and straight apostrophes: use curly throughout.

**GR-05 · Colloquial wording in guides · Language · Medium** (`automation-workflows-guide.ts`)
- "Most businesses have a handful of tasks that eat hours every week" → `Most businesses have a handful of tasks that consume hours every week`
- "Done badly, it just makes mistakes faster." → `Poorly designed automation repeats errors at speed.`
- "Do not automate a mess." → `Do not automate a process that is not settled.`
- "Automation fixes a process in place, and a process nobody agrees on will be fixed in the wrong shape." → `Automation locks a process in place, and a process nobody agrees on will be locked in the wrong shape.`
- Readiness guide: "A low score tells you what to fix first" → `A low score shows what to address first`; "Fix this first" → `Address this first`; "What you will walk away with" → `What this guide gives you`. Integration guide: "fix what does not" → `correct what does not`. "Nothing to hold you back" → `Nothing prevents you from starting`.

**GR-06 · Policy-reset entry: relative time · Clarity · Medium**
Current heading: "Three things to do this month"
Replace: `Three things to do now`. Add a dated line under the title: `Position as at 6 November 2026.` Re-check on and after 30 November 2026, since the entry's own comment says the timeline "has moved twice already".

**GR-07 · Absolute negatives dated March 2026 · Language · Medium**
Current: "As at March 2026, commentators reported none." (section 71 entry) and "As at March 2026, commentators reported that the Information Regulator had published no guidance on AI risk or on section 71." (policy reset).
Issue: Eight months old and an absolute negative. [CONFIRM] re-check Information Regulator publications before release; otherwise state `We have not found published guidance from the Information Regulator on section 71 and AI at the date above.`

**GR-08 · Section 71 entry: unsupported generalisations · Language · Medium**
Current: "…and few owners know it is there." / "The sound reading is the one law firms advising employers are already giving…"
Replace: delete the first clause; second → `Law firms advising employers describe the same approach: AI output is an input to a human decision, and the person deciding must be able to explain the reasons and be empowered to override.` Source: Bowmans (already cited).

**GR-09 · Sources · Coherence · Low**
Xero URL uses `xero.com/ae/` (UAE locale) for a South African report; Bowmans "5 of 6" has no URL. [CONFIRM] correct links.

**GR-10 · Readiness guide read time · Clarity · Low** Shows "8 min read" though the worksheet takes about twenty minutes. Replace with `8 min read · about 20 minutes to complete the worksheet`.

**GR-11 · Insight heading · Clarity · Low** "What we would do differently" (AI-landscape entry): different from whom? → `What we would do`.

### 5.8 AI and POPIA lead magnet (`app/guides/ai-and-popia`, `lib/guides`)

Currently `GUIDE_LIVE=false`; the landing page returns 404 in production. Review is of source copy only.

**LM-01 · Structure claim · Clarity · Medium**
Current: "Two short primers, five parts, one self-check." Only five parts are listed.
Replace: `A short guide in five parts, with a one-page self-check.` [CONFIRM final PDF structure]

**LM-02 · Reading time conflict · Coherence · High**
Landing "About fifteen minutes to read."; promo "About 15 minutes"; `/insights` promo and delivery email "about ten minutes".
Replace everywhere with one figure in numerals, e.g. `about 15 minutes`. [CONFIRM from final PDF]

**LM-03 · Title format · Language · Low** Entry title ends with a full stop; email uses Title Case; promo uses sentence case. Standard: `AI and POPIA: a guide for South African business owners` (no full stop).

**LM-04 · CTA mismatch · Coherence · Medium**
"Read the guide." on the results screen and report links to a form page headed "Get the guide". Replace label with `Get the guide`. Thank-you "Download the guide (PDF)" is accurate.

**LM-05 · Unapproved wording · Coherence · Medium**
`ConfirmNotes` and `buildConfirmEmail` are marked "DRAFT WORDING — NOT APPROVED" and use contractions. Must be finalised before `GUIDE_LIVE`. Not rewritten.

**LM-06 · `/insights` promo while guide is off · Coherence · Medium**
The `/insights` hero promo links to `GUIDE_PATH`. [CONFIRM] it is hidden while `GUIDE_LIVE=false`.

### 5.9 Invara (`app/invara/page.tsx`)

Voice differs deliberately and is not unified here.

**INV-01 · Present-tense claims on a pilot product · Coherence · Medium**
Current: hero "Capture once. Approve once. Report to every sponsor from the same record." beside "Invara is in its pilot phase."; line 476: "Invara is being built so that AI classifies incoming items…".
Replace the pilot statement: `Invara is in its pilot phase. This page describes how it is designed to work.` Use "is designed to" consistently.

**INV-02 · Absolute statements · Language · Medium**
Line 392: "Every field has a source and an approver, so sponsor or verifier questions can be answered with evidence rather than reconstruction." → `Each field is designed to carry its source and approver, so sponsor or verifier questions can be answered with evidence rather than reconstruction.`
Line 537: strong "Nothing gets lost." → `Every change is recorded.` [CONFIRM audit log exists in the pilot]
Line 496: "No app to install and no password to remember." [CONFIRM true for all roles].

**INV-03 · Colloquial · Language · Low** "Spend without proof slips through" → `Spend without evidence goes unnoticed`.

**INV-04 · Undefined acronyms · Explanation · Medium**
Title and hero use ESD and CSI without expansion (About expands ESD). Add on first use: `Enterprise and Supplier Development (ESD) and Corporate Social Investment (CSI)`. [CONFIRM terms used by sponsors]

**INV-05 · Side-by-side repeat · Duplication · Low** Lines 476 and 479 say the same thing twice. Keep 476; replace 479 with `Review and approval are part of the workflow, not an afterthought.`

**INV-06 · Good model · Note** The data and POPIA section (line 616) is correctly hedged ("The exact controls depend on…"). Use it as the pattern for the home POPIA-aware section.

Styling note (out of scope): gold is still used at lines 461, 464, 475 and 564.

### 5.10 Legacy Insights hub (`app/insights`, `articles.ts`)

**LG-01 · A second hub is live · Coherence · High**
Current: `/insights` hero "AI and POPIA, in plain language." with eight articles dated February–March 2026, including "What a Maru diagnostic actually finds", "Fixed-scope vs retainer: How to think about AI implementation spend", and "Three automations every medico-legal practice should have" (which cites "R2,500–R4,000 per month in recovered capacity").
Issue: Money and ROI claims contradict the stated positioning; "diagnostic", "retainer" and "cost map" language is retired; not in nav or sitemap, but indexable (it is noindex only when there are zero articles), reached by `/resources` and `/knowledge` redirects, and fed by a cron job.
Recommendation: Decide: (A) redirect `/insights` and `/insights/*` to `/insights-resources` and retire the cron target, or (B) rewrite to the current voice. Recommend A.
The page's own copy ("Or talk to us", "Take the free, informational POPIA review") is acceptable.

### 5.11 Partner pages (`app/partners/[partnerId]`)

**PT-01 · Retired offer, retired colour, unvalidated name · Coherence · High**
Current: "Welcome, clients of {partnerName}"; "complimentary digital performance audit — a short review that shows where your marketing funnel is leaking."; button "Claim your free digital audit"; "Available to the {partnerName} network." Gold gradient button and gold name.
Issue: The offer does not exist elsewhere on the site; it contradicts "only the POPIA review is free"; the partner name is whatever appears in the URL, so anyone can make a page that appears to welcome "clients of" any organisation. [CONFIRM] whether a partner programme exists and whether the layout sets noindex.
Recommendation: retire or redirect until a programme is confirmed. If retained: validate against a list of partners and replace the offer with the free POPIA review.

### 5.12 Legal pages (consistency only; no rewrites)

**LG-02 · Terms service list · Coherence · Medium**
Terms §2 lists "Lead generation and AI lead scoring systems", "Sales automation and CRM integration", and §1 "AI automation, marketing, or consulting services". Current offer is workflow design and integration. [CONFIRM] whether to update the legal text (not rewritten here).

**LG-03 · Terms "We guarantee" list · Coherence · Medium**
"Systems will function as specified in the agreed scope" is an absolute inside a contract context. Marketing copy must not echo it. Flag for legal review.

**LG-04 · Date formats · Language · Low**
Legal pages: "October 13, 2026", "October 8, 2026", "January 1, 2025" (US style). Site style is South African: `13 October 2026`. Cookie policy effective date (1 January 2025) predates its October 2026 revisions: [CONFIRM] "last updated".

**LG-05 · Timeline and responsibilities only in the Terms · Explanation · Medium**
Terms §3 (pilots in 2–4 weeks), §4 (client responsibilities, feedback within 5 business days) and §8 (30-day bug fixes, training and documentation) are the only description of delivery. Use as source for section 6 once confirmed.

**LG-06 · Cookie policy heading "5. POPIA Compliance" · Language · Low** Heading asserts compliance. Flag only.

**LG-07 · Privacy policy and automated analysis · Clarity · Medium**
The policy describes fixed-rule scoring. `lib/assessment/synthesisPrompt.ts` describes analysis of the visitor's website. [CONFIRM] the policy and the review's page disclose any AI-generated element of the report.

### 5.13 Retired and redirected pages (not public)

**CS-01 · `/case-studies`, `/case-studies/growthiq`, `/ai-in-action`, `/careers` files · Coherence · Low**
These redirect (307) to `/about#growthiq`, `/`, `/about`. The files still contain scaffold text ("Placeholder — not real content"), the claim that Maru "built" GrowthIQ, "Start with the free operations assessment…", a "See pricing" link to the non-existent `/contact#how-we-price`, and the promise "Engagements documented end to end — … and the numbers afterwards." Delete the files or rewrite before reinstating. `CASE_STUDY_PATH` in `lib/case-study.ts` points to a path that redirects.

**BK-01 · `/booking` · Coherence · Low**
Redirects (308) to `/contact`. File meta says "free 20-minute discovery call" and assumes a POPIA review was taken. Delete or rewrite. `BookingTracker` and `chatbot_handoff_to_booking` events refer to a retired flow.

---

## 6. Process explanation gaps and draft wording

All `[CONFIRM]` items need your decision. Where the Terms already say something, it is used.

### PR-01 · The engagement method (homepage "How we work", mirrored briefly on Working With Us)

| Step | What happens | Who does it | What you get | Why it matters |
|---|---|---|---|---|
| 1. Business and workflow assessment | `We map how the work is done today: the steps, the people involved, the tools and where information is entered more than once. We record how long the work takes, and what personal information is involved and where it is kept.` | `Maru Online leads. Your team gives us access to the people who do the work and to the tools they use.` | `A written summary of the current process, the problems worth solving and a recommended scope. [CONFIRM deliverable]` | `Scope and cost are set against a clear baseline, and improvement can be measured later.` |
| 2. AI system design and integration | `We design the workflow around the tools you already use, build and connect it, and test it with your team using real examples. Where AI handles information, we document what may be entered and who checks the output.` | `Maru Online builds. A named person in your business reviews and approves each stage.` | `A working workflow and a record of how it handles information. [CONFIRM]` | `A person checks the result before it affects a client, and information goes only where it is meant to.` |
| 3. Optimisation and handover | `We measure performance against the baseline from step 1, adjust the workflow, train your team and hand over documentation.` | `Maru Online with your team.` | `A workflow your team can run, with training and documentation, and 30 days of bug fixes after go-live (per Terms §8).` | `Your team can operate it without us, and you can see what changed.` |

Add under the steps (from Terms §4, [CONFIRM] whether to state publicly): `What we need from you: timely access to systems and data, a main point of contact, feedback within five business days, and your team's attendance at training.`
Add (if true): `Pilot projects are typically delivered within two to four weeks of kickoff. Larger implementations are timed in the proposal.` (Terms §3)

### PR-02 · After the POPIA review: what happens next
Draft for `/popia-ai-check` and the report (after PC-01 decision):
`Your report lists the areas to review and the actions to prioritise. If you would like help acting on it, contact us. We will suggest either a scoped discovery phase or an implementation plan, and agree scope and cost in writing before any work starts.`

### PR-03 · How the review works
Draft for `/popia-ai-check`:
`You answer 10 questions about how your team uses AI and handles information. Fixed scoring rules rate five areas and give an overall level. You receive a report with the areas to review and the actions to prioritise. The report is a general operational indicator. It is not legal advice and not a POPIA audit.` (consistent with Privacy Policy). [CONFIRM] who, if anyone, at Maru Online reads the answers, and the AI point in LG-07.

### PR-04 · Scoped discovery phase
Draft definition (Working With Us): `A scoped discovery phase is a defined piece of work in which we confirm the problem, the systems and information involved, and what a solution would need to do. It ends with a written scope, a plan and a cost.` [CONFIRM it is paid and its typical length]

---

## 7. Language register

| Flagged | Where | Replace with |
|---|---|---|
| solve | Home hero, About CTA | resolve, address |
| fix, "to fix first" | Guides | address, correct, remediate |
| eat (hours) | Automation guide | consume |
| mess | Automation guide | unsettled process |
| it just makes mistakes faster | Automation guide | repeats errors at speed |
| walk away with | Readiness guide | gain; "this guide gives you" |
| nothing to hold you back | Guides | nothing prevents you |
| scramble, "We'd scramble" | Assessment | struggle to respond |
| real digging | Assessment | detailed investigation |
| slip through | Assessment, Invara | go unnoticed |
| an open door | Assessment | unrestricted access |
| guard rails | Assessment | controls |
| get things done, get work done | Assessment | complete the work |
| People use whatever they like | Assessment | Staff choose their own tools |
| adds up | Home | consumes staff time |
| room for error | Home | risk of error |
| bridge to the Age of AI, cutting-edge, smarter, faster, more competitive | `siteConfig` | (delete) |
| AI That Actually Works | OG title | (delete) |
| celebrating a win | Alt text | neutral description |
| Well protected, Your foundations are sound | Review | Largely in place, Your answers describe sound foundations |
| exactly what clients and the Information Regulator ask about | Review | commonly ask about |
| Nothing gets lost | Invara | Every change is recorded |
| blanket guarantee | Disclaimer | does not guarantee |
| Contractions (We'll, it's, we'd, there's, Let's) | Contact email, review, About | Full forms, consistently |
| Em dashes, spaced and unspaced | Home, About, Invara, legacy articles | comma, colon or full stop |
| US date format | Legal pages | `13 October 2026` |
| Title Case in cards, titles ending with full stops | Home, guides | Sentence case, no full stop |
| hyphen: information-handling | Home | information handling |

Style rules to adopt: SA/British spelling (already followed: "optimisation", "programme"); numerals for times and counts ("15 minutes", "10 questions"); currency `R2 500` style [CONFIRM house style]; curly quotes and apostrophes throughout; "we" for Maru Online and "you" for the reader; present tense for what exists, "is designed to" for what is planned.

---

## 8. Open questions and facts to verify

1. [CONFIRM] PC-01: Option A (add a "discuss this report" link) or B (remove the promise)?
2. [CONFIRM] LG-01: Retire `/insights` (recommended) or rewrite? Where should `/resources` and `/knowledge` redirect?
3. [CONFIRM] PT-01: Does a partner programme exist? Should `/partners/*` be retired?
4. [CONFIRM] "About five minutes" for the 10-question review; guide length (16 pages) and reading time (10 or 15 minutes); guide structure (five parts; any "primers").
5. [CONFIRM] Tools in the ticker (Azure, Notion, Make, Calendly) and "e-commerce platforms" as a current capability.
6. [CONFIRM] Who designed and built GrowthIQ, and Maru Online's exact role.
7. [CONFIRM] Whether discovery is paid, its length, the deliverables in each step, and whether to publish "2–4 weeks" and the client responsibilities from the Terms.
8. [CONFIRM] Response-time promise for the contact form.
9. [CONFIRM] Locations to show (Gauteng only, or KZN too); phone number; the Facebook URL `/maruonlin/` (possible typo).
10. [CONFIRM] Whether the Information Regulator has published guidance on AI or section 71 since March 2026; King V dates; the 30 November policy deadline and March 2027 target (re-check on and after 30 November 2026).
11. [CONFIRM] Legal accuracy of review question 10 and of the section 71 entry against the Act (the entry's own comment says the owner verifies each section reference).
12. [CONFIRM] Whether the report discloses any AI-generated analysis (`synthesisPrompt.ts`), and the consent wording on the review gate vs `MARKETING_CONSENT_TEXT`.
13. [CONFIRM] Xero source URL (SA locale) and the Bowmans "5 of 6" URL.
14. [CONFIRM] Invara: audit log, passwordless access, and the terms ESD and CSI as sponsors use them. Does the contact form adapt to `?service=invara`?
15. Approved-copy rule: PC-02, PC-04, PC-05 require the COPY-DECK-ADDENDUM-02/03 to be updated first. Those files are not in this repo.
16. Observed outside scope: gold still used on Invara and in `global-error.tsx` and `/partners`; tertiary-ink disclaimer; redirect chain via `/operations-assessment`; chatbot context entries for `/careers` and `/ai-in-action` in `lib/whatsapp.ts`.

---

## Coverage and limits

**Read in full or in substance:** root layout and `siteConfig` metadata; homepage and its components; Working With Us; About; Contact; `/popia-ai-check` copy and the assessment template copy as summarised; Invara (all of `page.tsx`); five published entries (AI landscape, section 71, policy reset, automation guide, and the readiness and integration guides in earlier reading); Guides & Resources hub labels; lead-magnet landing, promo and email copy; `next.config.ts` redirects; footer and nav; `/partners/[partnerId]`; `/insights` hero and promo.

**Partly reviewed:**
- Privacy policy, Terms and cookie policy: searched for claims and conflicts with marketing copy, not read end to end.
- Legacy `/insights` articles: eight titles read, three sampled.
- Assessment questions and v3 report templates: reviewed through quoted samples; the v2 templates (retained for old reports) not reviewed.
- Alt text: checked on the homepage, Invara and entries only.
- Invara arrays (audiences, stages, channels, roles, data points): read earlier; only quoted lines are findings.

**Not reviewed:**
- The AI and POPIA PDF, which is not in the repo.
- Brevo email templates and the "Revised Website Copy" v1.0 source document.
- Sanity-managed `/[slug]` content (CMS data not in the repo; route code only).
- `CookieConsent.tsx` banner text and `lib/guides/brevo.ts` copy.
- The live rendering of `/report/[token]`.
- `MODES.md` and `CONTEXT.md`: neither exists in the repo; project context came from `CLAUDE.md` and `docs/DESIGN-SYSTEM.md`.
- Redirected files (case studies, booking, careers, ai-in-action) were read for the dead-copy findings only.

Because of the above, **the review cannot be called complete.** Nothing here was run, built or tested; all findings are from reading source.
