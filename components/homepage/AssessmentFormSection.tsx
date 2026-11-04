import Link from "next/link";
import Button from "@/components/ui/Button";
import Glyph from "@/components/ui/Glyph";
import { StaggerParent, StaggerChild } from "@/components/ui/Animate";
import SectionHead from "@/components/ui/SectionHead";


const ASSESSMENT_HREF = "/popia-ai-check";
const CONTACT_HREF    = "/contact#contact-form";

// Homepage Section 6 — final call to action. Copy: "Maru Online — Revised
// Website Copy" v1.0 (1 Nov 2026), over the 22 Oct 2026 approval.
// Reading system (3 Nov 2026): shared section head and card anatomy.
// Blended UI, 1 Nov 2026 (approved on the design canvas): warm light ground
// after the navy image band, two routes side by side in order of weight. The
// free, informational POPIA review card carries the gold border and the gold sheen button;
// the project conversation stays quiet. Keeps the #assessment id so existing
// in-page links still land here.
export default function AssessmentFormSection() {
  return (
    // Sits on the homepage's continuous stone ground (.flow-ground), so it sets
    // no background of its own. Rhythm and head spacing: Open Flow, 4 Nov 2026.
    <section id="assessment" className="sec">
      <div className="sec-inner">
        <SectionHead
          eyebrow="Next steps"
          title={<>Ready to build AI into <span className="hl">your existing operations?</span></>}
          intro="Whether you are exploring how your business uses AI or already know which process needs improving, Maru Online can help you identify a practical way forward."
        />

        <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* ── Route 1: the free, informational POPIA review ─────────────── */}
          <StaggerChild className="h-full">
            <div
              className="card-lift card-accent-gold h-full flex flex-col"
              style={{ borderWidth: "1.5px", borderStyle: "solid" }}
            >
              <div className="card-body">
              <div className="card-label-row">
                <span className="glyph-chip glyph-chip-lg glyph-chip-gold">
                  <Glyph name="clipboard" size={26} />
                </span>
              </div>
              <h3 className="card-title">Start with the free, informational POPIA review.</h3>
              <ul className="prob-list" style={{ marginBottom: "1.75rem" }}>
                {[
                  "10 questions, about five minutes.",
                  "A short summary by email.",
                  "Areas to review and actions to prioritise.",
                ].map((p) => (
                  <li key={p}>
                    <span className="prob-dot" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col items-stretch sm:items-start gap-3">
                <Button href={ASSESSMENT_HREF} variant="primary" className="cta-shine w-full sm:w-auto justify-center">
                  Take the free, informational POPIA review
                </Button>
              </div>
              </div>
            </div>
          </StaggerChild>

          {/* ── Route 2: a project conversation ─────────────────────────── */}
          <StaggerChild className="h-full">
            <div
              className="card-lift h-full flex flex-col"
              style={{ borderWidth: "1px", borderStyle: "solid" }}
            >
              <div className="card-body">
              <div className="card-label-row">
                <span className="glyph-chip glyph-chip-lg">
                  <Glyph name="chat" size={26} />
                </span>
                <span className="card-label card-label-muted">Or</span>
              </div>
              <h3 className="card-title">Already have a project in mind?</h3>
              <p className="card-text">
                Tell us about the business challenge or workflow you want to improve.
              </p>
              <Link href={CONTACT_HREF} className="card-action min-h-[44px] focus-visible:outline-none">
                Discuss your business challenge
                <span className="card-arrow" aria-hidden="true">→</span>
              </Link>
              </div>
            </div>
          </StaggerChild>
        </StaggerParent>
      </div>
    </section>
  );
}
