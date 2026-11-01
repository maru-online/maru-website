import Link from "next/link";
import Button from "@/components/ui/Button";
import Glyph from "@/components/ui/Glyph";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/Animate";

const outerPad = "px-6 md:px-[60px]";
const inner    = "max-w-[1100px] mx-auto";

const ASSESSMENT_HREF = "/popia-ai-check";
const CONTACT_HREF    = "/contact#contact-form";

// Homepage Section 5 — final call to action. Copy approved 22 Oct 2026.
// Blended UI, 1 Nov 2026 (approved on the design canvas): warm light ground
// after the navy image band, two routes side by side in order of weight. The
// free POPIA Assessment card carries the gold border and the gold sheen button;
// the project conversation stays quiet. Keeps the #assessment id so existing
// in-page links still land here.
export default function AssessmentFormSection() {
  return (
    <section
      id="assessment"
      className={`${outerPad} py-24`}
      style={{ background: "var(--gradient-surface)" }}
    >
      <div className={inner}>
        <FadeUp>
          <span className="label-eyebrow label-eyebrow-ink" style={{ marginBottom: "1.5rem" }}>Next steps</span>
          <h2 className="h2-blend" style={{ marginBottom: "1.25rem" }}>
            Ready to Build AI Into
            <br />
            <span className="hl">Your Existing Operations?</span>
          </h2>
          <p className="body-muted" style={{ maxWidth: "720px", marginBottom: "var(--space-section-header-mb)" }}>
            Whether you&apos;re exploring how your business uses AI or already know which process needs improving, Maru Online can help you identify a practical way forward.
          </p>
        </FadeUp>

        <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* ── Route 1: the free POPIA Assessment ───────────────────────── */}
          <StaggerChild className="h-full">
            <div
              className="card-lift card-accent-gold h-full flex flex-col"
              style={{ borderWidth: "1.5px", borderStyle: "solid", padding: "clamp(1.75rem, 4vw, 2.375rem)" }}
            >
              <span className="glyph-chip glyph-chip-lg glyph-chip-gold" style={{ marginBottom: "1.25rem" }}>
                <Glyph name="clipboard" size={26} />
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "var(--text-h3-serif)",
                  color: "var(--color-ink-primary)",
                  lineHeight: "var(--leading-subheading)",
                  marginBottom: "0.5rem",
                }}
              >
                Start with the free POPIA Assessment
              </h3>
              <p className="body-muted" style={{ marginBottom: "1.75rem" }}>
                Identify areas to investigate and receive a summary report by email.
              </p>
              <div className="mt-auto flex flex-col items-stretch sm:items-start gap-3">
                <Button href={ASSESSMENT_HREF} variant="primary" className="cta-shine w-full sm:w-auto justify-center">
                  Take Your Free POPIA Assessment
                </Button>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-meta)",
                    fontWeight: 400,
                    color: "var(--color-ink-tertiary)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Free assessment · Report delivered by email
                </p>
              </div>
            </div>
          </StaggerChild>

          {/* ── Route 2: a project conversation ─────────────────────────── */}
          <StaggerChild className="h-full">
            <div
              className="card-lift h-full flex flex-col"
              style={{ borderWidth: "1px", borderStyle: "solid", padding: "clamp(1.75rem, 4vw, 2.375rem)" }}
            >
              <span className="glyph-chip glyph-chip-lg" style={{ marginBottom: "1.25rem" }}>
                <Glyph name="chat" size={26} />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-label)",
                  fontWeight: 500,
                  letterSpacing: "var(--tracking-eyebrow)",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  marginBottom: "0.5rem",
                }}
              >
                Or
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "var(--text-h3-serif)",
                  color: "var(--color-ink-primary)",
                  lineHeight: "var(--leading-subheading)",
                  marginBottom: "0.5rem",
                }}
              >
                Already have a project in mind?
              </h3>
              <p className="body-muted" style={{ marginBottom: "1.25rem" }}>
                Tell us about the business challenge you want to solve.
              </p>
              <Link
                href={CONTACT_HREF}
                className="mt-auto inline-flex items-center self-start min-h-[44px] font-body font-semibold text-[var(--color-cyan-ink)] no-underline transition-[color,opacity] duration-200 hover:underline hover:underline-offset-4 active:opacity-70 focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4"
                style={{ fontSize: "var(--text-body)" }}
              >
                Discuss a Business Challenge&nbsp;→
              </Link>
            </div>
          </StaggerChild>
        </StaggerParent>
      </div>
    </section>
  );
}
