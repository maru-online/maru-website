'use client';

/**
 * BackgroundLines — connector lines drawn behind a section's content.
 *
 * Copy handover entry 05 (approved 5 Oct 2026 as design direction): extends the
 * DisconnectDiagram's line language down the page rather than adding a new
 * one. Same cyan stroke, same stroke-dashoffset draw-in, same easing curve and
 * --i stagger as .dd-link, only slower and fainter, so the page reads as one
 * system of things connecting.
 *
 * Constraints from the entry, and where each is met:
 * - Behind content, low opacity, no pointer events: .bl (globals.css), and the
 *   SVG is aria-hidden.
 * - Draws in once as it enters the viewport, then a very slow opacity drift.
 * - Only stroke-dashoffset and opacity animate. Inline SVG, no library.
 * - Pauses offscreen: the drift runs only while .bl-on is set, which this
 *   observer toggles as the section enters and leaves the viewport.
 * - Fewer lines on small screens: paths marked `extra` hide below 640px.
 * - No layout shift: absolutely positioned inside a `relative` section.
 * - prefers-reduced-motion: rendered fully drawn and static.
 *
 * The "lines tell the story" variant (broken lines in "Why it's happening",
 * completing in services) needs Jimmy's yes first and is NOT built.
 */

import { useEffect, useRef, useState } from 'react';

type Density = 'light' | 'dense';

// viewBox 0 0 1200 800, scaled to cover the section (slice, so curves keep
// their shape; non-scaling strokes break pathLength dash maths in some engines).
// Curves run edge to edge through the side margins, where body text is not.
const PATHS: Record<Density, { d: string; extra?: boolean }[]> = {
  light: [
    { d: 'M -20 140 C 220 140, 260 360, 520 380 S 980 300, 1220 520' },
    { d: 'M -20 620 C 200 600, 320 700, 600 690 S 1000 560, 1220 600', extra: true },
    { d: 'M 1220 80 C 1040 100, 980 260, 1100 420', extra: true },
  ],
  dense: [
    { d: 'M -20 90 C 240 90, 280 300, 560 320 S 1000 220, 1220 300' },
    { d: 'M -20 260 C 160 280, 300 460, 620 470 S 1020 420, 1220 460' },
    { d: 'M -20 520 C 220 500, 340 640, 640 640 S 1000 560, 1220 620' },
    { d: 'M -20 720 C 260 700, 420 760, 700 740 S 1060 700, 1220 760', extra: true },
    { d: 'M 1220 40 C 1060 60, 1000 220, 1120 380 S 1180 560, 1060 720', extra: true },
    { d: 'M -20 380 C 80 360, 120 220, 60 80', extra: true },
  ],
};

export default function BackgroundLines({ density = 'light' }: { density?: Density }) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDrawn(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        setOnScreen(visible);
        if (visible) setDrawn(true);
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      focusable="false"
      className={`bl ${drawn ? 'bl-drawn' : ''} ${onScreen ? 'bl-on' : ''}`.trim()}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      {PATHS[density].map((p, i) => (
        <path
          key={i}
          className={`bl-path${p.extra ? ' bl-path-extra' : ''}`}
          style={{ ['--i' as string]: i }}
          d={p.d}
          pathLength={1}
        />
      ))}
    </svg>
  );
}
