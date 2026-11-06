import { MetadataRoute } from 'next';
import { SECTIONS, entryHref, getPublishedEntries } from '@/lib/insights-resources/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maruonline.com';
  const now = new Date();

  const corePages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/working-with-us`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    // /insights omitted while it has no articles — an empty section should not
    // be advertised to Google. Restore when the first article publishes.
    { url: `${baseUrl}/popia-ai-check`, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const legalPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-conditions`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Guides & Resources: hub, section listings with published entries, and
  // each published entry. Drafts never appear here, even on previews.
  const published = getPublishedEntries();
  const contentPages: MetadataRoute.Sitemap = published.length
    ? [
        { url: `${baseUrl}/insights-resources`, changeFrequency: 'weekly', priority: 0.7 },
        ...(Object.keys(SECTIONS) as (keyof typeof SECTIONS)[])
          .filter((k) => published.some((e) => e.section === k))
          .map((k) => ({ url: `${baseUrl}/insights-resources/${SECTIONS[k].segment}`, changeFrequency: 'weekly' as const, priority: 0.6 })),
        ...published.map((e) => ({ url: `${baseUrl}${entryHref(e)}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
      ]
    : [];

  return [...corePages, ...contentPages, ...legalPages].map((entry) => ({
    ...entry,
    lastModified: now,
  }));
}
