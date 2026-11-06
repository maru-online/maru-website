/**
 * Lead magnet "AI and POPIA: A Guide" — every go-live switch in one file.
 *
 * Copy handover entry 19 (approved for PREVIEW BUILD 8 Oct 2026). Nothing here
 * is approved for production: the release gates in entry 19 §10 must clear
 * first. Go-live is a set of one-line changes in this file, listed in
 * REBUILD-LOG.md (kept outside the repo) (#10):
 *
 *   1. GUIDE_PDF_FILE        → the clean PDF, after the owner ticks
 *                              lead-magnet-verification-v1.md
 *   2. GUIDE_INDEXABLE       → true (lifts noindex, adds the sitemap entry)
 *   3. GUIDE_HOMEPAGE_STRIP  → true (homepage strip, built last per §11)
 *   4. GUIDE_SECONDARY_LINKS → true (FAQ ending, §11 "other placements")
 */

/**
 * Master switch. While false, the guide page, its confirm page, the PDF route
 * and the two guide API routes return 404, and no link to the guide is shown
 * on the site or sent in the report email. Turn on together with
 * GUIDE_PDF_FILE pointing at a file that exists in content/guides/.
 */
export const GUIDE_LIVE = false;

export const GUIDE_PATH = "/guides/ai-and-popia";

/**
 * Review switch (20 Oct 2026). Off production, the landing page renders even
 * while GUIDE_LIVE is false so the owner can review it on the preview. The
 * form stays locked (no DB write, no email) and the PDF and API routes still
 * 404 until GUIDE_LIVE is on. Production is untouched by this.
 */
export const GUIDE_PREVIEWABLE = process.env.VERCEL_ENV !== "production";

/** Whether the landing page and the Insights guide band should render. */
export const GUIDE_PAGE_VISIBLE = GUIDE_LIVE || GUIDE_PREVIEWABLE;
export const GUIDE_PDF_ROUTE = "/downloads/ai-and-popia-guide.pdf";

/**
 * Where a visit to the guide page came from (5 Nov 2026). Links into the guide
 * carry ?from=<source>; the landing page passes it to the lead and download
 * events, so the one-month comparison with the web guides can separate
 * requests from Guides & Resources from those the POPIA review sends.
 * Analytics only: nothing is stored against the person.
 */
export const GUIDE_SOURCES = ["resources", "resources-listing", "review", "report", "report-area"] as const;
export type GuideSource = (typeof GUIDE_SOURCES)[number];
export const guideHref = (from: GuideSource) => `${GUIDE_PATH}?from=${from}`;
/** The `from` value from a URL, or "direct" when it is missing or unknown. */
export function guideSourceFrom(value: unknown): GuideSource | "direct" {
  return typeof value === "string" && (GUIDE_SOURCES as readonly string[]).includes(value)
    ? (value as GuideSource)
    : "direct";
}

/**
 * Report: point each weak area to the matching part of the guide (5 Nov 2026).
 * DRAFT WORDING (app/report/[token]/page.tsx, guideAreaLine) — off until the
 * owner approves it in the copy review. Review area key → guide part.
 */
export const GUIDE_REPORT_AREA_LINKS = false;
export const GUIDE_AREA_PARTS: Record<string, { part: number; title: string; page: number }> = {
  ai_use: { part: 1, title: "AI in your business", page: 6 },
  data_location: { part: 2, title: "Where client information goes", page: 7 },
  access: { part: 3, title: "Who can see it", page: 9 },
  permission: { part: 4, title: "Permission and trust", page: 10 },
  incident: { part: 5, title: "If something goes wrong", page: 12 },
};

/** The guide's cover and inside pages, rendered from the PDF (5 Nov 2026). */
export const GUIDE_COVER = "/images/guides/ai-and-popia/cover.webp";
export const GUIDE_PREVIEW_PAGES = [
  { src: "/images/guides/ai-and-popia/page-06.webp", alt: "Page 6 of the guide: Part 1, AI in your business" },
  { src: "/images/guides/ai-and-popia/page-14.webp", alt: "Page 14 of the guide: the one-page self-check" },
] as const;

/**
 * The file served at GUIDE_PDF_ROUTE, from content/guides/. Only the final,
 * verified PDF is committed, under this name.
 */
export const GUIDE_PDF_FILE = "ai-and-popia-guide.pdf";

export const GUIDE_INDEXABLE = false;
export const GUIDE_HOMEPAGE_STRIP = false;
export const GUIDE_SECONDARY_LINKS = false;

/**
 * Entry 19 §12 default (b), decided by the owner 8 Oct: contacts who downloaded
 * the guide and did not subscribe are deleted after this many months, unless
 * they became a customer or took the POPIA review.
 */
export const GUIDE_RETENTION_MONTHS = 12;

// ── Consent record (entry 19 §3, §7) ──────────────────────────────────────

export const GUIDE_CONSENT_SOURCE = "guide-ai-popia";
/** Bump whenever MARKETING_CONSENT_TEXT or the privacy line below changes. */
export const GUIDE_CONSENT_TEXT_VERSION = "v1-2026-10-08";

/** §3, verbatim. Default (a): no email frequency is stated. */
export const MARKETING_CONSENT_TEXT =
  "Also send me practical notes on AI and POPIA from Maru Online. I can unsubscribe at any time.";

/** §2, verbatim (the privacy-policy link sits on "privacy policy"). */
export const PRIVACY_LINE_BEFORE = "We use your details to send you the guide. How we handle them is explained in our ";
export const PRIVACY_LINE_LINK = "privacy policy";
export const PRIVACY_LINE_AFTER = ".";

// ── Brevo (entry 19 §7) ───────────────────────────────────────────────────

/**
 * Everyone who requests the guide. A record list, never a campaign audience.
 * Created by name on first use; see lib/guides/brevo.ts.
 */
export const BREVO_GUIDE_LIST_NAME = "Guide Downloads";
/**
 * Only contacts who ticked the box AND confirmed by email. Entry 19 calls this
 * "the notes list" without naming it; the name is an assumption (rebuild log #10).
 */
export const BREVO_NOTES_LIST_NAME = "AI and POPIA Notes";
/** Folder 1 holds the site's other lists (21 Assessment Leads, 23 Maru Website Contacts). */
export const BREVO_LIST_FOLDER_ID = 1;

/**
 * Entry 19 §12 hard limit: no real email to any real address from a preview.
 * Off production, only these addresses get Brevo writes and sends; everyone
 * else is logged and recorded as `skipped_preview`.
 */
export const PREVIEW_ALLOWED_RECIPIENTS = ["jimmym@maruonline.com", "hello@maruonline.com"];

export const GUIDE_SENDER = { name: "Maru Online", email: "hello@maruonline.com" };

/** Set on the visitor's device after a request, to hide the assessment's guide link (§11). */
export const GUIDE_REQUESTED_STORAGE_KEY = "maru-guide-requested";
