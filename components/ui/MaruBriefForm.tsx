"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export function MaruBriefForm() {
  const [email, setEmail]         = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const inputStyle: React.CSSProperties = {
    flex:          1,
    minWidth:      0,
    width:         "100%",
    height:        "48px",
    padding:       "0 1rem",
    borderRadius:  "6px",
    border:        "1px solid var(--color-border-default)",
    fontFamily:    "var(--font-body)",
    fontSize:      "var(--text-body-sm)",
    fontWeight:    300,
    color:         "var(--color-ink-primary)",
    background:    "#fff",
    outline:       "none",
    transition:    "border-color 0.15s ease",
  };

  // This used to flip straight to the success state without sending anything —
  // every subscriber since launch saw "You're in" and was silently discarded,
  // while /api/newsletter (Brevo list 22 + welcome template) sat fully built and
  // uncalled. Never show success for work that did not happen.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), firstName: firstName.trim() }),
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setSubmitted(true);
    } catch {
      setError("That didn't go through. Please try again, or email hello@maruonline.com.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          border:       "0.5px solid var(--color-cyan)",
          borderRadius: "8px",
          padding:      "1.5rem",
          background:   "rgba(61,184,198,0.05)",
          textAlign:    "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize:   "var(--text-body-sm)",
            fontWeight: 500,
            color:      "var(--color-ink-primary)",
            margin:     0,
          }}
        >
          You&apos;re in. Check your inbox for a welcome email.
        </p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Subscribing…" : "Subscribe"}
        </Button>
      </form>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize:   "var(--text-meta)",
          fontWeight: 300,
          color:      "var(--color-ink-tertiary)",
          marginTop:  "0.75rem",
          marginBottom: 0,
          lineHeight: 1.5,
        }}
      >
        We use your email only to send The Business AI Journal. Unsubscribe any
        time. See our{" "}
        <Link href="/privacy-policy" style={{ textDecoration: "underline", textUnderlineOffset: "2px" }}>
          privacy policy
        </Link>
        .
      </p>

      {error && (
        <p
          className="text-danger"
          style={{
            fontFamily: "var(--font-body)",
            fontSize:   "var(--text-meta)",
            marginTop:  "0.75rem",
            marginBottom: 0,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
