# Copy Deck Addendum 05: leftover assessment wording

> **Status:** APPROVED 28 Sep 2026 by Jimmy Motsei and built the same day. A1 primary. D1: 30 minutes. D2: delete the
> chatbot prompt instead of reviewing it (replaces B3). D3: yes, C1 deleted.
> Same rules as `COPY-DECK.md` and the no-confusion rules in CLAUDE.md: verbatim once approved, SA English,
> pain first, never lead with "AI", no banned claims, "safe" never stands alone, no custody or guarantee wording.
> Context: Addendum 03 left these slots alone because they had no approved copy. A repo-wide sweep on 28 Sep
> found the ones in B and C as well. The free check emails its report within minutes and shows the result
> only when you finish, so every "48 hours" and "live as you go" line below is now inaccurate. The paid
> POPIA-Safe AI Audit's 48-hour report is correct and is **not** touched.

---

## A. Homepage assessment band (`components/homepage/AssessmentFormSection.tsx`)

| # | Where | Current | Proposed | Why |
|---|---|---|---|---|
| A1 | Eyebrow (navy, left) | Free Business Diagnostic | `Free · 10 questions · About 3 minutes` [ALT `Free POPIA-safe AI check`] | Old name. The ALT repeats the card heading beside it, so the primary uses the facts instead |
| A2 | Card bullet 1 | See your score live as you go | `See your result as soon as you finish` | The result appears at the end, not during |
| A3 | Card bullet 2 | Detailed report delivered within 48 hours | `Your full report by email, within minutes` | 48 hours belongs to the paid audit |
| A4 | Card button | Start Your Free Assessment | `Start the free check` | Old name; sentence case to match the card heading |
| A5 | Line under the button | Free. No obligation. Results within 48 hours. | `Free. No obligation.` | 48 hours is wrong; "arrives by email" is already in the body (Addendum 03 A12) |

Unchanged (checked, still true): card bullet 3 "No sign-up required to begin" (email is asked for at the end);
"Either way, you get clarity. That's the point."; "Your report, nothing else, unless you ask for more." (true since
the opt-in, Addendum 01 D); the closing "No obligation…" line.

## B. Other pages

| # | Where | Current | Proposed |
|---|---|---|---|
| B1 | Homepage hero, secondary button (`app/page.tsx:133`) | Start the free assessment | `Start the free check` (same label as A4) |
| B2 | `/contact` meta description (`app/contact/page.tsx:12`) | Two ways to start — the Operations Assessment or a 20-minute discovery call. You speak directly with Jimmy. | `Two ways to start: the free POPIA-safe AI check or a 30-minute discovery call. You speak directly with Jimmy.` (see decision D1) |
| ~~B3~~ | **Superseded by D2: `lib/chatbot-prompt.ts` deleted.** Chatbot instructions, "Is AI right for my business?" (`lib/chatbot-prompt.ts:164`) | Suggest the Operations Assessment | `Suggest the free POPIA-safe AI check` |
| B4 | Insights CTA band (`app/insights/page.tsx:456`, `app/insights/[slug]/page.tsx:441`; hidden, noindex) | The free assessment shows you where the gaps are, in about fifteen minutes. The POPIA-Safe AI Audit goes further — your tools, your workflows, your revenue gaps, written up within 48 hours. R4,500. | `The free POPIA-safe AI check shows where client information slips through, in about three minutes. The POPIA-Safe AI Audit goes further: every tool, AI app and data flow, mapped and written up within 48 hours. R4,500.` |
| B5 | `/case-studies/growthiq` closing band (noindex scaffold, line 177) | Start with the free operations assessment. It takes a few minutes and tells you where your workflows are leaking time. / button: Start the assessment | `Start with the free POPIA-safe AI check. It takes about three minutes and shows where client information is exposed, and what to fix first.` / button: `Start the free check` |
| B6 | `/ai-in-action` closing band (noindex scaffold, line 127) | In the meantime, the operations assessment is the fastest way to see what we would actually change in your business. | `In the meantime, the free POPIA-safe AI check is the quickest way to see where client information is exposed in your business.` |

Kept deliberately: v2 report pages keep "Operations Assessment" (label and title), because they describe the
report those visitors actually took.

## C. Code, not copy

| # | Where | Finding | Proposal |
|---|---|---|---|
| C1 | `app/api/email/send/route.ts` | v2-era results/follow-up emails ("Operations Assessment Analysis Complete"). Its only caller, `lib/integrations.ts`, is imported by nothing, so these emails never send from the site. The route is still publicly callable. | **Delete** the route, `lib/integrations.ts` and its `rate-limit.ts` entry, rather than reword dead email copy. The v3 emails go through Brevo templates (Addendum 03 A14). |

## D. Decisions for Jimmy

- **D1. DECIDED 28 Sep 2026: 30 minutes, everywhere.** Was: how long is the discovery call? `/booking` and `/contact` say **20 minutes**; the report page, the check's
  done step and `/pricing` say **30 minutes**. Pick one and B2 uses it; the others get aligned in the same build.
  Check it against the Calendly event length.
- **D2. DECIDED 28 Sep 2026: delete `lib/chatbot-prompt.ts`.** It was imported by nothing, so no chatbot ever ran on the site. Any future chatbot is a new feature (freeze exception, Anthropic as a named processor, consent). Was: `lib/chatbot-prompt.ts` still says "proven results"
  (lines 23 and 169) and "African market expertise", with no source, and frames Maru around "AI adoption". It
  needs its own pass against POSITIONING.md. Say if you want that drafted as Addendum 06.
- **D3. DECIDED 28 Sep 2026: yes.** Route, `lib/integrations.ts` and the rate-limit entry deleted.

---

**When approved (build list, not copy):** apply A and B verbatim; apply D1 across all five call-length mentions;
if D3 is yes, delete per C1; update the WhatsApp/Playwright tests only if a tested string changes; run the four
checks, push, verify the preview.
