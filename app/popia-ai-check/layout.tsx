import type { Metadata } from 'next'
import { seo } from '@/lib/seo'

// page.tsx is a client component and cannot export metadata, so the route's
// canonical and OG live here. Without this the root layout's canonical applied
// and told Google this page was a duplicate of the homepage. (T1)
export const metadata: Metadata = {
  title:       'Free POPIA-Safe AI Check | Maru Online',
  description: 'Ten questions, about three minutes. See where client information goes through your AI tools, apps and WhatsApp, and what to fix first. Free, emailed to you.',
  ...seo('/popia-ai-check'),
}

export default function PopiaAiCheckLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
