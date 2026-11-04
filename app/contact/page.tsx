import { Metadata } from 'next'
import ContactFormWithRecaptcha from './ContactFormWithRecaptcha'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { FadeUp } from '@/components/ui/Animate'
import { BGPattern } from '@/components/ui/bg-pattern'
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  title:       'Contact | Maru Online',
  description: "Maru Online helps South African businesses solve operational problems by connecting AI, data and the tools their teams already use. Tell us about the business challenge you want to improve.",
  ...seo('/contact'),
}

const outerPad    = 'px-6 md:px-[60px]'
const innerWide   = 'max-w-[1100px] mx-auto'

export default function ContactPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative min-h-[60vh] flex items-center overflow-hidden ${outerPad} pt-48 pb-32`}
        style={{ backgroundColor: 'var(--color-bg-navy)' }}
      >
        <BGPattern
          variant="grid"
          mask="none"
          size={40}
          fill="rgba(61, 184, 198, 0.12)"
          className="z-0"
        />
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            top:           '-120px',
            right:         '-120px',
            width:         '480px',
            height:        '480px',
            borderRadius:  '50%',
            border:        '1px solid rgba(61,184,198,0.15)',
            pointerEvents: 'none',
          }}
        />
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <span className="label-eyebrow">Contact Maru Online</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split" style={{ marginBottom: '2rem' }}>
              <span className="maru-headline-split-light">Let&apos;s discuss your</span>
              <br />
              <span className="maru-headline-split-strong">business challenge.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="body-on-navy" style={{ maxWidth: '680px', marginBottom: '1rem' }}>
              Tell us about the operational challenge you are facing. We will assess whether a POPIA-aware AI or systems-integration approach could help, taking relevant privacy and information-handling requirements into account.
            </p>
            <p className="body-on-navy" style={{ maxWidth: '680px', marginBottom: 0 }}>
              You do not need to have a technical solution in mind. Start with the process, problem, or recurring task you want to improve.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CONTACT FORM + SIDE INFO
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-form"
        className={`${outerPad} py-24`}
        style={{ background: 'var(--gradient-surface)' }}
      >
        <div className={innerWide}>
          <div className="card-lift card-static p-8 md:p-12">
            {/* Two-column grid starts here — aligned to first form field */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-10 md:gap-24 items-start">

              {/* Left — form */}
              <div>
                <ContactFormWithRecaptcha />
              </div>

              {/* Right — email only (22 Oct 2026: WhatsApp, the plural
                  "Other ways to reach us" heading and business hours removed) */}
              <div style={{ paddingTop: '0.5rem' }} className="md:sticky md:top-24 md:self-start">
                <div>
                  <p
                    style={{
                      fontFamily:    'var(--font-body)',
                      fontSize:      'var(--text-label)',
                      fontWeight:    500,
                      letterSpacing: 'var(--tracking-eyebrow)',
                      textTransform: 'uppercase',
                      color:         'var(--color-ink-tertiary)',
                      marginBottom:  '0.25rem',
                    }}
                  >
                    Maru Online
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize:   'var(--text-body-sm)',
                      fontWeight: 300,
                      color:      'var(--color-ink-secondary)',
                      margin:     '0 0 0.25rem',
                    }}
                  >
                    Gauteng, South Africa
                  </p>
                  <TrackedLink
                    href="mailto:hello@maruonline.com"
                    event="email_click"
                    eventData={{ source: 'contact_page' }}
                    style={{
                      fontFamily:     'var(--font-body)',
                      fontSize:       'var(--text-body)',
                      fontWeight:     300,
                      color:          'var(--color-cyan-ink)',
                      textDecoration: 'none',
                      display:        'block',
                      marginBottom:   '0.25rem',
                    }}
                  >
                    hello@maruonline.com
                  </TrackedLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
