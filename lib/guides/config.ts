/**
 * Lead magnet "AI and POPIA: A Guide" — every go-live switch in one file.
 *
 * Copy handover entry 19 (approved for PREVIEW BUILD 8 Oct 2026). Nothing here
 * is approved for production: the release gates in entry 19 §10 must clear
 * first. Go-live is a set of one-line changes in this file, listed in
 * docs/positioning/REBUILD-LOG.md (#10):
 *
 *   1. GUIDE_PDF_FILE        → the clean PDF, after Jimmy ticks
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
export const GUIDE_PDF_ROUTE = "/downloads/ai-and-popia-guide.pdf";

/**
 * The file served at GUIDE_PDF_ROUTE, from content/guides/. Only the final,
 * verified PDF is committed, under this name.
 */
export const GUIDE_PDF_FILE = "ai-and-popia-guide.pdf";

export const GUIDE_INDEXABLE = false;
export const GUIDE_HOMEPAGE_STRIP = false;
export const GUIDE_SECONDARY_LINKS = false;

/**
 * Entry 19 §12 default (b), decided by Jimmy 8 Oct: contacts who downloaded
 * the guide and did not subscribe are deleted after this many months, unless
 * they became a customer or took the Exposure Check.
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
