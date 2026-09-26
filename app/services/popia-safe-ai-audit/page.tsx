import { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ListItem from "@/components/ui/ListItem";
import ListGroup from "@/components/ui/ListGroup";
import { FadeUp } from "@/components/ui/Animate";
import { CaseStudyCallout } from "@/components/marketing/CaseStudyCallout";
import ImageBand from "@/components/ui/ImageBand";
import { seo } from '@/lib/seo'
import { ServiceJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  ...seo('/services/popia-safe-ai-audit'),
  title: "POPIA-Safe AI Audit | Maru Online",
  description:
    "Find out where your client data goes. We map every tool, AI app and data flow, flag POPIA exposure and size the savings. 48-hour report, R4,500.",
};

const outerPad    = "px-6 md:px-[60px]";
const inner       = "max-w-[900px] mx-auto";
const innerNarrow = "max-w-[720px] mx-auto";

// "What you get" — COPY-DECK §3, verbatim. Plain sentences, so no bold leader.
const bullets: { leader?: string; body: string }[] = [
  { body: "A data-flow map of your tools, AI apps and WhatsApp workflows" },
  { body: "POPIA exposure flagged: cross-border transfers (s72), automated decisions (s71), consent gaps" },
  { body: "The manual work costing you time, sized in hours per week" },
  { body: "A fixed-price plan for what to fix first" },
];

export default function PopiaSafeAiAuditPage() {
  return (
    <>
      <ServiceJsonLd
        name="POPIA-Safe AI Audit"
        description="Find out where your client data goes. We map every tool, AI app and data flow, flag POPIA exposure and size the savings. 48-hour report, R4,500."
        path="/services/popia-safe-ai-audit"
        price="4500"
      />
      {/* ── Hero ── */}
      <section
        className={`min-h-[60vh] flex items-center ${outerPad} pt-48 pb-32`}
        style={{ backgroundColor: "var(--color-bg-navy)" }}
      >
        <div className={inner}>
          <FadeUp>
            <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
              <ol
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-meta)",
                  fontWeight: 300,
                  color: "rgba(250,250,248,0.45)",
                }}
              >
                <li>
                  <Link
                    href="/services"
                    style={{ color: "rgba(250,250,248,0.45)", textDecoration: "none" }}
                  >
                    Services
                  </Link>
                </li>
                <li aria-hidden="true">→</li>
                <li style={{ color: "var(--color-cyan)" }}>POPIA-Safe AI Audit</li>
              </ol>
            </nav>
          </FadeUp>
          <FadeUp delay={0.06}>
            <span className="label-eyebrow-ochre">01 — POPIA-Safe AI Audit</span>
          </FadeUp>
          <FadeUp delay={0.12}>
            <h1 style={{ color: "var(--color-ink-inverted)" }}>POPIA-Safe AI Audit</h1>
          </FadeUp>
          <FadeUp delay={0.18}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3-serif)",
                fontWeight: 400,
                lineHeight: "var(--leading-subheading)",
                color: "var(--color-ink-inverted-muted)",
                letterSpacing: "var(--tracking-tight)",
                maxWidth: "600px",
                margin: 0,
              }}
            >
              Map where your operation has gaps — before configuring anything.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Pricing block ── */}
      <section
        className={`${outerPad} py-16`}
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <div className={innerNarrow}>
          <FadeUp>
            <div
              style={{
                borderLeft: "3px solid var(--color-cyan)",
                paddingLeft: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.25rem",
                  fontWeight: 600,
                  color: "var(--color-navy)",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                R4,500
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body-sm)",
                  fontWeight: 300,
                  color: "var(--color-ink-secondary)",
                  marginBottom: "0.375rem",
                }}
              >
                Fixed-scope · Delivered within 48 hours
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-meta)",
                  fontWeight: 300,
                  color: "var(--color-ink-tertiary)",
                  margin: 0,
                }}
              >
                If you proceed to a full engagement, this fee offsets against the project cost.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── What it is + What's included ── */}
      <section
        className={`${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-primary)" }}
      >
        <div className={inner}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-start">
            {/* Left — what it is + how it connects */}
            <div>
              <FadeUp>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "10px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--color-cyan)",
                    background: "rgba(61, 184, 198, 0.10)",
                    border: "1px solid rgba(61, 184, 198, 0.25)",
                    borderRadius: "4px",
                    padding: "3px 8px",
                    marginBottom: "0.75rem",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  What it is
                </span>
                <p className="body-muted" style={{ marginBottom: "2.5rem" }}>
                  Before anything gets built, we find out where your client information actually
                  goes: which AI tools see it, which apps store it offshore, and which workflows copy
                  it by hand. You get a written report within 48 hours: the risks, ranked, and the
                  time and money each fix will save.
                </p>
              </FadeUp>
              <FadeUp delay={0.08}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "10px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--color-cyan)",
                    background: "rgba(61, 184, 198, 0.10)",
                    border: "1px solid rgba(61, 184, 198, 0.25)",
                    borderRadius: "4px",
                    padding: "3px 8px",
                    marginBottom: "0.75rem",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  How it connects
                </span>
                <p className="body-muted" style={{ margin: 0 }}>
                  The audit report is the input to every other engagement. If we find a clear
                  integration opportunity, we scope the Workflow Integration engagement directly from
                  the report findings. Either way, you know the full cost before committing to anything
                  further.
                </p>
              </FadeUp>
            </div>

            {/* Right — what's included */}
            <FadeUp delay={0.1}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "10px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--color-cyan)",
                  background: "rgba(61, 184, 198, 0.10)",
                  border: "1px solid rgba(61, 184, 198, 0.25)",
                  borderRadius: "4px",
                  padding: "3px 8px",
                  marginBottom: "0.75rem",
                  fontFamily: "var(--font-body)",
                }}
              >
                What&apos;s included
              </span>
              <ListGroup>
                {bullets.map((b) => (
                  <ListItem key={b.body} leader={b.leader} body={b.body} />
                ))}
              </ListGroup>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Case study (brief item 08) ── */}
      <section
        className={`${outerPad} py-16`}
        style={{ backgroundColor: "var(--color-bg-primary)" }}
      >
        <div className={innerNarrow}>
          <FadeUp>
            <CaseStudyCallout
              source="services_operations_diagnostic"
              line="GrowthIQ — how the scope was set, what was built, and what changed."
            />
          </FadeUp>
        </div>
      </section>

      {/* ── IMAGE BAND — before the final CTA (image plan, 26 Sep 2026) ── */}
      <ImageBand
        src="/images/people/audit-data-flow-map.jpg"
        alt="Two people's hands drawing a data-flow map on paper, with sticky notes and pencils"
        objectPosition="center 50%"
      />

      {/* ── CTA ── */}
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
                marginBottom: "var(--space-heading-body)",
              }}
            >
              <span style={{ fontWeight: 300 }}>The right place to start is</span>
              <br />
              <span style={{ fontWeight: 700 }}>a conversation about where your operation has gaps.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button href="/operations-assessment" variant="primary">
                Start the assessment
              </Button>
              <Button href="/booking" variant="tertiary">
                Book a discovery call
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
