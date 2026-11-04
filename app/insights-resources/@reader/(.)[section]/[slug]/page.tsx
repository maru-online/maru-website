import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import ReaderPanel from "@/components/insights-resources/ReaderPanel";
import {
  ArticleContent,
  ArticleImage,
  ArticleMeta,
  servicesFor,
} from "@/components/insights-resources/Article";
import {
  SECTIONS,
  entryHref,
  getEntry,
  getRelated,
  sectionFromSegment,
} from "@/lib/insights-resources/content";

// The intercepted version of /insights-resources/[section]/[slug]: the same
// article, read in a panel over the page it was opened from.
export default async function ReaderArticle(props: { params: Promise<{ section: string; slug: string }> }) {
  const { section, slug } = await props.params;
  const key = sectionFromSegment(section);
  const entry = key ? getEntry(key, slug) : undefined;
  if (!entry || entry.href) notFound();

  const titleId = `reader-title-${entry.slug}`;
  const services = servicesFor(entry);
  const related = getRelated(entry);

  return (
    <ReaderPanel titleId={titleId} sectionLabel={SECTIONS[entry.section].label} fullPageHref={entryHref(entry)}>
      <article className="reader-measure">
        <ArticleMeta entry={entry} tone="light" titleId={titleId} headingLevel="h2" />
        <div style={{ marginBlock: "2.5rem" }}>
          <ArticleImage entry={entry} sizes="(min-width: 900px) 680px, 100vw" />
        </div>
        <ArticleContent entry={entry} />
      </article>

      <div className="reader-measure reader-end">
        {services.length > 0 && (
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="label-eyebrow label-eyebrow-ink" style={{ marginBottom: "1rem" }}>Related at Maru Online</span>
            <ul className="list-none m-0 p-0">
              {services.map((s) => (
                <li key={s.href} style={{ marginBottom: "0.5rem" }}>
                  <a href={s.href} className="font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:no-underline" style={{ color: "var(--color-cyan-ink)" }}>
                    {s.label}
                  </a>
                  <span className="body-muted"> — {s.note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <h3 className="card-title" style={{ marginBottom: "0.5rem" }}>Have an AI challenge in your business?</h3>
        <p className="body-muted" style={{ marginBottom: "1.5rem" }}>
          Understand where AI could make a practical difference to your business operations.
        </p>
        {/* Leaves the reader for the contact page, so a full load is right here. */}
        <Button href="/contact#contact-form" variant="primary">Discuss your business challenge</Button>

        {related.length > 0 && (
          <nav aria-label="Related reading" style={{ marginTop: "3rem" }}>
            <span className="label-eyebrow label-eyebrow-ink" style={{ marginBottom: "1rem" }}>Related reading</span>
            <ul className="rows list-none m-0 p-0">
              {related.map((r) => (
                <li key={r.slug} style={{ paddingBlock: "1rem" }}>
                  <Link
                    href={r.href ?? entryHref(r)}
                    scroll={r.href ? undefined : false}
                    className="group flex items-start justify-between gap-4 focus-visible:outline-none"
                  >
                    <span>
                      <span className="card-label" style={{ display: "block", marginBottom: "0.35rem" }}>{SECTIONS[r.section].label}</span>
                      <span className="card-title group-hover:text-[var(--color-cyan-ink)] group-focus-visible:underline" style={{ marginBottom: 0 }}>{r.title}</span>
                    </span>
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" style={{ color: "var(--color-cyan-ink)", marginTop: "1.6rem" }}>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </ReaderPanel>
  );
}
