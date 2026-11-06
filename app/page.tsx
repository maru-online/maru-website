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
import PageHero from "@/components/ui/PageHero";
import DotField from "@/components/ui/DotField";
import ToolsTicker from "@/components/ui/ToolsTicker";
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
    "Maru Online helps South African businesses resolve operational problems by connecting AI, data and the tools their teams already use, with POPIA-aware data governance built into the design and implementation.",
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
      "Record how the work is done today, including the time it takes, so improvement can be measured later.",
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

const bridgeReasons = [
  {
    title: "Tools are adopted informally",
    text: "People choose what helps them work, and nobody decides what personal information may be entered.",
  },
  {
    title: "Nobody owns the question",
    text: "Responsibility sits between the owner, whoever manages IT and whoever set up each tool.",
  },
  {
    title: "Time and expertise are limited",
    text: "Small businesses rarely have a specialist to map where information goes or to review supplier terms.",
  },
];

const capabilities = [
  {
    name: "Business and AI strategy",
    lead: "Understand the problem before building the solution.",
    items: [
      "Business and workflow analysis",
      "AI opportunity identification and prioritisation",
      "Systems architecture and implementation roadmaps",
    ],
  },
  {
    name: "Digital systems and integration",
    lead: "Build the digital foundations your business needs to work better.",
    items: [
      "Websites, web applications, and e-commerce platforms",
      "AI integration across business systems and data sources",
      "Systems that can be extended as the business changes",
    ],
  },
  {
    name: "Data-informed growth systems",
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
      <PageHero
        eyebrow="POPIA-aware AI implementation"
        light="Your team already uses AI."
        strong="Is it POPIA-aware?"
        lead="Maru Online helps South African businesses resolve operational problems by designing and implementing practical AI-enabled workflows around the tools their teams already use."
        actions={
          <>
            <Button href="/popia-ai-check" variant="primary" className="w-full sm:w-auto">
              Take the free POPIA review
            </Button>
            <Button href="/contact#contact-form" variant="secondary" className="w-full sm:w-auto">
              Discuss your challenge
            </Button>
          </>
        }
      />

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 02 — THE BRIDGE (6 Nov 2026)
          Connects the hero's POPIA question to the problem section: why gaps
          appear in ordinary businesses, in a calm register (no fear framing).
          Research brief: Perplexity, 6 Nov 2026. Figures re-checked against
          the Incasu-ITWeb article; Xero figure is the one already used in the
          AI-landscape insight.
          ════════════════════════════════════════════════════════════════════ */}
      <div className="flow-ground">
        <section id="why-it-matters" className="sec">
          <div className="sec-inner">
            <SectionHead
              eyebrow="AI and personal information"
              title={<>Staff already use AI tools, <span className="hl">often without clear rules for personal information.</span></>}
              intro="Staff choose AI assistants and chat apps because they save time on everyday work. Each choice is sensible. However, they can leave a business unsure where personal information goes, who can see it and what happens to it outside the business."
            />
            <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bridgeReasons.map((r) => (
                <StaggerChild
                  key={r.title}
                  className="pt-6"
                  style={{ borderTop: "1px solid var(--color-border-card)" }}
                >
                  <h3 className="card-title">{r.title}</h3>
                  <p className="body-muted" style={{ marginTop: "0.75rem" }}>{r.text}</p>
                </StaggerChild>
              ))}
            </StaggerParent>
            <FadeUp>
              <p className="body-muted" style={{ marginTop: "3rem", maxWidth: "46rem" }}>
                POPIA does not ask you to avoid AI or to keep your systems apart. It asks that you know what personal information you hold, why you hold it, where it goes and how long it is kept. Connecting your tools is the point at which you can make those answers deliberate, which is why we start with how your systems connect, or fail to.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-meta)",
                  color: "var(--color-ink-tertiary)",
                  lineHeight: 1.6,
                  margin: "1.5rem 0 0",
                  maxWidth: "46rem",
                }}
              >
                Xero&apos;s 2026 survey of 427 South African small businesses found that 52% use AI tools daily or weekly. In the Incasu-ITWeb AI Adoption Survey 2025 (144 responses), security and compliance concerns (52%) and lack of internal expertise (47%) were among the barriers respondents cited.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 03 — THE PROBLEM
            bg: flow ground + faint dots from the right
            ════════════════════════════════════════════════════════════════════ */}
        <section className="sec sec-ruled overflow-hidden">
          <DotField tone="light" mask="right" coverage={0.45} intensity={0.65} seed={4} />
          <div className="sec-inner">
            <SectionHead
              eyebrow="The problem"
              title={<>Disconnected systems create <span className="hl">unnecessary work.</span></>}
              intro="Your business tools may work well individually. When they do not share information effectively, manual work increases, data becomes fragmented, and information handling becomes harder to manage."
            />
            <ProblemCards />
          </div>
        </section>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 04 — WHAT CHANGES (dark chapter)
          The cards are the cost of disconnected tools; the diagram is the fix
          (story turn, Option A, approved 3 Nov 2026). Its own navy chapter
          since 4 Nov 2026.
          ════════════════════════════════════════════════════════════════════ */}
      <section className="sec sec-chapter navy-horizon overflow-hidden">
        <div className="sec-inner">
          <SectionHead
            eyebrow="What changes"
            title={<>Your tools stay. <span className="hl">We connect them.</span></>}
            intro="Information is captured once and shared where it is needed, so your team retypes less and personal information sits in fewer places."
            dark
          />
          <div>
            <DisconnectDiagram />
          </div>
        </div>
      </section>

      <div className="flow-ground">
        {/* ══════════════════════════════════════════════════════════════════
            SECTION 05 — HOW WE WORK
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
                  intro="Every engagement starts with understanding the business problem, identifying the workflow that needs attention, and determining where AI or better-connected systems can create practical value. We then design and integrate the solution around your existing operations, and test and refine it with your team before handover."
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
            SECTION 06 — POPIA-AWARE EXPLANATION (revised copy, 1 Nov 2026)
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
                  Maru Online provides implementation and design support. This is not legal advice, and it does not guarantee POPIA compliance.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 07 — SUPPORTING CAPABILITIES
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
        {/* ══════════════════════════════════════════════════════════════════
            TOOLS WE BUILD WITH (5 Nov 2026) — a slim band closing the
            capabilities section. Placed here, not after the "Your tools stay"
            diagram, so it reads as the stack behind our builds and is not
            mistaken for the client tools the diagram connects.
            ══════════════════════════════════════════════════════════════════ */}
        <section className="tools-band" aria-labelledby="tools-heading">
          <div className="sec-inner tools-band-inner">
            <div>
              <h2 id="tools-heading" className="tools-band-title">Tools we build with</h2>
              <p className="tools-band-text">Platforms we work with.</p>
            </div>
            <ToolsTicker />
          </div>
        </section>
      </div>

      {/* ── IMAGE BAND — between capabilities and the assessment section ── */}
      <ImageBand
        src="/images/people/replace-team.png"
        alt="A team of colleagues with their hands stacked together in a huddle"
        overlayText={
          <>
            <span className="maru-headline-split-light">We do not replace your team.</span>
            <br />
            <span className="maru-headline-split-strong">
              We give them their <span style={{ color: "var(--color-cyan)" }}>time back.</span>
            </span>
          </>
        }
        height={520}
      />

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 08 — NEXT STEPS
          ════════════════════════════════════════════════════════════════════ */}
      <div className="flow-ground">
        <AssessmentFormSection />
      </div>
    </>
  );
}
