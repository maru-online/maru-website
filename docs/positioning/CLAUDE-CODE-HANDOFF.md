# Claude Code Handoff: POPIA-safe repositioning

> Prepared 26 Sep 2026 in Cowork. Read with `POSITIONING.md` and `COPY-DECK.md` in this folder.

## Gate 0: before any code session (Jimmy)

1. **Freeze exception.** `docs/STRATEGY-2026-H2-OPTION-A.md` Standing Rule 2 freezes the website until
   31 Jan 2027. This repositioning is a copy change across existing pages plus one small trust strip.
   There is no redesign and no new pages. It still needs an explicit exception. Record it by adding an
   amendment line under Standing Rule 2, or tell the session to add one.
2. **Approve `COPY-DECK.md`.** Change its status line to `APPROVED` with the date.
3. **Confirm credentials.** Resolve the [CONFIRM] items: Information Officer registration, PAIA manual
   link, and the May 2026 PAIA notice.
4. **Clean working tree.** Branch `fix/site-brief-sep2026` has uncommitted changes. Commit, stash or
   discard them first, then create `positioning/popia-safe` from the branch you deploy from.

Session 1 is read-only and can run before Gate 0 is closed. Sessions 2–5 wait for it.

## How to run each session

```bash
cd ~/Projects/maru-online/maru-website
claude
```

Run one task per session, then start fresh with `/clear` or a new terminal. Every session ends with
`npm run lint && npm run type-check && npm run lint:design && npm run build`, a commit on
`positioning/popia-safe`, and a push for a Vercel preview. Jimmy reviews the preview before the next session.

---

### Session 1: Audit and change map (read-only, safe to run now)

```
Read CLAUDE.md, docs/positioning/POSITIONING.md and docs/positioning/COPY-DECK.md.
Task: audit only. Do not edit any existing file.
1. List every file/component that renders customer-facing copy, page metadata, OG/Twitter
   text, JSON-LD, sitemap entries or internal links to /services/operations-diagnostic.
2. Map each one to the COPY-DECK.md section that replaces it (file path + line numbers).
3. Flag: (a) copy-deck items with no home in the code, (b) existing copy that contradicts
   POSITIONING.md or uses a banned claim, (c) pages advertising web design, websites or
   digital marketing, (d) any form that collects personal information without a working
   submission path.
Output: docs/positioning/CHANGE-MAP.md. Then stop and summarise the gaps for me.
```

### Session 2: Homepage + global (after Gate 0)

```
Read CLAUDE.md, docs/positioning/POSITIONING.md, COPY-DECK.md and CHANGE-MAP.md.
Task: implement COPY-DECK.md sections 1 (Global) and 2 (Homepage) only, verbatim.
Remove the "Need more than workflows?" section. Add the trust strip using an existing
component, and ship only rows not marked [CONFIRM] unless docs say they are confirmed.
No design changes, no new components, no copy not in the deck.
Run lint, type-check, lint:design and build; fix failures; commit on positioning/popia-safe.
```

### Session 3: Services, pricing, process, about + redirect

```
Read the three positioning docs and CHANGE-MAP.md.
Task: implement COPY-DECK.md sections 3–6. Rename /services/operations-diagnostic to
/services/popia-safe-ai-audit with a 301 redirect in next.config.ts; update every internal
link, the footer, pricing and sitemap. Copy verbatim, no design changes.
Run the checks, fix failures, commit.
```

### Session 4: Trust and liability fixes

```
Read the three positioning docs.
Task: implement COPY-DECK.md section 7. For the POPIA checklist form: wire onSubmit to the
existing Brevo submission path (inspect /api/newsletter and /api/lead, reuse whichever
fits) so the checklist is emailed and consent is stored; if that is not possible within
this session, unpublish the page (remove from nav, sitemap and links; return 404) and
tell me. Grep the whole repo for banned claims in POSITIONING.md and list any remaining.
Run the checks, fix failures, commit.
```

### Session 5: Verification pass

```
Read the three positioning docs.
Task: verify only. On the Vercel preview (or `npm run dev`), check every route in
CHANGE-MAP.md against COPY-DECK.md. Screenshot homepage, /services, the audit page and
/pricing at mobile (390px) and desktop widths. Confirm the 301 works, sitemap has the
new URL, no banned claim remains, and the old "We build the rest too" offers are gone.
Output: docs/positioning/VERIFICATION.md with pass/fail per item.
```

---

## After merge

- Request re-indexing of the homepage and the new audit URL in Google Search Console.
- Update LinkedIn headline and company tagline to the category line (outside this repo).
- Next Cowork stage: the communications strategy, built on the approved positioning.
