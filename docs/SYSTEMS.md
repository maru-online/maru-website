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

### Exposure Check retention job
- **Status:** preview (on `preview/lead-magnet-guide`, not on production; fix on `fix/retention-brevo-first`)
- **Trigger:** Vercel cron, 02:00 UTC on the 1st of each month, calling `/api/cron/assessment-retention?apply=1`. Can also be called by hand.
- **What it does:** finds every person whose most recent Exposure Check is more than 12 months old (a newer check restarts the clock), skips anyone on the keep list, then for each person: removes them from Brevo list 21, or deletes the Brevo contact if 21 is their only list; and only after that succeeds, deletes their Exposure Check rows (including the generated report, so the report link stops working). Brevo is touched only in production.
- **Data touched:** `operations_reports` in the lead-engine database; Brevo contacts and list 21 (Assessment Leads). Does not touch contact-form enquiries and proposals (reviewed by hand at least yearly), guide requests (separate unscheduled job, `/api/cron/guide-retention`), newsletter subscribers, or analytics.
- **Services and env vars:** `CRON_SECRET` (bearer token; with none set the job refuses every call), `RETENTION_KEEP_EMAILS` (comma-separated client addresses to skip; empty means nobody is skipped), `BREVO_API_KEY`, `VERCEL_ENV`.
- **If it fails:** a Brevo failure keeps that person's rows and the job retries them next month (`retryNextRun` in the response and log). Failures are logged with the status code only, never the address.
- **Run or test by hand:** call the route with `Authorization: Bearer <CRON_SECRET>` and no `apply` parameter for a dry run. The dry run lists the addresses it would delete (`wouldDelete`) and the size of the keep list. Add `?keep=a@x.com,b@y.com` to test the keep list without changing the environment. Add `?apply=1` only after checking the dry run.
- **Jimmy's actions:** after release, run a dry run and check `wouldDelete` against the client list; put any client addresses in `RETENTION_KEEP_EMAILS` in Vercel (production) before the first scheduled run; do the yearly review of enquiries and proposals by hand.
- **Privacy policy section:** section 5 (retention); effective 12 October 2026.
