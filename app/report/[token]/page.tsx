import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAreaFinding, getReportSummary, getReportVersion, type AreaStatus } from "@/lib/assessment/reportTemplates";
import { LEVEL_RESULTS, REPORT_CLOSING_LINE, type AreaResult } from "@/lib/assessment/scoring";

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
      title: "Your POPIA AI Check Report | Maru Online",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `Operations Assessment Report — Maru Online`,
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

const statusConfig: Record<AreaStatus, {
  label: string;
  dot: string;
  pill: string;
  pillBorder: string;
  pillText: string;
  bar: string;
  barBg: string;
}> = {
  critical: {
    label:      "Critical gap",
    dot:        "#E53E3E",
    pill:       "#FFF5F5",
    pillBorder: "#FC8181",
    pillText:   "#C53030",
    bar:        "#E53E3E",
    barBg:      "#FED7D7",
  },
  significant: {
    label:      "Significant gap",
    dot:        "#C05621",
    pill:       "#FFFAF0",
    pillBorder: "#F6AD55",
    pillText:   "#C05621",
    bar:        "#DD6B20",
    barBg:      "#FEEBC8",
  },
  partial: {
    label:      "Partial",
    dot:        "#2F855A",
    pill:       "#F0FFF4",
    pillBorder: "#68D391",
    pillText:   "#276749",
    bar:        "#38A169",
    barBg:      "#C6F6D5",
  },
  strong: {
    label:      "Strong",
    dot:        "#2B6CB0",
    pill:       "#EBF8FF",
    pillBorder: "#63B3ED",
    pillText:   "#2C5282",
    bar:        "#3182CE",
    barBg:      "#BEE3F8",
  },
};

const scoreBarWidth: Record<AreaStatus, string> = {
  critical:    "25%",
  significant: "50%",
  partial:     "75%",
  strong:      "100%",
};

const calendlyUrl = "https://calendly.com/hello-maruonline/discovery-call";

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F8FA", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header style={{ backgroundColor: "var(--color-ink-primary)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ color: "white", fontWeight: 600, fontSize: 18, textDecoration: "none", letterSpacing: "-0.02em" }}>
            <span style={{ color: "var(--color-cyan)" }}>M</span>
            <span>aru Online</span>
          </Link>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {isV3 ? "POPIA AI check" : "Operations Assessment"}
          </span>
        </div>
      </header>

      {/* ── Report banner ───────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "var(--color-ink-primary)", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: 32 }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px 0" }}>
          <p style={{ fontSize: 11, fontFamily: "monospace", color: "var(--color-cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            Your report
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 600, color: "white", margin: "0 0 12px", lineHeight: 1.3 }}>
            {firstName}, here&apos;s what your assessment reveals.
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 11, fontFamily: "monospace", padding: "4px 12px",
              borderRadius: 20, border: "1px solid rgba(61,184,198,0.4)",
              background: "rgba(61,184,198,0.1)", color: "var(--color-cyan)",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              {levelLabel}
            </span>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
              {gapCount} area{gapCount !== 1 ? "s" : ""} flagged · Prepared by Maru Online
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── OVERVIEW SCORECARD ─────────────────────────────────────────── */}
        {areas.length > 0 && <div style={{ marginBottom: 40 }}>
          <SectionLabel>Overview</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
            {areas.map((area) => {
              const cfg = statusConfig[area.status];
              return (
                <div key={area.areaKey} style={{
                  background: "white", border: `1px solid #E2E8F0`, borderRadius: 8,
                  padding: "12px 10px", textAlign: "center",
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: cfg.dot, margin: "0 auto 8px",
                  }} />
                  <div style={{ fontSize: 11, color: "#4A5568", lineHeight: 1.3, fontWeight: 500 }}>
                    {area.area}
                  </div>
                  <div style={{
                    marginTop: 8, fontSize: 10, fontFamily: "monospace",
                    color: cfg.pillText, fontWeight: 600, textTransform: "uppercase",
                  }}>
                    {cfg.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 8, padding: 20 }}>
            <p style={{ fontSize: 14, color: "#2D3748", lineHeight: 1.7, margin: 0 }}>
              {isV3 && LEVEL_RESULTS[level]?.summary}
              {!isV3 && data.levelLabel === "Early Stage" &&
                "Your assessment points to a business running largely on effort and institutional knowledge. Most processes are informal — they work because the right people know what to do, not because systems make it automatic. The opportunity across your five areas is significant."}
              {!isV3 && data.levelLabel === "Building" &&
                "Your business has real processes in place — but they still depend on manual steps and disconnected systems at key points. Targeted integration at those handoff points is where the return is fastest."}
              {!isV3 && data.levelLabel === "Primed" &&
                "Your business has operational maturity. The opportunity now is in the precision gaps: reporting that still requires manual effort, approval flows tied to specific people, or data that lives in one system but needs to reach another."}
            </p>
          </div>
        </div>}

        {findings.length > 0 && <><Divider />

        {/* ── AREA FINDINGS ─────────────────────────────────────────────── */}
        <div style={{ marginBottom: 40 }}>
          <SectionLabel>Area findings</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {findings.map(({ area, finding }, i) => {
              const cfg = statusConfig[area.status];
              return (
                <AreaCard
                  key={area.areaKey}
                  number={i + 1}
                  area={area.area}
                  status={area.status}
                  cfg={cfg}
                  finding={finding}
                  barWidth={scoreBarWidth[area.status]}
                />
              );
            })}
          </div>
        </div></>}

        <Divider />

        {/* ── SEGMENT B NOTE ─────────────────────────────────────────────── */}
        {segmentB && summary?.segmentBNote && (
          <>
            <div style={{ marginBottom: 40 }}>
              <SectionLabel>A note on prior attempts</SectionLabel>
              <div style={{
                background: "#FFFAF0", border: "1px solid #F6AD55",
                borderRadius: 8, padding: "20px 24px",
              }}>
                <p style={{ fontSize: 14, color: "#7B341E", lineHeight: 1.7, margin: 0 }}>
                  {summary.segmentBNote}
                </p>
              </div>
            </div>
            <Divider />
          </>
        )}

        {summary && <>
        {/* ── RECOMMENDED APPROACH ──────────────────────────────────────── */}
        <div style={{ marginBottom: 40 }}>
          <SectionLabel>{summary.approachHeading}</SectionLabel>
          <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 8, padding: 24 }}>
            <p style={{ fontSize: 14, color: "#2D3748", lineHeight: 1.75, margin: 0 }}>
              {summary.approach}
            </p>
          </div>
        </div>

        <Divider />

        {/* ── WHAT A SUCCESSFUL ENGAGEMENT LOOKS LIKE ───────────────────── */}
        <div style={{ marginBottom: 40 }}>
          <SectionLabel>{summary.outcomeHeading}</SectionLabel>
          <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 8, padding: 24 }}>
            <p style={{ fontSize: 14, color: "#2D3748", lineHeight: 1.75, margin: 0 }}>
              {summary.outcome}
            </p>
          </div>
        </div>

        <Divider />
        </>}

        {/* ── NEXT STEP CTA ──────────────────────────────────────────────── */}
        <div style={{
          backgroundColor: "var(--color-ink-primary)", borderRadius: 12, padding: "40px 36px", marginBottom: 32,
        }}>
          <p style={{ fontSize: 11, fontFamily: "monospace", color: "var(--color-cyan)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Next step
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: "white", margin: "0 0 16px", lineHeight: 1.3 }}>
            Book a free 30-minute discovery call.
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: "0 0 12px" }}>
            {isV3
              ? "We review your answers before the call. On the day, we go deeper: which tools see client information, where it's stored, and who can reach it."
              : "We review your assessment before the call. On the day, we go deeper — asking direct questions about where time is actually going, where information gets stuck, and where the manual work is concentrated."}
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: "0 0 28px" }}>
            If there&apos;s no clear opportunity, we&apos;ll tell you.
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block", backgroundColor: "var(--color-cyan)",
              color: "var(--color-ink-primary)", fontWeight: 700, padding: "14px 28px",
              borderRadius: 8, textDecoration: "none", fontSize: 15,
            }}
          >
            Book a discovery call
          </a>
        </div>

        {/* Secondary CTA */}
        <div style={{
          background: "#EBF8FF", border: "1px solid #63B3ED",
          borderRadius: 8, padding: "20px 24px", marginBottom: 48,
        }}>
          <p style={{ fontWeight: 600, color: "var(--color-ink-primary)", fontSize: 14, margin: "0 0 8px" }}>
            Not ready to book yet?
          </p>
          <p style={{ color: "#2D4A60", fontSize: 14, lineHeight: 1.6, margin: "0 0 12px" }}>
            Reply to your report email and tell us what is happening in the business. We will take it from there.
          </p>
          <a href="mailto:hello@maruonline.com" style={{ color: "#2B6CB0", fontSize: 13, fontWeight: 600 }}>
            Email hello@maruonline.com →
          </a>
        </div>

        {/* Addendum 02: every v3 report ends with this line. */}
        {isV3 && (
          <p style={{ color: "#4A5568", fontSize: 13, textAlign: "center", lineHeight: 1.6, margin: "0 0 16px" }}>
            {REPORT_CLOSING_LINE}
          </p>
        )}

        {/* Footer */}
        <p style={{ color: "#A0AEC0", fontSize: 12, textAlign: "center", lineHeight: 1.6 }}>
          This report was prepared by Maru Online.{" "}
          <a href="mailto:hello@maruonline.com" style={{ color: "#A0AEC0" }}>hello@maruonline.com</a>
          {" "}·{" "}
          <Link href="/" style={{ color: "#A0AEC0" }}>maruonline.com</Link>
        </p>

      </div>
    </div>
  );
}

// ── Area Card ─────────────────────────────────────────────────────────────

function AreaCard({
  number,
  area,
  status,
  cfg,
  finding,
  barWidth,
}: {
  number: number;
  area: string;
  status: AreaStatus;
  cfg: typeof statusConfig[AreaStatus];
  finding: { observation: string; issues: string[] };
  barWidth: string;
}) {
  return (
    <div style={{
      background: "white", border: "1px solid #E2E8F0",
      borderRadius: 10, overflow: "hidden",
    }}>
      {/* Card header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px", borderBottom: "1px solid #EDF2F7",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            width: 24, height: 24, borderRadius: "50%",
            background: "#F7F8FA", border: "1px solid #E2E8F0",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontFamily: "monospace", color: "#718096", fontWeight: 700,
            flexShrink: 0,
          }}>
            {number}
          </span>
          <span style={{ fontWeight: 600, fontSize: 15, color: "#1A202C" }}>
            {area}
          </span>
        </div>
        <span style={{
          fontSize: 11, fontFamily: "monospace", padding: "4px 10px",
          borderRadius: 20, border: `1px solid ${cfg.pillBorder}`,
          background: cfg.pill, color: cfg.pillText,
          letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600,
          whiteSpace: "nowrap",
        }}>
          {cfg.label}
        </span>
      </div>

      {/* Score bar */}
      <div style={{ height: 4, background: cfg.barBg }}>
        <div style={{ height: "100%", width: barWidth, background: cfg.bar, transition: "width 0.5s ease" }} />
      </div>

      {/* Card body */}
      <div style={{ padding: "20px 20px 24px" }}>

        {/* Observation */}
        <p style={{ fontSize: 14, color: "#2D3748", lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic" }}>
          {finding.observation}
        </p>

        {/* Issues list */}
        {status !== "strong" ? (
          <>
            <p style={{ fontSize: 11, fontFamily: "monospace", color: "#718096", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 10px", fontWeight: 600 }}>
              Potential issues identified
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {finding.issues.map((issue, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%", background: cfg.dot,
                    flexShrink: 0, marginTop: 7,
                  }} />
                  <span style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.6 }}>
                    {issue}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p style={{ fontSize: 11, fontFamily: "monospace", color: "#718096", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 10px", fontWeight: 600 }}>
              To maintain and build on
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {finding.issues.map((issue, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%", background: cfg.dot,
                    flexShrink: 0, marginTop: 7,
                  }} />
                  <span style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.6 }}>
                    {issue}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 11, fontFamily: "monospace", color: "var(--color-cyan)",
      letterSpacing: "0.12em", textTransform: "uppercase",
      marginBottom: 16, fontWeight: 600,
    }}>
      {children}
    </p>
  );
}

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid #E2E8F0", marginBottom: 40 }} />;
}
