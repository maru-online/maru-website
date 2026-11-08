'use client'

/**
 * Lightweight animation wrappers for the rebuild pages.
 * All use whileInView + once:true so they fire once on scroll entry.
 *
 * Usage:
 *   <FadeUp>          — fade up 24px, opacity 0→1
 *   <FadeUp delay={0.1}>
 *   <StaggerParent>   — wraps a grid/list, staggers children 0.1s apart
 *   <StaggerChild>    — child inside StaggerParent
 */

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

// ─── Variants ────────────────────────────────────────────────────────────────

const fadeUpVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const staggerParentVariants: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const staggerChildVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// ─── Components ──────────────────────────────────────────────────────────────

interface AnimProps {
  children: ReactNode
  delay?:   number
  className?: string
  style?:   React.CSSProperties
  as?: keyof typeof motion
}

export function FadeUp({ children, delay = 0, className, style }: AnimProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerParent({ children, className, style }: AnimProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={staggerParentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerChild({ children, className, style }: AnimProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={staggerChildVariants}
    >
      {children}
    </motion.div>
  )
}
