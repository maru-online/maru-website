import type { CSSProperties, ReactNode } from "react";

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
        <span className="label-eyebrow page-hero-eyebrow hero-rise">{eyebrow}</span>
        <div className="hero-rise" style={{ "--rise-delay": "0.06s" } as CSSProperties}>
          <h1 className="maru-headline-split page-hero-title">
            <span className="maru-headline-split-light">{light}</span>
            <br />
            <span className="maru-headline-split-strong">{strong}</span>
          </h1>
        </div>
        <div className="hero-rise" style={{ "--rise-delay": "0.12s" } as CSSProperties}>
          <p className="body-on-navy page-hero-lead">{lead}</p>
        </div>
        {actions && (
          <div className="hero-rise" style={{ "--rise-delay": "0.18s" } as CSSProperties}>
            <div className="page-hero-actions">{actions}</div>
          </div>
        )}
    </div>
  );
  return (
    <section className="page-hero navy-horizon hero-grid relative overflow-hidden">
      <div className="sec-inner">
        {aside ? (
          <div className="page-hero-split">
            {copy}
            <div className="hero-rise" style={{ "--rise-delay": "0.1s" } as CSSProperties}>{aside}</div>
          </div>
        ) : (
          copy
        )}
      </div>
    </section>
  );
}
