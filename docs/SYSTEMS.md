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
- **Data touched:** computed areas and level label stored with the report; stored reports are never re-scored
- **Services and env vars:** none (pure function in lib/assessment/scoring.ts; questions in questions.ts)
- **If it fails:** the submit route rejects answer sets it does not recognise rather than scoring them
- **Run or test by hand:** answer option 2 on every question: expect Exposed with five Significant gap areas
- **Jimmy's actions:** update Addendum 02 to the new threshold
- **Privacy policy section:** how we handle assessment answers

(Further entries to be added after the first inventory pass.)
