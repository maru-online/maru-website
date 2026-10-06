import Button from "@/components/ui/Button";

const outerPad = "px-6 md:px-[60px]";
const inner    = "max-w-[900px] mx-auto";

export default function AssessmentFormSection() {
  return (
    <section
      id="assessment"
      className={`${outerPad} py-24`}
      style={{ background: "var(--gradient-navy-soft)" }}
    >
      <div className={inner}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: copy ─────────────────────────────────────────── */}
          <div>
            <span className="label-eyebrow">Free Business Diagnostic</span>

            <h2
              className="h2-cta"
              style={{ marginBottom: "var(--space-heading-body)" }}
            >
              <span style={{ display: "block", fontWeight: 300 }}>What&apos;s Costing You</span>
              <span style={{ display: "block", fontWeight: 700 }}>Time and Money</span>
            </h2>

            <p className="body-on-navy" style={{ marginBottom: "var(--space-para-section)" }}>
              Our free assessment shows you exactly where your processes are losing capacity. Ten minutes. Results within 48 hours.
            </p>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body-sm)",
                fontWeight: 300,
                color: "rgba(250,250,248,0.5)",
                lineHeight: "var(--leading-body)",
                marginBottom: "var(--space-section-header-mb)",
                fontStyle: "italic",
              }}
            >
              Either way, you get clarity. That&apos;s the point.
            </p>

            {/* Proof stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {[
                "Average 3–5 critical gaps identified per assessment",
                "Average 12–18 hours per week recoverable through integration",
              ].map((stat) => (
                <div key={stat} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span className="bullet-cyan" style={{ marginTop: "9px" }} />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-body-sm)",
                      fontWeight: 500,
                      color: "var(--color-ink-inverted)",
                      lineHeight: "var(--leading-body)",
                    }}
                  >
                    {stat}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-meta)",
                fontWeight: 300,
                color: "rgba(250,250,248,0.4)",
                marginBottom: 0,
                letterSpacing: "0.02em",
              }}
            >
              POPIA compliant. No opt-in to marketing — just your results.
            </p>
          </div>

          {/* ── Right: CTA card ─────────────────────────────────────── */}
          <div style={{ paddingTop: "calc(0.6875rem * 1.5 + 2rem)" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "2.5rem",
              boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "var(--text-h3-serif)",
                color: "var(--color-ink-primary)",
                lineHeight: "var(--leading-subheading)",
                marginBottom: "1.25rem",
                borderBottom: "none",
                paddingBottom: 0,
              }}
            >
              Get Your Free Assessment
            </h3>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body-sm)",
                fontWeight: 300,
                color: "var(--color-ink-secondary)",
                lineHeight: "var(--leading-body)",
                marginBottom: "1.5rem",
              }}
            >
              Answer 10 questions about your operations. Takes about 10 minutes. We pinpoint exactly where your business is leaking time and money — and what to do about it.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "2rem" }}>
              {[
                "See your score live as you go",
                "Detailed report delivered within 48 hours",
                "No sign-up required to begin",
              ].map((point) => (
                <div key={point} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "3px" }}>
                    <circle cx="8" cy="8" r="7" stroke="var(--color-cyan)" strokeWidth="1.2" />
                    <path d="M5 8l2.5 2.5 3.5-4" stroke="var(--color-cyan)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-body-sm)",
                      fontWeight: 300,
                      color: "var(--color-ink-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <Button
              href="/popia-ai-check"
              variant="primary"
              className="w-full justify-center"
            >
              Start Your Free Assessment
            </Button>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-meta)",
                fontWeight: 300,
                color: "var(--color-ink-tertiary)",
                marginTop: "0.875rem",
                marginBottom: 0,
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              Free. No obligation. Results within 48 hours.
            </p>
          </div>
          </div>

        </div>

        {/* Risk removal */}
        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body-sm)",
              fontWeight: 300,
              color: "rgba(250,250,248,0.5)",
              marginBottom: 0,
              fontStyle: "italic",
            }}
          >
            No obligation. If there&apos;s no clear opportunity, we&apos;ll tell you — and you&apos;ll still walk away with a clear picture of where you stand.
          </p>
        </div>
      </div>
    </section>
  );
}
