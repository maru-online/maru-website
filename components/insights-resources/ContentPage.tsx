import Link from "next/link";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Animate";
import {
  SECTIONS,
  entryHref,
  formatDate,
  getRelated,
  pillarFor,
  type ContentEntry,
} from "@/lib/insights-resources/content";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/insights-resources/jsonld";
import { InsightCard, PillarVisual, ResourceCard } from "./Cards";

/**
 * Reusable template for one article or guide (brief section 5).
 *
 * Supports: breadcrumb, category, H1, summary, author, original and updated
 * dates, featured image, body (children, H2/H3), related content, internal
 * links to Maru Online services, and a contextual CTA. Short news analysis and
 * long guides use the same template; only the body differs.
 *
 * The body is passed as children so it can come from MDX, a CMS renderer or
 * hand-written JSX later. Nothing here writes article copy.
 */

const outerPad = "px-6 md:px-[60px]";
const innerWide = "max-w-[1100px] mx-auto";
const innerText = "max-w-[720px] mx-auto";

/** Internal links to services, by pillar. Only pages that exist and say something true. */
function servicesFor(entry: ContentEntry): { href: string; label: string; note: string }[] {
  if (entry.pillar === "popia-data-governance") {
    return [
      {
        href: "/popia-ai-check",
        label: "Free POPIA Assessment",
        note: "See where your business stands on data protection when AI is involved.",
      },
    ];
  }
  return [];
}

export default function ContentPage({
  entry,
  children,
}: {
  entry: ContentEntry;
  children: React.ReactNode;
}) {
  const section = SECTIONS[entry.section];
  const pillar = pillarFor(entry.pillar);
  const related = getRelated(entry);
  const services = servicesFor(entry);
  const published = formatDate(entry.publishedAt);
  const updated = formatDate(entry.updatedAt);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(entry)) }}
      />
      {/* Placeholders carry no Article markup: nothing real to describe. */}
      {!entry.placeholder && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(entry)) }}
        />
      )}

      {/* Header */}
      <header
        className={`${outerPad} pt-40 md:pt-44 pb-16`}
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className={innerText}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
            <ol className="flex flex-wrap items-center gap-2 list-none m-0 p-0" style={{ fontSize: "var(--text-meta)", color: "var(--color-ink-inverted-muted)" }}>
              <li><Link href="/" className="hover:underline focus-visible:underline focus-visible:outline-none">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/insights-resources" className="hover:underline focus-visible:underline focus-visible:outline-none">Insights &amp; Resources</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/insights-resources/${section.segment}`} className="hover:underline focus-visible:underline focus-visible:outline-none">{section.label}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="truncate max-w-[16rem]">{entry.title}</li>
            </ol>
          </nav>

          <span className="label-eyebrow" style={{ marginBottom: "1.25rem" }}>
            {entry.category === pillar.label ? entry.category : `${entry.category} · ${pillar.label}`}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              color: "var(--color-ink-inverted)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            {entry.title}
          </h1>
          <p className="body-on-navy" style={{ marginBottom: "2rem" }}>{entry.summary}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2" style={{ fontSize: "var(--text-meta)", color: "var(--color-ink-inverted-muted)" }}>
            {entry.author && <span>By {entry.author}</span>}
            {published && <time dateTime={entry.publishedAt}>Published {published}</time>}
            {updated && <time dateTime={entry.updatedAt}>Updated {updated}</time>}
            {entry.placeholder && (
              <span style={{ border: "1px dashed rgba(250,250,248,0.45)", borderRadius: 4, padding: "2px 8px", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", fontSize: "var(--text-label)", fontWeight: 600 }}>
                Placeholder: template preview
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Featured image + body */}
      <article className={`${outerPad} py-16`} style={{ background: "var(--gradient-surface)" }}>
        <div className={innerWide}>
          <FadeUp>
            {entry.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={entry.image} alt="" className="w-full rounded-2xl object-cover" style={{ aspectRatio: "16 / 7", marginBottom: "3rem" }} />
            ) : (
              <PillarVisual entry={entry} glyphSize={56} className="rounded-2xl w-full h-48 md:h-72" />
            )}
          </FadeUp>
        </div>
        <div className={innerText} style={{ marginTop: "3rem" }}>
          {children}
        </div>
      </article>

      {/* Services + contextual CTA */}
      <section className={`${outerPad} py-16`} style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        <div className={innerText}>
          {services.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <span className="label-eyebrow" style={{ marginBottom: "1rem" }}>Related at Maru Online</span>
              <ul className="list-none m-0 p-0">
                {services.map((s) => (
                  <li key={s.href} style={{ marginBottom: "0.5rem" }}>
                    <Link href={s.href} className="font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:no-underline" style={{ color: "var(--color-cyan-ink)" }}>
                      {s.label}
                    </Link>
                    <span className="body-muted"> — {s.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h2 style={{ border: "none", fontWeight: 700, marginBottom: "0.75rem" }}>Have an AI challenge in your business?</h2>
          <p className="body-muted" style={{ marginBottom: "1.5rem" }}>
            Understand where AI could make a practical difference to your business operations.
          </p>
          <div data-maru-primary-cta>
            <Button href="/contact#contact-form" variant="primary">Discuss a Business Challenge</Button>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className={`${outerPad} py-20`} style={{ background: "var(--gradient-surface)" }}>
          <div className={innerWide}>
            <h2 style={{ border: "none", fontWeight: 700, marginBottom: "2rem" }}>Related reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <div key={r.slug} className="flex">
                  {r.section === "insights" ? (
                    <div className="flex w-full rounded-xl" style={{ backgroundColor: "var(--color-bg-navy-deep)" }}>
                      <InsightCard entry={r} />
                    </div>
                  ) : (
                    <ResourceCard entry={r} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
