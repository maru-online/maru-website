import { Metadata } from "next";
import Button from "@/components/ui/Button";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/Animate";
import AssessmentFormSection from "@/components/homepage/AssessmentFormSection";
import PrimaryServicesFilter from "@/components/homepage/PrimaryServicesFilter";
import { CaseStudyProofStrip } from "@/components/homepage/CaseStudyProofStrip";
import ImageSplit from "@/components/ui/ImageSplit";
import ImageBand from "@/components/ui/ImageBand";
import { BGPattern } from "@/components/ui/bg-pattern";
import MaruM from "@/components/ui/MaruM";
import DisconnectDiagram from "@/components/ui/DisconnectDiagram";
import StatBand from "@/components/ui/StatBand";
import Glyph from "@/components/ui/Glyph";
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  ...seo('/'),
  title: "POPIA-Safe AI for South African Businesses | Maru Online",
  description:
    "Your team is already using AI. We find where client data leaks, fix the POPIA risk, and build workflows that save hours every week. Fixed price.",
};

// ─── Layout constants ─────────────────────────────────────────────────────────
const outerPad = "px-6 md:px-[60px]";
const inner     = "max-w-[900px] mx-auto";
const innerNarrow = "max-w-[720px] mx-auto";
const innerWide = "max-w-[1100px] mx-auto";


// ─── Inline SVGs for trust bar ────────────────────────────────────────────────

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2L3 5v5c0 4.418 3.134 7.5 7 8 3.866-.5 7-3.582 7-8V5L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Trust strip rows (COPY-DECK §2) ───────────────────────────────────────────
// `confirmed: false` rows are [CONFIRM] items: they do not render until the
// fact is confirmed. Row 3 was downgraded to [CONFIRM] in CHANGE-MAP §4(b)-7:
// the privacy policy does not yet list the site's cross-border processors.
const TRUST_ROWS: { text: string; confirmed: boolean }[] = [
  { text: "Maru's Information Officer is registered with the Information Regulator.", confirmed: false },
  { text: "Our PAIA manual is published.", confirmed: false }, // needs a link to the manual when confirmed
  { text: "We host on South African infrastructure where possible, and document every cross-border transfer.", confirmed: false },
  { text: "Maru is not a law firm. We design for POPIA requirements, and we tell you when you need a legal opinion.", confirmed: true },
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
        {/* Maru "M" — dimensional brand object (Warm Stone depth system) */}
        <div
          aria-hidden="true"
          className="hidden sm:block"
          style={{
            position: "absolute",
            top: "0px",
            right: "-140px",
            width: "500px",
            height: "500px",
            pointerEvents: "none",
            filter: "drop-shadow(0 48px 96px rgba(6, 14, 21, 0.5))",
            opacity: 0.5,
          }}
        >
          <MaruM className="w-full h-full" />
        </div>
        <div className={innerWide}>
          <FadeUp>
            <span className="label-eyebrow" style={{ marginBottom: "3rem" }}>POPIA-safe AI for South African businesses</span>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split" style={{ marginBottom: "2.5rem" }}>
              <span className="maru-headline-split-light">Your team already uses AI.</span>
              <br />
              <span className="maru-headline-split-strong">Is your client data safe?</span>
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
                marginBottom: "2rem",
              }}
            >
              We map where client data goes through your AI tools, spreadsheets and WhatsApp, then rebuild those workflows to save time and stay within POPIA.
            </p>
          </FadeUp>

          <FadeUp delay={0.19}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "var(--text-body-sm)",
                color: "var(--color-ink-inverted-muted)",
                lineHeight: "var(--leading-body-relaxed)",
                maxWidth: "560px",
                marginBottom: "3rem",
              }}
            >
              Most businesses don&apos;t have an AI problem. They have an integration problem. In South Africa, that makes it a POPIA problem.
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
              <Button href="/booking" variant="primary" className="w-full sm:w-auto justify-center">
                Book a POPIA-safe AI call
              </Button>
              <Button href="/operations-assessment" variant="secondary" className="w-full sm:w-auto justify-center">
                Start the free assessment
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
            <span className="label-eyebrow" style={{ marginBottom: "1.5rem" }}>The hidden risk</span>
            <h2 style={{ marginBottom: "var(--space-section-header-mb)" }}>
              <span style={{ fontWeight: 700 }}>Your team is using AI.</span>
              <br />
              <span style={{ fontWeight: 300 }}>Nobody&apos;s tracking the data.</span>
            </h2>
            <p
              className="body-muted"
              style={{ maxWidth: "680px", marginBottom: "var(--space-section-header-mb)" }}
            >
              Free AI tools, offshore apps and WhatsApp groups are how SA businesses get work done. They are also where client information slips outside the law.
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
                icon: "shield" as const,
                heading: "Client data is leaving the country.",
                body: "Most AI and automation tools store data offshore. POPIA section 72 restricts that.",
              },
              {
                icon: "search" as const,
                heading: "Staff paste client records into free AI tools.",
                body: "No policy, no record, and no answer when a client asks where their data went.",
              },
              {
                icon: "unlink" as const,
                heading: "Your tools don’t talk to each other.",
                body: "So people copy client data by hand, into more places than you know.",
              },
              {
                icon: "hourglass" as const,
                heading: "Admin is eating your week.",
                body: "Re-entering data quietly costs days every month.",
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
              None of this needs new software. We fix it with the systems you already have, and make them safe.
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
              <span style={{ fontWeight: 300 }}>Pick the problem.</span>
              <br />
              <span style={{ fontWeight: 700 }}>We’ll make it safe.</span>
            </h2>
            <p
              className="body-muted"
              style={{ maxWidth: "640px", marginBottom: "var(--space-section-header-mb)" }}
            >
              Every engagement starts with a POPIA-Safe AI Audit: where your data goes, what it costs you, and what to fix first.
            </p>
          </FadeUp>

          <PrimaryServicesFilter />

          {/* Proof strip (brief item 08) — placed here, immediately after the
              services choice, so the question "can they actually do it" is
              answered at the point it gets asked. Contains a marked placeholder
              until Jimmy supplies a shareable GrowthIQ metric. */}
          <div style={{ marginTop: "3rem" }}>
            <FadeUp>
              <CaseStudyProofStrip />
            </FadeUp>
          </div>
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
              <span style={{ fontWeight: 300 }}>From audit to safe, live workflows</span>
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
                Four steps. Fixed price. Measured outcome.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button href="/operations-assessment" variant="primary" className="w-full sm:w-auto justify-center">
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

      {/* ════════════════════════════════════════════════════════════════════
          TRUST STRIP — "How we practise it" (COPY-DECK §2)
          Reuses the eyebrow-free h2 + cyan-rule statement pattern from the
          problem section. Rows marked `confirmed: false` are gated [CONFIRM]
          items in the copy deck and stay hidden until Jimmy confirms them.
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-primary)" }}
      >
        <div className={innerWide}>
          <FadeUp>
            <h2 style={{ marginBottom: "var(--space-section-header-mb)" }}>
              <span style={{ fontWeight: 700 }}>We hold ourselves to the same standard.</span>
            </h2>
          </FadeUp>
          <StaggerParent className="flex flex-col gap-6">
            {TRUST_ROWS.filter((row) => row.confirmed).map((row) => (
              <StaggerChild key={row.text}>
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
                  {row.text}
                </p>
              </StaggerChild>
            ))}
          </StaggerParent>
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
            <span
              style={{
                display: 'block',
                marginTop: '1rem',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-body)',
                fontWeight: 300,
                color: 'var(--color-ink-inverted-muted)',
                letterSpacing: 'normal',
              }}
            >
              Without putting your clients&apos; data at risk.
            </span>
          </>
        }
        height={420}
      />

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 07 — ASSESSMENT FORM (client component)
          bg: navy (#1A3A5C)
          ════════════════════════════════════════════════════════════════════ */}
      <AssessmentFormSection />

    </>
  );
}
