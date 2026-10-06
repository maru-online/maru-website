/**
 * Maru Online — POPIA AI check: scoring logic (assessment_v3)
 *
 * The questions, answers and scores live in questions.ts (COPY-DECK-ADDENDUM-02
 * item B, approved as written 26 Sep 2026). The level labels and summaries
 * below are from the same addendum. Do not reword here; change the addendum
 * first.
 *
 * 10 questions across 5 areas (2 per area). Each answer scores 4 / 2 / 1 / 0
 * from best to worst, and each area is the rounded mean of its two answers:
 *   0–1 = Critical gap
 *   2   = Significant gap
 *   3   = Partial
 *   4   = Strong
 *
 * Overall level (1–3) from the average area score — thresholds unchanged
 * from v2:
 *   ≤ 1.5 = Level 1 — Exposed
 *   ≤ 2.8 = Level 2 — Partly protected
 *   > 2.8 = Level 3 — Well protected
 *
 * v2 (the operations assessment) is retired. Its reports are stored with their
 * computed areas and label, so nothing re-scores them; reportTemplates.ts keeps
 * the v2 copy so those links still render.
 */

import { ASSESSMENT_AREAS, ASSESSMENT_QUESTIONS, type QuestionId } from "./questions";

export const ASSESSMENT_VERSION = "assessment_v3" as const;

export type ReadinessLevel = 1 | 2 | 3;
export type AreaStatus = "critical" | "significant" | "partial" | "strong";

export interface AreaResult {
  area: string;
  areaKey: string;
  score: number;          // 0–4
  status: AreaStatus;
  answers: string[];      // raw answer values for this area
}

export interface ScoreResult {
  level: ReadinessLevel;
  label: string;
  tagline: string;
  summary: string;
  areas: AreaResult[];
  overallScore: number;   // 0–10 normalised
  segmentB: boolean;
  painTag: string;
}

export type AssessmentAnswers = Record<QuestionId, string>;

// ── Area definitions ───────────────────────────────────────────────────────

export const AREAS = ASSESSMENT_AREAS.map((a) => ({
  key: a.key,
  label: a.label,
  questions: a.questions.map((q) => q.id),
}));

// ── Scoring maps (derived, so a question can't drift from its score) ──────

const SCORE_MAPS = Object.fromEntries(
  ASSESSMENT_QUESTIONS.map((q) => [
    q.id,
    Object.fromEntries(q.options.map((o) => [o.value, o.score])),
  ]),
) as Record<QuestionId, Record<string, number>>;

/**
 * True only when every question has an answer this version recognises. The
 * submit route rejects anything else rather than silently scoring unknown
 * values — a stale tab still holding v2 answers would otherwise score every
 * area as a critical gap and email that as the result.
 */
export function isValidAnswerSet(answers: unknown): answers is AssessmentAnswers {
  if (!answers || typeof answers !== "object") return false;
  const a = answers as Record<string, unknown>;
  return ASSESSMENT_QUESTIONS.every(
    (q) => typeof a[q.id] === "string" && Object.hasOwn(SCORE_MAPS[q.id], a[q.id] as string),
  );
}

// ── Level copy (Addendum 02, "Result levels") ─────────────────────────────

export const LEVEL_RESULTS: Record<ReadinessLevel, { label: string; summary: string }> = {
  1: {
    label: "Exposed",
    summary: "Client information is moving through tools and people with no guard rails yet. The first fixes are quick and cheap.",
  },
  2: {
    label: "Partly protected",
    summary: "You have some good habits, with gaps where AI tools, WhatsApp and old logins meet client data.",
  },
  3: {
    label: "Well protected",
    summary: "Your foundations are sound. The work now is keeping them sound as you add AI.",
  },
};

/** Addendum 02: "Every report ends:" The rebuild has no paid audit (copy handover entry 13), so the audit sentence is dropped. 6 Oct 2026. */
export const REPORT_CLOSING_LINE =
  "This check is a starting point, not legal advice.";

// ── Status thresholds ──────────────────────────────────────────────────────

function areaStatus(score: number): AreaStatus {
  if (score <= 1) return "critical";
  if (score <= 2) return "significant";
  if (score <= 3) return "partial";
  return "strong";
}

// ── Main scoring function ──────────────────────────────────────────────────

export function calculateScore(answers: AssessmentAnswers): ScoreResult {
  const areas: AreaResult[] = AREAS.map(({ key, label, questions: [qa, qb] }) => {
    const score = Math.round(
      ((SCORE_MAPS[qa][answers[qa]] ?? 1) + (SCORE_MAPS[qb][answers[qb]] ?? 1)) / 2,
    );
    return {
      area: label,
      areaKey: key,
      score,
      status: areaStatus(score),
      answers: [answers[qa], answers[qb]],
    };
  });

  const avgScore = areas.reduce((sum, a) => sum + a.score, 0) / areas.length;
  const overallScore = Math.round((avgScore / 4) * 10);

  let level: ReadinessLevel;
  if (avgScore <= 1.5) level = 1;
  else if (avgScore <= 2.8) level = 2;
  else level = 3;

  const { label, summary } = LEVEL_RESULTS[level];

  return {
    level,
    label,
    // Addendum 02 gives one line per level; it serves as both the on-screen
    // tagline and the report summary.
    tagline: summary,
    summary,
    areas,
    overallScore,
    // v2's Segment B came from a "prior improvement attempt" question that v3
    // does not ask. Kept on the type so stored v2 reports still type-check.
    segmentB: false,
    painTag: "pain:popia",
  };
}
