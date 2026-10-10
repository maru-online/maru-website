import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import CookieConsent from '@/components/CookieConsent'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import { ConversionTracking } from '@/components/analytics/ConversionTracking'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

// ─── Fonts ────────────────────────────────────────────────────────────────────
// Outfit Variable — headings (h1–h6), display moments, nav, labels
// Variable font: weight axis 100–900, no separate files needed.
const outfit = localFont({
  src: '../public/fonts/outfit/Outfit-Variable.woff2',
  variable: '--font-outfit',
  display: 'swap',
})

// Inter Variable — all body copy, UI text, form inputs, buttons
// Variable font: weight axis 100–900.
const inter = localFont({
  src: '../public/fonts/inter/Inter-Variable.woff2',
  variable: '--font-inter',
  display: 'swap',
})

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://maruonline.com'),
  title: 'AI & Automation Consultants for Growing SMEs | Maru Online',
  description:
    'We find where your processes are costing you time and money — then build AI-powered workflows that cut costs and free your team. Free assessment.',
  openGraph: {
    type: 'website',
    siteName: 'Maru Online',
    locale: 'en_ZA',
    title: 'AI That Actually Works for Your Business — Not Just Another Tool',
    description:
      'We connect AI with your existing tools and workflows to automate the work your team shouldn\'t be doing manually. Free assessment for growing SMEs.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI That Actually Works for Your Business — Not Just Another Tool',
    description:
      'We find where your processes are costing you time and money — then build AI-powered workflows that cut costs and free your team. Free assessment.',
  },
}

// ─── Root layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} font-body`}
      suppressHydrationWarning
    >
      <body>
        {/* Structured data — makes the business legible to search and to AI assistants */}
        <OrganizationJsonLd />

        {/* GA4 */}
        {GA_ID && <AnalyticsTracker measurementId={GA_ID} />}

        {/* Funnel events — assessment steps, completions, lead capture */}
        <ConversionTracking />

        {/* Meta Pixel: loads only after the visitor accepts cookies */}
        {META_PIXEL_ID && <MetaPixel pixelId={META_PIXEL_ID} />}

        <Nav />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
