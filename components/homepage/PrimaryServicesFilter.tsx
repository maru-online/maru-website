import Glyph, { type GlyphName } from '@/components/ui/Glyph';

type Service = {
  id: string;
  tag: string;
  tagColor: 'cyan' | 'gold';
  icon: GlyphName;
  name: string;
  body: string;
};

// Four services, card copy verbatim from COPY-DECK §3. "Site Infrastructure"
// and "POPIA-Compliant Integration" were removed (CHANGE-MAP §2.1): the first
// is a sacrificed offer, the second is now built into every service. The audit
// tag reuses the pricing page's existing "Start here" badge; it was "Free entry
// point", which contradicted the R4,500 price.
const services: Service[] = [
  {
    id: 'svc1',
    tag: 'Start here',
    tagColor: 'cyan',
    icon: 'search',
    name: 'POPIA-Safe AI Audit',
    body: 'A written map of every tool, AI app and data flow in your business, with POPIA exposure flagged and savings sized. Report in 48 hours. R4,500.',
  },
  {
    id: 'svc2',
    tag: 'Core',
    tagColor: 'cyan',
    icon: 'connect',
    name: 'Workflow Integration',
    body: 'We connect your tools and automate the work, with consent, access and data location built in from day one.',
  },
  {
    id: 'svc3',
    tag: 'Support',
    tagColor: 'cyan',
    icon: 'team',
    name: 'Team Training & Handover',
    body: 'Your team learns the new workflows and the rules that keep them POPIA-safe: what goes into AI tools, and what never does.',
  },
  {
    id: 'svc4',
    tag: 'Ongoing',
    tagColor: 'cyan',
    icon: 'chart',
    name: 'Results Optimisation',
    body: 'Thirty days after go-live we measure hours saved and risks closed, then tune what the data shows.',
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
