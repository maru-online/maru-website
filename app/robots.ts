import { MetadataRoute } from 'next'

/**
 * robots.txt is voluntary — the datacentre traffic behind the Singapore bot
 * problem ignores it entirely. This is hygiene, not a solution: it keeps the
 * crawlers that bring value, turns away the SEO-scraper class that brings none,
 * and keeps token-scoped client pages out of the index.
 *
 * SemrushBot-SA is allowed deliberately: it is the site-audit agent, and
 * blocking it would stop us auditing our own site with the Semrush tooling we
 * already pay for. The general SemrushBot crawler stays blocked.
 */
export default function robots(): MetadataRoute.Robots {
  const privatePaths = ['/api/', '/_next/', '/report/', '/studio/']

  return {
    rules: [
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'SemrushBot-SA',
        ],
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: [
          'SemrushBot',
          'AhrefsBot',
          'MJ12bot',
          'DotBot',
          'Bytespider',
          'DataForSeoBot',
        ],
        disallow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: 'https://maruonline.com/sitemap.xml',
  }
}
