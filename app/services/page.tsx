import { Metadata } from "next";
import Button from "@/components/ui/Button";
import { BGPattern } from "@/components/ui/bg-pattern";
import ImageSplit from "@/components/ui/ImageSplit";
import ImageBand from "@/components/ui/ImageBand";
import CardNavy from "@/components/ui/CardNavy";
import ListItem from "@/components/ui/ListItem";
import ListGroup from "@/components/ui/ListGroup";
import Glyph from "@/components/ui/Glyph";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/Animate";
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  ...seo('/services'),
  title: "Services | Maru Online",
  description:
    "We configure the connections your business is missing — so your systems share data, your team stops the manual handoffs, and your operation runs the way it should.",
};

const outerPad    = "px-6 md:px-[60px]";
const inner       = "max-w-[900px] mx-auto";
const innerWide   = "max-w-[1100px] mx-auto";
const innerNarrow = "max-w-[720px] mx-auto";

// ─── Service data ─────────────────────────────────────────────────────────────

// No published price figures (Jimmy, 6 Oct 2026); see /process#how-we-price.
type Service = {
  id: string
  label: string
  title: string
  tagline: string
  description: string
  bullets: { leader: string; body?: string }[]
  pricing: string
  note: string
  href: string
  bg: string
}

const services: Service[] = [
  {
    id:          "diagnostic",
    label:       "01",
    // The paid Operations Diagnostic is retired; the free Operations
    // Assessment replaced it. Approved handover wording only (entries 04, 09, 13).
    title:       "Exposure Check",
    tagline:     "We find where your time, money and client data leak. Free.",
    description: "Start with a free assessment.",
    bullets: [
      { leader: "See your score live as you go" },
      { leader: "No sign-up required to begin" },
    ],
    pricing:     "Free",
    note:        "No obligation. If there's no clear opportunity, we'll tell you.",
    href:        "/services/operations-diagnostic",
    bg:          "var(--color-bg-primary)",
  },
  {
    id:          "build",
    label:       "02",
    title:       "Workflow Integration",
    tagline:     "Connect your existing tools. Configure the workflows between them.",
    description: "Fixed-scope implementation built around what the assessment found. We configure the connections between your tools, extend what's already working, and build the automation layer on top. Vendor-agnostic. Your stack stays — we connect it.",
    bullets: [
      { leader: "Custom integration build",  body: "Connecting your existing tools — CRM, calendar, email, forms — so they pass information correctly." },
      { leader: "Automation layer",          body: "The workflows that run without human intervention: follow-ups, confirmations, handoffs, notifications." },
      { leader: "Brand voice training",      body: "AI outputs calibrated to sound like your business, not like a generic chatbot." },
      { leader: "Built with POPIA in mind",  body: "Every data touchpoint designed with POPIA in mind before a line of code is written." },
    ],
    pricing:     "Priced in your proposal",
    note:        "Scoped after the assessment — no surprises.",
    href:        "/services/workflow-integration",
    bg:          "var(--color-bg-canvas)",
  },
  {
    id:          "training",
    label:       "03",
    title:       "Team Training & Handover",
    tagline:     "Your team runs the system. Not us.",
    description: "Hands-on training built around the specific workflows we've configured. Your team learns how to use, manage, and adapt the system — so the capability stays in the business after we hand over.",
    bullets: [
      { leader: "Hands-on workshops",       body: "Practical sessions built around your actual tools, not generic AI theory." },
      { leader: "Prompt engineering",       body: "Teaching your team to get consistent, high-quality outputs from the tools you already have." },
      { leader: "Workflow adoption",        body: "Getting the new workflows embedded in how the team actually works — not just documented." },
      { leader: "30-day follow-up support", body: "A structured support window after training to catch issues before they become habits." },
    ],
    pricing:     "Priced in your proposal",
    note:        "Scoped per engagement. Can be standalone or follow a build.",
    href:        "/services/team-training-handover",
    bg:          "var(--color-bg-primary)",
  },
  {
    id:          "support",
    label:       "04",
    title:       "Results Optimisation",
    tagline:     "A second sprint when the first one shows what's next.",
    description: "A fixed-scope optimisation engagement triggered by what the 30-day measurement phase surfaces. Not a retainer — a defined sprint built around specific opportunities the data identified.",
    bullets: [
      { leader: "Data-led scope",              body: "Built around what the 30-day measurement report surfaced — not assumptions." },
      { leader: "Fixed-scope sprint",          body: "Defined deliverables, defined timeline, agreed before work begins." },
      { leader: "Compliance review",           body: "Ongoing POPIA review as your data flows and tool stack evolve." },
      { leader: "Updated results baseline",    body: "A new measurement baseline set after the optimisation sprint completes." },
    ],
    pricing:     "Priced in your proposal",
    note:        "Available to clients who have completed a build engagement.",
    href:        "/services/results-optimisation",
    bg:          "var(--color-bg-canvas)",
  },
];

// Foundation services, moved verbatim from the homepage (entry 10).
const foundations = [
  {
    ghost: "01",
    icon: "compass" as const,
    name: "Strategy & Consultation",
    description: "We map the ground before anything gets built.",
    deliverables: ["Market and audience research", "Digital roadmap and architecture", "Go-to-market strategy"],
  },
  {
    ghost: "02",
    icon: "browser" as const,
    name: "Design & Development",
    description: "Products built for integration from day one.",
    deliverables: ["Websites, web apps and e-commerce", "Built for AI integration from day one", "Performance and conversion optimised"],
  },
  {
    ghost: "03",
    icon: "signal" as const,
    name: "Digital Marketing Support",
    description: "Insights from your data, then campaigns that act on them.",
    deliverables: ["Analytics and insights", "Campaign strategy and execution", "Online visibility"],
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative min-h-[70vh] flex items-center ${outerPad} pt-48 pb-32`}
        style={{ backgroundColor: "var(--color-bg-navy)" }}
      >
        <BGPattern variant="grid" mask="none" size={40} fill="rgba(61, 184, 198, 0.12)" className="z-0" />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            border: "1px solid rgba(61,184,198,0.15)",
            pointerEvents: "none",
          }}
        />
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <span className="label-eyebrow">Services</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split">
              <span className="maru-headline-split-strong">Paying for AI tools</span>
              <br />
              <span className="maru-headline-split-light">that don&apos;t pay you back?</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p
              className="font-body font-light text-lg max-w-[600px]"
              style={{
                color: "var(--color-ink-inverted-muted)",
                marginBottom: "var(--space-section-header-mb)",
                lineHeight: "var(--leading-body)",
              }}
            >
              We connect the tools you already have, automate the busywork, and
              show you the savings. Scope and price are set out in your proposal before any work starts.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Button href="/popia-ai-check" variant="primary">
                Start the assessment
              </Button>
              <Button href="#services" variant="tertiary">
                See all services
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── IMAGE SPLIT — between hero and intro ─────────────────────────── */}
      <ImageSplit
        src="/images/people/integration-looks-like.png"
        alt="Two professionals reviewing data on a monitor in a modern office"
        eyebrow="Integrated AI in practice"
        heading="What integrated AI actually looks like."
        body="Leads land in your CRM on their own. Follow-ups send themselves. Invoices go out the moment a job closes. Reports update while you sleep."
        imagePosition="right"
        bg="var(--color-bg-canvas)"
      />

      {/* ════════════════════════════════════════════════════════════════════
          INTRO — fixed-scope principle
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-20`}
        style={{ background: "var(--gradient-surface)" }}
      >
        <div className={innerNarrow}>
          <FadeUp>
            <p className="body-muted" style={{ margin: 0 }}>
              We identify where information isn&apos;t flowing automatically and configure the
              connections that make it happen. We only recommend new tools when there&apos;s a
              genuine capability gap your existing stack can&apos;t fill — and we&apos;ll tell you
              plainly when that&apos;s the case.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SERVICE SECTIONS — alternating bg
          ════════════════════════════════════════════════════════════════════ */}
      {services.map((service, index) => (
        <section
          id={service.id === "diagnostic" ? "services" : service.id}
          key={service.id}
          className={`${outerPad} py-24`}
          style={{ background: index % 2 === 0 ? "var(--color-bg-primary)" : "var(--gradient-surface)" }}
        >
          <div className={inner}>
            <div className="card-lift p-8 md:p-12">
              {/* Header */}
              <FadeUp>
                <div style={{ marginBottom: "var(--space-section-header-mb)" }}>
                  <div className="flex items-start gap-4 mb-3">
                    <span className="glyph-chip">
                      <Glyph name={service.id === "diagnostic" ? "search" : service.id === "build" ? "connect" : service.id === "training" ? "team" : "chart"} size={22} />
                    </span>
                    <div>
                      <span className="label-eyebrow-ochre" style={{ marginBottom: 0 }}>
                        {service.label} — {service.title}
                      </span>
                      <h2>{service.title}</h2>
                    </div>
                  </div>
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
                    {service.tagline}
                  </p>
                </div>
              </FadeUp>

              {/* 2-col: description + bullets */}
              <FadeUp delay={0.08}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-start">
                  {/* Left — description + pricing */}
                  <div>
                    <p className="body-muted" style={{ marginBottom: "var(--space-para-section)" }}>
                      {service.description}
                    </p>

                    {/* Pricing block */}
                    <div
                      style={{
                        borderTop: "1px solid var(--color-border-default)",
                        paddingTop: "1.25rem",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.75rem",
                          fontWeight: 600,
                          color: "var(--color-navy)",
                          lineHeight: 1,
                          marginBottom: "0.375rem",
                        }}
                      >
                        {service.pricing}
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
                        {service.note}
                      </p>
                    </div>

                    <div style={{ marginTop: "1.5rem" }}>
                      <Button href={service.href} variant="secondary">
                        Learn more
                      </Button>
                    </div>
                  </div>

                  {/* Right — what's included */}
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-label)",
                        fontWeight: 500,
                        letterSpacing: "var(--tracking-eyebrow)",
                        textTransform: "uppercase",
                        color: "var(--color-ink-tertiary)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      What&apos;s included
                    </p>
                    <ListGroup>
                      {service.bullets.map((b) => (
                        <ListItem key={b.leader} leader={b.leader} body={b.body} />
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      ))}

      {/* ════════════════════════════════════════════════════════════════════
          FOUNDATIONS — moved from the homepage (copy handover entry 10) so
          the content is not lost when the homepage drops to one link line.
          The homepage line links here (#foundations). Copy unchanged.
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="foundations"
        className={`${outerPad} py-24 scroll-mt-24`}
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <div className={innerWide}>
          <FadeUp>
            <h2>
              <span style={{ fontWeight: 300 }}>Need more than workflows?</span>
              <br />
              <span style={{ fontWeight: 700 }}>We build the rest too.</span>
            </h2>
            <p
              className="body-muted"
              style={{ maxWidth: "680px", marginBottom: "var(--space-section-header-mb)" }}
            >
              Strategy, websites, and marketing — the foundations that make everything else work.
            </p>
          </FadeUp>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {foundations.map((col) => (
              <StaggerChild key={col.ghost} className="h-full">
                <div className="card-lift h-full rounded-[10px]" style={{ padding: "1.75rem 1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem" }}>
                    <span className="glyph-chip glyph-chip-gold glyph-chip-lg">
                      <Glyph name={col.icon} size={28} />
                    </span>
                    <span
                      style={{
                        fontSize: "26px",
                        fontWeight: 100,
                        color: "rgba(205, 170, 83, 0.32)",
                        lineHeight: 1,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {col.ghost}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "var(--text-h3-sans)",
                      fontWeight: 600,
                      color: "var(--color-ink-primary)",
                      lineHeight: 1.3,
                      marginBottom: "0.75rem",
                      borderBottom: "2px solid var(--color-gold)",
                      paddingBottom: "0.75rem",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {col.name}
                  </h3>
                  <p className="body-muted" style={{ marginBottom: "1.25rem" }}>
                    {col.description}
                  </p>
                  <ListGroup>
                    {col.deliverables.map((item) => (
                      <ListItem key={item} leader={item} />
                    ))}
                  </ListGroup>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── IMAGE BAND — before final CTA ────────────────────────────────── */}
      <ImageBand
        src="/images/people/vendor-agnostic.png"
        alt="South African professionals working together at a computer"
        overlayText={
          <>
            <span style={{ fontWeight: 300 }}>Vendor-agnostic.</span>{' '}
            <span style={{ fontWeight: 700 }}>Your tools stay.</span>
            <br />
            <span style={{ fontWeight: 300 }}>We configure the connections between them.</span>
          </>
        }
        height={400}
      />

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA — navy
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-navy)" }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            border: "1px solid rgba(61,184,198,0.12)",
            pointerEvents: "none",
          }}
        />
        <div className={innerNarrow}>
          <FadeUp>
            <span className="label-eyebrow">The right place to start</span>
            <h2
              style={{
                color: "var(--color-ink-inverted)",
                border: "none",
                padding: 0,
                marginBottom: "var(--space-heading-body)",
              }}
            >
              <span style={{ fontWeight: 300 }}>Not sure where to start?</span>
              <br />
              <span style={{ fontWeight: 700 }}>A few minutes will tell you.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="body-on-navy" style={{ marginBottom: "var(--space-para-section)" }}>
              The Exposure Check is where every engagement starts.
            </p>
            <hr
              className="rule"
              style={{
                background: "rgba(250,250,248,0.15)",
                marginBottom: "var(--space-para-section)",
              }}
            />
          </FadeUp>
          <FadeUp delay={0.14}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button href="/popia-ai-check" variant="primary">
                Start the assessment
              </Button>
              <Button href="/contact#contact-form" variant="tertiary">
                Request a proposal
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
