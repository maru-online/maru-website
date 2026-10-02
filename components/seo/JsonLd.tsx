import { siteConfig } from '@/config/site'

/**
 * Structured data. GA4 already shows an "AI Assistant" channel — assistants
 * resolve entities from schema, so this is how the business becomes legible to
 * them, not just to Google. (T10)
 *
 * Rendered as a plain script tag rather than next/script: JSON-LD must be in
 * the initial HTML for crawlers that do not execute JavaScript.
 */
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is authored here, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': 'https://maruonline.com/#organization',
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        description: siteConfig.description,
        areaServed: { '@type': 'Country', name: 'South Africa' },
        address: siteConfig.contact.locations.map((l) => ({
          '@type': 'PostalAddress',
          streetAddress: l.address,
          addressCountry: 'ZA',
        })),
        sameAs: [
          siteConfig.links.linkedin,
          siteConfig.links.x,
          siteConfig.links.facebook,
          siteConfig.links.instagram,
        ],
        knowsAbout: [
          'POPIA',
          'Protection of Personal Information Act',
          'AI implementation',
          'Workflow automation',
          'Data protection',
        ],
      }}
    />
  )
}

export function ServiceJsonLd({
  name,
  description,
  path,
  price,
}: {
  name: string
  description: string
  path: string
  price?: string
}) {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        url: `${siteConfig.url}${path}`,
        serviceType: name,
        provider: { '@id': 'https://maruonline.com/#organization' },
        areaServed: { '@type': 'Country', name: 'South Africa' },
        ...(price
          ? {
              offers: {
                '@type': 'Offer',
                price,
                priceCurrency: 'ZAR',
                url: `${siteConfig.url}${path}`,
              },
            }
          : {}),
      }}
    />
  )
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }}
    />
  )
}
