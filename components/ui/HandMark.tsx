'use client'

/**
 * HandMark — a gold hand-drawn underline under one phrase (1 Nov 2026).
 * Drawn once as it scrolls into view. One per section, never in a heading.
 * Reduced-motion visitors get the finished line (MotionProvider).
 */

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function HandMark({ children }: { children: ReactNode }) {
  return (
    <span className="hand-mark">
      {children}
      <svg viewBox="0 0 150 12" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M2 7 C 40 3, 90 10, 146 5"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </span>
  )
}

/**
 * HandLoop — the gold hand-drawn loop around "time back." in the image band
 * (1 Nov 2026). The phrase itself turns Maru cyan. Drawn once, on scroll-in.
 */
export function HandLoop({ children }: { children: ReactNode }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', color: 'var(--color-cyan)' }}>
      {children}
      <svg
        viewBox="0 0 300 110"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-8%', top: '-22%', width: '116%', height: '144%', overflow: 'visible', pointerEvents: 'none' }}
      >
        <motion.path
          d="M30 70 C 10 40, 70 8, 160 10 S 300 30, 284 66 S 170 104, 90 96 S 8 80, 40 48"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth={2.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </span>
  )
}
