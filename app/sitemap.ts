import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maruonline.com';
  const now = new Date();

  const corePages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    // /insights omitted while it has no articles — an empty section should not
    // be advertised to Google. Restore when the first article publishes.
    { url: `${baseUrl}/popia-ai-check`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/invara`, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const legalPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-conditions`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [...corePages, ...legalPages].map((entry) => ({
    ...entry,
    lastModified: now,
  }));
}
