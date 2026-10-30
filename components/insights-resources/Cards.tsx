import Link from "next/link";
import Glyph from "@/components/ui/Glyph";
import {
  SECTIONS,
  entryHref,
  formatDate,
  pillarFor,
  type ContentEntry,
} from "@/lib/insights-resources/content";

/**
 * Cards for the Insights & Resources landing page.
 *
 * Three variants, one data shape (ContentEntry):
 *  - FeaturedCard  large, either offering
 *  - InsightCard   dark, dated, analytical  (AI Insights for Business)
 *  - ResourceCard  light, evergreen, practical (Resources & Best Practice)
 *
 * Each card has one real link; the rest of the card is clickable through a
 * stretched pseudo-element, so screen readers hear a single link per card.
 */

export function actionLabel(entry: ContentEntry): string {
  if (entry.section === "insights") return SECTIONS.insights.readLabel;
  const downloadable = entry.resourceType === "Checklist" || entry.resourceType === "Worksheet";
  return downloadable ? "Download" : SECTIONS.resources.readLabel;
}

const stretch =
  "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none";

function PlaceholderTag({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-label)",
        fontWeight: 600,
        letterSpacing: "var(--tracking-eyebrow)",
        textTransform: "uppercase",
        padding: "2px 8px",
        borderRadius: "4px",
        border: `1px dashed ${onDark ? "rgba(250,250,248,0.45)" : "var(--color-ink-tertiary)"}`,
        color: onDark ? "var(--color-ink-inverted-muted)" : "var(--color-ink-tertiary)",
      }}
    >
      Placeholder
    </span>
  );
}

/** The visual area when there is no photograph: layered gradients plus the pillar's glyph. */
export function PillarVisual({
  entry,
  className = "",
  glyphSize = 44,
}: {
  entry: ContentEntry;
  className?: string;
  glyphSize?: number;
}) {
  const pillar = pillarFor(entry.pillar);
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden grid place-items-center ${className}`}
      style={{
        background:
          "radial-gradient(70% 90% at 85% 0%, rgba(61,184,198,0.30), transparent 60%), radial-gradient(60% 70% at 0% 100%, rgba(61,184,198,0.12), transparent 70%), var(--gradient-hero)",
      }}
    >
      {/* Faint grid, same motif as the heroes */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,184,198,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(61,184,198,0.10) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
        }}
      />
      <span style={{ color: "var(--color-cyan)" }} className="relative">
        <Glyph name={pillar.glyph} size={glyphSize} />
      </span>
    </div>
  );
}

function Meta({ entry, onDark }: { entry: ContentEntry; onDark?: boolean }) {
  const date = formatDate(entry.updatedAt ?? entry.publishedAt);
  const label = entry.updatedAt ? "Updated" : "";
  const colour = onDark ? "var(--color-ink-inverted-muted)" : "var(--color-ink-tertiary)";
  if (!date && !entry.placeholder) return null;
  return (
    <div className="flex flex-wrap items-center gap-3" style={{ color: colour, fontSize: "var(--text-meta)" }}>
      {date && (
        <time dateTime={entry.updatedAt ?? entry.publishedAt}>
          {label} {date}
        </time>
      )}
      {entry.placeholder && <PlaceholderTag onDark={onDark} />}
    </div>
  );
}

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-label)",
  fontWeight: 600,
  letterSpacing: "var(--tracking-eyebrow)",
  textTransform: "uppercase",
};

// ─── Featured ────────────────────────────────────────────────────────────────

export function FeaturedCard({ entry }: { entry: ContentEntry }) {
  const kind = entry.section === "insights" ? entry.format ?? "Insight" : entry.resourceType ?? "Guide";
  return (
    <article
      className="card-lift group relative grid grid-cols-1 md:grid-cols-[1.1fr_1fr] overflow-hidden rounded-2xl border focus-within:ring-2 focus-within:ring-[var(--color-cyan)] focus-within:ring-offset-2"
    >
      {entry.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={entry.image} alt="" className="h-full w-full object-cover min-h-[220px]" />
      ) : (
        <PillarVisual entry={entry} glyphSize={64} className="min-h-[220px] md:min-h-[360px]" />
      )}
      <div className="p-8 md:p-12 flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-3" style={{ marginBottom: "1.25rem" }}>
          <span style={{ ...eyebrowStyle, color: "var(--color-cyan-ink)" }}>
            {kind} · {entry.category}
          </span>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h3-serif)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "var(--color-ink-primary)",
            marginBottom: "0.75rem",
            border: "none",
            padding: 0,
          }}
        >
          {entry.title}
        </h3>
        <p className="body-muted" style={{ marginBottom: "1.25rem" }}>{entry.summary}</p>
        <div style={{ marginBottom: "1.5rem" }}>
          <Meta entry={entry} />
        </div>
        <Link
          href={entryHref(entry)}
          className={`${stretch} relative inline-flex items-center gap-2 self-start font-semibold underline-offset-4 group-hover:underline`}
          style={{ color: "var(--color-cyan-ink)" }}
        >
          {actionLabel(entry)}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}

// ─── AI Insights: dark, dated, analytical ────────────────────────────────────

export function InsightCard({ entry }: { entry: ContentEntry }) {
  return (
    <article
      className="group relative flex flex-col rounded-xl p-7 transition-transform duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[var(--color-cyan)] focus-within:ring-offset-2 focus-within:ring-offset-[#16324F]"
      style={{
        background: "linear-gradient(180deg, rgba(250,250,248,0.07), rgba(250,250,248,0.03))",
        border: "1px solid rgba(250,250,248,0.12)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.12), 0 18px 40px -24px rgba(61,184,198,0.35)",
      }}
    >
      <div className="flex items-center justify-between gap-3" style={{ marginBottom: "1.25rem" }}>
        <span style={{ ...eyebrowStyle, color: "var(--color-cyan)" }}>{entry.category}</span>
        {entry.format && (
          <span
            style={{
              ...eyebrowStyle,
              color: "var(--color-ink-inverted-muted)",
              border: "1px solid rgba(250,250,248,0.22)",
              borderRadius: "999px",
              padding: "2px 10px",
            }}
          >
            {entry.format}
          </span>
        )}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h3-serif)",
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          color: "var(--color-ink-inverted)",
          marginBottom: "0.75rem",
          border: "none",
          padding: 0,
        }}
      >
        {entry.title}
      </h3>
      <p className="body-on-navy" style={{ marginBottom: "1.25rem", flexGrow: 1 }}>{entry.summary}</p>
      <div style={{ marginBottom: "1.25rem" }}>
        <Meta entry={entry} onDark />
      </div>
      <Link
        href={entryHref(entry)}
        className={`${stretch} relative inline-flex items-center gap-2 self-start font-semibold underline-offset-4 group-hover:underline`}
        style={{ color: "var(--color-cyan)" }}
      >
        {actionLabel(entry)}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </article>
  );
}

// ─── Resources: light, evergreen, practical ──────────────────────────────────

export function ResourceCard({ entry }: { entry: ContentEntry }) {
  const pillar = pillarFor(entry.pillar);
  return (
    <article className="card-lift group relative flex flex-col rounded-xl border p-7 focus-within:ring-2 focus-within:ring-[var(--color-cyan)] focus-within:ring-offset-2">
      <div className="flex items-start justify-between gap-3" style={{ marginBottom: "1.25rem" }}>
        <span className="glyph-chip">
          <Glyph name={pillar.glyph} size={22} />
        </span>
        <span style={{ ...eyebrowStyle, color: "var(--color-ink-tertiary)", paddingTop: "0.5rem" }}>
          {entry.resourceType ?? "Guide"}
        </span>
      </div>
      <span style={{ ...eyebrowStyle, color: "var(--color-cyan-ink)", marginBottom: "0.5rem", display: "block" }}>
        {entry.category}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: "var(--text-h3-sans)",
          lineHeight: 1.3,
          color: "var(--color-ink-primary)",
          marginBottom: "0.75rem",
          border: "none",
          padding: 0,
        }}
      >
        {entry.title}
      </h3>
      <p className="body-muted" style={{ marginBottom: "1.25rem", flexGrow: 1 }}>{entry.summary}</p>
      <div style={{ marginBottom: "1.25rem" }}>
        <Meta entry={entry} />
      </div>
      <Link
        href={entryHref(entry)}
        className={`${stretch} relative inline-flex items-center gap-2 self-start font-semibold underline-offset-4 group-hover:underline`}
        style={{ color: "var(--color-cyan-ink)" }}
      >
        {actionLabel(entry)}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </article>
  );
}
