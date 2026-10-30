import { SECTIONS, entryHref, type ContentEntry } from './content'

const BASE = 'https://maruonline.com'
const abs = (path: string) => `${BASE}${path}`

const ORG = { '@type': 'Organization', name: 'Maru Online', url: BASE } as const

/** BreadcrumbList for the landing page or an individual page. */
export function breadcrumbJsonLd(entry?: ContentEntry) {
  const items = [
    { name: 'Home', path: '/' },
    { name: 'Insights & Resources', path: '/insights-resources' },
    ...(entry
      ? [
          { name: SECTIONS[entry.section].label, path: `/insights-resources#${SECTIONS[entry.section].segment}` },
          { name: entry.title, path: entryHref(entry) },
        ]
      : []),
  ]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  }
}

/** BlogPosting for insights, Article for guides. Dates are omitted when unknown, never invented. */
export function articleJsonLd(entry: ContentEntry) {
  return {
    '@context': 'https://schema.org',
    '@type': entry.section === 'insights' ? 'BlogPosting' : 'Article',
    headline: entry.seoTitle ?? entry.title,
    description: entry.seoDescription ?? entry.summary,
    mainEntityOfPage: abs(entryHref(entry)),
    url: abs(entryHref(entry)),
    inLanguage: 'en-ZA',
    author: entry.author && entry.author !== 'Maru Online' ? { '@type': 'Person', name: entry.author } : ORG,
    publisher: ORG,
    ...(entry.publishedAt ? { datePublished: entry.publishedAt } : {}),
    ...(entry.updatedAt || entry.publishedAt ? { dateModified: entry.updatedAt ?? entry.publishedAt } : {}),
    ...(entry.image ? { image: abs(entry.image) } : {}),
  }
}
