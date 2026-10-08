# Data-flow inventory: the "AI and POPIA" guide form

> **Status:** DRAFT, 8 Oct 2026, built from the code on `preview/lead-magnet-guide`. Copy handover entry 19 §12
> item 6. Not legal advice. Jimmy reviews it against the Act (no adviser is engaged), then the privacy policy is
> redrafted from it (release gate 2). Companion: `GUIDE-PRIVACY-DRAFT.md`.

## What the form collects

| Field | Required | Why | Where it goes |
|---|---|---|---|
| First name | Yes | To address the delivery email | Neon row, Brevo contact `FIRSTNAME` |
| Work email | Yes | To send the guide | Neon row (lower-cased), Brevo contact |
| Company | No | Context only | Neon row, Brevo `COMPANY` (only if given) |
| Marketing box | No, unticked by default | Separate s69 consent to notes | Neon row (`marketing_ticked`); Brevo only after double opt-in |
| Honeypot (`contactTime`) | Hidden | Spam control | Never stored: a filled honeypot is discarded |
| IP address | Automatic | Rate limiting (5 an hour per address) | Neon stores a **salted SHA-256 hash**, never the IP. Vercel's request logs hold the raw IP (as on every page) |

Nothing else: no phone number, no WhatsApp field, no CAPTCHA, no pixel or analytics event fired by the form.

## Where each piece of data lives

| System | Role (POPIA) | What it holds | Location | Notes |
|---|---|---|---|---|
| **Neon** `maru_lead_engine.guide_requests` | Operator (hosting Maru's DB) | Every request: time, email, name, company, box ticked, the exact consent and privacy wording shown, wording version, confirmation time, IP hash, delivery and Brevo status | UK, AWS `eu-west-2` (London) | **The consent log of record** (entry 19 §7). Same database as Production; previews write rows tagged `environment = preview` |
| **Brevo**, list "Guide Downloads" | Operator | Everyone who requested the guide, `CONSENT_MARKETING=false` | **[CONFIRM: Brevo account region]**; entry 19 §7 says processing may happen in the USA and India | A record list. **Never a campaign audience.** Created by the code on first use |
| **Brevo**, list "AI and POPIA Notes" | Operator | Only people who ticked the box **and** clicked confirm, `CONSENT_MARKETING=true`, `CONSENT_DATE` = confirmation time | As above | The only list that may receive notes. Name assumed (entry 19 does not name it) |
| **Brevo** transactional email | Operator | The delivery email and, if ticked, the confirmation email | As above | Sent from hello@maruonline.com. **Check that Brevo's open/click tracking is off** before go-live (§12 default (c)); the API has no per-message switch |
| **Vercel** | Operator (hosting) | Request logs: IP, user agent, path; function logs (no email addresses are logged by the guide routes) | USA, `iad1` (Washington DC) | Same as every page |
| **Visitor's browser** | — | `localStorage` key `maru-guide-requested = 1` after a request | The visitor's device | Hides the "Read the guide" line on the check's results step. Not sent anywhere. Disclose in the cookie policy as functional storage |

Not involved in this flow: Anthropic, Google reCAPTCHA, Calendly, HubSpot, WhatsApp.

## The flow, step by step

1. Visitor submits the form → `POST /api/guides/ai-and-popia`.
2. Server rate-limits (from the Neon table), then **writes the consent row before answering**.
3. Response → thank-you state with the download button (`/downloads/ai-and-popia-guide.pdf`, served from maruonline.com).
4. After the response: Brevo contact upsert into Guide Downloads → delivery email (3 tries, 1s/3s/9s backoff) → if ticked, the confirmation email. The outcome is written back to the row (`delivery_status`, `brevo_status`).
5. Confirmation link → `/guides/ai-and-popia/confirm?token=…` → the visitor presses the button → `POST /api/guides/confirm` → `marketing_confirmed_at` set → contact added to AI and POPIA Notes. (A button, not the link itself, because mail scanners open links.)

## Retention

- `GUIDE_RETENTION_MONTHS = 12` (`lib/guides/config.ts`, entry 19 default (b)).
- Applies to people who requested the guide, never confirmed notes, and never took the POPIA AI check. The
  "became a customer" exemption cannot be checked by code (there is no customer record); Jimmy applies it by hand.
- `GET /api/cron/guide-retention`: **not scheduled**, needs `CRON_SECRET` (not set, so it refuses every call), dry
  run unless `?apply=1`. Deletes the Neon rows and, on Production only, the Brevo contacts.
- Confirmed subscribers stay until they unsubscribe. **Not built yet:** removing an unsubscriber's row or marking
  it. Brevo handles the unsubscribe itself; the Neon row still says confirmed. Decide whether the consent log
  should record withdrawals (recommended: yes).

## Preview safety

Off Production, Brevo writes and sends happen **only** for `jimmym@maruonline.com` and `hello@maruonline.com`
(`PREVIEW_ALLOWED_RECIPIENTS`). Anyone else is still written to the Neon consent log (tagged `preview`) and shown
the thank-you page, but Brevo is stubbed and nothing is emailed. Preview rows can be removed with
`DELETE FROM guide_requests WHERE environment <> 'production';` before launch.

## Open points for Jimmy

1. Brevo account region and the DPA's sub-processor list (§7, release gate 3).
2. Whether Neon should hold preview rows at all (it is the production database).
3. Recording unsubscribes in the consent log (above).
4. The salt for the IP hash is a fixed default; set `GUIDE_IP_SALT` in Vercel if you want it secret.
