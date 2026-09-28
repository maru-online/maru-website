import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import CookieConsent from '@/components/CookieConsent'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import { ConversionTracking } from '@/components/analytics/ConversionTracking'
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
  title: 'POPIA-Safe AI & Automation for SA Businesses | Maru Online',
  description:
    'Your team already uses AI. We help you do it within POPIA: we map where client data goes, fix the risks, and build workflows that save time. Fixed price.',
  openGraph: {
    type: 'website',
    siteName: 'Maru Online',
    locale: 'en_ZA',
    title: 'AI your business can use, without the POPIA risk',
    description:
      'Your team already uses AI. We help you do it within POPIA: we map where client data goes, fix the risks, and build workflows that save time. Fixed price.',
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

        {/* Meta Pixel — base code */}
        {META_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        {/* Calendly — loaded site-wide so it's pre-cached before /booking */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />

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
