'use client';
import { useState, useEffect } from 'react';

// ─── Cookie choice ────────────────────────────────────────────────────────────
// The banner offers one choice: accept or decline analytics and marketing
// cookies. It is stored as the plain string 'accepted' or 'declined' (the
// Playwright helpers seed the same value). Until a visitor accepts, GA4 runs in
// Consent Mode with storage denied and the Meta Pixel is not loaded at all.
// Before 28 Sep 2026 the banner stored the choice and nothing read it.

export const COOKIE_CONSENT_KEY = 'maru-cookie-consent';
export type CookieChoice = 'accepted' | 'declined';

/** Fired on window whenever the visitor makes or changes their choice. */
export const COOKIE_CHOICE_EVENT = 'maru:cookie-choice';
/** Fired by "Manage Cookie Preferences" (footer, cookie policy) to reopen the banner. */
export const OPEN_COOKIE_PREFERENCES_EVENT = 'open-cookie-preferences';

export const getCookieChoice = (): CookieChoice | null => {
  if (typeof window === 'undefined') return null;
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
};

export const setCookieChoice = (choice: CookieChoice) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent<CookieChoice>(COOKIE_CHOICE_EVENT, { detail: choice }));
};

/** The visitor's current choice; null until they make one (and during SSR). */
export const useCookieChoice = (): CookieChoice | null => {
  const [choice, setChoice] = useState<CookieChoice | null>(null);

  useEffect(() => {
    setChoice(getCookieChoice());
    const handler = (e: Event) => setChoice((e as CustomEvent<CookieChoice>).detail);
    window.addEventListener(COOKIE_CHOICE_EVENT, handler);
    return () => window.removeEventListener(COOKIE_CHOICE_EVENT, handler);
  }, []);

  return choice;
};

/**
 * Expire every cookie whose name matches, on each domain it may have been set
 * for (GA4 writes _ga on the registrable domain, e.g. .maruonline.com).
 */
export const clearCookies = (pattern: RegExp) => {
  if (typeof document === 'undefined') return;
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((name) => pattern.test(name))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
      });
    });
};

// ─── Cookie banner visibility ─────────────────────────────────────────────────
// The banner is fixed at bottom-left (300px wide) and the floating WhatsApp
// bubble is fixed at bottom-right. On a 375px viewport those two overlap by
// 33×44px, and because the bubble paints over the banner it lands directly on
// the DECLINE button — an overlay obstructing a consent control. Measured live
// at 375×812 on 3 Sep 2026 before this fix.
//
// Rather than nudge either element and hope, the bubble subscribes to this
// signal and takes itself out of the way while the banner is up.

export const COOKIE_BANNER_EVENT = 'maru:cookie-banner-visibility';

let bannerVisible = false;

/** Called by the banner itself as it mounts and dismisses. */
export const setCookieBannerVisible = (visible: boolean) => {
  if (typeof window === 'undefined') return;
  bannerVisible = visible;
  window.dispatchEvent(new CustomEvent(COOKIE_BANNER_EVENT, { detail: visible }));
};

/** True while the consent banner is on screen. Safe during SSR (returns false). */
export const useCookieBannerVisible = (): boolean => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // The banner mounts on an 800ms timer, so it may already be up (or already
    // dismissed) by the time a subscriber mounts. Seed from the module value.
    setVisible(bannerVisible);
    const handler = (e: Event) => setVisible((e as CustomEvent<boolean>).detail);
    window.addEventListener(COOKIE_BANNER_EVENT, handler);
    return () => window.removeEventListener(COOKIE_BANNER_EVENT, handler);
  }, []);

  return visible;
};
