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
  title: 'AI and POPIA: a guide for South African business owners.',
  summary:
    'Understand what your team’s AI tools may do with client or personal information, what questions to ask, and how to introduce appropriate human oversight.',
  pillar: 'popia-data-governance',
  category: 'POPIA & Data Governance',
  resourceType: 'Guide',
  access: 'gated',
  image: '/images/insights-resources/guide-ai-popia-reader.jpg',
  imageAlt: 'A business owner reading carefully at her desk',
  status: 'draft',
  publishedAt: '2026-10-08',
  author: 'Maru Online',
  legalNote: true,
}
