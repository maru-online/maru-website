import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { BGPattern } from '@/components/ui/bg-pattern'
import { FadeUp } from '@/components/ui/Animate'
import { BookingTracker } from '@/components/analytics/BookingTracker'
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  title:       'Book a Discovery Call | Maru Online',
  description: 'Schedule a free 30-minute discovery call with Jimmy. We\'ll have reviewed your assessment before we speak.',
  ...seo('/booking'),
}

const outerPad = 'px-6 md:px-[60px]'
const inner    = 'max-w-[760px] mx-auto'

export default function BookingPage() {
  const { baseUrl, widgetOptions } = siteConfig.calendly
  const calendlyUrl = `${baseUrl}?hide_gdpr_banner=${widgetOptions.hideGdprBanner ? 1 : 0}&background_color=${widgetOptions.backgroundColor}&text_color=${widgetOptions.textColor}&primary_color=${widgetOptions.primaryColor}`

  return (
    <>
      <BookingTracker />

      {/* ── Hero ── */}
      <section
        className={`relative ${outerPad} pt-48 pb-16`}
        style={{ backgroundColor: 'var(--color-bg-navy)' }}
      >
        <BGPattern
          variant="grid"
          mask="none"
          size={40}
          fill="rgba(61, 184, 198, 0.12)"
          className="z-0"
        />
        <div className={`${inner} relative z-10`}>
          <FadeUp>
            <span className="label-eyebrow">Book a call</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split">
              <span className="maru-headline-split-strong">Book a 20-Minute</span>
              <br />
              <span className="maru-headline-split-light">Discovery Call</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p
              className="font-body font-light"
              style={{
                color:      'var(--color-ink-inverted-muted)',
                fontSize:   'var(--text-body-sm)',
                lineHeight: 'var(--leading-body)',
                marginBottom: 0,
              }}
            >
              We&apos;ll have reviewed your assessment before we speak.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Calendly widget ── */}
      <section
        className={`${outerPad} py-16`}
        style={{ background: 'var(--gradient-surface)' }}
      >
        <div className={inner}>
          <FadeUp>
            <div className="card-lift"
              style={{
                borderRadius: '8px',
                overflow:     'hidden',
                padding:      '1rem',
              }}
            >
              <div
                className="calendly-inline-widget"
                data-url={calendlyUrl}
                style={{ minWidth: '320px', height: '700px' }}
              />
            </div>
          </FadeUp>
        </div>
      </section>

    </>
  )
}
