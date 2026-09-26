import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maruonline.com';
  const now = new Date();

  const corePages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    // /insights omitted while it has no articles — an empty section should not
    // be advertised to Google. Restore when the first article publishes.
    { url: `${baseUrl}/operations-assessment`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/booking`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/careers`, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // The four rate-card services. Retired service URLs are 301'd in
  // next.config.ts and must NOT be listed here — a sitemap that advertises
  // redirected URLs is what search consoles flag.
  const servicePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/services/popia-safe-ai-audit`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/workflow-integration`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/team-training-handover`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/services/results-optimisation`, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // /resources/popia-ai-checklist is unpublished (26 Sep 2026) until its form
  // has a working, consented delivery path. Restore this entry when it does.
  const resourcePages: MetadataRoute.Sitemap = [];

  const legalPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/privacy-policy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-conditions`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [...corePages, ...servicePages, ...resourcePages, ...legalPages].map((entry) => ({
    ...entry,
    lastModified: now,
  }));
}
