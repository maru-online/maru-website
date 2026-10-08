import type { Metadata } from "next";
import { FadeUp } from "@/components/ui/Animate";
import { BGPattern } from "@/components/ui/bg-pattern";
import { seo } from "@/lib/seo";
import { GUIDE_INDEXABLE, GUIDE_PATH } from "@/lib/guides/config";
import GuideForm from "./GuideForm";

/**
 * /guides/ai-and-popia — lead magnet landing page.
 * Copy handover entry 19 §1–§2, verbatim (approved for preview build 8 Oct
 * 2026). noindex until Jimmy flips GUIDE_INDEXABLE after the §10 release
 * gates. Not linked from the hero (§1); the homepage strip and FAQ link sit
 * behind flags in lib/guides/config.ts.
 */
export const metadata: Metadata = {
  title: "AI and POPIA: A Guide for South African Business Owners | Maru Online",
  description: "A short guide to what AI tools do with client information and what POPIA expects of you. Free.",
  ...seo(GUIDE_PATH),
  ...(GUIDE_INDEXABLE ? {} : { robots: { index: false, follow: false } }),
};

const outerPad = "px-6 md:px-[60px]";
const innerWide = "max-w-[1100px] mx-auto";

const INSIDE = [
  "AI in your business: what your team is probably already using.",
  "Where client information goes: contracts, and what happens offshore.",
  "Who can see it: logins, recordings and connected apps.",
  "Permission and trust: purpose, automated decisions and marketing.",
  "If something goes wrong: who you tell, and how.",
];

export default function GuidePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className={`relative flex items-center ${outerPad} pt-48 pb-24`}
        style={{ backgroundColor: "var(--color-bg-navy)" }}
      >
        <BGPattern variant="grid" mask="none" size={40} fill="rgba(61, 184, 198, 0.12)" className="z-0" />
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <span className="label-eyebrow">Free guide</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split">
              <span className="maru-headline-split-strong">AI and POPIA:</span>{" "}
              <span className="maru-headline-split-light">a guide for South African business owners</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p
              className="font-body font-light max-w-[620px]"
              style={{
                color: "var(--color-ink-inverted-muted)",
                fontSize: "var(--text-body)",
                lineHeight: "var(--leading-body)",
                marginBottom: 0,
              }}
            >
              What your team&apos;s AI tools do with client information, and what POPIA expects of you. 16 pages, about ten minutes to read.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── What's inside + form ─────────────────────────────────────────── */}
      <section className={`${outerPad} py-24`} style={{ background: "var(--gradient-surface)" }}>
        <div className={`${innerWide} grid grid-cols-1 md:grid-cols-[1fr_420px] gap-12 md:gap-20 items-start`}>
          <FadeUp>
            <div>
              <h2 style={{ marginBottom: "1.5rem" }}>What&apos;s inside</h2>
              <ul className="list-none m-0 p-0 flex flex-col gap-4 mb-8">
                {INSIDE.map((line) => (
                  <li key={line} className="flex gap-3 items-start">
                    <span className="bullet-cyan" style={{ marginTop: "10px" }} aria-hidden="true" />
                    <span className="text-ink-secondary text-base leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
              <p className="text-ink-primary text-base leading-relaxed mb-4">
                Ends with a one-page self-check you can print or screenshot.
              </p>
              <p className="body-muted text-sm leading-relaxed">This is general information, not legal advice.</p>
            </div>
          </FadeUp>

          <div className="card-lift p-8 md:p-10 relative">
            <GuideForm />
          </div>
        </div>
      </section>
    </>
  );
}
