"use client";

import { useState } from "react";

/**
 * "Tools we build with" ticker (5 Nov 2026). A slow, continuous scroll of the
 * platforms used across Maru builds, taken from the build repositories'
 * dependencies and integration docs (maru-website, GrowthIQ, Invara, the lead
 * engine, the WhatsApp system, client sites and workflow tools). Names, not
 * logos: set in the site's type so the band stays calm.
 *
 * - The list is duplicated (aria-hidden copy) for a seamless loop.
 * - Pauses on hover and keyboard focus, and has a Pause button (WCAG 2.2.2:
 *   moving content that starts by itself needs a way to stop it).
 * - Under reduced motion it does not move: the names wrap as a static list.
 */
const TOOLS: { name: string; kind: string }[] = [
  { name: "Next.js", kind: "Web framework" },
  { name: "React", kind: "Interfaces" },
  { name: "TypeScript", kind: "Language" },
  { name: "Tailwind CSS", kind: "Styling" },
  { name: "Vercel", kind: "Hosting" },
  { name: "GitHub", kind: "Code" },
  { name: "Supabase", kind: "Database" },
  { name: "Neon", kind: "Database" },
  { name: "Sanity", kind: "Content" },
  { name: "Claude", kind: "AI" },
  { name: "Brevo", kind: "CRM and email" },
  { name: "Resend", kind: "Email delivery" },
  { name: "WhatsApp Business", kind: "Messaging" },
  { name: "Calendly", kind: "Bookings" },
  { name: "Make", kind: "Automation" },
  { name: "Notion", kind: "Workspace" },
  { name: "Google Analytics", kind: "Analytics" },
  { name: "Microsoft Azure", kind: "Cloud" },
];

function List({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="tools-list" aria-hidden={hidden || undefined}>
      {TOOLS.map((t) => (
        <li key={t.name} className="tools-item">
          <span className="tools-name">{t.name}</span>
          <span className="tools-kind">{t.kind}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ToolsTicker() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="tools-ticker-wrap">
      <div className="tools-ticker" data-paused={paused || undefined}>
        <div className="tools-track">
          <List />
          <List hidden />
        </div>
      </div>
      <button
        type="button"
        className="tools-toggle"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
      >
        {paused ? (
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M3 1.5v9l7.5-4.5z" /></svg>
        ) : (
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" /></svg>
        )}
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
