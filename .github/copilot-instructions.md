# Copilot instructions: Maru Online website

Marketing site for Maru Online, a South African AI implementation consultancy.
It is read by people doing due diligence, so credibility matters more than
conversion. Read `CLAUDE.md` (rules for agents), `docs/DESIGN-SYSTEM.md` and
`docs/COPILOT-REVIEW.md` (scope, known and intended behaviour, report format).

## Stack
Next.js 16 (App Router, Turbopack, breaking changes: see `AGENTS.md` and
`node_modules/next/dist/docs/`), React 19, TypeScript, Tailwind CSS 4, framer-motion,
Sanity (CMS), Drizzle on Neon Postgres, Brevo (email), Vercel (Hobby, cron),
Google reCAPTCHA v3. Node 24.

## Commands
- `npx tsc --noEmit` (type check)
- `npm run lint` (ESLint, zero warnings allowed)
- `npm run lint:design` (design drift guard: retired colours, phantom classes, dead components)
- `npm run build` (may fail locally if Sanity is unreachable; that alone is not a bug)
- `npm run test:visual` (Playwright; needs a running server)

## What matters most
1. **Personal information (POPIA).** Consent is explicit and unticked by default.
   Never add tracking, marketing email or data sharing that the privacy policy
   (`app/privacy-policy/page.tsx`) does not describe.
2. **Security.** Validate all input server-side, verify reCAPTCHA tokens, protect cron
   and admin routes, never log personal data or secrets, never commit secrets.
3. **Honest copy.** No hype, no absolute claims ("guarantees compliance"), no
   unconfirmed facts. British/South African spelling.
4. **Design system.** Brand tokens only (`var(--color-...)`), no default Tailwind
   palette colours, animate only `transform` and `opacity`, respect reduced motion.
5. **Accessibility.** Keyboard operable, visible focus, labelled controls, contrast.

## Do not
- Change visual design, copy or brand tokens as a "fix". Report them instead.
- Push to or open pull requests against `main`. Target `review/final-release`.
- Enable the retention jobs' `?apply=1` or change cron schedules.
- Add dependencies without saying why.
