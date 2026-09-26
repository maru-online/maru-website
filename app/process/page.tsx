import { Metadata } from 'next'
import Button from '@/components/ui/Button'
import { BGPattern } from '@/components/ui/bg-pattern'
import ImageSplit from '@/components/ui/ImageSplit'
import ImageBand from '@/components/ui/ImageBand'
import AccordionFAQ from '@/components/ui/AccordionFAQ'
import CardProof from '@/components/ui/CardProof'
import ListItem from '@/components/ui/ListItem'
import ListGroup from '@/components/ui/ListGroup'
import ToolsScroller from '@/components/ui/ToolsScroller'
import { FadeUp, StaggerParent, StaggerChild } from '@/components/ui/Animate'
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  title:       'How We Work | Maru Online',
  description: 'A four-phase process: POPIA-Safe AI Audit, fixed-scope build, team handover and a 30-day measurement report. Fixed price throughout.',
  ...seo('/process'),
}

const outerPad    = 'px-6 md:px-[60px]'
const inner       = 'max-w-[900px] mx-auto'
const innerWide   = 'max-w-[1100px] mx-auto'
const innerNarrow = 'max-w-[720px] mx-auto'

// ─── Phase data ───────────────────────────────────────────────────────────────

const phases = [
  {
    number:  '01',
    label:   'Diagnose',
    title:   'We map your data before we touch anything.',
    body: [
      "You complete a sector-specific intake form. It takes fifteen minutes. We follow up with a short verification call. Within 48 hours, you receive your audit report.",
      "The report covers your workflows and tools. It includes a quantified revenue gap analysis. This is a live document, not a PDF. Whether you proceed or not, the report is yours.",
    ],
    items: [
      { leader: 'Sector-specific intake brief', body: 'Fifteen questions tailored to your industry.' },
      { leader: 'Verification call',             body: 'We clarify the brief and confirm scope before work begins.' },
      { leader: 'Written gap report',            body: 'A snapshot of what is working and the cost of your current state.' },
      { leader: '90-day roadmap',                body: 'A sequenced action plan so you know what to do next.' },
    ],
    note: 'The POPIA-Safe AI Audit. If you proceed to a full engagement, this fee offsets against the project cost.',
    bg:   'var(--color-bg-primary)',
  },
  {
    number:  '02',
    label:   'Design',
    title:   'We scope the work before you commit.',
    body: [
      "We use the audit findings to build a fixed-scope plan. Every item is specified. We define what we are building, what it connects to, and what it produces. Nothing is vague.",
      "You review the plan and request adjustments. We do not proceed until you sign off on every element.",
    ],
    items: [
      { leader: 'Fixed-scope definition',    body: 'A clear written spec of what will be built and measured.' },
      { leader: 'Fixed price',               body: 'Agreed before work begins. No hourly billing. No scope creep.' },
      { leader: 'Baseline measurement',      body: 'We establish the “before” state so results are provable.' },
      { leader: 'Stack decision',            body: 'We document exactly why we chose each tool or connection.' },
    ],
    note: null,
    bg:   'var(--color-bg-canvas)',
  },
  {
    number:  '03',
    label:   'Build',
    title:   'We configure on solid foundations.',
    body: [
      "We build exactly what the plan specifies. The automation layer follows once the foundation is sound. Every sprint has a defined output.",
      "Everything we build is tested and documented. Your team receives instructions they can follow without a technical background.",
      "**POPIA compliance is designed in from the start.**",
    ],
    items: [
      { leader: 'Custom integration',          body: 'We connect your CRM, calendar, and email so data passes correctly.' },
      { leader: 'Automation layer',            body: 'Workflows that run without human intervention.' },
      { leader: 'Brand voice calibration',     body: 'AI outputs designed to use your defined business brand voice.' },
      { leader: 'Compliance by design',        body: 'Every data touchpoint is reviewed for POPIA compliance.' },
    ],
    note: null,
    bg:   'var(--color-bg-secondary)',
  },
  {
    number:  '04',
    label:   'Launch and Measure',
    title:   'You own the system. We track the results.',
    body: [
      "We track results against your baseline for 30 days after launch. At the end of the period, you receive a results report. It shows what moved, what didn’t, and what to watch next.",
      "This phase is built into every engagement. It is not an optional add-on. We make decisions about further optimisation based on data, not a sales conversation.",
    ],
    items: [
      { leader: 'Full documentation',       body: 'Every connection and configuration is documented for your team.' },
      { leader: 'Hands-on training',        body: 'We train the people who will actually use the system.' },
      { leader: '30-day measurement',       body: 'We track results against the baseline and report changes.' },
      { leader: 'Results report',           body: 'A written report of outcomes, not just a handover checklist.' },
    ],
    note: null,
    bg:   'var(--color-bg-primary)',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProcessPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`relative min-h-[60vh] flex items-center ${outerPad} pt-48 pb-32`}
        style={{ backgroundColor: 'var(--color-bg-navy)' }}
      >
        <BGPattern variant="grid" mask="none" size={40} fill="rgba(61, 184, 198, 0.12)" className="z-0" />
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            top:           '-120px',
            right:         '-120px',
            width:         '480px',
            height:        '480px',
            borderRadius:  '50%',
            border:        '1px solid rgba(61,184,198,0.15)',
            pointerEvents: 'none',
          }}
        />
        <div className={`${innerWide} relative z-10`}>
          <FadeUp>
            <span className="label-eyebrow">How we work</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="maru-headline-split">
              <span className="maru-headline-split-strong">First we show you what the leaks cost.</span>
              <br />
              <span className="maru-headline-split-light">Then you decide.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p
              className="font-body font-light text-lg max-w-[600px]"
              style={{
                color:        'var(--color-ink-inverted-muted)',
                marginBottom: 'var(--space-section-header-mb)',
                lineHeight:   'var(--leading-body)',
              }}
            >
              A free assessment shows you where the money leaks. A fixed price
              fixes it. Then we measure what changed — in hours and rands.
            </p>
          </FadeUp>
          <FadeUp delay={0.22}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Button href="/operations-assessment" variant="primary">
                Start the assessment
              </Button>
              <Button href="#phases" variant="tertiary">
                See the process
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PRINCIPLE
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-20`}
        style={{ background: 'var(--gradient-surface)' }}
      >
        <div className={innerNarrow}>
          <div className="card-lift p-8 md:p-12">
            <FadeUp>
              <h3 style={{ marginBottom: 'var(--space-heading-body)', border: 'none' }}>
                We start with an audit of your current processes.
              </h3>
              <p className="body-muted" style={{ marginBottom: 0 }}>
                &ldquo;Building the wrong thing faster is still building the wrong thing.&rdquo;
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── IMAGE SPLIT — between principle and tools scroller ──────────── */}
      <ImageSplit
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80"
        alt="Team of professionals reviewing workflow diagrams on multiple screens"
        eyebrow="Audit first"
        heading="We audit your workflows before we touch your tools."
        body="Building automation on top of broken infrastructure just breaks faster. We map how your business actually operates — the manual steps, the data handoffs, the gaps — before a single workflow is configured."
        imagePosition="left"
        bg="var(--color-bg-canvas)"
      />

      {/* ════════════════════════════════════════════════════════════════════
          TOOLS WE USE
          ════════════════════════════════════════════════════════════════════ */}
      <div>
        <FadeUp>
          <div
            className={`${outerPad} py-6`}
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
          >
            <div className={inner}>
              <p
                style={{
                  fontFamily:    'var(--font-body)',
                  fontSize:      'var(--text-label)',
                  fontWeight:    500,
                  letterSpacing: 'var(--tracking-eyebrow)',
                  textTransform: 'uppercase',
                  color:         'var(--color-ink-tertiary)',
                  marginBottom:  0,
                  textAlign:     'center',
                }}
              >
                Tools we work with
              </p>
            </div>
          </div>
        </FadeUp>
        <ToolsScroller />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          FOUR PHASES
          ════════════════════════════════════════════════════════════════════ */}
      <div id="phases">
        {phases.map((phase) => (
          <section
            key={phase.number}
            className={`${outerPad} py-24`}
            style={{ backgroundColor: phase.bg }}
          >
            <div className={inner}>
              {/* Section header */}
              <FadeUp>
                <div style={{ marginBottom: 'var(--space-section-header-mb)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <span className="section-number">{phase.number}</span>
                    <span className="label-eyebrow-ochre" style={{ margin: 0 }}>{phase.label}</span>
                  </div>
                  <h2>{phase.title}</h2>
                </div>
              </FadeUp>

              {/* 2-col: prose + list */}
              <FadeUp delay={0.08}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-16 items-start">
                  {/* Left — description */}
                  <div>
                    {phase.body.map((para, i) => {
                      const isBold = para.startsWith('**') && para.endsWith('**');
                      const text = isBold ? para.slice(2, -2) : para;
                      return (
                        <p
                          key={i}
                          className="body-muted"
                          style={{
                            marginBottom: i < phase.body.length - 1 ? 'var(--space-para-section)' : 0,
                            fontWeight: isBold ? 700 : undefined,
                            color: isBold ? 'var(--color-ink-primary)' : undefined,
                          }}
                        >
                          {text}
                        </p>
                      );
                    })}
                    {phase.note && (
                      <p
                        style={{
                          fontFamily:      'var(--font-body)',
                          fontSize:        'var(--text-meta)',
                          fontWeight:      300,
                          color:           'var(--color-ink-tertiary)',
                          marginTop:       '1.5rem',
                          marginBottom:    0,
                          paddingTop:      '1rem',
                          borderTop:       '1px solid var(--color-border-default)',
                        }}
                      >
                        {phase.note}
                      </p>
                    )}
                  </div>

                  {/* Right — what's included */}
                  <div>
                    <p
                      style={{
                        fontFamily:    'var(--font-body)',
                        fontSize:      'var(--text-label)',
                        fontWeight:    500,
                        letterSpacing: 'var(--tracking-eyebrow)',
                        textTransform: 'uppercase',
                        color:         'var(--color-ink-tertiary)',
                        marginBottom:  '0.75rem',
                      }}
                    >
                      What happens in this phase
                    </p>
                    <ListGroup>
                      {phase.items.map((item) => (
                        <ListItem key={item.leader} leader={item.leader} body={item.body} />
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </FadeUp>
            </div>
          </section>
        ))}
      </div>

      {/* ── IMAGE BAND — between phases and principles ───────────────────── */}
      <ImageBand
        src="/images/people/every-phase.png"
        alt="Team collaborating in a professional setting"
        overlayText={
          <>
            <span style={{ fontWeight: 300 }}>Every phase has a defined output.</span>
            <br />
            <span style={{ fontWeight: 700 }}>You always know what&apos;s happening and what comes next.</span>
          </>
        }
        height={380}
      />

      {/* ════════════════════════════════════════════════════════════════════
          FAQ
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ background: 'var(--gradient-surface)' }}
      >
        <div className={inner}>
          <div className="card-lift p-8 md:p-12">
            <FadeUp>
              <div style={{ marginBottom: 'var(--space-section-header-mb)' }}>
                <span className="label-eyebrow-ochre">Common questions</span>
                <h2 style={{ border: 'none' }}>
                  <span style={{ fontWeight: 300 }}>How the process works</span>
                  <br />
                  <span style={{ fontWeight: 700 }}>in practice</span>
                </h2>
              </div>
            </FadeUp>

            <AccordionFAQ items={[
              {
                q: 'How long does the whole process take?',
                a: 'The audit takes 48 hours from intake form submission to report delivery. The core engagement — Phases 2 through 4 — typically runs four to eight weeks depending on complexity. The 30-day measurement phase runs after launch.',
              },
              {
                q: 'Do I need to be technical to work with you?',
                a: "No. We build systems your team can use and maintain without a technical background. Everything is documented in plain language at handover. If something breaks after we've handed over, we're reachable — but the systems are designed not to need us.",
              },
              {
                q: "What if my business isn't ready for AI implementation?",
                a: "The audit will tell you. If the honest answer is that your foundation needs work before AI automation makes sense, we'll say so — and we can scope the infrastructure work that needs to happen first, before any automation is layered on top. We'd rather give you a clear picture than sell you something you're not ready for.",
              },
              {
                q: 'I already have AI tools. Do I have to replace them?',
                a: "Almost certainly not. Our first obligation is to audit what you have and make it work better. We only recommend new tools when there is a genuine capability gap your existing stack cannot fill — and we explain exactly why when that happens.",
              },
              {
                q: 'How many clients do you work with at once?',
                a: "Maximum five. That's a hard limit, not a soft guideline. It's how we protect the quality of every engagement.",
              },
              {
                q: "What happens if the results don't meet expectations?",
                a: "The 30-day measurement phase is where this gets addressed honestly. If something didn't perform as expected, the results report says so and explains why. We don't disappear after handover — the 30-day check-in is built in specifically to catch this and course-correct where needed.",
              },
              {
                q: 'Can I start with just the audit and decide later?',
                a: "Yes — that's exactly how it's designed. The audit is a complete, standalone deliverable. There is no obligation to proceed to a full engagement. Many clients use the audit report to make an internal case for the investment before committing.",
              },
              {
                q: 'Do you work outside Gauteng, South Africa?',
                a: "Yes, we do. The audit and most of the engagement work is handled remotely. For clients in Gauteng we can meet in person at key stages. For clients elsewhere in South Africa the process works entirely via video call and shared documents — same quality, same process.",
              },
            ]} />
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA — navy
          ════════════════════════════════════════════════════════════════════ */}
      <section
        className={`${outerPad} py-24`}
        style={{ backgroundColor: 'var(--color-bg-navy)' }}
      >
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            bottom:        '-80px',
            left:          '-80px',
            width:         '320px',
            height:        '320px',
            borderRadius:  '50%',
            border:        '1px solid rgba(61,184,198,0.12)',
            pointerEvents: 'none',
          }}
        />
        <div className={innerNarrow}>
          <FadeUp>
            <span className="label-eyebrow">The audit</span>
            <h2
              style={{
                color:        'var(--color-ink-inverted)',
                border:       'none',
                padding:      0,
                marginBottom: 'var(--space-heading-body)',
              }}
            >
              <span style={{ fontWeight: 300 }}>Find your leaks first.</span>
              <br />
              <span style={{ fontWeight: 700 }}>It costs nothing to look.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.08}>
            <p className="body-on-navy" style={{ marginBottom: 'var(--space-para-section)' }}>
              The assessment is free and takes about 15 minutes — your report is
              emailed to you. The POPIA-Safe AI Audit that follows is R4,500.
            </p>
            <hr
              className="rule"
              style={{
                background:   'rgba(250,250,248,0.15)',
                marginBottom: 'var(--space-para-section)',
              }}
            />
          </FadeUp>
          <FadeUp delay={0.14}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button href="/operations-assessment" variant="primary">
                Start the assessment
              </Button>
              <Button href="/booking" variant="tertiary">
                Book a discovery call
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
