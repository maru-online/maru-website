// ─── Maru Online — Insights article content ──────────────────────────────────
// All articles are research-grounded. Sources are cited inline where statistics
// or external findings are referenced. Writing follows creator-style.md.

export interface Article {
  slug:     string;
  title:    string;
  category: string;
  date:     string;
  readTime: string;
  image:    string;
  excerpt:  string;
  content:  Section[];
}

export interface Section {
  type:    "heading" | "subheading" | "paragraph" | "callout" | "list" | "divider" | "quote";
  text?:   string;
  items?:  string[];
  label?:  string;
}

export const articles: Article[] = [
  // ─── ARTICLE 01 ──────────────────────────────────────────────────────────────
  {
    slug:     "why-ai-tools-fail-sme",
    title:    "Why AI tools fail South African SMEs — and it is not the tools",
    category: "Integration",
    date:     "March 2026",
    readTime: "7 min read",
    image:    "/images/insights/article-01.png",
    excerpt:  "Most AI tool failures in SMEs happen because the tools were implemented in isolation. The CRM does not know what the calendar is doing. The email platform does not know what the CRM recorded. Here is the pattern we see, and why it is fixable.",
    content:  [
      {
        type: "paragraph",
        text: "South African SMEs are buying AI tools at a growing rate. But the returns are not following. Research published in the International Journal of Research in Business and Social Science (2024) found that AI adoption by South African SMEs remains low in effectiveness — not because the tools are bad, but because the framework for adoption is missing. The tools get bought. The integration never gets built.",
      },
      {
        type: "paragraph",
        text: "We see this pattern in almost every diagnostic we run. A business has a CRM. It also has an email marketing platform. And a scheduling tool. And a spreadsheet that one staff member owns. None of them talk to each other. Every lead that comes in gets manually entered in three separate places. Every follow-up gets sent by hand. Every report gets assembled on a Friday afternoon by someone who should be doing something else.",
      },
      {
        type: "heading",
        text: "The investment paradox",
      },
      {
        type: "paragraph",
        text: "A widely cited figure in the South African market suggests that roughly 73% of local businesses have invested in some form of AI or automation tooling — but fewer than half report seeing a meaningful return. The gap is not a tool quality problem. It is an integration problem. The tools were purchased as standalone solutions to single problems. No one designed the architecture that would let them work together.",
      },
      {
        type: "callout",
        label: "The pattern",
        text:  "Tool A captures leads. Tool B sends emails. Tool C schedules appointments. None of them share data. A human sits in the middle, manually moving information between all three. That human's time is the hidden cost nobody calculated.",
      },
      {
        type: "heading",
        text: "Why it happens",
      },
      {
        type: "paragraph",
        text: "Most AI tool purchases in SMEs are reactive. A staff member sees a demo, or a competitor mentions they use something, or a problem gets bad enough that someone buys a solution. The purchase decision is made in isolation — without mapping how the new tool connects to everything else already in the stack.",
      },
      {
        type: "paragraph",
        text: "Researchers at the University of Johannesburg (Barnes, Sachs & Pelser, 2023) studied digital technology adoption in South African manufacturing SMEs and found the primary constraint was not cost or technical skill — it was the absence of a framework for adoption. Businesses were acquiring tools without a model for how those tools would change the workflow around them.",
      },
      {
        type: "subheading",
        text: "The three failure modes we see most often",
      },
      {
        type: "list",
        items: [
          "Siloed implementation — each department buys its own tool, no one owns the connective layer, data never flows between systems.",
          "No baseline measurement — the business does not know how long the manual process currently takes, so it cannot measure whether the new tool saved any time.",
          "No handover plan — the tool gets built by an outside consultant or a tech-savvy staff member, nobody else learns how to run it, and when that person leaves the system dies.",
        ],
      },
      {
        type: "heading",
        text: "The fix is not another tool",
      },
      {
        type: "paragraph",
        text: "The answer to a broken integration is not buying a better CRM or a smarter email platform. The answer is mapping what you already have, identifying where data stops flowing, and building the connective tissue. In most cases, the tools businesses already own are adequate. What is missing is the architecture that makes them work together.",
      },
      {
        type: "paragraph",
        text: "A well-designed integration means your CRM receives new leads automatically from your website form. It means your email platform knows a lead has been marked as a client and stops sending prospect nurture sequences. It means your scheduling tool creates a calendar block and notifies the right team member without anyone touching a keyboard.",
      },
      {
        type: "quote",
        text:  "Most businesses don't have an AI problem. They have an integration problem. That's exactly what we fix.",
        label: "— Jimmy Motsei, Founder, Maru Online",
      },
      {
        type: "heading",
        text: "What to do before you buy anything else",
      },
      {
        type: "paragraph",
        text: "Before any new tool purchase, map what you already have. List every software platform your business uses. For each one, ask: where does data enter this system? Where does it leave? Who moves it manually? The answers will show you where the integration gaps are — and which ones cost the most in team time.",
      },
      {
        type: "paragraph",
        text: "That is exactly what a Maru diagnostic does. It maps your existing tools, quantifies the cost of the gaps in hours and rand, and prioritises the integrations that will save the most. Before anything gets built, you have a clear picture of what is actually costing you.",
      },
      {
        type: "callout",
        label: "Sources",
        text:  "Akoh, E.I. (2024). Adoption of artificial intelligence for manufacturing SMEs' growth and survival in South Africa. International Journal of Research in Business and Social Science, 13(6), 23–37. | Barnes, J., Sachs, W. & Pelser, T. (2023). The challenges of digital technology adoption within a group of South African manufacturing SMEs. IBC 2023 Proceedings.",
      },
    ],
  },

  // ─── ARTICLE 02 ──────────────────────────────────────────────────────────────
  {
    slug:     "what-a-diagnostic-actually-finds",
    title:    "What a Maru diagnostic actually finds",
    category: "Diagnostic",
    date:     "February 2026",
    readTime: "6 min read",
    image:    "/images/insights/article-02.png",
    excerpt:  "We have run enough diagnostics to know the common failure patterns. This article breaks down the five most frequent integration gaps we find in SA businesses — and what they cost in team capacity.",
    content:  [
      {
        type: "paragraph",
        text: "The diagnostic is not an audit in the traditional sense. It is not a list of what you are doing wrong. It is a cost map — a structured way of quantifying how much time and money your current processes are consuming, and which integrations would recover the most of that cost.",
      },
      {
        type: "paragraph",
        text: "After running diagnostics across professional services businesses in South Africa, we see the same five gaps appear consistently. The names change. The tools change. The pattern does not.",
      },
      {
        type: "heading",
        text: "Gap 1: Manual lead capture and entry",
      },
      {
        type: "paragraph",
        text: "A lead comes in through the website contact form. Someone manually copies that information into the CRM. They might also add it to a spreadsheet. And send a follow-up email by hand. This three-step manual process happens for every single enquiry. In a business receiving 20–40 leads a month, this alone consumes between 3 and 6 hours of team time — and introduces data entry errors into every step.",
      },
      {
        type: "subheading",
        text: "What it costs: 3–6 hours/month per 20 leads",
      },
      {
        type: "heading",
        text: "Gap 2: Disconnected follow-up sequences",
      },
      {
        type: "paragraph",
        text: "The email platform does not know what the CRM recorded. So a lead that was marked as 'converted' in the CRM continues to receive prospect emails. Or a lead that went cold gets no follow-up because the sequence was never triggered. Both scenarios lose revenue — one through poor client experience, one through missed re-engagement.",
      },
      {
        type: "subheading",
        text: "What it costs: Unquantified revenue leakage — leads that slip without triggering a follow-up",
      },
      {
        type: "heading",
        text: "Gap 3: Report assembly as a recurring manual task",
      },
      {
        type: "paragraph",
        text: "Every week or month, someone — often a manager or business owner — manually compiles a status report. They open four systems, extract data from each, paste it into a spreadsheet, format it, and send it. This task exists in almost every business we have worked with. The average time: 90 minutes to three hours per report cycle.",
      },
      {
        type: "subheading",
        text: "What it costs: 6–12 hours/month in management time",
      },
      {
        type: "heading",
        text: "Gap 4: Appointment or scheduling friction",
      },
      {
        type: "paragraph",
        text: "In professional services, scheduling friction is a silent revenue killer. A prospective client emails to book a meeting. Someone checks availability, replies, waits for confirmation, manually adds the calendar block, and sends a calendar invite. In medico-legal and legal practices, this process sometimes takes 48–72 hours. Every day of delay increases the chance the prospect engages a competitor.",
      },
      {
        type: "subheading",
        text: "What it costs: 1–2 hours/week in admin, plus conversion rate impact",
      },
      {
        type: "heading",
        text: "Gap 5: No measurement baseline",
      },
      {
        type: "paragraph",
        text: "This is the most damaging gap — and the least visible. Most businesses cannot tell you how long their current processes take, what their lead-to-client conversion rate is, or how many hours their team spends on admin tasks each week. Without a baseline, you cannot know whether any investment in automation is working. You are flying without instruments.",
      },
      {
        type: "callout",
        label: "What the diagnostic delivers",
        text:  "A written report covering five sections: what is currently working, what is costing you and how much (in hours and rand), a prioritised map of three interventions ranked by impact, and a clear recommended next step. Delivered within 48 hours.",
      },
      {
        type: "heading",
        text: "What happens after",
      },
      {
        type: "paragraph",
        text: "The diagnostic report is a standalone deliverable. You do not need to engage further to get value from it. If you choose to proceed, the report becomes the brief for Phase 2 — the design of your integration architecture. Nothing gets built without that diagnosis first.",
      },
      {
        type: "paragraph",
        text: "The three interventions we prioritise in the report are ranked by a simple formula: hours saved multiplied by hourly cost, minus implementation complexity. The highest-return, lowest-complexity integration always goes first.",
      },
    ],
  },

  // ─── ARTICLE 03 ──────────────────────────────────────────────────────────────
  {
    slug:     "popia-ai-what-smes-need-to-know",
    title:    "POPIA and AI: What South African SMEs actually need to do",
    category: "Compliance",
    date:     "February 2026",
    readTime: "8 min read",
    image:    "/images/insights/article-03.png",
    excerpt:  "Compliance in an AI context is not about ticking boxes. It is about data flow. We explain how to build POPIA compliance into your automated workflows from day one, rather than retrofitting it later.",
    content:  [
      {
        type: "paragraph",
        text: "The Protection of Personal Information Act (POPIA) has been enforceable since July 2021. Three years in, the Information Regulator is no longer in the education phase — it is in the enforcement phase. Infringement notices have been issued. Penalties are real. The maximum fine is R10 million, and criminal prosecution is possible in cases of deliberate non-compliance.",
      },
      {
        type: "paragraph",
        text: "For most SMEs, POPIA compliance is still treated as a legal checkbox — a privacy policy on the website and a hope that the Regulator does not come knocking. But if you are building automated workflows that collect, route, or store personal information, the compliance question is not about the policy document. It is about the data architecture.",
      },
      {
        type: "heading",
        text: "What POPIA actually governs",
      },
      {
        type: "paragraph",
        text: "POPIA regulates how personal information is collected, stored, processed, and shared. Personal information is defined broadly — it includes names, email addresses, phone numbers, ID numbers, biometric data, health records, financial information, and any other data that identifies or can identify a living person. The law applies to any entity that processes personal data in South Africa, regardless of where that entity is based.",
      },
      {
        type: "paragraph",
        text: "The core principles are: process only what you need (data minimisation), collect for a specific stated purpose, obtain informed consent, secure the data, and give individuals the right to access, correct, or delete their information.",
      },
      {
        type: "callout",
        label: "The enforcement reality",
        text:  "The 2025 Amendment Regulations require that all security compromises be reported. This is no longer a theoretical compliance risk.",
      },
      {
        type: "heading",
        text: "Where AI workflows create POPIA risk",
      },
      {
        type: "paragraph",
        text: "The risk points in an automated workflow are where personal data enters, moves between systems, or gets processed by an AI tool. Each of these is a POPIA event that requires a lawful basis, appropriate security, and — in most cases — explicit consent.",
      },
      {
        type: "list",
        items: [
          "Website lead capture forms — collecting names and email addresses requires a clear consent mechanism and a stated purpose. A generic 'contact us' form is not sufficient.",
          "CRM data routing — when your website form automatically creates a CRM record, that automation is a data processing activity. Your CRM provider must be under a written data processing agreement with you.",
          "Email marketing automation — sending automated sequences to contacts requires opt-in consent. A contact who enquired about your services has not consented to receiving your newsletter.",
          "AI tools that process customer data — if you use an AI tool to analyse emails, summarise client records, or generate responses, that tool is a data operator. You need a processing agreement with the vendor.",
          "Cross-border data transfers — many SaaS tools store data on servers outside South Africa. POPIA governs cross-border transfers and requires that the receiving country provides adequate protection.",
        ],
      },
      {
        type: "heading",
        text: "Build it in from day one",
      },
      {
        type: "paragraph",
        text: "The most expensive compliance approach is retrofitting. Building consent architecture, data flow documentation, and processing agreements after a system is live requires rebuilding core workflow components. The practical approach is to design for compliance during the architecture phase — before any integration is built.",
      },
      {
        type: "subheading",
        text: "What compliant workflow architecture looks like",
      },
      {
        type: "list",
        items: [
          "Every form has a clearly stated purpose and a consent checkbox that is not pre-ticked.",
          "Every automated data route between systems is documented in a processing register.",
          "Every third-party tool that touches personal data has a written Data Processing Agreement (DPA).",
          "An Information Officer is formally appointed and registered with the Regulator.",
          "A data breach response procedure exists, tested before it is needed.",
        ],
      },
      {
        type: "heading",
        text: "Sectors with additional obligations",
      },
      {
        type: "paragraph",
        text: "POPIA is the baseline. In regulated sectors, additional requirements apply. Legal and medico-legal practices handle special personal information — health records, legal proceedings — which carries stricter processing conditions. Financial services businesses are supervised by the Financial Sector Conduct Authority, which has issued AI-specific guidance. HR and recruitment businesses process data about employment history, which requires explicit consent at every stage.",
      },
      {
        type: "callout",
        label: "Our approach",
        text:  "In any Maru engagement that involves personal data — which is almost all of them — compliance architecture is scoped in Phase 2 alongside the workflow design. Not retrofitted. Not treated as a legal department problem. Built into the data flow from the start.",
      },
      {
        type: "paragraph",
        text: "You do not need a dedicated compliance officer to achieve POPIA compliance. You need a clear data flow map, the right consent mechanisms, and processing agreements in place before data starts moving. That is a design problem, not a legal one.",
      },
      {
        type: "callout",
        label: "Sources",
        text:  "Nemko Digital (2025). AI Regulation in South Africa 2025: Laws & Compliance Guide. | Michalsons (2024). POPIA compliance in 2024. michalsons.com | Information Regulator South Africa. informationregulator.org.za",
      },
    ],
  },

  // ─── ARTICLE 04 ──────────────────────────────────────────────────────────────
  {
    slug:     "fixed-scope-vs-retainer",
    title:    "Fixed-scope vs retainer: How to think about AI implementation spend",
    category: "Engagements",
    date:     "January 2026",
    readTime: "6 min read",
    image:    "/images/insights/article-04.png",
    excerpt:  "The question we get most often after a diagnostic is about budget. We explain why we use fixed-scope engagements and how to measure the ROI of an integration before you commit to the build.",
    content:  [
      {
        type: "paragraph",
        text: "The conversation about AI implementation budget usually goes one of two ways. Either a business owner wants a retainer — ongoing access to someone who will keep iterating and improving — or they want a fixed project with a defined deliverable. Both are legitimate models. They solve different problems and carry different risks.",
      },
      {
        type: "heading",
        text: "The retainer model: where it works and where it does not",
      },
      {
        type: "paragraph",
        text: "A retainer makes sense when the work is genuinely ongoing — when your business needs continuous development, regular optimisation, or ongoing strategic input. Marketing agencies, for example, work on retainer because the work never stops: campaigns end, new ones begin, results need analysis, strategies need adjusting.",
      },
      {
        type: "paragraph",
        text: "In AI implementation, retainers are often sold before the problem is properly defined. A consultant proposes a monthly fee for access to their expertise. What gets done each month is vaguely defined. The client pays for availability rather than outcomes. Six months in, it is hard to say what the retainer delivered in measurable terms.",
      },
      {
        type: "callout",
        label: "The retainer trap",
        text:  "Retainers work when the scope of work is clear and recurring. They fail when they are sold as 'ongoing AI support' before the specific integrations and their costs are known. You end up paying for effort, not results.",
      },
      {
        type: "heading",
        text: "The fixed-scope model: why we use it",
      },
      {
        type: "paragraph",
        text: "Fixed-scope engagements work when the problem is well-defined, the deliverable is specific, and the success criteria are measurable. This is exactly what a diagnostic enables. Once we know what the integration gaps are, what they cost, and which ones to fix first, we can scope the build with a fixed price and a defined timeline.",
      },
      {
        type: "paragraph",
        text: "The advantage is accountability. You know what you are getting before you commit. The price does not change unless the scope changes — and scope changes require your explicit approval. There are no surprise invoices at the end of the month.",
      },
      {
        type: "subheading",
        text: "How to measure ROI before you commit",
      },
      {
        type: "paragraph",
        text: "The ROI calculation for a workflow integration is straightforward. You need three numbers: hours saved per week by the automation, loaded cost per hour of the team member doing the manual work, and the cost of the integration.",
      },
      {
        type: "callout",
        label: "The formula",
        text:  "Hours saved per week × weeks per year × loaded hourly cost = annual saving. Divide the integration cost by the annual saving to get payback period. A workflow that saves a paralegal 4 hours a week at R250/hour saves R52,000 per year. An integration costing R18,000 pays back in roughly 4.5 months.",
      },
      {
        type: "paragraph",
        text: "This calculation is only possible if you have a baseline. That is why the diagnostic comes first — it gives you the numbers needed to calculate ROI before any build begins. If a consultant is proposing a retainer before running a diagnostic, they cannot tell you the return. They are asking you to buy their time, not their results.",
      },
      {
        type: "heading",
        text: "The Maru engagement model",
      },
      {
        type: "paragraph",
        text: "We use fixed-scope engagements for all implementation work. The diagnostic is fixed at R4,500 to R5,000 and offsets against the build cost if you proceed. The core engagement — Phases 2 through 4, covering design, build, and the first measurement cycle — is priced at R35,000 fixed. If a site remediation is required, that is scoped separately after the diagnostic, typically R8,000 to R15,000.",
      },
      {
        type: "paragraph",
        text: "After the build is complete and measured, we offer an optional Phase 5 Optimise sprint — a fixed 60-day engagement to improve the workflows based on 30 days of live data. This is the right time for ongoing engagement, not before the integration is built and proven.",
      },
      {
        type: "list",
        items: [
          "Diagnostic: R4,500–R5,000 (offsets against the core engagement)",
          "Core engagement (Phases 2–4): R35,000 fixed",
          "Site remediation: R8,000–R15,000 (scoped after diagnostic)",
          "Optimise sprint (Phase 5): R15,000–R25,000, fixed 60-day",
        ],
      },
      {
        type: "paragraph",
        text: "Every engagement includes Phase 4 measurement built in. You see exactly what changed — hours saved, error rate reduction, lead-to-client conversion impact. If we cannot measure it, we have not delivered it.",
      },
    ],
  },

  // ─── ARTICLE 05 ──────────────────────────────────────────────────────────────
  {
    slug:     "automation-isnt-ai",
    title:    "Automation is not AI — and confusing them is costing you",
    category: "Integration",
    date:     "January 2026",
    readTime: "5 min read",
    image:    "/images/insights/article-05.png",
    excerpt:  "A Zapier workflow is not AI. A form that routes to a spreadsheet is not AI. Confusing the two leads to overpaying for simple tasks. We define the difference and show you where to use each.",
    content:  [
      {
        type: "paragraph",
        text: "The word 'AI' has been applied to so many different things that it has become almost meaningless. Chatbots are AI. Recommendation engines are AI. Predictive text is AI. But so is a Zapier workflow, according to most marketing copy from the companies selling workflow automation tools.",
      },
      {
        type: "paragraph",
        text: "This confusion costs businesses money in two ways: they overpay for AI tools when simple automation would solve the problem, and they underspend on genuine AI capability when a more sophisticated solution would deliver far greater returns.",
      },
      {
        type: "heading",
        text: "The actual difference",
      },
      {
        type: "paragraph",
        text: "Automation is rule-based. It executes a predefined sequence: 'when X happens, do Y.' There is no learning, no judgment, no contextual interpretation. A form submission that creates a CRM record and sends a confirmation email is automation. Zapier describes this precisely: 'Automation is simply setting something up to run automatically. The heart of any workflow automation boils down to a simple command: when this happens, do that.'",
      },
      {
        type: "paragraph",
        text: "AI is inference-based. It interprets data, recognises patterns, and makes decisions that cannot be encoded as simple rules. An email that reads an incoming message and decides whether it is a support request, a sales lead, or a billing query — and routes it accordingly — involves genuine AI judgment. A workflow that routes all emails from a specific sender to a specific folder is automation.",
      },
      {
        type: "callout",
        label: "The test",
        text:  "Can you express the logic as a clear if-then rule? Then it is automation. Does the task require understanding meaning, context, or nuance? Then it genuinely needs AI.",
      },
      {
        type: "heading",
        text: "Where automation is the right tool",
      },
      {
        type: "list",
        items: [
          "Form submissions that create records in your CRM and trigger a confirmation email",
          "New invoice paid → update the client's status in your project management tool → send a receipt",
          "Appointment booked → create a calendar event → send a reminder 24 hours before",
          "New social media mention → add to a monitoring spreadsheet → notify the relevant team member",
          "Weekly report trigger → pull data from defined sources → format and send",
        ],
      },
      {
        type: "paragraph",
        text: "All of these tasks can be handled by Zapier, Make, or similar automation tools. They do not require AI. They require a clear definition of the trigger, the action, and the data mapping between them.",
      },
      {
        type: "heading",
        text: "Where AI adds genuine value",
      },
      {
        type: "list",
        items: [
          "Classifying inbound emails by type, urgency, or sentiment before routing",
          "Extracting structured information from unstructured documents — contracts, medical records, intake forms",
          "Generating first-draft responses to client queries based on your knowledge base",
          "Scoring leads based on behaviour patterns across multiple touchpoints",
          "Summarising long documents or call transcripts into actionable notes",
        ],
      },
      {
        type: "paragraph",
        text: "These tasks require contextual interpretation that rules cannot encode. A rule can check whether an email contains the word 'urgent' — but it cannot understand that a politely worded email about a missed invoice is more urgent than one with the word 'urgent' in the subject line.",
      },
      {
        type: "heading",
        text: "The practical implication for your budget",
      },
      {
        type: "paragraph",
        text: "Most SME automation requirements are 80% rules-based automation and 20% genuine AI. The tools required for rules-based automation — Make.com, Zapier, n8n — are significantly cheaper than AI API costs and require less configuration to maintain. Zapier's Starter plan runs around $20/month. A well-designed Make.com workflow for a small business typically costs under $10/month to run.",
      },
      {
        type: "paragraph",
        text: "The correct sequence is: automate everything that can be expressed as a rule first, then apply AI selectively to the tasks that require judgment. Applying AI to tasks that do not need it wastes budget and creates fragility — AI systems require more maintenance and monitoring than deterministic automation.",
      },
      {
        type: "callout",
        label: "Our recommendation",
        text:  "In every diagnostic, we categorise each identified task as rules-based automation or genuine AI requirement. The architecture design always uses the minimum tool complexity required. Simple tasks get simple tools. Complex judgment tasks get AI. You pay for what the job actually requires.",
      },
      {
        type: "callout",
        label: "Sources",
        text:  "Zapier (2025). Automation vs. AI: What's the difference? zapier.com/blog/automation-vs-ai | G2 (2026). Make vs. Zapier comparison. learn.g2.com/make-vs-zapier",
      },
    ],
  },

  // ─── ARTICLE 06 ──────────────────────────────────────────────────────────────
  {
    slug:     "the-handover-problem",
    title:    "The handover problem: Why AI systems fail after the consultant leaves",
    category: "Implementation",
    date:     "December 2025",
    readTime: "7 min read",
    image:    "/images/insights/article-06.png",
    excerpt:  "The most common failure mode in AI integration is dependency. If your team cannot run the system without the person who built it, the system is a liability. We share our best practices for documentation and training.",
    content:  [
      {
        type: "paragraph",
        text: "The integration is live. The workflow is running. The consultant has been paid and moved on. Six weeks later, something breaks — a form stops triggering correctly, a data field gets renamed in one of the connected tools, the logic that was working yesterday is not working today. Nobody on the team knows how to fix it. The consultant is gone. The system is now a liability.",
      },
      {
        type: "paragraph",
        text: "This is the handover problem. And it is the most common reason AI and automation investments fail in SMEs — not in implementation, but in the weeks and months after delivery.",
      },
      {
        type: "heading",
        text: "Why it happens",
      },
      {
        type: "paragraph",
        text: "Most implementation consultants optimise for delivery, not for operability. The goal is to get the workflow built and live. Documentation is treated as an afterthought. Training is a single session the week before handover. The team watches a screen share, nods, and then the consultant disappears.",
      },
      {
        type: "paragraph",
        text: "The result is a system that works when nothing changes. But tools change. APIs update. Business processes evolve. Staff turn over. Every one of these events requires someone who understands the system well enough to adapt it. If that person is not on your team, you are dependent on external support for every change — which means ongoing cost and delay.",
      },
      {
        type: "callout",
        label: "The dependency test",
        text:  "If a key staff member left tomorrow, could your team continue running your automated workflows? If the answer is no — or 'I think so, maybe' — you have a dependency problem.",
      },
      {
        type: "heading",
        text: "The five components of a real handover",
      },
      {
        type: "subheading",
        text: "1. Workflow documentation in plain language",
      },
      {
        type: "paragraph",
        text: "Every workflow needs a written description that a non-technical team member can read and understand. Not API documentation. Not a technical architecture diagram. A description of what the workflow does, what triggers it, what data it uses, and what the expected outcome is. If this document does not exist, the system is not properly handed over.",
      },
      {
        type: "subheading",
        text: "2. A named internal workflow owner",
      },
      {
        type: "paragraph",
        text: "Every workflow needs a person on your team whose job it is to monitor it, notice when it breaks, and know who to contact when it needs to change. This person does not need to be technical. They need to understand what the workflow is supposed to do and be able to verify that it is doing it.",
      },
      {
        type: "subheading",
        text: "3. A decision register for every non-obvious choice",
      },
      {
        type: "paragraph",
        text: "Every integration involves choices — which field maps to which, what logic determines a routing decision, what threshold triggers an alert. These choices should be documented with the reasoning behind them. When something breaks six months later, the person fixing it needs to understand why the original architecture was built the way it was.",
      },
      {
        type: "subheading",
        text: "4. Monitored error logging",
      },
      {
        type: "paragraph",
        text: "Automation tools like Zapier and Make have error logging built in. Someone on your team needs to check these logs regularly — daily or weekly depending on the volume and criticality of the workflow. A workflow that silently fails for two weeks because nobody checked the error log is worse than one that does not exist at all.",
      },
      {
        type: "subheading",
        text: "5. Hands-on training during the build, not after",
      },
      {
        type: "paragraph",
        text: "The most effective training happens during the build phase, not in a handover session after delivery. When team members see the workflow being built — understand why each step exists and how each connection was made — they retain the knowledge far better than from a post-delivery demonstration.",
      },
      {
        type: "heading",
        text: "What we do differently",
      },
      {
        type: "paragraph",
        text: "Every Maru engagement includes 30 days of free post-launch support. During Phase 3, team members are involved in the build — not as passive observers, but as active participants who understand the system they will be running. Every delivered workflow has plain-language documentation and a designated internal owner before we close the engagement.",
      },
      {
        type: "paragraph",
        text: "The goal is not a system that works when we are there. It is a system your team can run, adapt, and troubleshoot independently. That is the only outcome worth delivering.",
      },
    ],
  },

  // ─── ARTICLE 07 ──────────────────────────────────────────────────────────────
  {
    slug:     "medico-legal-automation",
    title:    "Three automations every medico-legal practice should have",
    category: "Sector",
    date:     "December 2025",
    readTime: "6 min read",
    image:    "/images/insights/article-07.png",
    excerpt:  "No-show rates, insurer follow-up delays, and appointment scheduling are the primary capacity killers in medico-legal practices. We map the three workflows that fix these gaps.",
    content:  [
      {
        type: "paragraph",
        text: "Medico-legal practices operate at the intersection of two systems that were not designed to talk to each other: the healthcare system and the legal system. Each has its own documentation requirements, timelines, and communication norms. The administrative load that results from bridging these two systems is significant — and almost entirely manual in most practices.",
      },
      {
        type: "paragraph",
        text: "After working with medico-legal practices, we have identified three workflow problems that appear in almost every one. Each is addressable with automation that does not require replacing existing systems — just connecting them.",
      },
      {
        type: "heading",
        text: "Automation 1: Appointment scheduling and confirmation",
      },
      {
        type: "paragraph",
        text: "The typical appointment booking process in a medico-legal practice involves multiple phone calls or email exchanges between the practice, the attorney's office, and sometimes the claimant directly. An initial request comes in. Someone checks availability. They reply. The attorney confirms. Someone creates a calendar entry. A reminder is sent manually the day before.",
      },
      {
        type: "paragraph",
        text: "This process, which takes between 20 and 45 minutes per appointment when tracked, can be reduced to under two minutes with an automated booking workflow. An online scheduling link allows the attorney's office to book directly into the practice's calendar, with confirmation sent automatically to all parties and reminders triggered 24 and 48 hours before the appointment.",
      },
      {
        type: "callout",
        label: "Typical saving",
        text:  "A practice handling 40 appointments per month reclaims 8–12 hours of admin time. At a typical practice manager salary, this represents R2,500–R4,000 per month in recovered capacity.",
      },
      {
        type: "heading",
        text: "Automation 2: Insurer and third-party follow-up sequences",
      },
      {
        type: "paragraph",
        text: "Outstanding reports and payment follow-ups are the primary cause of cash flow delays in medico-legal practices. A report gets submitted. Fourteen days pass with no response. Someone has to remember to follow up. They send an email. Another week passes. The manual follow-up burden is constant and — when it slips — costly.",
      },
      {
        type: "paragraph",
        text: "An automated follow-up sequence removes the need for anyone to remember. Once a report is marked as submitted in the practice management system, a sequence triggers: an acknowledgement request at day three, a status follow-up at day seven, an escalation at day fourteen. Each touchpoint is logged. If a response comes in at any stage, the sequence pauses automatically.",
      },
      {
        type: "subheading",
        text: "POPIA note",
      },
      {
        type: "paragraph",
        text: "Any automated communication sequence involving case data or claimant information must be designed with POPIA in mind. The consent basis for communications, the data stored in the automation platform, and the processing agreements with tool vendors must all be addressed before the workflow is built. This is not an afterthought — it is architecture.",
      },
      {
        type: "heading",
        text: "Automation 3: Intake form processing and file creation",
      },
      {
        type: "paragraph",
        text: "The intake process for a new medico-legal matter typically involves receiving information from an attorney's office — claimant details, case reference numbers, the nature of the claim, required examination type. This information arrives by email, by fax (still, in some practices), or on a PDF form. Someone manually extracts the relevant fields and creates the matter record in the practice management system.",
      },
      {
        type: "paragraph",
        text: "An integrated intake workflow replaces this process. A structured intake form, completed by the attorney's office, automatically creates the matter record in the practice system, generates a client file folder, sends a confirmation of receipt, and notifies the relevant practitioner. Data enters once and flows from there.",
      },
      {
        type: "callout",
        label: "The downstream benefit",
        text:  "Beyond the direct time saving, consistent structured intake data means every matter record is complete. No missing case reference numbers. No incorrectly spelled claimant names. No records that need to be corrected at the reporting stage.",
      },
      {
        type: "heading",
        text: "Where to start",
      },
      {
        type: "paragraph",
        text: "We recommend starting with the workflow that costs the most in time. For most medico-legal practices, that is either appointment scheduling (high volume, frequent friction) or report follow-up (lower volume, but each delay has direct cash flow impact). A diagnostic will quantify both — and tell you which to fix first.",
      },
    ],
  },

  // ─── ARTICLE 08 ──────────────────────────────────────────────────────────────
  {
    slug:     "ai-readiness-self-test",
    title:    "A self-test for AI readiness: Five questions before you spend anything",
    category: "Diagnostic",
    date:     "November 2025",
    readTime: "5 min read",
    image:    "/images/insights/article-08.png",
    excerpt:  "Before any AI investment, there are five questions you need to answer about your current data and tools. If you cannot answer these, you are not ready to automate.",
    content:  [
      {
        type: "paragraph",
        text: "The conversation around AI readiness tends to be vendor-driven — a checklist designed to make you feel like you are almost ready, and that buying their tool is the final step. This is not that. These five questions will tell you whether an AI investment will deliver returns — or whether it will add to the pile of tools that did not work.",
      },
      {
        type: "heading",
        text: "Question 1: Can you describe your current process in five steps or fewer?",
      },
      {
        type: "paragraph",
        text: "Automation requires a defined process. If you cannot describe your current workflow in five steps or fewer — with a clear trigger, a sequence of actions, and a defined outcome — then automating it will encode the confusion into the system. Vague processes produce vague automation.",
      },
      {
        type: "paragraph",
        text: "Before you automate anything, you need to be able to describe exactly what happens now. Not what should happen. What actually happens, step by step, who does each step, and what tool they use to do it.",
      },
      {
        type: "heading",
        text: "Question 2: Do you know how long your current process takes?",
      },
      {
        type: "paragraph",
        text: "Without a baseline, you cannot measure improvement. If you do not know that your current lead entry process takes 15 minutes per lead, you cannot calculate the value of automating it. You cannot determine whether a R18,000 integration pays for itself in six months or three years.",
      },
      {
        type: "callout",
        label: "How to find out",
        text:  "Ask the person who does the task to track their time for one week. Use a simple timer — not a time-tracking tool. Just a note of start and end time for each instance. One week of data is enough to establish a reliable baseline.",
      },
      {
        type: "heading",
        text: "Question 3: Is your data clean and consistent?",
      },
      {
        type: "paragraph",
        text: "AI and automation systems work with data. If your data is inconsistent — names entered in different formats, phone numbers with and without country codes, CRM records with missing fields — the automation will break or produce bad outputs. Garbage in, garbage out is not a cliché. It is the single most common cause of automation failure in the first month.",
      },
      {
        type: "paragraph",
        text: "This does not mean your data needs to be perfect before you start. It means you need to know how clean it is and factor data remediation into the implementation plan.",
      },
      {
        type: "heading",
        text: "Question 4: Do you have decision-making authority?",
      },
      {
        type: "paragraph",
        text: "Workflow integration requires real decisions — which tools to connect, what data to move, how to handle edge cases, whether to change how certain tasks are done. If the person leading the implementation does not have the authority to make these decisions, the project stalls every time a choice needs to be made.",
      },
      {
        type: "paragraph",
        text: "In practice, this means the person commissioning the work needs to be the person who can say 'yes, change how we do this.' If that requires committee sign-off, the implementation will be slow, expensive, and frustrating for everyone involved.",
      },
      {
        type: "heading",
        text: "Question 5: Is your team willing to change how they work?",
      },
      {
        type: "paragraph",
        text: "This is the question that matters most — and the one most businesses gloss over. Automation does not just change the tools. It changes the workflow. Processes that were manual become automated. Tasks that lived in someone's head need to be documented and systematised. Ways of working that have been in place for years get replaced.",
      },
      {
        type: "paragraph",
        text: "If key team members are resistant to this change — if there is a tacit agreement that the new system will be humoured but the old way will continue in parallel — the integration will fail regardless of how well it was built. Research on technology adoption consistently finds that user acceptance is the primary determinant of whether a new system delivers its intended benefits.",
      },
      {
        type: "callout",
        label: "The honest assessment",
        text:  "If you can answer yes to four of these five questions, you are ready to start a diagnostic. If you cannot answer yes to at least three, the diagnostic will surface why — and what to address before investing in a build.",
      },
      {
        type: "heading",
        text: "What to do with this",
      },
      {
        type: "paragraph",
        text: "Use these questions as a filter before any AI investment conversation. Not to disqualify yourself, but to understand where the preparation gaps are. A good implementation partner should be asking you all five of these questions before proposing anything. If they are not, they are selling you their process, not solving your problem.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticleSlugs(): string[] {
  return articles.map((a) => a.slug);
}
