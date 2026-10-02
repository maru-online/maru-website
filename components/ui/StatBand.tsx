'use client';

/**
 * StatBand — the metrics row.
 *
 * Owns the single IntersectionObserver for the whole row so the four cells
 * stagger as one gesture. Under prefers-reduced-motion the row renders in its
 * final state immediately, counts included.
 */

import { useEffect, useRef, useState } from 'react';
import StatFigure, { type Stat } from './StatFigure';

const STATS: Stat[] = [
  { icon: 'gift',   suffix: 'Free',   label: 'Assessment: see where your data goes' },
  { icon: 'clock',  count: 48, suffix: 'hr',   label: 'Turnaround on your audit report' },
  { icon: 'rocket', count: 30, suffix: 'days', label: 'To your first POPIA-safe workflow running live' },
  { icon: 'tag',    suffix: 'Fixed',  label: 'Price agreed before work starts' },
];

export default function StatBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLive(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`stat-band grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 ${live ? 'stat-live' : ''}`}
    >
      {STATS.map((s, i) => (
        <StatFigure key={s.label} stat={s} index={i} live={live} />
      ))}
    </div>
  );
}
