import type { ContentEntry } from '../types'

/**
 * News. Primary source: the Information Regulator's media statement of
 * 26 October 2026 (opened and read 9 Nov 2026). Detail on the FNB platform
 * fault (88 applicants, 9 account numbers, 696 users, the 2022 reports) and
 * the further directions to FNB: TechCentral and ITWeb, both 27 October 2026,
 * reporting the enforcement notice. Section summaries: POPIA, Act 4 of 2013.
 * Added 14 Nov 2026: FNB's response (ITWeb, 28 Oct), the cause (BusinessTech,
 * quoting the Regulator), and context on earlier fines (BusinessTech 1 Sep 2026;
 * Moonstone for the Basic Education set-aside). The Chair's remark on public
 * bodies complying within the deadline is from ITWeb (FNB article).
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
  readTime: '8 min read',
  author: 'Maru Online',
  image: '/images/insights-resources/south-africa-business-district.jpg',
  imageAlt: 'A Johannesburg business district at dusk, with office towers above a busy intersection.',
  legalNote: true,
  related: ['popia-section-71-automated-decisions-ai-business', 'south-african-businesses-using-ai-gap-is-structure'],
  inShort: [
    'On 26 October 2026 the Information Regulator announced administrative fines of R1 million for First National Bank and R500,000 for Central Johannesburg TVET College.',
    'FNB was fined after a fault in its digital home loan platform exposed applicants’ information, including account numbers. The Regulator found weaknesses in its security safeguards, its handling of repeated incidents and its retention of personal information.',
    'The college was fined for not complying with an earlier enforcement notice, issued after it shared students’ personal information with third parties without a lawful basis.',
    'The FNB finding rests on a test that applies to any business: whether it should reasonably have known of the risk. Reports that are handled one at a time, without looking for a pattern, are difficult to defend under that test.',
    'The fines are modest against the R10 million maximum, and earlier fines have been challenged in court. The practical exposure is the compliance directions that follow, and the obligations involved apply to every responsible party.',
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
    {
      t: 'p',
      text: 'The Regulator said that the unlawful access arose because some individual account holders had been classified as employees, which gave them access to home loan applicants’ information. It also noted that exposed data of this kind can be combined with information from other breaches, which raises the risk of identity theft and fraud. In a statement reported by ITWeb on 28 October 2026, FNB said it has completed remediation and that no customers suffered financial harm.',
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
    { t: 'h2', text: 'What the findings mean for a business' },
    {
      t: 'p',
      text: 'The two cases are different in kind, and four points follow from them.',
    },
    { t: 'h3', text: 'Repeated reports are treated as knowledge' },
    {
      t: 'p',
      text: 'The section 105 finding turns on whether FNB should reasonably have known of the risk. Earlier reports of the same fault had been resolved for the individual customers concerned but not escalated as a possible security compromise. A report from a customer, employee or supplier that they can see information they should not is a potential security compromise. It needs to be recorded, assessed and checked against earlier reports, even when the individual case is closed quickly.',
    },
    { t: 'h3', text: 'Access errors are an ordinary cause' },
    {
      t: 'p',
      text: 'The cause the Regulator identified was a misclassification of user roles, not an attack. The same kind of error can arise in any client portal, CRM, accounting platform or shared drive where permissions are set by role or group. Permissions need to be reviewed when roles, staff or system settings change, not only when the system is first set up.',
    },
    { t: 'h3', text: 'Handling the Regulator’s directions is itself a compliance matter' },
    {
      t: 'p',
      text: 'The college’s fine followed its response to an enforcement notice. The failures listed by the Regulator were basic ones: no registered Information Officer, a security compromise not reported in the prescribed manner, no compliance framework and missed deadlines. The matter began with three complaints. A business that receives a notice needs to know who owns the response and who tracks each deadline.',
    },
    { t: 'h3', text: 'An enforcement notice can reach beyond the incident' },
    {
      t: 'p',
      text: 'According to TechCentral, the directions to FNB covered its lawful basis for collecting information, its retention schedule and its privacy notice, as well as the platform fault. An incident can lead the Regulator to review a responsible party’s wider documentation, so retention schedules, lawful bases and privacy notices should be current before an incident, not after.',
    },
    { t: 'h2', text: 'Reading the fines in context' },
    {
      t: 'p',
      text: 'The maximum administrative fine under section 109 is R10 million. FNB’s fine is one tenth of that, and the college’s is one twentieth. The Regulator’s earlier fines of R5 million against the Department of Justice and the Department of Basic Education were both challenged in court, and the Basic Education notices were reported to have been set aside by the High Court in December 2025. The Regulator’s chairperson has also said that public bodies often comply within the deadline, which ends the enforcement process, or challenge the fine in court.',
    },
    {
      t: 'p',
      text: 'The financial penalty is therefore not the main practical consequence for most businesses. The directions in the enforcement notice, the management time needed to meet them and the public record of the findings carry more weight. The Regulator’s statement also calls on public and private bodies to review their compliance programmes, strengthen information-security safeguards and ensure that Information Officers carry out their responsibilities.',
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
      text: 'The findings point to areas that any business can review without new systems. Each check is a question the business should be able to answer:',
    },
    {
      t: 'ol',
      items: [
        '**Access.** Can clients, staff and suppliers see only the records they should, in client portals, CRMs and shared drives? Who checks how roles and groups are assigned, and when are they reviewed after staff or system settings change? Have shared links that are no longer needed been removed?',
        '**Incident handling.** Is there an agreed definition of a security incident, a named person who receives reports, and a route for escalating repeated reports of the same problem? Is every report logged, including those resolved quickly, and reviewed periodically for patterns?',
        '**Notification.** Who decides whether a security compromise must be reported, and do they know how to submit a notification through the Regulator’s eServices Portal?',
        '**Information Officer.** Is the Information Officer, and any deputy, registered with the Regulator?',
        '**Retention.** Has a retention period been set for each main type of personal information, such as client files, applications and CVs, and is what is no longer needed removed?',
        '**Regulator correspondence.** Who receives any notice or request from the Regulator, who owns the response, and how are deadlines tracked?',
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
      text: 'An administrative fine under an infringement notice is not a criminal conviction. The Regulator’s statement does not say that either organisation has been prosecuted. In the reports reviewed for this article, neither FNB nor the college had announced an appeal, and both may challenge the notices.',
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
    { title: 'Data exposure shortcomings fixed, says FNB', publisher: 'ITWeb', date: '28 October 2026', url: 'https://www.itweb.co.za/article/data-exposure-shortcomings-fixed-says-fnb/o1Jr5MxP3AbMKdWL' },
    { title: 'Top bank in South Africa fined R1 million for not protecting customer data', publisher: 'BusinessTech', date: '26 October 2026', url: 'https://businesstech.co.za/news/?p=881407' },
    { title: 'Two departments nailed with R5 million fines in South Africa', publisher: 'BusinessTech', date: '1 September 2026', url: 'https://businesstech.co.za/news/?p=872960' },
    { title: 'Information Regulator sounds alarm over data breaches', publisher: 'Moonstone', url: 'https://www.moonstone.co.za/?p=61572' },
    { title: 'South Africa introduces mandatory e-portal reporting for data breaches', publisher: 'DataBreaches.net', date: '16 April 2025', url: 'https://databreaches.net/2025/04/16/south-africa-introduces-mandatory-e-portal-reporting-for-data-breaches/' },
    { title: 'Protection of Personal Information Act 4 of 2013, sections 14, 19, 22, 55, 74, 76, 89, 95, 97, 105 and 109', publisher: 'Republic of South Africa' },
  ],
}
