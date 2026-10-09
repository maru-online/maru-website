import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAreaFinding, getReportSummary, getReportVersion, type AreaStatus } from "@/lib/assessment/reportTemplates";
import { LEVEL_RESULTS, REPORT_CLOSING_LINE, type AreaResult } from "@/lib/assessment/scoring";
import { GUIDE_PATH } from "@/lib/guides/config";
import styles from "./report.module.css";

// ── Types ──────────────────────────────────────────────────────────────────

interface ReportData {
  name: string;
  level: 1 | 2 | 3;
  levelLabel: string;
  painTag: string;
  segmentB: boolean;
  answers: Record<string, string>;
  areas: AreaResult[];
  template: unknown;      // v3 rows carry { version: "assessment_v3", … }
  overallScore: number;
  guideRequested?: boolean;
  createdAt: string;
}

// ── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const data = await fetchReport(token);
  if (!data) return { title: "Report Not Found — Maru Online" };
  // Addendum 03 A7: v3 reports only; v2 reports keep their original title.
  if (getReportVersion(data.template) === "assessment_v3") {
    return {
      title: "Your Exposure Check Report | Maru Online",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `Exposure Check Report — Maru Online`,
    description: `Your personalised operations assessment from Maru Online.`,
    robots: { index: false, follow: false },
  };
}

// ── Data fetching ──────────────────────────────────────────────────────────

async function fetchReport(token: string): Promise<ReportData | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  try {
    const res = await fetch(`${baseUrl}/api/report/${token}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ── Status display config ──────────────────────────────────────────────────
// Colours live in report.module.css (data-status). Here: wording and meter fill.

const statusLabel: Record<AreaStatus, string> = {
  critical:    "Critical gap",
  significant: "Significant gap",
  partial:     "Partial",
  strong:      "Strong",
};

// Segments filled out of 4 (same scale as before: 25 / 50 / 75 / 100%).
const meterFill: Record<AreaStatus, number> = {
  critical:    1,
  significant: 2,
  partial:     3,
  strong:      4,
};

// How many bullets show before "Show N more".
const ISSUES_SHOWN = 3;

// ── Page ───────────────────────────────────────────────────────────────────

export default async function ReportPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const data = await fetchReport(token);

  if (!data) notFound();

  const { name, level, levelLabel, segmentB } = data;
  const areas: AreaResult[] = Array.isArray(data.areas) ? (data.areas as unknown as AreaResult[]) : [];
  const firstName = name.trim().split(" ")[0];
  // Reports emailed before 26 Sep 2026 are the operations assessment (v2) and
  // keep rendering with their original copy. v3 sections without approved copy
  // (COPY-DECK-ADDENDUM-03) are hidden rather than filled.
  const version = getReportVersion(data.template);
  const isV3 = version === "assessment_v3";
  const summary = getReportSummary(level, segmentB, version);
  const findings = areas
    .map((area) => ({ area, finding: getAreaFinding(area.areaKey, area.status, version) }))
    .filter((f): f is { area: AreaResult; finding: NonNullable<typeof f.finding> } => f.finding !== null);

  // Count gaps
  const criticalCount    = areas.filter(a => a.status === "critical").length;
  const significantCount = areas.filter(a => a.status === "significant").length;
  const gapCount         = criticalCount + significantCount;

  // Priority order: lowest score first; ties keep the order of the assessment.
  // Only areas that have a finding card are ranked, so every "Start here" link
  // has somewhere to jump to.
  const ranked = findings
    .map(({ area, finding }, index) => ({ area, finding, index }))
    .sort((x, y) => x.area.score - y.area.score || x.index - y.index);
  const gaps = ranked.filter(({ area }) => area.status === "critical" || area.status === "significant");
  const hasGaps = gaps.length > 0;
  const priorities = (hasGaps ? gaps : ranked).slice(0, hasGaps ? 3 : 2);
  const tied = priorities.length > 1 && priorities.every(({ area }) => area.status === priorities[0].area.status);

  return (
    <div className={styles.page}>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>Exposure Check · Your report</p>
          <h1 className={styles.h1}>
            {firstName}, here&apos;s what your assessment reveals.
          </h1>
          <div className={styles.heroMeta}>
            <span className={styles.levelPill}>{levelLabel}</span>
            <span className={styles.heroNote}>
              {gapCount} area{gapCount !== 1 ? "s" : ""} flagged · Prepared by Maru Online
            </span>
          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <main className={`${styles.wrap} ${styles.main}`}>

        {/* ── START HERE ─────────────────────────────────────────────────── */}
        {priorities.length > 0 && (
          <section className={styles.section} aria-labelledby="start-here">
            <div className={styles.start}>
              <h2 id="start-here" className={styles.startTitle}>
                {hasGaps ? "Start here" : "Where to build next"}
              </h2>
              <p className={styles.startSub}>
                {hasGaps
                  ? "Your weakest areas first. Tap one to jump to it."
                  : "Your lowest-scoring areas. Tap one to jump to it."}
              </p>
              <ol className={styles.startList}>
                {priorities.map(({ area, finding }) => {
                  const firstSentence = finding.observation.split(/(?<=\.)\s/)[0];
                  return (
                    <li key={area.areaKey} className={styles.startItem}>
                      <a href={`#area-${area.areaKey}`} className={styles.startLink}>
                        <span>
                          <span className={styles.startName}>
                            {area.area}
                            <span className={styles.chip} data-status={area.status}>
                              {statusLabel[area.status]}
                            </span>
                          </span>
                          <span className={styles.startLine}>{firstSentence}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
              {tied && (
                <p className={styles.startNote}>
                  These areas scored the same, so they appear in the order of the assessment.
                </p>
              )}
            </div>
          </section>
        )}

        {/* ── OVERVIEW SCORECARD ─────────────────────────────────────────── */}
        {areas.length > 0 && (
          <section className={styles.section} aria-labelledby="overview">
            <h2 id="overview" className={styles.label}>Overview</h2>
            <div className={`${styles.card}`} style={{ marginBottom: 16 }}>
              <ul className={styles.overviewList} style={{ marginBottom: 0 }}>
                {areas.map((area) => (
                  <li key={area.areaKey} className={styles.item} data-status={area.status}>
                    <span className={styles.itemName}>{area.area}</span>
                    <span className={styles.meter} role="img" aria-label={`${statusLabel[area.status]}: ${meterFill[area.status]} of 4`}>
                      {[1, 2, 3, 4].map((n) => (
                        <i key={n} data-on={n <= meterFill[area.status]} />
                      ))}
                    </span>
                    <span className={styles.chip} data-status={area.status}>
                      {statusLabel[area.status]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${styles.card} ${styles.cardPad}`}>
              <p className={styles.prose}>
                {isV3 && LEVEL_RESULTS[level]?.summary}
                {!isV3 && data.levelLabel === "Early Stage" &&
                  "Your assessment points to a business running largely on effort and institutional knowledge. Most processes are informal — they work because the right people know what to do, not because systems make it automatic. The opportunity across your five areas is significant."}
                {!isV3 && data.levelLabel === "Building" &&
                  "Your business has real processes in place — but they still depend on manual steps and disconnected systems at key points. Targeted integration at those handoff points is where the return is fastest."}
                {!isV3 && data.levelLabel === "Primed" &&
                  "Your business has operational maturity. The opportunity now is in the precision gaps: reporting that still requires manual effort, approval flows tied to specific people, or data that lives in one system but needs to reach another."}
              </p>
            </div>
          </section>
        )}

        {/* ── AREA FINDINGS ─────────────────────────────────────────────── */}
        {findings.length > 0 && (
          <section className={styles.section} aria-labelledby="findings">
            <h2 id="findings" className={styles.label}>Area findings</h2>
            <div className={styles.areas}>
              {findings.map(({ area, finding }, i) => (
                <AreaCard
                  key={area.areaKey}
                  id={`area-${area.areaKey}`}
                  number={i + 1}
                  area={area.area}
                  status={area.status}
                  finding={finding}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── SEGMENT B NOTE ─────────────────────────────────────────────── */}
        {segmentB && summary?.segmentBNote && (
          <section className={styles.section} aria-labelledby="prior">
            <h2 id="prior" className={styles.label}>A note on prior attempts</h2>
            <div className={`${styles.card} ${styles.cardPad}`}>
              <p className={styles.prose}>{summary.segmentBNote}</p>
            </div>
          </section>
        )}

        {summary && (
          <>
            {/* ── RECOMMENDED APPROACH ────────────────────────────────────── */}
            <section className={styles.section} aria-labelledby="approach">
              <h2 id="approach" className={styles.label}>{summary.approachHeading}</h2>
              <div className={`${styles.card} ${styles.cardPad}`}>
                <p className={styles.prose}>{summary.approach}</p>
              </div>
            </section>

            {/* ── WHAT A SUCCESSFUL ENGAGEMENT LOOKS LIKE ─────────────────── */}
            <section className={styles.section} aria-labelledby="outcome">
              <h2 id="outcome" className={styles.label}>{summary.outcomeHeading}</h2>
              <div className={`${styles.card} ${styles.cardPad}`}>
                <p className={styles.prose}>{summary.outcome}</p>
              </div>
            </section>
          </>
        )}

        {/* ── GUIDE LINE — copy handover entry 19 §11 (approved 8 Oct), verbatim.
            After the report, v3 only, hidden once this visitor has the guide. */}
        {isV3 && !data.guideRequested && (
          <p className={styles.guideLine}>
            Want the basics behind these questions?{" "}
            <Link href={GUIDE_PATH} className={styles.guideLink}>
              Read the guide.
            </Link>
          </p>
        )}

        {/* ── NEXT STEP CTA ──────────────────────────────────────────────── */}
        <section className={styles.cta} aria-labelledby="next-step">
          <p className={styles.eyebrow}>Next step</p>
          <h2 id="next-step" className={styles.ctaTitle}>
            Request a proposal.
          </h2>
          <p className={styles.ctaText}>
            {isV3
              ? "We review your answers first, then contact you to arrange a short call at a time that suits you. On the call, we go deeper: which tools see client information, where it's stored, and who can reach it."
              : "We review your assessment first, then contact you to arrange a short call at a time that suits you. On the call, we go deeper — asking direct questions about where time is actually going, where information gets stuck, and where the manual work is concentrated."}
          </p>
          <p className={styles.ctaText}>
            If there&apos;s no clear opportunity, we&apos;ll tell you.
          </p>
          <a href="/contact#contact-form" className={styles.button}>
            Request a proposal
          </a>
        </section>

        {/* Secondary CTA */}
        <aside className={styles.second}>
          <p className={styles.secondTitle}>Not ready to request a proposal yet?</p>
          <p className={styles.secondText}>
            Reply to your report email and tell us what is happening in the business. We will take it from there.
          </p>
          <a href="mailto:hello@maruonline.com" className={styles.textLink}>
            Email hello@maruonline.com →
          </a>
        </aside>

        {/* Addendum 02: every v3 report ends with this line. */}
        {isV3 && <p className={styles.closing}>{REPORT_CLOSING_LINE}</p>}

        {/* Footer */}
        <p className={styles.foot}>
          This report was prepared by Maru Online.{" "}
          <a href="mailto:hello@maruonline.com">hello@maruonline.com</a>
          {" "}·{" "}
          <Link href="/">maruonline.com</Link>
        </p>

      </main>
    </div>
  );
}

// ── Area Card ─────────────────────────────────────────────────────────────

function AreaCard({
  id,
  number,
  area,
  status,
  finding,
}: {
  id: string;
  number: number;
  area: string;
  status: AreaStatus;
  finding: { observation: string; issues: string[] };
}) {
  const shown = finding.issues.slice(0, ISSUES_SHOWN);
  const rest = finding.issues.slice(ISSUES_SHOWN);
  const listLabel = status !== "strong" ? "Potential issues identified" : "To maintain and build on";

  return (
    <article id={id} className={`${styles.card} ${styles.area}`} data-status={status}>
      <div className={styles.areaHead}>
        <span className={styles.areaNum} aria-hidden="true">{number}</span>
        <h3 className={styles.areaName}>{area}</h3>
        <span className={styles.chip} data-status={status}>{statusLabel[status]}</span>
      </div>

      <div className={styles.areaMeter}>
        <span
          className={styles.meter}
          role="img"
          aria-label={`${statusLabel[status]}: ${meterFill[status]} of 4`}
        >
          {[1, 2, 3, 4].map((n) => (
            <i key={n} data-on={n <= meterFill[status]} />
          ))}
        </span>
      </div>

      <div className={styles.areaBody}>
        <p className={styles.observation}>{finding.observation}</p>

        <p className={styles.issuesLabel}>{listLabel}</p>
        <ul className={styles.issues}>
          {shown.map((issue, i) => (
            <li key={i}>{issue}</li>
          ))}
        </ul>

        {rest.length > 0 && (
          <details className={styles.more}>
            <summary>
              Show {rest.length} more
            </summary>
            <ul className={styles.issues}>
              {rest.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </article>
  );
}
