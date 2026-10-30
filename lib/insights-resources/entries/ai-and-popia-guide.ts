import type { ContentEntry } from '../types'
import { GUIDE_PATH } from '@/lib/guides/config'

/**
 * The existing 16-page "AI and POPIA" guide. Its own page, form and delivery
 * live under /guides/ai-and-popia and follow the go-live switches in
 * lib/guides/config.ts. This entry only lists it among the Resources. Its
 * status is set in content.ts from those switches, never here.
 */
export const aiPopiaGuide: ContentEntry = {
  section: 'resources',
  slug: 'ai-and-popia',
  href: GUIDE_PATH,
  title: 'AI and POPIA: a guide for South African business owners',
  summary:
    'What your team’s AI tools do with client information, and what POPIA expects of you. 16 pages, about ten minutes to read, with a one-page self-check at the end.',
  pillar: 'popia-data-governance',
  category: 'POPIA & Data Governance',
  resourceType: 'Guide',
  access: 'gated',
  status: 'draft',
  publishedAt: '2026-10-08',
  author: 'Maru Online',
  legalNote: true,
}
