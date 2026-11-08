# Review brief for GitHub Copilot (pre-release, 8 Nov 2026)

**Goal:** find real defects in this site before `review/final-release` is merged
to `main` (production). Be a sceptical senior reviewer: evidence, not opinion.
Do not rewrite working code to taste.

## Scope (whole repository, in priority order)
1. **API routes** (`app/api/**`): `assessment/submit`, `contact`, `guides/*`,
   `report/[token]`, `analytics/dashboard`, and the four `cron/*` routes.
   Look for: missing or bypassable validation, reCAPTCHA handling, CSRF/rate
   limiting gaps, SQL built from user input (including `jsonb_set` updates),
   auth on cron/admin (timing-safe compare, fail-closed when a secret is unset),
   email header injection, token guessability, personal data in logs or errors,
   unhandled promise rejections, race conditions (the follow-up job claims then
   sends), timeouts against `vercel.json` `maxDuration`.
2. **POPIA consent flow:** `app/popia-ai-check/page.tsx`, `app/api/assessment/submit`,
   `lib/assessment/*`, `app/api/cron/assessment-followup`. Check that follow-up email
   goes only to people who ticked `followUpConsent`, once, and that stored consent and
   the wording match `app/privacy-policy/page.tsx`.
3. **Correctness and runtime errors:** hydration mismatches, client/server boundary
   mistakes, broken links, dead routes and redirects (`next.config.ts`), 404 handling,
   metadata/canonical/sitemap/robots correctness, image `sizes` and layout shift.
4. **Accessibility:** forms, dialogs (`components/ui/Nav.tsx` mobile menu), focus
   order, colour contrast against tokens in `app/globals.css`, motion preferences.
5. **Performance:** client bundle weight, unnecessary `'use client'`, unoptimised
   images, render-blocking work, ambient animations (`DotField`, `ToolsTicker`).
6. **Dependencies:** `npm audit --omit=dev` shows 22 findings (1 critical:
   `dompurify` via a transitive path; high: `@vercel/functions`, `zod`,
   `markdown-it`, `undici`, `vite`, `source-map-js`, `@vercel/oidc`,
   `@vercel/cli-config`). For each, say whether it is reachable in this app and
   propose the smallest safe upgrade. Do not run `npm audit fix --force`.
7. **Dead code and drift:** unused exports, files nothing imports, stale comments.

## Intended behaviour (do NOT report as bugs)
- **Invara is hidden:** removed from Nav, Footer and sitemap, with `noindex`. The route
  still exists on purpose; it is being finished.
- **Retention jobs are dry runs by design** (`/api/cron/assessment-retention`,
  `/api/cron/guide-retention` run without `?apply=1` until the owner enables them).
- **The follow-up job is live** (`assessment-followup?apply=1`, daily 06:00 UTC), is
  consent-gated, and sends only on Vercel production with `BREVO_API_KEY` set.
- **Privacy policy is dated 9 November 2026** (planned release date).
- **Brevo template IDs come from environment variables** (`BREVO_TEMPLATE_LEVEL_1/2/3`).
  Production switches from template 9 to 11 on release day; this is an owner step.
- **Legacy items left in place deliberately:** `lib/insights/*`, `operationsDiagnostic*`
  schemas, the `ai_readiness_assessments` table, the Sanity "Diagnostic" category,
  and some root docs under `docs/`.
- **A local `npm run build` can fail if Sanity is unreachable;** rely on Vercel.
- Copy decisions (tone, claims, headings) are the owner's. Flag a factual or
  legal-risk problem, not wording preference.

## Secrets and environment
Names only; never request or print values. Used by the code: `ADMIN_PASSWORD(_HASH)`,
`ANTHROPIC_API_KEY`, `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`,
`BREVO_TEMPLATE_LEVEL_1/2/3`, `CRON_SECRET`, `CSRF_SECRET`, `DATABASE_URL_WEBSITE`,
`DATABASE_URL_LEAD_ENGINE`, `FOLLOWUP_SENDER_NAME`, `GUIDE_IP_SALT`, `HUBSPOT_API_KEY`,
`JWT_SECRET`, `NEXT_PUBLIC_*` (site URL, GA, Meta pixel, reCAPTCHA site key, WhatsApp),
`RECAPTCHA_SECRET_KEY`, `RETENTION_KEEP_EMAILS`, `SANITY_API_WRITE_TOKEN`, SMTP and
Supabase variables. Flag any variable read without a safe fallback or without
validation (`lib/env.ts`).

## Checks already run by the author (8 Nov 2026)
`tsc --noEmit` clean; `npm run lint` clean (zero warnings); `lint:design` clean;
full `npm run build` compiled. Motion audited (see "Motion" in `docs/DESIGN-SYSTEM.md`).
**Not run:** Playwright suites (`tests/`), any end-to-end submission of the assessment
or contact forms against Brevo, and the reCAPTCHA domain check on the production host.

## How to run
```bash
npm ci
npx tsc --noEmit && npm run lint && npm run lint:design
npm run build && npm run start      # http://localhost:3000
```

## Report format (please follow exactly)
Return one Markdown report. Start with a 5-line summary and a count by severity.
Then a table, most severe first:

| ID | Severity | Area | File:line | Evidence (quote or steps) | Impact | Proposed fix | Confidence | Safe to auto-fix? |
|----|----------|------|-----------|---------------------------|--------|--------------|------------|-------------------|

- **Severity:** Critical (data exposure, auth bypass, outage), High (wrong behaviour
  for real users or a consent/POPIA problem), Medium, Low, Info.
- **Confidence:** High (reproduced or proven from code), Medium, Low (suspicion).
- Mark anything you could not verify as **Unverified**; do not guess.
- End with: findings you checked and ruled out, and areas you could not review.
- If you open pull requests, target `review/final-release`, one concern per PR,
  never `main`.
