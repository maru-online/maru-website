import { Metadata } from "next";
import Button from "@/components/ui/Button";
import Glyph from "@/components/ui/Glyph";
import { BGPattern } from "@/components/ui/bg-pattern";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/Animate";
import { seo } from "@/lib/seo";

// Invara product page, 20 Oct 2026. Copy drawn from the Invara artifacts
// ("Invara: where it stands", 18 Oct 2026, plus the workflow, engine and
// User Manual docs). Rules carried over from those docs:
//  - Invara is in its pilot phase. No results claims, time savings or
//    customer numbers until pilot numbers exist.
//  - Proof is a benefit to the buyer, not a claim about Maru. POPIA and AI are
//    how Invara delivers, not the headline.
//  - Data protection is a design commitment. Never "certified" or
//    "POPIA-compliant". Hosting and AI-route choices are described as design
//    intent until they are final.
//  - Dashboard visuals are illustrative and say so.

export const metadata: Metadata = {
  ...seo("/invara"),
  title: "Invara | Proof Sponsors Trust, for ESD, CSI and Bursary Programmes",
  description:
    "Invara by Maru Online is the system of record for organisations that run sponsor-funded programmes. Every beneficiary and every rand on record, with reports ready when the sponsor asks.",
};

const outerPad  = "px-6 md:px-[60px]";
const innerWide = "max-w-[1100px] mx-auto";
const innerText = "max-w-[820px]";

const DEMO_HREF = "/contact?service=invara#contact-form";

// ─── Brand mark: Concept A, "Converge" (Invara Logo Concepts, 14 Oct) ─────────
// Two strands (inputs) join one straight line (the record) and carry on as one.
function InvaraMark({ size = 40, onDark = false }: { size?: number; onDark?: boolean }) {
  const s1 = onDark ? "#66BEE6" : "#008BD1";
  const s2 = onDark ? "#5FA9B4" : "#1A7A8A";
  const out = onDark ? "#FFFFFF" : "#001C2A";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M4 12 C22 12 26 32 40 32" fill="none" stroke={s1} strokeWidth="5" strokeLinecap="round" />
      <path d="M4 52 C22 52 26 32 40 32" fill="none" stroke={s2} strokeWidth="5" strokeLinecap="round" />
      <path d="M4 32 H60" fill="none" stroke={out} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

const beforeAfter = [
  ["Evidence rebuilt at year-end", "An evidence pack assembled as you go, one folder per beneficiary"],
  ["The same data re-captured across tools", "Captured once at source, on WhatsApp or email"],
  ["Each sponsor wants its own report", "One record, mapped to each sponsor's template"],
  ["Spend without proof slips through", "Spend without proof is flagged when it is captured"],
];

const audiences = [
  {
    icon: "team" as const,
    name: "ESD implementers and BDS providers",
    body: "Lean teams running enterprise and supplier development programmes on behalf of corporate sponsors.",
  },
  {
    icon: "rocket" as const,
    name: "Incubators and ESD specialists",
    body: "Larger cohorts with the same need: show each sponsor what happened to every beneficiary and every rand.",
  },
  {
    icon: "chart" as const,
    name: "CSI fund managers",
    body: "Organisations managing corporate social investment on behalf of several funders, each with its own reporting.",
  },
  {
    icon: "layers" as const,
    name: "Bursary administrators",
    body: "Individual applicants, guardian consent for minors and an academic-year cycle, on the same record.",
  },
];

const stages = [
  { n: "01", name: "Set up", body: "Programme from a template, your questions, sponsor access." },
  { n: "02", name: "Consent", body: "POPIA notice and channel opt-in before anything else." },
  { n: "03", name: "Capture", body: "WhatsApp, email, a secure link or a mentor." },
  { n: "04", name: "Intake", body: "Every item received, identified, checked and staged." },
  { n: "05", name: "Approve", body: "A named person approves from the Today queue." },
  { n: "06", name: "Record", body: "One record per beneficiary, with a full events log." },
  { n: "07", name: "Proof", body: "Dashboards, sponsor reports and the evidence pack." },
];

const channels = [
  {
    icon: "connect" as const,
    name: "WhatsApp",
    body: "Beneficiaries use the app they already have, personal or Business. Consent, applications, document photos, assessment answers and check-ins.",
  },
  {
    icon: "browser" as const,
    name: "Email",
    body: "One inbound address per programme. The sender is verified once, and every attachment lands on the right record.",
  },
  {
    icon: "shield" as const,
    name: "Secure link",
    body: "ID numbers, bank details and anything signed go through a one-time secure link, never through chat.",
  },
  {
    icon: "team" as const,
    name: "Mentor capture",
    body: "Mentors log sessions by voice note or a two-minute form, and can capture on a site visit.",
  },
];

const roles = [
  { icon: "layers" as const, name: "Programme manager", body: "Sets up programmes, approves items and signs off reports. Works in the web app." },
  { icon: "team" as const, name: "Mentor", body: "Logs sessions and uploads evidence from a phone." },
  { icon: "connect" as const, name: "Beneficiary", body: "Uses WhatsApp or email. Never needs to log in." },
  { icon: "chart" as const, name: "Sponsor", body: "A read-only view of their own programmes: dashboard, reports and evidence pack." },
];

const dataPoints = [
  {
    label: "Where the record lives",
    heading: "Designed to stay in South Africa",
    body: "Beneficiary records and files are designed to be stored in South Africa, with each implementer's data kept separate from every other's.",
  },
  {
    label: "What leaves the country",
    heading: "Masked text only",
    body: "ID and bank numbers are masked before any AI step, so the AI model receives masked text only. Where a provider processes data outside South Africa, such as WhatsApp or email delivery, we set out the basis for that transfer under POPIA section 72.",
  },
  {
    label: "How it is handled",
    heading: "Data protection in the design",
    body: "Consent before collection. Only what the programme needs. Retention follows the programme's end date. The implementer acts as operator, and Invara as sub-operator under contract.",
  },
];

// ─── Small pieces ─────────────────────────────────────────────────────────────

function SectionHead({ eyebrow, light, strong, onNavy = false }: { eyebrow: string; light: string; strong: string; onNavy?: boolean }) {
  return (
    <>
      <span className="label-eyebrow" style={{ marginBottom: "1.5rem" }}>{eyebrow}</span>
      <h2 style={{ marginBottom: "1.5rem", border: "none", ...(onNavy ? { color: "var(--color-ink-inverted)" } : {}) }}>
        <span style={{ fontWeight: 300 }}>{light}</span>
        <br />
        <span style={{ fontWeight: 700 }}>{strong}</span>
      </h2>
    </>
  );
}

const cardHeading: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontWeight: 600,
  fontSize: "var(--text-h3-sans)",
  color: "var(--color-ink-primary)",
  lineHeight: 1.3,
  marginBottom: "0.75rem",
  border: "none",
  paddingBottom: 0,
};

const smallLabel: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-label)",
  fontWeight: 500,
  letterSpacing: "var(--tracking-eyebrow)",
  textTransform: "uppercase",
  color: "var(--color-ink-tertiary)",
  marginBottom: "0.5rem",
};

// ─── Consistency diagram (hero visual) ────────────────────────────────────────
// Static version of the ESD Consistency Diagram: inconsistent inputs, one
// record in the middle, consistent outputs.

function ConsistencyDiagram() {
  const inputs = ["Mentor session notes", "Beneficiary documents", "Spend records", "WhatsApp updates", "Sponsor templates"];
  const steps = ["Captured once, at source", "Checked and approved", "One record per beneficiary"];
  const outputs = ["Sponsor report, template A", "Sponsor report, template B", "Evidence pack", "Board pack"];
  const col: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "0.625rem" };
  const pill = (text: string, tone: "in" | "out") => (
    <div
      key={text}
      style={{
        borderRadius: "10px",
        padding: "0.7rem 0.9rem",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-body-sm)",
        fontWeight: 400,
        lineHeight: 1.35,
        color: "var(--color-ink-inverted)",
        border: tone === "in" ? "1px dashed rgba(250,250,248,0.35)" : "1px solid rgba(61,184,198,0.7)",
        background: tone === "in" ? "rgba(250,250,248,0.04)" : "rgba(61,184,198,0.12)",
      }}
    >
      {text}
    </div>
  );
  const colLabel = (text: string, color: string) => (
    <span style={{ ...smallLabel, color, marginBottom: "0.25rem" }}>{text}</span>
  );
  const arrow = (
    <div aria-hidden="true" className="hidden md:flex items-center justify-center" style={{ color: "var(--color-cyan)", fontSize: "1.5rem" }}>
      →
    </div>
  );

  return (
    <figure
      style={{ margin: 0 }}
      aria-label="Diagram: scattered inputs go into one Invara record, which produces consistent sponsor reports, an evidence pack and a board pack."
    >
      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.1fr_auto_1fr] gap-4 md:gap-5 items-center rounded-[16px]"
        style={{ padding: "1.5rem", background: "rgba(250,250,248,0.04)", border: "1px solid rgba(250,250,248,0.12)" }}
      >
        <div style={col}>
          {colLabel("Before · scattered", "var(--color-ink-inverted-muted)")}
          {inputs.map((t) => pill(t, "in"))}
        </div>
        {arrow}
        <div
          className="rounded-[14px]"
          style={{ padding: "1.25rem", border: "1px solid rgba(61,184,198,0.6)", background: "rgba(13,27,42,0.55)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
            <InvaraMark size={28} onDark />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.15rem", color: "var(--color-ink-inverted)" }}>
              Invara record
            </span>
          </div>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {steps.map((s, i) => (
              <li key={s} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <span
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: "var(--color-cyan)",
                    color: "var(--color-ink-primary)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", color: "var(--color-ink-inverted)" }}>{s}</span>
              </li>
            ))}
          </ol>
        </div>
        {arrow}
        <div style={col}>
          {colLabel("After · consistent", "var(--color-cyan)")}
          {outputs.map((t) => pill(t, "out"))}
        </div>
      </div>
    </figure>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InvaraPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative overflow-hidden ${outerPad} pt-36 md:pt-44 pb-20 md:pb-28`}
        style={{ background: "var(--gradient-hero)" }}
      >
        <BGPattern variant="grid" mask="fade-edges" size={40} fill="rgba(61, 184, 198, 0.101)" className="pointer-events-none" />
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "2rem" }}>
              <InvaraMark size={44} onDark />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.75rem", letterSpacing: "-0.03em", lineHeight: 1, color: "var(--color-ink-inverted)" }}>
                  Invara
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.8rem", letterSpacing: "0.02em", color: "var(--color-cyan)" }}>
                  by Maru Online
                </span>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split" style={{ marginBottom: "2rem" }}>
              <span className="maru-headline-split-light">Turn programme delivery into</span>
              <br />
              <span className="maru-headline-split-strong">proof sponsors trust.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="body-on-navy" style={{ maxWidth: "700px", marginBottom: "1.25rem" }}>
              Invara is the system of record for organisations that run sponsor-funded programmes: enterprise and supplier development, CSI and bursaries. Every beneficiary and every rand on record, with reports ready when the sponsor asks.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "var(--text-body)",
                color: "var(--color-cyan)",
                lineHeight: "var(--leading-body-relaxed)",
                maxWidth: "700px",
                marginBottom: "2.5rem",
              }}
            >
              Capture once. Approve once. Report to every sponsor from the same record.
            </p>
          </FadeUp>

          <FadeUp delay={0.22}>
            <div data-maru-primary-cta className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4" style={{ marginBottom: "1rem" }}>
              <Button href={DEMO_HREF} variant="primary" className="w-full sm:w-auto justify-center">
                Request a demo
              </Button>
              <Button href="#how-it-works" variant="secondary" className="w-full sm:w-auto justify-center">
                See how it works
              </Button>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontStyle: "italic", fontSize: "var(--text-meta)", color: "var(--color-ink-inverted-muted)", margin: "0 0 3.5rem" }}>
              Invara is in its pilot phase. We are working with a small number of implementers to shape it.
            </p>
          </FadeUp>

          <FadeUp delay={0.28}>
            <ConsistencyDiagram />
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          THE PROBLEM AND THE PROOF
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ background: "var(--gradient-surface)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead eyebrow="The problem" light="From year-end reconstruction" strong="to evidence on record." />
            <p className={`body-muted ${innerText}`} style={{ marginBottom: "var(--space-section-header-mb)" }}>
              Sponsors want proof of what happened to every beneficiary and every rand. Without a system of record, that proof is rebuilt by hand from notes, documents and spreadsheets, often just before verification.
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="card-lift rounded-[12px] overflow-hidden">
              <div className="hidden md:grid grid-cols-2" style={{ background: "var(--color-bg-secondary)" }}>
                <span style={{ ...smallLabel, margin: 0, padding: "1rem 1.5rem" }}>Without a system of record</span>
                <span style={{ ...smallLabel, margin: 0, padding: "1rem 1.5rem", color: "var(--color-cyan-ink, var(--color-ink-primary))" }}>With Invara</span>
              </div>
              {beforeAfter.map(([before, after], i) => (
                <div
                  key={before}
                  className="grid grid-cols-1 md:grid-cols-2"
                  style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-border-card)" }}
                >
                  <p className="body-muted" style={{ margin: 0, padding: "1.1rem 1.5rem" }}>
                    <span className="md:hidden" style={{ ...smallLabel, marginBottom: "0.25rem" }}>Without</span>
                    {before}
                  </p>
                  <p style={{ margin: 0, padding: "1.1rem 1.5rem", fontFamily: "var(--font-body)", fontSize: "var(--text-body-sm)", fontWeight: 500, color: "var(--color-ink-primary)", lineHeight: "var(--leading-body)", borderLeft: "3px solid var(--color-cyan)" }}>
                    <span className="md:hidden" style={{ ...smallLabel, marginBottom: "0.25rem" }}>With Invara</span>
                    {after}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p
              style={{
                marginTop: "2rem",
                marginBottom: 0,
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-body)",
                color: "var(--color-ink-primary)",
                borderLeft: "4px solid var(--color-cyan)",
                paddingLeft: "1.25rem",
                lineHeight: "var(--leading-body)",
                maxWidth: "820px",
              }}
            >
              <strong style={{ fontWeight: 700 }}>The audit trail is the product.</strong> Every field has a source and an approver, so a sponsor or verifier question is answered with evidence.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          WHO IT IS FOR
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead eyebrow="Who it is for" light="Built for implementers who" strong="disburse on behalf of sponsors." />
            <p className={`body-muted ${innerText}`} style={{ marginBottom: "var(--space-section-header-mb)" }}>
              Invara is for the organisations in the middle: funded by corporate sponsors, working directly with beneficiaries, and accountable to both.
            </p>
          </FadeUp>
          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {audiences.map((a) => (
              <StaggerChild key={a.name} className="h-full">
                <div className="card-lift h-full rounded-[10px]" style={{ padding: "1.75rem 1.5rem", borderTop: "3px solid var(--color-cyan)" }}>
                  <span className="glyph-chip" style={{ marginBottom: "1rem" }}>
                    <Glyph name={a.icon} size={22} />
                  </span>
                  <h3 style={cardHeading}>{a.name}</h3>
                  <p className="body-muted" style={{ marginBottom: 0 }}>{a.body}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          HOW IT WORKS
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="how-it-works"
        className={`relative overflow-hidden ${outerPad} py-24`}
        style={{ background: "var(--gradient-hero)" }}
      >
        <BGPattern variant="grid" mask="fade-edges" size={40} fill="rgba(61, 184, 198, 0.07)" className="pointer-events-none" />
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <SectionHead eyebrow="How it works" light="Seven stages," strong="one spine." onNavy />
            <p className="body-on-navy" style={{ maxWidth: "760px", marginBottom: "var(--space-section-header-mb)" }}>
              Every programme runs on the same path, from set-up to proof. While a beneficiary is in the programme, a monthly cycle feeds each new item back through intake.
            </p>
          </FadeUp>
          <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {stages.map((s) => (
              <StaggerChild key={s.n} className="h-full">
                <div
                  className="h-full rounded-[10px]"
                  style={{
                    padding: "1.25rem 1rem",
                    background: "rgba(250,250,248,0.05)",
                    border: "1px solid rgba(250,250,248,0.12)",
                    borderTop: `3px solid ${s.n === "05" ? "var(--color-gold)" : "var(--color-cyan)"}`,
                  }}
                >
                  <span aria-hidden="true" style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", color: s.n === "05" ? "var(--color-gold)" : "var(--color-cyan)", marginBottom: "0.5rem" }}>
                    {s.n}
                  </span>
                  <h3 style={{ ...cardHeading, color: "var(--color-ink-inverted)", fontSize: "1.05rem", marginBottom: "0.4rem" }}>{s.name}</h3>
                  <p style={{ margin: 0, fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "var(--text-meta)", lineHeight: 1.5, color: "var(--color-ink-inverted-muted)" }}>{s.body}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
          <FadeUp delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginTop: "2.5rem" }}>
              <p className="body-on-navy" style={{ margin: 0, borderLeft: "4px solid var(--color-gold)", paddingLeft: "1.25rem" }}>
                <strong style={{ fontWeight: 600, color: "var(--color-ink-inverted)" }}>Nothing reaches the record unapproved.</strong> Every item is staged first, and a named person approves it. Reports read approved data only.
              </p>
              <p className="body-on-navy" style={{ margin: 0, borderLeft: "4px solid var(--color-cyan)", paddingLeft: "1.25rem" }}>
                <strong style={{ fontWeight: 600, color: "var(--color-ink-inverted)" }}>AI makes capture fast. People make it trustworthy.</strong> AI classifies items and pulls out the fields; your team checks and signs.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CAPTURE AT SOURCE
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ background: "var(--gradient-surface)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead eyebrow="Capture at source" light="Beneficiaries use what" strong="they already have." />
            <p className={`body-muted ${innerText}`} style={{ marginBottom: "var(--space-section-header-mb)" }}>
              No app to install and no password to remember. Beneficiaries respond on WhatsApp or email, and mentors capture from their phones.
            </p>
          </FadeUp>
          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {channels.map((c) => (
              <StaggerChild key={c.name} className="h-full">
                <div className="card-lift h-full rounded-[10px]" style={{ padding: "1.75rem 1.5rem" }}>
                  <span className="glyph-chip" style={{ marginBottom: "1rem" }}>
                    <Glyph name={c.icon} size={22} />
                  </span>
                  <h3 style={cardHeading}>{c.name}</h3>
                  <p className="body-muted" style={{ marginBottom: 0 }}>{c.body}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
          <FadeUp delay={0.1}>
            <p className="body-muted" style={{ marginTop: "2rem", marginBottom: 0, maxWidth: "820px", borderLeft: "4px solid var(--color-cyan)", paddingLeft: "1.25rem" }}>
              <strong style={{ fontWeight: 600, color: "var(--color-ink-primary)" }}>Made for South African conditions.</strong> A low-data web form, mentor-assisted capture on site visits, and an SMS nudge when a WhatsApp message goes unread.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          YOU STAY IN CONTROL
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ backgroundColor: "var(--color-bg-secondary)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead eyebrow="Your team, your sponsors" light="You stay in control." strong="Nothing gets lost." />
            <p className={`body-muted ${innerText}`} style={{ marginBottom: "var(--space-section-header-mb)" }}>
              Only your team works in Invara day to day. The work shrinks to checking and approving, and the sponsor sees an accurate view without extra effort.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-start">
            {/* Illustrative dashboard */}
            <FadeUp>
              <figure className="card-lift rounded-[12px]" style={{ margin: 0, padding: "1.75rem" }}>
                <span style={smallLabel}>Programme dashboard · illustrative</span>
                <h3 style={{ ...cardHeading, marginBottom: "1.25rem" }}>Funds, from budget to proven</h3>
                {[
                  { label: "Budget", w: 100, c: "#16324F" },
                  { label: "Committed", w: 82, c: "#00679C" },
                  { label: "Disbursed", w: 64, c: "#008BD1" },
                  { label: "Proven (disbursed with proof)", w: 46, c: "#1A7A8A" },
                ].map((b) => (
                  <div key={b.label} style={{ marginBottom: "0.9rem" }}>
                    <span className="body-muted" style={{ display: "block", marginBottom: "0.35rem", fontSize: "var(--text-meta)" }}>{b.label}</span>
                    <div aria-hidden="true" style={{ height: "14px", width: `${b.w}%`, background: b.c, borderRadius: "999px" }} />
                  </div>
                ))}
                <div
                  className="rounded-[10px]"
                  style={{ marginTop: "1.5rem", padding: "1.1rem 1.25rem", background: "var(--color-bg-navy, #1A3A5C)" }}
                >
                  <span style={{ ...smallLabel, color: "var(--color-gold)" }}>Today queue</span>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {[
                      ["To verify", "documents with their checks"],
                      ["To confirm", "session notes and plan drafts"],
                      ["Flags", "missed check-ins, spend without proof"],
                      ["Due soon", "files still missing before year-end"],
                    ].map(([k, v]) => (
                      <li key={k} style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-meta)", color: "var(--color-ink-inverted-muted)", lineHeight: 1.5 }}>
                        <span style={{ color: "var(--color-gold)", fontWeight: 500 }}>{k}</span> · {v}
                      </li>
                    ))}
                  </ul>
                </div>
                <figcaption style={{ marginTop: "1rem", fontFamily: "var(--font-body)", fontSize: "var(--text-meta)", fontWeight: 300, fontStyle: "italic", color: "var(--color-ink-tertiary)" }}>
                  Illustration of the dashboard design. Bar lengths are not data.
                </figcaption>
              </figure>
            </FadeUp>

            {/* Roles */}
            <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roles.map((r) => (
                <StaggerChild key={r.name} className="h-full">
                  <div className="card-lift h-full rounded-[10px]" style={{ padding: "1.4rem 1.25rem" }}>
                    <span className="glyph-chip" style={{ marginBottom: "0.75rem" }}>
                      <Glyph name={r.icon} size={20} />
                    </span>
                    <h3 style={{ ...cardHeading, fontSize: "1.05rem", marginBottom: "0.4rem" }}>{r.name}</h3>
                    <p className="body-muted" style={{ marginBottom: 0 }}>{r.body}</p>
                  </div>
                </StaggerChild>
              ))}
            </StaggerParent>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          DATA AND POPIA
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`${outerPad} py-24`} style={{ background: "var(--gradient-surface)" }}>
        <div className={innerWide}>
          <FadeUp>
            <SectionHead eyebrow="Data and POPIA" light="Your beneficiaries' records," strong="handled with care." />
            <p className={`body-muted ${innerText}`} style={{ marginBottom: "var(--space-section-header-mb)" }}>
              Beneficiary files hold ID documents, bank details and business records. Invara is designed around that from the start.
            </p>
          </FadeUp>
          <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {dataPoints.map((d) => (
              <StaggerChild key={d.heading} className="h-full">
                <div className="card-lift h-full rounded-[10px]" style={{ padding: "1.75rem 1.5rem", borderTop: "3px solid var(--color-cyan)" }}>
                  <span style={smallLabel}>{d.label}</span>
                  <h3 style={cardHeading}>{d.heading}</h3>
                  <p className="body-muted" style={{ marginBottom: 0 }}>{d.body}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA
          ════════════════════════════════════════════════════════════════════ */}
      <section className={`relative overflow-hidden ${outerPad} py-24`} style={{ background: "var(--gradient-hero)" }}>
        <BGPattern variant="grid" mask="fade-edges" size={40} fill="rgba(61, 184, 198, 0.08)" className="pointer-events-none" />
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <InvaraMark size={36} onDark />
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.85rem", color: "var(--color-cyan)" }}>Invara by Maru Online</span>
            </div>
            <h2 style={{ marginBottom: "1.5rem", border: "none", color: "var(--color-ink-inverted)" }}>
              <span style={{ fontWeight: 300 }}>See your programme</span>
              <br />
              <span style={{ fontWeight: 700 }}>on one record.</span>
            </h2>
            <p className="body-on-navy" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
              Tell us about the programmes you run and the sponsors you report to. We will walk you through how Invara would handle them, from first contact with a beneficiary to the evidence pack.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button href={DEMO_HREF} variant="primary" className="w-full sm:w-auto justify-center">
                Request a demo
              </Button>
              <Button href="/about" variant="secondary" className="w-full sm:w-auto justify-center">
                About Maru Online
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
