# SYSTEMS.md: register of automations and processes

Current state of every automation and process on maruonline.com. One entry per system. Updated in the same change as the code (MODES.md standing rule 9). The Operator Guide is written from this file.

Never put secrets, API keys, street addresses or telephone numbers here. Environment variables are named, never valued.

## Entry template

### <Name>
- **Status:** live | preview | planned (with branch or PR)
- **Trigger:** what starts it
- **What it does:** step by step
- **Data touched:** what is read or written, and where it lives
- **Services and env vars:** names only
- **If it fails:** what happens, and what is logged
- **Run or test by hand:** exact steps
- **Jimmy's actions:** anything only a person can do, and when
- **Privacy policy section:** the section it supports

## Register

### Exposure Check scoring
- **Status:** preview (fix/scoring-level-thresholds, not yet on main)
- **Trigger:** a visitor completes the 10 questions at /popia-ai-check
- **What it does:** each answer scores 4/2/1/0. Each of the 5 areas is the rounded mean of its two answers (0-1 Critical gap, 2 Significant gap, 3 Partial, 4 Strong). The overall level is set by the average of the area scores: up to 2.0 Exposed, up to 2.8 Partly protected, above 2.8 Well protected. Changed 9 Oct 2026 (Exposed ceiling was 1.5) so a profile of all significant gaps is not headlined Partly protected.
- **Shown to the visitor:** a "How this is scored" note (SCORING_NOTE in scoring.ts, approved 9 Oct 2026) under the result on /popia-ai-check and under the level summary in the report. It describes the method, not the formula.
- **Data touched:** computed areas and level label stored with the report; stored reports are never re-scored
- **Services and env vars:** none (pure function in lib/assessment/scoring.ts; questions in questions.ts)
- **If it fails:** the submit route rejects answer sets it does not recognise rather than scoring them
- **Run or test by hand:** answer option 2 on every question: expect Exposed with five Significant gap areas
- **Jimmy's actions:** update Addendum 02 to the new threshold
- **Privacy policy section:** how we handle assessment answers

### Exposure Check retention job
- **Status:** preview (on `preview/lead-magnet-guide`, not on production)
- **Trigger:** Vercel cron, 02:00 UTC on the 1st of each month, calling `/api/cron/assessment-retention?apply=1`. Can also be called by hand.
- **What it does:** finds every person whose most recent Exposure Check is more than 12 months old (a newer check restarts the clock), skips anyone on the keep list, then for each person: removes them from Brevo list 21, or deletes the Brevo contact if 21 is their only list; and only after that succeeds, deletes their Exposure Check rows (including the generated report, so the report link stops working). Brevo is touched only in production.
- **Data touched:** `operations_reports` in the lead-engine database; Brevo contacts and list 21 (Assessment Leads). Does not touch contact-form enquiries and proposals (reviewed by hand at least yearly), guide requests (separate unscheduled job, `/api/cron/guide-retention`), newsletter subscribers, or analytics.
- **Services and env vars:** `CRON_SECRET` (bearer token; with none set the job refuses every call), `RETENTION_KEEP_EMAILS` (comma-separated client addresses to skip; empty means nobody is skipped), `BREVO_API_KEY`, `VERCEL_ENV`.
- **If it fails:** a Brevo failure keeps that person's rows and the job retries them next month (`retryNextRun` in the response and log). Failures are logged with the status code only, never the address.
- **Run or test by hand:** call the route with `Authorization: Bearer <CRON_SECRET>` and no `apply` parameter for a dry run. The dry run lists the addresses it would delete (`wouldDelete`) and the size of the keep list. Add `?keep=a@x.com,b@y.com` to test the keep list without changing the environment. Add `?apply=1` only after checking the dry run.
- **Jimmy's actions:** after release, run a dry run and check `wouldDelete` against the client list; put any client addresses in `RETENTION_KEEP_EMAILS` in Vercel (production) before the first scheduled run; do the yearly review of enquiries and proposals by hand.
- **Privacy policy section:** section 5 (retention); effective 13 October 2026.

### Contact form and enquiry confirmation
- **Status:** preview (on `claude/release-1-approved-strings`, then `preview/lead-magnet-guide`); live on main with the old wording
- **Trigger:** a visitor submits the form at /contact
- **What it does:** the API route stores the enquiry, emails the visitor a confirmation and emails hello@ a notification. The confirmation, the line under the form and the on-page confirmation make no response-time promise ("will be in touch shortly", "We'll reply as soon as we can.", "We'll be in touch soon.").
- **Data touched:** enquiry details in the website database; Brevo for the emails
- **Services and env vars:** `BREVO_API_KEY`
- **If it fails:** the error is logged; the visitor sees the form error state
- **Run or test by hand:** submit the form with a test address (jimmym@ or hello@ only) and check both emails and the on-page confirmation
- **Jimmy's actions:** reply to enquiries by hand; no turnaround is promised anywhere
- **Privacy policy section:** section 1 (who we are), sections 5 and 6 (sharing, retention)

### Exposure Check consent notice
- **Status:** preview (on `claude/release-1-approved-strings`, then `preview/lead-magnet-guide`)
- **Trigger:** shown under the submit button at /popia-ai-check
- **What it does:** tells the visitor how their name and email are used, that some providers process information outside South Africa, and that sending the request is their agreement. This is the consent ground (POPIA section 72(1)(b)) behind the cross-border sentence in the privacy policy.
- **Data touched:** none (static text)
- **Services and env vars:** none
- **If it fails:** not applicable
- **Run or test by hand:** open /popia-ai-check and read the line under the button; the Privacy Policy link must open /privacy-policy
- **Jimmy's actions:** keep the wording and policy section 5 in step
- **Privacy policy section:** section 5 (information outside South Africa)

(Further entries to be added after the first inventory pass.)
