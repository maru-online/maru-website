import { Metadata } from "next";
import { notFound } from "next/navigation";

// UNPUBLISHED 26 Sep 2026 (COPY-DECK §7, CHANGE-MAP P1).
// The form in POPIAChecklistPageClient.tsx was simulated: it collected name,
// email, company and consent, sent nothing, and told the visitor to check their
// email. A POPIA-safe brand cannot run that. The page also carried unsourced
// claims (CHANGE-MAP §4(b) rows 3-6) that still need approved copy.
//
// To republish: wire onSubmit to a real, consented Brevo path that emails
// public/popia-ai-checklist.md, fix the remaining claims, render the 1,220+
// source link, restore the default export below to render
// <POPIAChecklistPageClient />, and re-add the URL to app/sitemap.ts.

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function POPIAChecklistPage() {
  notFound();
}
