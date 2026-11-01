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
          stroke="#C9A24A"
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
