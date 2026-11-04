import Link from "next/link";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Animate";
import {
  SECTIONS,
  getRelated,
  isPublished,
  type ContentEntry,
} from "@/lib/insights-resources/content";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/insights-resources/jsonld";
import { InsightCard, ResourceCard } from "./Cards";
import { ArticleMeta, ArticleImage, ArticleContent, servicesFor } from "./Article";

/**
 * Reusable template for one article or guide (brief section 5): breadcrumb,
 * category, H1, summary, author, dates, featured image, "in short" box, body
 * (H2/H3), sources, related content, links to services and a contextual CTA.
 * Short news analysis and long guides use the same template.
 */

const outerPad = "px-6 md:px-[60px]";
const innerWide = "max-w-[1100px] mx-auto";
const innerText = "max-w-[720px] mx-auto";



export default function ContentPage({ entry }: { entry: ContentEntry }) {
  const section = SECTIONS[entry.section];
  const related = getRelated(entry);
  const services = servicesFor(entry);
  const live = isPublished(entry);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(entry)) }} />
      {/* Drafts carry no Article markup; it is added the moment an entry is published. */}
      {live && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(entry)) }} />
      )}

      <header className={`navy-horizon ${outerPad} pt-40 md:pt-44 pb-16`}>
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

          <ArticleMeta entry={entry} tone="navy" />
        </div>
      </header>

      <article className={`${outerPad} py-16`} style={{ background: "var(--color-bg-secondary)" }}>
        <div className={innerWide}>
          <FadeUp>
            <ArticleImage entry={entry} sizes="(min-width: 1160px) 1100px, 100vw" priority />
          </FadeUp>
        </div>

        <div className={innerText} style={{ marginTop: "3rem" }}>
          <ArticleContent entry={entry} />
        </div>
      </article>

      <section className={`${outerPad} py-16`} style={{ backgroundColor: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border-card)" }}>
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
            <Button href="/contact#contact-form" variant="primary">Discuss your business challenge</Button>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className={`${outerPad} py-20`} style={{ background: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border-card)" }}>
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
