import type { ReactNode } from "react";
import { FadeUp } from "@/components/ui/Animate";

/**
 * The one page hero (5 Nov 2026): eyebrow, H1, one sentence. The explanation
 * belongs to the page below, not the hero. Height comes from content and the
 * .page-hero padding, never from the viewport, so heroes stay compact and the
 * first section shows above the fold.
 *
 * `actions` is for the homepage only (the one hero with buttons).
 * `aside` puts one visual beside the copy on wide screens (the guide's book).
 */
export default function PageHero({
  eyebrow,
  light,
  strong,
  lead,
  actions,
  aside,
}: {
  eyebrow: string;
  /** First line of the H1, light weight. */
  light: string;
  /** Second line of the H1, strong weight. */
  strong: string;
  /** One sentence. */
  lead: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  const copy = (
    <div>
        <FadeUp>
          <span className="label-eyebrow page-hero-eyebrow">{eyebrow}</span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1 className="maru-headline-split page-hero-title">
            <span className="maru-headline-split-light">{light}</span>
            <br />
            <span className="maru-headline-split-strong">{strong}</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="body-on-navy page-hero-lead">{lead}</p>
        </FadeUp>
        {actions && (
          <FadeUp delay={0.22}>
            <div className="page-hero-actions">{actions}</div>
          </FadeUp>
        )}
    </div>
  );
  return (
    <section className="page-hero navy-horizon hero-grid relative overflow-hidden">
      <div className="sec-inner">
        {aside ? (
          <div className="page-hero-split">
            {copy}
            <FadeUp delay={0.12}>{aside}</FadeUp>
          </div>
        ) : (
          copy
        )}
      </div>
    </section>
  );
}
