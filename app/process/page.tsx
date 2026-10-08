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
  description: 'Four steps. Fixed price. Measured outcome. From the free assessment through to 30 days of measurement after launch.',
  ...seo('/process'),
}

const outerPad    = 'px-6 md:px-[60px]'
const inner       = 'max-w-[900px] mx-auto'
const innerWide   = 'max-w-[1100px] mx-auto'
const innerNarrow = 'max-w-[720px] mx-auto'

// ─── Step data ────────────────────────────────────────────────────────────────
// Copy handover entry 13 (approved 6 Oct 2026, trimmed form), verbatim. Show
// the shape, hide the mechanics: the longer phase write-ups (intake brief,
// verification call, gap report, 90-day roadmap, per-phase checklists) are
// withdrawn and must not be restored. There is no paid diagnostic any more.

const steps = [
  {
    number: '01',
    label:  'Assess.',
    body:   ['Start with a free assessment.'],
  },
  {
    number: '02',
    label:  'Plan.',
    body:   [
      'We talk it through on a short, free call, then send you a fixed-price proposal.',
      "You never need to share your clients' personal information to scope a build, and we ask before recording or transcribing any call.",
    ],
  },
  {
    number: '03',
    label:  'Build.',
    body:   ['We build and test your workflows. Your first one is live in about 30 days from kick-off.'],
  },
  {
    number: '04',
    label:  'Launch and measure.',
    body:   ['We go live, train your team and hand it over, so you are not dependent on us. For 30 days after launch we measure results against where you started.'],
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
              <Button href="/popia-ai-check" variant="primary">
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
                We start with an assessment of your current processes.
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
        eyebrow="Assessment first"
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
          FOUR STEPS — entry 13
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="phases"
        className={`${outerPad} py-24`}
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      >
        <div className={inner}>
          <FadeUp>
            <p className="body-muted" style={{ marginBottom: 'var(--space-section-header-mb)', maxWidth: '560px' }}>
              Four steps. Fixed price. Measured outcome.
            </p>
          </FadeUp>
          <StaggerParent className="flex flex-col gap-5">
            {steps.map((step) => (
              <StaggerChild key={step.number}>
                <div className="card-lift p-8 md:p-10 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-10 items-start">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="section-number">{step.number}</span>
                    <h2 style={{ fontSize: 'var(--text-h3-serif)', margin: 0, border: 'none', padding: 0 }}>
                      {step.label}
                    </h2>
                  </div>
                  <div>
                    {step.body.map((para, i) => (
                      <p
                        key={i}
                        className="body-muted"
                        style={{ marginBottom: i < step.body.length - 1 ? 'var(--space-para-section)' : 0 }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          HOW WE PRICE — entry 13, replaces the /pricing page (which now
          redirects here). No figure until Jimmy confirms one; when he does,
          store it as a single constant, not inline.
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="how-we-price"
        className={`${outerPad} py-24 scroll-mt-24`}
        style={{ background: 'var(--gradient-surface)' }}
      >
        <div className={innerNarrow}>
          <div className="card-lift p-8 md:p-12">
            <FadeUp>
              <h2 style={{ marginBottom: 'var(--space-heading-body)', border: 'none' }}>How we price</h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="body-muted" style={{ marginBottom: 'var(--space-para-section)' }}>
                After your free assessment and a call, we send a fixed-price proposal. You know the full cost before we start, and it only changes if the scope does. We don&apos;t bill by the hour.
              </p>
              <ListGroup>
                <li className="flex gap-6 py-5 border-b border-[var(--color-border-default)]">
                  <span aria-hidden="true" className="bullet-cyan" />
                  <p className="body-muted" style={{ margin: 0 }}>
                    Included: build, testing, handover, training and 30 days of measurement.
                  </p>
                </li>
                <li className="flex gap-6 py-5">
                  <span aria-hidden="true" className="bullet-cyan" />
                  <p className="body-muted" style={{ margin: 0 }}>
                    Not included: subscriptions to the tools themselves, which you pay to the providers directly. We tell you what&apos;s needed, and why, before you commit.
                  </p>
                </li>
              </ListGroup>
              <div style={{ marginTop: '2rem' }}>
                <Button href="/popia-ai-check" variant="primary">
                  Start with the free assessment
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

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
                a: 'Your first workflow is live in about 30 days from kick-off. For 30 days after launch we measure results against where you started.',
              },
              {
                q: 'Do I need to be technical to work with you?',
                a: "No. We build systems your team can use and maintain without a technical background. Everything is documented in plain language at handover. If something breaks after we've handed over, we're reachable — but the systems are designed not to need us.",
              },
              {
                q: "What if my business isn't ready for AI implementation?",
                a: "The assessment will tell you. If the honest answer is that your foundation needs work before AI automation makes sense, we'll say so — and we can scope the infrastructure work that needs to happen first, before any automation is layered on top. We'd rather give you a clear picture than sell you something you're not ready for.",
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
                q: 'Can I start with just the assessment and decide later?',
                a: "Yes — that's exactly how it's designed. The assessment is free, with no obligation to proceed to a full engagement.",
              },
              {
                q: 'Do you work outside Gauteng, South Africa?',
                a: "Yes, we do. The assessment and most of the engagement work is handled remotely. For clients in Gauteng we can meet in person at key stages. For clients elsewhere in South Africa the process works entirely via video call and shared documents — same quality, same process.",
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
            <span className="label-eyebrow">Free assessment</span>
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
              Start with a free assessment.
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
              <Button href="/popia-ai-check" variant="primary">
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
