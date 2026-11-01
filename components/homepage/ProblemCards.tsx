'use client'

/**
 * Section 2 problem cards (homepage).
 *
 * Blended UI, 1 Nov 2026: tinted "paper" cards, each in its own brand tint, with
 * a slight tilt. The cards arrive straight and spring into their tilt one after
 * another (the mess appearing); on hover a card straightens and lifts. Short
 * bullets, not paragraphs, so the message lands on a skim. One gold hand-mark,
 * on "manual intervention". Transform and opacity only; reduced-motion visitors
 * get the final state with no movement.
 */

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import Glyph from '@/components/ui/Glyph'
import HandMark from '@/components/ui/HandMark'

type Card = {
  icon: 'unlink' | 'hourglass' | 'shield'
  tint: 'paper-blue' | 'paper-gold' | 'paper-teal'
  tilt: number
  heading: string
  points: string[]
}

const CARDS: Card[] = [
  {
    icon: 'unlink',
    tint: 'paper-blue',
    tilt: -1.2,
    heading: 'Disconnected Business Systems',
    points: [
      'Information sits in separate applications.',
      'Handoffs depend on manual intervention.',
      'Little visibility across the business.',
    ],
  },
  {
    icon: 'hourglass',
    tint: 'paper-gold',
    tilt: 0.8,
    heading: 'Manual Data Processing',
    points: [
      'Repeated data entry takes up staff time.',
      'Routine admin tasks add up.',
      'More manual work means more errors.',
    ],
  },
  {
    icon: 'shield',
    tint: 'paper-teal',
    tilt: -0.6,
    heading: 'Data Governance and POPIA Risks',
    points: [
      'Personal information is scattered.',
      'Handling is inconsistent.',
      'Access, consent and protection are harder to manage.',
    ],
  },
]

const ease = [0.22, 1, 0.36, 1] as const
const MARKED = 'Handoffs depend on manual intervention.'

const parent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const card: Variants = {
  hidden: { opacity: 0, y: 28, rotate: 0 },
  visible: (tilt: number) => ({
    opacity: 1,
    y: 0,
    rotate: tilt,
    transition: { type: 'spring', stiffness: 140, damping: 16 },
  }),
}

export default function ProblemCards() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8"
      variants={parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {CARDS.map((c) => (
        <motion.div
          key={c.heading}
          custom={c.tilt}
          variants={card}
          whileHover={reduce ? undefined : { rotate: 0, y: -4, transition: { duration: 0.3, ease } }}
          className={`paper-card prob-card ${c.tint} h-full`}
          style={{ padding: '2rem 1.875rem' }}
        >
          <span className="paper-icon" style={{ display: 'flex', marginBottom: '1.125rem' }}>
            <Glyph name={c.icon} size={22} />
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
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
              <li key={p}>
                <span className="prob-dot" aria-hidden="true" />
                <span>
                  {p === MARKED ? (
                    <>Handoffs depend on <HandMark>manual intervention.</HandMark></>
                  ) : (
                    p
                  )}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  )
}
