/**
 * Glyph — the Maru line-icon system.
 *
 * One 24×24 grid, 1.6px stroke, round caps and joins, currentColor throughout,
 * so an icon inherits whatever colour its card assigns. Every icon in the set is
 * drawn on the same grid: no filled shapes, no second weight, no exceptions —
 * that consistency is what lets icons carry meaning across card groups without
 * looking like clip art.
 *
 * Add a new icon by adding a key to PATHS, never by inlining an SVG at a call
 * site — a one-off icon is how a system drifts.
 */

export type GlyphName =
  | 'search'      // diagnostic — find where it leaks
  | 'connect'     // workflow integration — systems joined through a hub
  | 'chart'       // measurement — evidence against a baseline
  | 'layers'      // infrastructure — clean foundations
  | 'shield'      // compliance — POPIA
  | 'team'        // training and handover
  | 'unlink'      // tools that don't talk
  | 'hourglass'   // admin eating the week
  | 'stale'       // deciding on old numbers
  | 'gift'        // free
  | 'clock'       // turnaround
  | 'rocket'      // time to live
  | 'tag'         // fixed price
  | 'compass'     // strategy
  | 'browser'     // design and development
  | 'signal'      // marketing
  | 'clipboard'   // the free POPIA Assessment
  | 'chat';       // talk to us about a project

const PATHS: Record<GlyphName, React.ReactNode> = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5 5" />
    </>
  ),
  connect: (
    <>
      <circle cx="4.5" cy="5.5" r="2.2" />
      <circle cx="19.5" cy="5.5" r="2.2" />
      <circle cx="12" cy="18.5" r="2.2" />
      <path d="M6.1 7.3l4.4 9M17.9 7.3l-4.4 9M6.7 5.5h10.6" />
    </>
  ),
  chart: (
    <>
      <path d="M3.5 20.5V13M9 20.5V5.5M14.5 20.5v-9M20 20.5V8.5" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.5l8.5 4.5-8.5 4.5L3.5 8z" />
      <path d="M3.5 13.5L12 18l8.5-4.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v5.6c0 4.6-3.1 7.9-7.5 8.7-4.4-.8-7.5-4.1-7.5-8.7V6z" />
      <path d="M9 11.8l2.2 2.2 4-4.2" />
    </>
  ),
  team: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.2 19.5c0-3.2 2.6-5.4 5.8-5.4s5.8 2.2 5.8 5.4" />
      <path d="M16.5 5.4a3.2 3.2 0 010 5.4M17.8 14.5c2 .7 3.3 2.4 3.3 5" />
    </>
  ),
  /* Two systems, a broken run between them. Chain-link halves were tried first
     and read as noise at 22px — literal boxes with a gap read instantly. */
  unlink: (
    <>
      <rect x="2.2" y="8" width="7.2" height="8" rx="1.6" />
      <rect x="14.6" y="8" width="7.2" height="8" rx="1.6" />
      <path d="M9.4 12h1.8M12.8 12h1.8" />
    </>
  ),
  hourglass: (
    <>
      <path d="M6.5 3.5h11M6.5 20.5h11" />
      <path d="M7.5 3.5c0 4 4.5 5.2 4.5 8.5s-4.5 4.5-4.5 8.5" />
      <path d="M16.5 3.5c0 4-4.5 5.2-4.5 8.5s4.5 4.5 4.5 8.5" />
    </>
  ),
  stale: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.8h17M8 3.5v3M16 3.5v3" />
      <path d="M9.5 15.5h5" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="9.5" width="17" height="11" rx="1.6" />
      <path d="M3.5 13.8h17M12 9.5v11" />
      <path d="M12 9.5S10.6 3.5 8 3.5a2.4 2.4 0 000 4.8h4zM12 9.5s1.4-6 4-6a2.4 2.4 0 010 4.8h-4z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 6.8V12l3.6 2.4" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3.5c3.2 2.4 4.8 5.6 4.8 9.2L12 17l-4.8-4.3c0-3.6 1.6-6.8 4.8-9.2z" />
      <circle cx="12" cy="10.2" r="1.8" />
      <path d="M9.2 16.4c-1.5.9-2.2 2.4-2.2 4.1 1.7 0 3.2-.7 4.1-2.2M14.8 16.4c1.5.9 2.2 2.4 2.2 4.1-1.7 0-3.2-.7-4.1-2.2" />
    </>
  ),
  tag: (
    <>
      <path d="M11.3 3.5H20.5v9.2l-8.8 8.8a1.6 1.6 0 01-2.3 0l-6.9-6.9a1.6 1.6 0 010-2.3z" />
      <circle cx="16.4" cy="7.6" r="1.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.6 8.4l-1.9 5.3-5.3 1.9 1.9-5.3z" />
    </>
  ),
  browser: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9.3h18M6.2 7h.01M8.8 7h.01" />
    </>
  ),
  signal: (
    <>
      <circle cx="12" cy="18.5" r="2" />
      <path d="M7.8 14.3a6 6 0 018.4 0M4.6 11.1a10.5 10.5 0 0114.8 0" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <rect x="9" y="2.8" width="6" height="3.4" rx="1" />
      <path d="M9 13.2l2.2 2.2 4-4.2" />
    </>
  ),
  chat: (
    <>
      <path d="M3.5 5.5a2 2 0 012-2h7.5a2 2 0 012 2V10a2 2 0 01-2 2H8.5l-3 2.5V12h0a2 2 0 01-2-2z" />
      <path d="M18 8h.5a2 2 0 012 2v4.5a2 2 0 01-2 2h0V19l-3-2.5h-3.5a2 2 0 01-2-2" />
    </>
  ),
};

export default function Glyph({
  name,
  size = 22,
  className = '',
}: {
  name: GlyphName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={`glyph ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
