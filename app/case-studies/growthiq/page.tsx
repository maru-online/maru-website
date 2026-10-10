import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDY_LIVE, CASE_STUDY_QUOTE_APPROVED } from "@/lib/case-study";
import ListGroup from "@/components/ui/ListGroup";
import ListItem from "@/components/ui/ListItem";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/Animate";
import { ScaffoldPlaceholder } from "@/components/ui/ScaffoldPlaceholder";
import { seo } from "@/lib/seo";

// Copy approved 10 Oct 2026 (draft v3). Still to supply before publishing:
//   1. One shareable metric, cleared with Growth Firm.
//   2. City Seokane's written approval of the quote (CASE_STUDY_QUOTE_APPROVED).
//   3. Two real product screenshots with no client data visible.
//
// Shown on previews only until CASE_STUDY_PUBLISHED is set in lib/case-study.ts.
// noindex until published. On publish, remove `robots` below and add both
// /case-studies and /case-studies/growthiq to app/sitemap.ts.
export const metadata: Metadata = {
  ...seo("/case-studies/growthiq"),
  title: "GrowthIQ | Case Study | Maru Online",
  description:
    "How Maru Online built GrowthIQ: one place to run an Enterprise and Supplier Development programme, with AI guiding every step.",
  robots: { index: false, follow: true },
};

const outerPad = "px-6 md:px-[60px]";
const inner = "max-w-[900px] mx-auto";

const BUILD = [
  {
    leader: "One system of record",
    body: "every beneficiary, stage and document in one place, across all five stages: Identify, Assess, Develop, Integrate, Verify.",
  },
  {
    leader: "AI does the processing",
    body: "assessments are scored as they're submitted, growth plans are drafted from the answers, and sponsor reports come from the same data, so it's current at every stage.",
  },
  {
    leader: "An assessment built for phones",
    body: "88 questions, one section per screen, saved as the owner goes, with POPIA consent up front.",
  },
  {
    leader: "Two audiences kept apart",
    body: "sponsors see scores and reports, never a business's raw answers.",
  },
  {
    leader: "A brand and website",
    body: "live on growthiq.co.za since 8 July 2026.",
  },
];

const RESULTS = [
  "The whole programme now runs in one place, from first assessment to sponsor report.",
  "The record stays current as the work happens, so reporting no longer waits for quarter-end.",
  "Small businesses complete their assessment on their own phones, invited since July 2026.",
];

const QUOTE =
  "GrowthIQ runs the whole programme in one place, across all five stages, with AI guiding every step. The record stays current as the work happens, so our reporting is audit-ready at each stage.";

export default function GrowthIqCaseStudy() {
  if (!CASE_STUDY_LIVE) notFound();
  return (
    <>
      {/* ── Hero ── */}
      <section
        className={`min-h-[55vh] flex items-center ${outerPad} pt-48 pb-24`}
        style={{ backgroundColor: "var(--color-bg-navy)" }}
      >
        <div className={inner}>
          <FadeUp>
            <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
              <Link
                href="/case-studies"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-meta)",
                  color: "var(--color-cyan)",
                }}
              >
                ← Case Studies
              </Link>
            </nav>
            <span className="label-eyebrow">
              Enterprise &amp; Supplier Development
            </span>
            <h1 style={{ color: "var(--color-ink-inverted)" }}>GrowthIQ</h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                color: "var(--color-ink-inverted-muted)",
                maxWidth: "560px",
                marginTop: "1.5rem",
              }}
            >
              We built GrowthIQ for Growth Firm: one place to run an Enterprise
              and Supplier Development programme, from identifying beneficiaries
              to verifying the evidence, with AI guiding every step.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Brief → Build → Result ── */}
      <section
        className={`${outerPad} py-24`}
        style={{ backgroundColor: "var(--color-bg-primary)" }}
      >
        <div className={inner}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>

            {/* 01 — Brief */}
            <FadeUp>
              <div>
                <span className="section-number">01</span>
                <h2 style={{ margin: "0.5rem 0 1.5rem" }}>The brief</h2>
                <p className="body-muted" style={{ marginBottom: 0 }}>
                  Growth Firm develops the small businesses that corporates fund
                  through Enterprise and Supplier Development. It had a portal that
                  held the records, but the programme itself ran across that
                  portal, spreadsheets and slide decks. Growth Firm wanted one
                  platform for the whole process, a brand to take to corporates,
                  and reporting that keeps up with the work.
                </p>
              </div>
            </FadeUp>

            {/* 02 — Build */}
            <FadeUp>
              <div>
                <span className="section-number">02</span>
                <h2 style={{ margin: "0.5rem 0 1.5rem" }}>The build</h2>
                <p className="body-muted" style={{ marginBottom: "0.5rem" }}>
                  May to September 2026, and continuing.
                </p>
                <ListGroup>
                  {BUILD.map((b) => (
                    <ListItem key={b.leader} leader={b.leader} body={b.body} />
                  ))}
                </ListGroup>

                <div style={{ marginTop: "1.5rem" }}>
                  <ScaffoldPlaceholder
                    label="Screenshot — GrowthIQ dashboard"
                    blockedOn="Jimmy — real product screenshots, not stock imagery"
                    minHeight="320px"
                  >
                    16:9. Alt text still to be written. Check for beneficiary
                    names or figures needing redaction before publishing.
                  </ScaffoldPlaceholder>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <ScaffoldPlaceholder
                    label="Screenshot — assessment wizard or growth plan"
                    blockedOn="Jimmy — real product screenshots"
                    minHeight="320px"
                  >
                    16:9. Alt text still to be written.
                  </ScaffoldPlaceholder>
                </div>
              </div>
            </FadeUp>

            {/* 03 — Result */}
            <FadeUp>
              <div>
                <span className="section-number">03</span>
                <h2 style={{ margin: "0.5rem 0 1.5rem" }}>The result</h2>
                <ListGroup>
                  {RESULTS.map((r) => (
                    <ListItem key={r} leader={r} />
                  ))}
                </ListGroup>

                <div style={{ marginTop: "1.5rem" }}>
                <ScaffoldPlaceholder
                  label="Before / after numbers"
                  blockedOn="Jimmy — one shareable metric, cleared with the client"
                >
                  Standing rule 5 requires documented before/after numbers per
                  engagement. One verified figure beats three vague ones — and
                  standing rule 6 says verify it is real before building on it.
                </ScaffoldPlaceholder>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <figure
                    style={{
                      margin: 0,
                      borderLeft: "3px solid var(--color-cyan)",
                      paddingLeft: "1.5rem",
                    }}
                  >
                    <blockquote style={{ margin: 0 }}>
                      <p
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 300,
                          fontSize: "var(--text-h3-serif)",
                          lineHeight: 1.5,
                          color: "var(--color-ink-primary)",
                          margin: 0,
                        }}
                      >
                        &ldquo;{QUOTE}&rdquo;
                      </p>
                    </blockquote>
                    <figcaption className="body-muted" style={{ marginTop: "1rem", marginBottom: 0 }}>
                      City Seokane, Managing Director, Growth Firm
                      {!CASE_STUDY_QUOTE_APPROVED && (
                        <span style={{ display: "block", color: "var(--color-ink-tertiary)", fontSize: "var(--text-meta)" }}>
                          Draft, pending approval
                        </span>
                      )}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </FadeUp>

          </div>

          {/* ── CTA ── */}
          <FadeUp>
            <div
              style={{
                marginTop: "4rem",
                paddingTop: "2.5rem",
                borderTop: "1px solid var(--color-border-default)",
              }}
            >
              <h2 style={{ marginBottom: "1rem" }}>
                <span style={{ fontWeight: 300 }}>Got a similar problem?</span>
              </h2>
              <p className="body-muted" style={{ marginBottom: "1.5rem", maxWidth: "560px" }}>
                Start with the free Exposure Check. It takes a few minutes
                and tells you where your workflows are leaking time.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button href="/popia-ai-check" variant="primary" className="w-full sm:w-auto justify-center">
                  Start the assessment
                </Button>
                <Button href="/process#how-we-price" variant="tertiary">
                  See pricing
                </Button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
