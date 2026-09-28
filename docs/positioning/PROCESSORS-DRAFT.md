# Processors on maruonline.com: draft inventory for the privacy-policy rewrite

> **Status:** DRAFT, 28 Sep 2026, built from the code on `positioning/popia-safe`. Not legal advice and not yet policy
> copy. Jimmy confirms each row (especially the **[CONFIRM]** cells) and adds anything used outside the site
> (HubSpot CRM by hand, Google Workspace mail, WhatsApp Business, accounting). The privacy policy is then rewritten
> from the confirmed table. Merge blocker 4 in `HANDOVER-2026-09-26.md`.

## A. Services that receive visitors' personal information today

"Live path" means a page on the site actually calls it. Each was traced from the page to the route to the fetch.

| Service | What it receives | Where it comes from | Where it's stored |
|---|---|---|---|
| **Vercel** (hosting) | Every request: IP address, user agent, page; request logs | All pages and API routes | USA **[CONFIRM function region; Vercel's default is Washington DC, `iad1`]** |
| **Brevo** | Name, email, company/website, assessment level and answers, consent record; contact-form and newsletter entries | `/api/assessment/submit`, `/api/contact`, `/api/newsletter` | EU **[CONFIRM in the Brevo account]** |
| **Neon** (Postgres) | The assessment report row: answers, level, email, name, website, consent record (`operations_reports`) | `/api/assessment/submit`, `/report/[token]` | **[CONFIRM region: it is in the `DATABASE_URL_WEBSITE` host name]** |
| **Anthropic** (Claude) | The visitor's ten answers and level, to write the report. Their name, email and website are not in the prompt (the site-scrape input is passed empty, `route.ts:297`). | `/api/assessment/submit` (runs after the reply) | USA |
| **Google reCAPTCHA v3** | Browser and interaction signals, IP | Check page and contact form | USA |
| **Google Analytics 4** | Page views, events, device, approximate location, cookie ID | Every page (`AnalyticsTracker`) | USA. **Loads before and regardless of cookie consent; see C1.** |
| **Meta Pixel** | Page views, cookie ID, IP | Every page (`app/layout.tsx`) | USA. **Loads before and regardless of cookie consent; see C1.** |
| **Calendly** | Whatever the visitor types when booking (name, email, answers) | `/booking` embed, report page link | USA |
| **WhatsApp (Meta)** | The visitor's number and message, only when they tap the WhatsApp link | Floating button and page links | Meta. The visitor starts it; the site sends nothing. |

Not visitor data: **Sanity** (Insights content only) and the SMTP account used for internal notifications
(`lib/insights/notify.ts`, sent to Maru only) **[CONFIRM the SMTP provider: `SMTP_HOST`]**.

## B. Services wired into code that no page calls

These have routes and API keys but no caller anywhere on the site or in the other Maru repos. They should not be
named in the privacy policy **if** they are removed (C2). If they stay, they are processors too.

| Service | Route | Risk while it stays public |
|---|---|---|
| Resend | `/api/send-results` | **Sends email from Maru's domain to any address a caller supplies.** No auth, CORS `*`. |
| Anthropic + Serper | `/api/generate-intelligence` | Anyone can spend Maru's Anthropic and Serper credits. No auth. |
| Firecrawl | `/api/scrape-website` | Anyone can spend Maru's Firecrawl credits. No auth. |
| SMTP | `/api/send-email` | Anyone can put unescaped HTML into hello@'s inbox. No auth. |
| HubSpot + Supabase | `/api/hubspot/sync`, `/api/analytics/journey` | Writes to CRM/DB from unauthenticated requests. |
| (none) | `/api/lead`, `/api/analyze-website`, `/api/calculate-score` | v2-era; Brevo list writes (`/api/lead`) with no caller. |

Vercel keeps only a few hours of logs on Hobby, so the logs can't prove nothing outside the site calls these. The
code on `main` and the sibling repos shows no caller. All are live on production today.

## C. Decisions for Jimmy

- **C1. Cookie banner does nothing.** "Decline" only saves the choice in the browser; GA4 and the Meta Pixel load on
  every page whether the visitor accepts, declines or ignores the banner. For a business selling POPIA-safe practice,
  this is the most visible gap on the site. Fix: load the Meta Pixel only after "Accept", and start GA4 in Google
  Consent Mode with analytics storage denied until "Accept". Cost: GA4 will count fewer visitors (only those who
  accept, plus cookieless modelled pings), so traffic numbers drop from the day it ships. Recommended.
- **C2. Delete the uncalled routes in B** (and the global `Access-Control-Allow-Origin: *` on `/api/*` in
  `vercel.json`, which only matters for them). Recommended as a hotfix to `main`, like PR #11, because they are live
  now. `/api/send-results` is the urgent one.
- **C3. Confirm the [CONFIRM] cells and add off-site processors.** Then the policy can be drafted as Addendum 06.
