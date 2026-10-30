import type { ContentEntry } from '../types'

/** Guide. No money claims: benefit is framed as time and admin, per the positioning decisions. */
export const automationGuide: ContentEntry = {
  section: 'resources',
  slug: 'automation-workflows-guide-reduce-manual-work',
  title: 'Automation & Workflows Guide: from repeated admin to a reliable process',
  summary:
    'How to choose which process to automate first, design it with exceptions and a human check, and review it a month later.',
  seoTitle: 'Business Process Automation Guide: Reduce Manual Work in Your Workflows',
  seoDescription:
    'How to choose which process to automate first, document it, design exceptions and human checks, and measure the time saved. A practical guide for South African businesses.',
  pillar: 'automation-operational-efficiency',
  category: 'Automation & Workflows',
  resourceType: 'Guide',
  access: 'open',
  status: 'draft',
  publishedAt: '2026-10-30',
  readTime: '9 min read',
  author: 'Maru Online',
  image: '/images/insights-resources/workflow-automation.jpg',
  imageAlt: 'A woman pointing at a large screen showing a workflow automation diagram of connected steps.',
  related: ['ai-integration-guide-connect-ai-existing-systems', 'south-african-businesses-using-ai-gap-is-structure'],
  inShort: [
    'Choose a task that repeats often, takes real time and follows rules you can write down.',
    'Document and settle the process first. Do not automate a mess.',
    'Design the exceptions and the human check before the happy path, then measure the time saved.',
  ],
  body: [
    {
      t: 'p',
      text: 'Most businesses have a handful of tasks that eat hours every week without anyone deciding they should: chasing quotes, retyping invoices, copying details between systems, building the same report. Automating them can give those hours back. Done badly, it just makes mistakes faster.',
    },
    { t: 'h2', text: '1. Choose what is worth automating' },
    {
      t: 'p',
      text: 'Score each candidate from 1 to 3 on the five questions below. Start with the highest totals.',
    },
    {
      t: 'table',
      head: ['Question', '1 (low)', '3 (high)'],
      rows: [
        ['How often does it happen?', 'Monthly', 'Daily'],
        ['How long does each run take?', 'Minutes', 'An hour or more'],
        ['How clear are the rules?', 'Depends on who does it', 'The same steps every time'],
        ['How consistent are the inputs?', 'Messy and varied', 'Same form, same fields'],
        ['What happens if it goes wrong?', 'A serious problem for a client', 'Easy to spot and fix'],
      ],
    },
    {
      t: 'p',
      text: 'High frequency, clear rules and low-risk errors make the best first candidates. A task that scores high on risk is not off limits, but it needs a person checking each result.',
    },
    { t: 'h2', text: '2. Document the process as it is' },
    {
      t: 'p',
      text: 'Write the current steps in order, with who does each, which system it happens in and what a good result looks like. If two people do it two different ways, settle on one way first. Automation fixes a process in place, and a process nobody agrees on will be fixed in the wrong shape.',
    },
    { t: 'h2', text: '3. Design the flow: trigger, steps, checks, result' },
    {
      t: 'ul',
      items: [
        '**Trigger:** what starts it. A new email, a form, a status change, a date.',
        '**Steps:** what happens, in order, and which system does each.',
        '**Checks:** where a person or a rule confirms the result before it moves on.',
        '**Result:** what “done” looks like and where the output lands.',
      ],
    },
    { t: 'h2', text: '4. Rules first, AI where the input is messy' },
    {
      t: 'p',
      text: 'If a rule can do the job, use the rule. “If the invoice total is over this amount, send it to the owner” needs no AI. AI earns its place where the input is untidy: emails written in many ways, scanned documents, notes and voice messages. There it can read, sort or draft, and the rules take over from there.',
    },
    { t: 'h2', text: '5. Decide where a person stays involved' },
    {
      t: 'p',
      text: 'Not every step needs approval, and not every step should go without it. Anything that spends money, changes a client’s record, reaches a client directly or affects a person’s job or access to a service should have a person confirming it. Name the role. A check that belongs to “the team” belongs to nobody.',
    },
    { t: 'h2', text: '6. Plan for the day it fails' },
    {
      t: 'ul',
      items: [
        '**Exceptions:** items the process cannot handle go to a named person with the context attached.',
        '**Connection loss:** a failed connection should queue the item and try again, and tell a person if it keeps failing. Power cuts and unreliable connections are a fact of South African offices, so do not assume everything is always on.',
        '**A record:** keep a simple log of what ran and what it did, so you can find the cause when something looks wrong.',
        '**An owner:** one person is responsible for the process and notices when it stops.',
      ],
    },
    { t: 'h2', text: '7. Measure, then review' },
    {
      t: 'p',
      text: 'Record the hours a week the task took before you changed it. Run the new process and record the hours again, along with the number of errors and exceptions. About a month later, review what works and adjust. Count time and admin saved. Money claims are harder to defend, because cost structures differ from one business to another.',
    },
    { t: 'h2', text: 'Four starting points' },
    {
      t: 'table',
      head: ['Process', 'Trigger', 'Where AI can help', 'Where a person checks'],
      rows: [
        ['Quote follow-up', 'A quote sent with no reply after a set period', 'Draft a reminder in your usual tone', 'Before anything is sent to the client'],
        ['Supplier invoice capture', 'An invoice arrives by email', 'Read supplier, date and amounts from the document', 'Totals checked before payment is approved'],
        ['Client onboarding', 'A signed proposal or a new client record', 'Draft the welcome message and checklist', 'Before access or data is set up'],
        ['Weekly report', 'A set day and time', 'Summarise the figures in plain language', 'Figures checked before it is shared'],
      ],
    },
    {
      t: 'checklist',
      title: 'Before you switch it on',
      items: [
        'The process is written down, and everyone who does it agrees on it.',
        'It scored well on frequency, clear rules and low-risk errors.',
        'Rules handle what rules can; AI handles only the untidy input.',
        'A named person confirms every step that spends money, reaches a client or affects a person.',
        'Exceptions and failed connections go to a person with context.',
        'There is a log, and one person owns the process.',
        'You know the weekly hours it took before.',
        'A review is in the diary for about a month after launch.',
      ],
    },
  ],
  sources: [
    { title: 'South Africa: AI in the workplace, 5 of 6 Practical guidance on what employers need to do', publisher: 'Bowmans', date: '16 September 2026' },
  ],
}
