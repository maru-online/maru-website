/**
 * POPIA AI check (assessment_v3): the questions.
 *
 * COPY-DECK-ADDENDUM-02 item B, approved as written by the owner on 26 Sep 2026.
 * Verbatim: change the addendum first, then this file. Scoring, the wizard
 * and the synthesis prompt all read from here, so the wording a visitor sees
 * is the wording Claude reasons about.
 *
 * Option order is best → worst and each carries its score (4 / 2 / 1 / 0).
 * `value` is what gets posted, stored and shown in the lead alert.
 */

export type QuestionId = "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7" | "q8" | "q9" | "q10";

export interface AssessmentQuestion {
  id: QuestionId;
  text: string;
  options: { value: string; label: string; score: number }[];
}

export interface AssessmentArea {
  key: string;
  label: string;
  questions: [AssessmentQuestion, AssessmentQuestion];
}

export const ASSESSMENT_AREAS: AssessmentArea[] = [
  {
    key: "ai_use",
    label: "AI use and oversight",
    questions: [
      {
        id: "q1",
        text: "How is your team using AI tools like ChatGPT or Gemini at the moment?",
        options: [
          { value: "agreed-tools",  score: 4, label: "We have agreed which tools are allowed and what they can be used for" },
          { value: "informal-talk", score: 2, label: "A few people use them, and we have talked about it informally" },
          { value: "anything-goes", score: 1, label: "Staff choose their own tools; we have not discussed it" },
          { value: "dont-know",     score: 0, label: "I do not really know who uses what" },
        ],
      },
      {
        id: "q2",
        text: "Has client information ever gone into an AI tool: names, ID numbers, account details, medical or financial notes?",
        options: [
          { value: "rule-known",    score: 4, label: "No. We have a rule against it and the team knows it" },
          { value: "never-checked", score: 2, label: "Probably not, but we have never checked" },
          { value: "probably-yes",  score: 1, label: "Probably yes. It is the quickest way to complete the work" },
          { value: "dont-know",     score: 0, label: "I do not know" },
        ],
      },
    ],
  },
  {
    key: "data_location",
    label: "Information flows",
    questions: [
      {
        id: "q3",
        text: "Where does your client information mostly live day to day?",
        options: [
          { value: "controlled-systems",    score: 4, label: "In one or two business systems we pay for and control" },
          { value: "systems-plus-copies",   score: 2, label: "In a few systems, with copies in email and spreadsheets" },
          { value: "whatsapp-email-phones", score: 1, label: "Across WhatsApp, email, spreadsheets and personal phones" },
          { value: "phones-inboxes-heads",  score: 0, label: "Mostly in people's phones, inboxes and heads" },
        ],
      },
      {
        id: "q4",
        text: "Do you know which of your apps store client information outside South Africa?",
        options: [
          { value: "checked-known", score: 4, label: "Yes. We have checked, and we know what is stored where" },
          { value: "main-only",     score: 2, label: "For our main systems, but not the smaller apps" },
          { value: "never-looked",  score: 1, label: "Not really. We have never looked" },
          { value: "didnt-know",    score: 0, label: "I did not know that mattered" },
        ],
      },
    ],
  },
  {
    key: "access",
    label: "Access",
    questions: [
      {
        id: "q5",
        text: "When someone leaves your business, what happens to their access?",
        options: [
          { value: "all-off-last-day", score: 4, label: "We switch off every login and device on their last day" },
          { value: "main-removed",     score: 2, label: "We remove the main ones; smaller apps sometimes get missed" },
          { value: "when-remember",    score: 1, label: "We change passwords when we remember" },
          { value: "shared-logins",    score: 0, label: "Logins are shared, so nothing really changes" },
        ],
      },
      {
        id: "q6",
        text: "Who could open your full client list today?",
        options: [
          { value: "need-to-know",         score: 4, label: "Only the people who need it for their job" },
          { value: "most-behind-password", score: 2, label: "Most of the team, behind a password" },
          { value: "anyone-office",        score: 1, label: "Anyone in the office or the team WhatsApp group" },
          { value: "not-sure",             score: 0, label: "I am not sure" },
        ],
      },
    ],
  },
  {
    key: "permission",
    label: "Consent and transparency",
    questions: [
      {
        id: "q7",
        text: "When you send clients marketing messages or newsletters, did they agree to receive them?",
        options: [
          { value: "opted-in",         score: 4, label: "Yes. They opted in and can unsubscribe easily" },
          { value: "mostly",           score: 2, label: "Mostly. Some were added from our existing contacts" },
          { value: "message-everyone", score: 1, label: "We message everyone on our list" },
          { value: "not-tracked",      score: 0, label: "We do not track who agreed" },
        ],
      },
      {
        id: "q8",
        text: "If a client asked what information you hold about them and who you share it with, could you answer?",
        options: [
          { value: "within-days",    score: 4, label: "Yes, within a few days" },
          { value: "real-digging",   score: 2, label: "Yes, but it would take extensive searching" },
          { value: "would-struggle", score: 1, label: "We would struggle to give a full answer" },
          { value: "no-idea",        score: 0, label: "We would not know where to start" },
        ],
      },
    ],
  },
  {
    key: "incident",
    label: "Incidents and response",
    questions: [
      {
        id: "q9",
        text: "If a laptop or phone with client information were lost or hacked tomorrow, what would happen?",
        options: [
          { value: "have-plan",      score: 4, label: "We have a plan: who to tell, what to do and by when" },
          { value: "work-it-out",    score: 2, label: "We would work it out, and we know who is responsible" },
          { value: "scramble",       score: 1, label: "We would struggle to respond. Nobody owns this" },
          { value: "might-not-know", score: 0, label: "We might not even know it had happened" },
        ],
      },
      {
        id: "q10",
        text: "Who in your business is responsible for protecting personal information?",
        options: [
          { value: "named-registered", score: 4, label: "A named person, registered with the Information Regulator" },
          { value: "me-informal",      score: 2, label: "Me by default, but I have not done anything formal" },
          { value: "nobody",           score: 1, label: "Nobody specific" },
          { value: "didnt-know",       score: 0, label: "I did not know someone had to be" },
        ],
      },
    ],
  },
];

/** Flat list in question order, with each question's area attached. */
export const ASSESSMENT_QUESTIONS = ASSESSMENT_AREAS.flatMap((area, i) =>
  area.questions.map((q) => ({ ...q, area: area.label, areaIndex: i + 1 })),
);
