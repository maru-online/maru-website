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

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { calculateScore, SCORING_NOTE, type AssessmentAnswers, type ScoreResult } from "@/lib/assessment/scoring";
import { ASSESSMENT_AREAS, ASSESSMENT_QUESTIONS } from "@/lib/assessment/questions";
import DotField from "@/components/ui/DotField";
import Button from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { GUIDE_LIVE, GUIDE_REQUESTED_STORAGE_KEY, guideHref } from "@/lib/guides/config";

// ── Questions ──────────────────────────────────────────────────────────────
// Approved copy (Addendum 02 item B) lives in lib/assessment/questions.ts so
// scoring and the synthesis prompt read the same wording the visitor sees.

const questions = ASSESSMENT_QUESTIONS;
// Intro descriptions per area ("Maru Online — Revised Website Copy" v1.0,
// section 9). Keyed by area key so they stay with the right area if the
// question order changes.
const AREA_DESCRIPTIONS: Record<string, string> = {
  ai_use:        "How AI is used and where a person reviews or controls the outcome.",
  data_location: "Where client information is stored and shared.",
  access:        "Who can access client information.",
  permission:    "How people are informed and how relevant permission is handled.",
  incident:      "What happens if there is a data or information-handling incident.",
};
const areas = ASSESSMENT_AREAS.map((a, i) => ({
  index: i + 1,
  label: a.label,
  description: AREA_DESCRIPTIONS[a.key] ?? "",
}));

// ── Status display ─────────────────────────────────────────────────────────

const statusConfig = {
  critical:    { label: "Critical gap",     colour: "var(--color-danger)",   bg: "var(--color-danger-tint)",   border: "var(--color-danger-border)" },
  significant: { label: "Significant gap",  colour: "var(--color-danger)",   bg: "#FFFFFF",                    border: "var(--color-danger-border)" },
  partial:     { label: "Partly in place",  colour: "var(--color-cyan-ink)", bg: "var(--color-cyan-light)",    border: "var(--color-cyan-ink)" },
  strong:      { label: "Largely in place", colour: "var(--color-success)",  bg: "var(--color-success-tint)",  border: "var(--color-success-border)" },
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
  const [followUpConsent, setFollowUpConsent] = useState(false);
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

  // Each step replaces the last inside one page, so the scroll position of the
  // button just pressed would carry over (the intro's Start button sits low, and
  // the next screen opened near the footer). Return to the top of the card on
  // every step change, and move focus there for keyboard and screen-reader users.
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    cardRef.current?.focus({ preventScroll: true });
  }, [step]);

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
            followUpConsent,
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
      style={{ background: "var(--color-bg-secondary)" }}
    >
      {/* Light ground with faint dots (Open Flow, 4 Nov 2026; was a grid). */}
      <DotField tone="light" mask="edges" coverage={0.42} intensity={0.6} seed={4} className="z-0" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div ref={cardRef} tabIndex={-1} className="card-lift card-static font-normal p-6 sm:p-8 md:p-12 outline-none">
        {step !== "intro" && step !== "done" && (
          <div className="mb-8" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Review progress">
            <p className="text-base font-semibold text-ink-primary mb-3">
              {typeof step === "number" ? `Question ${step + 1} of ${questions.length}` : step === "results" ? "Your result" : "Last step"}
            </p>
            <div className="h-2 w-full rounded-full" style={{ background: "var(--color-border-default)" }}>
              <div className="h-full rounded-full transition-[width] duration-500 ease-out" style={{ width: `${progress}%`, background: "var(--color-cyan-ink)" }} />
            </div>
          </div>
        )}
        {/* ── INTRO ─────────────────────────────────────────────────────── */}
        {step === "intro" && (
          <div className="animate-fade-in">
            <span className="label-eyebrow label-eyebrow-ink">Free, informational POPIA review</span>
            <h1 className="text-3xl md:text-4xl font-semibold text-navy leading-tight mb-5 border-none">
              Understand how your business handles information when your team uses AI.
            </h1>
            <p className="text-xl text-ink-primary mb-4 leading-relaxed">
              Answer 10 questions in about five minutes to receive a report showing your score across five areas, with actions to prioritise.
            </p>
            <p className="text-lg text-ink-secondary mb-3 leading-relaxed">
              Designed for South African businesses exploring or already using AI.
            </p>
            <p className="text-base text-ink-secondary mb-8 leading-relaxed">
              This is an informational review, not legal advice or a formal compliance opinion.
            </p>

            <div className="bg-cyan-light rounded-lg p-6 mb-8" style={{ borderLeft: "4px solid var(--color-cyan-ink)" }}>
              <h2 className="text-ink-primary text-lg font-semibold leading-snug mb-2 border-none">
                Answer based on what happens today.
              </h2>
              <p className="text-ink-primary text-lg leading-relaxed">
                Answer for how your business works today, not how you would like it to work. The more honest your answers, the more useful your result will be.
              </p>
            </div>

            {/* Area preview */}
            <ol className="grid grid-cols-1 gap-3 mb-10 list-none p-0">
              {areas.map((a) => (
                <li
                  key={a.index}
                  className="flex items-start gap-4 bg-white rounded-xl px-5 py-4"
                  style={{ border: "1.5px solid var(--color-border-strong)" }}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-light text-cyan-ink text-base font-semibold"
                  >
                    {a.index}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-ink-primary text-lg font-semibold leading-snug">{a.label}</span>
                    {a.description && (
                      <span className="text-ink-secondary text-base leading-relaxed">{a.description}</span>
                    )}
                  </span>
                </li>
              ))}
            </ol>

            <h2 className="text-navy text-xl font-semibold leading-snug mb-2 border-none">
              What your report contains.
            </h2>
            <p className="text-lg text-ink-secondary mb-8 leading-relaxed">
              Your report will highlight the areas that may need attention and suggest which actions to prioritise first. It is intended to help you identify questions for further investigation.
            </p>

            <Button
              onClick={handleStart}
              variant="primary"
            >
              Start the free review
            </Button>
          </div>
        )}

        {/* ── QUESTIONS ─────────────────────────────────────────────────── */}
        {typeof step === "number" && step < questions.length && (
          <QuestionStep
            key={step}
            question={questions[step]}
            onAnswer={(value) => handleAnswer(questions[step].id, value)}
          />
        )}

        {/* ── RESULTS PREVIEW ───────────────────────────────────────────── */}
        {step === "results" && scoreResult && (
          <div className="animate-fade-in">
            <span className="label-eyebrow label-eyebrow-ink">Your result</span>
            <h2 className="text-3xl font-semibold text-navy mb-3 border-none">
              {scoreResult.label}
            </h2>
            <p className="text-lg text-ink-secondary mb-8 leading-relaxed">
              {scoreResult.tagline}
            </p>

            {/* Area scores */}
            <div className="space-y-3 mb-8">
              {scoreResult.areas.map((area) => {
                const cfg = statusConfig[area.status];
                return (
                  <div
                    key={area.areaKey}
                    className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-xl px-5 py-4 bg-white"
                    style={{ border: "1.5px solid var(--color-border-strong)" }}
                  >
                    <span className="text-ink-primary text-lg font-semibold leading-snug">{area.area}</span>
                    <span
                      className="self-start text-base font-semibold px-4 py-1.5 rounded-full border whitespace-nowrap"
                      style={{ color: cfg.colour, background: cfg.bg, borderColor: cfg.border }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-base text-ink-secondary leading-relaxed mb-8">{SCORING_NOTE}</p>

            <div className="bg-cyan-light rounded-lg p-6 mb-8" style={{ borderLeft: "4px solid var(--color-cyan-ink)" }}>
              <p className="text-ink-primary text-lg font-semibold mb-2">
                Your report goes deeper.
              </p>
              <p className="text-ink-primary text-lg leading-relaxed">
                It breaks down each area: what your answers reveal, the specific issues, and a recommended approach for your stage of business. Enter your details below to receive it.
              </p>
            </div>

            <Button
              onClick={() => setStep("gate")}
              variant="primary"
              className="w-full"
            >
              Get my free report
            </Button>

            {/* Copy handover entry 19 §11 (approved 8 Oct), verbatim. */}
            {GUIDE_LIVE && !hasGuide && (
              <p className="text-ink-secondary text-base leading-relaxed mt-6 mb-0 text-center">
                Want the basics behind these questions?{" "}
                <Link href={guideHref("review")} className="text-cyan-ink underline hover:no-underline">
                  Get the guide.
                </Link>
              </p>
            )}
          </div>
        )}

        {/* ── EMAIL GATE ────────────────────────────────────────────────── */}
        {step === "gate" && (
          <div className="animate-fade-in">
            <span className="label-eyebrow label-eyebrow-ink">Your report</span>
            <h2 className="text-3xl font-semibold text-navy mb-3 border-none">
              Where should we send it?
            </h2>
            <p className="text-lg text-ink-secondary mb-8 leading-relaxed">
              We will email you a link to your report: a page showing your findings across all five areas, with actions to prioritise.
            </p>

            <form onSubmit={handleGateSubmit} className="space-y-5">
              <div>
                <label className="block text-base font-semibold text-ink-primary mb-2">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First name is fine"
                  required
                  className="w-full rounded-xl bg-white px-4 py-3.5 text-lg text-ink-primary placeholder-ink-tertiary outline-none transition-colors focus:border-cyan-ink focus-visible:ring-2 focus-visible:ring-cyan border-[1.5px] border-ink-tertiary"
                />
              </div>

              <div>
                <label className="block text-base font-semibold text-ink-primary mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourbusiness.com"
                  required
                  className="w-full rounded-xl bg-white px-4 py-3.5 text-lg text-ink-primary placeholder-ink-tertiary outline-none transition-colors focus:border-cyan-ink focus-visible:ring-2 focus-visible:ring-cyan border-[1.5px] border-ink-tertiary"
                />
              </div>

              <div>
                <label className="block text-base font-semibold text-ink-primary mb-2">
                  Business website{" "}
                  <span className="font-normal text-ink-secondary">(optional — helps us personalise your report)</span>
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="yourbusiness.com"
                  className="w-full rounded-xl bg-white px-4 py-3.5 text-lg text-ink-primary placeholder-ink-tertiary outline-none transition-colors focus:border-cyan-ink focus-visible:ring-2 focus-visible:ring-cyan border-[1.5px] border-ink-tertiary"
                />
              </div>

              {/* Follow-up consent (6 Nov 2026). Separate and unticked: ticking is
                  never needed to get the report, and only a tick lets us send the
                  one follow-up email about the results (POPIA s69, no silent opt-in). */}
              <label className="flex items-start gap-3 cursor-pointer min-h-[44px] py-1">
                <Checkbox
                  checked={followUpConsent}
                  onChange={(e) => setFollowUpConsent(e.target.checked)}
                  className="mt-0.5 border-[var(--color-ink-tertiary)]"
                />
                <span className="text-base text-ink-primary leading-relaxed">
                  Email me once, in about two days, to ask whether I would like to talk through my results.
                </span>
              </label>

              {/* Addendum 01 item D — approved 26 Sep 2026. Separate, opt-in,
                  unticked: only a tick adds the contact to the marketing list. */}
              <label className="flex items-start gap-3 cursor-pointer min-h-[44px] py-1">
                <Checkbox
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-0.5 border-[var(--color-ink-tertiary)]"
                />
                <span className="text-base text-ink-primary leading-relaxed">
                  Also send me occasional notes on using AI safely under POPIA. Unsubscribe from any email.
                </span>
              </label>

              {submitError && (
                <p className="text-danger text-base font-medium" role="alert">{submitError}</p>
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
              <p className="text-ink-secondary text-sm text-center leading-relaxed">
                We use your name and email to send your report. If you tick the first box, we also use them to email you once about your results. Some of our providers process information outside South Africa, as our{" "}
                <Link href="/privacy-policy" className="text-cyan-ink underline hover:no-underline">
                  Privacy Policy
                </Link>{" "}
                explains.
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

            <h2 className="text-3xl font-semibold text-navy mb-4 border-none">
              Thank you.
            </h2>
            <p className="text-lg text-ink-primary leading-relaxed mb-4 max-w-md mx-auto">
              {followUpConsent
                ? "Your report is on its way. We will reach out to you by email in about two days to see if you would like to talk through your results."
                : "Your report is on its way."}
            </p>
            <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-md mx-auto">
              {followUpConsent ? "If you would like to get in touch sooner, email us at" : "If you would like to talk through your results, email us at"}{" "}
              <a href="mailto:hello@maruonline.com" className="text-cyan-ink underline hover:no-underline">
                hello@maruonline.com
              </a>
              .
            </p>

            <Link href="/" className="text-cyan-ink text-base font-medium hover:underline">
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
  onAnswer,
}: {
  question: (typeof questions)[number];
  onAnswer: (value: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(value: string) {
    setSelected(value);
    setTimeout(() => onAnswer(value), 200);
  }

  return (
    <div className="animate-fade-in">
      <p className="label-eyebrow label-eyebrow-ink" style={{ marginBottom: "0.75rem" }}>
        Area {question.areaIndex} of 5: {question.area}
      </p>

      <h2 className="text-2xl md:text-3xl font-semibold text-navy leading-snug mb-8 border-none">
        {question.text}
      </h2>

      <div className="space-y-3" role="group" aria-label="Choose the answer that fits best">
        {question.options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              aria-pressed={isSelected}
              className={`w-full text-left flex items-start gap-4 rounded-xl px-5 py-4 md:py-5 text-lg font-medium leading-snug text-ink-primary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan border-2 ${
                isSelected
                  ? "border-cyan-ink bg-cyan-light"
                  : "border-ink-tertiary bg-white hover:border-cyan-ink hover:bg-cyan-light"
              }`}
            >
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-cyan-ink" : "border-ink-tertiary"
                }`}
              >
                {isSelected && <span className="h-3 w-3 rounded-full bg-cyan-ink" />}
              </span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
