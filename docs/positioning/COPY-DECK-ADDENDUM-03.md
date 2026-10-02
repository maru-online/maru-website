# Copy Deck Addendum 03: POPIA-safe AI check — report copy and remaining page slots

> **Status:** APPROVED as written, 28 Sep 2026, by Jimmy Motsei. Built on `positioning/popia-safe` the same day
> (B and C in `lib/assessment/reportTemplates.ts`; A1–A13 and A15 in place). A14 is Jimmy's check in Brevo.
> Same rules as `COPY-DECK.md`: verbatim once approved, SA English, pain first, never lead with "AI",
> no legal advice, no banned claims, no unsourced statistics.
> Context: the POPIA-first assessment (Addendum 02 item B) is built at `/popia-ai-check` and tags
> submissions `assessment_v3`. Until this addendum is approved, a v3 report shows the level, the level
> summary, the five area statuses and the closing line only. The findings and "Recommended approach"
> sections are hidden, not filled with placeholder text.

---

## A. Page slots still showing v2 copy

These slots have no approved v3 wording. The build left the existing text in place, except for one
sentence that had become false and was removed (A3).

| # | Where | Current (v2, still live on the branch) | Proposal |
|---|---|---|---|
| A1 | `/popia-ai-check` eyebrow | Operations Assessment | `POPIA-safe AI check` |
| A2 | `/popia-ai-check` H1 | Find out where your business is losing time and money to manual processes. | `Find out where your client information goes when your team uses AI.` |
| A3 | Intro box, 2nd paragraph (**removed**: it listed the old five areas) | You will receive a structured report showing how your business rates across five areas: process, data flow, lead management, visibility, and people dependency… | `You'll get a short report showing how your business rates in each of the five areas, and what to fix first.` |
| A4 | Results step, box heading + body | Your detailed report goes deeper. / It breaks down each area — what your answers reveal, the specific issues, and a recommended approach for your stage of business. Enter your details below to receive it. | Keep as is. It becomes true once B and C are approved. |
| A5 | Done step, body | …your findings across all five operational areas and a recommended next step. | `Check your inbox for a link to your report: your result in each of the five areas and a recommended next step.` |
| A6 | Page `<title>` / meta description (`app/popia-ai-check/layout.tsx`) | Free Operations Assessment \| Maru Online / Fifteen minutes to find where manual work is costing your business time and money… | `Free POPIA-Safe AI Check \| Maru Online` / `Ten questions, about three minutes. See where client information goes through your AI tools, apps and WhatsApp, and what to fix first. Free, emailed to you.` |
| A7 | Report page header label + `<title>` (`app/report/[token]/page.tsx`) | Operations Assessment / Operations Assessment Report — Maru Online | `POPIA-safe AI check` / `Your POPIA-Safe AI Check Report \| Maru Online` (v3 reports only; v2 reports keep theirs) |
| A8 | Report "Next step" paragraph 1 | …asking direct questions about where time is actually going, where information gets stuck, and where the manual work is concentrated. | `We review your answers before the call. On the day, we go deeper: which tools see client information, where it's stored, and who can reach it.` |
| A9 | WhatsApp opener for `/popia-ai-check` (`lib/whatsapp.ts`) | I'd like to book my free operations assessment. | `I'd like to do the free POPIA-safe AI check.` (the Playwright test string changes with it) |
| A10 | Chatbot knowledge (`lib/chatbot-prompt.ts`) | **Operations Assessment:** Free analysis of where manual work is costing your business time and money, with a personalised report | `**POPIA-safe AI check:** Free 10-question check of where client information goes through your AI tools, apps and WhatsApp, with a personalised report` |
| A11 | Homepage assessment band (`AssessmentFormSection`) H2 | What's Costing You / Time and Money | `Where does your` / `client data go?` |
| A12 | same, body | Our free assessment shows you exactly where your processes are losing capacity. Ten minutes. Results within 48 hours. | `Our free check shows where client information slips through your AI tools, apps and WhatsApp. About three minutes. Your report arrives by email.` (The "48 hours" promise belongs to the paid audit, and the check now takes about 3 minutes, not 10.) |
| A13 | same, "proof stats" | Average 3–5 critical gaps identified per assessment / Average 12–18 hours per week recoverable through integration | **Remove both.** They are unsourced statistics, which POSITIONING.md bans. Nothing replaces them until there are real v3 numbers. |
| A15 | Homepage assessment band, white CTA card (`AssessmentFormSection`) | Get Your Free Assessment / Answer 10 questions about your operations. Takes about 10 minutes. We pinpoint exactly where your business is leaking time and money — and what to do about it. | `Get your free POPIA-safe AI check` / `Answer 10 questions about how your business handles client information. Takes about 3 minutes. We show you where it's exposed, and what to fix first.` |
| A16 | `/popia-ai-check` gate step, intro line | We will email you a link to your personalised report — a structured page showing your findings across all five areas with a recommended next step. | Keep as is. It becomes true once B and C are approved. |
| A14 | Brevo prospect email templates (`BREVO_TEMPLATE_LEVEL_1/2/3`) | Not in the repo. They receive `LEVEL_LABEL`, which is now Exposed / Partly protected / Well protected. | Jimmy to check the template bodies in Brevo for "operations", "Early Stage/Building/Primed" and time-saving copy before this ships. |

---

## B. Area findings (report "Area findings" section)

One entry per area and status. **Observation** is 1–2 sentences. **Issues** are shown under "Potential issues
identified" (or "To maintain and build on" for Strong).

### B1. AI in your business (`ai_use`)

**Critical gap**
- Observation: `Your team is using AI tools with no agreed rules, and client information may already have gone into them. Nobody could say today what was shared, or where it went.`
- Issues:
  - `No list of approved AI tools, so each person decides for themselves`
  - `Client names, ID numbers or notes may be sitting in free AI accounts you don't control`
  - `No record to show a client who asks where their information went`
  - `Staff who want to use AI well have no guidance to follow`

**Significant gap**
- Observation: `AI use has been talked about, but not settled. Some people use it carefully, and you're relying on their judgement rather than a rule.`
- Issues:
  - `Informal agreements don't reach new staff or busy weeks`
  - `Nobody has checked whether client information has been pasted into an AI tool`
  - `The free versions of most AI tools don't give you control over what they keep`

**Partial**
- Observation: `You have clear habits around AI, with a gap or two, usually in what counts as client information and who checks.`
- Issues:
  - `The rules exist but aren't written down where the team can find them`
  - `Nobody reviews whether the rules still match the tools people now use`

**Strong**
- Observation: `You've agreed which AI tools are allowed and the team keeps client information out of them.`
- Issues:
  - `Write the rules into onboarding so new staff learn them on day one`
  - `Review the approved list whenever a new tool is adopted`

### B2. Where client information goes (`data_location`)

**Critical gap**
- Observation: `Client information lives in phones, inboxes, WhatsApp groups and spreadsheets, so it's in more places than anyone can list. You can't protect what you can't find.`
- Issues:
  - `Copies of client records on personal phones and in personal accounts`
  - `No view of which apps store information outside South Africa`
  - `Losing one phone or inbox could expose client information with no way to know what was in it`
  - `Answering a client's question about their data would mean searching everywhere`

**Significant gap**
- Observation: `Your main systems hold most client information, but copies keep escaping into email and spreadsheets, and the smaller apps haven't been checked.`
- Issues:
  - `Spreadsheet and email copies go out of date and out of sight`
  - `Smaller apps may store client information offshore without anyone knowing`
  - `Every copy is another place to secure and another place to search`

**Partial**
- Observation: `You know where most client information lives and you've checked your main systems. The gaps are in the smaller apps and the copies people make to get work done.`
- Issues:
  - `Smaller or newer apps haven't been checked for where they store data`
  - `Working copies aren't cleaned up when the job is done`

**Strong**
- Observation: `Client information sits in systems you control, and you know which of them store data outside South Africa.`
- Issues:
  - `Check each new app's storage location before the team adopts it`
  - `Recheck once a year, because vendors change where they host`

### B3. Who can see it (`access`)

**Critical gap**
- Observation: `Shared logins and open access mean almost anyone, including people who've left, could reach your full client list. There's no way to tell who looked at what.`
- Issues:
  - `Former staff may still have working logins or client information on their devices`
  - `Shared passwords make it impossible to trace who did what`
  - `Client lists circulate in team chats where anyone in the group can see them`

**Significant gap**
- Observation: `You remove the main logins when someone leaves, but smaller apps slip through, and most of the team can open the full client list.`
- Issues:
  - `Leftover logins in smaller apps are an open door`
  - `Access is wider than most people need for their job`
  - `No one list of which apps each person can reach`

**Partial**
- Observation: `Access is mostly limited to the people who need it, and leavers are usually switched off. The gaps are small and easy to close.`
- Issues:
  - `No written checklist for switching off a leaver's access`
  - `Access isn't reviewed when people change roles`

**Strong**
- Observation: `Only the right people can reach client information, and access ends on a leaver's last day.`
- Issues:
  - `Keep the leaver checklist current as you add apps`
  - `Review who has access to what once a year`

### B4. Permission and trust (`permission`)

**Critical gap**
- Observation: `You message clients without a record of who agreed, and you couldn't easily tell a client what you hold about them. Both are exactly what clients and the Information Regulator ask about.`
- Issues:
  - `Marketing goes to people who never agreed to receive it`
  - `No way to prove consent if a client complains`
  - `A client asking what you hold about them would get a slow or incomplete answer`

**Significant gap**
- Observation: `Most of your list opted in, but some contacts were added without asking, and answering a client's information request would take real digging.`
- Issues:
  - `Contacts added from other sources have no consent record`
  - `Client information is spread out, so requests take days of searching`
  - `Unsubscribes may not reach every tool you send from`

**Partial**
- Observation: `Consent is mostly in place and you could answer a client's request. What's missing is a record you can show and a routine for requests.`
- Issues:
  - `Consent is given but not stored with a date and the wording that was used`
  - `No set process for handling a client's request about their information`

**Strong**
- Observation: `Your clients chose to hear from you, and you could tell any of them what you hold within days.`
- Issues:
  - `Keep a dated record of the consent wording each time it changes`
  - `Make sure new tools respect unsubscribes from day one`

### B5. If something goes wrong (`incident`)

**Critical gap**
- Observation: `Nobody owns the protection of personal information, and a lost phone or a hack could go unnoticed. When something goes wrong, the first hours matter most.`
- Issues:
  - `No named person responsible for personal information`
  - `No plan for who to tell, what to do and by when`
  - `A breach could go unnoticed until a client finds out first`

**Significant gap**
- Observation: `Someone would step in if something went wrong, but there's no plan, and responsibility sits with you by default rather than by decision.`
- Issues:
  - `Working it out on the day means slower, less certain decisions`
  - `Responsibility hasn't been formally given to anyone`
  - `Nobody has written down which clients and which information each device holds`

**Partial**
- Observation: `You know who's responsible and roughly what you'd do. The next step is writing it down so it works when that person isn't there.`
- Issues:
  - `The plan lives in one person's head`
  - `No practice run, so gaps only show up in a real incident`

**Strong**
- Observation: `A named, registered person owns this, and there's a plan for who to tell, what to do and by when.`
- Issues:
  - `Walk through the plan once a year with the team`
  - `Update it when you add systems or staff`

---

## C. Level summaries (report "Recommended approach" and outcome sections)

Headings for all three levels: `Recommended approach` / `What good looks like`.

**Level 1, Exposed**
- Approach: `Start with the quick, cheap fixes: agree which AI tools are allowed, switch off old logins, and name the person responsible. Then find out where client information actually goes. The POPIA-Safe AI Audit maps every tool, AI app and data flow in your business and ranks the risks, so you fix the biggest ones first.`
- Outcome: `Your team uses AI with clear rules. Client information sits in systems you control. You know who can see it, and if a client asks what you hold, you can answer.`

**Level 2, Partly protected**
- Approach: `Your habits are a good base. The work is closing the gaps where AI tools, WhatsApp and old logins meet client data. The POPIA-Safe AI Audit maps those meeting points and gives you a fixed-price plan for what to fix first.`
- Outcome: `The gaps are closed without slowing the team down. Every tool that touches client information is known, approved and switched off when someone leaves.`

**Level 3, Well protected**
- Approach: `Your foundations are sound. The risk now is new tools arriving faster than your checks. The POPIA-Safe AI Audit reviews the AI tools and automations you're adding and confirms each one keeps client information where it should be.`
- Outcome: `You add AI with confidence, and every new workflow is checked before it touches client information.`

---

**Caveat:** this wording describes habits and risks, not legal conclusions, and never says a business is or isn't
compliant. It is not a legal opinion. POSITIONING.md lists a legal review partner as "not yet".

**When approved (build list, not copy):** paste B into `v3AreaTemplates` and C into `v3SummaryTemplates` in
`lib/assessment/reportTemplates.ts`; the report page shows those sections automatically. Apply A1 to A13 in place.
