'use client'

/**
 * Section 2 problem cards (homepage). Production card design (restored
 * 2 Nov 2026, replacing the tinted paper cards); copy from the revised
 * website copy handover, tightened for bullets.
 *
 * Short bullets, not paragraphs, so the message lands on a skim. Motion is
 * transform and opacity only: the card rises, its cyan top edge draws across,
 * then the bullets arrive one after another. Under prefers-reduced-motion the
 * final state renders with no movement.
 */

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import Glyph from '@/components/ui/Glyph'

type Card = {
  icon: 'unlink' | 'hourglass' | 'shield'
  heading: string
  points: string[]
}

const CARDS: Card[] = [
  {
    icon: 'unlink',
    heading: 'Disconnected business systems',
    points: [
      'Information sits in separate applications.',
      'Handoffs depend on manual intervention.',
      'Teams have limited visibility across the business.',
    ],
  },
  {
    icon: 'hourglass',
    heading: 'Manual data processing',
    points: [
      'Repeated data entry takes up staff time.',
      'Routine administration adds up.',
      'More manual work, more room for error.',
    ],
  },
  {
    icon: 'shield',
    heading: 'Data governance and POPIA considerations',
    points: [
      'Personal information is spread across systems and channels.',
      'Handling practices are inconsistent.',
      'Access, consent, retention, and protection are harder to manage.',
    ],
  },
]

const ease = [0.25, 0.1, 0.25, 1] as const

export default function ProblemCards() {
  const reduce = useReducedMotion()

  const parent: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: 0.05 } },
  }
  const card: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6, ease, staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.35 } },
  }
  const edge: Variants = {
    hidden: reduce ? { scaleX: 1 } : { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: reduce ? 0 : 0.7, ease, delay: reduce ? 0 : 0.15 } },
  }
  const bullet: Variants = {
    hidden: reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: reduce ? 0 : 0.45, ease } },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {CARDS.map((c) => (
        <motion.div key={c.heading} variants={card} className="h-full">
          <div
            className="card-lift prob-card h-full relative overflow-hidden"
            style={{
              border: '0.5px solid var(--color-border-card)',
              borderRadius: '8px',
              padding: '1.75rem 1.5rem 1.5rem',
            }}
          >
            <motion.span
              aria-hidden="true"
              variants={edge}
              className="absolute left-0 right-0 top-0 block"
              style={{ height: '3px', background: 'var(--color-cyan)', transformOrigin: 'left center' }}
            />
            <span className="glyph-chip" style={{ marginBottom: '1rem' }}>
              <Glyph name={c.icon} size={22} />
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 'var(--text-h3-sans)',
                color: 'var(--color-ink-primary)',
                marginBottom: '0.875rem',
                lineHeight: 'var(--leading-subheading)',
              }}
            >
              {c.heading}
            </h3>
            <ul className="prob-list">
              {c.points.map((p) => (
                <motion.li key={p} variants={bullet}>
                  <span className="prob-dot" aria-hidden="true" />
                  <span>{p}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
