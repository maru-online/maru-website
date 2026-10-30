/**
 * Insights & Resources: content model and entries.
 *
 * Brief: "Insights & Resources, Website Page Architecture & Implementation
 * Brief", 30 Oct 2026.
 *
 * Rules this file keeps:
 *  - Every entry starts as `status: 'draft'`. Drafts are returned ONLY outside
 *    production (`SHOW_DRAFTS`), are noindex, carry no Article markup and never
 *    reach the sitemap. An entry goes live only when its status is changed to
 *    'published', on the owner's go.
 *  - Entries live in ./entries/*.ts. To use a CMS later, replace `ENTRIES`
 *    with a query returning the same `ContentEntry` shape. Pages do not change.
 *  - Every entry carries one of five editorial pillars, shared by both
 *    offerings, so category filtering needs no rebuild.
 */

import type { ContentEntry, PillarSlug, SectionKey } from './types'
export type { ContentEntry, PillarSlug, SectionKey, Block, Source, InsightFormat } from './types'

// ─── Editorial pillars (brief section 6) ─────────────────────────────────────

export const PILLARS = [
  { slug: 'ai-for-business', label: 'AI for Business', glyph: 'chart' },
  { slug: 'ai-integration-systems', label: 'AI Integration & Systems', glyph: 'connect' },
  { slug: 'ai-strategy-readiness', label: 'AI Strategy & Readiness', glyph: 'compass' },
  { slug: 'popia-data-governance', label: 'POPIA & Data Governance', glyph: 'shield' },
  { slug: 'automation-operational-efficiency', label: 'Automation & Operational Efficiency', glyph: 'layers' },
] as const


export function pillarFor(slug: PillarSlug) {
  return PILLARS.find((p) => p.slug === slug)!
}

// ─── Sections (the two offerings) ────────────────────────────────────────────

/** URL segment per offering. Individual pages live at /insights-resources/<segment>/<slug>. */
export const SECTIONS = {
  insights: { segment: 'ai-insights', label: 'AI Insights for Business', readLabel: 'Read Insight' },
  resources: { segment: 'guides', label: 'Resources & Best Practice', readLabel: 'Read Guide' },
} as const


export function sectionFromSegment(segment: string): SectionKey | null {
  return (Object.keys(SECTIONS) as SectionKey[]).find((k) => SECTIONS[k].segment === segment) ?? null
}

// ─── Visibility ──────────────────────────────────────────────────────────────

/** Drafts show on previews and local dev only. Production shows published entries. */
export const SHOW_DRAFTS = process.env.VERCEL_ENV !== 'production'

import { GUIDE_INDEXABLE, GUIDE_LIVE, GUIDE_PAGE_VISIBLE } from '@/lib/guides/config'
import { policyReset } from './entries/ai-policy-reset'
import { section71 } from './entries/popia-section-71'
import { smeLandscape } from './entries/sme-where-ai-fits'
import { integrationGuide } from './entries/ai-integration-guide'
import { readinessGuide } from './entries/ai-readiness-guide'
import { automationGuide } from './entries/automation-workflows-guide'
import { aiPopiaGuide } from './entries/ai-and-popia-guide'

/**
 * All content. Every entry starts as 'draft'. Flip one to 'published' only on
 * the owner's go. The AI and POPIA guide follows the guide switches in
 * lib/guides/config.ts, so it can never appear before the guide itself is live.
 */
const ENTRIES: ContentEntry[] = [
  policyReset,
  section71,
  smeLandscape,
  ...(GUIDE_PAGE_VISIBLE
    ? [{ ...aiPopiaGuide, status: (GUIDE_LIVE && GUIDE_INDEXABLE ? 'published' : 'draft') as 'draft' | 'published' }]
    : []),
  integrationGuide,
  readinessGuide,
  automationGuide,
]

export const isPublished = (e: ContentEntry) => e.status === 'published'

// ─── Accessors ───────────────────────────────────────────────────────────────

export function getEntries(section?: SectionKey): ContentEntry[] {
  const all = SHOW_DRAFTS ? ENTRIES : ENTRIES.filter(isPublished)
  const list = section ? all.filter((e) => e.section === section) : all
  // Newest first; entries with the same date keep their authored order.
  return [...list].sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
}

export function getEntry(section: SectionKey, slug: string): ContentEntry | undefined {
  return getEntries(section).find((e) => e.slug === slug)
}

export function getRelated(entry: ContentEntry, max = 3): ContentEntry[] {
  return (entry.related ?? [])
    .map((slug) => getEntries().find((e) => e.slug === slug))
    .filter((e): e is ContentEntry => Boolean(e))
    .slice(0, max)
}

export function entryHref(entry: Pick<ContentEntry, 'section' | 'slug'> & { href?: string }): string {
  if (entry.href) return entry.href
  return `/insights-resources/${SECTIONS[entry.section].segment}/${entry.slug}`
}

/** The entry featured at the top of the landing page: first real `featured`-worthy item, else newest. */
export function getFeatured(): ContentEntry | undefined {
  const all = getEntries()
  return all.find(isPublished) ?? all[0]
}

export function formatDate(iso?: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })
}
