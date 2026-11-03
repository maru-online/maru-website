import { Metadata } from "next";
import Image from "next/image";
import { BGPattern } from "@/components/ui/bg-pattern";
import Button from "@/components/ui/Button";
import Glyph from "@/components/ui/Glyph";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/Animate";
import { seo } from '@/lib/seo'
import SharedSectionHead from "@/components/ui/SectionHead";

// About page copy: "Maru Online — Revised Website Copy" v1.0 (1 Nov 2026),
// applied over "MaruOnline — About Page Copy" (approved 20 Oct 2026). The
// revision folds the old "Our commitments" cards (Clear thinking, Defined
// work, Practical outcomes) into the approach section.
// The GrowthIQ case study is published as written, on the owner's decision.
// "AI-guided" in block 04 is deliberate: the GrowthIQ gap assessment is
// AI-guided, so that is the claim that can be shown. Do not soften it to
// "AI-supported". The free POPIA review is an informational summary, never a
// certification or compliance audit.
//
// Implementation notes (20 Oct 2026):
//  - One H1 (the hero). H2 for sections, H3 for cards and case-study stages.
//    Eyebrows are styled spans, not headings.
//  - GrowthIQ visuals must be genuine product screens or brand assets.
//  - No outcome metrics until measured (report-preparation time, record
//    completeness, admin effort). The case study says so in its closing block.
//  - Data protection is described as a design consideration. Never claim Maru
//    Online or GrowthIQ is certified, or that a system is automatically
//    POPIA-compliant.

export const metadata: Metadata = {
  ...seo('/about'),
  title: "About Maru Online | AI Systems Built Around Real Business Problems",
  description:
    "Maru Online helps South African businesses solve operational problems by connecting AI, data and the tools their teams already use, with POPIA-aware data governance built into the design and implementation.",
};

const outerPad  = "px-6 md:px-[60px]";
const innerWide = "max-w-[1100px] mx-auto";
const innerText = "max-w-[820px]";

const CONTACT_HREF = "/contact#contact-form";
const ASSESSMENT_HREF = "/popia-ai-check";

// ─── Content ──────────────────────────────────────────────────────────────────

const approach = [
  {
    icon: "search" as const,
    heading: "Clear thinking",
    body: "Understand the business problem before selecting a tool.",
  },
  {
    icon: "layers" as const,
    heading: "Defined work",
    body: "Establish the scope, information, responsibilities, and expected outcome.",
  },
  {
    icon: "team" as const,
    heading: "Practical outcomes",
    body: "Build something usable, maintainable, and relevant to the way the business operates.",
  },
];

// Case-study cards as bullets (2 Nov 2026), tightened from the approved
// paragraphs. "AI-guided" stays (see note at the top).
const caseBlocks: {
  n: string;
  label: string;
  heading: string;
  points: React.ReactNode[];
}[] = [
  {
    n: "01",
    label: "Industry research",
    heading: "Understand the challenge before defining the solution",
    points: [
      "Desktop research into the Enterprise and Supplier Development (ESD) industry.",
      "Focused on the challenges agencies face running ESD programmes for large corporates.",
      "Set the product’s context and found room to differentiate GrowthIQ.",
    ],
  },
  {
    n: "02",
    label: "Product strategy",
    heading: "Define a clear point of difference",
    points: [
      "AI supporting a single source of truth for ESD programme management.",
      <>
        Positioned on one promise:{" "}
        <strong style={{ fontWeight: 600, color: "var(--color-ink-inverted)" }}>
          &ldquo;Audit-ready reporting at every stage.&rdquo;
        </strong>
      </>,
      "Evidence available throughout the programme, not rebuilt at the end.",
    ],
  },
  {
    n: "03",
    label: "Brand strategy & design",
    heading: "Build a brand around the product promise",
    points: [
      "Brand mark, design tokens, visual identity, and look and feel, built from the strategy.",
      "Designed to communicate clarity, structure, and confidence in reporting.",
      "Data protection considerations informed the brand and product design.",
    ],
  },
  {
    n: "04",
    label: "Strategy into execution",
    heading: "Bring the product vision to life",
    points: [
      "Research, positioning, and brand set the foundation for the digital experience.",
      "Supports ESD programmes across five stages: identify beneficiaries, assess businesses, develop capabilities, integrate suppliers, and verify evidence.",
      "An AI-guided approach and live capture help keep reporting ready throughout.",
    ],
  },
];

const screens = [
  {
    src: "/images/case-studies/growthiq-dashboard.webp",
    alt: "GrowthIQ programme dashboard showing an ESD score, verification due date and a beneficiary list, using invented sample data",
    caption: "GrowthIQ programme dashboard. Shown with invented sample data, not a client record.",
  },
  {
    src: "/images/case-studies/growthiq-assessment.webp",
    alt: "GrowthIQ business assessment step with yes or no questions and an Ask GrowthAI prompt, using invented sample data",
    caption: "AI-guided business assessment using the platform’s built-in guidance. Sample data.",
  },
];

// ─── Small pieces ─────────────────────────────────────────────────────────────

// One section head site-wide (reading system, 3 Nov 2026): one weight, the
// second part highlighted in colour only. Wraps components/ui/SectionHead.
function SectionHead({ eyebrow, light, strong, onNavy = false }: { eyebrow: string; light?: string; strong: string; onNavy?: boolean }) {
  return <SharedSectionHead eyebrow={eyebrow} light={light} strong={strong} dark={onNavy} animate={false} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          HERO
          bg: navy — matches homepage hero
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative min-h-[70vh] flex items-center overflow-hidden ${outerPad} pt-40 md:pt-48 pb-24 md:pb-32`}
        style={{ background: "var(--gradient-hero)" }}
      >
        <BGPattern variant="grid" mask="fade-edges" size={40} fill="rgba(61, 184, 198, 0.101)" className="pointer-events-none" />
        <div className={`${innerWide} relative z-10 w-full`}>
          <FadeUp>
            <span className="label-eyebrow" style={{ marginBottom: "2rem" }}>About Maru Online</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split" style={{ marginBottom: "2rem" }}>
              <span className="maru-headline-split-light">We build AI-enabled systems around</span>
              <br />
              <span className="maru-headline-split-strong">real business problems.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="body-on-navy" style={{ maxWidth: "680px", marginBottom: "1rem" }}>
              We help South African businesses identify where AI, better-connected data, or workflow redesign can solve operational problems—and implement the right solution.
            </p>
            <p className="body-on-navy" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
              By connecting business strategy, AI, data, and digital systems, we design practical workflows around the way your business actually works.
            </p>
          </FadeUp>
          <FadeUp delay={0.22}>
            <div
              data-maru-primary-cta
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Button href={ASSESSMENT_HREF} variant="primary" className="w-full sm:w-auto justify-center">
                Take the free, informational POPIA review
              </Button>
              <Button href={CONTACT_HREF} variant="secondary" className="w-full sm:w-auto justify-center">
                Discuss your business challenge
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1 — OUR PURPOSE
          bg: surface
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ background: "var(--gradient-surface)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead
              eyebrow="Why Maru Online exists"
              light="Technology should solve problems,"
              strong="not create more work."
            />
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className={innerText}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "var(--text-body)",
                  color: "var(--color-ink-primary)",
                  lineHeight: "var(--leading-body)",
                  marginBottom: "1.25rem",
                }}
              >
                Businesses do not necessarily need more tools. They need better ways for their systems, data, and people to work together.
              </p>
              <p
                className="body-muted"
                style={{
                  marginBottom: 0,
                  borderLeft: "4px solid var(--color-cyan)",
                  paddingLeft: "1.25rem",
                }}
              >
                The technology follows the problem—not the other way around.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 — OUR APPROACH
          bg: secondary
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead
              eyebrow="How we think"
              light="Understand the business. Design the solution."
              strong="Make it work."
            />
            <div className={innerText} style={{ marginBottom: "var(--space-section-header-mb)" }}>
              <p className="body-muted" style={{ marginBottom: 0 }}>
                We begin by understanding the business challenge, the workflow involved, the information it depends on, and the people who need to use the solution. From there, we define the right scope, design the system, integrate it into the operating environment, and support the handover.
              </p>
            </div>
          </FadeUp>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {approach.map((card) => (
              <StaggerChild key={card.heading} className="h-full">
                <div className="card-lift h-full flex flex-col">
                  <div className="card-body">
                    <div className="card-label-row">
                      <span className="glyph-chip">
                        <Glyph name={card.icon} size={22} />
                      </span>
                    </div>
                    <h3 className="card-title">{card.heading}</h3>
                    <p className="card-text">{card.body}</p>
                  </div>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 — CASE STUDY: GROWTHIQ
          bg: dark chapter (reading system, 3 Nov 2026): the page's one piece of proof
          ════════════════════════════════════════════════════════════════════ */}
      <section id="growthiq" className={`section-dark ${outerPad} py-24`}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead
              eyebrow="Our work in practice"
              light="A practical example"
              strong="of the work."
              onNavy
            />
            <div className={innerText} style={{ marginBottom: "var(--space-section-header-mb)" }}>
              <p className="body-on-navy" style={{ marginBottom: "1rem" }}>
                GrowthIQ is an AI-enabled Enterprise and Supplier Development (ESD) platform developed by Growth Firm. It brings programme management, SME development information and reporting into a connected environment designed to support visibility and audit-ready reporting throughout the ESD lifecycle.
              </p>
              <p className="body-on-navy" style={{ marginBottom: 0 }}>
                For GrowthIQ, Maru Online contributed industry research, product strategy, positioning, and brand development. The work involved understanding the market, defining the product direction, and building a clearer foundation for growth.
              </p>
            </div>
          </FadeUp>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {caseBlocks.map((block) => (
              <StaggerChild key={block.n} className="h-full">
                <article className="card-dark h-full flex flex-col">
                  <div className="card-body">
                  <div className="card-label-row">
                    <span className="card-label">{block.n} — {block.label}</span>
                  </div>
                  <h3 className="card-title">{block.heading}</h3>
                  <ul className="prob-list">
                    {block.points.map((p, i) => (
                      <li key={i}>
                        <span className="prob-dot" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  </div>
                </article>
              </StaggerChild>
            ))}
          </StaggerParent>

          {/* Genuine GrowthIQ screens, captured from the demo programme. The
              in-app "SAMPLE DATA" banner stays visible on purpose: every name,
              score and figure in them is invented. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6" style={{ marginTop: "2rem" }}>
            {screens.map((s) => (
              <FadeUp key={s.src}>
                <figure className="card-lift overflow-hidden" style={{ margin: 0 }}>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={1800}
                    height={1012}
                    sizes="(min-width: 768px) 540px, 100vw"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <figcaption
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-meta)",
                      fontWeight: 300,
                      color: "var(--color-ink-tertiary)",
                      padding: "0.875rem 1.25rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.caption}
                  </figcaption>
                </figure>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.08}>
            <div
              className="card-dark"
              style={{ marginTop: "2rem", borderLeft: "4px solid var(--color-cyan)" }}
            >
              <div className="card-body">
              <h3 className="card-title">What this demonstrates</h3>
              <p className="card-text" style={{ marginBottom: "0.875rem", maxWidth: "820px" }}>
                GrowthIQ illustrates how we approach a complex business challenge: understand the industry, identify the operational need, establish a meaningful product position and translate that strategy into a distinctive digital experience.
              </p>
              <p className="card-text" style={{ marginBottom: 0, maxWidth: "820px" }}>
                The platform has recently launched, so measurable post-launch business outcomes are not yet available. As performance data becomes available, we can build on this case study with verified evidence of its impact.
              </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5 — AI AND DATA PROTECTION
          bg: surface
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ background: "var(--gradient-surface)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead
              eyebrow="Responsible implementation"
              light="Build with data protection"
              strong="in mind."
            />
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className={innerText}>
              <p className="body-muted" style={{ marginBottom: "1rem" }}>
                For AI-enabled systems involving personal information, we consider POPIA-related data protection requirements as part of the design conversation. This includes considering how information is collected, accessed, used, shared, stored, and retained.
              </p>
              <p className="body-muted" style={{ marginBottom: "1rem" }}>
                The relevant considerations depend on what information is involved, how it will be used, and which systems or providers will access it.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "var(--text-meta)",
                  color: "var(--color-ink-tertiary)",
                  lineHeight: 1.6,
                  marginBottom: "2rem",
                  borderLeft: "3px solid var(--color-cyan)",
                  paddingLeft: "1rem",
                }}
              >
                Maru Online provides implementation and design support. This is not legal advice or a blanket guarantee of POPIA compliance.
              </p>
              <div className="flex flex-col items-stretch sm:items-start gap-3">
                <Button href={ASSESSMENT_HREF} variant="primary" className="w-full sm:w-auto justify-center">
                  Take the free, informational POPIA review
                </Button>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    fontSize: "var(--text-meta)",
                    color: "var(--color-ink-tertiary)",
                    margin: 0,
                  }}
                >
                  Receive an informational summary highlighting areas to review.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA
          bg: navy
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative overflow-hidden ${outerPad} py-24`}
        style={{ background: "var(--gradient-hero)" }}
      >
        <BGPattern variant="grid" mask="fade-edges" size={40} fill="rgba(61, 184, 198, 0.08)" className="pointer-events-none" />
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <h2 style={{ marginBottom: "1.5rem", border: "none", color: "var(--color-ink-inverted)" }}>
              Let&apos;s solve the right problem.
            </h2>
            <p className="body-on-navy" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
              Let&apos;s identify the challenge, assess the opportunity, and outline a practical next step.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button href={CONTACT_HREF} variant="primary" className="w-full sm:w-auto justify-center">
                Discuss your business challenge
              </Button>
              <Button href={ASSESSMENT_HREF} variant="secondary" className="w-full sm:w-auto justify-center">
                Take the free, informational POPIA review
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
