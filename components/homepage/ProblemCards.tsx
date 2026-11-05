'use client'

/**
 * Section 2 problem cards (homepage). Production card surface with the
 * reading-system anatomy (3 Nov 2026): label row, title, bullets at card-text
 * size. Copy from the revised website copy handover, tightened for bullets.
 *
 * Short bullets, not paragraphs, so the message lands on a skim. Motion is
 * transform and opacity only: the card rises, its cyan top edge draws across,
 * then the bullets arrive one after another. Under prefers-reduced-motion the
 * final state renders with no movement.
 */

import { motion, type Variants } from 'framer-motion'
import { DrawnVisual, TreatedImage } from '@/components/ui/CardMedia'

type Card = {
  icon: 'unlink' | 'hourglass' | 'shield'
  /** Photograph for the top band; the drawn icon band shows until one exists. */
  image?: { src: string; alt: string; position?: string }
  heading: string
  points: string[]
}

const CARDS: Card[] = [
  {
    icon: 'unlink',
    heading: 'Disconnected business systems',
    image: {
      src: '/images/home/problem-disconnected.jpg',
      alt: 'A woman at her office desk comparing a printed spreadsheet with her laptop, monitor and phone',
      position: '50% 40%',
    },
    points: [
      'Information sits in separate applications.',
      'Handoffs depend on manual intervention.',
      'Teams have limited visibility across the business.',
    ],
  },
  {
    icon: 'hourglass',
    heading: 'Manual data processing',
    image: {
      src: '/images/home/problem-manual.jpg',
      alt: 'Hands typing figures from a stack of paper invoices into a laptop, beside a calculator',
      position: '62% 55%',
    },
    points: [
      'Repeated data entry takes up staff time.',
      'Routine administration adds up.',
      'More manual work, more room for error.',
    ],
  },
  {
    icon: 'shield',
    heading: 'Data governance and POPIA considerations',
    // Source came back letterboxed; this is the 1376x378 strip without the bars.
    image: {
      src: '/images/home/problem-governance.jpg',
      alt: 'A person filing a folder of documents into an open drawer of a steel filing cabinet',
      position: '55% 50%',
    },
    points: [
      'Personal information is spread across systems and channels.',
      'Handling practices are inconsistent.',
      'Access, consent, retention, and protection are harder to manage.',
    ],
  },
]

const ease = [0.25, 0.1, 0.25, 1] as const

export default function ProblemCards() {
  // Variants are the same on the server and in the browser. Branching on
  // useReducedMotion() here caused a hydration mismatch (it is null on the
  // server). Reduced motion is handled site-wide by MotionConfig
  // reducedMotion="user" (MotionProvider): movement is skipped, so cards and
  // bullets simply appear.
  const parent: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
  }
  const card: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, staggerChildren: 0.1, delayChildren: 0.35 } },
  }
  const edge: Variants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.7, ease, delay: 0.15 } },
  }
  const bullet: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
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
          <div className="card-lift prob-card h-full relative overflow-hidden flex flex-col">
            <motion.span
              aria-hidden="true"
              variants={edge}
              className="absolute left-0 right-0 top-0 block"
              style={{ height: '3px', background: 'var(--color-cyan)', transformOrigin: 'left center', zIndex: 1 }}
            />
            {/* Top band, as on the Guides cards: the photograph, or the drawn
                icon band until one exists. Same 176px height either way. */}
            {c.image ? (
              <TreatedImage
                src={c.image.src}
                alt={c.image.alt}
                sizes="(min-width: 768px) 360px, 100vw"
                position={c.image.position}
                className="h-44 w-full"
              />
            ) : (
              <DrawnVisual glyph={c.icon} glyphSize={40} className="h-44 w-full" />
            )}
            <div className="card-body">
            <h3 className="card-title">{c.heading}</h3>
            <ul className="prob-list">
              {c.points.map((p) => (
                <motion.li key={p} variants={bullet}>
                  <span className="prob-dot" aria-hidden="true" />
                  <span>{p}</span>
                </motion.li>
              ))}
            </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
