import type { ContentEntry } from '../types'

/**
 * News. Primary source: the Information Regulator's media statement of
 * 26 October 2026 (opened and read 9 Nov 2026). Detail on the FNB platform
 * fault (88 applicants, 9 account numbers, 696 users, the 2022 reports) and
 * the further directions to FNB: TechCentral and ITWeb, both 27 October 2026,
 * reporting the enforcement notice. Section summaries: POPIA, Act 4 of 2013.
 * Short link /popia-fines redirects here (next.config.ts).
 * Re-check on publishing day whether either body has appealed or gone to court.
 */
export const popiaFinesResponse: ContentEntry = {
  section: 'insights',
  slug: 'popia-fines-fnb-tvet-college',
  title: 'POPIA fines for FNB and Central Johannesburg TVET College: what the Regulator found',
  summary:
    'The Information Regulator has fined First National Bank R1 million and Central Johannesburg TVET College R500,000 under POPIA. This summary sets out the findings in each case, how POPIA enforcement works, and the obligations involved.',
  seoTitle: 'POPIA Fines for FNB and Central Johannesburg TVET College: What the Regulator Found',
  seoDescription:
    'The Information Regulator fined FNB R1 million and Central Johannesburg TVET College R500,000 under POPIA. The findings, the enforcement process and the obligations that apply to every business.',
  pillar: 'popia-data-governance',
  category: 'POPIA Enforcement',
  format: 'News',
  status: 'draft', // prepared 9 Nov 2026 for owner review; publish on his go (planned 10 Nov 2026)
  publishedAt: '2026-11-10',
  readTime: '6 min read',
  author: 'Maru Online',
  image: '/images/insights-resources/south-africa-business-district.jpg',
  imageAlt: 'A Johannesburg business district at dusk, with office towers above a busy intersection.',
  legalNote: true,
  related: ['popia-section-71-automated-decisions-ai-business', 'south-african-businesses-using-ai-gap-is-structure'],
  inShort: [
    'On 26 October 2026 the Information Regulator announced administrative fines of R1 million for First National Bank and R500,000 for Central Johannesburg TVET College.',
    'FNB was fined after a fault in its digital home loan platform exposed applicants’ information, including account numbers. The Regulator found weaknesses in its security safeguards, its handling of repeated incidents and its retention of personal information.',
    'The college was fined for not complying with an earlier enforcement notice, issued after it shared students’ personal information with third parties without a lawful basis.',
    'The obligations involved apply to every responsible party: security safeguards, notification of security compromises, a registered Information Officer and limits on retention.',
  ],
  body: [
    {
      t: 'p',
      text: 'On 26 October 2026 the Information Regulator announced enforcement action against First National Bank (FNB) and Central Johannesburg TVET College (CJC) under the Protection of Personal Information Act (POPIA). This article summarises what the Regulator found in each case, explains the steps in the enforcement process, and sets out the obligations that the findings relate to.',
    },
    { t: 'h2', text: 'First National Bank: R1 million' },
    { t: 'h3', text: 'What happened' },
    {
      t: 'p',
      text: 'According to the enforcement notice, as reported by TechCentral and ITWeb, a fault in FNB’s digital home loan application platform allowed users to see home loan applications belonging to 88 other people. Nine of those applications included bank account numbers, which 696 unauthorised users could see. TechCentral reports that customers reported the problem in March and May 2022, and that each report was handled as an isolated case. FNB notified the Regulator of a security compromise after the matter was reported in the media, and the Regulator then carried out a compliance assessment.',
    },
    { t: 'h3', text: 'What the Regulator found' },
    {
      t: 'ul',
      items: [
        'Significant shortcomings in how FNB identified, classified and responded to repeated security incidents.',
        'Inadequate technical and organisational measures to prevent unlawful access to personal information.',
        'Security safeguards required by section 19 of POPIA that were not properly implemented.',
        'Weak governance of how long personal information is retained.',
        'An offence under section 105, which concerns account numbers. The Regulator found that FNB should reasonably have known of the risk and did not take reasonable steps to prevent it.',
      ],
    },
    {
      t: 'p',
      text: 'TechCentral also reports further directions in the enforcement notice: FNB must establish another lawful basis for personal information it collected from newspapers, which the Regulator found are not a public record; destroy certain records kept without a legal basis; and amend its privacy notice. It reports that FNB has 30 days to appeal and 90 days to provide evidence of compliance.',
    },
    { t: 'h2', text: 'Central Johannesburg TVET College: R500,000' },
    { t: 'h3', text: 'What happened' },
    {
      t: 'p',
      text: 'Three people complained that the college had shared their personal information with third parties without a lawful basis. On 22 May 2026 the Regulator issued an enforcement notice. It directed the college to register its Information Officer and Deputy Information Officer, apologise to the complainants, develop and submit a POPIA compliance framework, provide POPIA training to staff, and take disciplinary action against the employee responsible for the disclosure. The college had 120 days to comply.',
    },
    { t: 'h3', text: 'What the Regulator found' },
    {
      t: 'p',
      text: 'The college responded at the end of the 120 days. The Regulator found that it had not complied: it had not reported the security compromise in the prescribed manner, had not developed the compliance framework, had delayed the apology and had not met other deadlines. The Regulator described these as very serious contraventions of POPIA and issued an infringement notice with a fine of R500,000.',
    },
    { t: 'h2', text: 'How POPIA enforcement works' },
    {
      t: 'p',
      text: 'The two cases follow the same process at different stages. The table summarises the main steps and where they sit in the Act.',
    },
    {
      t: 'table',
      head: ['Step', 'What it involves', 'POPIA'],
      rows: [
        ['Complaint or notification', 'A person complains to the Regulator, or a responsible party reports a security compromise.', 'Sections 74 and 22'],
        ['Investigation or assessment', 'The Regulator investigates the complaint, or assesses whether processing complies with the Act.', 'Sections 76 and 89'],
        ['Enforcement notice', 'The Regulator directs the responsible party to take specific steps, or to stop processing, within a set period.', 'Section 95'],
        ['Appeal', 'A responsible party may appeal an enforcement notice to the High Court within 30 days.', 'Section 97'],
        ['Infringement notice', 'For an alleged offence, the Regulator may impose an administrative fine of up to R10 million.', 'Section 109'],
      ],
    },
    {
      t: 'p',
      text: 'Not complying with an enforcement notice is itself an offence under POPIA. That is the situation the college found itself in: the fine followed its response to the notice, not only the original disclosure.',
    },
    { t: 'h2', text: 'The obligations involved' },
    {
      t: 'ul',
      items: [
        '**Security safeguards (section 19).** A responsible party must identify reasonably foreseeable internal and external risks to the personal information it holds, put appropriate safeguards in place, check regularly that they work, and update them as risks change.',
        '**Notification of security compromises (section 22).** Where there are reasonable grounds to believe that personal information has been accessed or acquired by an unauthorised person, the responsible party must notify the Regulator and the people affected as soon as reasonably possible. Since April 2025 the Regulator has required these notifications to be made through its eServices Portal.',
        '**Information Officer (section 55).** In a private body, the head of the business is the Information Officer unless the role is delegated, and the Information Officer must be registered with the Regulator.',
        '**Retention (section 14).** Personal information may not be kept for longer than is necessary for the purpose for which it was collected, subject to specific exceptions such as a legal requirement to keep it.',
        '**Account numbers (section 105).** Specific offences apply where a responsible party contravenes certain conditions in relation to account numbers, as in the FNB case.',
      ],
    },
    { t: 'h2', text: 'Practical checks for a business' },
    {
      t: 'p',
      text: 'The findings point to areas that any business can review without new systems:',
    },
    {
      t: 'ol',
      items: [
        '**Access.** Confirm that clients, staff and suppliers can see only the records they should, in client portals, CRMs and shared drives. Remove shared links that are no longer needed.',
        '**Incident handling.** Agree what counts as a security incident, who receives reports, and how repeated reports of the same problem are escalated.',
        '**Notification.** Know who decides whether a security compromise must be reported, and how to submit a notification through the Regulator’s eServices Portal.',
        '**Information Officer.** Confirm that your Information Officer, and any deputy, is registered with the Regulator.',
        '**Retention.** Set retention periods for the main types of personal information you hold, such as client files, applications and CVs, and remove what is no longer needed.',
      ],
    },
    { t: 'h2', text: 'AI tools and automation' },
    {
      t: 'p',
      text: 'The same obligations apply to personal information processed through AI tools and automated workflows. An automation that sends a report to the wrong recipient, or an AI assistant connected to a shared drive with broad permissions, can give unauthorised people access to personal information. When reviewing access, incident handling and retention, include these tools and the information they can reach.',
    },
    {
      t: 'callout',
      title: 'Administrative fines',
      text: 'An administrative fine under an infringement notice is not a criminal conviction. The Regulator’s statement does not say that either organisation has been prosecuted, and both may challenge the notices.',
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
    { title: 'South Africa introduces mandatory e-portal reporting for data breaches', publisher: 'DataBreaches.net', date: '16 April 2025', url: 'https://databreaches.net/2025/04/16/south-africa-introduces-mandatory-e-portal-reporting-for-data-breaches/' },
    { title: 'Protection of Personal Information Act 4 of 2013, sections 14, 19, 22, 55, 74, 76, 89, 95, 97, 105 and 109', publisher: 'Republic of South Africa' },
  ],
}
