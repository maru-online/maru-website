'use client';

import { LegalLayout } from "@/components/layout/LegalLayout";



export default function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      description="This policy explains how we use cookies and similar technologies on our website to enhance your browsing experience."
      lastUpdated="January 2025"
      effectiveDate="January 1, 2025"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">1. What Are Cookies?</h2>
        <p className="text-ink-secondary mb-4">
          Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) 
          when you visit a website. They are widely used to make websites work more efficiently and provide 
          useful information to website owners.
        </p>
        <p className="text-ink-secondary">
          We use cookies and similar tracking technologies to enhance your experience on our website, 
          analyze usage patterns, and deliver personalized content.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          2. Types of Cookies We Use
        </h2>
        
        <h3 className="text-xl font-medium text-ink-primary mb-4">
          2.1 Essential Cookies
        </h3>
        <p className="text-ink-secondary mb-4">
          These cookies are necessary for the website to function properly. They enable core functionality 
          such as security, network management, and accessibility. You cannot opt-out of these cookies.
        </p>
        
        <h3 className="text-xl font-medium text-ink-primary mb-4">
          2.2 Analytics Cookies
        </h3>
        <p className="text-ink-secondary mb-4">
          We use analytics cookies to understand how visitors interact with our website. This helps us 
          improve our services and user experience. These cookies collect information about:
        </p>
        <ul className="text-ink-secondary mb-4">
          <li>Pages visited and time spent on each page</li>
          <li>How you arrived at our website</li>
          <li>What you clicked on during your visit</li>
          <li>General location information (city/country level)</li>
        </ul>

        <h3 className="text-xl font-medium text-ink-primary mb-4">
          2.3 Marketing Cookies
        </h3>
        <p className="text-ink-secondary mb-4">
          These cookies track your online activity to help us deliver more relevant advertising. They may 
          be set by us or by third-party advertising partners with our permission. These cookies:
        </p>
        <ul className="text-ink-secondary">
          <li>Remember that you have visited our website</li>
          <li>Share this information with other organizations such as advertisers</li>
          <li>Help measure the effectiveness of our marketing campaigns</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          3. Third-Party Cookies
        </h2>
        <p className="text-ink-secondary mb-4">
          We work with the following third-party services that may set cookies on your device:
        </p>
        
        <div className="card-lift rounded-lg p-6 mb-4">
          <h4 className="text-ink-primary font-medium mb-2">Google Analytics</h4>
          <p className="text-ink-secondary text-sm">
            We use Google Analytics to analyze website traffic and usage patterns. Google Analytics sets 
            cookies to help us understand user behavior and improve our services.
          </p>
          <p className="text-ink-secondary text-sm mt-2">
            Learn more: <a href="https://policies.google.com/privacy" className="text-cyan-ink hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
          </p>
        </div>

        <div className="card-lift rounded-lg p-6">
          <h4 className="text-ink-primary font-medium mb-2">Meta Pixel (Facebook)</h4>
          <p className="text-ink-secondary text-sm">
            We use Meta Pixel to measure the effectiveness of our advertising campaigns and deliver targeted 
            ads on Facebook and Instagram.
          </p>
          <p className="text-ink-secondary text-sm mt-2">
            Learn more: <a href="https://www.facebook.com/privacy/explanation" className="text-cyan-ink hover:underline" target="_blank" rel="noopener noreferrer">Meta Privacy Policy</a>
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          4. How to Control Cookies
        </h2>
        {/* Approved by Jimmy 2 Oct 2026 (COOKIE-POLICY-S4-DRAFT.md (kept outside the repo)).
            Replaces a promised "preference center" with per-category toggles that never
            existed: the banner is one Accept/Decline choice. Keep in step with
            components/CookieConsent.tsx, AnalyticsTracker.tsx and analytics/MetaPixel.tsx.
            8 Oct 2026, approved by Jimmy: the Decline sentence no longer promises to delete every
            Meta cookie. Tested on the preview: Meta's own `fr` cookie lives on facebook.com and no
            website can delete it; nothing is sent to Meta after Decline. */}
        <p className="text-ink-secondary mb-4">
          When you first visit our website, a banner asks whether you accept analytics and marketing
          cookies. It is one choice, and it covers both.
        </p>
        <ul className="text-ink-secondary mb-4">
          <li>
            <strong className="text-ink-primary">Accept:</strong> Google Analytics may set its cookies, and
            the Meta Pixel loads.
          </li>
          <li>
            <strong className="text-ink-primary">Decline, or no choice yet:</strong> Google Analytics runs
            without cookies and sends Google only basic measurements that don&apos;t identify your browser, and
            the Meta Pixel does not load at all.
          </li>
        </ul>
        <p className="text-ink-secondary mb-4">
          You can change your choice at any time. Click the button below or in the footer of any page to
          bring the banner back. If you change from Accept to Decline, we delete the Google Analytics and
          Meta Pixel cookies our website set. Meta may also have set its own cookie on facebook.com, which
          only your browser settings can remove.
        </p>
        <p className="text-ink-secondary mb-4">
          We save your choice in your browser&apos;s local storage, not in a cookie. It stays until you change
          it or clear your browser data.
        </p>
        <p className="text-ink-secondary mb-6">
          Some features use third-party services that this choice does not switch off, because the feature
          can&apos;t work without them: Google reCAPTCHA on our forms, which helps tell people from automated
          spam.
        </p>

        <button
          onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
          className="px-6 py-3 rounded-lg text-sm font-bold mb-8 [background:var(--gradient-gold)] text-[var(--color-ink-on-gold)] shadow-[var(--shadow-btn)] transition-[transform,box-shadow,filter] duration-200 ease-out hover:scale-[1.02] hover:brightness-105 hover:shadow-[var(--shadow-btn-hover)] active:scale-[0.98]"
        >
          Manage Cookie Preferences
        </button>

        <p className="text-ink-secondary mb-4">
          Most web browsers also allow you to control cookies through their settings. You can:
        </p>
        <ul className="text-ink-secondary mb-4">
          <li>Delete all cookies from your browser</li>
          <li>Block all cookies from being set</li>
          <li>Allow cookies from specific websites only</li>
          <li>Be notified each time a cookie is sent</li>
        </ul>
        <p className="text-ink-secondary mb-4">
          Please note that if you disable cookies, some parts of our website may not function properly.
        </p>

        <h3 className="text-xl font-medium text-ink-primary mb-4">
          Browser-Specific Instructions
        </h3>
        <ul className="space-y-2 text-ink-secondary">
          <li>
            <strong className="text-ink-primary">Chrome:</strong>{" "}
            <a href="https://support.google.com/chrome/answer/95647" className="text-cyan-ink hover:underline" target="_blank" rel="noopener noreferrer">
              Manage cookies in Chrome
            </a>
          </li>
          <li>
            <strong className="text-ink-primary">Firefox:</strong>{" "}
            <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-cyan-ink hover:underline" target="_blank" rel="noopener noreferrer">
              Manage cookies in Firefox
            </a>
          </li>
          <li>
            <strong className="text-ink-primary">Safari:</strong>{" "}
            <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" className="text-cyan-ink hover:underline" target="_blank" rel="noopener noreferrer">
              Manage cookies in Safari
            </a>
          </li>
          <li>
            <strong className="text-ink-primary">Edge:</strong>{" "}
            <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-cyan-ink hover:underline" target="_blank" rel="noopener noreferrer">
              Manage cookies in Edge
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          5. POPIA Compliance
        </h2>
        <p className="text-ink-secondary mb-4">
          We handle cookies with the Protection of Personal Information Act (POPIA) No. 4 of 2013 in mind. 
          Under POPIA, we are required to:
        </p>
        <ul className="text-ink-secondary">
          <li>Inform you about the cookies we use</li>
          <li>Obtain your consent for non-essential cookies</li>
          <li>Allow you to manage your cookie preferences</li>
          <li>Provide clear information about third-party cookies</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          6. Cookie Duration
        </h2>
        <p className="text-ink-secondary mb-4">
          Cookies may be either "session" or "persistent" cookies:
        </p>
        <ul className="text-ink-secondary">
          <li>
            <strong className="text-ink-primary">Session Cookies:</strong> These are temporary and are deleted 
            when you close your browser
          </li>
          <li>
            <strong className="text-ink-primary">Persistent Cookies:</strong> These remain on your device until 
            they expire or you delete them. We use persistent cookies that last up to 2 years.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          7. Updates to This Policy
        </h2>
        <p className="text-ink-secondary mb-4">
          We may update this Cookie Policy from time to time to reflect changes in technology, legislation, 
          or our data practices. We will post any changes on this page with an updated revision date.
        </p>
        <p className="text-ink-secondary">
          We encourage you to review this policy periodically to stay informed about how we use cookies.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          8. Contact Us
        </h2>
        <p className="text-ink-secondary mb-4">
          If you have questions about our use of cookies, please contact us:
        </p>
        <div className="card-lift rounded-lg p-6 text-ink-secondary">
          <p>
            <strong className="text-ink-primary">Email:</strong> privacy@maruonline.com
          </p>
          <p>
            <strong className="text-ink-primary">Phone:</strong> +27(0)83 393 4864
          </p>
          <p>
            <strong className="text-ink-primary">Address:</strong> 247 Ballito Village,
            Ballito, 4420, South Africa
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}
