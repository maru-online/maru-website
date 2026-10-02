# VERIFICATION: POPIA-safe repositioning

> Session 5 output, 26 Sep 2026. Branch `positioning/popia-safe`.
> Verified in a local production build (`next build` + `next start`). Sanity is unreachable from the build
> sandbox, so a verification-only stub returned empty CMS results. The stub is **not** in the repo.
> Insights and `/[slug]` CMS pages were not verified against live content.

## Checks

| Check | Result |
|---|---|
| `npm run type-check` | PASS |
| `npm run lint:design` (drift guard) | PASS |
| `npm run build` | PASS in the sandbox with the CMS stub. On Vercel, Sanity is reachable, so no stub is needed |
| `npm run lint` | **FAIL, pre-existing**: the same 26 warnings the branch had before this work (0 new). A cleanup is prepared but not committed; see the note at the end |

## Routes and redirects

| Item | Result |
|---|---|
| `/services/operations-diagnostic` | PASS: 308 → `/services/popia-safe-ai-audit` (Next's `permanent: true` emits 308; Google treats it as 301) |
| `/services/ai-revenue-diagnostic` | PASS: 308 → `/services/popia-safe-ai-audit` (single hop) |
| `/services/popia-safe-ai-audit` | PASS: 200 |
| `/resources/popia-ai-checklist` | PASS: 404 (unpublished), removed from the sitemap |
| `sitemap.xml` | PASS: lists the new audit URL. No old URL, no checklist |

## Copy against COPY-DECK.md

Rendered HTML was checked for every deck string on `/`, `/services`, the audit page, the three other service pages,
`/pricing`, `/process`, `/about`, `/terms-conditions` and `/privacy-policy`: **all present**, with one exception.

- **FAIL (deck placement):** the §1 OG title "AI your business can use, without the POPIA risk" is set in
  `app/layout.tsx` as specified, but every page, including the homepage, sets its own `openGraph` through `seo()`.
  That replaces the layout's, so the OG title never renders. og:title falls back to each page's `<title>`. To ship it,
  the homepage metadata needs `openGraph.title` set explicitly. **Jimmy to decide.**

Banned or retired strings were checked on the same routes plus `/contact`, `/operations-assessment`, `/careers` and `/booking`.
None remain: "We build the rest too", "Digital Marketing Support", "Websites, web apps", "Site Infrastructure",
"Website Design & Build", "Operations Diagnostic", old audit URL, "All systems we build are POPIA-compliant",
"Free entry point", un-confirmed trust rows, "AI-focused committee", "site infrastructure".

## Screenshots (390px and 1440px)

Homepage, `/services`, the audit page and `/pricing` were reviewed. The layout holds at both widths. The
four service cards, trust strip (one confirmed row) and closing sub-line render as intended. `/services` and
`/pricing` report a 120px-wide decorative circle past the viewport. `body { overflow-x: clip }` stops it
scrolling, so it's pre-existing and not visible.

## Still open (not in the deck; left as-is per the copy rules)

- Trust strip: 3 of 4 rows are hidden until confirmed (IO registration, PAIA manual link, cross-border
  documentation). Flip `confirmed: true` in `TRUST_ROWS`, `app/page.tsx`.
- Twitter title and description in `app/layout.tsx`, the OG image text (`app/opengraph-image.tsx`) and `OG_ALT`
  (`lib/seo.ts`) still carry the old "cut operating costs" line.
- Consent capture on the assessment, contact and newsletter forms. `AssessmentFormSection` still says
  "No opt-in to marketing" while the lead is added to Brevo list 21.
- Privacy policy: no processor or cross-border disclosure, and Academy-era text.
- Terms: obsolete R4,999/R9,999 packages and "sales and marketing systems"; "Maru AI" titles.
- Careers: "across Africa", "Join Maru AI", the Digital Marketing Specialists role.
- Homepage proof strip still shows the GrowthIQ PLACEHOLDER on an indexed page.
- `app/insights/articles.ts` (not rendered) still holds an unsourced "73%" line.

## Lint cleanup (not committed)

A separate change clears the 26 pre-existing warnings so `npm run lint` passes. It removes unused imports and
helpers, and treats `_`-prefixed variables as intentionally unused. It was not committed in this session and
waits for Jimmy's go-ahead.
