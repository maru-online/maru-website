import type { Metadata } from "next";
import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Animate";
import { getInsightList } from "@/lib/insights/getInsights";
import { GUIDE_PAGE_VISIBLE, GUIDE_PATH } from "@/lib/guides/config";
import { seo } from "@/lib/seo";
import TopicFilter from "./TopicFilter";

/**
 * /insights — the hub for everything we publish (20 Oct 2026).
 *
 * One page, two jobs: the free guide sits at the top as the featured item,
 * articles sit below with a topic filter (AI in business / POPIA). Articles
 * come from Sanity (lib/insights/getInsights.ts); the bi-weekly writer is
 * paused (INSIGHTS_CRON_ENABLED), so nothing appears here unreviewed.
 *
 * Indexing follows the content: noindex while there are no articles, so an
 * empty section is never advertised. The sitemap entry is restored by hand
 * when the first article publishes.
 */

export async function generateMetadata(): Promise<Metadata> {
  const articles = await getInsightList();
  return {
    ...seo("/insights"),
    title: "Insights: AI and POPIA for South African Businesses | Maru Online",
    description:
      "Plain-language articles on using AI in a South African business and what POPIA expects of you, plus a free guide.",
    ...(articles.length === 0 ? { robots: { index: false, follow: true } } : {}),
  };
}

const outerPad = "px-6 md:px-[60px]";
const innerWide = "max-w-[1100px] mx-auto";
const innerNarrow = "max-w-[720px] mx-auto";

/** Same five lines as the guide page's "What's inside" (entry 19 §2). */
const GUIDE_CONTENTS = [
  "AI in your business",
  "Where client information goes",
  "Who can see it",
  "Permission and trust",
  "If something goes wrong",
];

export default async function InsightsPage() {
  const articles = await getInsightList();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className={`relative overflow-hidden flex items-center ${outerPad} pt-48 pb-24`}
        style={{ backgroundColor: "var(--color-bg-navy)" }}
      >
        <BGPattern variant="grid" mask="none" size={40} fill="rgba(61, 184, 198, 0.12)" className="z-0" />
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <span className="label-eyebrow">Insights</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split">
              <span className="maru-headline-split-strong">AI and POPIA,</span>
              <br />
              <span className="maru-headline-split-light">in plain language.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="body-on-navy max-w-[600px]" style={{ marginBottom: 0 }}>
              Articles on using AI in a South African business and what POPIA expects of you, written for owners
              and managers rather than lawyers or engineers.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Featured: the guide ──────────────────────────────────────────── */}
      {GUIDE_PAGE_VISIBLE && (
        <section className={`${outerPad} pt-16 pb-4`} style={{ background: "var(--gradient-surface)" }}>
          <div className={innerWide}>
            <FadeUp>
              <div
                className="relative overflow-hidden rounded-2xl grid grid-cols-1 md:grid-cols-[1.15fr_1fr]"
                style={{
                  backgroundColor: "var(--color-bg-navy-deep)",
                  boxShadow:
                    "0 1px 2px rgba(13,27,42,0.08), 0 12px 32px -12px rgba(13,27,42,0.35), 0 32px 64px -32px rgba(61,184,198,0.25)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute pointer-events-none"
                  style={{
                    inset: 0,
                    background:
                      "radial-gradient(60% 80% at 100% 0%, rgba(61,184,198,0.18), transparent 60%), radial-gradient(50% 60% at 0% 100%, rgba(61,184,198,0.08), transparent 70%)",
                  }}
                />
                <div className="relative p-8 md:p-12">
                  <span className="label-eyebrow" style={{ marginBottom: "1.25rem" }}>
                    Free guide
                  </span>
                  <h2
                    style={{
                      color: "var(--color-ink-inverted)",
                      border: "none",
                      padding: 0,
                      marginBottom: "var(--space-heading-body)",
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>AI and POPIA:</span>{" "}
                    <span style={{ fontWeight: 300 }}>a guide for South African business owners</span>
                  </h2>
                  <p className="body-on-navy" style={{ marginBottom: "var(--space-para-section)" }}>
                    What your team&apos;s AI tools do with client information, and what POPIA expects of you. 16
                    pages, about ten minutes to read, with a one-page self-check at the end.
                  </p>
                  <Button href={GUIDE_PATH} variant="primary">
                    Get the free guide
                  </Button>
                </div>

                <div
                  className="relative p-8 md:p-12 md:border-l"
                  style={{ borderColor: "rgba(250,250,248,0.1)" }}
                >
                  <p
                    className="text-xs uppercase mb-6"
                    style={{ color: "var(--color-ink-inverted-muted)", letterSpacing: "var(--tracking-eyebrow)" }}
                  >
                    Inside
                  </p>
                  <ol className="list-none m-0 p-0">
                    {GUIDE_CONTENTS.map((line, i) => (
                      <li
                        key={line}
                        className="flex items-baseline gap-5 py-3"
                        style={{ borderTop: i === 0 ? "none" : "1px solid rgba(250,250,248,0.08)" }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--color-cyan)",
                            fontSize: "1.125rem",
                            minWidth: "1.75rem",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span style={{ color: "var(--color-ink-inverted)", fontSize: "var(--text-body)" }}>{line}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ── Articles ─────────────────────────────────────────────────────── */}
      <section className={`${outerPad} py-24`} style={{ background: "var(--gradient-surface)" }}>
        <div className={innerWide}>
          <FadeUp>
            <h2 style={{ marginBottom: "1.5rem" }}>
              {/* "Latest articles" once there are enough articles for "latest" to mean something. */}
              Articles
            </h2>
          </FadeUp>
          <TopicFilter articles={articles} />
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section className={`relative overflow-hidden ${outerPad} py-24`} style={{ backgroundColor: "var(--color-bg-navy)" }}>
        <div className={innerNarrow}>
          <FadeUp>
            <span className="label-eyebrow">Ready to act on it?</span>
            <h2
              style={{
                color: "var(--color-ink-inverted)",
                border: "none",
                padding: 0,
                marginBottom: "var(--space-heading-body)",
              }}
            >
              <span style={{ fontWeight: 300 }}>Reading about POPIA is one thing.</span>
              <br />
              <span style={{ fontWeight: 700 }}>Checking your own systems is another.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="body-on-navy" style={{ marginBottom: "var(--space-para-section)" }}>
              The free POPIA Assessment shows where your business stands. The report arrives by email.
            </p>
          </FadeUp>
          <FadeUp delay={0.14}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button href="/popia-ai-check" variant="primary">
                Take Your Free POPIA Assessment
              </Button>
              <Link
                href="/contact#contact-form"
                className="text-sm underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] rounded-sm active:opacity-70"
                style={{ color: "var(--color-ink-inverted)" }}
              >
                Or talk to us
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
