import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FadeUp } from "@/components/ui/Animate";
import { seo } from "@/lib/seo";
import {
  GUIDE_COVER,
  GUIDE_INDEXABLE,
  GUIDE_LIVE,
  GUIDE_PAGE_VISIBLE,
  GUIDE_PATH,
  GUIDE_PREVIEW_PAGES,
  guideSourceFrom,
} from "@/lib/guides/config";
import GuideForm from "./GuideForm";
import DotField from "@/components/ui/DotField";
import PageHero from "@/components/ui/PageHero";
import GuideBook from "@/components/ui/GuideBook";
import SectionHead from "@/components/ui/SectionHead";

/**
 * /guides/ai-and-popia — lead magnet landing page.
 * Restyled 5 Nov 2026 with the redesigned guide: the shared hero with the
 * guide shown as a book, what's inside, two inside pages, and the request
 * form (copy handover entry 19 §2–§4). noindex until the owner flips
 * GUIDE_INDEXABLE after the §10 release gates.
 */
export const metadata: Metadata = {
  title: "AI and POPIA: A Guide for South African Business Owners | Maru Online",
  description: "A free 16-page guide to what AI tools do with client information and what POPIA expects of you.",
  ...seo(GUIDE_PATH),
  ...(GUIDE_INDEXABLE ? {} : { robots: { index: false, follow: false } }),
};

const PARTS = [
  { title: "AI in your business", text: "Which AI tools your team is probably already using, and what goes into them." },
  { title: "Where client information goes", text: "Contracts with AI providers, and when information may go offshore." },
  { title: "Who can see it", text: "Shared logins, meeting recordings and connected apps." },
  { title: "Permission and trust", text: "Purpose, decisions made by machines, and AI-written marketing." },
  { title: "If something goes wrong", text: "Who you tell, how, and how quickly." },
];

export default async function GuidePage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  if (!GUIDE_PAGE_VISIBLE) notFound();
  // Where the visitor came from (?from=), for the lead and download events.
  const source = guideSourceFrom((await searchParams).from);
  return (
    <>
      <PageHero
        eyebrow="Free guide · 16 pages"
        light="AI and POPIA:"
        strong="a guide for South African business owners."
        lead="What your team’s AI tools do with client information, and what POPIA expects of you."
        aside={<GuideBook src={GUIDE_COVER} alt="Cover of the guide AI and POPIA" width={300} priority className="mx-auto" />}
      />

      <section className="sec flow-ground overflow-hidden">
        <DotField tone="light" mask="right" coverage={0.42} intensity={0.6} seed={4} />
        <div className="sec-inner guide-landing">
          <div className="guide-landing-form">
            <div className="card-lift card-static p-8 md:p-10 relative">
              <GuideForm live={GUIDE_LIVE} source={source} />
            </div>
          </div>

          <div className="guide-landing-body">
            <SectionHead
              eyebrow="What’s inside"
              title={<>A short guide in five parts, <span className="hl">with a one-page self-check.</span></>}
              intro="Plain language, no legal jargon. About 15 minutes to read."
            />
            <FadeUp>
              <ol className="guide-parts">
                {PARTS.map((p, i) => (
                  <li key={p.title}>
                    <span className="guide-part-num" aria-hidden="true">{i + 1}</span>
                    <div>
                      <h3 className="card-title" style={{ marginBottom: "0.25rem" }}>{p.title}</h3>
                      <p className="card-text" style={{ margin: 0 }}>{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </FadeUp>

            <FadeUp>
              <h3 className="card-title" style={{ marginTop: "3rem" }}>Look inside</h3>
              <div className="guide-pages">
                {GUIDE_PREVIEW_PAGES.map((pg) => (
                  <figure key={pg.src} className="guide-page">
                    <Image src={pg.src} alt={pg.alt} width={794} height={1123} sizes="(min-width: 1024px) 260px, 45vw" />
                  </figure>
                ))}
              </div>
              <p className="body-muted" style={{ fontSize: "var(--text-meta)", marginTop: "1.5rem" }}>
                This is general information, not legal advice.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
