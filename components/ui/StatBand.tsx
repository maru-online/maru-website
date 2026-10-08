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

// Copy handover entry 03 (approved 5 Oct 2026, follow-up wording revised 8 Oct 2026).
// One business day, not "48hr": a Friday-evening submission makes 48 hours fall on a weekend.
const STATS: Stat[] = [
  { icon: 'gift',   suffix: 'Free',   label: 'Assessment: see where you\'re exposed' },
  { icon: 'clock',  count: 1,  suffix: 'business day', label: 'Follow-up' },
  { icon: 'rocket', count: 30, suffix: 'days', label: 'From kick-off to your first workflow running live' },
  { icon: 'tag',    suffix: 'Proposal',  label: 'In writing before work starts' },
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
