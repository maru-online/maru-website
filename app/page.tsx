import { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/Animate";
import AssessmentFormSection from "@/components/homepage/AssessmentFormSection";
import HomeFaq from "@/components/homepage/HomeFaq";
import GuideStrip from "@/components/homepage/GuideStrip";
import { GUIDE_HOMEPAGE_STRIP } from "@/lib/guides/config";
import PrimaryServicesFilter from "@/components/homepage/PrimaryServicesFilter";
import { CaseStudyProofStrip } from "@/components/homepage/CaseStudyProofStrip";
import ImageBand from "@/components/ui/ImageBand";
import { BGPattern } from "@/components/ui/bg-pattern";
import DisconnectDiagram from "@/components/ui/DisconnectDiagram";
import StatBand from "@/components/ui/StatBand";
import Glyph from "@/components/ui/Glyph";
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  ...seo('/'),
  // Copy handover entry 02 (approved 5 Oct 2026): title 55 chars, description 149.
  title: "POPIA-Conscious AI for South African SMEs | Maru Online",
  description:
    "Your team is already using AI. We connect your tools and build AI workflows your staff can use safely, with POPIA in mind. Free 5-minute assessment.",
};

// ─── Layout constants ─────────────────────────────────────────────────────────
const outerPad = "px-6 md:px-[60px]";
const inner     = "max-w-[900px] mx-auto";
const innerWide = "max-w-[1100px] mx-auto";

// ─── Page ─────────────────────────────────────────────────────────────────────

// The GrowthIQ proof strip still carries a visible PLACEHOLDER. It stays off
// this indexed page until Jimmy supplies the cleared metric; flip to true then.
const SHOW_PROOF_STRIP = false;

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
        <div className={innerWide}>
          <FadeUp>
            <span className="label-eyebrow" style={{ marginBottom: "3rem" }}>AI Implementation Consultancy</span>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split" style={{ marginBottom: "2.5rem" }}>
              <span className="maru-headline-split-light">Your team already uses AI.</span>
              <br />
              <span className="maru-headline-split-strong">Where is your client data going?</span>
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
                marginBottom: "3rem",
              }}
            >
              Your clients trust you with their information. Your staff are probably pasting it into free AI tools to save time, with no contract, no safeguards, and no idea where it ends up. Under POPIA, that&apos;s your responsibility. We build AI workflows your team can use safely, so you keep the productivity and avoid the exposure.
            </p>
          </FadeUp>

          <FadeUp delay={0.22}>
            {/* data-maru-primary-cta: the floating WhatsApp bubble watches for this
                and hides itself while these buttons are on screen. On a 375px
                viewport the bubble sits 6px above this row and covers its right
                end as soon as the page scrolls. See components/ui/WhatsAppWidget. */}
            <div
              data-maru-primary-cta
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Button href="/popia-ai-check" variant="primary" className="w-full sm:w-auto justify-center">
                Check your exposure: free 5-minute assessment
              </Button>
              {/* Demoted to a text link (copy handover entry 01). tertiary's
                  default cyan-ink is a light-ground colour; on the navy hero it
                  needs --color-cyan, which is the dark-ground cyan. */}
              <Button href="/contact#contact-form" variant="tertiary" className="!text-cyan hover:!text-white self-center sm:self-auto">
                Request a proposal
              </Button>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 02 — OPERATIONAL GAP
          bg: canvas (#FAFAF8)
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ background: "var(--gradient-surface)" }}
      >
        <div className={innerWide}>
          <FadeUp>
            <span className="label-eyebrow" style={{ marginBottom: "1.5rem" }}>Why it&apos;s happening</span>
            <h2 style={{ marginBottom: "var(--space-heading-body)" }}>
              <span style={{ fontWeight: 700 }}>Your team isn&apos;t careless.</span>
              <br />
              <span style={{ fontWeight: 300 }}>Your tools don&apos;t connect.</span>
            </h2>
            <p className="body-muted" style={{ maxWidth: "640px", marginBottom: "var(--space-section-header-mb)" }}>
              When your CRM, email and accounting don&apos;t share data, people copy and paste into whatever gets the job done. Now, that often means a free AI tool.
            </p>
          </FadeUp>

          {/* The picture of the problem — and the fix — before the words for it */}
          <div
            className="mx-auto"
            style={{ maxWidth: "1000px", marginBottom: "var(--space-section-header-mb)" }}
          >
            <DisconnectDiagram />
          </div>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ marginBottom: "var(--space-section-header-mb)" }}>
            {[
              {
                icon: "unlink" as const,
                heading: "Your tools don't talk to each other.",
                body: "CRM, email and accounting all work, but none of them share data. Your people are the glue.",
              },
              {
                icon: "hourglass" as const,
                heading: "Admin is eating your week.",
                body: "Retyping the same details into several systems costs days every month. So people look for shortcuts.",
              },
              {
                icon: "stale" as const,
                heading: "You're deciding on old numbers.",
                body: "Five systems means you're working from last month's export.",
              },
              {
                icon: "shield" as const,
                heading: "Every manual copy is a POPIA risk.",
                body: "Each one is another place client data can end up where it shouldn't. Under POPIA, you answer for that.",
              },
            ].map((col) => (
              <StaggerChild key={col.heading}>
                <div
                  className="card-lift"
                  style={{
                    border: "0.5px solid var(--color-border-card)",
                    borderTop: "3px solid var(--color-cyan)",
                    borderRadius: "8px",
                    padding: "1.5rem 1.25rem",
                    height: "100%",
                  }}
                >
                  <span className="glyph-chip" style={{ marginBottom: "1rem" }}>
                    <Glyph name={col.icon} size={22} />
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "var(--text-body-sm)",
                      color: "var(--color-ink-primary)",
                      marginBottom: "0.5rem",
                      lineHeight: "var(--leading-subheading)",
                    }}
                  >
                    {col.heading}
                  </p>
                  <p className="body-muted" style={{ marginBottom: 0 }}>
                    {col.body}
                  </p>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>

          <FadeUp delay={0.16}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body-sm)",
                fontWeight: 500,
                color: "var(--color-ink-primary)",
                borderLeft: "4px solid var(--color-cyan)",
                paddingLeft: "1.25rem",
                margin: 0,
                lineHeight: "var(--leading-body)",
              }}
            >
              We connect the systems you already pay for. If something new is needed, we&apos;ll tell you what and why before you commit.
            </p>
          </FadeUp>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          SECTION 03 — METRICS BAR
          bg: white (#FFFFFF)
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-16`}
        style={{ backgroundColor: "var(--color-bg-primary)" }}
      >
        <div className={inner}>
          <StatBand />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 04 — PRIMARY SERVICES (filter layout)
          bg: secondary (#F5F4F0)
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="services"
        className={`${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <div className={innerWide}>
          <FadeUp>
            <h2>
              <span style={{ fontWeight: 300 }}>Start with the assessment.</span>
              <br />
              <span style={{ fontWeight: 700 }}>Fix what it finds.</span>
            </h2>
            <p
              className="body-muted"
              style={{ maxWidth: "640px", marginBottom: "var(--space-section-header-mb)" }}
            >
              Every engagement starts the same way: a free assessment that shows where your time, money and client data are exposed, and what to fix first.
            </p>
          </FadeUp>

          <PrimaryServicesFilter />

          {/* Proof strip (brief item 08) — placed here, immediately after the
              services choice, so the question "can they actually do it" is
              answered at the point it gets asked. Contains a marked placeholder
              until Jimmy supplies a shareable GrowthIQ metric. */}
          {SHOW_PROOF_STRIP && (
            <div style={{ marginTop: "3rem" }}>
              <FadeUp>
                <CaseStudyProofStrip />
              </FadeUp>
            </div>
          )}

          {/* Entry 10: the three foundation-service cards (strategy, design &
              development, marketing) moved to /services; one secondary line
              keeps them discoverable without competing with the assessment. */}
          <FadeUp delay={0.08}>
            <p className="body-muted" style={{ marginTop: "2.5rem", marginBottom: 0, textAlign: "center" }}>
              Need a website or marketing support alongside this?{" "}
              <Link
                href="/services#foundations"
                className="underline-offset-4 hover:underline focus-visible:underline"
                style={{ color: "var(--color-cyan-ink)", fontWeight: 500, textDecoration: "none" }}
              >
                See all services →
              </Link>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 06 — FOUR-PHASE PROCESS
          bg: canvas (#FAFAF8)
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="process"
        className={`${outerPad} py-24`}
        style={{ background: "var(--gradient-surface)" }}
      >
        <div className={inner}>
          <FadeUp>
            <h2 style={{ marginBottom: "var(--space-section-header-mb)" }}>
              <span style={{ fontWeight: 300 }}>From signed plan to your first live workflow</span>
              <br />
              <span style={{ fontWeight: 700 }}>in about 30 days.</span>
            </h2>
          </FadeUp>

          {/* The four-phase detail lives on /process — the homepage only needs
              the promise, not the method. */}
          <FadeUp delay={0.08}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <p className="body-muted" style={{ marginBottom: 0, maxWidth: "560px" }}>
                Four steps. Clear proposal. Measured outcome.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button href="/popia-ai-check" variant="primary" className="w-full sm:w-auto justify-center">
                  Start the assessment
                </Button>
                <Button href="/process" variant="tertiary">
                  See how it works
                </Button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── IMAGE BAND — between process and assessment form ────────────── */}
      <ImageBand
        src="/images/people/replace-team.png"
        alt="Two professionals celebrating a win together in the office"
        overlayText={
          <>
            <span style={{ display: 'block', fontWeight: 300 }}>We don&apos;t replace your team.</span>
            <span style={{ display: 'block', fontWeight: 700 }}>We give them their time back.</span>
          </>
        }
        height={420}
      />

      {/* ── FAQ — entry 14: after the team image block, before the final
          ask, so objections are handled right before it ─────────────────── */}
      <HomeFaq />

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 07 — ASSESSMENT FORM (client component)
          bg: navy (#1A3A5C)
          ════════════════════════════════════════════════════════════════════ */}
      <AssessmentFormSection />

      {/* Entry 19 §11: guide strip below the final assessment section. OFF
          until GUIDE_HOMEPAGE_STRIP is flipped at go-live. */}
      {GUIDE_HOMEPAGE_STRIP && <GuideStrip />}

    </>
  );
}
