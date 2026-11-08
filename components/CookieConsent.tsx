'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  getCookieChoice,
  setCookieChoice,
  setCookieBannerVisible,
  OPEN_COOKIE_PREFERENCES_EVENT,
  type CookieChoice,
} from '@/lib/cookie-consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  // "Manage Cookie Preferences" (footer, cookie policy) reopens the banner so a
  // visitor can change their choice. Nothing listened for this event before.
  useEffect(() => {
    const open = () => {
      setVisible(true)
      setCookieBannerVisible(true)
    }
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, open)
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, open)
  }, [])

  useEffect(() => {
    if (!getCookieChoice()) {
      const timer = setTimeout(() => {
        setVisible(true)
        // Tell the floating WhatsApp bubble to stand down — it otherwise paints
        // over this banner's DECLINE button. See lib/cookie-consent.ts.
        setCookieBannerVisible(true)
      }, 800)
      return () => {
        clearTimeout(timer)
        setCookieBannerVisible(false)
      }
    }
  }, [])

  function dismiss(choice: CookieChoice) {
    setCookieChoice(choice)
    setVisible(false)
    setCookieBannerVisible(false)
  }

  const accept  = () => dismiss('accepted')
  const decline = () => dismiss('declined')

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="on-navy"
      style={{
        position:        'fixed',
        bottom:          '2rem',
        left:            '2rem',
        zIndex:          9999,
        width:           '300px',
        backgroundColor: 'var(--color-bg-navy)',
        border:          '1px solid rgba(61, 184, 198, 0.25)',
        borderRadius:    '8px',
        padding:         '1.5rem',
        boxShadow:       '0 8px 32px rgba(13, 27, 42, 0.4)',
      }}
    >
      <p
        style={{
          fontFamily:   'var(--font-body)',
          fontSize:     'var(--text-body-sm)',
          fontWeight:   500,
          color:        'var(--color-ink-inverted)',
          lineHeight:   'var(--leading-subheading)',
          marginBottom: '0.5rem',
        }}
      >
        We use cookies
      </p>
      <p
        style={{
          fontFamily:   'var(--font-body)',
          fontSize:     'var(--text-meta)',
          fontWeight:   300,
          color:        'var(--color-ink-inverted-muted)',
          lineHeight:   'var(--leading-body)',
          marginBottom: '1.25rem',
        }}
      >
        We use cookies to improve your experience and analyse site traffic. See our{' '}
        <Link
          href="/cookie-policy"
          style={{
            color:          'var(--color-cyan)',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
        >
          Cookie Policy
        </Link>
        .
      </p>

      {/* Site button system (5 Nov 2026). Accept and Decline carry equal
          weight on purpose: the banner should not nudge either choice. */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button type="button" onClick={accept} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
          Accept
        </button>
        <button type="button" onClick={decline} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
          Decline
        </button>
      </div>
    </div>
  )
}
