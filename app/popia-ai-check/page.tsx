"use client";

/**
 * Maru Online — POPIA AI check (assessment_v3)
 *
 * Flow:
 * Step "intro":    Framing (pre-assessment context)
 * Steps 0–9:       10 questions across 5 areas (2 per area)
 * Step "results":  Area-by-area score preview (ungated)
 * Step "gate":     Name + email + optional website + opt-in marketing consent
 * Step "done":     Confirmation — report sent
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { calculateScore, type AssessmentAnswers, type ScoreResult } from "@/lib/assessment/scoring";
import { ASSESSMENT_AREAS, ASSESSMENT_QUESTIONS } from "@/lib/assessment/questions";
import { BGPattern } from "@/components/ui/bg-pattern";
import Button from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { GUIDE_PATH, GUIDE_REQUESTED_STORAGE_KEY } from "@/lib/guides/config";

// ── Questions ──────────────────────────────────────────────────────────────
// Approved copy (Addendum 02 item B) lives in lib/assessment/questions.ts so
// scoring and the synthesis prompt read the same wording the visitor sees.

const questions = ASSESSMENT_QUESTIONS;
const areas = ASSESSMENT_AREAS.map((a, i) => ({ index: i + 1, label: a.label }));

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
  // POPIA s69: direct marketing needs a separate opt-in. Unticked by default,
  // and the report is sent whether or not it is ticked (Addendum 01, item D).
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [progress, setProgress]       = useState(0);
  // Entry 19 §11: hide the guide line on a device that already requested it.
  const [hasGuide, setHasGuide]       = useState(false);
  useEffect(() => {
    try {
      setHasGuide(localStorage.getItem(GUIDE_REQUESTED_STORAGE_KEY) === "1");
    } catch {
      /* storage blocked: keep showing the line */
    }
  }, []);

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
      // Every question has been answered by this point — the wizard only
      // advances on a selection.
      const result = calculateScore(newAnswers as AssessmentAnswers);
      setScoreResult(result);
      window.trackConversion?.("assessment_scored", {
        assessment_type: "popia_ai_check",
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
      const recaptchaToken = await executeRecaptcha("popia_ai_check");

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
            marketingConsent,
            recaptchaToken,
          }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }

      if (!response.ok) throw new Error("Submission failed");
      window.trackConversion?.("generate_lead", {
        assessment_type: "popia_ai_check",
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
    <div
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
            <span className="label-eyebrow">Exposure Check</span>
            <h1 className="text-3xl font-semibold text-navy leading-tight mb-4 border-none">
              Find out where your client information goes when your team uses AI.
            </h1>
            <p className="body-muted text-lg mb-8 leading-relaxed">
              10 questions across 5 areas. About 5 minutes.
            </p>

            <div className="bg-cyan-light border border-cyan/20 rounded-lg p-6 mb-6">
              <p className="text-ink-primary text-base font-medium leading-relaxed mb-3">
                You&apos;ll get a short report showing how your business rates in each of the five areas, and what to fix first.
              </p>
              <p className="text-ink-primary text-base font-medium leading-relaxed">
                Answer based on how things actually work today — not how you want them to work. The more honest your answers, the more useful your result.
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

            {/* Copy handover entry 19 §11 (approved 8 Oct), verbatim. */}
            {!hasGuide && (
              <p className="body-muted text-sm leading-relaxed mt-6 mb-0 text-center">
                Want the basics behind these questions?{" "}
                <Link href={GUIDE_PATH} className="text-cyan-ink underline hover:no-underline">
                  Read the guide.
                </Link>
              </p>
            )}
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

              {/* Addendum 01 item D — approved 26 Sep 2026. Separate, opt-in,
                  unticked: only a tick adds the contact to the marketing list. */}
              <label className="flex items-start gap-3 cursor-pointer min-h-[44px] py-1">
                <Checkbox
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-0.5"
                />
                <span className="text-sm text-ink-secondary leading-relaxed">
                  Also send me occasional notes on using AI safely under POPIA. Unsubscribe from any email.
                </span>
              </label>

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

              {/* POPIA s18 notice at the point of collection (Addendum 01 D). */}
              <p className="text-ink-tertiary text-xs text-center leading-relaxed">
                We use your name and email to send your report and to follow up about it. Nothing else. See our{" "}
                <Link href="/privacy-policy" className="text-cyan-ink underline hover:no-underline">
                  Privacy Policy
                </Link>
                .
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
              Check your inbox for a link to your report: your result in each of the five areas and a recommended next step.
            </p>

            <div className="bg-bg-canvas border border-border-default rounded-lg p-6 text-left mb-8">
              <p className="text-ink-primary font-semibold text-base mb-2">
                While you wait:
              </p>
              <p className="body-muted text-base leading-relaxed">
                The report will invite you to request a proposal. We then contact you to arrange a short call at a time that suits you, where we go through your assessment together and go deeper on what we find. If there&apos;s no clear opportunity, we&apos;ll tell you.
              </p>
            </div>

            <Link href="/" className="text-cyan-ink text-sm hover:underline">
              ← Back to Maru Online
            </Link>
          </div>
        )}
        </div>
      </div>
    </div>
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
  question: (typeof questions)[number];
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
