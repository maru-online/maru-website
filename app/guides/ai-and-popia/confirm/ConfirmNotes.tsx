"use client";

/**
 * DRAFT WORDING — NOT APPROVED. Entry 19 gives no copy for the double opt-in
 * page. Written to the voice rules for the preview test only; listed in
 * rebuild log #10 for Jimmy to approve or replace before go-live.
 */

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { GUIDE_PATH } from "@/lib/guides/config";

type State = "idle" | "working" | "confirmed" | "already" | "invalid" | "error";

export default function ConfirmNotes({ token }: { token: string }) {
  const [state, setState] = useState<State>(token ? "idle" : "invalid");

  async function confirm() {
    setState("working");
    try {
      const res = await fetch("/api/guides/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        signal: AbortSignal.timeout(15_000),
      });
      const body = (await res.json().catch(() => ({}))) as { status?: State };
      setState(body.status === "confirmed" || body.status === "already" || body.status === "invalid" ? body.status : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "confirmed" || state === "already") {
    return (
      <div role="status">
        <h1 className="text-2xl font-semibold text-navy mb-3 border-none">You&apos;re subscribed.</h1>
        <p className="body-muted text-base leading-relaxed mb-0">
          You&apos;ll get practical notes on AI and POPIA from Maru Online. Every email has a link to unsubscribe.
        </p>
      </div>
    );
  }

  if (state === "invalid") {
    return (
      <div role="alert">
        <h1 className="text-2xl font-semibold text-navy mb-3 border-none">This link doesn&apos;t work.</h1>
        <p className="body-muted text-base leading-relaxed mb-0">
          It may be incomplete. You can still <Link href={GUIDE_PATH} className="text-cyan-ink underline">get the guide</Link>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy mb-3 border-none">Confirm your notes</h1>
      <p className="body-muted text-base leading-relaxed mb-6">
        You asked for practical notes on AI and POPIA from Maru Online. Confirm below and we&apos;ll add you.
      </p>
      <Button onClick={confirm} variant="primary" disabled={state === "working"}>
        Yes, send me the notes
      </Button>
      {state === "error" && (
        <p role="alert" className="text-danger text-sm mt-4">
          Something went wrong on our side. Please try again, or email hello@maruonline.com.
        </p>
      )}
    </div>
  );
}
