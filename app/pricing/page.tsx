import { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import Button from "@/components/ui/Button";
import Glyph from "@/components/ui/Glyph";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/Animate";
import { seo } from "@/lib/seo";

// Engagement & Investment page. Copy: "Engagement & Investment Page — Copy and
// Implementation Brief", supplied 30 Oct 2026. Applied as written, except the
// brand name, which the site writes "Maru Online" (two words), never "MaruOnline".
//
// Rules this page must keep:
//  - No price figures, price ranges, packages or "fixed price" wording. The
//    page explains how investment is determined; it does not state any.
//  - Discovery, assessment and consultation are not described as free. Only the
//    POPIA Assessment is free, and it is labelled as such by its own CTA.
//  - No turnaround or response-time promises.
//  - Speaks as "we". Never names or implies the founder.
//  - No outbound links in the page body. CTAs go to the contact form and the
//    POPIA Assessment, as on the About page.
//  - No separate Our Process page: /process still redirects to the homepage.
//  - One H1 (the hero). H2 for sections, H3 for cards and steps. Eyebrows are
//    styled spans, not headings.
//
// Section 5 describes intended commercial practice (scope, assumptions, change
// handling, third-party costs). Confirm it matches how Maru Online contracts
// before this page is released.

export const metadata: Metadata = {
  ...seo("/pricing"),
  title: "Engagement & Investment | How Maru Online Approaches Pricing",
  description:
    "We start with your business challenge, then determine the right approach, scope and investment. See how an engagement takes shape and what determines the cost.",
};

const outerPad = "px-6 md:px-[60px]";
const innerWide = "max-w-[1100px] mx-auto";
const innerText = "max-w-[820px]";

const CONTACT_HREF = "/contact#contact-form";
const ASSESSMENT_HREF = "/popia-ai-check";

// ─── Content ──────────────────────────────────────────────────────────────────

const steps = [
  {
    n: "01",
    label: "Understand the business challenge",
    heading: "Establish What Needs to Change",
    body: "We discuss the operational challenge, the current process and the outcome your business wants to achieve. The objective is to understand the underlying problem before deciding whether AI is the appropriate response.",
  },
  {
    n: "02",
    label: "Assess the opportunity",
    heading: "Determine the Right Approach",
    body: "We assess where AI, systems integration or other digital solutions could address the challenge. The recommended approach depends on your existing systems, processes, data and business requirements.",
  },
  {
    n: "03",
    label: "Define the scope",
    heading: "Establish What the Work Involves",
    body: "Once the appropriate approach is established, we define the proposed solution, deliverables, implementation requirements and relevant assumptions. Where further investigation is required before the implementation can be scoped reliably, that requirement should be identified and agreed separately.",
  },
  {
    n: "04",
    label: "Agree on the investment",
    heading: "Know What You’re Committing To",
    body: "Before implementation begins, we communicate the agreed scope, investment, expected timeline and relevant responsibilities. Any material third-party costs or assumptions that could affect the engagement should also be identified.",
  },
];

const factors = [
  {
    icon: "layers" as const,
    heading: "Existing Systems and Processes",
    body: "The applications, data sources and workflows involved, including the extent to which they need to be connected or changed.",
  },
  {
    icon: "connect" as const,
    heading: "Solution Complexity",
    body: "The level of integration, development and configuration required to address the identified business challenge.",
  },
  {
    icon: "shield" as const,
    heading: "Data and Governance Requirements",
    body: "The nature of the information involved, access requirements, security considerations and relevant data protection obligations.",
  },
  {
    icon: "clipboard" as const,
    heading: "Implementation and Support",
    body: "The work required for testing, deployment, documentation, staff training, ongoing maintenance or optimisation, where applicable.",
  },
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

const cardLabel: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-label)",
  fontWeight: 500,
  letterSpacing: "var(--tracking-eyebrow)",
  textTransform: "uppercase",
  color: "var(--color-ink-tertiary)",
  marginBottom: "0.5rem",
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
            <span className="label-eyebrow" style={{ marginBottom: "2rem" }}>Engagement &amp; Investment</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split" style={{ marginBottom: "2rem" }}>
              <span className="maru-headline-split-light">Every Business Challenge Is Different.</span>
              <br />
              <span className="maru-headline-split-strong">Your Solution Should Be, Too.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="body-on-navy" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
              We start by understanding your business challenge, then determine the right approach, scope and investment. Before implementation begins, you should understand what is being proposed, what it will cost and what the engagement is intended to achieve.
            </p>
          </FadeUp>
          <FadeUp delay={0.22}>
            <div
              data-maru-primary-cta
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Button href={CONTACT_HREF} variant="primary" className="w-full sm:w-auto justify-center">
                Discuss a Business Challenge
              </Button>
              <Button href={ASSESSMENT_HREF} variant="secondary" className="w-full sm:w-auto justify-center">
                Take Your Free POPIA Assessment
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
              light="We Start with the Problem,"
              strong="Not a Package."
            />
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className={innerText}>
              <p className="body-muted" style={{ marginBottom: "1.25rem" }}>
                Every business operates differently. The systems it uses, the processes it follows and the challenges it faces all influence what an effective solution requires.
              </p>
              <p className="body-muted" style={{ marginBottom: "1.25rem" }}>
                One business may need to connect existing applications and reduce manual data processing. Another may require a more extensive AI system involving multiple data sources, redesigned workflows or purpose-built development.
              </p>
              <p className="body-muted" style={{ marginBottom: "1.25rem" }}>
                These are different problems, and they should not automatically be approached or priced in the same way.
              </p>
              <p className="body-muted" style={{ marginBottom: "1.5rem" }}>
                At Maru Online, we first establish what needs to change and where AI can make a practical difference. The proposed solution and its scope then determine the investment.
              </p>
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
                The business challenge determines the solution. The solution determines the scope and investment.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 — FROM CHALLENGE TO PROPOSAL — bg: secondary
          Four steps shown as a numbered sequence in the About card style.
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead
              eyebrow="How an engagement takes shape"
              light="Understand the Challenge."
              strong="Define the Work."
            />
            <p className={`body-muted ${innerText}`} style={{ marginBottom: "var(--space-section-header-mb)" }}>
              Before recommending a solution, we need to understand the problem, the intended outcome and the practical requirements involved. This gives both parties a clearer basis for deciding what should be built and what the engagement will involve.
            </p>
          </FadeUp>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {steps.map((step) => (
              <StaggerChild key={step.n} className="h-full">
                <article
                  className="card-lift h-full rounded-[10px]"
                  style={{ padding: "2rem 1.75rem", borderTop: "3px solid var(--color-cyan)" }}
                >
                  <span style={{ ...cardLabel, color: "var(--color-cyan-ink, var(--color-ink-tertiary))" }}>
                    Step {step.n} — {step.label}
                  </span>
                  <h3 style={cardHeading}>{step.heading}</h3>
                  <p className="body-muted" style={{ marginBottom: 0 }}>{step.body}</p>
                </article>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 — WHAT DETERMINES THE INVESTMENT — bg: surface
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ background: "var(--gradient-surface)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead eyebrow="Project scope" strong="The Work Determines the Cost." />
            <div className={innerText} style={{ marginBottom: "var(--space-section-header-mb)" }}>
              <p className="body-muted" style={{ marginBottom: "1rem" }}>
                The investment required for an AI system depends on what the business needs, the complexity of the proposed solution and the work involved in putting it into practice.
              </p>
              <p className="body-muted" style={{ marginBottom: 0 }}>
                Factors may include:
              </p>
            </div>
          </FadeUp>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {factors.map((card) => (
              <StaggerChild key={card.heading} className="h-full">
                <div className="card-lift h-full rounded-[10px]" style={{ padding: "1.75rem 1.5rem" }}>
                  <span className="glyph-chip" style={{ marginBottom: "1rem" }}>
                    <Glyph name={card.icon} size={22} />
                  </span>
                  <h3 style={cardHeading}>{card.heading}</h3>
                  <p className="body-muted" style={{ marginBottom: 0 }}>{card.body}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>

          <FadeUp delay={0.08}>
            <p className={`body-muted ${innerText}`} style={{ marginTop: "2rem", marginBottom: 0 }}>
              These factors vary from one engagement to another. We use the requirements of the proposed solution to establish a realistic scope and investment rather than applying a standard price to fundamentally different projects.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5 — COMMERCIAL CLARITY — bg: secondary
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead eyebrow="Before work begins" strong={"Know What You’re Committing To."} />
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className={innerText}>
              <p className="body-muted" style={{ marginBottom: "1.25rem" }}>
                A clear engagement starts with a shared understanding of the work involved.
              </p>
              <p className="body-muted" style={{ marginBottom: "1.25rem" }}>
                Our proposals should establish the agreed scope, deliverables, expected timeline and investment, together with any relevant assumptions, exclusions and responsibilities.
              </p>
              <p className="body-muted" style={{ marginBottom: "1.25rem" }}>
                Where third-party services are required, such as software licences, AI API usage or hosting, these costs should be identified and distinguished from Maru Online&apos;s fees wherever applicable.
              </p>
              <p className="body-muted" style={{ marginBottom: "1.5rem" }}>
                If requirements change or additional work becomes necessary, the implications for scope, cost and timing should be discussed before that work proceeds.
              </p>
              <p
                className="body-muted"
                style={{
                  marginBottom: 0,
                  borderLeft: "4px solid var(--color-cyan)",
                  paddingLeft: "1.25rem",
                }}
              >
                The objective is straightforward: both parties should understand what has been agreed and what is required to deliver the proposed solution.
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
              <span style={{ fontWeight: 700 }}>Let&apos;s Understand Your Business Challenge.</span>
            </h2>
            <p className="body-on-navy" style={{ maxWidth: "680px", marginBottom: "1rem" }}>
              If you&apos;re considering AI for your business, the starting point is not choosing a tool. It&apos;s understanding the problem you need to solve.
            </p>
            <p className="body-on-navy" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
              Tell us what your business is trying to achieve, where current processes are falling short or what you would like to improve. We&apos;ll use that context to determine the appropriate next step.
            </p>
            <div className="flex flex-col items-stretch sm:items-start gap-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Button href={CONTACT_HREF} variant="primary" className="w-full sm:w-auto justify-center">
                  Discuss a Business Challenge
                </Button>
                <Button href={ASSESSMENT_HREF} variant="secondary" className="w-full sm:w-auto justify-center">
                  Take Your Free POPIA Assessment
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
                Start with a conversation about your business challenge. The right approach comes next.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
