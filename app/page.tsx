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
import SectionHead from "@/components/ui/SectionHead";
import { seo } from '@/lib/seo'

// Homepage copy: "Maru Online — Revised Website Copy" v1.0 (handover, 1 Nov 2026),
// applied over "MaruOnline Website Copy, Sections 1–4" (approved 20 Oct 2026).
// Editorial rules that came with it:
//  - The free, informational POPIA review is a summary of areas to review
//    against POPIA. Never call it a certification or a compliance audit.
//  - Every listed capability must be work Maru Online can deliver. Keep
//    "Data-informed growth systems" about customer data, revenue processes and
//    AI-enabled growth, not standalone campaign management.

export const metadata: Metadata = {
  ...seo('/'),
  title: "POPIA-Aware AI Implementation for South African Businesses | Maru Online",
  description:
    "Maru Online helps South African businesses solve operational problems by connecting AI, data and the tools their teams already use, with POPIA-aware data governance built into the design and implementation.",
};

// ─── Layout constants ─────────────────────────────────────────────────────────
const outerPad = "px-6 md:px-[60px]";
const innerWide = "max-w-[1100px] mx-auto";

// ─── Content ──────────────────────────────────────────────────────────────────

// Step cards: production card design (restored 2 Nov 2026), copy as bullets.
const steps = [
  {
    n: "1",
    icon: "search" as const,
    name: "Business and workflow assessment",
    points: [
      "Find bottlenecks, repetitive tasks, and information flows.",
      "Establish where AI can deliver practical business value.",
    ],
  },
  {
    n: "2",
    icon: "connect" as const,
    name: "AI system design and integration",
    points: [
      "Design an AI-enabled workflow around your business needs.",
      "Integrate it with the tools, systems, and data your team already uses.",
      "Consider POPIA-related data protection as part of the design.",
    ],
  },
  {
    n: "3",
    icon: "chart" as const,
    name: "Optimisation and handover",
    points: [
      "Measure performance against an agreed baseline.",
      "Refine the workflow and document how it works.",
      "Equip your team to use and manage it.",
    ],
  },
];

const capabilities = [
  {
    icon: "compass" as const,
    name: "Business and AI strategy",
    lead: "Understand the problem before building the solution.",
    items: [
      "Business and workflow analysis",
      "AI opportunity identification and prioritisation",
      "Systems architecture and implementation roadmaps",
    ],
  },
  {
    icon: "browser" as const,
    name: "Digital systems and integration",
    lead: "Build the digital foundations your business needs to work better.",
    items: [
      "Websites, web applications, and e-commerce platforms",
      "AI integration across business systems and data sources",
      "Connected infrastructure that evolves with the business",
    ],
  },
  {
    icon: "signal" as const,
    name: "Data-informed growth systems",
    lead: "Turn business information into better decisions and more effective customer processes.",
    items: [
      "Customer journey and revenue process analysis",
      "Data-informed marketing and growth strategy",
      "AI-enabled lead management, engagement, and follow-up",
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
            <span className="label-eyebrow" style={{ marginBottom: "3rem" }}>POPIA-aware AI implementation</span>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split" style={{ marginBottom: "2.5rem" }}>
              <span className="maru-headline-split-light">Your team already uses AI.</span>
              <br />
              <span className="maru-headline-split-strong">Is it POPIA-aware?</span>
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
                Maru Online helps South African businesses solve operational problems by designing and implementing practical AI-enabled workflows around the tools their teams already use. We consider POPIA-related data protection requirements from the beginning.
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
              Less manual administration. Better-connected data. More time for the work that matters.
            </p>
          </FadeUp>

          <FadeUp delay={0.22}>
            {/* data-maru-primary-cta: marks the hero's primary actions. The floating
                WhatsApp bubble that watched for it was retired on 3 Nov 2026. */}
            <div
              data-maru-primary-cta
              className="flex flex-col items-stretch sm:items-start gap-3"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button href="/popia-ai-check" variant="primary" className="cta-shine w-full sm:w-auto justify-center">
                  Take the free, informational POPIA review
                </Button>
                <Button href="/contact#contact-form" variant="secondary" className="w-full sm:w-auto justify-center">
                  Discuss your business challenge
                </Button>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "var(--color-ink-inverted-subtle)",
                  margin: 0,
                }}
              >
                10 questions. About 5 minutes. Receive a short summary by email.
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
          <SectionHead
            eyebrow="The problem"
            title={<>Disconnected systems create <span className="hl">unnecessary work.</span></>}
            intro="Your business tools may work well individually. When they do not share information effectively, manual work increases, data becomes fragmented, and information-handling becomes harder to manage."
          />

          <ProblemCards />

          {/* Story turn (Option A, approved 3 Nov 2026): the cards are the cost of
              disconnected tools; the diagram is the fix. The bridge names the
              turn so the two read as one argument, not two visuals. */}
          <FadeUp>
            <div
              className="mx-auto text-center"
              style={{ maxWidth: "640px", marginTop: "var(--space-section-header-mb)", marginBottom: "2rem" }}
            >
              <span
                aria-hidden="true"
                className="block mx-auto"
                style={{ width: "1px", height: "48px", background: "var(--color-cyan)", marginBottom: "1.5rem" }}
              />
              <span className="label-eyebrow label-eyebrow-ink" style={{ marginBottom: "1rem" }}>
                What changes
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                  color: "var(--color-ink-primary)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.75rem",
                }}
              >
                Your tools stay. <span style={{ color: "var(--color-cyan-ink)" }}>We connect them.</span>
              </h3>
              <p className="body-muted" style={{ marginBottom: 0 }}>
                Information is captured once and shared where it&apos;s needed, so your team retypes less and personal information sits in fewer places.
              </p>
            </div>
          </FadeUp>

          <div className="mx-auto" style={{ maxWidth: "1000px" }}>
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
          <SectionHead
            eyebrow="How we work"
            title={<>From business challenge to <span className="hl">working AI-enabled workflow.</span></>}
            intro="Every engagement starts with understanding the business problem, identifying the workflow that needs attention, and determining where AI or better-connected systems can create practical value. We then design, integrate, test, and refine the solution around your existing operations."
          />

          <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {steps.map((step) => (
              <StaggerChild key={step.n} className="h-full">
                <div className="card-lift h-full flex flex-col">
                  <div className="card-body">
                  <div className="card-label-row">
                    <span className="glyph-chip glyph-chip-lg">
                      <Glyph name={step.icon} size={28} />
                    </span>
                    <span className="card-label">0{step.n}</span>
                  </div>
                  <h3 className="card-title">{step.name}</h3>
                  <ul className="prob-list">
                    {step.points.map((p) => (
                      <li key={p}>
                        <span className="prob-dot" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 04 — POPIA-AWARE EXPLANATION (revised copy, 1 Nov 2026)
          bg: canvas
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="popia-aware"
        className={`${outerPad} py-24`}
        style={{ background: "var(--gradient-surface)" }}
      >
        <div className={innerWide}>
          <FadeUp>
            <h2 className="section-title">
              Responsible implementation starts with{" "}
              <span className="hl">understanding the information involved.</span>
            </h2>
            <p className="body-muted section-intro" style={{ marginBottom: "1.5rem" }}>
              POPIA-aware means considering how personal information is collected, accessed, used, shared, stored, and retained when an AI-enabled workflow is designed or implemented. The exact considerations depend on the information, the purpose, the systems involved, and the providers connected to the workflow.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "var(--text-meta)",
                color: "var(--color-ink-tertiary)",
                lineHeight: 1.6,
                maxWidth: "760px",
                margin: 0,
                borderLeft: "3px solid var(--color-cyan)",
                paddingLeft: "1rem",
              }}
            >
              Maru Online provides implementation and design support. This is not legal advice or a blanket guarantee of POPIA compliance.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 05 — SUPPORTING CAPABILITIES
          bg: secondary
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="capabilities"
        className={`${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <div className={innerWide}>
          <SectionHead
            eyebrow="Supporting capabilities"
            title={<>Capabilities that <span className="hl">support implementation.</span></>}
            intro="The right AI workflow depends on the business decisions, systems, data, and processes around it. We bring these elements together to help South African businesses build connected, usable systems that can evolve over time."
          />

          <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {capabilities.map((col) => (
              <StaggerChild key={col.name} className="h-full">
                <div className="card-lift h-full flex flex-col">
                  <div className="card-body">
                  <div className="card-label-row">
                    <span className="glyph-chip glyph-chip-lg">
                      <Glyph name={col.icon} size={28} />
                    </span>
                  </div>
                  <h3 className="card-title">{col.name}</h3>
                  <p className="card-text card-text-lead">{col.lead}</p>
                  <ul className="prob-list">
                    {col.items.map((item) => (
                      <li key={item}>
                        <span className="prob-dot" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  </div>
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
            <span style={{ display: 'block', fontWeight: 200 }}>We do not replace your team.</span>
            <span style={{ display: 'block', fontWeight: 200 }}>
              We give them their <span style={{ color: 'var(--color-cyan)' }}>time back.</span>
            </span>
          </>
        }
        height={420}
      />

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 06 — NEXT STEPS
          bg: canvas
          ════════════════════════════════════════════════════════════════════ */}
      <AssessmentFormSection />

    </>
  );
}
