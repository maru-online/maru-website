'use client'

import { useEffect } from 'react'
import { clearCookies, useCookieChoice } from '@/lib/cookie-consent'

/**
 * Meta Pixel, loaded only after the visitor accepts cookies.
 *
 * Until 28 Sep 2026 the base code sat in app/layout.tsx and ran on every page
 * whatever the visitor chose, plus a <noscript> image that tracked visitors who
 * could not see the banner at all. Now nothing reaches Meta until "Accept". A
 * later "Decline" (via Manage Cookie Preferences) revokes consent in the
 * already-loaded pixel and removes its _fbp cookie.
 *
 * lib/pixel.ts events stay safe: they call window.fbq?.(), which is a no-op
 * until this has loaded.
 */
export function MetaPixel({ pixelId }: { pixelId: string }) {
  const choice = useCookieChoice()

  useEffect(() => {
    const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq

    if (choice === 'accepted') {
      if (fbq) {
        fbq('consent', 'grant')
        return
      }
      const script = document.createElement('script')
      script.id = 'meta-pixel'
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('consent', 'grant');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `
      document.head.appendChild(script)
    } else if (choice === 'declined' && fbq) {
      fbq('consent', 'revoke')
      clearCookies(/^_fbp$/)
    }
  }, [choice, pixelId])

  return null
}
