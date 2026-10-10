import { FaqJsonLd } from '@/components/seo/JsonLd'
import Link from 'next/link'
import { FadeUp } from '@/components/ui/Animate'
import { GUIDE_PATH, GUIDE_SECONDARY_LINKS } from '@/lib/guides/config'

/**
 * Homepage FAQ, copy handover entry 14 (approved 6 Oct 2026), verbatim.
 *
 * Rules from the entry:
 * - Answers state a commitment or a boundary, never Maru's method. No new
 *   figures, prices, tool names or extra questions without Jimmy's approval.
 * - The FAQPage JSON-LD is generated from this same array, so the markup and
 *   the visible copy cannot drift apart.
 * - Native <details>/<summary>: keyboard operable, one question per control,
 *   and every answer is in the server HTML and opens without JavaScript.
 *
 * TODO (entry 14): link "Our privacy policy" in the second answer once the
 * redrafted, adviser-reviewed privacy policy exists.
 */
export const HOME_FAQ: { q: string; a: string; guideLink?: boolean }[] = [
  {
    q: 'Is the assessment really free?',
    a: "Yes. No obligation. If there's no clear opportunity, we'll tell you.",
  },
  {
    q: 'What happens to my answers?',
    a: "They're used only to prepare your report and, if you go ahead, your proposal. Our privacy policy explains how they're handled.",
  },
  {
    q: 'How much does it cost?',
    a: 'Priced per project, in a proposal you see before we start. No hourly billing.',
  },
  {
    q: 'How long does it take?',
    a: 'Your first workflow is live in about 30 days from kick-off.',
  },
  {
    q: 'Do we need new software or an IT person?',
    a: 'No IT person needed. We work with the systems you already pay for, and tell you before you commit if anything new is needed.',
  },
  {
    q: 'Can you make us POPIA compliant?',
    a: "No supplier can promise that, because the responsibility stays with your business. We build with POPIA in mind, and for legal advice we'd point you to your own adviser.",
    // Entry 19 §11 "other placements" (approved 8 Oct): may end with
    // "Start with our free guide". Shown only when GUIDE_SECONDARY_LINKS is on.
    guideLink: true,
  },
]

const outerPad = 'px-6 md:px-[60px]'
const inner = 'max-w-[900px] mx-auto'

export default function HomeFaq() {
  return (
    <section
      id="faq"
      className={`${outerPad} py-24`}
      style={{ background: 'var(--gradient-surface)' }}
    >
      <FaqJsonLd items={HOME_FAQ} />
      <div className={inner}>
        <FadeUp>
          <h2 style={{ marginBottom: 'var(--space-section-header-mb)' }}>Common questions</h2>
        </FadeUp>

        <div className="faq-list">
          {HOME_FAQ.map((item) => (
            <details key={item.q} className="faq-item">
              <summary className="faq-summary">
                <span className="faq-q">{item.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="body-muted faq-a">
                {item.a}
                {item.guideLink && GUIDE_SECONDARY_LINKS && (
                  <>
                    {' '}
                    <Link href={GUIDE_PATH} className="text-cyan-ink underline hover:no-underline">
                      Start with our free guide
                    </Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
