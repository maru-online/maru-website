/**
 * Maru Online — Claude synthesis prompt (assessment_v3, POPIA-safe AI check)
 *
 * Inputs:
 *   1. The prospect's ten answers (option values from questions.ts), rendered
 *      back to the question and answer wording the visitor saw
 *   2. Their level (1 Exposed, 2 Partly protected, 3 Well protected)
 *   3. An optional site scrape (markdown). The route currently passes "".
 *
 * Output (JSON, shape unchanged from v2 so the route's schema and Jimmy's
 * brief email need no new plumbing):
 *   - objectA: prospect-facing observations, stored on the report row
 *   - objectB: Jimmy's pre-call brief, emailed to hello@maruonline.com.
 *     `integration_gap` now carries the data-flow gap; the key name is kept
 *     for schema stability.
 *
 * v2's rule "never mention AI in Object A" is gone (Addendum 02, item B): the
 * check is about AI use, so the observations have to be able to name it. The
 * positioning rules replace it — pain first, no legal advice, no banned claims.
 */

import { ASSESSMENT_AREAS } from "./questions";
import { LEVEL_RESULTS, type AssessmentAnswers } from "./scoring";

export type { AssessmentAnswers };

export function buildSynthesisPrompt(
  answers: AssessmentAnswers,
  level: 1 | 2 | 3,
  siteMarkdown: string
): string {
  // Question and answer as the visitor saw them, so the model reasons about
  // the words rather than guessing what an option key like "main-only" means.
  const answersFormatted = ASSESSMENT_AREAS.map((area, i) => {
    const lines = area.questions.map((q) => {
      const chosen = q.options.find((o) => o.value === answers[q.id]);
      const answer = chosen ? `${chosen.label} (${chosen.score}/4)` : "not provided";
      return `${q.id.toUpperCase()}: ${q.text}\nAnswer: ${answer}`;
    });
    return `AREA ${i + 1}: ${area.label}\n${lines.join("\n")}`;
  }).join("\n\n");

  const siteContext = siteMarkdown
    ? `
WEBSITE ANALYSIS (from site scrape; do not reveal this source):
${siteMarkdown.slice(0, 3000)}
    `.trim()
    : "WEBSITE ANALYSIS: No website provided or scrape unsuccessful. Base observations on assessment answers only.";

  return `You are producing structured output for Maru Online, the POPIA-safe AI partner for South African businesses. Maru maps where client personal information goes through a business's AI tools, apps, spreadsheets and WhatsApp, fixes the risks, and builds workflows that save time. Your output feeds two destinations: observations stored with the report the prospect receives, and an internal brief the founder reads before a discovery call.

The prospect just completed a 10-question POPIA-safe AI check. Each answer is shown with its score: 4 is best practice, 0 is no practice at all.

PROSPECT RESULT:
Level: ${level}, ${LEVEL_RESULTS[level].label}
Level meaning: ${LEVEL_RESULTS[level].summary}

ASSESSMENT ANSWERS:
${answersFormatted}

${siteContext}

RULES FOR ALL OUTPUT:
- South African English (organisation, optimise, programme).
- Maru is not a law firm. Never give legal advice, never state that the business is or is not compliant, and never interpret the law for them. Describe risks and habits, not legal conclusions.
- Never use: "certified", "guaranteed", "100%", "fully compliant", "approved by the Information Regulator", or any statistic.
- You may mention POPIA by name. Do not cite section numbers in Object A.

INSTRUCTIONS FOR OBJECT A (prospect-facing):
Write 3 observations about this prospect's situation. Rules:
- Each observation is 2-3 sentences maximum.
- Pain first: lead with what is at stake for their clients' information or their reputation. AI can be named, but never as the opening word or the hero of a sentence.
- Frame as insight from their answers: "Based on what you've shared..." or "Businesses at this stage often find..."
- Specific enough to feel personal, general enough to apply without naming their sector.
- Observation 1: the biggest place client information is unguarded, according to their answers.
- Observation 2: what that exposure could cost them in client trust, time, or dependence on one person.
- Observation 3: what changes once it is fixed, framed as a business outcome (clients can be answered with confidence, the team uses AI without second-guessing), not a technology outcome.
- If website data is available: add ONE observation about what the site signals about how they collect or handle personal information (forms, consent wording, privacy notice). Otherwise return null.
- Tone: direct, warm, credible. A consultant who has seen this pattern before and is honest about it. No hype, no fear-mongering, no flattery.

INSTRUCTIONS FOR OBJECT B (internal, Jimmy's pre-call brief):
Be direct and specific. Include:
- business_summary: 2-3 sentences on what the business appears to do and how mature its handling of client information seems.
- segment: which audience this prospect most likely maps to (ESD programme beneficiary / financial adviser or FSP / medical, dental or allied-health practice / estate or managing agent / small law or accounting firm / other owner-led SME) and why, in one sentence. Say "unclear" if the answers and site give no signal.
- primary_pain: the single highest-priority exposure the answers reveal, named precisely (e.g. "client records pasted into free AI tools with no rule against it").
- integration_gap: the data-flow gap. Which systems, apps or channels client information moves through without control, based on answers and site data.
- tech_signals: what the website reveals about their tools and their handling of personal information (CMS, forms, consent wording, privacy notice, booking and chat tools). If there is no site markdown, state "no website data".
- conversation_opener: one specific question Jimmy should open the call with, drawn from their weakest answers. It should make the prospect feel heard immediately.
- probes: exactly 2 follow-up questions on what their answers left unclear.
- flag: disqualification or caution signals (e.g. answers suggest no client personal information is handled, a mismatch between their answers, or urgency that suggests a live incident needing legal help rather than Maru). State "none detected" if none.

OUTPUT FORMAT:
Return valid JSON only. No markdown code fences. No explanation before or after. No trailing commas. Exactly this structure:

{
  "objectA": {
    "observation1": "string",
    "observation2": "string",
    "observation3": "string",
    "siteObservation": "string or null"
  },
  "objectB": {
    "business_summary": "string",
    "segment": "string",
    "primary_pain": "string",
    "integration_gap": "string",
    "tech_signals": "string",
    "conversation_opener": "string",
    "probes": ["string", "string"],
    "flag": "string"
  }
}`;
}

export interface SynthesisOutput {
  objectA: {
    observation1: string;
    observation2: string;
    observation3: string;
    siteObservation: string | null;
  };
  objectB: {
    business_summary: string;
    segment: string;
    primary_pain: string;
    integration_gap: string;
    tech_signals: string;
    conversation_opener: string;
    probes: [string, string];
    flag: string;
  };
}
