import { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import Button from "@/components/ui/Button";
import Glyph from "@/components/ui/Glyph";
import { FadeUp } from "@/components/ui/Animate";
import { seo } from "@/lib/seo";

// Working With Us (Engagement & Investment) page, at /working-with-us. Named
// 31 Oct 2026 so the site does not read as selling priced products; /pricing
// redirects here. Copy: "Engagement & Investment Page — Copy and
// Implementation Brief", supplied 30 Oct 2026. Applied as written, except the
// brand name, which the site writes "Maru Online" (two words), never "MaruOnline".
//
// Rules this page must keep:
//  - No price figures, price ranges, packages or "fixed price" wording. The
//    page explains how investment is determined; it does not state any.
//  - Discovery, assessment and consultation are not described as free. Only the
//    POPIA review is free, and it is labelled as such by its own CTA.
//  - No turnaround or response-time promises.
//  - Speaks as "we". Never names or implies the founder.
//  - No outbound links in the page body. CTAs go to the contact form and the
//    POPIA review, as on the About page.
//  - No separate Our Process page: /process still redirects to the homepage.
//  - One H1 (the hero). H2 for sections, H3 for cards and steps. Eyebrows are
//    styled spans, not headings.
//
// Copy revised 1 Nov 2026 per "Maru Online — Revised Website Copy" v1.0
// (section 6), including the optional boundary note under the final CTA.
//
// Section 5 describes intended commercial practice (scope, assumptions, change
// handling, third-party costs). Confirm it matches how Maru Online contracts
// before this page is released.

export const metadata: Metadata = {
  ...seo("/working-with-us"),
  title: "Working With Us | How a Maru Online Engagement Takes Shape",
  description:
    "Maru Online helps South African businesses solve operational problems by connecting AI, data and the tools their teams already use. We start with the business challenge, then determine the right approach, scope and investment.",
};

const outerPad = "px-6 md:px-[60px]";
const innerWide = "max-w-[1100px] mx-auto";
const innerText = "max-w-[820px]";

const CONTACT_HREF = "/contact#contact-form";
const ASSESSMENT_HREF = "/popia-ai-check";

// ─── Content ──────────────────────────────────────────────────────────────────

const factors = [
  "Business and workflow discovery",
  "Data and information flows",
  "System integrations",
  "AI model, API, and platform usage fees",
  "Hosting and infrastructure",
  "Testing, documentation, training, and handover",
  "Ongoing support and optimisation",
];

// ─── Small pieces ─────────────────────────────────────────────────────────────

function SectionHead({
  eyebrow,
  light,
  strong,
}: {
  eyebrow: string;
  light?: string;
  strong: string;
}) {
  return (
    <>
      <span className="label-eyebrow" style={{ marginBottom: "1.5rem" }}>{eyebrow}</span>
      <h2 style={{ marginBottom: "1.5rem", border: "none" }}>
        {light && (
          <>
            <span style={{ fontWeight: 300 }}>{light}</span>
            <br />
          </>
        )}
        <span style={{ fontWeight: 700 }}>{strong}</span>
      </h2>
    </>
  );
}

const cardHeading: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontWeight: 600,
  fontSize: "var(--text-h3-sans)",
  color: "var(--color-ink-primary)",
  lineHeight: 1.3,
  marginBottom: "0.75rem",
  border: "none",
  paddingBottom: 0,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          HERO — bg: navy, matches the homepage and About hero
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative min-h-[70vh] flex items-center overflow-hidden ${outerPad} pt-40 md:pt-48 pb-24 md:pb-32`}
        style={{ background: "var(--gradient-hero)" }}
      >
        <BGPattern variant="grid" mask="fade-edges" size={40} fill="rgba(61, 184, 198, 0.101)" className="pointer-events-none" />
        <div className={`${innerWide} relative z-10 w-full`}>
          <FadeUp>
            <span className="label-eyebrow" style={{ marginBottom: "2rem" }}>Working with us</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split" style={{ marginBottom: "2rem" }}>
              <span className="maru-headline-split-light">Every business challenge is different.</span>
              <br />
              <span className="maru-headline-split-strong">Your solution should be, too.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="body-on-navy" style={{ maxWidth: "680px", marginBottom: "1rem" }}>
              We help South African businesses identify and implement practical AI solutions with POPIA-aware data governance built into the scope.
            </p>
            <p className="body-on-navy" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
              We start by understanding the business challenge, then determine the right approach, scope, and investment.
            </p>
          </FadeUp>
          <FadeUp delay={0.22}>
            <div
              data-maru-primary-cta
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Button href={CONTACT_HREF} variant="primary" className="w-full sm:w-auto justify-center">
                Discuss your business challenge
              </Button>
              <Button href={ASSESSMENT_HREF} variant="secondary" className="w-full sm:w-auto justify-center">
                Take the free, informational POPIA review
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 — WHY WE PRICE THIS WAY — bg: surface
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ background: "var(--gradient-surface)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead
              eyebrow="Our approach"
              light="We start with the problem,"
              strong="not a package."
            />
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className={innerText}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "var(--text-body)",
                  color: "var(--color-ink-primary)",
                  lineHeight: "var(--leading-body)",
                  marginBottom: 0,
                  borderLeft: "4px solid var(--color-cyan)",
                  paddingLeft: "1.25rem",
                }}
              >
                The business challenge determines the workflow to investigate. The workflow determines the systems, information, people, controls, and implementation work involved. Those factors determine the scope and investment.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 — WHAT DETERMINES THE INVESTMENT — bg: secondary (the steps section was dropped, 31 Oct)
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead eyebrow="Project scope" light="Scope and complexity" strong="determine the investment." />
            <div className={innerText} style={{ marginBottom: "var(--space-section-header-mb)" }}>
              <p className="body-muted" style={{ marginBottom: 0 }}>
                Investment depends on the nature of the workflow, the systems and data involved, the level of integration required, the governance and security considerations, and the support needed after implementation.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="card-lift" style={{ padding: "1.75rem 1.5rem" }}>
              <span className="glyph-chip" style={{ marginBottom: "1.25rem" }}>
                <Glyph name="layers" size={22} />
              </span>
              <h3 style={cardHeading}>Cost factors</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {factors.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: "var(--text-body-sm)",
                      color: "var(--color-ink-secondary)",
                      padding: "6px 0",
                      lineHeight: "var(--leading-body)",
                      display: "flex",
                      gap: "8px",
                      alignItems: "flex-start",
                      fontFamily: "var(--font-body)",
                      fontWeight: 300,
                    }}
                  >
                    <span aria-hidden="true" style={{ color: "var(--color-cyan)", flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5 — COMMERCIAL CLARITY — bg: surface
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ background: "var(--gradient-surface)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead eyebrow="Expectations" light="Understand the engagement" strong="before work begins." />
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className={innerText}>
              <p className="body-muted" style={{ marginBottom: "1.25rem" }}>
                Before implementation starts, we define the problem, the scope, the expected outputs, the responsibilities of each party, the assumptions, and the costs that may sit outside Maru Online&apos;s fees.
              </p>
              <p
                className="body-muted"
                style={{
                  marginBottom: 0,
                  borderLeft: "4px solid var(--color-cyan)",
                  paddingLeft: "1.25rem",
                }}
              >
                Where third-party services are required, such as software licences, AI API and platform usage fees, or hosting, these costs will be identified separately from Maru Online&apos;s fees in the proposal.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 6 — FINAL CTA — bg: navy
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative overflow-hidden ${outerPad} py-24`}
        style={{ background: "var(--gradient-hero)" }}
      >
        <BGPattern variant="grid" mask="fade-edges" size={40} fill="rgba(61, 184, 198, 0.08)" className="pointer-events-none" />
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <h2 style={{ marginBottom: "1.5rem", border: "none", color: "var(--color-ink-inverted)" }}>
              <span style={{ fontWeight: 700 }}>Let&apos;s understand your business challenge.</span>
            </h2>
            <p className="body-on-navy" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
              Tell us what you are trying to improve. We will use that context to recommend the next step, whether that is an informational review, a scoped discovery process, or a defined implementation plan.
            </p>
            <div className="flex flex-col items-stretch sm:items-start gap-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Button href={CONTACT_HREF} variant="primary" className="w-full sm:w-auto justify-center">
                  Discuss your business challenge
                </Button>
                <Button href={ASSESSMENT_HREF} variant="secondary" className="w-full sm:w-auto justify-center">
                  Take the free, informational POPIA review
                </Button>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "var(--text-meta)",
                  color: "var(--color-ink-inverted)",
                  opacity: 0.8,
                  margin: 0,
                }}
              >
                Our work focuses on business, systems, workflow, and implementation decisions. POPIA-related considerations can be included in the design conversation, but this does not replace independent legal advice where that is required.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
