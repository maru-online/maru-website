import { TrackedLink } from "@/components/analytics/TrackedLink";
import GuideBook from "@/components/ui/GuideBook";
import { GUIDE_COVER, guideHref, type GuideSource } from "@/lib/guides/config";

/**
 * The downloadable guide on Guides & Resources (5 Nov 2026): a navy panel with
 * the grid, the guide shown as a book, and one button to its landing page.
 * It replaces the guide's card in the resources grid, so the one downloadable
 * guide stands apart from the web guides it is being compared with.
 */
export default function GuidePromo({ location }: { location: GuideSource }) {
  return (
    <aside className="guide-promo on-navy" aria-labelledby="guide-promo-title">
      <div className="grid-motif grid-motif-feature" aria-hidden="true" />
      <GuideBook src={GUIDE_COVER} alt="Cover of the guide AI and POPIA" width={230} />
      <div>
        <span className="label-eyebrow" style={{ marginBottom: "1rem" }}>Free guide · PDF</span>
        <h2 id="guide-promo-title" className="guide-promo-title">
          AI and POPIA: a guide for South African business owners
        </h2>
        <p className="body-on-navy" style={{ margin: 0, maxWidth: "36rem" }}>
          What your team’s AI tools do with client information, and what POPIA expects of you.
        </p>
        <ul className="guide-promo-meta">
          <li>16 pages</li>
          <li>About 15 minutes</li>
          <li>Ends with a one-page self-check</li>
        </ul>
        <TrackedLink
          href={guideHref(location)}
          event="guide_promo_click"
          eventData={{ guide: "ai-and-popia", location }}
          className="btn btn-primary"
        >
          Get the free guide
          <span className="btn-arrow" aria-hidden="true">→</span>
        </TrackedLink>
      </div>
    </aside>
  );
}
