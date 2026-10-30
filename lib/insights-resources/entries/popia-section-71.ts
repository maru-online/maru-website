import type { ContentEntry } from '../types'

/**
 * Analysis. Statutory content follows Bowmans, "AI in the workplace, 2 of 6
 * POPIA considerations" (16 Sep 2026) and Part 5, written in our own words.
 * Owner to verify each section reference against the Act before publishing.
 */
export const section71: ContentEntry = {
  section: 'insights',
  slug: 'popia-section-71-automated-decisions-ai-business',
  title: 'When AI recommends and a person just approves: section 71 for everyday business decisions',
  summary:
    'POPIA restricts decisions made solely by automated profiling. For a business using AI to screen, score or rank people, the word “solely” does a lot of work.',
  seoTitle: 'POPIA Section 71 and AI: Automated Decisions in South African Business',
  seoDescription:
    'What POPIA section 71 means when your business uses AI to screen candidates, score customers or rate staff, and a five-question test to run before AI touches a decision about a person.',
  pillar: 'popia-data-governance',
  category: 'AI in Business',
  format: 'Analysis',
  status: 'draft',
  publishedAt: '2026-10-30',
  readTime: '6 min read',
  author: 'Maru Online',
  image: '/images/insights-resources/popia-data-protection.jpg',
  imageAlt: 'A laptop showing a data protection screen beside a privacy document, a notebook and printed charts on a desk.',
  legalNote: true,
  related: ['south-africa-national-ai-policy-reset-what-businesses-should-do', 'ai-and-popia'],
  inShort: [
    'Section 71 limits decisions with legal or substantial effects on a person that rest solely on automated processing meant to profile them.',
    'Using AI to screen applicants, score customers or rate staff can fall in scope. A score that only decides which enquiry gets a call first is unlikely to.',
    'We know of no published guidance or court decision on how “solely” will be read, so design for a person who can understand, explain and override the AI’s output.',
  ],
  body: [
    {
      t: 'p',
      text: 'More South African businesses now use AI for tasks that sit close to decisions about people: shortlisting CVs, flagging risky customers, ranking leads, scoring staff. Section 71 of POPIA is the provision most directly aimed at this, and few owners know it is there.',
    },
    { t: 'h2', text: 'What section 71 says' },
    {
      t: 'p',
      text: 'A person may not be subject to a decision that has legal consequences for them, or affects them to a substantial degree, if the decision is based solely on automated processing of personal information intended to profile them. The Act names the kinds of profile it has in mind: performance at work, creditworthiness, reliability, location, health, personal preferences and conduct. The list is not closed.',
    },
    {
      t: 'callout',
      title: 'In plain terms',
      text: 'If a machine’s profile of someone decides, on its own, whether they get the job, the credit or the service, section 71 is in play.',
    },
    { t: 'h2', text: 'The exceptions, and what they ask of you' },
    {
      t: 'p',
      text: 'There are two. The first covers a decision taken in connection with concluding or carrying out a contract, where appropriate measures protect the person’s legitimate interests. The second covers a decision governed by a law or code of conduct that sets protective measures.',
    },
    {
      t: 'p',
      text: 'For the contract exception, the measures must include giving the person a chance to make representations, and enough information about the logic of the automated processing for them to do so. That is where “black box” tools become a problem. If nobody in your business can explain how the tool reached its result, you cannot give the person what the Act expects.',
    },
    { t: 'h2', text: 'Where it can show up in a small business' },
    {
      t: 'ul',
      items: [
        '**Hiring:** AI that screens CVs and rejects applicants before a person has looked.',
        '**Customer vetting:** a score of reliability or payment risk that decides whether you take someone on, or on what terms.',
        '**Staff:** performance scores that feed into discipline, pay or retrenchment.',
        '**Sales and service:** lead scoring. One that only decides which enquiry gets a call first is unlikely to affect anyone to a substantial degree. One that decides who gets a service is a different matter.',
      ],
    },
    { t: 'h2', text: 'The word that matters: “solely”' },
    {
      t: 'p',
      text: 'Section 71 applies to decisions based solely on automated processing. A person who genuinely reviews the output, forms their own judgement and can override it takes you outside the core of the section. The risk is the rubber stamp: someone who clicks approve on every recommendation, cannot explain it, or is not allowed to disagree.',
    },
    {
      t: 'p',
      text: 'We are not aware of published guidance from the Information Regulator, or of court decisions, on how “solely” will be read in practice. As at March 2026, commentators reported none. Treat it as a risk judgement, not a safe harbour. The sound reading is the one law firms advising employers are already giving: AI output is an input to a human decision, and the person deciding must be able to explain the reasons and be empowered to override.',
    },
    { t: 'h2', text: 'A five-question test before AI touches a decision about a person' },
    {
      t: 'ol',
      items: [
        '**Does the decision affect someone’s job, credit, access to a service or something similar?** If not, section 71 is unlikely to be the issue, though the rest of POPIA still applies.',
        '**Who looks at the AI’s output before the decision is final?** Name the role, not “the team”.',
        '**Can that person explain, in plain words, why the tool produced this result?**',
        '**Can they override it, and have they ever done so?** If they never do, ask why.',
        '**Does the affected person know AI is involved, and can they ask for a person to look again?**',
      ],
    },
    { t: 'h2', text: 'Beyond section 71' },
    {
      t: 'p',
      text: 'Where section 71 is not triggered, the rest of POPIA still applies. Tell people their information is processed by an AI tool and why (section 18). Collect no more than you need (section 10). Use it only for the purpose you collected it for (sections 13 and 15). Secure it (section 19). Do not keep it longer than necessary (section 14). Where an AI vendor processes information for you, you stay accountable as the responsible party, and you need a written contract with that operator (section 21).',
    },
    { t: 'h2', text: 'Our view' },
    {
      t: 'p',
      text: 'For most small businesses the answer is not to avoid AI in decisions about people. It is to use it to prepare the decision and not to make it: summarise the CVs, flag the anomalies, show a draft score with its reasons, then put a trained person at the end with the authority and the information to disagree. Write down how that works. It is also better business. A score nobody can explain is hard to defend to a candidate, a customer or a regulator.',
    },
  ],
  sources: [
    { title: 'South Africa: AI in the workplace, 2 of 6 POPIA considerations', publisher: 'Bowmans', date: '16 September 2026', url: 'https://bowmanslaw.com/insights/south-africa-ai-in-the-workplace-2-of-6-popia-considerations/' },
    { title: 'South Africa: AI in the workplace, 5 of 6 Practical guidance on what employers need to do', publisher: 'Bowmans', date: '16 September 2026' },
    { title: 'Information Regulator 2026/27 Annual Performance Plan', publisher: 'ITLawCo', date: 'March 2026', url: 'https://itlawco.com/information-regulator-2026-27-annual-performance-plan/' },
    { title: 'Protection of Personal Information Act 4 of 2013, sections 10, 13, 14, 15, 18, 19, 21 and 71', publisher: 'Republic of South Africa' },
  ],
}
