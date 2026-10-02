'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'

// ─── Nav link definitions ─────────────────────────────────────────────────────

const allLinks = [
  { label: 'About',        href: '/about' },
  { label: 'Services',     href: '/services' },
  { label: 'Pricing',      href: '/pricing' },
  // Insights is hidden until there is something behind it. The section renders
  // "New insights are on the way" with zero articles, and a nav item that leads
  // to an empty room costs credibility with exactly the buyer this site is for.
  // Restore this line the day the first article publishes.
  // { label: 'Insights',     href: '/insights' },
  { label: 'Contact',      href: '/contact' },
]

function isActive(href: string, pathname: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="18" y1="6" x2="6"  y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6"  y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Nav() {
  const pathname              = usePathname()
  const [isHero, setIsHero]   = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsHero(window.scrollY < window.innerHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* ── Skip to content ───────────────────────────────────────────────── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan focus:text-bg-darkest focus:font-body focus:text-[14px] focus:font-medium"
      >
        Skip to content
      </a>

      {/* ── Header bar ────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-[background-color,border-color] duration-300"
        style={{
          backgroundColor: isHero ? 'rgba(26,58,92,0.5)' : 'rgba(255,255,255,0.95)',
          borderBottomColor: isHero ? 'transparent' : 'var(--color-border-default)',
        }}
      >
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between h-[56px] lg:h-[64px] px-6 lg:px-[60px] max-w-[1200px] mx-auto"
        >
          {/* Logo */}
          <Link href="/" aria-label="Maru Online — home">
            <Image
              src="/images/brand/maru-logo-primary.png"
              alt="Maru Online"
              width={100}
              height={44}
              priority
              style={{
                height: '32px',
                width: 'auto',
                filter: isHero ? 'brightness(0) invert(1)' : 'none',
                transition: 'filter 0.3s ease',
              }}
            />
          </Link>

          {/* ── Desktop links ─────────────────────────────────────────────── */}
          <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
            {allLinks.map(({ label, href }) => {
              const active = isActive(href, pathname)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    data-active={active ? 'true' : undefined}
                    data-hero={isHero ? 'true' : undefined}
                    className={[
                      'font-body text-[14px] font-normal',
                      'relative pb-[2px]',
                      'transition-colors duration-200',
                      // active state — brand gold (legible on the navy hero and the white bar)
                      active
                        ? (isHero ? 'text-[var(--color-gold)]' : 'text-[var(--color-gold-antique)]')
                        // hero: white muted default, white on hover
                        : isHero
                          ? 'text-[var(--color-ink-inverted-muted)] hover:text-white'
                          // scrolled: slate default, dark navy on hover
                          : 'text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]',
                    ].join(' ')}
                  >
                    {label}
                    {/* Active underline dot */}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-[-4px] left-0 right-0 h-[2px] rounded-full bg-[var(--color-gold)]"
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* ── Desktop CTA ───────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="primary" href="/popia-ai-check" className="!px-5 !py-2 !text-[11px]">
              Start the assessment
            </Button>
          </div>

          {/* ── Mobile hamburger ──────────────────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex flex-col justify-center gap-[6px] w-7 h-7 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-cyan/30 rounded-sm transition-colors duration-300"
              style={{ color: isHero ? '#FFFFFF' : 'var(--color-ink-secondary)' }}
            >
              <span className="block w-7 h-[1.5px] bg-current" />
              <span className="block w-7 h-[1.5px] bg-current" />
              <span className="block w-7 h-[1.5px] bg-current" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile full-screen overlay ────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[60] bg-bg-darkest flex flex-col px-6 pt-6 pb-10"
          >
            {/* Close */}
            <div className="flex justify-end mb-10">
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="text-ink-inverted hover:text-cyan transition-colors duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-cyan/30 rounded-sm p-1 -m-1"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Links */}
            <ul className="flex flex-col gap-8 flex-1 list-none m-0 p-0">
              {allLinks.map(({ label, href }, index) => {
                const active = isActive(href, pathname)
                return (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 + index * 0.05 }}
                  >
                    <Link
                      href={href}
                      onClick={closeMenu}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'font-body font-light text-[24px] transition-colors duration-150',
                        active ? 'text-[var(--color-gold)]' : 'text-ink-inverted hover:text-[var(--color-cyan)]',
                      ].join(' ')}
                    >
                      {label}
                    </Link>
                  </motion.li>
                )
              })}
            </ul>

            {/* CTA */}
            <div className="pt-8" onClick={closeMenu}>
              <Button variant="primary" href="/popia-ai-check" className="w-full !justify-center">
                Start the assessment
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
