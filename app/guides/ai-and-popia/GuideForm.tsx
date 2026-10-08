"use client";

/**
 * Guide request form + thank-you state. Copy handover entry 19 §2–§4,
 * verbatim (approved for preview build 8 Oct 2026).
 *
 * - No CAPTCHA: §3 rules out a third-party script before consent. Spam control
 *   is the honeypot below plus server-side rate limits.
 * - The marketing box is separate, unticked, optional, and never a condition
 *   of getting the guide (§3).
 * - The download button works from the thank-you state whether or not the
 *   email has arrived (§4).
 */

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  GUIDE_PDF_ROUTE,
  GUIDE_REQUESTED_STORAGE_KEY,
  MARKETING_CONSENT_TEXT,
  PRIVACY_LINE_AFTER,
  PRIVACY_LINE_BEFORE,
  PRIVACY_LINE_LINK,
} from "@/lib/guides/config";

const MSG_NAME = "Please enter your first name.";
const MSG_EMAIL = "Please enter a valid email address.";
const MSG_SERVER = "Something went wrong on our side. Please try again, or email hello@maruonline.com.";

const inputClass =
  "w-full rounded-xl border border-border-default bg-bg-canvas px-4 py-3 text-sm text-ink-primary " +
  "placeholder-ink-tertiary outline-none transition-colors focus:border-cyan focus-visible:ring-2 focus-visible:ring-cyan";

export default function GuideForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [contactTime, setContactTime] = useState(""); // honeypot
  const [errors, setErrors] = useState<{ firstName?: string; email?: string; server?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ marketing: boolean } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!firstName.trim()) next.firstName = MSG_NAME;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = MSG_EMAIL;
    setErrors(next);
    if (next.firstName || next.email) return;

    setSubmitting(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const res = await fetch("/api/guides/ai-and-popia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, company, marketing, contactTime }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(String(res.status));
      try {
        localStorage.setItem(GUIDE_REQUESTED_STORAGE_KEY, "1");
      } catch {
        /* storage blocked: the assessment simply keeps showing the guide line */
      }
      setDone({ marketing });
    } catch {
      setErrors({ server: MSG_SERVER });
    } finally {
      clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div role="status" aria-live="polite">
        <h2 className="text-2xl font-semibold text-navy mb-3 border-none">Your guide is on its way.</h2>
        <p className="body-muted text-base leading-relaxed mb-6">
          Check your inbox for an email from hello@maruonline.com. If it isn&apos;t there in a few minutes, look in your spam folder.
        </p>
        <Button href={GUIDE_PDF_ROUTE} variant="primary" target="_blank" rel="noopener">
          Download the guide (PDF)
        </Button>
        {done.marketing && (
          <p className="body-muted text-base leading-relaxed mt-6">
            We have also sent a confirmation email. Your notes subscription starts once you confirm it.
          </p>
        )}
        <p className="body-muted text-base leading-relaxed mt-6">
          Want to see where your business stands?{" "}
          <Link href="/popia-ai-check" className="text-cyan-ink underline hover:no-underline">
            Take the free Exposure Check.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <h2 className="text-2xl font-semibold text-navy mb-2 border-none">Get the guide</h2>

      <div>
        <label htmlFor="guide-first-name" className="block text-sm font-medium text-ink-primary mb-2">First name</label>
        <input
          id="guide-first-name"
          type="text"
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          aria-invalid={Boolean(errors.firstName)}
          aria-describedby={errors.firstName ? "guide-first-name-error" : undefined}
          required
          className={inputClass}
        />
        {errors.firstName && <p id="guide-first-name-error" className="text-danger text-sm mt-2">{errors.firstName}</p>}
      </div>

      <div>
        <label htmlFor="guide-email" className="block text-sm font-medium text-ink-primary mb-2">Work email</label>
        <input
          id="guide-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "guide-email-error" : undefined}
          required
          className={inputClass}
        />
        {errors.email && <p id="guide-email-error" className="text-danger text-sm mt-2">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="guide-company" className="block text-sm font-medium text-ink-primary mb-2">
          Company <span className="font-normal text-ink-tertiary">(optional)</span>
        </label>
        <input
          id="guide-company"
          type="text"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Honeypot: off-screen and out of the tab order; people never fill it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="guide-contact-time">Best time to call</label>
        <input
          id="guide-contact-time"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={contactTime}
          onChange={(e) => setContactTime(e.target.value)}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer min-h-[44px] py-1">
        <Checkbox checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-0.5" />
        <span className="text-sm text-ink-secondary leading-relaxed">{MARKETING_CONSENT_TEXT}</span>
      </label>

      {errors.server && <p role="alert" className="text-danger text-sm">{errors.server}</p>}

      <Button type="submit" variant="primary" disabled={submitting} className="w-full">
        Send me the guide
      </Button>

      <p className="text-ink-tertiary text-xs leading-relaxed">
        {PRIVACY_LINE_BEFORE}
        <Link href="/privacy-policy" className="text-cyan-ink underline hover:no-underline">
          {PRIVACY_LINE_LINK}
        </Link>
        {PRIVACY_LINE_AFTER}
      </p>
    </form>
  );
}
