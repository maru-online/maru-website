import Button from '@/components/ui/Button'
import { FadeUp } from '@/components/ui/Animate'
import { GUIDE_PATH } from '@/lib/guides/config'

/**
 * Homepage guide strip — copy handover entry 19 §11 (approved 8 Oct 2026),
 * verbatim. Near the bottom, below the final assessment section: the hero
 * keeps one CTA, and the guide catches visitors who are interested but not
 * ready to answer ten questions. Secondary button, never primary.
 *
 * Rendered only when GUIDE_HOMEPAGE_STRIP is true (lib/guides/config.ts). §11
 * order of build puts it last, after the guide page and privacy policy are live.
 */
export default function GuideStrip() {
  return (
    <section className="px-6 md:px-[60px] py-16" style={{ background: 'var(--gradient-surface)' }}>
      <FadeUp>
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="label-eyebrow-ochre">Free guide</span>
            <p className="text-ink-primary font-semibold text-lg leading-snug mb-2">
              Not ready for the check? Start with the guide.
            </p>
            <p className="body-muted text-base leading-relaxed mb-0 max-w-[560px]">
              What AI tools do with client information, and what POPIA expects of you. 16 pages, about ten minutes.
            </p>
          </div>
          <Button href={GUIDE_PATH} variant="secondary" className="shrink-0">
            Get the guide
          </Button>
        </div>
      </FadeUp>
    </section>
  )
}
