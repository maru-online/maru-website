import Glyph, { type GlyphName } from '@/components/ui/Glyph';

type Service = {
  id: string;
  tag: string;
  tagColor: 'cyan' | 'gold';
  icon: GlyphName;
  name: string;
  body: string;
};

const services: Service[] = [
  {
    id: 'svc1',
    tag: 'Free entry point',
    tagColor: 'cyan',
    icon: 'search',
    name: 'Operations Assessment',
    body: 'See where your processes lose time. Free.',
  },
  {
    id: 'svc2',
    tag: 'Core',
    tagColor: 'cyan',
    icon: 'connect',
    name: 'Workflow Integration',
    body: 'Your tools, finally talking. Fixed price.',
  },
  {
    id: 'svc3',
    tag: 'Ongoing',
    tagColor: 'cyan',
    icon: 'chart',
    name: 'Results Optimisation',
    body: 'Proof it worked, against your baseline.',
  },
  {
    id: 'svc4',
    tag: 'Foundation',
    tagColor: 'gold',
    icon: 'layers',
    name: 'Site Infrastructure',
    body: 'Clean foundations before automation runs.',
  },
  {
    id: 'svc5',
    tag: 'Compliance',
    tagColor: 'gold',
    icon: 'shield',
    name: 'POPIA-Compliant Integration',
    body: 'Compliance built in, not bolted on.',
  },
  {
    id: 'svc6',
    tag: 'Support',
    tagColor: 'cyan',
    icon: 'team',
    name: 'Team Training & Handover',
    body: 'Your team runs it. Not IT.',
  },
];

export default function PrimaryServicesFilter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
      {services.map((svc) => (
        <div
          key={svc.id}
          className="card-lift svc-card"
          style={{
            border: '0.5px solid var(--color-border-card)',
            borderRadius: '8px',
            padding: '1.25rem 1.375rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
          }}
        >
          {/* The glyph replaces the 01–06 counter: a number told you where you
              were in a list, an icon tells you what the service is. */}
          <span className={`glyph-chip${svc.tagColor === 'gold' ? ' glyph-chip-gold' : ''}`}>
            <Glyph name={svc.icon} size={22} />
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
                fontSize: 'var(--text-h3-sans)',
                fontWeight: 600,
                color: 'var(--color-ink-primary)',
                fontFamily: 'var(--font-body)',
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
      ))}
    </div>
  );
}
