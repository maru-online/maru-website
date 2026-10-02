# Cookie policy §4: draft for approval

> **Status:** APPROVED by Jimmy 2 Oct 2026, with the footer wording (question 2). Built into
> `app/cookie-policy/page.tsx` verbatim (checked by script). Not legal advice.

## Why it needs changing

The live §4 says the button "will open our preference center where you can enable or disable specific categories
of cookies". No such centre exists. The button reopens the banner, and the banner offers one choice, Accept or
Decline, covering analytics and marketing together. A cookie policy that describes controls the site doesn't
have is the kind of claim a POPIA-safe business can't make.

## What the site actually does (checked in the code, 2 Oct 2026)

| Fact | Source |
|---|---|
| One choice: Accept or Decline. It covers Google Analytics and the Meta Pixel together. | `components/CookieConsent.tsx` |
| No choice yet, or Decline: GA4 runs in Google Consent Mode with all storage denied (no `_ga` cookies; cookieless pings only). The Meta Pixel is not loaded. | `components/AnalyticsTracker.tsx`, `components/analytics/MetaPixel.tsx` |
| Accept: GA4 may set its cookies, and the Meta Pixel loads. Ad storage stays denied in GA4 either way. | same |
| Changing from Accept to Decline deletes the `_ga*` and `_fbp` cookies. | `lib/cookie-consent.ts` `clearCookies` |
| The choice is stored in the browser's local storage (`maru-cookie-consent`), not in a cookie. | `lib/cookie-consent.ts` |
| The banner can be reopened from "Manage Cookie Preferences" on this page **and from "Cookie Preferences" in the footer bottom bar on every page**. (The first draft wrongly said there was no footer link: the grep searched for "Manage Cookie" and missed the footer's shorter label.) | `app/cookie-policy/page.tsx`, `components/ui/Footer.tsx` |
| Not covered by the choice: Google reCAPTCHA (check page, contact form) and Calendly (booking page). | `app/popia-ai-check`, `app/contact`, `app/booking` |

## Proposed §4 (replaces the first paragraph; the button and the browser-settings part stay as they are)

**4. How to Control Cookies**

When you first visit our website, a banner asks whether you accept analytics and marketing cookies. It is one
choice, and it covers both.

- **Accept:** Google Analytics may set its cookies, and the Meta Pixel loads.
- **Decline, or no choice yet:** Google Analytics runs without cookies and sends Google only basic measurements
  that don't identify your browser, and the Meta Pixel does not load at all.

You can change your choice at any time. Click the button below or in the footer of any page to bring the banner back. If you change from
Accept to Decline, we delete the Google Analytics and Meta Pixel cookies from your browser.

We save your choice in your browser's local storage, not in a cookie. It stays until you change it or clear your
browser data.

Some features use third-party services that this choice does not switch off, because the feature can't work
without them: Google reCAPTCHA on our forms, which helps tell people from automated spam, and Calendly when you
open our booking page.

*[Manage Cookie Preferences button: unchanged]*

*[Browser settings paragraph, list and browser-specific links: unchanged]*

## Decisions

1. **Approve the §4 text above?** Approved 2 Oct 2026.
2. **Footer link:** yes. The footer already had one ("Cookie Preferences"), so no build was needed; the wording was added.

## Other inaccuracies on the same page (not drafted; flagged so the page isn't approved as accurate)

- **§3 lists HubSpot** as setting cookies, with a note about US transfers. The site loads no HubSpot code, and the
  only HubSpot route was deleted on 2 Oct (PR #14). The card should go.
- **§5 "Our use of cookies complies with POPIA"** is a compliance claim. The positioning rules prefer "within POPIA"
  and ban guarantees. Its list also says we "allow you to manage your cookie preferences", which is only true once
  §4 is fixed.
- **§1 "deliver personalised content"** isn't true. Nothing on the site personalises content.
- **§2.1 essential cookies** describes "security, network management" cookies without naming any. If there are none,
  it should say so.
- **Dates:** "Last updated January 2025 / effective 1 January 2025". They need to change when this ships.

These are best fixed in one pass alongside the privacy-policy rewrite (merge blocker 4), which covers the same
processors.
