# POPIA-safe work: what changed, and where it drifted

Prepared 5 Oct 2026 for Jimmy. Covers everything from the start of the POPIA-safe work (26 Sep, 02:52) to the
latest commit (2 Oct, 17:13).

## First, the shape of it

- **One branch holds all of it:** `positioning/popia-safe`, open as PR #12. No other branch has POPIA work on it.
  (The older branches in the repo, e.g. `design/light-refresh`, date from April to August and are unrelated.)
- **35 commits of real work, plus 4 merges** that pulled the 1–2 Oct security fixes in from `main`.
- **18 of the 35 commits are paperwork only** (handovers, copy drafts, decisions). They changed nothing on the site.
- **None of it is live.** maruonline.com still runs the pre-POPIA site plus the security fixes. Everything below
  exists only on the preview link.
- **The starting point** was commit `c49e3e6` (3 Sep, the Sep brief). The site at that moment is exactly what is
  live today, minus the security fixes.

How to read the tags:

- **[Approved]**: built from COPY-DECK.md or an addendum you approved.
- **[Your request]**: you asked for it in the session.
- **[Claude's call]**: Claude decided it. There's no record of you asking or approving.
- **[No record]**: probably discussed in the session, but nothing in the commits or handover confirms your approval.

---

## Day 1: Friday 26 Sep (the big day, 15 commits)

### Early morning: the core repositioning

**1. Positioning documents adopted** (`8d00edf`), paperwork only.
POSITIONING.md, COPY-DECK.md, the change map and the website-freeze exception were added. This is the baseline
everything else should have followed.

**2. The main copy swap** (`6a8d3b4`, `dce3e39`). **[Approved]**, COPY-DECK §1–7.
- Homepage hero rewritten: "AI-Powered Workflows That Cut Your Operating Costs" became "Your team already uses
  AI. Is it within POPIA?"
- The "operational gap" section became "The hidden risk": new cards about data leaving the country and staff
  pasting records into free AI tools.
- **The "Need more than workflows? We build the rest too" section was removed** (Strategy, Websites, Digital
  Marketing). The copy deck called for this.
- Homepage service cards went from 6 to 4.
- A trust strip was added near the bottom. Only one of its four lines shows; the other three wait on facts you
  need to confirm.
- **"Operations Diagnostic" was renamed "POPIA-Safe AI Audit" everywhere**, and its page moved to a new address.
- Services, pricing, process and about copy were partly rewritten. The website-build and site-infrastructure
  offers were dropped.
- The POPIA checklist page was unpublished (its form was fake).

**3. The decorative Maru "M" was removed from the homepage hero** (`9a4131c`). **[Claude's call]**.
The commit says it "keeps the hero clean behind the new headline". This is a design change that nobody asked
for, and the component was deleted with it.

**4. Placeholder proof strip hidden, homepage share title fixed, code tidy-up** (`ca36bb5`). **[Claude's call]**,
but sensible. The tidy-up touched 12 files and has no visible effect.

### Mid-morning: images, colour and structure

**5. Founder portrait added to About** (`4bc07ba`). **[Your request]**, approved as an exception to the freeze.

**6. Nine AI-generated photos added** (`5d89190`). **[Your request]**, decided 26 Sep (Gemini, no licence fees).
- Five existing images on Home, Services and Process were swapped out.
- **Four new photo bands were added**, one on each service page, above the final call to action.
  That adds new page sections, not just swapped images.

**7. Homepage photo band copy changed** (`6b4c98e`). **[Your request]**.
It now reads "Your clients trust you with their information. Keep that trust as your team uses AI."

**8. Colour change: nav and service-page labels moved from cyan to gold** (`746d72a`). **[Claude's call]**.
- **This is the main CSS drift.** The active link in the top menu used to be cyan with a cyan underline. It is now
  gold on the navy hero, antique gold on the white bar, with a gold underline.
- The small labels above the service-page headlines changed from ochre to gold. A new style
  (`label-eyebrow-gold`) was added to make that work.
- The reason given was a real bug: the active link was meant to be cyan but rendered as dark text. **The fix
  restored legibility, but it changed the brand accent from cyan to gold instead of restoring cyan.**

**9. The /process page was deleted and folded into Services; prices were hidden** (`c68f574`). **[No record]**.
- /process (451 lines) is gone, along with "Process" in the menu. Old links now redirect to a new
  "How an engagement runs" section on /services.
- **That new section's copy was written by Claude**: four steps and four FAQs, "rewritten to the POSITIONING.md
  frame". **None of it is in the copy deck.** This is the biggest messaging drift. See the copy list below.
- Prices were removed from Integration, Training and Optimisation, which now read "Fixed quote". Only the R4,500
  audit shows a number. New short lines were written for each service page ("Every integration starts with the
  audit.", "Start with the audit.") that aren't in the copy deck either.
- The insights writer was paused (this part was approved, see PR #11).

### Midday: the new assessment

**10. The free assessment was rebuilt as a POPIA check** (`9053152`). **[Approved]**, Addendum 02 B and
Addendum 01 D.
- New address: /popia-ai-check. Ten POPIA questions, results levels Exposed / Partly protected / Well protected.
- A consent tick box was added, and marketing emails only go out if it's ticked.
- This is mostly functional work and was checked word-for-word against the addendum.

**11. Handovers** (`45c4826`, `c6c8c72`), paperwork only.

---

## Day 2: Monday 28 Sep (10 commits)

**12. New messaging rules adopted** (`5f54807`), paperwork only.
"POPIA-Safe AI Integration" became the umbrella descriptor. Rules added: no "safe" on its own, no "we protect your
data", prefer "within POPIA".

**13. No-confusion copy sweep** (`6d941e5`, `85f5ed9`, `ebabaec`). **[Approved]**, Addendum 04.
Small wording fixes on the homepage, services, the stats band and the site description.

**14. Assessment report copy** (`2b3bf1c`). **[Approved]**, Addendum 03, checked word-for-word.
- The unsourced statistics on the homepage assessment band were removed.

**15. Leftover assessment wording fixed; 30-minute call everywhere** (`db79de5`, `39ac4e4`, `e308be1`).
**[Approved]**, Addendum 05.
- Three files of dead code nothing used were also deleted (old chatbot prompt, old email route).
- **But "30 minutes everywhere" didn't fully land.** See the inconsistencies below.

**16. Page-structure fix and processor list** (`2867eb6`). **[Claude's call]**, invisible to visitors
(accessibility markup).

**17. The cookie banner now actually works** (`daacf3b`). **[Approved]**.
Before this, GA4 and the Meta Pixel ran no matter what visitors chose. This is a real legal fix and worth keeping
whatever you decide.

**18. Checkpoint** (`a5b4aba`), paperwork only.

---

## Days 3–4: 1–2 Oct (10 commits, mostly paperwork)

**19. Security fixes from `main` merged in** (4 merges). These are needed in any restart.

**20. Handover updates** (`2dcb7d1`, `bd0a893`, `75f3793`, `f4d90ea`, `e5d8fd9`, `3bd931b`), paperwork only.

**21. Cookie policy section 4 rewritten** to match the real banner (`4dff84e`, `c96998b`). **[Approved]**.

---

## Where the drift is

### A. Copy that was written without an approved source

Claude wrote these lines. None of them appears in the copy deck or any addendum.

| Where | What | Came from |
|---|---|---|
| /services, "How an engagement runs" | 4 step headings, 4 step descriptions, 4 FAQs ("I already use AI tools. Do I have to replace them?" and others) | #9 |
| Each service page | "Fixed quote", "Every integration starts with the audit.", "Start with the audit.", "Every engagement starts with the audit." | #9 |
| Audit service page | "The audit report is the input to every other engagement…" | #2 |
| /pricing | "How pricing works", and the milestone-payment paragraph | #9 |
| Report page | "We will tell you honestly whether a POPIA-Safe AI Audit makes sense…" | #10 |

### B. Mistakes made when renaming

- **Privacy policy:** "Assess POPIA-Safe AI Audit scores based on form inputs." A find-and-replace turned
  "Operations Diagnostic" into the paid audit's name. That line is about the *free check*, so it now describes the
  wrong product.

### C. Old copy left behind, so the voice is now mixed

The rule was "if there's no approved copy, leave the old text", so these were never touched. The result reads as
two different companies:

- **About page: almost entirely pre-POPIA.** It talks about "the integration gap" and "a configuration problem",
  and says "We limit ourselves to five active clients". It doesn't mention POPIA.
- **Service page bullet points** still use the old operational language ("Every data touchpoint designed for
  compliance before a line of code is written"). "Compliance" is a word the new rules steer away from.
- **Terms page:** "We are committed to protecting your data." The copy deck fixed the *second* sentence of this
  paragraph, but this first sentence breaks the 28 Sep rule against custody language ("never 'we protect your
  data'"). The Addendum 04 sweep missed it.

### D. Facts that now contradict each other

- **Call length:** Addendum 05 set it at 30 minutes everywhere, but /services still says "Twenty minutes will tell
  you." and /contact says "Twenty minutes, straight to the point."
- **Response time on /contact:** the same page says "within 24 hours", "within 4 business hours" and "within 1
  business day".
- **Office hours:** /contact says Mon–Fri 8am–6pm; the footer says 9am–6pm.

### E. Design and CSS changes

Smaller than it may feel. Only one style rule was added to the stylesheet. The changes:

1. **Hero "M" removed.** [Claude's call]
2. **Active menu link and underline changed from cyan to gold; service labels changed from ochre to gold.**
   [Claude's call]
3. **"We build the rest too" section removed; 6 cards cut to 4; trust strip added.** [Approved]
4. **Nine new photos, including four new photo sections on the service pages.** [Your request]
5. **/process page deleted and "Process" removed from the menu.** [No record]
6. **Prices hidden except the audit.** [No record]

---

## If you start again: what to keep, whatever you decide

Restart from **current `main`**, not from the old 3 Sep commit. `main` already *is* the pre-POPIA site, and it
also has the five security fixes from 1–2 Oct, which going back to 3 Sep would lose.

These items are worth carrying over, because they're fixes rather than messaging choices:

- **The cookie banner fix (#17).** Without it, the live site tracks visitors who clicked Decline.
- **The dead-code deletions (#15).**
- **The placeholder proof strip hidden (#4).** Already prepared separately as a hotfix for the live site.
- **The positioning documents themselves (#1, #12).** A restart rebuilds the site *from* these, so they come too.

Everything else can be rebuilt on a clean branch from the approved copy deck only. Each design change would be
made as its own commit that you sign off.
