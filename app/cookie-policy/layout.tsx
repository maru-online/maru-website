import type { Metadata } from 'next'
import { seo } from '@/lib/seo'

// page.tsx is a client component — see app/popia-ai-check/layout.tsx.
export const metadata: Metadata = {
  title:       'Cookie Policy | Maru Online',
  description: 'How Maru Online uses cookies and similar technologies, and how to control them.',
  ...seo('/cookie-policy'),
}

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
