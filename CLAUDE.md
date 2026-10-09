# CLAUDE.md — Frontend Website Rules

## Session Start
- **Read `MODES.md` in the project root at the start of every session.** Its standing rules are always on. Its modes (Reconcile, Verbatim, Checkpoint) switch on when Jimmy says the trigger word.
- If `MODES.md` is missing, say so before starting work. Do not recreate it from memory.
- Automations and processes are documented in `docs/SYSTEMS.md`. Any change that adds or alters one updates its entry in the same change (MODES.md standing rule 9).

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Stack
- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Tokens live in `app/globals.css`.
- Drizzle ORM over two Postgres databases (`website` and `lead_engine`), Sanity for Insights, Brevo for email.
- Vercel deploys from GitHub: `main` goes to production (maruonline.com), every other branch gets a preview. Previews need a Vercel login.

## Local Server
- `npm install`, then `npm run dev` (serves `http://localhost:3000`). If a server is already running, do not start a second instance.
- Secrets come from `.env.local` (`vercel env pull`). Without them, pages render but forms, reports and anything that touches the database fail.
- `next dev` appends a Next.js block to the end of this file. It is committed on purpose, so the tree stays clean.

## Checks Before Every Push
- `npm run type-check`
- `npm run lint` (zero warnings allowed)
- `npm run lint:design` (design-system drift guard; see `DESIGN-SYSTEM.md`)
- `npm run build` when the change can affect rendering. It needs network access to Sanity, so in a sandbox without it, rely on the Vercel preview build instead.

## Screenshots and Visual Tests
- Screenshot from localhost or a preview URL, never a `file:///` URL.
- One-off screenshot: `npx playwright screenshot --viewport-size=375,812 http://localhost:3000/<path> <file>.png` (repeat at 1280,800 for desktop). Save outside the repo, then read the PNG with the Read tool.
- Suite: `npm run test:visual` (starts the dev server itself). `npm run test:prod` runs the same suite against a production build, the only way to catch rendering bugs `next dev` hides.
- In Claude Code cloud sessions Chromium is preinstalled; do not run `playwright install`.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px". Check spacing/padding, font size/weight/line-height, colours (tokens, not hex), alignment, border-radius, shadows, image sizing.

## Database
- Never run `npm run db:push:*`. Those scripts use `--force` against the live databases. Schema changes need Jimmy's explicit go in that session.

## Public Repository
- This repository is public. Commit nothing that would not go on the website: no plans, decision or status files, strategy, `MODES.md`, client names not cleared for publication, unverified drafts, or secrets (GitHub push protection is on).
- Commit messages, PR titles and descriptions, and code comments say what changed, factually.

## Brand Assets
- Logos and brand images live in `public/images/brand/`. Use them; do not use placeholders where real assets exist.
- Colours and type come from the tokens in `app/globals.css` and `DESIGN-SYSTEM.md`. Do not invent brand colours, and never put raw hex in `.tsx` files.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
