import type { ContentEntry } from '../types'

/**
 * Opinion. Evidence: Xero 2026 State of South African Small Business (16 Apr
 * 2026, 427 businesses, KLA panel); World Wide Worx / Dell / Intel GenAI Roadmap
 * 2025 (sponsored, 100+ midsized and large enterprises); ITWeb / Incasu 2025
 * (144 responses). Perplexity topline research reviewed 30 Oct; SME range
 * "56-60% / 30-35%" traced to an unsourced vendor blog and NOT used; market-size
 * figures not used (definitions differ); shadow-AI figure left out on purpose.
 */
export const smeLandscape: ContentEntry = {
  section: 'insights',
  slug: 'south-african-businesses-using-ai-gap-is-structure',
  title: 'South African businesses are using AI. The gap is in how it fits the work.',
  summary:
    'More than half of small businesses in one 2026 survey use AI weekly, and larger firms report strategy and governance trailing adoption. We think the common gap is workflow, not tools.',
  seoTitle: 'AI Adoption in South African Business: Where the Real Gap Is',
  seoDescription:
    'What recent South African surveys say about AI adoption, where the evidence is weak, and why we think the gap is about workflow and governance rather than access to tools.',
  pillar: 'ai-strategy-readiness',
  category: 'South African AI Landscape',
  format: 'Opinion',
  status: 'draft',
  publishedAt: '2026-10-30',
  readTime: '6 min read',
  author: 'Maru Online',
  image: '/images/insights-resources/team-planning-board.jpg',
  imageAlt: 'A small team gathered around a whiteboard planning board, one person explaining while the others listen.',
  related: ['south-africa-national-ai-policy-reset-what-businesses-should-do', 'ai-readiness-guide-south-african-business'],
  inShort: [
    'Xero’s 2026 survey of 427 small businesses found 52% use AI tools daily or weekly, and 56% want more support understanding how AI fits their operations.',
    'Surveys of midsized and large firms point the same way: use is ahead of structure. One put formal GenAI strategy at 14% and governance guardrails at 13%.',
    'Our view: the gap is workflow and governance, not access to tools. Start with one repeated task, measure the time it saves and put a person at the end of it.',
  ],
  body: [
    {
      t: 'p',
      text: 'South African business owners no longer need persuading to try AI. The harder question, and the one we are asked most, is where it belongs in their business. This is our reading of the recent evidence, and what we would do about it.',
    },
    { t: 'h2', text: 'What the surveys say' },
    {
      t: 'p',
      text: 'Xero’s 2026 State of South African Small Business report, released in April, surveyed 427 small businesses with up to 200 employees. It found that 52% use AI tools daily or weekly and that 85% are prioritising digital adoption. It also found that 56% want more support understanding how AI fits their specific operations, and 34% feel overwhelmed by the amount of information about it.',
    },
    {
      t: 'p',
      text: 'Surveys of larger firms show a similar pattern. The 2025 South African Generative AI Roadmap, from World Wide Worx with Dell Technologies and Intel, covered more than 100 midsized and large enterprises. It found generative AI use among large enterprises up from 45% to 67%, yet only 14% of organisations had a formal company-wide strategy and 13% had guardrails for safety, privacy and bias. Some 84% said oversight matters. An ITWeb and Incasu survey of 144 respondents found 69% name automating repetitive tasks as a primary goal, and 13% say AI is integrated into core processes.',
    },
    {
      t: 'callout',
      title: 'How much weight to put on these numbers',
      text: 'Treat them as directional. Xero’s panel was online, which favours businesses comfortable with digital tools. The Dell and Intel research was sponsored by those companies and covers midsized and large firms. The ITWeb sample is small. They were also asked different questions, so the percentages do not add up to one picture. The pattern across them is more reliable than any single figure.',
    },
    { t: 'h2', text: 'Our view: access is not the problem' },
    {
      t: 'p',
      text: 'Anyone can open an AI tool in a browser and use it the same afternoon. When use is high and a third of owners feel overwhelmed, that is what you would expect if adoption happens person by person, with each staff member choosing a tool, rather than process by process. A personal productivity gain stays with that person. A business changes when a process changes.',
    },
    {
      t: 'p',
      text: 'The same shape shows up in the larger firms: widespread use, little strategy, few guardrails, and a small share of AI built into core processes. The gap is the structure around the tool.',
    },
    { t: 'h2', text: 'What we would do differently' },
    {
      t: 'ol',
      items: [
        '**Pick a workflow, not a tool.** Quote follow-up, supplier invoice capture, client onboarding, a monthly report. Choose something that repeats and that someone in your business dislikes doing.',
        '**Measure time, not enthusiasm.** Count the hours a week the task takes now. Count again a month after the change.',
        '**Decide what data may enter the tool before anyone starts, and put a person at the end.** Someone checks the output before it reaches a client, and that person has the authority to change it.',
      ],
    },
    { t: 'h2', text: 'South African conditions worth designing for' },
    {
      t: 'ul',
      items: [
        '**Cash flow.** In the Xero survey, 62% of small businesses had cash flow problems in the past year. That argues for a small pilot sized to what a business can afford to get wrong, not a platform purchase.',
        '**Where your customers already talk to you.** For many South African businesses that is WhatsApp. Its platform rules and fees belong to Meta, so keep your own logic and your own copy of the data in systems you control, and treat the channel as a connection rather than the home of your process.',
        '**Data costs and connectivity.** Prefer tools that do the heavy work on the provider’s servers and work on a phone, so the process does not depend on one good connection in one office.',
        '**POPIA.** Client information is the raw material of most useful workflows. Knowing where it goes, and under what contract, is part of the design and not an afterthought.',
      ],
    },
    { t: 'h2', text: 'The policy backdrop' },
    {
      t: 'p',
      text: 'The national AI policy has been sent back for a rewrite and is not expected at cabinet before March 2027. Waiting for it is not a plan. The decisions above are yours to make now.',
    },
  ],
  sources: [
    { title: 'State of South African Small Business 2026', publisher: 'Xero, with KLA', date: '16 April 2026', url: 'https://www.xero.com/ae/media-releases/state-of-south-african-small-business-2026/' },
    { title: 'South African Generative AI Roadmap 2025, reported as “SA businesses embrace gen AI”', publisher: 'World Wide Worx, Dell Technologies and Intel, via TechCentral (sponsored content)', date: '17 July 2025', url: 'https://techcentral.co.za/sa-businesses-embrace-gen-ai-dell-intel/266963/' },
    { title: 'SA businesses lagging on AI adoption', publisher: 'ITWeb and Incasu AI Adoption Survey 2025', date: '22 October 2025', url: 'https://www.itweb.co.za/article/sa-businesses-lagging-on-ai-adoption/JBwErvn3OpD76Db2' },
    { title: 'South Africa’s AI policy team is racing a 30 November deadline', publisher: 'TechCentral', date: '29 October 2026', url: 'https://techcentral.co.za/south-africa-national-ai-policy-deadline-cabinet-march-2027/287817/' },
  ],
}
