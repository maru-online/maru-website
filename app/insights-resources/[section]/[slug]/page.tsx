import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { seo } from "@/lib/seo";
import {
  SECTIONS,
  entryHref,
  getEntries,
  getEntry,
  sectionFromSegment,
} from "@/lib/insights-resources/content";
import ContentPage from "@/components/insights-resources/ContentPage";

// One URL per article or guide. Entries come from lib/insights-resources/content.ts.
// With no real entries (production today) there are no params, so every URL
// under here is a 404. Placeholder entries render on previews only, noindex,
// so the template can be reviewed without any article existing.

export const dynamicParams = false;

export function generateStaticParams() {
  return getEntries().map((e) => ({ section: SECTIONS[e.section].segment, slug: e.slug }));
}

async function load(params: Promise<{ section: string; slug: string }>) {
  const { section, slug } = await params;
  const key = sectionFromSegment(section);
  return key ? getEntry(key, slug) : undefined;
}

export async function generateMetadata(props: { params: Promise<{ section: string; slug: string }> }): Promise<Metadata> {
  const entry = await load(props.params);
  if (!entry) return {};
  return {
    ...seo(entryHref(entry)),
    title: `${entry.seoTitle ?? entry.title} | Maru Online`,
    description: entry.seoDescription ?? entry.summary,
    robots: entry.placeholder ? { index: false, follow: false } : undefined,
  };
}

export default async function ContentEntryPage(props: { params: Promise<{ section: string; slug: string }> }) {
  const entry = await load(props.params);
  if (!entry) notFound();

  return (
    <ContentPage entry={entry}>
      {entry.placeholder ? (
        <div className="article-prose">
          {/* Shows the heading hierarchy the real body will use. Not article copy. */}
          <p className="body-muted">Placeholder body. The article or guide text renders here.</p>
          <h2 style={{ border: "none", marginTop: "2.5rem", fontSize: "var(--text-h2, 1.75rem)", fontWeight: 700 }}>Placeholder H2 section heading</h2>
          <p className="body-muted">Placeholder paragraph.</p>
          <h3 style={{ marginTop: "2rem", fontSize: "var(--text-h3-sans)", fontWeight: 600 }}>Placeholder H3 subheading</h3>
          <p className="body-muted">Placeholder paragraph. Images, diagrams and embedded media sit between blocks like this one.</p>
        </div>
      ) : null}
    </ContentPage>
  );
}
