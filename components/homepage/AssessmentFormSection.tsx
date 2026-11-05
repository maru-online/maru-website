import Link from "next/link";
import Button from "@/components/ui/Button";
import { DrawnVisual } from "@/components/ui/CardMedia";
import { StaggerParent, StaggerChild } from "@/components/ui/Animate";
import SectionHead from "@/components/ui/SectionHead";
import DotField from "@/components/ui/DotField";


const ASSESSMENT_HREF = "/popia-ai-check";
const CONTACT_HREF    = "/contact#contact-form";

// Homepage Section 6 — final call to action. Copy: "Maru Online — Revised
// Website Copy" v1.0 (1 Nov 2026), over the 22 Oct 2026 approval.
// Reading system (3 Nov 2026): shared section head and card anatomy.
// Blended UI, 1 Nov 2026 (approved on the design canvas): warm light ground
// after the navy image band, two routes side by side in order of weight. The
// free, informational POPIA review card leads (first, with the primary button);
// the project conversation stays quiet. Gold retired 5 Nov 2026. Keeps the #assessment id so existing
// in-page links still land here.
export default function AssessmentFormSection() {
  return (
    // Sits on the homepage's continuous stone ground (.flow-ground), so it sets
    // no background of its own. Rhythm and head spacing: Open Flow, 4 Nov 2026.
    <section id="assessment" className="sec overflow-hidden">
      {/* Dots open each light run (left after the image band). */}
      <DotField tone="light" mask="left" coverage={0.42} intensity={0.6} seed={9} />
      <div className="sec-inner">
        <SectionHead
          eyebrow="Next steps"
          title={<>Ready to build AI into <span className="hl">your existing operations?</span></>}
          intro="Whether you are exploring how your business uses AI or already know which process needs improving, Maru Online can help you identify a practical way forward."
        />

        {/* Card build, 5 Nov 2026: same as the capability cards (navy grid
            header carrying the title, body below). The review leads with the
            primary button; the project card uses a text link. */}
        <StaggerParent className="cta-cards">
          {/* ── Route 1: the free, informational POPIA review ─────────────── */}
          <StaggerChild className="h-full">
            <article className="card-lift h-full flex flex-col overflow-hidden">
              <DrawnVisual
                title="Start with the free, informational POPIA review."
                className="cta-card-visual"
              />
              <div className="card-body">
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
                  <Button href={ASSESSMENT_HREF} variant="primary" className="w-full sm:w-auto">
                    Take the free POPIA review
                  </Button>
                </div>
              </div>
            </article>
          </StaggerChild>

          {/* ── Route 2: a project conversation ─────────────────────────── */}
          <StaggerChild className="h-full">
            <article className="card-lift h-full flex flex-col overflow-hidden">
              <DrawnVisual title="Already have a project in mind?" className="cta-card-visual" />
              <div className="card-body">
                <p className="card-text">
                  Tell us about the business challenge or workflow you want to improve.
                </p>
                <Link href={CONTACT_HREF} className="card-action min-h-[44px] focus-visible:outline-none">
                  Discuss your challenge
                  <span className="card-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </StaggerChild>
        </StaggerParent>
      </div>
    </section>
  );
}
