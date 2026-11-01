/**
 * Site configuration and metadata
 */
export const siteConfig = {
    name: 'Maru Online',
    description:
        "We're your bridge to the Age of AI, combining comprehensive marketing solutions with cutting-edge AI technology to make your business smarter, faster, and more competitive.",
    url: 'https://maruonline.com',
    ogImage: 'https://maruonline.com/og-image.jpg',
    links: {
        linkedin: 'https://www.linkedin.com/company/108867700/',
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
