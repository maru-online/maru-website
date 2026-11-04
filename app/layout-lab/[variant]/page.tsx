import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/Animate";
import AssessmentFormSection from "@/components/homepage/AssessmentFormSection";
import ImageBand from "@/components/ui/ImageBand";
import DisconnectDiagram from "@/components/ui/DisconnectDiagram";
import ProblemCards from "@/components/homepage/ProblemCards";
import Glyph from "@/components/ui/Glyph";
import HeroLight from "@/components/ui/HeroLight";
import SectionHead from "@/components/ui/SectionHead";
import DotField from "@/components/ui/DotField";
import { steps, capabilities } from "../content";
import "../lab.css";

// Layout lab: three layout directions for the homepage, same copy and
// components as app/page.tsx. Not linked, not indexed. Pick one, then it is
// promoted into the real page and this route is deleted.

const VARIANTS = {
  a: "A · Breathe",
  b: "B · Chapters",
  c: "C · Editorial split",
} as const;
type Variant = keyof typeof VARIANTS;

export const metadata: Metadata = {
  title: "Layout lab | Maru Online",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return Object.keys(VARIANTS).map((variant) => ({ variant }));
}

// ─── Shared copy blocks ───────────────────────────────────────────────────────

const problemHead = {
  eyebrow: "The problem",
  title: <>Disconnected systems create <span className="hl">unnecessary work.</span></>,
  intro:
    "Your business tools may work well individually. When they do not share information effectively, manual work increases, data becomes fragmented, and information-handling becomes harder to manage.",
};
const howHead = {
  eyebrow: "How we work",
  title: <>From business challenge to <span className="hl">working AI-enabled workflow.</span></>,
  intro:
    "Every engagement starts with understanding the business problem, identifying the workflow that needs attention, and determining where AI or better-connected systems can create practical value. We then design, integrate, test, and refine the solution around your existing operations.",
};
const capHead = {
  eyebrow: "Supporting capabilities",
  title: <>Capabilities that <span className="hl">support implementation.</span></>,
  intro:
    "The right AI workflow depends on the business decisions, systems, data, and processes around it. We bring these elements together to help South African businesses build connected, usable systems that can evolve over time.",
};
const popiaBody =
  "POPIA-aware means considering how personal information is collected, accessed, used, shared, stored, and retained when an AI-enabled workflow is designed or implemented. The exact considerations depend on the information, the purpose, the systems involved, and the providers connected to the workflow.";
const popiaNote =
  "Maru Online provides implementation and design support. This is not legal advice or a blanket guarantee of POPIA compliance.";

// ─── Shared pieces ────────────────────────────────────────────────────────────

function Hero({ align }: { align: "left" | "center" }) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto text-center" : ""} style={{ maxWidth: center ? "960px" : "900px" }}>
      <FadeUp>
        <span className="label-eyebrow" style={{ marginBottom: "2.5rem", marginInline: center ? "auto" : undefined }}>
          POPIA-aware AI implementation
        </span>
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
          className={center ? "mx-auto" : ""}
          style={{
            fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "var(--text-body)",
            color: "var(--color-ink-inverted-muted)", lineHeight: "var(--leading-body-relaxed)",
            maxWidth: "640px", marginBottom: "1.5rem",
          }}
        >
          Maru Online helps South African businesses solve operational problems by designing and implementing practical AI-enabled workflows around the tools their teams already use. We consider POPIA-related data protection requirements from the beginning.
        </p>
      </FadeUp>
      <FadeUp delay={0.19}>
        <p
          className={center ? "mx-auto" : ""}
          style={{
            fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "var(--text-body)",
            color: "var(--color-cyan)", lineHeight: "var(--leading-body-relaxed)",
            maxWidth: "640px", marginBottom: "3.5rem", textWrap: "balance",
          }}
        >
          Less manual administration. Better-connected data. More time for the work that matters.
        </p>
      </FadeUp>
      <FadeUp delay={0.22}>
        <div data-maru-primary-cta className={`flex flex-col gap-3 ${center ? "items-center" : "items-stretch sm:items-start"}`}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button href="/popia-ai-check" variant="primary" className="cta-shine w-full sm:w-auto justify-center">
              Take the free, informational POPIA review
            </Button>
            <Button href="/contact#contact-form" variant="secondary" className="w-full sm:w-auto justify-center">
              Discuss your business challenge
            </Button>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: "20px", color: "var(--color-ink-inverted-subtle)", margin: 0 }}>
            10 questions. About 5 minutes. Receive a short summary by email.
          </p>
        </div>
      </FadeUp>
    </div>
  );
}

function Bridge({ dark = false }: { dark?: boolean }) {
  return (
    <FadeUp>
      <div className="mx-auto text-center" style={{ maxWidth: "640px" }}>
        <span className={dark ? "label-eyebrow" : "label-eyebrow label-eyebrow-ink"} style={{ marginBottom: "1rem", marginInline: "auto" }}>
          What changes
        </span>
        <h3
          style={{
            fontFamily: "var(--font-display)", fontWeight: 600,
            fontSize: "clamp(1.5rem, 2.6vw, 2rem)", lineHeight: 1.25, letterSpacing: "-0.02em",
            color: dark ? "var(--color-ink-inverted)" : "var(--color-ink-primary)", marginBottom: "0.75rem",
          }}
        >
          Your tools stay.{" "}
          <span style={{ color: dark ? "var(--color-cyan)" : "var(--color-cyan-ink)" }}>We connect them.</span>
        </h3>
        <p className={dark ? "body-on-navy" : "body-muted"} style={{ marginBottom: 0 }}>
          Information is captured once and shared where it&apos;s needed, so your team retypes less and personal information sits in fewer places.
        </p>
      </div>
    </FadeUp>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="prob-list">
      {items.map((p) => (
        <li key={p}>
          <span className="prob-dot" aria-hidden="true" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

function StepCards() {
  return (
    <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {steps.map((s) => (
        <StaggerChild key={s.n} className="h-full">
          <div className="card-lift h-full flex flex-col">
            <div className="card-body">
              <div className="card-label-row">
                <span className="glyph-chip glyph-chip-lg"><Glyph name={s.icon} size={28} /></span>
                <span className="card-label">0{s.n}</span>
              </div>
              <h3 className="card-title">{s.name}</h3>
              <BulletList items={s.points} />
            </div>
          </div>
        </StaggerChild>
      ))}
    </StaggerParent>
  );
}

function CapabilityCards() {
  return (
    <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {capabilities.map((c) => (
        <StaggerChild key={c.name} className="h-full">
          <div className="card-lift h-full flex flex-col">
            <div className="card-body">
              <div className="card-label-row">
                <span className="glyph-chip glyph-chip-lg"><Glyph name={c.icon} size={28} /></span>
              </div>
              <h3 className="card-title">{c.name}</h3>
              <p className="card-text card-text-lead">{c.lead}</p>
              <BulletList items={c.items} />
            </div>
          </div>
        </StaggerChild>
      ))}
    </StaggerParent>
  );
}

function PopiaNote({ dark = false, center = false }: { dark?: boolean; center?: boolean }) {
  return (
    <p
      className={center ? "mx-auto" : ""}
      style={{
        fontFamily: "var(--font-body)", fontSize: "var(--text-meta)", lineHeight: 1.6, maxWidth: "620px", margin: 0,
        color: dark ? "var(--color-ink-inverted-subtle)" : "var(--color-ink-tertiary)",
        ...(center ? {} : { borderLeft: "3px solid var(--color-cyan)", paddingLeft: "1rem" }),
      }}
    >
      {popiaNote}
    </p>
  );
}

const ImageStatement = () => (
  <ImageBand
    src="/images/people/replace-team.png"
    alt="Two professionals celebrating a win together in the office"
    overlayText={
      <>
        <span style={{ display: "block", fontWeight: 200 }}>We do not replace your team.</span>
        <span style={{ display: "block", fontWeight: 200 }}>
          We give them their <span style={{ color: "var(--color-cyan)" }}>time back.</span>
        </span>
      </>
    }
    height={520}
  />
);

function Switcher({ current }: { current: Variant }) {
  return (
    <nav className="lab-switch" aria-label="Layout variants">
      {(Object.keys(VARIANTS) as Variant[]).map((v) => (
        <Link key={v} href={`/layout-lab/${v}`} aria-current={v === current ? "page" : undefined}>
          {VARIANTS[v]}
        </Link>
      ))}
      <Link href="/">Current</Link>
    </nav>
  );
}

// ─── Variant A — Breathe ─────────────────────────────────────────────────────
// Same structure as today. More air, dot field on the hero, faint stone dots
// drifting in from alternating sides on the light sections.

function VariantA() {
  return (
    <>
      <section className="lab-section lab-navy relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: "clamp(9rem, 16vw, 13rem)" }}>
        <DotField tone="dark" coverage={0.55} seed={11} />
        <HeroLight />
        <div className="relative w-full max-w-[900px] mx-auto"><Hero align="left" /></div>
      </section>

      <section className="lab-section lab-stone-deep overflow-hidden">
        <DotField tone="light" mask="right" coverage={0.5} seed={4} />
        <div className="lab-inner">
          <SectionHead {...problemHead} className="lab-head-gap" />
          <ProblemCards />
          <div style={{ marginBlock: "clamp(5rem, 9vw, 8rem) 3rem" }}><Bridge /></div>
          <div className="mx-auto" style={{ maxWidth: "1000px" }}><DisconnectDiagram /></div>
        </div>
      </section>

      <section id="how-we-work" className="lab-section lab-stone-flat overflow-hidden">
        <DotField tone="light" mask="left" coverage={0.5} seed={9} />
        <div className="lab-inner">
          <SectionHead {...howHead} className="lab-head-gap" />
          <StepCards />
        </div>
      </section>

      <section id="popia-aware" className="lab-section lab-chapter lab-stone overflow-hidden">
        <DotField tone="light" mask="edges" coverage={0.45} seed={21} intensity={0.45} />
        <div className="lab-read lab-center">
          <FadeUp>
            <h2 className="section-title" style={{ marginBottom: "2rem" }}>
              Responsible implementation starts with <span className="hl">understanding the information involved.</span>
            </h2>
            <p className="body-muted section-intro" style={{ marginBottom: "2rem" }}>{popiaBody}</p>
            <PopiaNote center />
          </FadeUp>
        </div>
      </section>

      <section id="capabilities" className="lab-section lab-stone-flat overflow-hidden">
        <DotField tone="light" mask="right" coverage={0.5} seed={15} />
        <div className="lab-inner">
          <SectionHead {...capHead} className="lab-head-gap" />
          <CapabilityCards />
        </div>
      </section>

      <ImageStatement />
      <AssessmentFormSection />
    </>
  );
}

// ─── Variant B — Chapters ────────────────────────────────────────────────────
// openinstinct's rhythm: centred heads, dense field on dark chapters, the
// diagram and the POPIA statement promoted to their own dark chapters, and
// the two lower card grids opened up.

function VariantB() {
  return (
    <>
      <section className="lab-section lab-navy relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: "clamp(9rem, 16vw, 13rem)" }}>
        <DotField tone="dark" coverage={0.7} seed={11} />
        <div className="relative w-full"><Hero align="center" /></div>
      </section>

      <section className="lab-section lab-stone overflow-hidden">
        <DotField tone="light" mask="top" coverage={0.55} seed={4} intensity={0.5} />
        <div className="lab-inner">
          <SectionHead {...problemHead} className="lab-head-gap lab-center" />
          <ProblemCards />
        </div>
      </section>

      <section className="lab-section lab-chapter lab-navy overflow-hidden">
        <DotField tone="dark" coverage={0.5} seed={33} mask="y" />
        <div className="lab-inner">
          <div className="lab-head-gap"><Bridge dark /></div>
          <div className="mx-auto" style={{ maxWidth: "1000px" }}><DisconnectDiagram /></div>
        </div>
      </section>

      <section id="how-we-work" className="lab-section lab-stone-flat overflow-hidden">
        <DotField tone="light" mask="bottom" coverage={0.5} seed={9} intensity={0.5} />
        <div className="lab-inner">
          <SectionHead {...howHead} className="lab-head-gap lab-center" />
          <StaggerParent className="lab-seq">
            {steps.map((s) => (
              <StaggerChild key={s.n} className="lab-seq-item">
                <span className="lab-seq-num" aria-hidden="true">{s.n}</span>
                <h3 className="card-title">{s.name}</h3>
                <BulletList items={s.points} />
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      <section id="popia-aware" className="lab-section lab-chapter lab-navy overflow-hidden">
        <DotField tone="dark" coverage={0.62} seed={5} mask="edges" />
        <div className="lab-read lab-center" style={{ maxWidth: "880px" }}>
          <FadeUp>
            <h2 className="lab-statement" style={{ color: "var(--color-ink-inverted)", marginBottom: "2.5rem" }}>
              Responsible implementation starts with{" "}
              <span style={{ color: "var(--color-cyan)" }}>understanding the information involved.</span>
            </h2>
            <p className="body-on-navy mx-auto" style={{ maxWidth: "680px", marginBottom: "2.5rem", lineHeight: "var(--leading-body-relaxed)" }}>{popiaBody}</p>
            <PopiaNote dark center />
          </FadeUp>
        </div>
      </section>

      <section id="capabilities" className="lab-section lab-stone overflow-hidden">
        <DotField tone="light" mask="top" coverage={0.5} seed={15} intensity={0.5} />
        <div className="lab-inner">
          <SectionHead {...capHead} className="lab-head-gap lab-center" />
          <StaggerParent className="lab-cols">
            {capabilities.map((c) => (
              <StaggerChild key={c.name} className="lab-col">
                <span className="glyph-chip glyph-chip-lg" style={{ marginBottom: "1.5rem" }}><Glyph name={c.icon} size={28} /></span>
                <h3 className="card-title">{c.name}</h3>
                <p className="card-text card-text-lead">{c.lead}</p>
                <BulletList items={c.items} />
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      <ImageStatement />
      <AssessmentFormSection />
    </>
  );
}

// ─── Variant C — Editorial split ─────────────────────────────────────────────
// Asymmetric: split heads, sticky headings beside stacked rows, one continuous
// light field behind every light section; the hero's field gathers on the
// right as its visual.

function SplitHead({ head, sticky = false, children }: { head: typeof problemHead; sticky?: boolean; children?: ReactNode }) {
  return (
    <div className="lab-split">
      <div className={sticky ? "lab-split-sticky" : ""}>
        <SectionHead eyebrow={head.eyebrow} title={head.title} intro={sticky ? head.intro : undefined} />
      </div>
      {children ?? (
        <FadeUp className="lab-split-end">
          <p className="section-intro body-muted">{head.intro}</p>
        </FadeUp>
      )}
    </div>
  );
}

function VariantC() {
  return (
    <>
      <section className="lab-section lab-navy relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: "clamp(9rem, 16vw, 13rem)" }}>
        <DotField tone="dark" coverage={0.78} seed={11} mask="right" />
        <div className="relative w-full lab-inner"><Hero align="left" /></div>
      </section>

      <div className="lab-continuous">
        <DotField tone="light" fixed coverage={0.5} seed={4} intensity={0.6} />

        <section className="lab-section">
          <div className="lab-inner">
            <div className="lab-head-gap"><SplitHead head={problemHead} /></div>
            <ProblemCards />
            <div style={{ marginBlock: "clamp(5rem, 9vw, 8rem) 3rem" }}><Bridge /></div>
            <div className="mx-auto" style={{ maxWidth: "1000px" }}><DisconnectDiagram /></div>
          </div>
        </section>

        <section id="how-we-work" className="lab-section">
          <div className="lab-inner">
            <SplitHead head={howHead} sticky>
              <StaggerParent className="lab-rows">
                {steps.map((s) => (
                  <StaggerChild key={s.n} className="lab-row">
                    <span className="glyph-chip glyph-chip-lg" aria-hidden="true"><Glyph name={s.icon} size={28} /></span>
                    <div>
                      <span className="card-label" style={{ display: "block", marginBottom: "0.5rem" }}>Step {s.n}</span>
                      <h3 className="card-title">{s.name}</h3>
                      <BulletList items={s.points} />
                    </div>
                  </StaggerChild>
                ))}
              </StaggerParent>
            </SplitHead>
          </div>
        </section>

        <section id="popia-aware" className="lab-section lab-chapter">
          <div className="lab-inner">
            <div className="lab-split lab-split-wide">
              <FadeUp>
                <h2 className="lab-statement" style={{ color: "var(--color-ink-primary)" }}>
                  Responsible implementation starts with{" "}
                  <span style={{ color: "var(--color-cyan-ink)" }}>understanding the information involved.</span>
                </h2>
              </FadeUp>
              <FadeUp className="lab-split-end">
                <p className="body-muted" style={{ lineHeight: "var(--leading-body-relaxed)", marginBottom: "2rem" }}>{popiaBody}</p>
                <PopiaNote />
              </FadeUp>
            </div>
          </div>
        </section>

        <section id="capabilities" className="lab-section">
          <div className="lab-inner">
            <SplitHead head={capHead} sticky>
              <StaggerParent className="lab-rows">
                {capabilities.map((c) => (
                  <StaggerChild key={c.name} className="lab-row">
                    <span className="glyph-chip glyph-chip-lg" aria-hidden="true"><Glyph name={c.icon} size={28} /></span>
                    <div>
                      <h3 className="card-title">{c.name}</h3>
                      <p className="card-text card-text-lead">{c.lead}</p>
                      <BulletList items={c.items} />
                    </div>
                  </StaggerChild>
                ))}
              </StaggerParent>
            </SplitHead>
          </div>
        </section>
      </div>

      <ImageStatement />
      <AssessmentFormSection />
    </>
  );
}

// ─── Route ───────────────────────────────────────────────────────────────────

export default async function LayoutLab({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!(variant in VARIANTS)) notFound();
  const v = variant as Variant;
  return (
    <div className={`lab lab-${v}`}>
      {v === "a" && <VariantA />}
      {v === "b" && <VariantB />}
      {v === "c" && <VariantC />}
      <Switcher current={v} />
    </div>
  );
}
