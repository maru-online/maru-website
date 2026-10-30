import type { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import Button from "@/components/ui/Button";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/Animate";
import { seo } from "@/lib/seo";
import {
  SECTIONS,
  getEntries,
  getFeatured,
} from "@/lib/insights-resources/content";
import { breadcrumbJsonLd } from "@/lib/insights-resources/jsonld";
import { FeaturedCard, InsightCard, ResourceCard } from "@/components/insights-resources/Cards";

// Insights & Resources landing page. Copy: "Insights & Resources, Website Page
// Architecture & Implementation Brief", 30 Oct 2026, applied as written except
// the brand name ("Maru Online", two words).
//
// Status: BUILT, NOT LAUNCHED. Rules:
//  - Placeholder entries render on previews and local dev only (see
//    SHOW_PLACEHOLDERS). Production shows real entries only.
//  - The page is noindex until the first real entry exists, matches /insights,
//    and stays out of the sitemap and the nav until then.
//  - No article or guide copy is written here. All cards come from
//    lib/insights-resources/content.ts.
//  - The one H1 is the hero. Sections are H2, cards H3. Eyebrows are spans.

export function generateMetadata(): Metadata {
  const hasReal = getEntries().some((e) => !e.placeholder);
  return {
    ...seo("/insights-resources"),
    title: "Insights & Resources | Practical Guidance on AI for Business",
    description:
      "AI developments explained in business terms, plus practical guides on integrating AI, POPIA and data governance, AI readiness and automation, from Maru Online.",
    robots: hasReal ? undefined : { index: false, follow: false },
  };
}

const outerPad = "px-6 md:px-[60px]";
const innerWide = "max-w-[1100px] mx-auto";

const CONTACT_HREF = "/contact#contact-form";

function SectionHead({
  id,
  eyebrow,
  title,
  copy,
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  dark?: boolean;
}) {
  return (
    <FadeUp>
      <span className="label-eyebrow" style={{ marginBottom: "1.5rem" }}>{eyebrow}</span>
      <h2
        id={id}
        style={{
          marginBottom: "1rem",
          border: "none",
          fontWeight: 700,
          ...(dark ? { color: "var(--color-ink-inverted)" } : {}),
        }}
      >
        {title}
      </h2>
      <p className={dark ? "body-on-navy" : "body-muted"} style={{ maxWidth: "620px", marginBottom: "2.5rem" }}>
        {copy}
      </p>
    </FadeUp>
  );
}

function EmptyState({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      style={{
        padding: "2rem",
        borderRadius: "12px",
        border: `1px dashed ${dark ? "rgba(250,250,248,0.3)" : "var(--color-border-card)"}`,
        color: dark ? "var(--color-ink-inverted-muted)" : "var(--color-ink-secondary)",
      }}
    >
      {children}
    </p>
  );
}

export default function InsightsResourcesPage() {
  const featured = getFeatured();
  const insights = getEntries("insights").slice(0, 3);
  const resources = getEntries("resources").slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
      />

      {/* SECTION 1 — Page introduction (navy) */}
      <section
        className={`relative min-h-[60vh] flex items-center overflow-hidden ${outerPad} pt-40 md:pt-48 pb-24 md:pb-28`}
        style={{ background: "var(--gradient-hero)" }}
      >
        <BGPattern variant="grid" mask="fade-edges" size={40} fill="rgba(61, 184, 198, 0.101)" className="pointer-events-none" />
        <div className={`${innerWide} relative z-10 w-full`}>
          <FadeUp>
            <span className="label-eyebrow" style={{ marginBottom: "2rem" }}>Insights &amp; Resources</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split" style={{ marginBottom: "2rem" }}>
              <span className="maru-headline-split-light">Practical Insights for</span>
              <br />
              <span className="maru-headline-split-strong">Businesses Navigating AI.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="body-on-navy" style={{ maxWidth: "700px", marginBottom: 0 }}>
              Explore the latest developments in AI, understand what they mean for your business and access practical guidance on integrating AI into your operations. From industry insights to implementation best practices, find information to help you make informed decisions.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2 — Featured content (light) */}
      <section className={`${outerPad} py-20 md:py-24`} style={{ background: "var(--gradient-surface)" }}>
        <div className={innerWide}>
          <FadeUp>
            <span className="label-eyebrow" style={{ marginBottom: "1.5rem" }}>Featured</span>
            <h2 className="sr-only">Featured content</h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            {featured ? (
              <FeaturedCard entry={featured} />
            ) : (
              <EmptyState>The first featured piece is in preparation.</EmptyState>
            )}
          </FadeUp>
        </div>
      </section>

      {/* SECTION 3 — AI Insights for Business (dark: timely, current, analytical) */}
      <section
        id={SECTIONS.insights.segment}
        aria-labelledby="ai-insights-heading"
        className={`relative overflow-hidden ${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-navy-deep)" }}
      >
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            inset: 0,
            background:
              "radial-gradient(55% 70% at 100% 0%, rgba(61,184,198,0.14), transparent 60%), radial-gradient(40% 50% at 0% 100%, rgba(61,184,198,0.07), transparent 70%)",
          }}
        />
        <div className={`${innerWide} relative`}>
          <SectionHead
            id="ai-insights-heading"
            eyebrow="Timely · Analytical"
            title="AI Insights for Business"
            copy="The latest AI developments, industry news and analysis — with a focus on what matters to business."
            dark
          />
          {insights.length ? (
            <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insights.map((e) => (
                <StaggerChild key={e.slug} className="flex">
                  <InsightCard entry={e} />
                </StaggerChild>
              ))}
            </StaggerParent>
          ) : (
            <EmptyState dark>The first insights are in preparation.</EmptyState>
          )}
          <FadeUp delay={0.1}>
            <div style={{ marginTop: "2.5rem" }}>
              <Button href={`/insights-resources/${SECTIONS.insights.segment}`} variant="secondary">
                View All Insights
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 4 — Resources & Best Practice (light: practical, educational, evergreen) */}
      <section
        id={SECTIONS.resources.segment}
        aria-labelledby="resources-heading"
        className={`${outerPad} py-24`}
        style={{ background: "var(--gradient-surface)" }}
      >
        <div className={innerWide}>
          <SectionHead
            id="resources-heading"
            eyebrow="Practical · Evergreen"
            title="Resources & Best Practice"
            copy="Practical guides and resources to help businesses understand, plan and implement AI."
          />
          {resources.length ? (
            <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {resources.map((e) => (
                <StaggerChild key={e.slug} className="flex">
                  <ResourceCard entry={e} />
                </StaggerChild>
              ))}
            </StaggerParent>
          ) : (
            <EmptyState>The first guides are in preparation.</EmptyState>
          )}
          <FadeUp delay={0.1}>
            <div style={{ marginTop: "2.5rem" }}>
              <Button href={`/insights-resources/${SECTIONS.resources.segment}`} variant="secondary">
                View All Resources
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 5 — Final CTA (navy) */}
      <section className={`relative overflow-hidden ${outerPad} py-24`} style={{ backgroundColor: "var(--color-bg-navy)" }}>
        <div className={`${innerWide} max-w-[760px] mx-0 md:mx-auto`}>
          <FadeUp>
            <h2 style={{ color: "var(--color-ink-inverted)", border: "none", padding: 0, marginBottom: "var(--space-heading-body)" }}>
              <span style={{ fontWeight: 700 }}>Have an AI Challenge in Your Business?</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="body-on-navy" style={{ marginBottom: "var(--space-para-section)" }}>
              Understand where AI could make a practical difference to your business operations.
            </p>
          </FadeUp>
          <FadeUp delay={0.14}>
            <div data-maru-primary-cta>
              <Button href={CONTACT_HREF} variant="primary">Discuss a Business Challenge</Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
