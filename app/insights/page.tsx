import { Metadata } from "next";
import Image from "next/image";
import { BGPattern } from "@/components/ui/bg-pattern";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MaruBriefForm } from "@/components/ui/MaruBriefForm";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/Animate";
import { getInsightList, type InsightListItem } from "@/lib/insights/getInsights";
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  ...seo('/insights'),
  title: "Insights | Maru Online",
  description:
    "Practical AI integration thinking for South African SMEs — no vendor fluff, no hype. Real patterns from real engagements.",
  // The section has no articles yet. It stays reachable so existing links do not
  // 404, but it should not be indexed or advertised while it is empty.
  // Remove this and restore the sitemap entry when the first article publishes.
  robots: { index: false, follow: true },
};

const outerPad    = "px-6 md:px-[60px]";
const inner       = "max-w-[900px] mx-auto";
const innerWide   = "max-w-[1100px] mx-auto";
const innerNarrow = "max-w-[720px] mx-auto";

// Articles are sourced from Sanity (see lib/insights/getInsights.ts).
// New posts are added by the bi-weekly insights bot; editors can also publish
// from the Studio at /studio.

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        display:         "inline-block",
        fontFamily:      "var(--font-body)",
        fontSize:        "var(--text-label)",
        fontWeight:      500,
        letterSpacing:   "var(--tracking-eyebrow)",
        textTransform:   "uppercase" as const,
        color:           "var(--color-cyan)",
        backgroundColor: "var(--color-cyan-light)",
        padding:         "3px 10px",
        borderRadius:    "3px",
      }}
    >
      {label}
    </span>
  );
}

function ArticleCard({
  article,
}: {
  article: InsightListItem;
}) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block card-lift"
      style={{
        border:          "1px solid var(--color-border-card)",
        borderRadius:    "8px",
        overflow:        "hidden",
      }}
    >
      {/* Image */}
      <div style={{ aspectRatio: "16/9", overflow: "hidden", backgroundColor: "var(--color-bg-navy-deep)" }}>
        <Image
          src={article.image}
          alt={article.title}
          width={600}
          height={338}
          style={{
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            transition: "transform 0.4s ease",
          }}
          className="group-hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem" }}>
        <div style={{ marginBottom: "0.75rem" }}>
          <CategoryBadge label={article.category} />
        </div>

        <h3
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "var(--text-h3-serif)",
            fontWeight:    600,
            color:         "var(--color-navy)",
            lineHeight:    "var(--leading-subheading)",
            letterSpacing: "var(--tracking-tight)",
            marginBottom:  "var(--space-para)",
            border:        "none",
            padding:       0,
            transition:    "color 0.2s ease",
          }}
          className="group-hover:text-[var(--color-cyan)]"
        >
          {article.title}
        </h3>

        <p
          style={{
            fontFamily:   "var(--font-body)",
            fontSize:     "var(--text-body-sm)",
            fontWeight:   300,
            color:        "var(--color-ink-secondary)",
            lineHeight:   "var(--leading-body)",
            marginBottom: "1rem",
          }}
        >
          {article.excerpt}
        </p>

        <p
          style={{
            fontFamily:    "var(--font-body)",
            fontSize:      "var(--text-meta)",
            fontWeight:    400,
            color:         "var(--color-ink-tertiary)",
            letterSpacing: "0.04em",
            margin:        0,
          }}
        >
          {article.date}
        </p>
      </div>
    </Link>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function InsightsPage() {
  const articles = await getInsightList();
  const featured = articles[0];
  const grid     = featured ? articles.slice(1) : [];
  const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative min-h-[50vh] flex items-center ${outerPad} pt-48 pb-32`}
        style={{ backgroundColor: "var(--color-bg-navy)" }}
      >
        <BGPattern variant="grid" mask="none" size={40} fill="rgba(61, 184, 198, 0.12)" className="z-0" />
        <div
          aria-hidden="true"
          style={{
            position:     "absolute",
            top:          "-120px",
            right:        "-120px",
            width:        "480px",
            height:       "480px",
            borderRadius: "50%",
            border:       "1px solid rgba(61,184,198,0.15)",
            pointerEvents: "none",
          }}
        />
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <span className="label-eyebrow">Insights</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split">
              <span className="maru-headline-split-strong">Practical AI thinking</span>
              <br />
              <span className="maru-headline-split-light">for growing SMEs.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p
              className="font-body font-light text-lg max-w-[560px]"
              style={{
                color:         "var(--color-ink-inverted-muted)",
                marginBottom:  0,
                lineHeight:    "var(--leading-body)",
              }}
            >
              No hype. Just practical strategies from real-world success, tailored for SMEs.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FEATURED ARTICLE
          ════════════════════════════════════════════════════════════════════ */}
      {featured && (
      <section
        className={`${outerPad} py-16`}
        style={{ background: "var(--gradient-surface)" }}
      >
        <div className={inner}>
          <FadeUp>
            <p
              style={{
                fontFamily:    "var(--font-body)",
                fontSize:      "var(--text-label)",
                fontWeight:    500,
                letterSpacing: "var(--tracking-eyebrow)",
                textTransform: "uppercase",
                color:         "var(--color-ink-tertiary)",
                marginBottom:  "1.25rem",
              }}
            >
              Featured
            </p>

            <Link
              href={`/insights/${featured.slug}`}
              className="group grid grid-cols-1 md:grid-cols-2 gap-0 card-lift"
              style={{
                borderRadius:    "8px",
                overflow:        "hidden",
              }}
            >
              {/* Image */}
              <div
                style={{
                  aspectRatio:     "4/3",
                  overflow:        "hidden",
                  backgroundColor: "var(--color-bg-navy-deep)",
                }}
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  width={720}
                  height={540}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  className="group-hover:scale-[1.03]"
                />
              </div>

              {/* Content */}
              <div
                style={{
                  padding:        "2.5rem",
                  display:        "flex",
                  flexDirection:  "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <CategoryBadge label={featured.category} />
                </div>

                <h2
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontSize:      "1.625rem",
                    fontWeight:    600,
                    color:         "var(--color-navy)",
                    lineHeight:    "var(--leading-subheading)",
                    letterSpacing: "var(--tracking-tight)",
                    marginBottom:  "1rem",
                    border:        "none",
                    padding:       0,
                    transition:    "color 0.2s ease",
                  }}
                  className="group-hover:text-[var(--color-cyan)]"
                >
                  {featured.title}
                </h2>

                <p
                  style={{
                    fontFamily:   "var(--font-body)",
                    fontSize:     "var(--text-body)",
                    fontWeight:   300,
                    color:        "var(--color-ink-secondary)",
                    lineHeight:   "var(--leading-body)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {featured.excerpt}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p
                    style={{
                      fontFamily:    "var(--font-body)",
                      fontSize:      "var(--text-meta)",
                      fontWeight:    400,
                      color:         "var(--color-ink-tertiary)",
                      letterSpacing: "0.04em",
                      margin:        0,
                    }}
                  >
                    {featured.date}
                  </p>
                  <span
                    style={{
                      fontFamily:    "var(--font-body)",
                      fontSize:      "var(--text-label)",
                      fontWeight:    500,
                      letterSpacing: "var(--tracking-label)",
                      textTransform: "uppercase",
                      color:         "var(--color-cyan)",
                      transition:    "color 0.2s ease",
                    }}
                  >
                    Read article →
                  </span>
                </div>
              </div>
            </Link>
          </FadeUp>
        </div>
      </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          ARTICLE GRID
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-primary)" }}
      >
        <div className={inner}>
          <FadeUp>
            <h2>
              <span style={{ fontWeight: 300 }}>All</span>
              <br />
              <span style={{ fontWeight: 700 }}>articles</span>
            </h2>

            {/* Category filter row */}
            <div
              style={{
                display:       "flex",
                flexWrap:      "wrap",
                gap:           "0.5rem",
                marginBottom:  "var(--space-section-header-mb)",
              }}
            >
              {categories.map((cat) => (
                <span
                  key={cat}
                  style={{
                    fontFamily:      "var(--font-body)",
                    fontSize:        "var(--text-label)",
                    fontWeight:      cat === "All" ? 600 : 400,
                    letterSpacing:   "var(--tracking-label)",
                    textTransform:   "uppercase",
                    color:           cat === "All" ? "var(--color-bg-primary)" : "var(--color-ink-secondary)",
                    backgroundColor: cat === "All" ? "var(--color-navy)" : "transparent",
                    border:          `1px solid ${cat === "All" ? "var(--color-navy)" : "var(--color-border-default)"}`,
                    borderRadius:    "4px",
                    padding:         "4px 12px",
                    cursor:          "default",
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </FadeUp>

          {/* Grid */}
          {articles.length === 0 ? (
            <p className="body-muted">New insights are on the way — check back soon.</p>
          ) : (
            <StaggerParent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grid.map((article) => (
                <StaggerChild key={article.slug}>
                  <ArticleCard article={article} />
                </StaggerChild>
              ))}
            </StaggerParent>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          THE MARU BRIEF — email capture
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ background: "var(--gradient-surface)" }}
      >
        <div className={innerNarrow}>
          <div className="card-lift p-8 md:p-12">
            <FadeUp>
              <span className="label-eyebrow-ochre">Monthly Best Practices for AI Integration</span>
              <h2 style={{ border: "none" }}>
                <span style={{ fontWeight: 300 }}>The Business </span><span style={{ fontWeight: 700 }}>AI Journal</span>
              </h2>
              <p className="body-muted" style={{ marginBottom: "var(--space-para-section)" }}>
                Unlock practical strategies to optimize your AI integration. Each
                month, we deliver actionable insights from real-world
                engagements—covering common pitfalls, effective fixes, and proven
                frameworks. Written in plain language for business owners.
              </p>

              <hr className="rule" style={{ marginBottom: "var(--space-para-section)" }} />
            </FadeUp>

            <FadeUp delay={0.08}>
              <MaruBriefForm />
            </FadeUp>
          </div>
        </div>
      </section>

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
            position:      "absolute",
            bottom:        "-80px",
            left:          "-80px",
            width:         "320px",
            height:        "320px",
            borderRadius:  "50%",
            border:        "1px solid rgba(61,184,198,0.12)",
            pointerEvents: "none",
          }}
        />
        <div className={innerNarrow}>
          <FadeUp>
            <span className="label-eyebrow">Ready to act on it?</span>
            <h2
              style={{
                color:         "var(--color-ink-inverted)",
                border:        "none",
                padding:       0,
                marginBottom:  "var(--space-heading-body)",
              }}
            >
              <span style={{ fontWeight: 300 }}>Reading about integration gaps is one thing.</span>
              <br />
              <span style={{ fontWeight: 700 }}>Finding yours is another.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="body-on-navy" style={{ marginBottom: "var(--space-para-section)" }}>
              The free assessment shows you where the gaps are, in about fifteen
              minutes. The Operations Diagnostic goes further — your tools, your
              workflows, your revenue gaps, written up within 48 hours. R4,500.
            </p>
            <hr
              className="rule"
              style={{ background: "rgba(250,250,248,0.15)", marginBottom: "var(--space-para-section)" }}
            />
          </FadeUp>
          <FadeUp delay={0.14}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button href="/popia-ai-check" variant="primary">
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
