import type { ContentEntry } from '../types'

/**
 * News. Primary source: the Information Regulator's media statement of
 * 26 October 2026 (opened and read 9 Nov 2026). Detail on the FNB platform
 * fault (88 applicants, 9 account numbers, 696 users, the 2022 reports):
 * TechCentral and ITWeb, both 27 October 2026, quoting the enforcement notice.
 * Re-check on publishing day whether either body has appealed or gone to court.
 */
export const popiaFinesResponse: ContentEntry = {
  section: 'insights',
  slug: 'popia-fines-fnb-tvet-college-response-matters',
  title: 'Two POPIA fines, one lesson: the response is what costs you',
  summary:
    'The Information Regulator has fined First National Bank R1 million and Central Johannesburg TVET College R500,000. In both cases, how the organisation responded weighed as heavily as the original failure. Five things a business can check this week.',
  seoTitle: 'POPIA Fines for FNB and a TVET College: What Businesses Should Check',
  seoDescription:
    'The Information Regulator fined FNB R1 million and Central Johannesburg TVET College R500,000 under POPIA. What happened, why the response mattered, and five checks for any South African business.',
  pillar: 'popia-data-governance',
  category: 'POPIA Enforcement',
  format: 'News',
  status: 'draft', // prepared 9 Nov 2026 for owner review; publish on his go (planned 10 Nov 2026)
  publishedAt: '2026-11-10',
  readTime: '4 min read',
  author: 'Maru Online',
  image: '/images/insights-resources/south-africa-business-district.jpg',
  imageAlt: 'A Johannesburg business district at dusk, with office towers above a busy intersection.',
  legalNote: true,
  related: ['popia-section-71-automated-decisions-ai-business', 'south-african-businesses-using-ai-gap-is-structure'],
  inShort: [
    'On 26 October 2026 the Information Regulator announced a R1 million fine for First National Bank and a R500,000 fine for Central Johannesburg TVET College under POPIA.',
    'In both cases the Regulator pointed to the organisation’s response: incidents that were not escalated or reported properly, and directions that were not followed in time.',
    'The same weaknesses are common in small businesses. Five checks below take less than a day to start.',
  ],
  body: [
    {
      t: 'p',
      text: 'On 26 October the Information Regulator announced administrative fines against two very different organisations: a major bank and a public college. Neither fine was only about the original mistake. In both cases, what happened afterwards weighed heavily in the Regulator’s findings.',
    },
    { t: 'h2', text: 'First National Bank: R1 million' },
    {
      t: 'p',
      text: 'A fault in FNB’s digital home loan application platform let other users see home loan applications belonging to 88 people, according to the enforcement notice as reported by TechCentral and ITWeb. Nine of those applications included bank account numbers, which 696 unauthorised users could see. TechCentral reports that customers flagged the problem twice in 2022, and that the bank handled each report as an isolated case.',
    },
    {
      t: 'p',
      text: 'After a compliance assessment, the Regulator found significant shortcomings in how FNB identified, classified and responded to repeated security incidents. It also found that FNB had not properly implemented the security safeguards required by section 19 of POPIA, and that its governance of how long personal information is kept was weak. Because account numbers were involved, the Regulator found an offence under section 105, on the basis that the bank should reasonably have known of the risk and did not take reasonable steps to prevent it.',
    },
    { t: 'h2', text: 'Central Johannesburg TVET College: R500,000' },
    {
      t: 'p',
      text: 'Three people complained that the college had shared their personal information with third parties without a lawful reason. In May 2026 the Regulator issued an enforcement notice with five directions: register an Information Officer and Deputy Information Officer, apologise to the complainants, develop a POPIA compliance framework, train staff, and take disciplinary action against the employee responsible.',
    },
    {
      t: 'p',
      text: 'The college had 120 days. When the period ended, the Regulator found it had not complied. It had not reported the security compromise in the prescribed manner, had not developed the compliance framework, had delayed the apology and had missed other deadlines. The Regulator described these failures as very serious contraventions of POPIA, and issued the fine.',
    },
    { t: 'h2', text: 'Why the response matters' },
    {
      t: 'p',
      text: 'Mistakes happen in every organisation: a wrong setting, a misdirected email, a file shared with the wrong person. POPIA does not expect a business never to have an incident. It expects reasonable safeguards, a way of recognising an incident when it happens, notification to the Regulator and the people affected, and follow-through when the Regulator gives directions.',
    },
    {
      t: 'p',
      text: 'Those are matters of process, not budget. A small business can get them right without new systems. It needs clear ownership and a short, written way of working.',
    },
    { t: 'h2', text: 'Five checks for this week' },
    {
      t: 'ol',
      items: [
        '**Check who can see what.** Log in to your own client portal, CRM or shared drive as an ordinary user would. Confirm that one client cannot see another client’s records, and that old shared links no longer work.',
        '**Decide what counts as an incident, and who hears about it.** A client saying “I can see someone else’s details” is a security incident, not a support ticket. Name the person it goes to, and treat a second report of the same problem as a warning sign rather than a coincidence.',
        '**Know your notification duty.** Under section 22, where there are reasonable grounds to believe personal information has been accessed by an unauthorised person, the Regulator and the people affected must be notified as soon as reasonably possible. Know how to do it before you need to.',
        '**Register your Information Officer.** In a private business the head of the business is the Information Officer by default. Registration with the Regulator was one of the steps the college was directed to take.',
        '**Review how long you keep personal information.** Section 14 limits retention to what is necessary for the purpose. Old application forms, CVs and client files kept indefinitely are a risk with no benefit.',
      ],
    },
    { t: 'h2', text: 'Where AI comes in' },
    {
      t: 'p',
      text: 'AI tools and automations widen the same exposure. A workflow that emails a report to the wrong address, or an assistant connected to a shared drive with loose permissions, can disclose client information quickly and quietly. Client details pasted into an AI tool outside your agreed safeguards are still your responsibility. The checks above apply to these tools as much as to any other system: who can see the information, who notices when something goes wrong, and what happens next.',
    },
    {
      t: 'callout',
      title: 'What these fines are and are not',
      text: 'An administrative fine under an infringement notice is not a criminal conviction, and the Regulator’s statement does not say that either organisation has been prosecuted. Both may challenge the notices.',
    },
  ],
  sources: [
    {
      title: 'Information Regulator fines Central Johannesburg TVET College and First National Bank for POPIA contravention',
      publisher: 'Information Regulator',
      date: '26 October 2026',
      url: 'https://inforegulator.org.za/wp-content/uploads/2026/10/MEDIA-STATEMENT-REGULATOR-FINES-CJC-AND-FNB-FOR-POPIA-CONTRAVENTION.pdf',
    },
    { title: 'FNB fined by Information Regulator', publisher: 'TechCentral', date: '27 October 2026', url: 'https://techcentral.co.za/fnb-fine-information-regulator-popia/287711/' },
    { title: 'FNB issued with R1m fine for POPIA violation', publisher: 'ITWeb', date: '27 October 2026', url: 'https://www.itweb.co.za/article/fnb-issued-with-r1m-fine-for-popia-violation/O2rQGqAEWwBqd1ea' },
    { title: 'Protection of Personal Information Act 4 of 2013, sections 14, 19, 22 and 105', publisher: 'Republic of South Africa' },
  ],
}
