# Copy Deck Addendum 01: polish round 1

> **Status:** DRAFT, 26 Sep 2026. Jimmy approves, edits or rejects each item before it is built.
> Same rules as `COPY-DECK.md`: verbatim once approved, SA English, pain first, no banned claims.
> Items A to C reuse copy you've already approved. Items D to F are new wording.

---

## A. Twitter/X card (`app/layout.tsx`, homepage metadata)

Current (not approved): "AI That Actually Works for Your Business — Not Just Another Tool" /
"We find where your processes are costing you time and money…"

Every page's `seo()` replaces the layout's `twitter` block, so these strings don't render anywhere today. Cards fall
back to each page's `<title>`.

- **Proposal:** delete the dead layout strings. On the homepage, set the twitter title and description to the
  approved OG pair (COPY-DECK §1):
  - `AI your business can use, without the POPIA risk`
  - `Your team already uses AI. We make it POPIA-safe: we map where client data goes, fix the risks, and build workflows that save time. Fixed price.`

## B. Share image (`app/opengraph-image.tsx`)

This image appears on every link shared from the site.

| Line | Current | Proposal (reuses approved copy) |
|---|---|---|
| Headline (l.59) | AI-powered workflows that cut your operating costs | `AI your business can use, without the POPIA risk` |
| Sub-line (l.69) | AI implementation consultancy · Gauteng, South Africa | `POPIA-safe AI for South African businesses` |

## C. Share-image alt text (`lib/seo.ts` `OG_ALT`)

- Current: `Maru Online — AI-powered workflows that cut operating costs`
- **Proposal:** `Maru Online: POPIA-safe AI for South African businesses`

---

## D. Assessment form (`/operations-assessment`, "Where should we send it?")

POPIA needs two things here: a notice at the point of collection saying what the data is for (s18), and **separate,
opt-in** consent before anything counts as direct marketing (s69). Today the form has neither. It says
"No spam. Unsubscribe any time." and adds every lead to Brevo list 21.

- **Notice** (replaces "No spam. Unsubscribe any time."):
  `We use your name and email to send your report and to follow up about it. Nothing else. See our Privacy Policy.`
  (Privacy Policy links to `/privacy-policy`)
- **Optional checkbox, unticked by default:**
  `Also send me occasional notes on using AI safely under POPIA. Unsubscribe from any email.`
- **Behaviour change (build item, not copy):** add the contact to the Brevo marketing list **only when the box is
  ticked**. Store `MARKETING_CONSENT` (true/false), `CONSENT_AT` (timestamp) and `CONSENT_TEXT_VERSION` (`2026-09-v1`)
  as Brevo attributes. The report email goes out either way.
- **Homepage line** (`AssessmentFormSection`, currently "No opt-in to marketing — just your results."):
  `Your report, nothing else, unless you ask for more.`

## E. Contact form (`/contact`)

- **Notice** (above the send button):
  `We use these details only to reply to your enquiry. See our Privacy Policy.`
- **Optional checkbox, unticked:** the same wording as D.
- **Behaviour:** same rule as D. The contact form currently adds everyone to the "Maru Website Contacts" list.

## F. Newsletter form (`MaruBriefForm`, `/insights` only)

Signing up here *is* the marketing request, so a notice is enough and no separate checkbox is needed.

- **Notice** (under the button):
  `You're signing up for Maru's email notes. Unsubscribe from any email. See our Privacy Policy.`

---

**Caveat:** this wording is designed to meet POPIA requirements for notice (s18) and direct-marketing consent (s69).
It is not a legal opinion. If you want certainty, have your legal contact check D to F. POSITIONING.md lists a legal
review partner as "not yet".

**Dependency:** D to F point at the privacy policy, which still describes the Academy and names no processors
(Brevo, HubSpot, Vercel, Calendly, Google, Meta). Linking to it as-is would be the next credibility gap. Rewriting it
is a separate item that needs facts from you: which processors you actually use and where each stores data.
