import type { ContentEntry } from '../types'

/** Worksheet-style guide. Practical governance steps follow Bowmans Part 5, in our own words. */
export const readinessGuide: ContentEntry = {
  section: 'resources',
  slug: 'ai-readiness-guide-south-african-business',
  title: 'AI Strategy & Readiness Guide: are you ready, and where to start',
  summary:
    'A self-assessment across six readiness areas, with a simple way to score yourself and choose a first move.',
  seoTitle: 'AI Readiness Guide for South African Businesses: Self-Assessment Worksheet',
  seoDescription:
    'Score your business across six areas of AI readiness: problem clarity, process stability, data, people, governance and capacity. Includes a worksheet and how to choose a first move.',
  pillar: 'ai-strategy-readiness',
  category: 'AI Strategy & Readiness',
  resourceType: 'Worksheet',
  access: 'open',
  status: 'draft',
  publishedAt: '2026-10-30',
  readTime: '8 min read',
  author: 'Maru Online',
  legalNote: true,
  related: ['south-african-businesses-using-ai-gap-is-structure', 'ai-integration-guide-connect-ai-existing-systems', 'ai-and-popia'],
  inShort: [
    'Readiness is not about technology. It is six practical questions about your business.',
    'Score each area from 0 to 3. A low score tells you what to fix first, not that you should wait.',
    'Choose a first move that fits your lowest score and your cash flow.',
  ],
  body: [
    {
      t: 'p',
      text: 'Being ready for AI does not mean having a data team or a large budget. It means knowing what you want to change, having a process stable enough to change, and being clear on who is responsible. This worksheet helps you check six areas in about twenty minutes.',
    },
    {
      t: 'callout',
      title: 'How to use it',
      text: 'Answer each question yes or no, honestly. Give yourself one point for each yes, so each area scores from 0 to 3. Do it with the person who runs the process day to day, not alone.',
    },
    { t: 'h2', text: 'Area 1: Problem clarity' },
    { t: 'checklist', title: 'Score one point for each yes', items: [
      'We can name one specific task or process that costs us time every week.',
      'We know roughly how many hours a week it takes today.',
      'We can describe what “better” looks like without mentioning a tool.',
    ] },
    { t: 'h2', text: 'Area 2: Process stability' },
    { t: 'checklist', title: 'Score one point for each yes', items: [
      'The steps of that process are written down, or could be in an hour.',
      'The people who do it follow the same steps.',
      'It does not change shape every month.',
    ] },
    { t: 'h2', text: 'Area 3: Data' },
    { t: 'checklist', title: 'Score one point for each yes', items: [
      'We know which systems hold the information the process uses.',
      'That information is reasonably complete and current.',
      'We know whether it includes personal information, and we have a lawful reason to use it this way.',
    ] },
    { t: 'h2', text: 'Area 4: People' },
    { t: 'checklist', title: 'Score one point for each yes', items: [
      'One person would own this change and has time for it.',
      'The people who do the work have been told what is being considered.',
      'Staff who will use AI tools know what the tools can and cannot do.',
    ] },
    { t: 'h2', text: 'Area 5: Governance' },
    { t: 'checklist', title: 'Score one point for each yes', items: [
      'We have a short written rule on what may be entered into AI tools.',
      'We have checked what each AI supplier does with our data, and prefer tools with a contract over free ones.',
      'Someone checks AI output before it reaches a client, and can override it.',
    ] },
    { t: 'h2', text: 'Area 6: Capacity' },
    { t: 'checklist', title: 'Score one point for each yes', items: [
      'We can set aside a small, fixed amount of time and money for a pilot.',
      'Losing that amount would not hurt our cash flow.',
      'Someone can look after the result once it is running.',
    ] },
    { t: 'h2', text: 'Reading your scores' },
    {
      t: 'table',
      head: ['Score in an area', 'What it means', 'What to do'],
      rows: [
        ['0 or 1', 'Fix this first', 'Work on this area before building anything. It is usually quick and cheap.'],
        ['2', 'Ready with conditions', 'Proceed, and name the missing point as a risk to manage.'],
        ['3', 'Ready', 'Nothing to hold you back in this area.'],
      ],
    },
    { t: 'h2', text: 'Choosing a first move' },
    {
      t: 'ul',
      items: [
        '**Low on problem clarity or process stability:** spend a week writing down one process and measuring it. No tool yet.',
        '**Low on data or governance:** write the rule on what may be entered into AI tools, check your suppliers’ terms and map where personal information sits. This is also what POPIA expects of you.',
        '**Low on people:** brief the team, name an owner and agree who checks the output.',
        '**Low on capacity:** pick the smallest useful pilot you can run, and put a date on its review.',
        '**Mostly 2s and 3s:** choose the workflow with the clearest weekly time cost and begin.',
      ],
    },
    { t: 'h2', text: 'What this worksheet is not' },
    {
      t: 'p',
      text: 'It is not a technical audit, and it is not legal advice. It will not tell you which product to buy. It is a way to find the next sensible step and to avoid starting with the wrong one.',
    },
  ],
  sources: [
    { title: 'South Africa: AI in the workplace, 5 of 6 Practical guidance on what employers need to do', publisher: 'Bowmans', date: '16 September 2026' },
    { title: 'State of South African Small Business 2026', publisher: 'Xero, with KLA', date: '16 April 2026', url: 'https://www.xero.com/ae/media-releases/state-of-south-african-small-business-2026/' },
  ],
}
