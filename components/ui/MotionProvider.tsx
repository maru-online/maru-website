'use client'

/**
 * Site-wide motion settings (1 Nov 2026).
 *
 * reducedMotion="user": visitors who ask their device for reduced motion get
 * every framer-motion entrance at its final state, instantly. Before this, the
 * FadeUp / Stagger wrappers moved regardless of that setting.
 */

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
