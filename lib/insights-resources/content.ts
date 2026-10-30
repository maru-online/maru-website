/**
 * Insights & Resources: content model and (for now) placeholder entries.
 *
 * Brief: "Insights & Resources, Website Page Architecture & Implementation
 * Brief", 30 Oct 2026. Structure only. No real articles or guides yet.
 *
 * Rules this file keeps:
 *  - Placeholder entries exist only so the layouts can be reviewed. They are
 *    returned ONLY outside production (`SHOW_PLACEHOLDERS`), are flagged
 *    `placeholder: true`, are never indexable and never reach the sitemap.
 *  - Real content later: add entries (or replace `getEntries` with a CMS
 *    query) that return the same `ContentEntry` shape. Pages do not change.
 *  - Every entry carries one of five editorial pillars, shared by both
 *    offerings, so category filtering can be added later without a rebuild.
 */

// ─── Editorial pillars (brief section 6) ─────────────────────────────────────

export const PILLARS = [
  { slug: 'ai-for-business', label: 'AI for Business', glyph: 'chart' },
  { slug: 'ai-integration-systems', label: 'AI Integration & Systems', glyph: 'connect' },
  { slug: 'ai-strategy-readiness', label: 'AI Strategy & Readiness', glyph: 'compass' },
  { slug: 'popia-data-governance', label: 'POPIA & Data Governance', glyph: 'shield' },
  { slug: 'automation-operational-efficiency', label: 'Automation & Operational Efficiency', glyph: 'layers' },
] as const

export type PillarSlug = (typeof PILLARS)[number]['slug']

export function pillarFor(slug: PillarSlug) {
  return PILLARS.find((p) => p.slug === slug)!
}

// ─── Sections (the two offerings) ────────────────────────────────────────────

/** URL segment per offering. Individual pages live at /insights-resources/<segment>/<slug>. */
export const SECTIONS = {
  insights: { segment: 'ai-insights', label: 'AI Insights for Business', readLabel: 'Read Insight' },
  resources: { segment: 'guides', label: 'Resources & Best Practice', readLabel: 'Read Guide' },
} as const

export type SectionKey = keyof typeof SECTIONS

export function sectionFromSegment(segment: string): SectionKey | null {
  return (Object.keys(SECTIONS) as SectionKey[]).find((k) => SECTIONS[k].segment === segment) ?? null
}

// ─── Entry shape ─────────────────────────────────────────────────────────────

/** Insights are tagged by what they do for the reader. */
export type InsightFormat = 'News' | 'Analysis' | 'Opinion'

export interface ContentEntry {
  section: SectionKey
  slug: string // meaningful, descriptive; becomes the URL
  title: string
  summary: string
  pillar: PillarSlug
  /** Short label shown on the card, e.g. "AI Developments" or "AI Integration Guide". */
  category: string
  /** ISO dates. Optional only for placeholders. */
  publishedAt?: string
  updatedAt?: string
  /** Insights only. */
  format?: InsightFormat
  /** Resources only. Open access by default; gating is a per-resource choice. */
  access?: 'open' | 'gated'
  /** Resources only. "Read Guide" vs "Download" wording follows this. */
  resourceType?: 'Guide' | 'Checklist' | 'Worksheet' | 'Assessment'
  author?: string
  /** Editable SEO fields; fall back to title / summary. */
  seoTitle?: string
  seoDescription?: string
  /** Real featured image when one exists; otherwise the card draws a pillar visual. */
  image?: string
  /** Related entry slugs (same or other section). */
  related?: string[]
  /** True only for scaffold entries. Never indexed, never in the sitemap. */
  placeholder?: boolean
}

// ─── Visibility ──────────────────────────────────────────────────────────────

/** Same switch the guide scaffold uses: placeholders on previews and local dev only. */
export const SHOW_PLACEHOLDERS = process.env.VERCEL_ENV !== 'production'

// ─── Placeholder entries ─────────────────────────────────────────────────────
// Titles are labelled as placeholders on purpose so nobody mistakes them for
// copy. Summaries describe the slot, not a claim about the world.

const PLACEHOLDER_AUTHOR = 'Maru Online'

const PLACEHOLDERS: ContentEntry[] = [
  {
    section: 'insights',
    slug: 'placeholder-ai-developments',
    title: 'Placeholder: AI Developments headline',
    summary: 'Placeholder summary. Two lines on what happened and why a business reader should care.',
    pillar: 'ai-for-business',
    category: 'AI Developments',
    format: 'News',
    author: PLACEHOLDER_AUTHOR,
    related: ['placeholder-ai-in-business', 'placeholder-ai-integration-guide'],
    placeholder: true,
  },
  {
    section: 'insights',
    slug: 'placeholder-ai-in-business',
    title: 'Placeholder: AI in Business analysis headline',
    summary: 'Placeholder summary. An analysis of what an AI development means for business operations.',
    pillar: 'ai-strategy-readiness',
    category: 'AI in Business',
    format: 'Analysis',
    author: PLACEHOLDER_AUTHOR,
    related: ['placeholder-ai-developments', 'placeholder-ai-strategy-readiness'],
    placeholder: true,
  },
  {
    section: 'insights',
    slug: 'placeholder-south-african-ai-landscape',
    title: 'Placeholder: South African AI Landscape headline',
    summary: 'Placeholder summary. What a development means for South African businesses, data protection included.',
    pillar: 'popia-data-governance',
    category: 'South African AI Landscape',
    format: 'Opinion',
    author: PLACEHOLDER_AUTHOR,
    related: ['placeholder-popia-data-governance'],
    placeholder: true,
  },
  {
    section: 'resources',
    slug: 'placeholder-ai-integration-guide',
    title: 'Placeholder: AI Integration Guides',
    summary: 'How to identify opportunities and connect AI with existing systems.',
    pillar: 'ai-integration-systems',
    category: 'AI Integration Guides',
    resourceType: 'Guide',
    access: 'open',
    author: PLACEHOLDER_AUTHOR,
    related: ['placeholder-ai-developments'],
    placeholder: true,
  },
  {
    section: 'resources',
    slug: 'placeholder-popia-data-governance',
    title: 'Placeholder: POPIA & Data Governance',
    summary: 'Practical guidance on data protection and responsible AI use.',
    pillar: 'popia-data-governance',
    category: 'POPIA & Data Governance',
    resourceType: 'Checklist',
    access: 'open',
    author: PLACEHOLDER_AUTHOR,
    related: ['placeholder-south-african-ai-landscape'],
    placeholder: true,
  },
  {
    section: 'resources',
    slug: 'placeholder-ai-strategy-readiness',
    title: 'Placeholder: AI Strategy & Readiness',
    summary: 'Assessing business needs and preparing for AI adoption.',
    pillar: 'ai-strategy-readiness',
    category: 'AI Strategy & Readiness',
    resourceType: 'Worksheet',
    access: 'gated',
    author: PLACEHOLDER_AUTHOR,
    related: ['placeholder-ai-in-business'],
    placeholder: true,
  },
  {
    section: 'resources',
    slug: 'placeholder-automation-workflows',
    title: 'Placeholder: Automation & Workflows',
    summary: 'Improving operational processes and reducing manual work.',
    pillar: 'automation-operational-efficiency',
    category: 'Automation & Workflows',
    resourceType: 'Guide',
    access: 'open',
    author: PLACEHOLDER_AUTHOR,
    placeholder: true,
  },
]

// ─── Real entries ────────────────────────────────────────────────────────────
// Empty on purpose. Add published content here (or swap in a CMS query).

const ENTRIES: ContentEntry[] = []

// ─── Accessors ───────────────────────────────────────────────────────────────

export function getEntries(section?: SectionKey): ContentEntry[] {
  const all = SHOW_PLACEHOLDERS ? [...ENTRIES, ...PLACEHOLDERS] : ENTRIES
  const list = section ? all.filter((e) => e.section === section) : all
  // Newest first; undated (placeholder) entries keep their authored order.
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

export function entryHref(entry: Pick<ContentEntry, 'section' | 'slug'>): string {
  return `/insights-resources/${SECTIONS[entry.section].segment}/${entry.slug}`
}

/** The entry featured at the top of the landing page: first real `featured`-worthy item, else newest. */
export function getFeatured(): ContentEntry | undefined {
  const all = getEntries()
  return all.find((e) => !e.placeholder) ?? all[0]
}

export function formatDate(iso?: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })
}
