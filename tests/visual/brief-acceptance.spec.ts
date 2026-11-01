import { test, expect, Page } from '@playwright/test'

/**
 * Acceptance tests for the Sep 2026 site-fix brief (items 01, 02, 03, 10).
 *
 * These live here rather than in a scratch script because the brief asks for
 * criteria that are "verifiable — screenshot, redirect check, or console output,
 * not 'looks right'".
 *
 * They must run in a real browser, not the agent preview pane: that pane
 * delivers no scroll events and no animation frames (requestAnimationFrame
 * never fires), so anything driven by scrolling — including the WhatsApp
 * bubble's collision check — cannot be observed there at all.
 */

const CONSENT_KEY = 'maru-cookie-consent'

/** Skip the consent banner so a test can look at the resting state of the page. */
async function withConsentGiven(page: Page) {
  await page.addInitScript(
    ([k]) => window.localStorage.setItem(k, 'accepted'),
    [CONSENT_KEY],
  )
}

// ─── Item 03 — WhatsApp bubble / CTA collision ───────────────────────────────

test.describe('item 03 — footer touch targets (the floating WhatsApp bubble was removed, B3)', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile-only bug')

  test('footer links meet a 44px touch target', async ({ page }) => {
    await withConsentGiven(page)
    await page.goto('/')

    const links = page.locator('footer a, footer button')
    const count = await links.count()
    expect(count).toBeGreaterThan(5)

    const undersized: string[] = []
    for (let i = 0; i < count; i++) {
      const el = links.nth(i)
      if (!(await el.isVisible())) continue
      const box = await el.boundingBox()
      if (!box) continue
      if (box.height < 44) {
        undersized.push(`${(await el.textContent())?.trim() || '(no text)'} → ${box.height}px`)
      }
    }
    expect(undersized, `footer targets under 44px:\n${undersized.join('\n')}`).toEqual([])
  })
})
