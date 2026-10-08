import Glyph, { type GlyphName } from '@/components/ui/Glyph';

type Service = {
  id: string;
  tag: string;
  tagColor: 'cyan' | 'gold';
  icon: GlyphName;
  name: string;
  body: string;
  /** Not published. See the AI Use Safeguards note below. */
  onHold?: boolean;
};

// Copy handover entry 04 (approved 5 Oct 2026), wording verbatim, in the
// approved order. Site Infrastructure is out of the grid (its service page and
// route stay). Names match the footer and the service pages.
const services: Service[] = [
  {
    id: 'assessment',
    tag: 'Start here',
    tagColor: 'cyan',
    icon: 'search',
    name: 'Free Assessment',
    body: 'We find where your time, money and client data leak. Free.',
  },
  {
    // ON HOLD (entry 04, open item 1): none of this is delivered yet. Jimmy is
    // building a v1 pack first. Flip `onHold` only once he confirms v1 exists,
    // and add the footer services link at the same time (entry 07).
    id: 'safeguards',
    tag: 'POPIA',
    tagColor: 'gold',
    icon: 'shield',
    name: 'AI Use Safeguards',
    body: 'Approved tools, written rules and the right agreements with AI providers, so your team gets the speed of AI without exposing client data.',
    onHold: true,
  },
  {
    id: 'integration',
    tag: 'Core',
    tagColor: 'cyan',
    icon: 'connect',
    name: 'Workflow Integration',
    body: 'Your tools connected, so nobody copies and pastes. Fixed price.',
  },
  {
    id: 'training',
    tag: 'Support',
    tagColor: 'cyan',
    icon: 'team',
    name: 'Team Training & Handover',
    body: 'Your team runs it. No IT department needed.',
  },
  {
    id: 'optimisation',
    tag: 'Ongoing',
    tagColor: 'cyan',
    icon: 'chart',
    name: 'Results Optimisation',
    body: 'Proof it worked, against your baseline. Then we keep improving it.',
  },
];

function ServiceCard({ svc, featured = false }: { svc: Service; featured?: boolean }) {
  return (
    <div
      className={`card-lift svc-card h-full${featured ? ' svc-card-featured' : ''}`}
      style={{
        border: '0.5px solid var(--color-border-card)',
        borderTop: featured ? '3px solid var(--color-cyan)' : undefined,
        borderRadius: '8px',
        padding: featured ? '1.75rem 1.75rem' : '1.25rem 1.375rem',
        display: 'flex',
        gap: featured ? '1.25rem' : '1rem',
        alignItems: 'flex-start',
      }}
    >
      {/* The glyph replaces the 01–06 counter: a number told you where you
          were in a list, an icon tells you what the service is. */}
      <span
        className={`glyph-chip${svc.tagColor === 'gold' ? ' glyph-chip-gold' : ''}${featured ? ' glyph-chip-lg' : ''}`}
      >
        <Glyph name={svc.icon} size={featured ? 28 : 22} />
      </span>

      <div style={{ minWidth: 0 }}>
        <span
          style={{
            background:
              svc.tagColor === 'cyan'
                ? 'rgba(61, 184, 198, 0.10)'
                : 'rgba(205, 170, 83, 0.12)',
            color:
              svc.tagColor === 'cyan'
                ? 'var(--color-cyan)'
                : 'var(--color-gold-antique)',
            fontSize: '10px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '2px 8px',
            borderRadius: '3px',
            display: 'inline-block',
            marginBottom: '0.5rem',
          }}
        >
          {svc.tag}
        </span>

        <p
          style={{
            fontSize: featured ? 'var(--text-h3-serif)' : 'var(--text-h3-sans)',
            fontWeight: 600,
            color: 'var(--color-ink-primary)',
            fontFamily: featured ? 'var(--font-display)' : 'var(--font-body)',
            marginBottom: '0.25rem',
            lineHeight: 1.3,
          }}
        >
          {svc.name}
        </p>

        <p className="body-muted" style={{ marginBottom: 0 }}>
          {svc.body}
        </p>
      </div>
    </div>
  );
}

/**
 * Services grid. The Free Assessment is the entry point and the
 * primary CTA's destination, so it gets a full-width featured card (entry 05);
 * the rest sit beneath it: 2x2 with four cards, one row of three while AI Use
 * Safeguards is on hold. Single column on mobile.
 */
export default function PrimaryServicesFilter() {
  const [featured, ...rest] = services.filter((s) => !s.onHold);
  const restCols = rest.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';

  return (
    <div className="flex flex-col gap-[10px]">
      <ServiceCard svc={featured} featured />
      <div className={`grid grid-cols-1 ${restCols} gap-[10px]`}>
        {rest.map((svc) => (
          <ServiceCard key={svc.id} svc={svc} />
        ))}
      </div>
    </div>
  );
}
