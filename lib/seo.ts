import type { Metadata } from 'next'

export const OG_ALT = 'Maru Online: POPIA-conscious AI implementation for South African SMEs'

/**
 * Per-page canonical, Open Graph and Twitter card.
 *
 * Two traps this exists to avoid:
 *
 * 1. A child segment's `openGraph` object REPLACES the root layout's rather
 *    than merging into it. Setting only `url` on a page silently drops
 *    og:type, og:site_name and og:locale for that page.
 * 2. The file-convention `app/opengraph-image.tsx` only attaches to the root
 *    segment. Child routes need the image declared explicitly or they ship a
 *    summary_large_image card with no image, which renders blank.
 *
 * og:title / og:description and twitter:title / twitter:description are filled
 * by Next from the page's own `title` and `description`, so pages only pass a
 * path here.
 */
export function seo(path: string): Metadata {
  const images = [{ url: '/opengraph-image', width: 1200, height: 630, alt: OG_ALT }]

  return {
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'Maru Online',
      locale: 'en_ZA',
      url: path,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/opengraph-image'],
    },
  }
}
