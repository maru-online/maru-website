"use client";

/**
 * Maru Online — Operations Assessment Page (v2)
 *
 * Flow:
 * Step "intro":    Framing (pre-assessment context)
 * Steps 0–9:       10 questions across 5 operational areas (2 per area)
 * Step "results":  Area-by-area score preview (ungated)
 * Step "gate":     Name + email + optional website
 * Step "done":     Confirmation — report sent
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { calculateScore, type ScoreResult } from "@/lib/assessment/scoring";
import { BGPattern } from "@/components/ui/bg-pattern";
import Button from "@/components/ui/Button";

// ── Question definitions ───────────────────────────────────────────────────

const questions = [
  // ── Area 1: Process & Workflow ──────────────────────────────────────────
  {
    id: "q1",
    area: "Process & Workflow",
    areaIndex: 1,
    text: "How would you describe the way work actually gets done in your business day-to-day?",
    options: [
      { value: "documented-consistent", label: "We have documented steps and the team follows them consistently" },
      { value: "exist-vary",            label: "We have processes but they vary depending on who is handling it" },
      { value: "recurring-problems",    label: "Things get done but we keep solving the same problems repeatedly" },
      { value: "ad-hoc",                label: "It's ad hoc — whoever is available figures it out as they go" },
    ],
  },
  {
    id: "q2",
    area: "Process & Workflow",
    areaIndex: 1,
    text: "What happens when a key team member is unexpectedly unavailable for a week?",
    options: [
      { value: "documented-covered",    label: "Someone else picks it up without skipping a beat — it's all documented" },
      { value: "scramble-covered",      label: "It usually gets covered but there's significant scrambling" },
      { value: "significant-slowdown",  label: "Things slow down significantly until they're back" },
      { value: "stalls-completely",     label: "It stalls — only they know how to handle their area" },
    ],
  },
  // ── Area 2: Data & Information Flow ────────────────────────────────────
  {
    id: "q3",
    area: "Data & Information Flow",
    areaIndex: 2,
    text: "Where does your business data live — customer records, job status, financials, communications?",
    options: [
      { value: "connected-central",    label: "Mostly in one central system — our tools are connected and talk to each other" },
      { value: "few-tools-manual",     label: "In a few separate tools — we move data between them manually when needed" },
      { value: "scattered-no-source",  label: "Spread across email, spreadsheets, and WhatsApp — no single source of truth" },
      { value: "heads-and-notes",      label: "Mostly in people's heads and informal notes" },
    ],
  },
  {
    id: "q4",
    area: "Data & Information Flow",
    areaIndex: 2,
    text: "How often does information in your business get lost, re-entered, or entered incorrectly?",
    options: [
      { value: "rarely-caught",          label: "Rarely — our systems catch errors and we have checks in place" },
      { value: "occasionally-caught",    label: "Occasionally — we usually catch it before it causes a real problem" },
      { value: "regularly-frustrating",  label: "Regularly — it's a source of frustration and wasted time" },
      { value: "constant-major-issue",   label: "All the time — it's one of our biggest day-to-day issues" },
    ],
  },
  // ── Area 3: Client & Lead Management ───────────────────────────────────
  {
    id: "q5",
    area: "Client & Lead Management",
    areaIndex: 3,
    text: "When a new enquiry or lead comes in, what actually happens next?",
    options: [
      { value: "defined-automatic",   label: "It enters a defined process — automatically logged, assigned, and followed up" },
      { value: "process-person-dep",  label: "We have a process but it depends on who's available to action it" },
      { value: "personal-varies",     label: "Someone handles it personally — how well depends on their current capacity" },
      { value: "reactive",            label: "It's reactive — we respond when we see it or someone flags it to us" },
    ],
  },
  {
    id: "q6",
    area: "Client & Lead Management",
    areaIndex: 3,
    text: "How confident are you that every lead gets followed up consistently — not just when it's convenient?",
    options: [
      { value: "systematic-tracked",    label: "Very — follow-up is systematic and we track where every lead sits" },
      { value: "reasonably-some-gaps",  label: "Reasonably — most leads get follow-up but some slip through" },
      { value: "memory-based",          label: "Not very — follow-up depends on memory or whoever has capacity at the time" },
      { value: "losing-leads-no-fix",   label: "Not at all — we know we're losing leads but haven't fixed the process" },
    ],
  },
  // ── Area 4: Visibility & Reporting ─────────────────────────────────────
  {
    id: "q7",
    area: "Visibility & Reporting",
    areaIndex: 4,
    text: "How do you get a current view of how the business is actually performing?",
    options: [
      { value: "automatic-dashboard",  label: "From a dashboard or tool that updates automatically" },
      { value: "manual-reports",       label: "By pulling reports from our systems — takes some manual effort each time" },
      { value: "asking-checking",      label: "By asking the team or checking across different tools separately" },
      { value: "instinct-experience",  label: "Mostly from instinct and experience — no formal process" },
    ],
  },
  {
    id: "q8",
    area: "Visibility & Reporting",
    areaIndex: 4,
    text: "When something goes wrong in the business, how do you typically find out?",
    options: [
      { value: "systems-flag-early",  label: "Our systems flag it before it becomes a real problem" },
      { value: "checkin-review",      label: "It comes up during a team check-in or scheduled review" },
      { value: "told-after-fact",     label: "A client or team member tells us — usually after the fact" },
      { value: "damage-done",         label: "We often only find out once the damage is already done" },
    ],
  },
  // ── Area 5: People & Dependency ────────────────────────────────────────
  {
    id: "q9",
    area: "People & Dependency",
    areaIndex: 5,
    text: "How reliant is your business on specific individuals to keep day-to-day operations running?",
    options: [
      { value: "low-any-trained",          label: "Low — most processes can be handled by any trained team member" },
      { value: "moderate-coverable",       label: "Moderate — some roles are critical but most things can be covered" },
      { value: "high-few-hold-knowledge",  label: "High — a few people hold most of the operational knowledge" },
      { value: "very-high-critical",       label: "Very high — if one or two people left, the business would struggle significantly" },
    ],
  },
  {
    id: "q10",
    area: "People & Dependency",
    areaIndex: 5,
    text: "Have you made a deliberate attempt to improve or systematise how your business operates?",
    options: [
      { value: "no-not-priority",      label: "No — it hasn't been a priority until now" },
      { value: "internal-not-far",     label: "Yes — we've worked on it internally but haven't got far" },
      { value: "external-fell-short",  label: "Yes — we brought someone in to help but it didn't fully deliver" },
      { value: "partial-needs-work",   label: "Yes — we have systems in place but they need to work better" },
    ],
  },
];

// ── Area metadata ──────────────────────────────────────────────────────────

const areas = [
  { index: 1, label: "Process & Workflow" },
  { index: 2, label: "Data & Information Flow" },
  { index: 3, label: "Client & Lead Management" },
  { index: 4, label: "Visibility & Reporting" },
  { index: 5, label: "People & Dependency" },
];

// ── Status display ─────────────────────────────────────────────────────────

const statusConfig = {
  critical:    { label: "Critical gap",    colour: "#E53E3E", bg: "#FFF5F5", border: "#FC8181" },
  significant: { label: "Significant gap", colour: "#C05621", bg: "#FFFAF0", border: "#F6AD55" },
  partial:     { label: "Partial",         colour: "#2F855A", bg: "#F0FFF4", border: "#68D391" },
  strong:      { label: "Strong",          colour: "#2B6CB0", bg: "#EBF8FF", border: "#63B3ED" },
};

// ── Types ──────────────────────────────────────────────────────────────────

type Answers = Record<string, string>;
type Step = "intro" | number | "results" | "gate" | "done";

// ── Component ──────────────────────────────────────────────────────────────

/**
 * The wizard itself. Must render inside GoogleReCaptchaProvider (see the
 * default export below) — useGoogleReCaptcha returns an undefined
 * executeRecaptcha outside a provider, which is how this silently started
 * posting an empty token and 400ing on every submission.
 */
function AssessmentWizard() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [step, setStep]               = useState<Step>("intro");
  const [answers, setAnswers]         = useState<Answers>({});
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [name, setName]               = useState("");
  const [email, setEmail]             = useState("");
  const [website, setWebsite]         = useState("");
  const [submitting, setSubmitting]   = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [progress, setProgress]       = useState(0);

  useEffect(() => {
    if (step === "intro")          setProgress(0);
    else if (typeof step === "number") setProgress(((step + 1) / questions.length) * 75);
    else if (step === "results")   setProgress(85);
    else if (step === "gate")      setProgress(95);
    else if (step === "done")      setProgress(100);
  }, [step]);

  function handleStart() { setStep(0); }

  function handleAnswer(questionId: string, value: string) {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    const currentIndex = typeof step === "number" ? step : 0;
    const nextIndex = currentIndex + 1;

    if (nextIndex >= questions.length) {
      const result = calculateScore({
        q1: newAnswers.q1,   q2: newAnswers.q2,
        q3: newAnswers.q3,   q4: newAnswers.q4,
        q5: newAnswers.q5,   q6: newAnswers.q6,
        q7: newAnswers.q7,   q8: newAnswers.q8,
        q9: newAnswers.q9,   q10: newAnswers.q10,
      });
      setScoreResult(result);
      window.trackConversion?.("assessment_scored", {
        assessment_type: "operations",
      });
      setStep("results");
    } else {
      setStep(nextIndex);
    }
  }

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      // The API rejects a missing/empty token with a 400, so fail loudly here
      // rather than posting an empty one and surfacing it as a generic error.
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA not ready");
      }
      const recaptchaToken = await executeRecaptcha("operations_assessment");

      // The route now stores the report and answers immediately, deferring the
      // Claude synthesis and the emails to a background pass, so this should
      // return in about a second. The abort still matters: without one, a
      // connection that drops the response leaves the promise unsettled forever
      // and the button sits on "Sending your report…" with no way back, while
      // the server has already done the work.
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20_000);

      let response: Response;
      try {
        response = await fetch("/api/assessment/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers,
            name: name.trim(),
            email: email.trim(),
            website: website.trim() || undefined,
            recaptchaToken,
          }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }

      if (!response.ok) throw new Error("Submission failed");
      window.trackConversion?.("generate_lead", {
        assessment_type: "operations",
      });
      setStep("done");
    } catch (err) {
      // A timed-out request usually means the server finished and the response
      // was lost in transit, so do not tell the visitor it failed — that invites
      // a resubmit, which bills another synthesis and sends a second email.
      const timedOut = err instanceof DOMException && err.name === "AbortError";
      setSubmitError(
        timedOut
          ? "This is taking longer than usual. Your report may already be on its way — check your email in a few minutes before trying again."
          : "Something went wrong. Please try again or email hello@maruonline.com directly.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <main
      className="relative min-h-screen flex items-center text-ink-primary"
      style={{ background: "var(--gradient-surface)" }}
    >
      <BGPattern
        variant="grid"
        mask="none"
        size={40}
        fill="rgba(61, 184, 198, 0.05)"
        className="z-0"
      />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-bg-secondary">
        <div
          className="h-full bg-cyan transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-20">
        <div className="card-lift p-8 md:p-12">
        {/* ── INTRO ─────────────────────────────────────────────────────── */}
        {step === "intro" && (
          <div className="animate-fade-in">
            <span className="label-eyebrow">Operations Assessment</span>
            <h1 className="text-3xl font-semibold text-navy leading-tight mb-4 border-none">
              Find out where your business is losing time and money to manual processes.
            </h1>
            <p className="body-muted text-lg mb-8 leading-relaxed">
              10 questions across 5 operational areas. About 3 minutes.
            </p>

            <div className="bg-cyan-light border border-cyan/20 rounded-lg p-6 mb-6">
              <p className="text-ink-primary text-base font-medium leading-relaxed mb-3">
                Answer based on how things actually work today — not how you want them to work. The more honest your answers, the more useful your result.
              </p>
              <p className="body-muted text-base leading-relaxed">
                You will receive a structured report showing how your business rates across five areas: process, data flow, lead management, visibility, and people dependency — along with a recommended approach specific to where you sit.
              </p>
            </div>

            {/* Area preview */}
            <div className="grid grid-cols-1 gap-2 mb-8">
              {areas.map((a) => (
                <div
                  key={a.index}
                  className="flex items-center gap-3 bg-bg-canvas border border-border-default rounded-lg px-4 py-3"
                >
                  <span className="text-xs font-mono text-cyan-ink w-4">{a.index}</span>
                  <span className="text-ink-secondary text-sm">{a.label}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={handleStart}
              variant="primary"
            >
              Start the assessment
            </Button>
          </div>
        )}

        {/* ── QUESTIONS ─────────────────────────────────────────────────── */}
        {typeof step === "number" && step < questions.length && (
          <QuestionStep
            key={step}
            question={questions[step]}
            questionNumber={step + 1}
            totalQuestions={questions.length}
            onAnswer={(value) => handleAnswer(questions[step].id, value)}
          />
        )}

        {/* ── RESULTS PREVIEW ───────────────────────────────────────────── */}
        {step === "results" && scoreResult && (
          <div className="animate-fade-in">
            <span className="label-eyebrow">Your result</span>
            <h2 className="text-2xl font-semibold text-navy mb-2 border-none">
              {scoreResult.label}
            </h2>
            <p className="body-muted text-base mb-8 leading-relaxed">
              {scoreResult.tagline}
            </p>

            {/* Area scores */}
            <div className="space-y-3 mb-8">
              {scoreResult.areas.map((area) => {
                const cfg = statusConfig[area.status];
                return (
                  <div
                    key={area.areaKey}
                    className="flex items-center justify-between rounded-lg px-5 py-4 border border-border-default bg-bg-canvas"
                  >
                    <span className="text-ink-primary text-sm font-medium">{area.area}</span>
                    <span
                      className="text-xs font-mono px-3 py-1 rounded-full border"
                      style={{ color: cfg.colour, background: cfg.bg, borderColor: cfg.border }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="bg-cyan-light border border-cyan/20 rounded-lg p-6 mb-8">
              <p className="text-ink-primary font-semibold mb-2">
                Your detailed report goes deeper.
              </p>
              <p className="body-muted text-base leading-relaxed">
                It breaks down each area — what your answers reveal, the specific issues, and a recommended approach for your stage of business. Enter your details below to receive it.
              </p>
            </div>

            <Button
              onClick={() => setStep("gate")}
              variant="primary"
              className="w-full"
            >
              Get my free detailed report
            </Button>
          </div>
        )}

        {/* ── EMAIL GATE ────────────────────────────────────────────────── */}
        {step === "gate" && (
          <div className="animate-fade-in">
            <span className="label-eyebrow">Your report</span>
            <h2 className="text-2xl font-semibold text-navy mb-2 border-none">
              Where should we send it?
            </h2>
            <p className="body-muted text-base mb-8 leading-relaxed">
              We will email you a link to your personalised report — a structured page showing your findings across all five areas with a recommended next step.
            </p>

            <form onSubmit={handleGateSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-ink-primary mb-2">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First name is fine"
                  required
                  className="w-full rounded-xl border border-border-default bg-bg-canvas px-4 py-3 text-sm text-ink-primary placeholder-ink-tertiary outline-none transition focus:border-cyan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-primary mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourbusiness.com"
                  required
                  className="w-full rounded-xl border border-border-default bg-bg-canvas px-4 py-3 text-sm text-ink-primary placeholder-ink-tertiary outline-none transition focus:border-cyan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-primary mb-2">
                  Business website{" "}
                  <span className="font-normal text-ink-tertiary">(optional — helps us personalise your report)</span>
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="yourbusiness.com"
                  className="w-full rounded-xl border border-border-default bg-bg-canvas px-4 py-3 text-sm text-ink-primary placeholder-ink-tertiary outline-none transition focus:border-cyan"
                />
              </div>

              {submitError && (
                <p className="text-danger text-sm">{submitError}</p>
              )}

              <Button
                type="submit"
                disabled={submitting}
                variant="primary"
                className="w-full mt-2"
              >
                {submitting ? "Sending your report..." : "Send my report"}
              </Button>

              <p className="text-ink-tertiary text-xs text-center leading-relaxed">
                No spam. Unsubscribe any time.
              </p>
            </form>
          </div>
        )}

        {/* ── DONE ──────────────────────────────────────────────────────── */}
        {step === "done" && (
          <div className="animate-fade-in text-center">
            <div className="inline-block bg-cyan-light border border-cyan/20 rounded-full p-6 mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="var(--color-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h2 className="text-2xl font-semibold text-navy mb-3 border-none">
              Your report is on its way.
            </h2>
            <p className="body-muted text-base leading-relaxed mb-8 max-w-md mx-auto">
              Check your inbox for a link to your personalised report — your findings across all five operational areas and a recommended next step.
            </p>

            <div className="bg-bg-canvas border border-border-default rounded-lg p-6 text-left mb-8">
              <p className="text-ink-primary font-semibold text-base mb-2">
                While you wait:
              </p>
              <p className="body-muted text-base leading-relaxed">
                The report will invite you to book a free 30-minute discovery call. That is where we review your assessment together, go deeper on what we find, and tell you honestly whether a full POPIA-Safe AI Audit makes sense for your business right now.
              </p>
            </div>

            <Link href="/" className="text-cyan-ink text-sm hover:underline">
              ← Back to Maru Online
            </Link>
          </div>
        )}
        </div>
      </div>
    </main>
  );
}

// ── Question Step Component ────────────────────────────────────────────────

export default function AssessmentPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
    >
      <AssessmentWizard />
    </GoogleReCaptchaProvider>
  );
}

function QuestionStep({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: {
  question: typeof questions[0];
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (value: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(value: string) {
    setSelected(value);
    setTimeout(() => onAnswer(value), 200);
  }

  const isFirstInArea = questionNumber % 2 === 1; // questions 1,3,5,7,9 are first in each area

  return (
    <div className="animate-fade-in">
      {/* Area label — show on first question of each pair */}
      {isFirstInArea && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
          <p className="text-xs font-mono text-cyan-ink tracking-widest uppercase">
            Area {question.areaIndex} of 5 — {question.area}
          </p>
        </div>
      )}
      {!isFirstInArea && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-ink-tertiary/30" />
          <p className="text-xs font-mono text-ink-tertiary tracking-widest uppercase">
            {question.area}
          </p>
        </div>
      )}

      <p className="text-xs font-mono text-ink-tertiary tracking-widest uppercase mb-4">
        Question {questionNumber} of {totalQuestions}
      </p>

      <h2 className="text-xl font-semibold text-navy leading-snug mb-6 border-none">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`w-full text-left border rounded-lg px-5 py-4 text-base font-medium leading-relaxed transition-all cursor-pointer ${
              selected === option.value
                ? "border-cyan text-ink-primary bg-cyan/10"
                : "border-border-default text-ink-secondary bg-bg-canvas hover:border-cyan hover:bg-cyan/5 hover:text-cyan-ink"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
