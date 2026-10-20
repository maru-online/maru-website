"use client";

/**
 * Topic filter + article grid for the Insights hub. Filtering happens in the
 * browser so the hub stays cached (no searchParams on the server). The chosen
 * topic is mirrored to ?topic= so a filtered view can be shared or linked to
 * from an email or LinkedIn post.
 */

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { InsightListItem } from "@/lib/insights/getInsights";
import { INSIGHT_TOPICS, topicFor, type InsightTopic } from "@/lib/insights/topics";

type Filter = "All" | InsightTopic;
const FILTERS: Filter[] = ["All", ...INSIGHT_TOPICS];
const SLUG: Record<Filter, string> = { All: "", "AI in business": "ai", POPIA: "popia" };

function fromSlug(slug: string | null): Filter {
  return (Object.keys(SLUG) as Filter[]).find((k) => SLUG[k] === slug && slug !== "") ?? "All";
}

function ArticleCard({ article }: { article: InsightListItem }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group block card-lift h-full rounded-lg overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] focus-visible:ring-offset-2 active:scale-[0.99] transition-transform"
      style={{ border: "1px solid var(--color-border-card)" }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9", backgroundColor: "var(--color-bg-navy-deep)" }}>
        <Image
          src={article.image}
          alt=""
          width={600}
          height={338}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6">
        <p className="topic-tag mb-3">{topicFor(article.category)}</p>
        <h3
          className="transition-opacity group-hover:opacity-80"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h3-serif)",
            fontWeight: 600,
            color: "var(--color-navy)",
            lineHeight: "var(--leading-subheading)",
            letterSpacing: "var(--tracking-tight)",
            marginBottom: "var(--space-para)",
            border: "none",
            padding: 0,
          }}
        >
          {article.title}
        </h3>
        <p className="body-muted text-sm" style={{ lineHeight: "var(--leading-body)", marginBottom: "1rem" }}>
          {article.excerpt}
        </p>
        <p className="m-0 text-xs tracking-wide" style={{ color: "var(--color-ink-tertiary)" }}>
          {article.date}
        </p>
      </div>
    </Link>
  );
}

export default function TopicFilter({ articles }: { articles: InsightListItem[] }) {
  const [active, setActive] = useState<Filter>("All");

  useEffect(() => {
    setActive(fromSlug(new URLSearchParams(window.location.search).get("topic")));
  }, []);

  function choose(f: Filter) {
    setActive(f);
    const url = new URL(window.location.href);
    if (SLUG[f]) url.searchParams.set("topic", SLUG[f]);
    else url.searchParams.delete("topic");
    window.history.replaceState(null, "", url);
  }

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { All: articles.length, "AI in business": 0, POPIA: 0 };
    for (const a of articles) c[topicFor(a.category)] += 1;
    return c;
  }, [articles]);

  const shown = active === "All" ? articles : articles.filter((a) => topicFor(a.category) === active);

  return (
    <>
      <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((f) => {
          const on = f === active;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => choose(f)}
              className="topic-chip"
              data-active={on || undefined}
            >
              {f}
              <span className="topic-chip-count" aria-label={`${counts[f]} articles`}>{counts[f]}</span>
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <div className="rounded-lg p-8 md:p-10" style={{ border: "1px dashed var(--color-border-default)" }}>
          <p className="text-ink-primary text-base leading-relaxed mb-2">
            {articles.length === 0 ? "The first articles are being written and reviewed." : `No ${active} articles yet.`}
          </p>
          <p className="body-muted text-sm leading-relaxed m-0">
            In the meantime, the free POPIA Assessment is the quickest way to see where your business stands.{" "}
            <Link href="/popia-ai-check" className="text-cyan-ink underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] rounded-sm">
              Take the assessment
            </Link>
          </p>
        </div>
      ) : (
        <ul className="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((a) => (
            <li key={a.slug}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
