'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { footerNavigation } from '@/data/footer-navigation'

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

// ─── Shared link class ────────────────────────────────────────────────────────

// min-h-[44px] + inline-flex is the tap-target fix: these links rendered at
// ~15–16px tall, well under the 44px Apple HIG / WCAG AAA target size. The font
// size is deliberately unchanged — the height comes from the box, not the type.
// The vertical lists below drop their gap-3 to compensate, so the taller rows
// tile edge to edge instead of ballooning the footer or overlapping each other.
// Colour, weight and the hover lift live in .footer-link (globals.css). They
// used to be inline styles, which beat the hover class, so hover never showed.
const linkClass = 'footer-link font-body inline-flex items-center min-h-[44px]'

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer({ showInsights = false }: { showInsights?: boolean }) {
  return (
    <>
      <footer className="relative" style={{ background: 'var(--gradient-footer)' }}>
        {/* Same column as the page content (sec-inner, 1120px) — it was capped
            at 900px, which wrapped links and made the footer feel cramped. */}
        <div className="px-6 md:px-[60px] py-20">
          <div className="sec-inner">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
          >
            {/* ── 5 columns (5 Nov 2026): brand gets the wider share; legal
                links moved out of the bottom bar into their own column. ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-12">

              {/* Brand column */}
              <motion.div variants={itemVariants} className="col-span-2 md:col-span-4 lg:col-span-1 lg:pr-8">
                <Link
                  href="/"
                  aria-label="Maru Online — home"
                  className="inline-flex items-center py-1 mb-5"
                >
                  <Image
                    src="/images/brand/maru-logo-reversed.png"
                    alt="Maru Online"
                    width={120}
                    height={52}
                    style={{ height: '36px', width: 'auto' }}
                  />
                </Link>
                <p className="footer-text font-body leading-relaxed mb-6">
                  Practical digital systems and POPIA-aware AI implementation.
                </p>
                {/* Social icons */}
                <div className="flex items-center gap-3">
                  {footerNavigation.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="footer-social h-11 w-11 rounded-full flex items-center justify-center"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Navigation column */}
              <motion.div variants={itemVariants}>
                <h4
                  className="font-body font-medium text-[11px] tracking-[var(--tracking-eyebrow)] uppercase mb-6"
                  style={{ color: 'var(--color-ink-inverted)' }}
                >
                  Navigation
                </h4>
                <ul className="flex flex-col list-none m-0 p-0">
                  {footerNavigation.main.filter((i) => showInsights || i.href !== '/insights-resources').map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={linkClass}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* What we do column */}
              <motion.div variants={itemVariants}>
                <h4
                  className="font-body font-medium text-[11px] tracking-[var(--tracking-eyebrow)] uppercase mb-6"
                  style={{ color: 'var(--color-ink-inverted)' }}
                >
                  What we do
                </h4>
                <ul className="flex flex-col list-none m-0 p-0">
                  {[
                    { name: 'How we work',               href: '/#how-we-work' },
                    { name: 'Supporting capabilities',   href: '/#capabilities' },
                    { name: 'Free POPIA review',          href: '/popia-ai-check' },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={linkClass}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact column */}
              <motion.div variants={itemVariants}>
                <h4
                  className="font-body font-medium text-[11px] tracking-[var(--tracking-eyebrow)] uppercase mb-6"
                  style={{ color: 'var(--color-ink-inverted)' }}
                >
                  Get in Touch
                </h4>
                <ul className="flex flex-col list-none m-0 p-0">
                  <li>
                    <TrackedLink
                      href="mailto:hello@maruonline.com"
                      event="email_click"
                      eventData={{ source: 'footer' }}
                      className={linkClass}
                    >
                      hello@maruonline.com
                    </TrackedLink>
                  </li>
                  <li className="footer-text font-body py-2">
                    Gauteng, South Africa
                  </li>
                </ul>
              </motion.div>

              {/* Legal column */}
              <motion.div variants={itemVariants}>
                <h4
                  className="font-body font-medium text-[11px] tracking-[var(--tracking-eyebrow)] uppercase mb-6"
                  style={{ color: 'var(--color-ink-inverted)' }}
                >
                  Legal
                </h4>
                <ul className="flex flex-col list-none m-0 p-0">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className={linkClass}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
                      className={linkClass}
                    >
                      Cookie Preferences
                    </button>
                  </li>
                </ul>
              </motion.div>

            </div>

            {/* ── Bottom bar ─────────────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className="mt-16 pt-8"
              style={{ borderTop: '1px solid var(--footer-rule)' }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                {/* Copyright */}
                <p className="footer-legal font-body">
                  © {new Date().getFullYear()} Maru Online. All Rights Reserved.
                </p>


              </div>
            </motion.div>

          </motion.div>
          </div>
        </div>
      </footer>
    </>
  )
}
