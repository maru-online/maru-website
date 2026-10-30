import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BGPattern } from "@/components/ui/bg-pattern";
import { FadeUp } from "@/components/ui/Animate";
import { seo } from "@/lib/seo";
import {
  PILLARS,
  SECTIONS,
  getEntries,
  isPublished,
  sectionFromSegment,
  type PillarSlug,
} from "@/lib/insights-resources/content";
import { InsightCard, ResourceCard } from "@/components/insights-resources/Cards";

// Full listing for one offering: /insights-resources/ai-insights and
// /insights-resources/guides. Category (pillar) filter is plain links driven by
// ?pillar=, so every filtered view is a crawlable URL and needs no client JS.
// Pagination is deliberately absent until there are enough entries to need it.

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.values(SECTIONS).map((s) => ({ section: s.segment }));
}

export async function generateMetadata(props: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await props.params;
  const key = sectionFromSegment(section);
  if (!key) return {};
  const s = SECTIONS[key];
  const hasReal = getEntries(key).some(isPublished);
  return {
    ...seo(`/insights-resources/${s.segment}`),
    title: `${s.label} | Insights & Resources`,
    description:
      key === "insights"
        ? "AI developments, industry news and analysis, explained in business terms."
        : "Practical guides and resources to help businesses understand, plan and implement AI.",
    robots: hasReal ? undefined : { index: false, follow: false },
  };
}

const outerPad = "px-6 md:px-[60px]";
const innerWide = "max-w-[1100px] mx-auto";

export default async function SectionListingPage(props: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ pillar?: string }>;
}) {
  const { section } = await props.params;
  const { pillar } = await props.searchParams;
  const key = sectionFromSegment(section);
  if (!key) notFound();

  const s = SECTIONS[key];
  const active = PILLARS.find((p) => p.slug === pillar)?.slug as PillarSlug | undefined;
  const all = getEntries(key);
  const entries = active ? all.filter((e) => e.pillar === active) : all;
  const base = `/insights-resources/${s.segment}`;
  const dark = key === "insights";

  return (
    <>
      <section
        className={`relative overflow-hidden ${outerPad} pt-40 md:pt-44 pb-16`}
        style={{ background: "var(--gradient-hero)" }}
      >
        <BGPattern variant="grid" mask="fade-edges" size={40} fill="rgba(61, 184, 198, 0.101)" className="pointer-events-none" />
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem", fontSize: "var(--text-meta)", color: "var(--color-ink-inverted-muted)" }}>
              <Link href="/insights-resources" className="hover:underline focus-visible:underline focus-visible:outline-none">Insights &amp; Resources</Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">{s.label}</span>
            </nav>
            <h1 className="maru-headline-split" style={{ marginBottom: 0 }}>
              <span className="maru-headline-split-strong">{s.label}</span>
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className={`${outerPad} py-16`} style={{ background: dark ? "var(--color-bg-navy-deep)" : "var(--gradient-surface)" }}>
        <div className={innerWide}>
          <nav aria-label="Filter by category" className="flex flex-wrap gap-2" style={{ marginBottom: "2.5rem" }}>
            {[{ slug: undefined, label: "All" }, ...PILLARS].map((p) => {
              const on = p.slug === active;
              return (
                <Link
                  key={p.label}
                  href={p.slug ? `${base}?pillar=${p.slug}` : base}
                  aria-current={on ? "true" : undefined}
                  className="rounded-full px-4 py-2 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)]"
                  style={{
                    border: `1px solid ${dark ? "rgba(250,250,248,0.25)" : "var(--color-border-card)"}`,
                    background: on ? "var(--color-cyan)" : "transparent",
                    color: on ? "var(--color-ink-on-gold, #0D1B2A)" : dark ? "var(--color-ink-inverted)" : "var(--color-ink-secondary)",
                  }}
                >
                  {p.label}
                </Link>
              );
            })}
          </nav>

          {entries.length ? (
            <div className={`grid grid-cols-1 ${dark ? "md:grid-cols-3" : "sm:grid-cols-2"} gap-6`}>
              {entries.map((e) => (
                <div key={e.slug} className="flex">
                  {dark ? <InsightCard entry={e} /> : <ResourceCard entry={e} />}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: dark ? "var(--color-ink-inverted-muted)" : "var(--color-ink-secondary)" }}>
              Nothing here yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
