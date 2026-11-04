import {
  SECTIONS,
  formatDate,
  isPublished,
  pillarFor,
  type ContentEntry,
} from "@/lib/insights-resources/content";
import Body from "./Body";
import { TreatedImage, PillarVisual } from "./Cards";

/**
 * The parts of an article or guide shared by the full page (ContentPage) and
 * the reading panel (ReaderPanel), so both always show the same content.
 */

export const smallCaps: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-label)",
  fontWeight: 600,
  letterSpacing: "var(--tracking-eyebrow)",
  textTransform: "uppercase",
};

/** Eyebrow, title, summary and byline. `tone` follows the ground it sits on. */
export function ArticleMeta({
  entry,
  tone,
  titleId,
  headingLevel = "h1",
}: {
  entry: ContentEntry;
  tone: "navy" | "light";
  titleId?: string;
  headingLevel?: "h1" | "h2";
}) {
  const pillar = pillarFor(entry.pillar);
  const published = formatDate(entry.publishedAt);
  const updated = formatDate(entry.updatedAt);
  const live = isPublished(entry);
  const navy = tone === "navy";
  const Heading = headingLevel;
  const muted = navy ? "var(--color-ink-inverted-muted)" : "var(--color-ink-tertiary)";

  return (
    <>
      <span className={navy ? "label-eyebrow" : "label-eyebrow label-eyebrow-ink"} style={{ marginBottom: "1.25rem" }}>
        {entry.format ?? entry.resourceType} · {entry.category === pillar.label ? entry.category : `${entry.category} · ${pillar.label}`}
      </span>
      <Heading
        id={titleId}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: navy ? "clamp(2rem, 4.2vw, 3rem)" : "clamp(1.75rem, 3.4vw, 2.5rem)",
          color: navy ? "var(--color-ink-inverted)" : "var(--color-ink-primary)",
          letterSpacing: "-0.03em",
          lineHeight: 1.12,
          marginBottom: "1.25rem",
          border: "none",
          padding: 0,
          textWrap: "balance",
        }}
      >
        {entry.title}
      </Heading>
      <p className={navy ? "body-on-navy" : "body-muted"} style={{ marginBottom: "1.5rem" }}>{entry.summary}</p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2" style={{ fontSize: "var(--text-meta)", color: muted }}>
        {entry.author && <span>By {entry.author}</span>}
        {published && <time dateTime={entry.publishedAt}>{live ? "Published" : "Written"} {published}</time>}
        {updated && <time dateTime={entry.updatedAt}>Updated {updated}</time>}
        {entry.readTime && <span>{entry.readTime}</span>}
        {!live && (
          <span
            style={{
              ...smallCaps,
              border: `1px dashed ${navy ? "rgba(250,250,248,0.45)" : "var(--color-border-strong)"}`,
              borderRadius: 4,
              padding: "2px 8px",
            }}
          >
            Draft: for review
          </span>
        )}
      </div>
    </>
  );
}

/** Lead image, or the pillar visual when an entry has none. */
export function ArticleImage({ entry, sizes, priority = false }: { entry: ContentEntry; sizes: string; priority?: boolean }) {
  return (
    <>
      {entry.image ? (
        <TreatedImage
          src={entry.image}
          alt={entry.imageAlt ?? ""}
          sizes={sizes}
          priority={priority}
          className="ir-hero-img w-full rounded-2xl"
        />
      ) : (
        <PillarVisual entry={entry} glyphSize={56} className="ir-hero-img rounded-2xl w-full" />
      )}
      {/* The treated image needs a height: give the box one via aspect ratio. */}
      <style>{`.ir-hero-img{aspect-ratio:16/7}`}</style>
    </>
  );
}

/** "In short", the body, the legal note and sources. */
export function ArticleContent({ entry }: { entry: ContentEntry }) {
  return (
    <>
      {entry.inShort && entry.inShort.length > 0 && (
        <section
          aria-label="In short"
          style={{
            marginBottom: "2.5rem",
            padding: "1.5rem",
            borderRadius: 12,
            border: "1px solid var(--card-edge)",
            background: "var(--color-bg-card)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <p style={{ ...smallCaps, color: "var(--color-cyan-ink)", marginBottom: "0.75rem" }}>In short</p>
          <ul className="m-0 p-0 list-none">
            {entry.inShort.map((t) => (
              <li key={t} className="flex gap-3 items-start" style={{ marginBottom: "0.6rem", lineHeight: 1.65, color: "var(--color-ink-primary)" }}>
                <span className="bullet-cyan" style={{ marginTop: 10 }} aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {entry.body && <Body blocks={entry.body} />}

      {entry.legalNote && (
        <p style={{ marginTop: "2.5rem", fontSize: "var(--text-meta)", lineHeight: 1.6, color: "var(--color-ink-tertiary)" }}>
          This is general information, not legal advice. For a decision about specific people or a specific contract, speak to a qualified adviser.
        </p>
      )}

      {entry.sources && entry.sources.length > 0 && (
        <section aria-label="Sources" style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--color-border-card)" }}>
          <p style={{ ...smallCaps, color: "var(--color-ink-tertiary)", marginBottom: "0.75rem" }}>Sources</p>
          <ul className="m-0 p-0 list-none" style={{ fontSize: "var(--text-meta)", lineHeight: 1.7, color: "var(--color-ink-secondary)" }}>
            {entry.sources.map((s) => (
              <li key={s.title} style={{ marginBottom: "0.4rem" }}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--color-cyan-ink)] focus-visible:outline-none focus-visible:text-[var(--color-cyan-ink)]">
                    {s.title}
                  </a>
                ) : (
                  s.title
                )}
                {`, ${s.publisher}${s.date ? `, ${s.date}` : ""}`}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

/** Internal links to services, by pillar. Only pages that exist, saying something true. */
export function servicesFor(entry: ContentEntry): { href: string; label: string; note: string }[] {
  if (entry.pillar === "popia-data-governance") {
    return [
      {
        href: "/popia-ai-check",
        label: "Free, informational POPIA review",
        note: "See where your business stands on data protection when AI is involved.",
      },
    ];
  }
  return [];
}

export const sectionLabel = (entry: ContentEntry) => SECTIONS[entry.section].label;
