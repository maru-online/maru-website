import type { ContentEntry } from '../types'

/**
 * News. Facts: TechCentral 29 Oct 2026 (timeline, panel), Technext 26 May 2026
 * (withdrawal, earlier timeline), ITLawCo (Regulator guidance as at March 2026),
 * Clyde & Co Nov 2025 (King V), Bowmans 16 Sep 2026 (POPIA). Re-check the
 * timeline on the day of publishing: it has moved twice already.
 */
export const policyReset: ContentEntry = {
  section: 'insights',
  slug: 'south-africa-national-ai-policy-reset-what-businesses-should-do',
  title: 'South Africa’s national AI policy goes back to the drafting table. What it means for your business.',
  summary:
    'The draft National AI Policy was withdrawn in April and is now due to reach cabinet around March 2027. The law that governs how you use AI today has not changed.',
  seoTitle: 'South Africa’s National AI Policy Reset: What Businesses Should Do Now',
  seoDescription:
    'The draft National AI Policy was withdrawn and a revised version is due to cabinet around March 2027. What that means for South African businesses using AI today, and what POPIA already requires.',
  pillar: 'ai-for-business',
  category: 'AI Developments',
  format: 'News',
  status: 'draft',
  publishedAt: '2026-10-30',
  readTime: '4 min read',
  author: 'Maru Online',
  image: '/images/insights-resources/south-africa-business-district.jpg',
  imageAlt: 'A Johannesburg business district at dusk, with office towers above a busy intersection.',
  legalNote: true,
  related: ['popia-section-71-automated-decisions-ai-business', 'south-african-businesses-using-ai-gap-is-structure'],
  inShort: [
    'The draft National AI Policy was withdrawn in April 2026 after sources in its reference list could not be verified. The drafting team must give a revised version to the Minister by 30 November 2026.',
    'Cabinet submission is now targeted for March 2027. Public comment comes only after cabinet approval, and no date has been given.',
    'None of this changes your obligations today. POPIA and other existing law already apply to how your business uses AI.',
  ],
  body: [
    {
      t: 'p',
      text: 'The team rewriting South Africa’s National AI Policy has until 30 November to submit a revised version to Communications Minister Solly Malatsi, TechCentral reported on 29 October. Here is where the policy stands, and what it means for a business that is already using AI.',
    },
    { t: 'h2', text: 'What happened' },
    {
      t: 'p',
      text: 'The Department of Communications and Digital Technologies released a draft National AI Policy for public comment in April 2026. It was withdrawn soon afterwards, after News24 found that parts of its reference list cited sources that could not be verified or did not exist. The Minister told Parliament that internal reviews had missed the problem. He has since appointed a seven-member independent expert panel, chaired by Wits University AI researcher Benjamin Rosman, to review the draft.',
    },
    { t: 'h2', text: 'The timeline as it stands' },
    {
      t: 'ul',
      items: [
        '**Now to 30 November 2026:** the drafting team finalises the revised policy and a discussion document for the Minister.',
        '**December 2026 to February 2027:** internal government consultation.',
        '**March 2027:** target for submission to cabinet.',
        '**After cabinet approval:** the policy is published for public comment. No date has been given.',
      ],
    },
    {
      t: 'p',
      text: 'The dates have already moved. In May the department was aiming for cabinet approval in November 2026 and public comment in January 2027.',
    },
    { t: 'h2', text: 'What it means for your business' },
    {
      t: 'p',
      text: 'Very little changes today, and that is the point. A national policy sets direction. It is not a statute, and as far as we have found South Africa has no AI-specific statute. The rules that matter to you now are the ones you already know.',
    },
    {
      t: 'ul',
      items: [
        '**POPIA already applies.** If a client’s or employee’s personal information goes into an AI tool, POPIA’s conditions for lawful processing apply, including security safeguards, purpose limits and how long you keep information. Section 71 restricts decisions made solely by automated profiling. A national AI policy being late does not suspend any of this.',
        '**Regulator guidance is still thin.** As at March 2026, commentators reported that the Information Regulator had published no guidance on AI risk or on section 71. Guidance may follow. It is not a reason to wait.',
        '**Boards are being pointed the same way.** King V, the voluntary governance code published on 31 October 2025, applies to financial years starting on or after 1 January 2026. Under its technology practices, boards are expected to ensure human oversight and override for automated technologies, in proportion to the risk. It is aimed at governing bodies, but it is a sensible benchmark for any business.',
      ],
    },
    { t: 'h2', text: 'One lesson from the episode' },
    {
      t: 'p',
      text: 'The draft was withdrawn because nobody checked the sources. The same risk sits in any business that uses AI to draft quotes, contracts, reports or replies to clients. AI output needs a named person who checks it before it leaves the building, and who is accountable if it is wrong.',
    },
    { t: 'h2', text: 'Three things to do this month' },
    {
      t: 'ol',
      items: [
        'List the AI tools your team uses, and what information goes into each of them.',
        'Write down what may and may not be entered: client personal information, staff information and anything covered by a confidentiality agreement.',
        'Decide who checks AI output before it reaches a client, and make that part of the process rather than a habit.',
      ],
    },
  ],
  sources: [
    { title: 'South Africa’s AI policy team is racing a 30 November deadline', publisher: 'TechCentral', date: '29 October 2026', url: 'https://techcentral.co.za/south-africa-national-ai-policy-deadline-cabinet-march-2027/287817/' },
    { title: 'South Africa pushes AI policy to 2027', publisher: 'Technext', date: '26 May 2026', url: 'https://technext24.com/2026/05/26/south-africa-pushes-ai-policy-to-2027/' },
    { title: 'Information Regulator 2026/27 Annual Performance Plan', publisher: 'ITLawCo', date: 'March 2026', url: 'https://itlawco.com/information-regulator-2026-27-annual-performance-plan/' },
    { title: 'King V Code enhances principles regarding AI governance and cyber risks in South Africa', publisher: 'Clyde & Co', date: 'November 2025', url: 'https://www.clydeco.com/en/insights/2025/11/king-v-code-enhances-principles-regarding-ai-gover' },
    { title: 'South Africa: AI in the workplace, 2 of 6 POPIA considerations', publisher: 'Bowmans', date: '16 September 2026', url: 'https://bowmanslaw.com/insights/south-africa-ai-in-the-workplace-2-of-6-popia-considerations/' },
  ],
}
