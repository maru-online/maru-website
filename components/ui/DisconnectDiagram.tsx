'use client';

/**
 * DisconnectDiagram — the "what Maru actually does" picture.
 *
 * Navy-stage treatment (3 Nov 2026), carried over from the ESD consistency
 * diagram so both diagrams read as one family: grain and grid on a navy stage,
 * cyan links, a gold hub, and light that keeps running along the lines.
 *
 * Five systems a South African SME already runs start out loose (tilted,
 * dashed, tagged as exports and attachments). On scroll they straighten and
 * tick, the links draw into one gold hub ("captured once"), and a single line
 * runs out to one live view. Then white dots keep flowing in and gold dots
 * flow out. The pills underneath light in step with the reveal.
 *
 * Two layouts share one node list: horizontal convergence on >=sm, vertical
 * below. Under prefers-reduced-motion the final state renders at once with no
 * animation and no travelling dots.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

type Node = { id: string; label: string; badge: string; r: number; dx: number };

const NODES: Node[] = [
  { id: 'crm',      label: 'CRM',          badge: 'export', r: -3.2, dx: -10 },
  { id: 'email',    label: 'EMAIL',        badge: 'inbox',  r: 2.6,  dx: 12 },
  { id: 'sheets',   label: 'SPREADSHEETS', badge: '.xlsx',  r: -1.8, dx: -4 },
  { id: 'invoices', label: 'INVOICING',    badge: '.pdf',   r: 3.4,  dx: 9 },
  { id: 'whatsapp', label: 'WHATSAPP',     badge: 'chat',   r: -2.6, dx: -12 },
];

const PILLS = [
  'Nothing replaced',
  'Captured once',
  'Less retyping',
  'Personal information in fewer places',
];

/** Reveal stages, applied as classes on the stage in this order. */
const STAGES = ['cd-in', 'cd-links', 'cd-hub', 'cd-outlinks', 'cd-outs'] as const;
/** ms after start for each stage; pills light at stages 0, 2, 3 and 4. */
const STAGE_AT = [150, 900, 1900, 2600, 3300];
const PILL_AT = [150, 1900, 2600, 3300];
const DOTS_AT = 3900;

type Geo = {
  m: boolean;
  ib: { x: number; w: number; h: number };
  inCy: (i: number) => number;
  hub: { x: number; y: number };
  ob: { x: number; y: number; w: number; h: number };
};

const DESK: Geo = {
  m: false,
  ib: { x: 40, w: 230, h: 56 },
  inCy: (i) => 70 + 80 * i,
  hub: { x: 560, y: 230 },
  ob: { x: 712, y: 178, w: 262, h: 104 },
};

/**
 * Mobile: free curves into one point tangle in a narrow column, so every feed
 * leaves its box horizontally, turns a quarter-circle onto one shared trunk on
 * the right, and runs down into the hub. No two strands cross.
 */
const MOB: Geo = {
  m: true,
  ib: { x: 16, w: 214, h: 42 },
  inCy: (i) => 30 + 54 * i,
  hub: { x: 300, y: 338 },
  ob: { x: 30, y: 432, w: 300, h: 96 },
};
const TRUNK_ELBOW = 14;

function paths(g: Geo) {
  const { m, ib, inCy, hub, ob } = g;
  const e = TRUNK_ELBOW;
  const inD = NODES.map((_, i) => {
    const cy = inCy(i);
    const sx = ib.x + ib.w;
    return m
      ? `M${sx} ${cy} L${hub.x - e} ${cy} Q${hub.x} ${cy} ${hub.x} ${cy + e} L${hub.x} ${hub.y - 16}`
      : `M${sx} ${cy} C${sx + 130} ${cy} ${hub.x - 110} ${hub.y} ${hub.x - 16} ${hub.y}`;
  });
  const midX = ob.x + ob.w / 2;
  const outD = m
    ? `M${hub.x} ${hub.y + 16} C${hub.x} ${hub.y + 50} ${midX} ${ob.y - 40} ${midX} ${ob.y}`
    : `M${hub.x + 16} ${hub.y} L${ob.x} ${hub.y}`;
  return { inD, outD };
}

function Diagram({ g, dots, id }: { g: Geo; dots: boolean; id: 'd' | 'm' }) {
  const { m, ib, inCy, hub, ob } = g;
  const { inD, outD } = paths(g);
  const tx = ob.x + (m ? 24 : 28);
  const cy2 = ob.y + ob.h / 2;
  const gradId = `cd-gout-${id}`;

  return (
    <svg
      className={`cd-svg ${m ? 'cd-mobile' : 'cd-desktop'}`}
      viewBox={m ? '0 0 360 540' : '0 20 1000 420'}
      role="img"
      aria-label="Five business systems — CRM, email, spreadsheets, invoicing and WhatsApp — connected through one point where information is captured once, into a single live view."
    >
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1={hub.x}
          y1={hub.y}
          x2={m ? ob.x + ob.w / 2 : ob.x}
          y2={m ? ob.y : hub.y}
        >
          <stop offset="0" stopColor="#D6B76A" />
          <stop offset="1" stopColor="#3DB8C6" />
        </linearGradient>
      </defs>

      {/* faint tracks, always visible */}
      {inD.map((d, i) => <path key={`t${i}`} className="cd-track" d={d} />)}
      <path className="cd-track" d={outD} />

      {/* the "before" stubs that lead nowhere */}
      {NODES.map((n, i) => {
        const cy = inCy(i);
        return (
          <path
            key={`s-${n.id}`}
            className="cd-stub"
            d={`M${ib.x + ib.w} ${cy} L${ib.x + ib.w + (m ? 18 : 34)} ${cy}`}
          />
        );
      })}

      {/* links drawing in */}
      {inD.map((d, i) => (
        <path
          key={`l${i}`}
          className="cd-link cd-link-in"
          pathLength={1}
          style={{ ['--i' as string]: i }}
          d={d}
        />
      ))}
      <path
        className="cd-link cd-link-out"
        pathLength={1}
        style={{ ['--i' as string]: 0, stroke: `url(#${gradId})` }}
        d={outD}
      />

      {/* source systems */}
      {NODES.map((n, i) => {
        const cy = inCy(i);
        const y = cy - ib.h / 2;
        const x = ib.x;
        return (
          <g
            key={`n-${n.id}`}
            className="cd-in-g"
            style={{
              ['--i' as string]: i,
              ['--r' as string]: `${m ? n.r * 0.7 : n.r}deg`,
              ['--dx' as string]: `${m ? n.dx * 0.5 : n.dx}px`,
            }}
          >
            <rect className="cd-in-box" x={x} y={y} width={ib.w} height={ib.h} rx={m ? 7 : 9} />
            <rect className="cd-in-rough" x={x + 3} y={y + 3} width={ib.w - 6} height={ib.h - 6} rx={m ? 5 : 7} />
            <text className="cd-in-label" style={{ fontSize: m ? 11.5 : 13 }} x={x + (m ? 14 : 22)} y={cy + 4.5}>
              {n.label}
            </text>
            <rect className="cd-in-badge-bg" x={x + ib.w - (m ? 50 : 58)} y={cy - 9} width={m ? 42 : 46} height={18} rx={9} />
            <text className="cd-in-badge" x={x + ib.w - (m ? 29 : 35)} y={cy + 3.6} textAnchor="middle">
              {n.badge}
            </text>
            <path className="cd-in-tick" pathLength={1} d={`M${x + ib.w - (m ? 32 : 38)} ${cy} l4 4.2 l8 -8.6`} />
          </g>
        );
      })}

      {/* the hub */}
      <circle className="cd-hub-ring" cx={hub.x} cy={hub.y} r={m ? 28 : 34} />
      <circle className="cd-hub-halo" cx={hub.x} cy={hub.y} r={14} />
      <circle className="cd-hub-dot" cx={hub.x} cy={hub.y} r={m ? 14 : 16} />
      {m ? (
        <>
          <text className="cd-hub-cap" x={hub.x - 92} y={hub.y - 2}>CAPTURED</text>
          <text className="cd-hub-cap" x={hub.x - 92} y={hub.y + 13}>ONCE</text>
        </>
      ) : (
        <>
          <text className="cd-hub-cap" x={hub.x} y={hub.y + 60}>CAPTURED ONCE</text>
          <text className="cd-hub-sub" x={hub.x} y={hub.y + 77}>Shared where it&rsquo;s needed</text>
        </>
      )}

      {/* the outcome */}
      <g className="cd-out-g" style={{ ['--ox' as string]: m ? '0px' : '-20px' }}>
        <rect className="cd-out-box" x={ob.x} y={ob.y} width={ob.w} height={ob.h} rx={m ? 10 : 12} />
        <circle className="cd-out-live" cx={tx} cy={ob.y + (m ? 22 : 24)} r={3.5} />
        <text className="cd-out-livetx" x={tx + 11} y={ob.y + (m ? 25.5 : 27.5)}>LIVE</text>
        <text className="cd-out-title" style={{ fontSize: m ? 21 : 24 }} x={tx} y={cy2 + 10}>
          One live view
        </text>
        <text className="cd-out-sub" style={{ fontSize: m ? 12 : 12.5 }} x={tx} y={cy2 + (m ? 30 : 32)}>
          Current. Not last month&rsquo;s export.
        </text>
        <path className="cd-out-ok" d={`M${ob.x + ob.w - 30} ${ob.y + (m ? 22 : 24)} l4.2 4.4 l8.6 -9`} />
      </g>

      {/* light running along the lines */}
      {dots && (
        <g aria-hidden="true">
          {inD.map((d, i) => (
            <circle key={`p${i}`} className="cd-dot" r={2.6} opacity={0}>
              <animateMotion dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.88;1" dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {[0, 1.1].map((t) => (
            <circle key={`po${t}`} className="cd-dot cd-dot-gold" r={2.8} opacity={0}>
              <animateMotion dur="2.2s" begin={`${0.6 + t}s`} repeatCount="indefinite" path={outD} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.88;1" dur="2.2s" begin={`${0.6 + t}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      )}
    </svg>
  );
}

export default function DisconnectDiagram({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const timers = useRef<number[]>([]);
  const [stage, setStage] = useState(-1); // index into STAGES reached; -1 = before
  const [pills, setPills] = useState(0);
  const [dots, setDots] = useState(false);
  const [reduced, setReduced] = useState(false);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const run = useCallback(() => {
    clear();
    setStage(-1);
    setPills(0);
    setDots(false);
    STAGE_AT.forEach((ms, i) => timers.current.push(window.setTimeout(() => setStage(i), ms)));
    PILL_AT.forEach((ms, i) => timers.current.push(window.setTimeout(() => setPills(i + 1), ms)));
    timers.current.push(window.setTimeout(() => setDots(true), DOTS_AT));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(r);
    if (r) {
      setStage(STAGES.length - 1);
      setPills(PILLS.length);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, [run]);

  const replay = () => {
    clear();
    setStage(-1);
    setPills(0);
    setDots(false);
    timers.current.push(window.setTimeout(run, 350));
  };

  const stageClasses = STAGES.slice(0, stage + 1).join(' ');

  return (
    <div className={`cd ${className}`.trim()}>
      <section
        ref={ref}
        className={`cd-stage ${stageClasses}`}
        aria-label="Diagram: CRM, email, spreadsheets, invoicing and WhatsApp connect through one point into one live view."
      >
        <div className="cd-cols" aria-hidden="true">
          <span className="cd-col">Your tools · as they are</span>
          <span className="cd-col cd-col-mid">Captured once</span>
          <span className="cd-col cd-col-end">One live view</span>
        </div>
        <div className="cd-svgwrap">
          <Diagram g={DESK} dots={dots && !reduced} id="d" />
          <Diagram g={MOB} dots={dots && !reduced} id="m" />
        </div>
        <div className="cd-pills" aria-label="What changes">
          {PILLS.map((p, i) => (
            <span key={p} className={`cd-pill ${i < pills ? 'cd-pill-on' : ''}`}>
              <b>{i + 1}</b>
              {p}
            </span>
          ))}
        </div>
      </section>
      {!reduced && (
        <div className="cd-bar">
          <button type="button" className="cd-replay" onClick={replay}>
            Replay
          </button>
        </div>
      )}
    </div>
  );
}
