# CHANGE-MAP: POPIA-safe repositioning

> **Session 1 output (read-only audit), 26 Sep 2026.** No existing file was edited.
> Audited against `docs/positioning/POSITIONING.md` (ADOPTED) and `docs/positioning/COPY-DECK.md` (DRAFT v1).
> Branch at audit time: `fix/site-brief-sep2026` (uncommitted changes present, see Handoff Gate 0).
> Line numbers are from that working tree and will drift once Session 2 starts editing. Re-grep before each edit.

Legend: **Deck** = COPY-DECK.md section. **GAP** = code slot with no approved copy (leave existing text, Jimmy to supply).
**NO-HOME** = deck copy with no matching slot in the code. **BANNED / CONTRADICTS** = conflicts with POSITIONING.md.

---

## 0. Priority summary (read this first)

| # | Issue | Where | Severity |
|---|---|---|---|
| P1 | POPIA checklist form is simulated: collects name, email, company and consent, sends nothing, tells the visitor "Check your email" | `app/resources/popia-ai-checklist/POPIAChecklistPageClient.tsx:42-65` | Critical (live, in sitemap) |
| P2 | Same page carries two more unsourced claims the deck does not cover: "83% of South African businesses using AI risk POPIA non-compliance" (l.93) and "The Information Regulator is actively investigating AI-related POPIA violations" (l.244), plus "POPIA-compliant form. Your data is secure." (l.229) on a form that submits nowhere | same file | Critical |
| P3 | Homepage advertises websites, web apps, e-commerce and digital marketing ("We build the rest too") and a "Site Infrastructure" service card | `app/page.tsx:320-481`, `components/homepage/PrimaryServicesFilter.tsx:37-44` | High |
| P4 | Terms state "All systems we build are POPIA-compliant" (banned) and list obsolete packages (R4,999 / R9,999 "marketing sequences") that contradict the rate card | `app/terms-conditions/page.tsx:45-56, 109` | High |
| P5 | Homepage services card labels the R4,500 Operations Diagnostic as "Free entry point" / "We find where the money leaks. Free." | `components/homepage/PrimaryServicesFilter.tsx:15-19` | High (price contradiction) |
| P6 | Assessment gate, contact form and newsletter form work but capture **no consent** and link no privacy notice; the assessment adds people to Brevo list 21 while the homepage says "No opt-in to marketing" | see §4(d) | High for a POPIA-safe brand |
| P7 | Privacy policy discloses no cross-border transfers (Brevo, HubSpot, Vercel, Calendly, Google, Meta Pixel) and still contains Maru AI Academy text ("Learning Progress… quiz scores") | `app/privacy-policy/page.tsx` | High (deck trust-strip row depends on it) |
| P8 | The auto-publishing Insights writer has no POPIA-safe positioning or banned-claims rules; cron runs 1st and 15th, next run 1 Oct 2026 | `lib/insights/generate.ts:32-54`, `vercel.json` cron | Medium-High |

---

## 1. Inventory and mapping (items 1 and 2)

### 1.1 Global

| File:line | Current | Deck § | Action |
|---|---|---|---|
| `app/layout.tsx:35` | title "AI & Automation Consultants for Growing SMEs \| Maru Online" | §1 layout title | Replace |
| `app/layout.tsx:36-37` | description | §1 layout description | Replace |
| `app/layout.tsx:42` | og:title "AI That Actually Works…" | §1 OG title | Replace |
| `app/layout.tsx:43-44` | og:description | §1 OG description (= description) | Replace |
| `app/layout.tsx:48` | twitter:title | **GAP** (deck gives OG only) | Jimmy: confirm twitter mirrors OG |
| `app/layout.tsx:49-50` | twitter:description | **GAP** | as above |
| `config/site.ts:6-7` | "…combining comprehensive marketing solutions…" | §1 siteConfig.description | Replace. Currently **CONTRADICTS** (marketing offer) |
| `components/seo/JsonLd.tsx:32-33` | Organization description (hard-coded, does not read `siteConfig.description`) | §1 JsonLd description | Replace (deck says "same as siteConfig.description": wire it or paste) |
| `components/seo/JsonLd.tsx:46-51` | knowsAbout: 4 items | §1 knowsAbout | Replace with deck list. Keep `areaServed` (l.34) |
| `components/seo/JsonLd.tsx:57-92` `ServiceJsonLd` | description prop passed per service page | **GAP** | See §1.4: each page passes old hero tagline |
| `lib/seo.ts:3` | `OG_ALT` "AI-powered workflows that cut operating costs" (every page's og:image alt) | **GAP** | |
| `app/opengraph-image.tsx:59` | OG image headline "AI-powered workflows that cut your operating costs" | **GAP** | Rendered on every social share. High visibility |
| `app/opengraph-image.tsx:69` | "AI implementation consultancy · Gauteng, South Africa" | **GAP** | |
| `components/ui/Footer.tsx:81` | "Building AI-powered workflows for growing SMEs." | §1 Footer tagline | Replace |
| `components/ui/Footer.tsx:149` | `Operations Diagnostic` → `/services/operations-diagnostic` | §1 Footer services + §3 route | Rename + relink |
| `components/ui/Nav.tsx:13-22` | About · Services · Process · Pricing · Contact (Insights **commented out**, l.21) | §1 Nav "no label changes" incl. Insights | **Conflict**: deck lists Insights, code hides it deliberately (no articles). Keep hidden unless Jimmy says otherwise |
| `components/ui/Nav.tsx:140, 219` | "Start the assessment" | §1 Nav | No change |
| `data/footer-navigation.tsx` | Home/Services/Contact/legal/social | none | No copy change needed |
| `lib/whatsapp.ts:30-49` | Per-route WhatsApp openers; no entry for the audit page (falls back to default "AI workflow services") | **GAP** | Needs an opener for `/services/popia-safe-ai-audit` if wanted |

### 1.2 Homepage `app/page.tsx`

| File:line | Current | Deck § | Action |
|---|---|---|---|
| 18 | title "Cut Your Operating Costs With AI-Powered Workflows…" | §2 Metadata title | Replace |
| 19-20 | description | §2 Metadata description | Replace |
| 98 | eyebrow "AI Implementation Consultancy" | §2 Hero eyebrow | Replace |
| 103, 105 | H1 "AI-Powered Workflows That / Cut Your Operating Costs" | §2 Hero H1 (primary; [ALT] not shipped) | Replace |
| 121 | subhead | §2 Hero subhead | Replace |
| 137 | supporting line | §2 Hero supporting line | Replace |
| 151 | "Book a discovery call" → `/booking` | §2 Primary CTA | Replace label, keep href |
| 154 | "Start the assessment" → `/operations-assessment` | §2 Secondary CTA | Replace label, keep href |
| `components/ui/StatBand.tsx:15-18` | 4 stats | §2 StatBand rows 1-4 | Replace labels (l.15-17); row 4 (l.18) already matches |
| 172 | eyebrow "The operational gap" | §2 Problem eyebrow | Replace |
| 174, 176 | H2 "Your tools work. / Your workflows don't." | §2 Problem H2 | Replace |
| (none) | — | §2 Problem **Intro** | **NO-HOME**: no paragraph between H2 (l.177) and `DisconnectDiagram` (l.185). Adding a `<p class="body-muted">` is a markup addition, not a new component |
| 189-209 | 4 cards: tools / admin / old numbers / POPIA | §2 Problem cards 1-4 | Replace array: new order, remove "old numbers" (l.200-204). Cards need icon keys: deck gives none for the two new cards (reuse `shield`, `unlink`, `hourglass`; pick one for "Staff paste…") |
| 185 `DisconnectDiagram` | labels CRM/EMAIL/SPREADSHEETS/INVOICING/WHATSAPP | none | Leave |
| 258 | closing line | §2 Problem closing line | Replace |
| 290, 292 | H2 "Pick the problem. / We'll fix it." | §2 Services H2 | Replace |
| 298 | intro "…a free assessment that shows you where the money is leaking." | §2 Services intro | Replace |
| `components/homepage/PrimaryServicesFilter.tsx:12-61` | **6** cards: Operations Diagnostic, Workflow Integration, Results Measurement, Site Infrastructure, POPIA-Compliant Integration, Team Training | §3 card copy (**4** cards) | **Structural mismatch**, see §2.1 |
| `components/homepage/CaseStudyProofStrip.tsx` (rendered l.310) | Visible "PLACEHOLDER" block on the indexed homepage | none | Pre-existing; flag only |
| 320-481 | "Need more than workflows? / We build the rest too." + 3 cards | §2 REMOVE | Delete whole `<section>` |
| 495, 497 | H2 "From first look to live savings / in about 30 days." | §2 Process teaser H2 | Replace |
| 513 | "Four steps. Fixed price. Measured outcome." | §2 Process sub | Unchanged |
| 516-518 | Button "Start the assessment" | **GAP** | Leave |
| 519-521 | "See how it works" → `/process` | §2 Process link | Unchanged |
| 529-539 | `ImageBand` overlay "We don't replace your team. / We give them their time back." | §2 Closing H2 | Unchanged |
| (inside 532-537) | — | §2 Closing **sub-line** | Add a third `<span>` inside `overlayText` (prop accepts ReactNode). No component change |
| between 526 and 529 | — | §2 Trust strip | **NO-HOME**, see §2.2 |
| `components/homepage/AssessmentFormSection.tsx:18` | eyebrow "Free Business Diagnostic" | **GAP** | Collides with the paid audit name. Needs copy |
| same :24-25, 29, 43, 105, 118, 152, 167, 186 | "What's Costing You Time and Money", "Ten minutes", etc. | **GAP** | Leave |
| same :79 | "POPIA compliant. No opt-in to marketing — just your results." | **GAP** + see §4(b), §4(d) | Contradicts backend (Brevo list 21) |

### 1.3 Services index `app/services/page.tsx`

| Line | Current | Deck § | Action |
|---|---|---|---|
| 15 | title "Services \| Maru Online" | §3 index title | Replace |
| 16-17 | description | §3 index description | Replace |
| 130, 132 | H1 "Paying for AI tools / that don't pay you back?" | §3 index H1 (split) | Replace |
| 144-145 | hero paragraph | **GAP** | Leave |
| 31 | title "Operations Diagnostic" | §3 rename | Replace with `POPIA-Safe AI Audit` |
| 33 / 50 / 67 / 84 | long `description` per service | §3 card copy table | Replace. Note: these render as section bodies, not cards. Deck calls them "card description" for `/services` index; this is the only slot that fits |
| 32 / 49 / 66 / 83 | `tagline` per service | **GAP** | Leave |
| 35-38, 52-55, 69-72, 86-89 | included bullets | **GAP** | Leave (l.38 "90-day roadmap" is fine) |
| 41, 58, 75, 92 | notes (l.58 "Scoped after the diagnostic") | **GAP** | "diagnostic" wording persists |
| 42 | href `/services/operations-diagnostic` | §3 route | Relink |
| 165-167 | ImageSplit "What integrated AI actually looks like." | **GAP** | Leave |
| 182-185, 316-319 | intro / "Vendor-agnostic. Your tools stay." | **GAP** | Leave |
| 356-365 | Final CTA "Not sure where to start? … The Operations Diagnostic is where every engagement starts…" | **GAP** | Rename at minimum |

### 1.4 Service detail pages

**`app/services/operations-diagnostic/page.tsx` → `app/services/popia-safe-ai-audit/page.tsx`** (Deck §3)

| Line | Current | Deck | Action |
|---|---|---|---|
| 12 | `seo('/services/operations-diagnostic')` | §3 route | New path |
| 13 | title | §3 audit title | Replace |
| 14-15 | description | §3 audit description | Replace |
| 44-49 | `ServiceJsonLd` name/description/path, price 4500 | §3 (name, path) + **GAP** (description) | Rename, new path, keep price. Description: Jimmy to confirm reuse of meta description |
| 81 | breadcrumb "Operations Diagnostic" | §3 rename | Replace |
| 86 | eyebrow "01 — Operations Diagnostic" | §3 rename | Replace |
| 89 | H1 | §3 audit H1 | Replace |
| 104 | hero line "Map where your operation has gaps…" | **Ambiguous**: deck "Lead paragraph" could land here or at l.191 | Jimmy to choose, see §2.3 |
| 144, 155 | "Fixed-scope · Delivered within 48 hours", offset note | §3 Keep price & turnaround | Keep |
| 188-194 | "What it is" paragraph | §3 Lead paragraph (most likely slot) | Replace |
| 22-38 | `bullets` array: 4 × {leader, body} (intake brief, verification call, gap report, 90-day roadmap) | §3 What you get (4 plain strings) | **Shape mismatch**, see §2.3 |
| 214-221 | "How it connects… If the diagnostic surfaces a **site infrastructure** problem first, we scope that." | **GAP** + §4(c) | Re-offers site work. Needs copy |
| 263-266 | `CaseStudyCallout` | none | Keep |
| 286-288 | Final CTA H2 | **GAP** | Leave |
| (none) | — | §3 "Keep FAQ blocks" | **NO-HOME**: page has no FAQ block |
| whole file | "diagnostic" → "audit" throughout | §3 | Covers l.217-219 wording |

**`app/services/workflow-integration/page.tsx`**: l.14-15 description → §3 description. l.194-198 "What it is" → §3 lead paragraph (replace first paragraph only). l.48-50 `ServiceJsonLd` description **GAP**. l.159 and l.195 still say "diagnostic" (**GAP**). l.36-37 "POPIA compliance built in… designed for compliance" is acceptable under the rules.

**`app/services/team-training-handover/page.tsx`**: l.14-15 description → §3. l.22-42 `bullets` = the "curriculum list" → §3 add bullet (shape mismatch: deck bullet has no leader/body split). l.48-50 `ServiceJsonLd` **GAP**.

**`app/services/results-optimisation/page.tsx`**: l.14-15 description → §3. l.44-46 `ServiceJsonLd` **GAP**. l.32-33 "Ongoing POPIA review" sits oddly with "not a retainer" but is not banned.

### 1.5 Pricing `app/pricing/page.tsx` (Deck §4)

| Line | Current | Deck | Action |
|---|---|---|---|
| 13 | description | §4 description | Replace |
| 29 | tier title "Operations Diagnostic" | §4 rename | Replace |
| 30 | R4,500 | §4 prices unchanged | Keep |
| 40 | href `/services/operations-diagnostic` | §3 route | Relink |
| 26 | `id: 'diagnostic'` (anchor used by `tests/visual/brief-acceptance.spec.ts:146`) | none | Keep id or update test in the same commit |
| 31, 33-38, 49, 51 | tier note/body/items ("Gap report", "Scoped after the diagnostic") | **GAP** | Leave |
| 83-96 | FAQ: 4 Q&As say "diagnostic"; also emitted as `FaqJsonLd` (l.105) | **GAP** | Rename needed. Structured data will otherwise keep the old name |
| 147 | "…And the first look is free." | **GAP** | OK |
| 520-521 | "The Operations Diagnostic that follows is R4,500." | §4 line ~521 | Replace |

### 1.6 Process `app/process/page.tsx` (Deck §5)

| Line | Current | Deck | Action |
|---|---|---|---|
| 16 | description | §5 description | Replace |
| 31 | Phase 1 title | §5 Phase 1 title | Replace |
| 34 | "The report covers your workflows, tools, and **site infrastructure**…" | **GAP** + §4(c) | |
| 42 | note "The Operations Diagnostic. …" | **GAP** | Rename |
| 51, 72 | "If your **site infrastructure** needs work first…", "We resolve **site** and stack issues…" | **GAP** + §4(c) | |
| 174 | "We start with a diagnostic of your current processes." | **GAP** | |
| 427 | "The Operations Diagnostic that follows is R4,500." | **NO copy** (deck fixes the identical line on pricing only) | Obvious extension of §4. Jimmy to OK |

### 1.7 About `app/about/page.tsx` (Deck §6)

| Line | Current | Deck | Action |
|---|---|---|---|
| 59 | hero sub "We've lived your journey. Let's help accelerate yours." | §6 lead / mission line? | **Ambiguous** |
| 118-121 | Mission H2 "Make AI integration work for / businesses that can't afford for it not to." | §6 lead / mission line? | **Ambiguous**. Jimmy to pick the slot |
| 12-13 | title, description | **GAP** | Leave (deck says light touch) |

### 1.8 Other customer-facing surfaces with no deck coverage

| File:line | Copy | Why it matters |
|---|---|---|
| `app/contact/ContactForm.tsx:29` | service option "Operations Diagnostic" | Rename |
| `app/contact/ContactForm.tsx:32` | service option "**Website Design & Build**" | §4(c) |
| `app/contact/page.tsx:12, 56-62` | description, H1 "Tell us what's eating your time." | GAP (on-strategy, pain-first) |
| `app/operations-assessment/layout.tsx:8-9` | "Fifteen minutes…" | Page says "About 3 minutes" (`page.tsx:325`); homepage says ten. Pick one |
| `app/operations-assessment/page.tsx:512` | "…whether a full Operations Diagnostic…" | Rename |
| `app/report/[token]/page.tsx:301` | "…whether an Operations Diagnostic makes sense…" | Rename (noindex, but emailed to every lead) |
| `lib/assessment/reportTemplates.ts:253, 259, 265` | Report "Recommended approach" names the Operations Diagnostic | Rename (customer-facing report body) |
| `app/insights/page.tsx:457`, `app/insights/[slug]/page.tsx:442` | "The Operations Diagnostic goes further…" | Rename (noindex section) |
| `app/privacy-policy/page.tsx:150` | "Assess Operations Diagnostic scores…" (it is the free assessment) | Rename |
| `app/booking/page.tsx:10` | "free 20-minute discovery call" vs report page "free 30-minute" | Inconsistent |
| `app/careers/page.tsx:8, 24, 117-121` | "Join Maru AI", "across Africa", hiring "Digital Marketing Specialists" | §4(b)/(c). SA-only scope; marketing role |
| `lib/insights/generate.ts:32-54` | AI article-writer system prompt: "AI & automation consultancy", no POPIA-safe category, no banned-claims list | Auto-publishes. See P8 |
| `app/[slug]/page.tsx` | Sanity CMS pages: copy lives in Sanity, not the repo | **Not auditable from code**. Needs a Sanity content check |
| `tests/visual/brief-acceptance.spec.ts:129, 146, 149` | Asserts "Operations Diagnostic" text and `#diagnostic` | Will fail after rename. Update in Session 3 |

### 1.9 Internal links, sitemap and redirects to `/services/operations-diagnostic`

| File:line | Type | Session 3 action |
|---|---|---|
| `app/sitemap.ts:25` | sitemap entry | Change to `/services/popia-safe-ai-audit` |
| `components/ui/Footer.tsx:149` | footer link | Relink |
| `app/pricing/page.tsx:40` | tier CTA | Relink |
| `app/services/page.tsx:42` | service section "Learn more" (rendered l.276) | Relink |
| `app/services/operations-diagnostic/page.tsx:12, 47` | canonical + JSON-LD url | Move route, update both |
| `next.config.ts:203-206` | **existing redirect** `/services/ai-revenue-diagnostic` → `/services/operations-diagnostic` | Repoint straight to the new URL, or it becomes a 2-hop chain |
| `next.config.ts` (new) | `/services/operations-diagnostic` → `/services/popia-safe-ai-audit`, `permanent: true` | Add. Note: Next emits **308**, not 301 (the file's own comment at l.99-100 says so; search engines treat them the same) |
| `next.config.ts:133-136` | `/operations-diagnostic` → `/operations-assessment` | Leave (different page) |
| `lib/whatsapp.ts` | no key for either path | Optional opener (GAP) |

No other internal `href`s to the route exist. `PrimaryServicesFilter` cards are not links.

---

## 2. Structural mismatches the builder cannot resolve verbatim

**2.1 Homepage services cards (6 in code vs 4 in deck).** `PrimaryServicesFilter.tsx` renders Operations Diagnostic, Workflow Integration, *Results Measurement*, *Site Infrastructure*, *POPIA-Compliant Integration*, Team Training, each with a `tag` ("Free entry point", "Core", "Foundation", "Compliance"…). The deck supplies 4 names + descriptions and no tags. Jimmy to decide: (a) reduce to the 4 deck services (drops Site Infrastructure, which the Law of Sacrifice requires anyway, and POPIA-Compliant Integration, which the new positioning folds into every service), and (b) tag text for each, or remove tags. The deck's card descriptions run 2-3× longer than the current one-liners, so expect the 2-column grid to grow in height.

**2.2 Trust strip has no reusable component.** The deck says "reuse an existing proof/strip component". `CaseStudyProofStrip` is hard-coded to GrowthIQ with no props. Nearest reusable pieces: `components/ui/ListGroup` / `ListItem`, or the Problem-section card pattern in `app/page.tsx:212-240`. Using either is markup composition, not a new design. Jimmy should OK that reading. Also, only two rows are un-gated today, and one of them is itself unverifiable (see §4(b)-7).

**2.3 Audit page lead paragraph and "What you get".** The page has a one-line hero (l.104) and a "What it is" paragraph (l.191). The deck's long lead paragraph fits l.191. Recommend l.104 stays as-is. The `bullets` array is `{leader, body}[]`. The deck's four items are plain strings, so the builder must either split each into leader/body (that is writing copy, which is not allowed) or render them leader-only. The same issue applies to the Team Training bullet.

---

## 3. Deck items with no home in the code (flag a)

1. §2 Problem **intro** paragraph: no slot (a `<p>` must be added).
2. §2 Closing **sub-line**: no slot (a third span inside `ImageBand.overlayText`).
3. §2 **Trust strip**: no existing reusable component (§2.2).
4. §3 audit page **"Keep FAQ blocks"**: no FAQ exists on that page.
5. §1 Nav **Insights**: link is commented out in code (`Nav.tsx:21`) on purpose.
6. §7 `app/insights/articles.ts:243`: the file is **not imported anywhere**. Insights come from Sanity (`lib/insights/getInsights.ts`), so fixing this line changes nothing live. The same dead file also holds an unsourced "roughly 73%" stat (l.48). Recommend deleting the file or leaving it, and checking the live Sanity article of the same slug (`popia-ai-what-smes-need-to-know`) instead.
7. §3 Team Training "add bullet": the array needs `{leader, body}` (§2.3).
8. §1 JsonLd "same as siteConfig.description": JsonLd hard-codes its own string, so it has to be wired or duplicated.

## 4. Flags

### (b) Existing copy that contradicts POSITIONING.md or uses a banned claim

| # | File:line | Copy | Rule broken | In deck? |
|---|---|---|---|---|
| 1 | `app/terms-conditions/page.tsx:109` | "All systems we build are POPIA-compliant…" | Banned claim | Yes §7 |
| 2 | `app/resources/popia-ai-checklist/POPIAChecklistPageClient.tsx:30` | "83% of SA businesses unknowingly non-compliant" | Unsourced stat | Yes §7 |
| 3 | same `:93` | "83% of South African businesses using AI risk POPIA non-compliance." | Unsourced stat | **No**. Same stat in the hero paragraph |
| 4 | same `:244` | "The Information Regulator is actively investigating AI-related POPIA violations. Get compliant today." | Unsourced claim | **No** |
| 5 | same `:229` | "POPIA-compliant form. Your data is secure." | Absolute claim on a non-functioning form | **No** |
| 6 | same `:88`, `page.tsx:6`, `:262` | "POPIA-Compliant AI Checklist", "staying POPIA-compliant" | Rule 2: category word is "POPIA-safe" | **No** |
| 7 | Deck §2 trust strip row 3 | "…document every cross-border transfer." | The privacy policy discloses **no** cross-border transfers, and the site sends personal data to Brevo, HubSpot, Vercel, Calendly, Google (GA4, reCAPTCHA) and Meta Pixel | **Deck issue**: treat as [CONFIRM] until the privacy policy lists them |
| 8 | `app/privacy-policy/page.tsx:7` | "Maru AI - PAIA Compliant" | Wrong brand + compliance boast | Yes §7 |
| 9 | `app/privacy-policy/page.tsx:110-117` | Academy text: "interactive tools, playgrounds, chatbots", "Learning Progress… quiz scores" | Describes a different product; policy doesn't match actual processing | **No** |
| 10 | `app/terms-conditions/page.tsx:7-8, 15` | "Maru AI", "AI automation and marketing services" | Marketing offer (banned) | **No** |
| 11 | `app/terms-conditions/page.tsx:45-56, 169` | Starter R4,999 / Growth R9,999 "marketing sequences" / R25k-R200k+ "sales and marketing systems" | Contradicts rate card; marketing offer | **No** |
| 12 | `app/terms-conditions/page.tsx:74-76` | Maru AI Academy course refunds | Off-positioning (not banned) | **No** |
| 13 | `components/homepage/AssessmentFormSection.tsx:79` | "POPIA compliant. No opt-in to marketing — just your results." | Absolute claim. Also untrue in practice: submit route adds the lead to Brevo list 21 (`app/api/assessment/submit/route.ts:306-329`) and the gate says "Unsubscribe any time" (`page.tsx:485`) | **No** |
| 14 | `components/homepage/PrimaryServicesFilter.tsx:15-19` | Diagnostic tagged "Free entry point… Free." | Contradicts R4,500 price | Partly (rename only) |
| 15 | `config/site.ts:7` | "comprehensive marketing solutions" | Marketing offer | Yes §1 |
| 16 | `app/careers/page.tsx:24` | "…businesses across Africa" | SA-only scope | **No** |
| 17 | Deck §2 hero H1 line 1 "Your team already uses AI." and §1 OG title "AI your business can use…" | Both open on "AI" | Copy rule 1 "never lead with AI" | **Deck vs positioning tension**. The H1 is arguably pain-framed as a pair; the OG title is not. Jimmy to rule |

### (c) Pages advertising web design, websites or digital marketing

| File:line | What |
|---|---|
| `app/page.tsx:320-481` | "We build the rest too": Strategy & Consultation, **Design & Development** ("Websites, web apps and e-commerce"), **Digital Marketing Support** ("Campaign strategy and execution", "Online visibility"). Deck §2 removes it |
| `components/homepage/PrimaryServicesFilter.tsx:37-44` | "**Site Infrastructure**: Clean foundations before automation runs." Not in deck |
| `app/contact/ContactForm.tsx:32` | Service dropdown "**Website Design & Build**". Not in deck |
| `app/services/operations-diagnostic/page.tsx:218-220` | "…surfaces a **site infrastructure** problem first, we scope that." Not in deck |
| `app/process/page.tsx:34, 51, 72` | Site infrastructure as a deliverable/phase step. Not in deck |
| `app/terms-conditions/page.tsx:8, 15, 50, 56` | "marketing services", "marketing sequences", "sales and marketing systems". Not in deck |
| `app/careers/page.tsx:117-121` | Hiring Digital Marketing Specialists (a hiring ad, not a service offer; low risk, but it reinforces the old identity) |

No standalone web-design or marketing service route exists. Old service URLs already 308 to the four current services.

### (d) Forms that collect personal information

| Form | Submits to | Works? | Consent / notice | Verdict |
|---|---|---|---|---|
| POPIA checklist (`/resources/popia-ai-checklist`, in sitemap) | nothing: `setTimeout` stub (l.46-50) | **No**. Shows a false success message | Checkbox bundles checklist delivery with "occasional updates" (marketing), which is not separate s69 consent. Privacy link points to `/privacy` (l.193), which exists only if a Sanity page has that slug; the real route is `/privacy-policy` | **FAIL**. Deck §7: wire or unpublish. Asset exists at `public/popia-ai-checklist.md` |
| Operations assessment gate (`/operations-assessment`) | `/api/assessment/submit` → Neon DB + Brevo list 21 + emails | Yes | **None**: no checkbox, no privacy link | Working, not consented |
| Contact form (`/contact`) | `/api/contact` → Brevo contact (+list) + notify email, reCAPTCHA | Yes | **None** | Working, not consented |
| Newsletter `MaruBriefForm` (only on `/insights`, noindex) | `/api/newsletter` → Brevo list 22 + email | Yes | **None** visible in component | Working, not consented |
| Orphan endpoints with no UI: `/api/lead`, `/api/send-results`, `/api/send-email`, `/api/email/send`, `/api/hubspot/sync`, `/api/analyze-website`, `/api/scrape-website` | Brevo / HubSpot / scrapers | Publicly callable | n/a | Not forms, but they accept personal data. Candidates for removal (Session 4 scope?) |

CLAUDE.md requires "a working, **consented** submission path". Only the checklist is in the deck. The other three forms pass "working" and fail "consented".

---

## 5. Decisions needed from Jimmy before Session 2

1. Approve the rename (`/services/popia-safe-ai-audit`) or veto (display name only).
2. Homepage service cards: 6 → 4, and tag text (§2.1).
3. Trust strip: OK to compose from `ListGroup`/card markup (§2.2)? Downgrade row 3 to [CONFIRM] (§4(b)-7)?
4. Audit page: lead paragraph into "What it is" (l.191). Bullets: leader-only or supply leader/body splits (§2.3).
5. About: which slot takes the mission line (l.59 or l.118-121)?
6. Copy for the GAP slots that still say "diagnostic", "site infrastructure" or "marketing": pricing FAQ, process l.42/174/427, services final CTA, AssessmentFormSection, contact dropdown, report templates, OG image + `OG_ALT`, twitter meta, ServiceJsonLd descriptions, terms §3.
7. Remaining checklist-page claims (83% hero line, "actively investigating", "POPIA-compliant form", H1 wording).
8. Consent capture on the assessment, contact and newsletter forms, plus a privacy-policy rewrite that lists processors and cross-border transfers. Neither is in the deck, but both are preconditions for the "POPIA-safe" claim.
9. Insights writer prompt (`lib/insights/generate.ts`): update to POSITIONING.md or pause the 1 Oct cron.
