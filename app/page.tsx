import { Metadata } from "next";
import Button from "@/components/ui/Button";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/Animate";
import AssessmentFormSection from "@/components/homepage/AssessmentFormSection";
import ImageBand from "@/components/ui/ImageBand";
import { BGPattern } from "@/components/ui/bg-pattern";
import DisconnectDiagram from "@/components/ui/DisconnectDiagram";
import ProblemCards from "@/components/homepage/ProblemCards";
import Glyph from "@/components/ui/Glyph";
import HeroLight from "@/components/ui/HeroLight";
import { seo } from '@/lib/seo'

// Homepage copy: "MaruOnline Website Copy, Sections 1–4", approved 20 Oct 2026.
// Editorial rules that came with it:
//  - The free POPIA Assessment is an informational summary of areas to review
//    against POPIA. Never call it a certification or a compliance audit.
//  - Every listed capability must be work Maru Online can deliver. Keep
//    "Data-Driven Growth Systems" about customer data, revenue processes and
//    AI-enabled growth, not standalone campaign management.

export const metadata: Metadata = {
  ...seo('/'),
  title: "POPIA-Aware AI Systems for South African Businesses | Maru Online",
  description:
    "We design AI systems around your business's challenges and integrate them into your existing workflows, with POPIA requirements in mind. Take the free POPIA Assessment.",
};

// ─── Layout constants ─────────────────────────────────────────────────────────
const outerPad = "px-6 md:px-[60px]";
const innerWide = "max-w-[1100px] mx-auto";

// ─── Content ──────────────────────────────────────────────────────────────────

const steps = [
  {
    n: "1",
    tint: "paper-blue",
    name: "Business & Workflow Assessment",
    body: "Identify operational bottlenecks, repetitive tasks and opportunities for improvement. Establish where AI can deliver practical business value.",
  },
  {
    n: "2",
    tint: "paper-teal",
    name: "AI System Design & Integration",
    body: "We design AI systems around your specific business needs and integrate them into your existing workflows, systems and data sources, with data protection considered from the outset.",
  },
  {
    n: "3",
    tint: "paper-gold",
    name: "Optimisation & Handover",
    body: "Measure performance against an agreed baseline, refine the system and equip your team to use and manage it effectively.",
  },
];

const capabilities = [
  {
    icon: "compass" as const,
    name: "Business & AI Strategy",
    lead: "Understand the problem before building the solution.",
    items: [
      "Business and workflow analysis",
      "AI opportunity identification and prioritisation",
      "Systems architecture and implementation roadmaps",
    ],
  },
  {
    icon: "browser" as const,
    name: "Digital Systems & Integration",
    lead: "Build the digital foundations your business needs to grow.",
    items: [
      "Websites, web applications and e-commerce platforms",
      "AI integration across business systems and data sources",
      "Connected digital infrastructure designed to support evolving business needs",
    ],
  },
  {
    icon: "signal" as const,
    name: "Data-Driven Growth Systems",
    lead: "Turn business data into better decisions and more effective customer processes.",
    items: [
      "Customer journey and revenue process analysis",
      "Data-informed marketing and growth strategy",
      "AI-enabled lead management, customer engagement and follow-up",
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          SECTION 01 — HERO
          bg: navy-deep
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative min-h-screen flex items-center overflow-hidden ${outerPad} pt-28 sm:pt-36 md:pt-48 pb-16 sm:pb-24 md:pb-32`}
        style={{ background: "var(--gradient-hero)" }}
      >
        <BGPattern
          variant="grid"
          mask="fade-edges"
          size={40}
          fill="rgba(61, 184, 198, 0.101)"
          className="pointer-events-none"
        />
        {/* Responsive light: rests behind the empty right side, follows a mouse. */}
        <HeroLight />
        {/* Fixed-width column: production's column shrank to the longest headline
            line and re-centred, so its left edge moved whenever the copy changed.
            900px centred puts it at production's 190px at a 1280px viewport. */}
        <div className="relative w-full max-w-[900px] mx-auto">
          <FadeUp>
            <span className="label-eyebrow" style={{ marginBottom: "3rem" }}>AI Implementation Consultancy</span>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split" style={{ marginBottom: "2.5rem" }}>
              <span className="maru-headline-split-light">Your Team Already Uses AI.</span>
              <br />
              <span className="maru-headline-split-strong">Is It POPIA-Aware?</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <div style={{ maxWidth: "680px", marginBottom: "2rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "var(--text-body)",
                  color: "var(--color-ink-inverted-muted)",
                  lineHeight: "var(--leading-body-relaxed)",
                  marginBottom: 0,
                }}
              >
                We design AI systems around the way your business already works and build them into the tools your team uses every day, with South Africa&apos;s POPIA requirements in mind from the start.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.19}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "var(--text-body)",
                color: "var(--color-cyan)",
                lineHeight: "var(--leading-body-relaxed)",
                maxWidth: "680px",
                marginBottom: "3rem",
                textWrap: "balance",
              }}
            >
              Less manual admin. Cleaner data. More time for the work that matters.
            </p>
          </FadeUp>

          <FadeUp delay={0.22}>
            {/* data-maru-primary-cta: the floating WhatsApp bubble watches for this
                and hides itself while this button is on screen. See
                components/ui/WhatsAppWidget. */}
            <div
              data-maru-primary-cta
              className="flex flex-col items-stretch sm:items-start gap-3"
            >
              <Button href="/popia-ai-check" variant="primary" className="cta-shine w-full sm:w-auto justify-center">
                Take Your Free POPIA Assessment
              </Button>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#9FB3BE",
                  margin: 0,
                }}
              >
                Free assessment · Report delivered by email
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 02 — THE PROBLEM
          bg: canvas
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ background: "var(--gradient-surface)" }}
      >
        <div className={innerWide}>
          <FadeUp>
            <span className="label-eyebrow" style={{ marginBottom: "1.5rem" }}>The problem</span>
            <h2 className="h2-blend" style={{ marginBottom: "1.25rem" }}>
              Disconnected Systems
              <br />
              Create <span className="hl">Unnecessary Work.</span>
            </h2>
            <p
              className="body-muted"
              style={{ maxWidth: "720px", marginBottom: "var(--space-section-header-mb)" }}
            >
              Your business tools may work well individually. But when systems don&apos;t share information effectively, manual work increases, data becomes fragmented and managing data protection becomes more difficult.
            </p>
          </FadeUp>

          <ProblemCards />

          {/* The picture of the fix, below the cards: the same five systems the
              cards describe, joined into one live view. */}
          <div
            className="mx-auto"
            style={{ maxWidth: "1000px", marginTop: "var(--space-section-header-mb)" }}
          >
            <DisconnectDiagram />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 03 — HOW WE WORK
          bg: secondary
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="how-we-work"
        className={`${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <div className={innerWide}>
          <FadeUp>
            <span className="label-eyebrow" style={{ marginBottom: "1.5rem" }}>How we work</span>
            <h2 className="h2-blend" style={{ marginBottom: "1.25rem" }}>
              From Business Challenge
              <br />
              to <span className="hl">Working AI System.</span>
            </h2>
            <p
              className="body-muted"
              style={{ maxWidth: "760px", marginBottom: "var(--space-section-header-mb)" }}
            >
              Every engagement starts with understanding your business, identifying the problems worth solving, and determining where AI can make a measurable difference. We then design, integrate and refine a solution around your existing operations, with POPIA requirements in mind.
            </p>
          </FadeUp>

          {/* Tinted paper cards, straight: after the mess in section 2, order. */}
          <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <StaggerChild key={step.n} className="h-full">
                <div
                  className={`paper-card paper-straight ${step.tint} h-full`}
                  style={{ padding: "2.25rem 1.875rem" }}
                >
                  <span className="paper-num" style={{ display: "flex", marginBottom: "1.25rem" }} aria-hidden="true">
                    0{step.n}
                  </span>
                  <h3
                    style={{
                      fontSize: "var(--text-h3-sans)",
                      fontWeight: 500,
                      color: "var(--color-ink-primary)",
                      lineHeight: 1.3,
                      marginBottom: "0.875rem",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    <span className="sr-only">Step {step.n}: </span>
                    {step.name}
                  </h3>
                  <p className="body-muted" style={{ marginBottom: 0, color: "#3A4A5A" }}>
                    {step.body}
                  </p>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 04 — SUPPORTING CAPABILITIES
          bg: canvas
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="capabilities"
        className={`${outerPad} py-24`}
        style={{ background: "var(--gradient-surface)" }}
      >
        <div className={innerWide}>
          <FadeUp>
            <span className="label-eyebrow" style={{ marginBottom: "1.5rem" }}>Supporting capabilities</span>
            <h2 className="h2-blend" style={{ marginBottom: "1.25rem" }}>
              Strategy, Digital Infrastructure
              <br />
              <span className="hl">&amp; Growth</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "var(--text-body)",
                color: "var(--color-ink-primary)",
                lineHeight: "var(--leading-body)",
                maxWidth: "760px",
                marginBottom: "0.75rem",
              }}
            >
              The right systems start with the right business decisions.
            </p>
            <p
              className="body-muted"
              style={{ maxWidth: "760px", marginBottom: "var(--space-section-header-mb)" }}
            >
              AI delivers more value when business strategy, digital infrastructure and operational processes work together. We bring these elements together to help South African businesses build connected, data-informed systems that support growth.
            </p>
          </FadeUp>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {capabilities.map((col) => (
              <StaggerChild key={col.name} className="h-full">
                <div
                  className="card-lift h-full rounded-[10px]"
                  style={{ padding: "1.75rem 1.5rem" }}
                >
                  <span className="glyph-chip glyph-chip-lg" style={{ marginBottom: "1.25rem" }}>
                    <Glyph name={col.icon} size={28} />
                  </span>

                  <h3
                    style={{
                      fontSize: "var(--text-h3-sans)",
                      fontWeight: 600,
                      color: "var(--color-ink-primary)",
                      lineHeight: 1.3,
                      marginBottom: "0.75rem",
                      borderBottom: "2px solid var(--color-cyan)",
                      paddingBottom: "0.75rem",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {col.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "var(--text-body-sm)",
                      color: "var(--color-ink-primary)",
                      lineHeight: "var(--leading-body)",
                      marginBottom: "1rem",
                    }}
                  >
                    {col.lead}
                  </p>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {col.items.map((item) => (
                      <li
                        key={item}
                        style={{
                          fontSize: "var(--text-body-sm)",
                          color: "var(--color-ink-secondary)",
                          padding: "4px 0",
                          lineHeight: "var(--leading-body)",
                          display: "flex",
                          gap: "8px",
                          alignItems: "flex-start",
                          fontFamily: "var(--font-body)",
                          fontWeight: 300,
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            color: "var(--color-cyan)",
                            flexShrink: 0,
                            lineHeight: "var(--leading-body)",
                          }}
                        >
                          →
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── IMAGE BAND — between capabilities and the assessment section ── */}
      <ImageBand
        src="/images/people/replace-team.png"
        alt="Two professionals celebrating a win together in the office"
        overlayText={
          <>
            <span style={{ display: 'block', fontWeight: 200 }}>We don&apos;t replace your team.</span>
            <span style={{ display: 'block', fontWeight: 200 }}>
              We give them their <span style={{ color: 'var(--color-cyan)' }}>time back.</span>
            </span>
          </>
        }
        height={420}
      />

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 05 — POPIA ASSESSMENT
          bg: navy
          ════════════════════════════════════════════════════════════════════ */}
      <AssessmentFormSection />

    </>
  );
}
