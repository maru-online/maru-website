/** Types only, so entry files can import them without a cycle with content.ts. */

export type PillarSlug =
  | 'ai-for-business'
  | 'ai-integration-systems'
  | 'ai-strategy-readiness'
  | 'popia-data-governance'
  | 'automation-operational-efficiency'

export type SectionKey = 'insights' | 'resources'
export type InsightFormat = 'News' | 'Analysis' | 'Opinion'

/** Body blocks. Inline **bold** is supported in any text field; nothing else. */
export type Block =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'callout'; title?: string; text: string }
  | { t: 'checklist'; title: string; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] }

export interface Source {
  title: string
  publisher: string
  date?: string
  /** Only set for URLs actually opened and read. */
  url?: string
}

export interface ContentEntry {
  section: SectionKey
  slug: string
  title: string
  summary: string
  pillar: PillarSlug
  /** Short label on the card, e.g. "AI Developments". */
  category: string
  /**
   * 'draft': written, awaiting the owner's approval. Shown on previews and
   * local builds only, noindex, no Article markup, not in the sitemap.
   * 'published': live and indexable.
   */
  status: 'draft' | 'published'
  publishedAt?: string
  updatedAt?: string
  readTime?: string
  format?: InsightFormat
  access?: 'open' | 'gated'
  resourceType?: 'Guide' | 'Checklist' | 'Worksheet' | 'Assessment'
  author?: string
  seoTitle?: string
  seoDescription?: string
  /** Public path of the featured image. */
  image?: string
  imageAlt?: string
  /** Scannable summary shown above the body. */
  inShort?: string[]
  body?: Block[]
  sources?: Source[]
  /** True when the piece makes statements about POPIA or other law. */
  legalNote?: boolean
  /** An entry that lives elsewhere (the AI and POPIA guide). Entry page redirects there. */
  href?: string
  related?: string[]
}
