import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { seo } from "@/lib/seo";
import {
  SECTIONS,
  entryHref,
  getEntries,
  getEntry,
  isPublished,
  sectionFromSegment,
} from "@/lib/insights-resources/content";
import ContentPage from "@/components/insights-resources/ContentPage";

// One URL per article or guide, from lib/insights-resources/entries. Drafts
// exist on previews only (see SHOW_DRAFTS); in production only published
// entries have params, so everything else under here is a 404. An entry with an
// `href` (the AI and POPIA guide) lives elsewhere and redirects there.

export const dynamicParams = false;

export function generateStaticParams() {
  return getEntries()
    .filter((e) => !e.href)
    .map((e) => ({ section: SECTIONS[e.section].segment, slug: e.slug }));
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
    robots: isPublished(entry) ? undefined : { index: false, follow: false },
  };
}

export default async function ContentEntryPage(props: { params: Promise<{ section: string; slug: string }> }) {
  const entry = await load(props.params);
  if (!entry) notFound();
  if (entry.href) redirect(entry.href);
  return <ContentPage entry={entry} />;
}
