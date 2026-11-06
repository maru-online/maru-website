import { Metadata } from "next";
import Button from "@/components/ui/Button";
import Glyph from "@/components/ui/Glyph";
import { FadeUp } from "@/components/ui/Animate";
import { seo } from "@/lib/seo";
import SharedSectionHead from "@/components/ui/SectionHead";
import DotField from "@/components/ui/DotField";
import PageHero from "@/components/ui/PageHero";

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
  title: "Working With Us | How a Maru Online Engagement Is Scoped",
  description:
    "Maru Online helps South African businesses resolve operational problems by connecting AI, data and the tools their teams already use. We start with the business challenge, then determine the right approach, scope and investment.",
};

const innerWide = "sec-inner";
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

// One section head site-wide (reading system, 3 Nov 2026): one weight, the
// second part highlighted in colour only. Wraps components/ui/SectionHead.
function SectionHead({ eyebrow, light, strong }: { eyebrow: string; light?: string; strong: string }) {
  return <SharedSectionHead eyebrow={eyebrow} light={light} strong={strong} animate={false} />;
}


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          HERO — bg: Horizon gradient, matches the homepage and About hero
          ════════════════════════════════════════════════════════════════════ */}
      <PageHero
        eyebrow="Working with us"
        light="Every business challenge is different."
        strong="Your solution should be, too."
        lead="We help South African businesses identify and implement practical AI solutions with POPIA-aware data governance built into the scope."
      />

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 — WHY WE PRICE THIS WAY — bg: flow ground
          ════════════════════════════════════════════════════════════════════ */}
      <div className="flow-ground">
      <section className="sec overflow-hidden">
        <DotField tone="light" mask="right" coverage={0.42} intensity={0.6} seed={4} />
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
                The business challenge determines the workflow to investigate. The workflow determines the systems, information, people, controls, and implementation work involved.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 — WHAT DETERMINES THE INVESTMENT — bg: flow ground (the steps section was dropped, 31 Oct)
          ════════════════════════════════════════════════════════════════════ */}
      <section className="sec sec-ruled">
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
            <div className="card-lift">
              <div className="card-body">
                <div className="card-label-row">
                  <span className="glyph-chip">
                    <Glyph name="layers" size={22} />
                  </span>
                </div>
                <h3 className="card-title">Cost factors</h3>
                <ul className="prob-list md:grid-cols-2 md:gap-x-8">
                  {factors.map((item) => (
                    <li key={item}>
                      <span className="prob-dot" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5 — COMMERCIAL CLARITY — bg: flow ground
          ════════════════════════════════════════════════════════════════════ */}
      <section className="sec sec-ruled overflow-hidden">
        {/* Last section of a three-section light run: dots from the other side. */}
        <DotField tone="light" mask="left" coverage={0.42} intensity={0.6} seed={9} />
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
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 6 — FINAL CTA — bg: Horizon gradient
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className="navy-horizon sec sec-chapter relative overflow-hidden"
      >
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <h2 style={{ marginBottom: "1.5rem", border: "none", color: "var(--color-ink-inverted)" }}>
              Let us understand your business challenge.
            </h2>
            <p className="body-on-navy" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
              Tell us what you are trying to improve. We will use that context to recommend the next step: the free POPIA review, a scoped discovery phase to confirm the problem and the scope, or an implementation plan where those are already clear.
            </p>
            <div className="flex flex-col items-stretch sm:items-start gap-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Button href={CONTACT_HREF} variant="primary" className="w-full sm:w-auto">
                  Discuss your challenge
                </Button>
                <Button href={ASSESSMENT_HREF} variant="secondary" className="w-full sm:w-auto">
                  Take the free POPIA review
                </Button>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "var(--text-meta)",
                  color: "var(--color-ink-inverted)",
                  opacity: 0.8,
                  margin: 0,
                }}
              >
                Maru Online provides implementation and design support. This is not legal advice, and it does not guarantee POPIA compliance. Where independent legal advice is required, it should be sought separately.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
