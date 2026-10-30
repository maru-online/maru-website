import type { ContentEntry } from '../types'

/** Guide. General practice, no figures. POPIA references to be verified by the owner. */
export const integrationGuide: ContentEntry = {
  section: 'resources',
  slug: 'ai-integration-guide-connect-ai-existing-systems',
  title: 'AI Integration Guide: connecting AI to the systems you already use',
  summary:
    'How to choose a first AI workflow, map the systems and data it touches, and connect it so a person stays in control.',
  seoTitle: 'AI Integration Guide for South African Businesses: Connect AI to Your Existing Systems',
  seoDescription:
    'A practical guide to choosing a first AI workflow, mapping the systems and data involved, choosing how to connect them, and building in a human check and POPIA from the start.',
  pillar: 'ai-integration-systems',
  category: 'AI Integration Guides',
  resourceType: 'Guide',
  access: 'open',
  status: 'draft',
  publishedAt: '2026-10-30',
  readTime: '9 min read',
  author: 'Maru Online',
  image: '/images/insights-resources/ai-human-oversight.jpg',
  imageAlt: 'A man working on a laptop beside a translucent display of a wireframe head and process diagrams.',
  legalNote: true,
  related: ['automation-workflows-guide-reduce-manual-work', 'ai-readiness-guide-south-african-business', 'popia-section-71-automated-decisions-ai-business'],
  inShort: [
    'Start from a workflow that repeats, not from a tool.',
    'Map where the work happens, which systems hold the data and whether personal information is involved.',
    'Choose the simplest connection that does the job, keep your logic and data under your control, and build in a human check and an exception path.',
  ],
  body: [
    {
      t: 'p',
      text: 'Most useful AI in a business is not a new product. It is an existing process with AI built into one or two steps, connected to the systems the business already runs on. This guide walks through how to find that process, connect it and keep control of it.',
    },
    { t: 'h2', text: '1. Start with the workflow, not the AI' },
    {
      t: 'p',
      text: 'Choose one process that repeats, takes real time and has a clear start and end. Quote follow-up, supplier invoice capture, client onboarding and monthly reporting are typical. Write the steps down in order, as they happen today and not as they should happen. Mark where time goes and where information is copied from one place to another. Those copy points are usually where integration pays off.',
    },
    { t: 'h2', text: '2. Map the systems and the data' },
    {
      t: 'p',
      text: 'For each step, note which system holds the information: email, WhatsApp, a spreadsheet, your accounting package, a CRM, a shared drive. Then note three things about it.',
    },
    {
      t: 'table',
      head: ['Question', 'Why it matters'],
      rows: [
        ['What data is it?', 'Personal information needs more care than a price list.'],
        ['Who can see and change it?', 'The integration will act with someone’s access. Decide whose.'],
        ['Can the system connect to others?', 'Many accounting and CRM tools offer connections. Some do not, which limits your options.'],
      ],
    },
    { t: 'h2', text: '3. Decide what the AI is for' },
    {
      t: 'p',
      text: 'AI does four jobs well inside a workflow.',
    },
    {
      t: 'ul',
      items: [
        '**Read:** pull fields out of emails, PDFs and forms.',
        '**Sort:** label and route incoming items.',
        '**Draft:** write a first version of a reply, a summary or a report.',
        '**Flag:** point out what looks unusual, for a person to look at.',
      ],
    },
    {
      t: 'p',
      text: 'Keep it away from decisions about people that it makes alone (see section 71 of POPIA), from anything hard to undo such as payments, and from legal judgement. Use it to prepare work for a person, not to replace the person.',
    },
    { t: 'h2', text: '4. Choose how to connect' },
    {
      t: 'p',
      text: 'There are four common ways, from simplest to most involved. Take the simplest that does the job.',
    },
    {
      t: 'table',
      head: ['Approach', 'Good for', 'Watch for'],
      rows: [
        ['Manual hand-off (copy and paste)', 'A short trial of an idea', 'Never paste personal information into a public tool'],
        ['Features inside tools you already pay for', 'Simple drafting and summaries', 'Limited control over where data goes'],
        ['A connector or automation platform', 'Linking everyday apps without custom code', 'Another supplier holding your data and logic'],
        ['A direct integration built for you', 'Core processes, sensitive data, anything you want to own', 'Needs an owner to maintain it'],
      ],
    },
    {
      t: 'callout',
      title: 'A control test',
      text: 'Ask where the logic of the process lives, and who holds the data. If both sit inside one supplier’s hosted tool, moving away later will be costly. Prefer arrangements where your business keeps its own copy of the data and can see how the process works.',
    },
    { t: 'h2', text: '5. Build in the human check and the exception path' },
    {
      t: 'p',
      text: 'Every automated step needs an answer to three questions. What happens when the AI is unsure? What happens when the input is unusual? What happens when a connection fails? The answer should be that the item goes to a named person, with enough information to deal with it. Keep a simple record of what the process did, so you can find out what went wrong.',
    },
    { t: 'h2', text: '6. Build POPIA in from the start' },
    {
      t: 'p',
      text: 'This is general information, not legal advice. For any workflow that touches personal information, write a one-page note that answers these questions.',
    },
    {
      t: 'ul',
      items: [
        'What personal information flows through the process, and why do we need it?',
        'Which suppliers process it for us, and is there a written contract with each?',
        'Where is it processed? If outside South Africa, what protection applies?',
        'Who has access, and how is it secured?',
        'How long do we keep it, and what deletes it?',
        'Have we told the people concerned that AI is involved?',
      ],
    },
    { t: 'h2', text: '7. Pilot small, then review' },
    {
      t: 'p',
      text: 'Run the workflow on a small share of real work for a few weeks. Record the hours a week the task took before, and after. Record errors and exceptions. About a month in, review what works, fix what does not and decide whether to widen it. A pilot sized to what you can afford to get wrong also suits a business watching its cash flow.',
    },
    { t: 'h2', text: 'Common ways integrations go wrong' },
    {
      t: 'ul',
      items: [
        'Starting with a tool and looking for a use for it.',
        'Automating a process that two people do in two different ways.',
        'No named owner, so nobody notices when it stops working.',
        'No exception path, so odd cases disappear.',
        'Personal information pasted into accounts nobody controls.',
        'Logic and data held only inside one supplier’s product.',
      ],
    },
    {
      t: 'checklist',
      title: 'Before you go live',
      items: [
        'One workflow chosen, with its steps written down as they happen today.',
        'Systems and data mapped, with personal information marked.',
        'The AI’s job named: read, sort, draft or flag.',
        'The simplest workable connection chosen.',
        'A named person owns the process and checks the output.',
        'Exceptions go to a person, with context.',
        'A one-page POPIA note written, and supplier contracts in place.',
        'Before-and-after measure of hours a week agreed.',
        'A review date set for about a month after launch.',
      ],
    },
  ],
  sources: [
    { title: 'South Africa: AI in the workplace, 5 of 6 Practical guidance on what employers need to do', publisher: 'Bowmans', date: '16 September 2026' },
    { title: 'Protection of Personal Information Act 4 of 2013', publisher: 'Republic of South Africa' },
  ],
}
