/**
 * Site configuration and metadata
 */
export const siteConfig = {
    name: 'Maru Online',
    description:
        "Maru Online makes AI safe for South African businesses. We map where client data goes, fix POPIA risks, and build workflows that save time.",
    url: 'https://maruonline.com',
    ogImage: 'https://maruonline.com/og-image.jpg',
    links: {
        linkedin: 'https://www.linkedin.com/in/jrmotsei/',
        x: 'https://x.com/maru_africa',
        facebook: 'https://www.facebook.com/maruonlin/',
        instagram: 'https://www.instagram.com/maru_automations/',
    },
    contact: {
        email: 'hello@maruonline.com',
        phone: '+27(0)83 393 4864',
        locations: [
            {
                name: 'KZN',
                address: '247 Ballito Village, Ballito, 4420',
                phone: '+27(0)83 393 4864',
                email: 'hello@maruonline.com',
            },
            {
                name: 'Gauteng',
                address: '61 4th Street, Linden, Johannesburg',
                phone: '+27(0)83 393 4864',
                email: 'hello@maruonline.com',
            },
        ],
    },
    calendly: {
        baseUrl: 'https://calendly.com/hello-maruonline',
        discoveryCall: 'https://calendly.com/hello-maruonline',
        widgetOptions: {
            hideGdprBanner: true,
            backgroundColor: 'ffffff',
            textColor: '1a1a1a',
            primaryColor: '22d3ee', // Maru Cyan
        },
    },
}

export type SiteConfig = typeof siteConfig
