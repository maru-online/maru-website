import { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import Button from "@/components/ui/Button";
import CardNavy from "@/components/ui/CardNavy";
import CardProof from "@/components/ui/CardProof";
import { ScaffoldPlaceholder } from "@/components/ui/ScaffoldPlaceholder";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/Animate";
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  ...seo('/about'),
  title: "Why Maru Online Exists — Our Mission, Approach & Values",
  description:
    "We built Maru Online to fix the specific problem of AI projects that get bought, never used, and quietly forgotten. Mission, approach, and values.",
  // TEMPORARY: the Focus Over Volume card carries a ScaffoldPlaceholder until
  // Jimmy supplies its replacement line (entry 16, open item 1). Placeholders
  // and noindex ship together and are removed together.
  robots: { index: false, follow: true },
};

// Copy handover entry 16 (approved 6 Oct 2026), rebuilt around the business,
// not the founder: no founder bio, no LinkedIn or other outbound link in the
// page body (section 7 removed 7 Oct). Wording verbatim. The 7 Oct
// "additions" (Who we are extra line, "Our work", new metadata) and entry 17
// (vision, mission, name story) are PROPOSED and not built.

const outerPad    = "px-6 md:px-[60px]";
const innerWide   = "max-w-[1100px] mx-auto";
const innerNarrow = "max-w-[720px] mx-auto";

export default function AboutPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1 — HERO
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative min-h-[70vh] flex items-center ${outerPad} pt-48 pb-32`}
        style={{ backgroundColor: "var(--color-bg-navy)" }}
      >
        <BGPattern variant="grid" mask="fade-edges" size={40} fill="rgba(61, 184, 198, 0.101)" className="z-0" />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            border: "1px solid rgba(61,184,198,0.12)",
            pointerEvents: "none",
          }}
        />
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <span className="label-eyebrow" style={{ marginBottom: "1.5rem" }}>About Maru Online</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split" style={{ marginBottom: "2rem" }}>
              <span className="maru-headline-split-strong">AI your team can use without putting client data at risk.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="body-on-navy" style={{ maxWidth: "640px", marginBottom: "2.5rem" }}>
              Maru Online is a South African AI implementation consultancy. We connect the tools you already pay for and set up AI so your staff get the speed without the exposure, with POPIA in mind.
            </p>
          </FadeUp>
          <FadeUp delay={0.22}>
            <Button href="/popia-ai-check" variant="primary">
              Start with the free assessment
            </Button>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2 — WHO WE ARE
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ background: "var(--gradient-surface)" }}
      >
        <div className={innerNarrow}>
          <FadeUp>
            <span className="label-eyebrow-ochre" style={{ marginBottom: "1.25rem" }}>Who we are</span>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3-serif)",
                fontWeight: 400,
                lineHeight: "var(--leading-subheading)",
                color: "var(--color-ink-primary)",
                letterSpacing: "var(--tracking-tight)",
                margin: 0,
              }}
            >
              We&apos;re a South African company, registered since 2002 and based in Gauteng. We work with owner-led businesses across the country, the kind that run on client information, WhatsApp, email and spreadsheets, and don&apos;t have an IT department.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3 — WHAT WE'VE NOTICED
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-primary)" }}
      >
        <div className={innerNarrow}>
          <div className="card-lift p-8 md:p-12">
            <FadeUp>
              <span className="label-eyebrow-ochre" style={{ marginBottom: "1.25rem" }}>What we&apos;ve noticed</span>
              <h2 style={{ marginBottom: "var(--space-heading-body)", border: "none" }}>
                <span style={{ fontWeight: 300 }}>Most businesses don&apos;t have an AI problem.</span>
                <br />
                <span style={{ fontWeight: 700 }}>They have a connection problem.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="body-muted" style={{ marginBottom: 0 }}>
                When your CRM, email and accounting don&apos;t share data, people copy and paste into whatever gets the job done. Now that often means a free AI tool, and client information goes where nobody agreed it could. We fix the connection first, then put AI on top of it.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4 — OUR PRINCIPLES
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <div className={innerWide}>
          <FadeUp>
            <span className="label-eyebrow-ochre" style={{ marginBottom: "1.25rem" }}>Our principles</span>
          </FadeUp>
          <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerChild>
              <CardNavy title="Honest about what AI can do.">
                We tell you what&apos;s worth automating and what isn&apos;t, before you commit.
              </CardNavy>
            </StaggerChild>
            <StaggerChild>
              <CardNavy title="Clear terms.">
                Fixed price, agreed up front. No hourly billing.
              </CardNavy>
            </StaggerChild>
            <StaggerChild>
              <CardNavy title="Your team runs it.">
                We hand over and train your people, so you&apos;re not dependent on us.
              </CardNavy>
            </StaggerChild>
          </StaggerParent>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5 — VALUES (four existing cards; two edits from entry 16)
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-primary)" }}
      >
        <div className={innerWide}>
          <FadeUp>
            <span className="label-eyebrow-ochre" style={{ marginBottom: "1.25rem" }}>What we stand for</span>
            <h2 style={{ marginBottom: "var(--space-section-header-mb)" }}>
              <span style={{ fontWeight: 300 }}>Values that show up in the work.</span>
              <br />
              <span style={{ fontWeight: 700 }}>Not on a wall.</span>
            </h2>
          </FadeUp>
          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggerChild className="h-full">
              <CardProof title="Truth Over Talk." className="h-full">
                We don&apos;t just say it; we prove it. If we can&apos;t back it up, we won&apos;t say it. Our commitment to honesty means every claim about your results is grounded in fact, not fiction.
              </CardProof>
            </StaggerChild>
            <StaggerChild className="h-full">
              {/* Entry 16 (a): the "14 hours down to 3" example is removed, and
                  the half-sentence that set it up with it. Entry 17 proposes a
                  replacement line; not approved yet. */}
              <CardProof title="Clarity Over Clouds." className="h-full">
                We trade vague promises for specific fixes and measurable wins.
              </CardProof>
            </StaggerChild>
            <StaggerChild className="h-full">
              <CardProof title="Impact Over Handover." className="h-full">
                A tool no one uses is a failure. We don&apos;t measure success by what we deliver, but by what actually changes in your business.
              </CardProof>
            </StaggerChild>
            <StaggerChild className="h-full">
              {/* Entry 16 (b): the "limited to five active clients" claim is
                  removed. Nothing sensible is left of the description, and the
                  entry says not to invent one (open item 1). */}
              <CardProof title="Focus Over Volume." className="h-full">
                <ScaffoldPlaceholder
                  label="Focus Over Volume description"
                  blockedOn="Jimmy — replacement line (copy handover entry 16, open item 1)"
                />
              </CardProof>
            </StaggerChild>
          </StaggerParent>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6 — HOW WE WORK (same step labels as /process)
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ background: "var(--gradient-surface)" }}
      >
        <div className={innerWide}>
          <FadeUp>
            <span className="label-eyebrow-ochre" style={{ marginBottom: "1.25rem" }}>How we work</span>
          </FadeUp>
          <StaggerParent className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ marginBottom: "2rem" }}>
            {["Assess", "Plan", "Build", "Launch and measure"].map((label, i) => (
              <StaggerChild key={label} className="h-full">
                <div className="card-lift h-full p-6" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className="section-number">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "var(--text-body)",
                      color: "var(--color-ink-primary)",
                    }}
                  >
                    {label}
                  </span>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
          <FadeUp delay={0.08}>
            <Button href="/process" variant="tertiary">
              See the full process
            </Button>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          8 — CLOSING CTA (assessment only, no discovery-call button)
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-navy)" }}
      >
        <div className={innerNarrow}>
          <FadeUp>
            <h2
              style={{
                color: "var(--color-ink-inverted)",
                border: "none",
                padding: 0,
                marginBottom: "var(--space-section-header-mb)",
              }}
            >
              Find out where your time, money and client data are exposed.
            </h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <Button href="/popia-ai-check" variant="primary">
              Free Exposure Check
            </Button>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
