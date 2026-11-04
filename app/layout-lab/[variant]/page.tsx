import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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

// Round 2 (4 Nov 2026): round 1's A/B/C were reviewed and replaced.
const VARIANTS = {
  "1": "1 · Glow",
  "2": "2 · Open flow",
  "3": "3 · Chapters",
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

// ─── Round 2 shared ──────────────────────────────────────────────────────────

type Grad = "g1" | "g2" | "g3";

function NavyHero({ grad, align, light = false }: { grad: Grad; align: "left" | "center"; light?: boolean }) {
  return (
    <section
      className={`lab-section lab-${grad} relative min-h-screen flex items-center overflow-hidden`}
      style={{ paddingTop: "clamp(9rem, 15vw, 12rem)" }}
    >
      {light && <HeroLight />}
      <div className={`relative w-full ${align === "left" ? "max-w-[900px] mx-auto" : ""}`}>
        <Hero align={align} />
      </div>
    </section>
  );
}

function Head({ head, center = false }: { head: typeof problemHead; center?: boolean }) {
  return <SectionHead {...head} className={`lab-head${center ? " lab-center" : ""}`} />;
}

function PopiaStatement({ dark = false }: { dark?: boolean }) {
  return (
    <h2 className="lab-statement" style={{ color: dark ? "var(--color-ink-inverted)" : "var(--color-ink-primary)" }}>
      Responsible implementation starts with{" "}
      <span style={{ color: dark ? "var(--color-cyan)" : "var(--color-cyan-ink)" }}>
        understanding the information involved.
      </span>
    </h2>
  );
}

// ─── 1 · Glow ────────────────────────────────────────────────────────────────
// Option A's structure, which worked. Light dots only, lighter; navy hero in
// the Glow gradient; proximity spacing on every head.

function Variant1() {
  return (
    <>
      <NavyHero grad="g1" align="left" light />

      <section className="lab-section lab-stone-deep overflow-hidden">
        <DotField tone="light" mask="right" coverage={0.45} intensity={0.7} seed={4} />
        <div className="lab-inner">
          <Head head={problemHead} />
          <ProblemCards />
          <div style={{ marginBlock: "var(--lab-section-y) 3rem" }}><Bridge /></div>
          <div className="mx-auto" style={{ maxWidth: "1000px" }}><DisconnectDiagram /></div>
        </div>
      </section>

      <section id="how-we-work" className="lab-section lab-stone-flat overflow-hidden">
        <DotField tone="light" mask="left" coverage={0.45} intensity={0.7} seed={9} />
        <div className="lab-inner">
          <Head head={howHead} />
          <StepCards />
        </div>
      </section>

      <section id="popia-aware" className="lab-section lab-chapter lab-stone overflow-hidden">
        <DotField tone="light" mask="edges" coverage={0.42} intensity={0.45} seed={21} />
        <div className="lab-read lab-center" style={{ maxWidth: "820px" }}>
          <FadeUp>
            <div style={{ marginBottom: "1.75rem" }}><PopiaStatement /></div>
            <p className="body-muted mx-auto" style={{ maxWidth: "var(--lab-measure)", marginBottom: "2rem" }}>{popiaBody}</p>
            <PopiaNote center />
          </FadeUp>
        </div>
      </section>

      <section id="capabilities" className="lab-section lab-stone-flat overflow-hidden">
        <DotField tone="light" mask="right" coverage={0.45} intensity={0.7} seed={15} />
        <div className="lab-inner">
          <Head head={capHead} />
          <CapabilityCards />
        </div>
      </section>

      <ImageStatement />
      <AssessmentFormSection />
    </>
  );
}

// ─── 2 · Open flow ───────────────────────────────────────────────────────────
// Closest to Wanoura: one continuous stone ground with hairline dividers in
// place of tinted bands, asymmetric splits, steps as rows beside a heading
// that stays in view. "Your tools stay" keeps its own navy chapter (the one
// dark section that worked in B), now in the Horizon gradient.

function Variant2() {
  return (
    <>
      <NavyHero grad="g2" align="left" />

      <div className="lab-flow">
        <section className="lab-section overflow-hidden">
          <DotField tone="light" mask="right" coverage={0.45} intensity={0.65} seed={4} />
          <div className="lab-inner">
            <Head head={problemHead} />
            <ProblemCards />
          </div>
        </section>
      </div>

      <section className="lab-section lab-chapter lab-g2 overflow-hidden">
        <div className="lab-inner">
          <div className="lab-head"><Bridge dark /></div>
          <div className="mx-auto" style={{ maxWidth: "1000px" }}><DisconnectDiagram /></div>
        </div>
      </section>

      <div className="lab-flow">
        <section id="how-we-work" className="lab-section overflow-clip">
          <DotField tone="light" mask="left" coverage={0.42} intensity={0.6} seed={9} />
          <div className="lab-inner">
            <div className="lab-split">
              <div className="lab-split-sticky"><SectionHead {...howHead} className="lab-head" /></div>
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
            </div>
          </div>
        </section>

        <section id="popia-aware" className="lab-section lab-ruled">
          <div className="lab-inner">
            <FadeUp className="lab-pair">
              <PopiaStatement />
              <div>
                <p className="body-muted" style={{ marginBottom: "1.75rem" }}>{popiaBody}</p>
                <PopiaNote />
              </div>
            </FadeUp>
          </div>
        </section>

        <section id="capabilities" className="lab-section lab-ruled overflow-hidden">
          <DotField tone="light" mask="right" coverage={0.42} intensity={0.6} seed={15} />
          <div className="lab-inner">
            <Head head={capHead} />
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
      </div>

      <ImageStatement />
      <div className="lab-flow"><AssessmentFormSection /></div>
    </>
  );
}

// ─── 3 · Chapters ────────────────────────────────────────────────────────────
// B's centred rhythm with dark chapters in the Silk gradient instead of dots;
// light sections keep a light dot field.

function Variant3() {
  return (
    <>
      <NavyHero grad="g3" align="center" />

      <section className="lab-section lab-stone overflow-hidden">
        <DotField tone="light" mask="top" coverage={0.45} intensity={0.6} seed={4} />
        <div className="lab-inner">
          <Head head={problemHead} center />
          <ProblemCards />
        </div>
      </section>

      <section className="lab-section lab-chapter lab-g3 overflow-hidden">
        <div className="lab-inner">
          <div className="lab-head"><Bridge dark /></div>
          <div className="mx-auto" style={{ maxWidth: "1000px" }}><DisconnectDiagram /></div>
        </div>
      </section>

      <section id="how-we-work" className="lab-section lab-stone-flat overflow-hidden">
        <DotField tone="light" mask="bottom" coverage={0.45} intensity={0.6} seed={9} />
        <div className="lab-inner">
          <Head head={howHead} center />
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

      <section id="popia-aware" className="lab-section lab-chapter lab-g3 overflow-hidden">
        <div className="lab-read lab-center" style={{ maxWidth: "860px" }}>
          <FadeUp>
            <div style={{ marginBottom: "2rem" }}><PopiaStatement dark /></div>
            <p className="body-on-navy mx-auto" style={{ maxWidth: "var(--lab-measure)", marginBottom: "2rem", lineHeight: "var(--leading-body-relaxed)" }}>{popiaBody}</p>
            <PopiaNote dark center />
          </FadeUp>
        </div>
      </section>

      <section id="capabilities" className="lab-section lab-stone overflow-hidden">
        <DotField tone="light" mask="top" coverage={0.45} intensity={0.6} seed={15} />
        <div className="lab-inner">
          <Head head={capHead} center />
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

// ─── Route ───────────────────────────────────────────────────────────────────

export default async function LayoutLab({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!(variant in VARIANTS)) notFound();
  const v = variant as Variant;
  return (
    <div className={`lab r2 lab-v${v} lab-foot-g${v}`}>
      {v === "1" && <Variant1 />}
      {v === "2" && <Variant2 />}
      {v === "3" && <Variant3 />}
      <Switcher current={v} />
    </div>
  );
}
