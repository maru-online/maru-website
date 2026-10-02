/**
 * POPIA-safe AI check (assessment_v3): the questions.
 *
 * COPY-DECK-ADDENDUM-02 item B, approved as written by Jimmy on 26 Sep 2026.
 * Verbatim: change the addendum first, then this file. Scoring, the wizard
 * and the synthesis prompt all read from here, so the wording a visitor sees
 * is the wording Claude reasons about.
 *
 * Option order is best → worst and each carries its score (4 / 2 / 1 / 0).
 * `value` is what gets posted, stored and shown in Jimmy's brief.
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
    label: "AI in your business",
    questions: [
      {
        id: "q1",
        text: "How is your team using AI tools like ChatGPT or Gemini at the moment?",
        options: [
          { value: "agreed-tools",  score: 4, label: "We've agreed which tools are allowed and what they can be used for" },
          { value: "informal-talk", score: 2, label: "A few people use them, and we've talked about it informally" },
          { value: "anything-goes", score: 1, label: "People use whatever they like; we haven't discussed it" },
          { value: "dont-know",     score: 0, label: "I don't really know who uses what" },
        ],
      },
      {
        id: "q2",
        text: "Has client information ever gone into an AI tool: names, ID numbers, account details, medical or financial notes?",
        options: [
          { value: "rule-known",    score: 4, label: "No. We have a rule against it and the team knows it" },
          { value: "never-checked", score: 2, label: "Probably not, but we've never checked" },
          { value: "probably-yes",  score: 1, label: "Probably yes. It's the quickest way to get things done" },
          { value: "dont-know",     score: 0, label: "I don't know" },
        ],
      },
    ],
  },
  {
    key: "data_location",
    label: "Where client information goes",
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
          { value: "checked-known", score: 4, label: "Yes. We've checked, and we know what's stored where" },
          { value: "main-only",     score: 2, label: "For our main systems, but not the smaller apps" },
          { value: "never-looked",  score: 1, label: "Not really. We've never looked" },
          { value: "didnt-know",    score: 0, label: "I didn't know that mattered" },
        ],
      },
    ],
  },
  {
    key: "access",
    label: "Who can see it",
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
          { value: "not-sure",             score: 0, label: "I'm not sure" },
        ],
      },
    ],
  },
  {
    key: "permission",
    label: "Permission and trust",
    questions: [
      {
        id: "q7",
        text: "When you send clients marketing messages or newsletters, did they agree to receive them?",
        options: [
          { value: "opted-in",         score: 4, label: "Yes. They opted in and can unsubscribe easily" },
          { value: "mostly",           score: 2, label: "Mostly. Some were added from our existing contacts" },
          { value: "message-everyone", score: 1, label: "We message everyone on our list" },
          { value: "not-tracked",      score: 0, label: "We don't track who agreed" },
        ],
      },
      {
        id: "q8",
        text: "If a client asked what information you hold about them and who you share it with, could you answer?",
        options: [
          { value: "within-days",    score: 4, label: "Yes, within a few days" },
          { value: "real-digging",   score: 2, label: "Yes, but it would take real digging" },
          { value: "would-struggle", score: 1, label: "We'd struggle to give a full answer" },
          { value: "no-idea",        score: 0, label: "We wouldn't know where to start" },
        ],
      },
    ],
  },
  {
    key: "incident",
    label: "If something goes wrong",
    questions: [
      {
        id: "q9",
        text: "If a laptop or phone with client information were lost or hacked tomorrow, what would happen?",
        options: [
          { value: "have-plan",      score: 4, label: "We have a plan: who to tell, what to do and by when" },
          { value: "work-it-out",    score: 2, label: "We'd work it out, and we know who's responsible" },
          { value: "scramble",       score: 1, label: "We'd scramble. Nobody owns this" },
          { value: "might-not-know", score: 0, label: "We might not even know it had happened" },
        ],
      },
      {
        id: "q10",
        text: "Who in your business is responsible for protecting personal information?",
        options: [
          { value: "named-registered", score: 4, label: "A named person, registered with the Information Regulator" },
          { value: "me-informal",      score: 2, label: "Me by default, but I haven't done anything formal" },
          { value: "nobody",           score: 1, label: "Nobody specific" },
          { value: "didnt-know",       score: 0, label: "I didn't know someone had to be" },
        ],
      },
    ],
  },
];

/** Flat list in question order, with each question's area attached. */
export const ASSESSMENT_QUESTIONS = ASSESSMENT_AREAS.flatMap((area, i) =>
  area.questions.map((q) => ({ ...q, area: area.label, areaIndex: i + 1 })),
);
