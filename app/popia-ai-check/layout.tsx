import type { Metadata } from 'next'
import { seo } from '@/lib/seo'

// page.tsx is a client component and cannot export metadata, so the route's
// canonical and OG live here. Without this the root layout's canonical applied
// and told Google this page was a duplicate of the homepage. (T1)
export const metadata: Metadata = {
  title:       'Free, Informational POPIA Review | Maru Online',
  description: 'Understand how your business handles information when your team uses AI. Answer 10 questions in about five minutes and receive a short report with actions to prioritise. Informational, not legal advice.',
  ...seo('/popia-ai-check'),
}

export default function PopiaAiCheckLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
