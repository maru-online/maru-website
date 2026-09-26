import { Metadata } from "next";
import Button from "@/components/ui/Button";
import { BGPattern } from "@/components/ui/bg-pattern";
import ImageSplit from "@/components/ui/ImageSplit";
import ImageBand from "@/components/ui/ImageBand";
import ListItem from "@/components/ui/ListItem";
import ListGroup from "@/components/ui/ListGroup";
import Glyph from "@/components/ui/Glyph";
import { FadeUp } from "@/components/ui/Animate";
import AccordionFAQ from "@/components/ui/AccordionFAQ";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  ...seo('/services'),
  title: "Services: POPIA-Safe AI Audit, Integration & Training | Maru Online",
  description:
    "Four fixed-price steps to AI your business can defend: a POPIA-Safe AI Audit, workflow integration, team training, and measured results.",
};

const outerPad    = "px-6 md:px-[60px]";
const inner       = "max-w-[900px] mx-auto";
const innerWide   = "max-w-[1100px] mx-auto";
const innerNarrow = "max-w-[720px] mx-auto";

// ─── Service data ─────────────────────────────────────────────────────────────

const services = [
  {
    id:          "diagnostic",
    label:       "01",
    title:       "POPIA-Safe AI Audit",
    tagline:     "Map where your operation has gaps — before configuring anything.",
    description: "A written map of every tool, AI app and data flow in your business, with POPIA exposure flagged and savings sized. Report in 48 hours. R4,500.",
    bullets: [
      { leader: "Sector-specific intake",   body: "A structured brief tailored to your industry — medico legal, HR & recruitment, or conference & events." },
      { leader: "Verification call",         body: "A 30–45 minute call to clarify the brief, ask the right questions, and confirm scope." },
      { leader: "Written gap report",        body: "A clear document mapping where your workflows aren't connected, the cost of each gap, and the configuration priority order." },
      { leader: "90-day roadmap",            body: "A sequenced action plan so you know exactly what to configure and in what order." },
    ],
    pricing:     "R4,500",
    note:        "If you proceed to a full engagement, this fee offsets against the project cost.",
    href:        "/services/popia-safe-ai-audit",
    bg:          "var(--color-bg-primary)",
  },
  {
    id:          "build",
    label:       "02",
    title:       "Workflow Integration",
    tagline:     "Connect your existing tools. Configure the workflows between them.",
    description: "We connect your tools and automate the work, with consent, access and data location built in from day one.",
    bullets: [
      { leader: "Custom integration build",  body: "Connecting your existing tools — CRM, calendar, email, forms — so they pass information correctly." },
      { leader: "Automation layer",          body: "The workflows that run without human intervention: follow-ups, confirmations, handoffs, notifications." },
      { leader: "Brand voice training",      body: "AI outputs calibrated to sound like your business, not like a generic chatbot." },
      { leader: "POPIA compliance built in", body: "Every data touchpoint designed for compliance before a line of code is written." },
    ],
    pricing:     "Fixed quote",
    note:        "Priced from your audit findings and agreed before work starts.",
    href:        "/services/workflow-integration",
    bg:          "var(--color-bg-canvas)",
  },
  {
    id:          "training",
    label:       "03",
    title:       "Team Training & Handover",
    tagline:     "Your team runs the system. Not us.",
    description: "Your team learns the new workflows and the rules that keep them POPIA-safe: what goes into AI tools, and what never does.",
    bullets: [
      { leader: "Hands-on workshops",       body: "Practical sessions built around your actual tools, not generic AI theory." },
      { leader: "Prompt engineering",       body: "Teaching your team to get consistent, high-quality outputs from the tools you already have." },
      { leader: "Workflow adoption",        body: "Getting the new workflows embedded in how the team actually works — not just documented." },
      { leader: "30-day follow-up support", body: "A structured support window after training to catch issues before they become habits." },
    ],
    pricing:     "Fixed quote",
    note:        "Scoped per engagement. Can be standalone or follow a build.",
    href:        "/services/team-training-handover",
    bg:          "var(--color-bg-primary)",
  },
  {
    id:          "support",
    label:       "04",
    title:       "Results Optimisation",
    tagline:     "A second sprint when the first one shows what's next.",
    description: "Thirty days after go-live we measure hours saved and risks closed, then tune what the data shows.",
    bullets: [
      { leader: "Data-led scope",              body: "Built around what the 30-day measurement report surfaced — not assumptions." },
      { leader: "Fixed-scope sprint",          body: "Defined deliverables, defined timeline, agreed before work begins." },
      { leader: "Compliance review",           body: "Ongoing POPIA review as your data flows and tool stack evolve." },
      { leader: "Updated results baseline",    body: "A new measurement baseline set after the optimisation sprint completes." },
    ],
    pricing:     "Fixed quote",
    note:        "Available to clients who have completed a build engagement.",
    href:        "/services/results-optimisation",
    bg:          "var(--color-bg-canvas)",
  },
];


// ─── How an engagement runs (replaces /process, 26 Sep 2026) ─────────────────

const phases = [
  {
    label: "Step 1 · 48 hours",
    title: "We map where client data goes before we touch anything.",
    body:  "The POPIA-Safe AI Audit covers every tool, AI app and data flow in your business. You get a written report: the risks ranked, the manual work sized, and a fixed-price plan for what to fix first. R4,500, credited to the build if you go ahead.",
  },
  {
    label: "Step 2 · before you commit",
    title: "You approve a fixed-scope plan.",
    body:  "Every item is specified: what we build, what it connects to, and where the data sits. The price is agreed before work starts. No hourly billing and no scope creep.",
  },
  {
    label: "Step 3 · typically 4 to 8 weeks",
    title: "We build it safe, then hand it over.",
    body:  "Consent, access controls and data location are designed in from the start. Everything is tested and documented in plain language, and your team learns what goes into AI tools and what never does.",
  },
  {
    label: "Step 4 · 30 days after go-live",
    title: "We report what changed.",
    body:  "You get a written results report: hours saved, risks closed, and what to watch next. Any further work is scoped from that data, not from a sales conversation.",
  },
];

const engagementFaqs = [
  {
    q: "How long does the whole process take?",
    a: "The audit report arrives within 48 hours of your intake. A build typically runs four to eight weeks, depending on how many tools and workflows are involved. The 30-day measurement period follows go-live.",
  },
  {
    q: "Do I need to be technical to work with you?",
    a: "No. Everything we build is documented in plain language, and we train the people who will use it. If something breaks after handover, we are reachable.",
  },
  {
    q: "I already use AI tools. Do I have to replace them?",
    a: "Almost certainly not. We start by making what you have safe and useful. We only recommend a new tool when your current ones cannot do the job, or cannot do it without sending client data where it should not go, and we explain why.",
  },
  {
    q: "Can I start with just the audit and decide later?",
    a: "Yes. The audit is a complete deliverable on its own, with no obligation to continue. Many owners use the report to decide what to fix themselves.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      <FaqJsonLd items={engagementFaqs} />
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
              <span className="maru-headline-split-strong">Four steps to AI</span>
              <br />
              <span className="maru-headline-split-light">your business can defend.</span>
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
              show you the savings. Price agreed before any work starts.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Button href="/operations-assessment" variant="primary">
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
        src="/images/people/services-adviser-client.jpg"
        alt="A financial adviser and a client laughing together across a desk"
        objectPosition="center 30%"
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
          HOW AN ENGAGEMENT RUNS — replaces the retired /process page
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="how-it-works"
        className={`${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-canvas)", scrollMarginTop: "96px" }}
      >
        <div className={innerWide}>
          <FadeUp>
            <span className="label-eyebrow-ochre">How an engagement runs</span>
            <h2 style={{ border: "none", marginBottom: "var(--space-section-header-mb)" }}>
              <span style={{ fontWeight: 300 }}>Four steps.</span>
              <br />
              <span style={{ fontWeight: 700 }}>Each one has a written output.</span>
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phases.map((phase, i) => (
              <FadeUp key={phase.label} delay={0.06 * i}>
                <div className="card-lift p-8 h-full">
                  <span className="label-eyebrow" style={{ marginBottom: "0.75rem" }}>{phase.label}</span>
                  <h3 style={{ marginBottom: "0.75rem" }}>{phase.title}</h3>
                  <p className="body-muted" style={{ margin: 0 }}>{phase.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <div className={innerNarrow} style={{ marginTop: "4rem" }}>
            <FadeUp>
              <span className="label-eyebrow-ochre">Common questions</span>
              <AccordionFAQ items={engagementFaqs} />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
      {/* ── IMAGE BAND — before final CTA ────────────────────────────────── */}
      <ImageBand
        src="/images/people/services-shared-desk.jpg"
        alt="A small team's shared desk with two laptops, a phone, paper files and coffee mugs"
        objectPosition="center 45%"
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
              <span style={{ fontWeight: 700 }}>Twenty minutes will tell you.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="body-on-navy" style={{ marginBottom: "var(--space-para-section)" }}>
              The POPIA-Safe AI Audit is where every engagement starts — a
              structured audit of your current setup, a clear picture of what to configure first,
              and a written report delivered within 48 hours.
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
