import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import CardProof from '@/components/ui/CardProof'
import CardNavy from '@/components/ui/CardNavy'
import CardFeature from '@/components/ui/CardFeature'
import CardMetric from '@/components/ui/CardMetric'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'

export const metadata: Metadata = {
  title: 'Design System — Maru Online',
  robots: { index: false, follow: false },
}

// ── Local presentational helpers (page-scoped, not exported) ────────────────

function Swatch({ name, value, varName, ink: _ink = 'light' }: { name: string; value: string; varName: string; ink?: 'light' | 'dark' }) {
  return (
    <div className="border border-[var(--color-border-default)] rounded-[8px] overflow-hidden">
      <div className="h-16" style={{ background: value }} />
      <div className="px-3 py-2 bg-white">
        <div className="text-[13px] font-medium text-[var(--color-ink-primary)]">{name}</div>
        <div className="text-[11px] text-[var(--color-ink-tertiary)] font-mono">{value}</div>
        <div className="text-[11px] text-[var(--color-ink-tertiary)] font-mono">{varName}</div>
      </div>
    </div>
  )
}

function Block({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-20 scroll-mt-24">
      <div className="mb-8 pb-3 border-b border-[var(--color-border-default)]">
        <h2 className="!text-[28px] !border-0 !pb-0 !mb-1">{title}</h2>
        {subtitle && <p className="!mb-0 text-[15px] text-[var(--color-ink-secondary)]">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function DesignSystemPage() {
  return (
    <main className="bg-[var(--color-bg-canvas)] min-h-screen py-16 px-6 md:px-10 xl:px-16">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <header className="mb-16">
          <span className="label-eyebrow text-cyan">Maru Online</span>
          <h1 className="!text-[var(--color-ink-primary)] !text-[44px] md:!text-[64px] !mb-3">Design system</h1>
          <p className="text-[17px] text-[var(--color-ink-secondary)] max-w-[680px] !mb-0">
            One token source, one accent system (cyan + ochre), one component library — light only.
            Hover, focus and active states below are live; interact with each element to see them.
          </p>
        </header>

        {/* Colour */}
        <Block id="colour" title="Colour" subtitle="Cyan is the single interactive/action accent. Ochre is the SA-rooted secondary for proof, results and credentials. Gold is retired.">
          <h3 className="!text-[16px] !mb-3 text-[var(--color-ink-secondary)]">Accent — cyan (primary)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <Swatch name="Cyan" value="#3DB8C6" varName="--color-cyan" />
            <Swatch name="Cyan dark" value="#2DA8B6" varName="--color-cyan-dark" />
            <Swatch name="Cyan light" value="#E8F8FA" varName="--color-cyan-light" />
          </div>
          <h3 className="!text-[16px] !mb-3 text-[var(--color-ink-secondary)]">Accent — ochre (secondary)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <Swatch name="Ochre" value="#C36A36" varName="--color-ochre" />
            <Swatch name="Ochre tint" value="#F7EDE4" varName="--color-ochre-tint" />
            <Swatch name="Ochre ink" value="#6E3A19" varName="--color-ochre-ink" />
          </div>
          <h3 className="!text-[16px] !mb-3 text-[var(--color-ink-secondary)]">Surfaces &amp; navy</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <Swatch name="BG primary" value="#FFFFFF" varName="--color-bg-primary" />
            <Swatch name="BG secondary" value="#F5F4F0" varName="--color-bg-secondary" />
            <Swatch name="Canvas" value="#FAFAF8" varName="--color-bg-canvas" />
            <Swatch name="Navy" value="#1A3A5C" varName="--color-bg-navy" />
            <Swatch name="Navy deep" value="#0D1B2A" varName="--color-bg-navy-deep" />
            <Swatch name="Darkest" value="#060E15" varName="--color-bg-darkest" />
          </div>
          <h3 className="!text-[16px] !mb-3 text-[var(--color-ink-secondary)]">Ink &amp; borders</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Swatch name="Ink primary" value="#0D1B2A" varName="--color-ink-primary" />
            <Swatch name="Ink secondary" value="#4A5568" varName="--color-ink-secondary" />
            <Swatch name="Ink tertiary" value="#718096" varName="--color-ink-tertiary" />
            <Swatch name="Border default" value="#E2E8F0" varName="--color-border-default" />
          </div>
        </Block>

        {/* Typography */}
        <Block id="type" title="Typography" subtitle="Outfit for display/headings, Inter for body. Numerals are a brand asset.">
          <div className="space-y-4 bg-white p-8 rounded-[8px] border border-[var(--color-border-default)]">
            <span className="label-eyebrow text-cyan">Eyebrow label · 11px / 0.2em / uppercase</span>
            <h1 className="!text-[var(--color-ink-primary)] !mb-0">Display H1 — Outfit</h1>
            <h2 className="!border-0 !pb-0 !mb-0">Section H2 — Outfit</h2>
            <h3 className="!mb-0">Card heading H3 — Outfit</h3>
            <p className="!mb-0">
              Body copy — Inter, weight 300, 1.7 line-height. Pragmatic, evidence-led, no AI hype.
              We solve your business problem, not your AI problem.
            </p>
            <p className="body-muted !mb-0">Muted body — for secondary copy inside cards and supporting text.</p>
          </div>
        </Block>

        {/* Buttons */}
        <Block id="buttons" title="Buttons" subtitle="One CTA system. Primary (cyan fill), Secondary (cyan outline), Tertiary (inline link). Hover/focus/active are live; disabled shown.">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Button variant="primary">Book diagnostic</Button>
            <Button variant="secondary">See how we work</Button>
            <Button variant="tertiary">Read the case study</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" disabled>Primary disabled</Button>
            <Button variant="secondary" disabled>Secondary disabled</Button>
          </div>
        </Block>

        {/* Cards */}
        <Block id="cards" title="Cards" subtitle="Five variants with a clear rule: default surface, feature (icon), metric (stat), navy (emphasis), proof (ochre result).">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <CardFeature icon={<CheckIcon />} title="Feature card" body="Use for capabilities and services. Icon + title + body. Cyan icon chip, hover lift." />
            <CardProof label="Result" title="Proof card (ochre)">
              R180k saved per year — use for outcomes, results, credentials and value highlights.
            </CardProof>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <CardNavy label="Principle" title="Navy card">
              Use for emphasis moments and dark callouts — cyan accents on navy.
            </CardNavy>
            <div className="grid grid-cols-2 gap-3">
              <CardMetric value="Free" label="Diagnostic" />
              <CardMetric value="48-Hour" label="Turnaround" />
              <CardMetric value="30 Days" label="Support" />
              <CardMetric value="Fixed" label="Pricing" />
            </div>
          </div>
        </Block>

        {/* Forms */}
        <Block id="forms" title="Forms" subtitle="Labels above fields. 48px tap targets. Cyan focus ring. Default, filled and disabled states.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[8px] border border-[var(--color-border-default)]">
            <div>
              <Label htmlFor="ds-name">Full name</Label>
              <Input id="ds-name" placeholder="e.g. Thandi Mokoena" />
            </div>
            <div>
              <Label htmlFor="ds-email">Work email</Label>
              <Input id="ds-email" type="email" placeholder="you@company.co.za" />
            </div>
            <div>
              <Label htmlFor="ds-sector">Sector</Label>
              <Select id="ds-sector" defaultValue="">
                <option value="" disabled>Choose a sector…</option>
                <option>Legal &amp; professional services</option>
                <option>Agri-tech / ICT</option>
                <option>Hospitality</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="ds-disabled">Disabled field</Label>
              <Input id="ds-disabled" placeholder="Not editable" disabled />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="ds-msg">What is slowing your business down?</Label>
              <Textarea id="ds-msg" rows={3} placeholder="Tell us about the bottleneck…" />
            </div>
            <label className="md:col-span-2 flex items-center gap-3 text-[14px] text-[var(--color-ink-secondary)]">
              <Checkbox /> I agree to be contacted about my diagnostic (POPIA).
            </label>
          </div>
        </Block>

        {/* Proof / callout */}
        <Block id="callout" title="Proof callout" subtitle="The ochre proof block — the single pattern for stated numbers and results.">
          <div className="card-ochre max-w-[640px]">
            <span className="label-eyebrow-ochre">Estimated annual cost</span>
            <h3>R180,000 in recovered time</h3>
            <p className="!mb-0">Based on 12 hours/week of manual re-keying across a 4-person team at blended cost.</p>
          </div>
        </Block>
      </div>
    </main>
  )
}
