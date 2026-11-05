import { Metadata } from "next";
import Button from "@/components/ui/Button";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/Animate";
import AssessmentFormSection from "@/components/homepage/AssessmentFormSection";
import ImageBand from "@/components/ui/ImageBand";
import DisconnectDiagram from "@/components/ui/DisconnectDiagram";
import ProblemCards from "@/components/homepage/ProblemCards";
import Glyph from "@/components/ui/Glyph";
import { DrawnVisual } from "@/components/ui/CardMedia";
import SectionHead from "@/components/ui/SectionHead";
import DotField from "@/components/ui/DotField";
import { seo } from '@/lib/seo'

// Homepage copy: "Maru Online — Revised Website Copy" v1.0 (handover, 1 Nov 2026),
// applied over "MaruOnline Website Copy, Sections 1–4" (approved 20 Oct 2026).
// Editorial rules that came with it:
//  - The free, informational POPIA review is a summary of areas to review
//    against POPIA. Never call it a certification or a compliance audit.
//  - Every listed capability must be work Maru Online can deliver. Keep
//    "Data-informed growth systems" about customer data, revenue processes and
//    AI-enabled growth, not standalone campaign management.
//
// Layout: "Open Flow" (approved 4 Nov 2026). One stone ground with hairline
// dividers, tight heading groups with wide gaps after them, navy sections in
// the Horizon gradient, faint DotField on light sections only. Classes live in
// the "Homepage layout" block at the end of globals.css.

export const metadata: Metadata = {
  ...seo('/'),
  title: "POPIA-Aware AI Implementation for South African Businesses | Maru Online",
  description:
    "Maru Online helps South African businesses solve operational problems by connecting AI, data and the tools their teams already use, with POPIA-aware data governance built into the design and implementation.",
};

// ─── Content ──────────────────────────────────────────────────────────────────

// Steps: shown as rows beside the heading (Open Flow, 4 Nov 2026), copy as bullets.
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
    name: "Business and AI Strategy",
    lead: "Understand the problem before building the solution.",
    items: [
      "Business and workflow analysis",
      "AI opportunity identification and prioritisation",
      "Systems architecture and implementation roadmaps",
    ],
  },
  {
    name: "Digital Systems and Integration",
    lead: "Build the digital foundations your business needs to work better.",
    items: [
      "Websites, web applications, and e-commerce platforms",
      "AI integration across business systems and data sources",
      "Connected infrastructure that evolves with the business",
    ],
  },
  {
    name: "Data-Informed Growth Systems",
    lead: "Turn business information into better decisions and more effective customer processes.",
    items: [
      "Customer journey and revenue process analysis",
      "Data-informed marketing and growth strategy",
      "AI-enabled lead management, engagement, and follow-up",
    ],
  },
];

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="prob-list">
    {items.map((p) => (
      <li key={p}>
        <span className="prob-dot" aria-hidden="true" />
        <span>{p}</span>
      </li>
    ))}
  </ul>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          SECTION 01 — HERO
          bg: Horizon gradient
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className="sec navy-horizon hero-grid relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: "clamp(9rem, 15vw, 12rem)" }}
      >
        {/* Fixed-width column: production's column shrank to the longest headline
            line and re-centred, so its left edge moved whenever the copy changed. */}
        <div className="relative w-full max-w-[900px] mx-auto">
          <FadeUp>
            <span className="label-eyebrow" style={{ marginBottom: "2.5rem" }}>POPIA-aware AI implementation</span>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split" style={{ marginBottom: "2.5rem" }}>
              <span className="maru-headline-split-light">Your team already uses AI.</span>
              <br />
              <span className="maru-headline-split-strong">Is it POPIA-aware?</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "var(--text-body)",
                color: "var(--color-ink-inverted-muted)",
                lineHeight: "var(--leading-body-relaxed)",
                maxWidth: "640px",
                marginBottom: "1.5rem",
              }}
            >
              Maru Online helps South African businesses solve operational problems by designing and implementing practical AI-enabled workflows around the tools their teams already use. We consider POPIA-related data protection requirements from the beginning.
            </p>
          </FadeUp>

          <FadeUp delay={0.19}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "var(--text-body)",
                color: "var(--color-cyan)",
                lineHeight: "var(--leading-body-relaxed)",
                maxWidth: "640px",
                marginBottom: "3.5rem",
                textWrap: "balance",
              }}
            >
              Less manual administration. Better-connected data. More time for the work that matters.
            </p>
          </FadeUp>

          <FadeUp delay={0.22}>
            {/* data-maru-primary-cta: marks the hero's primary actions. The floating
                WhatsApp bubble that watched for it was retired on 3 Nov 2026. */}
            <div data-maru-primary-cta className="flex flex-col items-stretch sm:items-start gap-3">
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
          bg: flow ground + faint dots from the right
          ════════════════════════════════════════════════════════════════════ */}
      <div className="flow-ground">
        <section className="sec overflow-hidden">
          <DotField tone="light" mask="right" coverage={0.45} intensity={0.65} seed={4} />
          <div className="sec-inner">
            <SectionHead
              eyebrow="The problem"
              title={<>Disconnected systems create <span className="hl">unnecessary work.</span></>}
              intro="Your business tools may work well individually. When they do not share information effectively, manual work increases, data becomes fragmented, and information-handling becomes harder to manage."
            />
            <ProblemCards />
          </div>
        </section>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 03 — WHAT CHANGES (dark chapter)
          The cards are the cost of disconnected tools; the diagram is the fix
          (story turn, Option A, approved 3 Nov 2026). Its own navy chapter
          since 4 Nov 2026.
          ════════════════════════════════════════════════════════════════════ */}
      <section className="sec sec-chapter navy-horizon overflow-hidden">
        <div className="sec-inner">
          <SectionHead
            eyebrow="What changes"
            title={<>Your tools stay. <span className="hl">We connect them.</span></>}
            intro="Information is captured once and shared where it's needed, so your team retypes less and personal information sits in fewer places."
            dark
          />
          <div>
            <DisconnectDiagram />
          </div>
        </div>
      </section>

      <div className="flow-ground">
        {/* ══════════════════════════════════════════════════════════════════
            SECTION 04 — HOW WE WORK
            Heading stays in view beside the three steps. overflow-clip, not
            overflow-hidden, or the sticky heading never sticks.
            ══════════════════════════════════════════════════════════════════ */}
        <section id="how-we-work" className="sec overflow-clip">
          <DotField tone="light" mask="left" coverage={0.42} intensity={0.6} seed={9} />
          <div className="sec-inner">
            <div className="split">
              <div className="split-sticky">
                <SectionHead
                      eyebrow="How we work"
                  title={<>From business challenge to <span className="hl">working AI-enabled workflow.</span></>}
                  intro="Every engagement starts with understanding the business problem, identifying the workflow that needs attention, and determining where AI or better-connected systems can create practical value. We then design, integrate, test, and refine the solution around your existing operations."
                />
              </div>
              <StaggerParent className="rows rows-lift">
                {steps.map((step) => (
                  <StaggerChild key={step.n} className="row-item">
                    <span className="glyph-chip glyph-chip-lg" aria-hidden="true">
                      <Glyph name={step.icon} size={28} />
                    </span>
                    <div>
                      <span className="card-label" style={{ display: "block", marginBottom: "0.5rem" }}>Step {step.n}</span>
                      <h3 className="card-title">{step.name}</h3>
                      <BulletList items={step.points} />
                    </div>
                  </StaggerChild>
                ))}
              </StaggerParent>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 05 — POPIA-AWARE EXPLANATION (revised copy, 1 Nov 2026)
            ══════════════════════════════════════════════════════════════════ */}
        <section id="popia-aware" className="sec sec-ruled">
          <div className="sec-inner">
            <FadeUp className="pair">
              <h2 className="statement">
                Responsible implementation starts with{" "}
                <span className="hl">understanding the information involved.</span>
              </h2>
              <div>
                <p className="body-muted" style={{ marginBottom: "1.75rem" }}>
                  POPIA-aware means considering how personal information is collected, accessed, used, shared, stored, and retained when an AI-enabled workflow is designed or implemented. The exact considerations depend on the information, the purpose, the systems involved, and the providers connected to the workflow.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-meta)",
                    color: "var(--color-ink-tertiary)",
                    lineHeight: 1.6,
                    margin: 0,
                    borderLeft: "3px solid var(--color-cyan)",
                    paddingLeft: "1rem",
                  }}
                >
                  Maru Online provides implementation and design support. This is not legal advice or a blanket guarantee of POPIA compliance.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 06 — SUPPORTING CAPABILITIES
            ══════════════════════════════════════════════════════════════════ */}
        <section id="capabilities" className="sec sec-ruled overflow-hidden">
          <DotField tone="light" mask="right" coverage={0.42} intensity={0.6} seed={15} />
          <div className="sec-inner">
            <SectionHead
              eyebrow="Supporting capabilities"
              title={<>Capabilities that <span className="hl">support implementation.</span></>}
              intro="The right AI workflow depends on the business decisions, systems, data, and processes around it. We bring these elements together to help South African businesses build connected, usable systems that can evolve over time."
            />
            {/* Built like the Guides & Resources cards (5 Nov 2026): the
                drawn navy panel sits flush at the top (square bottom corners)
                and carries the title; the body below keeps the card edge. */}
            <StaggerParent className="cap-cards">
              {capabilities.map((col) => (
                <StaggerChild key={col.name} className="h-full">
                  <article className="card-lift h-full flex flex-col overflow-hidden">
                    <DrawnVisual title={col.name} className="cap-card-visual" />
                    <div className="card-body">
                      <p className="card-text card-text-lead">{col.lead}</p>
                      <BulletList items={col.items} />
                    </div>
                  </article>
                </StaggerChild>
              ))}
            </StaggerParent>
          </div>
        </section>
      </div>

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
        height={520}
      />

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 07 — NEXT STEPS
          ════════════════════════════════════════════════════════════════════ */}
      <div className="flow-ground">
        <AssessmentFormSection />
      </div>
    </>
  );
}
