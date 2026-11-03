'use client'

/**
 * HeroLight — the hero's responsive gradient (1 Nov 2026).
 *
 * A soft Maru-cyan light rests behind the empty right side of the hero,
 * balancing the left-aligned copy. With a mouse it drifts toward the pointer on
 * a slow spring and settles back when the pointer leaves. Touch devices never
 * hover, so they see the resting light; reduced-motion visitors see it too and
 * nothing moves. A faint static gold warmth sits top right, echoing the gold CTA.
 *
 * Render as the first child of a `relative overflow-hidden` section. Only the
 * gradient's position changes; no layout, no paint outside this layer.
 */

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

const REST_X = 0.78
const REST_Y = 0.38

export default function HeroLight() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 40, damping: 20 })
  const sy = useSpring(y, { stiffness: 40, damping: 20 })
  const background = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, rgba(61,184,198,0.16), rgba(61,184,198,0.05) 45%, rgba(61,184,198,0) 70%)`

  useEffect(() => {
    const host = ref.current?.parentElement
    if (!host) return

    const rest = () => {
      const r = host.getBoundingClientRect()
      x.set(r.width * REST_X)
      y.set(r.height * REST_Y)
    }
    rest()
    // Jump straight to the resting spot on first paint instead of sweeping in.
    sx.jump(x.get())
    sy.jump(y.get())

    window.addEventListener('resize', rest)
    if (reduce) return () => window.removeEventListener('resize', rest)

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = host.getBoundingClientRect()
      x.set(e.clientX - r.left)
      y.set(e.clientY - r.top)
    }
    host.addEventListener('pointermove', move)
    host.addEventListener('pointerleave', rest)
    return () => {
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', rest)
      window.removeEventListener('resize', rest)
    }
  }, [reduce, x, y, sx, sy])

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(900px circle at 100% 0%, rgba(214,183,106,0.07), rgba(214,183,106,0) 60%)' }}
      />
      <motion.div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background }}
      />
    </>
  )
}
