# Copy Deck Addendum 02: homepage band and a POPIA-first assessment

> **Status:** DRAFT, 26 Sep 2026. Item A is on the branch preview at Jimmy's request. Item B waits for his approval before any build.
> Same rules as `COPY-DECK.md`: verbatim once approved, SA English, pain first, never lead with "AI", no legal advice, no banned claims.

---

## A. Homepage image band (`app/page.tsx`, before the assessment section)

The old band sold time saving ("We don't replace your team. We give them their time back."). The new copy leads with client trust, which is the POSITIONING.md mind-word *safe*.

| Line | Old | New |
|---|---|---|
| Headline, light | We don't replace your team. | `Your clients trust you with their information.` |
| Headline, bold | We give them their time back. | `Keep that trust as your team uses AI.` |
| Sub-line | Without putting your clients' data at risk. | `We check where client data goes and make every workflow POPIA-safe.` |

[ALT] headline pair: `Your clients' information is your reputation.` / `Use AI without putting either at risk.`

---

## B. The assessment: from an operations check to a POPIA-safe AI check

**Finding.** The current `/operations-assessment` has no POPIA content at all. Its 10 questions cover process, data flow, leads, reporting and key-person risk, and the report calls the result "operational readiness". It sells the old positioning, and it's the first thing the new homepage asks people to do.

**Approach.** Keep the mechanics: 10 questions, 5 areas of 2, 4 answers each, scored 4 / 2 / 1 / 0 from best to worst. Only the words and the answer keys change, so `scoring.ts` needs new maps, not new logic. Questions are plain language: no section numbers, no legal terms beyond "Information Regulator" once.

### Area 1: AI in your business

**Q1. How is your team using AI tools like ChatGPT or Gemini at the moment?**
- We've agreed which tools are allowed and what they can be used for (4)
- A few people use them, and we've talked about it informally (2)
- People use whatever they like; we haven't discussed it (1)
- I don't really know who uses what (0)

**Q2. Has client information ever gone into an AI tool: names, ID numbers, account details, medical or financial notes?**
- No. We have a rule against it and the team knows it (4)
- Probably not, but we've never checked (2)
- Probably yes. It's the quickest way to get things done (1)
- I don't know (0)

### Area 2: Where client information goes

**Q3. Where does your client information mostly live day to day?**
- In one or two business systems we pay for and control (4)
- In a few systems, with copies in email and spreadsheets (2)
- Across WhatsApp, email, spreadsheets and personal phones (1)
- Mostly in people's phones, inboxes and heads (0)

**Q4. Do you know which of your apps store client information outside South Africa?**
- Yes. We've checked, and we know what's stored where (4)
- For our main systems, but not the smaller apps (2)
- Not really. We've never looked (1)
- I didn't know that mattered (0)

### Area 3: Who can see it

**Q5. When someone leaves your business, what happens to their access?**
- We switch off every login and device on their last day (4)
- We remove the main ones; smaller apps sometimes get missed (2)
- We change passwords when we remember (1)
- Logins are shared, so nothing really changes (0)

**Q6. Who could open your full client list today?**
- Only the people who need it for their job (4)
- Most of the team, behind a password (2)
- Anyone in the office or the team WhatsApp group (1)
- I'm not sure (0)

### Area 4: Permission and trust

**Q7. When you send clients marketing messages or newsletters, did they agree to receive them?**
- Yes. They opted in and can unsubscribe easily (4)
- Mostly. Some were added from our existing contacts (2)
- We message everyone on our list (1)
- We don't track who agreed (0)

**Q8. If a client asked what information you hold about them and who you share it with, could you answer?**
- Yes, within a few days (4)
- Yes, but it would take real digging (2)
- We'd struggle to give a full answer (1)
- We wouldn't know where to start (0)

### Area 5: If something goes wrong

**Q9. If a laptop or phone with client information were lost or hacked tomorrow, what would happen?**
- We have a plan: who to tell, what to do and by when (4)
- We'd work it out, and we know who's responsible (2)
- We'd scramble. Nobody owns this (1)
- We might not even know it had happened (0)

**Q10. Who in your business is responsible for protecting personal information?**
- A named person, registered with the Information Regulator (4)
- Me by default, but I haven't done anything formal (2)
- Nobody specific (1)
- I didn't know someone had to be (0)

### Result levels (replace "Early Stage / Building / Primed")

| Level | Label | One-line summary |
|---|---|---|
| 1 | `Exposed` | `Client information is moving through tools and people with no guard rails yet. The first fixes are quick and cheap.` |
| 2 | `Partly protected` | `You have some good habits, with gaps where AI tools, WhatsApp and old logins meet client data.` |
| 3 | `Well protected` | `Your foundations are sound. The work now is keeping them sound as you add AI.` |

Report copy stays plain and non-legal. Every report ends: `This check is a starting point, not legal advice. The POPIA-Safe AI Audit maps your actual data flows.`

### What changes when this is approved (build list, not copy)

- `app/operations-assessment/page.tsx`: questions, area names, intro line ("10 questions across 5 areas. About 3 minutes."), page title.
- `lib/assessment/scoring.ts`: new answer keys and maps; level labels above.
- `lib/assessment/reportTemplates.ts` and `synthesisPrompt.ts`: rewrite for the five POPIA areas. The prompt's rule "never mention AI in Object A" no longer fits and must go.
- Emails and Brevo list 21: stored answers change shape. Tag new submissions `assessment_v3` so old reports still render.
- Route: keep `/operations-assessment` and add `/popia-ai-check` as a 308 redirect target, or rename and redirect the old path. Jimmy to choose.
- Consent (Addendum 01, item D) ships in the same release.
