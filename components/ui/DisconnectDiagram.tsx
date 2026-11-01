'use client';

/**
 * DisconnectDiagram — the "what Maru actually does" picture.
 *
 * Five systems a South African SME already runs, sitting isolated. On scroll
 * they converge through a single Maru hub into one live view. It states the
 * business model — we connect what you already have — without a sentence of
 * explanation, and it shows the outcome rather than the internal process.
 *
 * Used once per page, at section scale. Two layouts share one node list:
 * horizontal convergence on >=sm, vertical stack below.
 *
 * Motion is scroll-triggered once, then settles. Under prefers-reduced-motion
 * the connected state renders immediately with no animation.
 */

import { useEffect, useRef, useState } from 'react';

type Node = { id: string; label: string };

const NODES: Node[] = [
  { id: 'crm',      label: 'CRM' },
  { id: 'email',    label: 'EMAIL' },
  { id: 'sheets',   label: 'SPREADSHEETS' },
  { id: 'invoices', label: 'INVOICING' },
  { id: 'whatsapp', label: 'WHATSAPP' },
];

/** Desktop geometry — viewBox 0 0 1000 400 */
const D = {
  boxW: 176,
  boxH: 46,
  boxX: 24,
  /** vertical centre of each source box, evenly distributed */
  rowY: [56, 128, 200, 272, 344],
  hubX: 520,
  hubY: 200,
  hubR: 13,
  outX: 742,
  outY: 148,
  outW: 234,
  outH: 104,
};

/**
 * Mobile geometry — viewBox 0 0 340 420.
 *
 * Third iteration. The first was 340×620 (73% of a phone screen). The second
 * kept five free curves converging on one point, which tangled: the strands
 * crossed each other inside a narrow channel and read as noise.
 *
 * This one routes every feed into a shared vertical trunk instead. Each box
 * leaves horizontally at its own height and turns down onto the trunk, so no
 * two strands can ever cross — five feeds joining one rail into the hub.
 *
 * The composition is deliberately asymmetric: the stack sits left, the trunk
 * and hub run down the right, and the outcome panel is offset right of the
 * boxes, so the eye travels top-left to bottom-right rather than down a centre
 * line.
 *
 * rowY values are box TOP edges; centres are rowY + boxH / 2.
 */
const M = {
  boxW: 196,
  boxH: 36,
  colX: 12,
  rowY: [8, 58, 108, 158, 208],
  /** x of the shared vertical trunk every feed turns onto */
  trunkX: 252,
  /** radius of the elbow where a feed turns down onto the trunk */
  elbow: 14,
  hubX: 252,
  hubY: 300,
  hubR: 12,
  outX: 44,
  outY: 344,
  outW: 284,
  outH: 66,
};

/** Travelling pulses along each link, mounted once the diagram is live. */
function Pulses({ prefix }: { prefix: 'd' | 'm' }) {
  const ids = [0, 1, 2, 3, 4].map((i) => `dd-${prefix}-link-${i}`);
  return (
    <g aria-hidden="true">
      {ids.map((id, i) => (
        <circle key={id} className="dd-pulse" r={prefix === 'd' ? 3.5 : 3} opacity="0">
          <animateMotion dur="2.4s" begin={`${1.7 + i * 0.4}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1">
            <mpath href={`#${id}`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;0.95;0.95;0" keyTimes="0;0.15;0.85;1" dur="2.4s" begin={`${1.7 + i * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <circle className="dd-pulse dd-pulse-out" r={prefix === 'd' ? 3.5 : 3} opacity="0">
        <animateMotion dur="1.6s" begin="2.6s" repeatCount="indefinite">
          <mpath href={`#dd-${prefix}-link-out`} />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.6s" begin="2.6s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

export default function DisconnectDiagram({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  // Looping pulses and the hub's breathing run only when motion is allowed.
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setMotion(!reduced);
    if (reduced) {
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
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`dd ${live ? 'dd-live' : ''} ${className}`.trim()}>
      {/* ── Desktop / tablet — horizontal convergence ─────────────────── */}
      <svg
        className="dd-svg dd-desktop"
        viewBox="0 0 1000 400"
        role="img"
        aria-label="Five business systems — CRM, email, spreadsheets, invoicing and WhatsApp — sitting disconnected, then joined through Maru into a single live view."
      >
        {/* converging links — drawn behind everything */}
        {D.rowY.map((y, i) => (
          <path
            key={`d-link-${NODES[i].id}`}
            id={`dd-d-link-${i}`}
            className="dd-link"
            style={{ ['--i' as string]: i }}
            d={`M ${D.boxX + D.boxW} ${y} C ${D.boxX + D.boxW + 130} ${y}, ${D.hubX - 130} ${D.hubY}, ${D.hubX - D.hubR} ${D.hubY}`}
          />
        ))}
        {/* the stubs that go nowhere — the "before" state */}
        {D.rowY.map((y, i) => (
          <path
            key={`d-stub-${NODES[i].id}`}
            className="dd-stub"
            d={`M ${D.boxX + D.boxW} ${y} L ${D.boxX + D.boxW + 34} ${y}`}
          />
        ))}

        {/* source systems */}
        {NODES.map((n, i) => (
          <g key={`d-node-${n.id}`} className="dd-node" style={{ ['--i' as string]: i }}>
            <rect
              className="dd-box"
              x={D.boxX}
              y={D.rowY[i] - D.boxH / 2}
              width={D.boxW}
              height={D.boxH}
              rx="7"
            />
            <text className="dd-label" x={D.boxX + 18} y={D.rowY[i] + 4}>
              {n.label}
            </text>
          </g>
        ))}

        {/* hub → output */}
        <path
          id="dd-d-link-out"
          className="dd-link dd-link-out"
          style={{ ['--i' as string]: 5 }}
          d={`M ${D.hubX + D.hubR} ${D.hubY} L ${D.outX} ${D.hubY}`}
        />

        {live && motion && <Pulses prefix="d" />}

        {/* the Maru hub */}
        <g className="dd-hub">
          <circle className={`dd-hub-halo ${motion ? 'dd-breathe' : ''}`} cx={D.hubX} cy={D.hubY} r={D.hubR + 13} />
          <circle className="dd-hub-core" cx={D.hubX} cy={D.hubY} r={D.hubR} />
        </g>

        {/* the outcome */}
        <g className="dd-out">
          <rect
            className="dd-out-box"
            x={D.outX}
            y={D.outY}
            width={D.outW}
            height={D.outH}
            rx="9"
          />
          <text className="dd-out-title" x={D.outX + 22} y={D.outY + 42}>
            One live view
          </text>
          <text className="dd-out-sub" x={D.outX + 22} y={D.outY + 70}>
            Current. Not last month&apos;s export.
          </text>
        </g>
      </svg>

      {/* ── Mobile — left stack, right trunk ──────────────────────────── */}
      <svg
        className="dd-svg dd-mobile"
        viewBox="0 0 340 420"
        role="img"
        aria-label="Five business systems — CRM, email, spreadsheets, invoicing and WhatsApp — sitting disconnected, then joined through Maru into a single live view."
      >
        {/* Each feed runs out horizontally, turns a quarter-circle onto the
            shared trunk, and descends to the hub. Horizontals sit at distinct
            heights and the verticals share one x, so no two strands cross. */}
        {M.rowY.map((y, i) => {
          const cy = y + M.boxH / 2;
          const turn = cy + M.elbow;
          return (
            <path
              key={`m-link-${NODES[i].id}`}
              id={`dd-m-link-${i}`}
              className="dd-link"
              style={{ ['--i' as string]: i }}
              d={`M ${M.colX + M.boxW} ${cy} L ${M.trunkX - M.elbow} ${cy} Q ${M.trunkX} ${cy} ${M.trunkX} ${turn} L ${M.trunkX} ${M.hubY - M.hubR}`}
            />
          );
        })}
        {M.rowY.map((y, i) => (
          <path
            key={`m-stub-${NODES[i].id}`}
            className="dd-stub"
            d={`M ${M.colX + M.boxW} ${y + M.boxH / 2} L ${M.colX + M.boxW + 20} ${y + M.boxH / 2}`}
          />
        ))}

        {NODES.map((n, i) => (
          <g key={`m-node-${n.id}`} className="dd-node" style={{ ['--i' as string]: i }}>
            <rect
              className="dd-box"
              x={M.colX}
              y={M.rowY[i]}
              width={M.boxW}
              height={M.boxH}
              rx="6"
            />
            <text className="dd-label dd-label-sm" x={M.colX + 14} y={M.rowY[i] + M.boxH / 2 + 3.5}>
              {n.label}
            </text>
          </g>
        ))}

        {/* The hub sits on the trunk at the right; the outcome panel is offset
            left of it, so this connector sweeps down and across — the one
            deliberate diagonal in the composition. */}
        <path
          id="dd-m-link-out"
          className="dd-link dd-link-out"
          style={{ ['--i' as string]: 5 }}
          d={`M ${M.hubX} ${M.hubY + M.hubR} C ${M.hubX} ${M.hubY + M.hubR + 20}, ${M.outX + M.outW / 2} ${M.outY - 20}, ${M.outX + M.outW / 2} ${M.outY}`}
        />

        {live && motion && <Pulses prefix="m" />}

        <g className="dd-hub">
          <circle className={`dd-hub-halo ${motion ? 'dd-breathe' : ''}`} cx={M.hubX} cy={M.hubY} r={M.hubR + 12} />
          <circle className="dd-hub-core" cx={M.hubX} cy={M.hubY} r={M.hubR} />
        </g>

        <g className="dd-out">
          <rect
            className="dd-out-box"
            x={M.outX}
            y={M.outY}
            width={M.outW}
            height={M.outH}
            rx="8"
          />
          <text className="dd-out-title dd-out-title-sm" x={M.outX + M.outW / 2} y={M.outY + 29}>
            One live view
          </text>
          <text className="dd-out-sub dd-out-sub-sm" x={M.outX + M.outW / 2} y={M.outY + 50}>
            Current, not last month&apos;s export.
          </text>
        </g>
      </svg>
    </div>
  );
}
