import Link from 'next/link'
import { CASE_STUDY_LIVE, caseStudyLink } from '@/lib/case-study'

/**
 * Homepage proof block, placed after the services grid.
 *
 * Copy handover entry 04 (approved 5 Oct 2026), verbatim. A build
 * description, not a figure: Jimmy has no client-cleared number. Do NOT add the
 * beneficiary results shown on growthiq.co.za (31% revenue growth, mentorship
 * sessions): those are the client's outcomes, not outcomes of Maru's build.
 * The AI guide is live at the gap assessment stage only, so the copy must not
 * claim AI guidance across the whole programme. No outbound link to GrowthIQ's
 * own site (no outbound links in page bodies, 7 Oct 2026).
 */
export function CaseStudyProofStrip() {
  return (
    <div
      className="card-lift"
      style={{
        border:       '1px solid var(--color-border-card)',
        borderRadius: '8px',
        padding:      '2rem',
      }}
    >
      <span
        style={{
          fontFamily:    'var(--font-body)',
          fontSize:      'var(--text-label)',
          fontWeight:    500,
          letterSpacing: 'var(--tracking-eyebrow)',
          textTransform: 'uppercase',
          color:         'var(--color-ink-tertiary)',
        }}
      >
        Proof
      </span>

      <h3 style={{ marginTop: '0.75rem', marginBottom: '1rem', border: 'none', paddingBottom: 0 }}>
        What it looks like when it&apos;s connected
      </h3>

      <p className="body-muted" style={{ maxWidth: '720px', marginBottom: '0.75rem' }}>
        We built GrowthIQ, a platform for managing corporate enterprise and supplier development (ESD) spend. Corporates that fund ESD need to show the money reached real small businesses. GrowthIQ keeps that record in one live system, updated as the work happens, so reporting no longer means rebuilding it every cycle.
      </p>
      <p className="body-muted" style={{ maxWidth: '720px', marginBottom: 0 }}>
        Programme managers see beneficiaries, evidence and deadlines in one place. An AI guide walks each small-business beneficiary through their gap assessment.
      </p>

      <div style={{ marginTop: '1.25rem' }}>
        {CASE_STUDY_LIVE && (
        <Link
          href={caseStudyLink('homepage')}
          style={{
            fontFamily:     'var(--font-body)',
            fontSize:       'var(--text-cta)',
            fontWeight:     600,
            letterSpacing:  'var(--tracking-label)',
            textTransform:  'uppercase',
            color:          'var(--color-cyan-ink)',
            textDecoration: 'none',
          }}
        >
          Read the GrowthIQ build →
        </Link>
        )}
      </div>
    </div>
  )
}
