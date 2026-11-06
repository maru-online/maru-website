import { Metadata } from 'next'
import ContactFormWithRecaptcha from './ContactFormWithRecaptcha'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { seo } from '@/lib/seo'
import DotField from "@/components/ui/DotField";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title:       'Contact | Maru Online',
  description: "Maru Online helps South African businesses resolve operational problems by connecting AI, data and the tools their teams already use. Tell us about the business challenge you want to improve.",
  ...seo('/contact'),
}

const innerWide   = 'max-w-[1100px] mx-auto'

export default function ContactPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════════ */}
      <PageHero
        eyebrow="Contact Maru Online"
        light="Discuss your"
        strong="business challenge."
        lead="Tell us what you want to resolve. We will reply with a suggested next step."
      />

      {/* ════════════════════════════════════════════════════════════════════
          CONTACT FORM + SIDE INFO
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-form"
        className="sec flow-ground overflow-hidden"
      >
        <DotField tone="light" mask="right" coverage={0.42} intensity={0.6} seed={4} />
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
