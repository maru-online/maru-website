import Link from "next/link";
import Button from "@/components/ui/Button";
import Glyph from "@/components/ui/Glyph";
import { FadeUp } from "@/components/ui/Animate";

const outerPad = "px-6 md:px-[60px]";
const inner    = "max-w-[900px] mx-auto";

const ASSESSMENT_HREF = "/popia-ai-check";
const CONTACT_HREF    = "/contact#contact-form";

// Homepage Section 5 — final call to action, 22 Oct 2026. Replaces the old
// "Find out where your time, money and client data are exposed" block, which
// still described the retired operations diagnostic. Two routes, in order of
// weight: the free POPIA Assessment (primary, white card, gold button) and a
// project conversation (secondary, text link on navy). The section keeps the
// #assessment id so existing in-page links still land here.
export default function AssessmentFormSection() {
  return (
    <section
      id="assessment"
      className={`${outerPad} py-24`}
      style={{ background: "var(--gradient-navy-soft)" }}
    >
      <div className={inner}>
        <FadeUp>
          <span className="label-eyebrow" style={{ marginBottom: "1.5rem" }}>Next steps</span>
          <h2 className="h2-cta" style={{ marginBottom: "var(--space-heading-body)" }}>
            <span style={{ display: "block", fontWeight: 300 }}>Ready to Build AI Into</span>
            <span style={{ display: "block", fontWeight: 700 }}>Your Existing Operations?</span>
          </h2>
          <p className="body-on-navy" style={{ maxWidth: "680px", marginBottom: "var(--space-section-header-mb)" }}>
            Whether you&apos;re exploring how your business uses AI or already know which process needs improving, Maru Online can help you identify a practical way forward.
          </p>
        </FadeUp>

        {/* ── Route 1: the free POPIA Assessment ─────────────────────────── */}
        <FadeUp delay={0.08}>
          <div
            style={{
              background: "var(--color-bg-primary)",
              borderRadius: "12px",
              padding: "clamp(1.5rem, 4vw, 2.25rem)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-start gap-4" style={{ marginBottom: "1.75rem" }}>
              <span className="glyph-chip glyph-chip-lg" style={{ flexShrink: 0 }}>
                <Glyph name="clipboard" size={28} />
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: "var(--text-h3-serif)",
                    color: "var(--color-ink-primary)",
                    lineHeight: "var(--leading-subheading)",
                    marginBottom: "0.375rem",
                    borderBottom: "none",
                    paddingBottom: 0,
                  }}
                >
                  Start with the free POPIA Assessment
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-body-sm)",
                    fontWeight: 300,
                    color: "var(--color-ink-secondary)",
                    lineHeight: "var(--leading-body)",
                    margin: 0,
                  }}
                >
                  Identify areas to investigate and receive a summary report by email.
                </p>
              </div>
            </div>

            <Button href={ASSESSMENT_HREF} variant="primary" className="w-full justify-center">
              Take Your Free POPIA Assessment
            </Button>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-meta)",
                fontWeight: 300,
                color: "var(--color-ink-tertiary)",
                marginTop: "1rem",
                marginBottom: 0,
                lineHeight: 1.5,
              }}
            >
              Free assessment · Report delivered by email
            </p>
          </div>
        </FadeUp>

        {/* ── Divider ────────────────────────────────────────────────────── */}
        <div
          role="separator"
          aria-label="or"
          className="flex items-center gap-4"
          style={{ margin: "2rem 0" }}
        >
          <span aria-hidden="true" style={{ width: "1px", height: "1.75rem", background: "rgba(250,250,248,0.2)" }} />
          <span
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-label)",
              fontWeight: 500,
              letterSpacing: "var(--tracking-eyebrow)",
              textTransform: "uppercase",
              color: "var(--color-ink-inverted-muted)",
            }}
          >
            Or
          </span>
          <span aria-hidden="true" style={{ width: "1px", height: "1.75rem", background: "rgba(250,250,248,0.2)" }} />
        </div>

        {/* ── Route 2: a project conversation ───────────────────────────── */}
        <FadeUp delay={0.12}>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <span
              className="glyph-chip glyph-chip-lg"
              style={{
                flexShrink: 0,
                background: "rgba(250,250,248,0.08)",
                color: "var(--color-ink-inverted)",
                boxShadow: "0 0 0 1px rgba(250,250,248,0.12)",
              }}
            >
              <Glyph name="chat" size={28} />
            </span>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "var(--text-h3-serif)",
                  color: "var(--color-ink-inverted)",
                  lineHeight: "var(--leading-subheading)",
                  marginBottom: "0.375rem",
                  borderBottom: "none",
                  paddingBottom: 0,
                }}
              >
                Already have a project in mind?
              </h3>
              <p className="body-on-navy" style={{ marginBottom: "0.75rem" }}>
                Tell us about the business challenge you want to solve.
              </p>
              <Link
                href={CONTACT_HREF}
                className="inline-flex items-center min-h-[44px] font-body font-medium text-cyan no-underline transition-[color,opacity] duration-200 hover:underline hover:underline-offset-4 active:opacity-70 focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4 focus-visible:shadow-[0_0_0_2px_rgba(61,184,198,0.4)]"
                style={{ fontSize: "var(--text-body)" }}
              >
                Discuss a Business Challenge&nbsp;→
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
