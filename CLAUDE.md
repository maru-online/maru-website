# CLAUDE.md — Maru Online website

Rules for AI agents working in this repo. Read this first, then
`docs/DESIGN-SYSTEM.md` before any visual change.

## Project

- **What it is:** the Maru Online marketing site. Its job is due-diligence
  credibility for people who look Maru up, not conversion. Fewer, better,
  consistent beats more.
- **Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript,
  Tailwind CSS 4, framer-motion, Sanity (CMS, studio at `/studio`), Drizzle
  (Neon Postgres). Deployed on Vercel. Node 24 on Vercel (`engines`).
- **This Next.js version has breaking changes.** Before using an API you are
  not sure of, read the matching guide in `node_modules/next/dist/docs/`.
  See `AGENTS.md` (included at the end of this file).

## Branch and deploy

- Current work happens on **`review/final-release`**. Commit and push there
  directly. Do not create new branches unless the owner asks.
- Every push builds a Vercel preview:
  https://maru-website-git-review-final-release-maru-online.vercel.app/
  (needs a Vercel login). Confirm the Vercel status on the commit before
  calling work done.
- The owner reviews on that preview. If they cannot open a page, publish a
  screenshot or page snapshot for them instead.

## Before every push

1. `npx tsc --noEmit`
2. `npx eslint <changed files>`
3. `npm run lint:design` (drift guard, `scripts/drift-guard.mjs`). It fails on
   retired brand hex values, phantom colour classes, default Tailwind palette
   colours and components nothing imports. It reports; it does not delete.
   Delete an unimported component only once you are sure it is dead.
4. Look at the change in a browser at desktop (1440px) and mobile (390px)
   widths.

A full local `npm run build` fails in sandboxed environments that cannot reach
Sanity. That failure alone is not a bug; rely on the Vercel build instead.

## Local development

- `npm run dev` serves on http://localhost:3000.
- **CSS gotcha:** the dev server does not reliably pick up `app/globals.css`
  edits. After changing CSS, stop the server, move `.next` aside (or delete
  it), and restart.
- Visual tests: `npm run test:visual` (Playwright, `tests/`).
- Do not commit screenshots, reports or scratch files to the repo root.

## Where things live

- `app/` — routes (App Router). `app/page.tsx` is the homepage.
  `app/insights-resources/` uses an intercepted route (`@reader`) so articles
  open in a reading panel; a direct link renders the full page.
- `app/globals.css` — **the source of truth** for design tokens and shared
  classes (`.sec`, `.sec-chapter`, `.sec-ruled`, `.flow-ground`,
  `.section-dark`, `.navy-horizon`, `.card-lift`, `.card-dark`,
  `.card-static`, `.open-cols`, …).
- `components/ui/` — shared building blocks: `SectionHead`, `DotField`,
  `CardMedia` (`TreatedImage`, `DrawnVisual`), `ProductShot`, `ImageBand`,
  `Glyph`, `Animate`, `Nav`, `Footer`.
- `components/homepage/`, `components/insights-resources/` — page-specific
  pieces. `lib/insights-resources/entries/` holds the guide and insight
  entries.
- `docs/DESIGN-SYSTEM.md` — the current design system (the old root v2 copy
  was deleted on 5 Nov 2026).

## Design rules (summary — details in docs/DESIGN-SYSTEM.md)

- **Layout ("Open Flow"):** one continuous stone ground (`.flow-ground`),
  hairline dividers between sections (`.sec-ruled`), rhythm from `.sec` /
  `.sec-chapter`. Navy sections use the Horizon gradient. DotField dots go
  on light sections only, never on navy.
- **Headings:** use `SectionHead`; it already sets the tight heading group and
  the wide gap before content.
- **Cards:** `.card-lift` owns the surface, edge, lift and hover. Never set a
  card background inline (it kills the hover). `.card-dark` on navy,
  `.card-static` for forms and tools. Card links never underline.
- **Heroes:** `PageHero` — eyebrow, H1, one sentence; height from content.
- **CTAs:** `Button` takes its colour from its ground: green on navy, deep
  teal on light grounds and the nav. Sentence case, short labels. Gold is
  retired from the interface. Only the homepage hero has buttons; inner pages
  end with one CTA section.
- **Photos:** every photo goes through `TreatedImage` (default "deep" tone);
  product screenshots pass `untinted`. Crop tight on a detail, remove logos
  and legible text, at most one photo set per page, and not every card gets
  a photo. Where a photo would be too literal, use `DrawnVisual` (glyph, or
  `title` to carry the card heading).
- **Colour:** brand tokens only (`var(--color-…)`). No default Tailwind
  palette colours, no retired hex values (the drift guard enforces this).
- **Motion:** animate only `transform` and `opacity`. Never `transition-all`.
  Respect reduced motion.
- **Interaction:** every clickable element has hover, focus-visible and
  active states. Keep keyboard focus visible.

## Working style

- Read the existing component before adding a new one; extend shared
  components rather than copying them.
- Keep reports short: what changed, checks run, open questions.
- Never say something was tested or verified unless it was.

## Next.js agent rules

Next.js 16.4+ keeps its managed agent rules in `AGENTS.md` (written by
`next dev`); they are included here:

@AGENTS.md
