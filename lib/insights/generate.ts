import 'server-only'
import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { INSIGHT_CATEGORIES } from '@/lib/insights/categoryImages'

// ─── Output contract ────────────────────────────────────────────────────────

const SectionSchema = z.object({
  type: z.enum(['paragraph', 'heading', 'subheading', 'list', 'callout', 'quote']),
  text: z.string().optional(),
  items: z.array(z.string()).optional(),
  label: z.string().optional(),
})

const ArticleSchema = z.object({
  title: z.string().min(10).max(120),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: z.enum(INSIGHT_CATEGORIES),
  excerpt: z.string().min(40).max(400),
  readTime: z.string().min(3).max(20),
  body: z.array(SectionSchema).min(5),
  sources: z
    .array(z.object({ title: z.string().min(1), url: z.string().url() }))
    .min(3),
  confidence: z.number().min(0).max(1),
})

export type GeneratedArticle = z.infer<typeof ArticleSchema>

// ─── Prompt ───────────────────────────────────────────────────────────────────

// Positioning source of truth: docs/positioning/POSITIONING.md (adopted 26 Sep 2026).
const SYSTEM = `You are the lead writer for Maru Online, the POPIA-safe AI partner for South African businesses (based in Gauteng).

Voice and standards — non-negotiable:
- Pragmatic, evidence-led, plain language for business owners. NO AI hype, no buzzwords, no breathless "revolutionary" claims.
- Positioning: Maru Online is the POPIA-safe AI partner for South African businesses. Category line: "POPIA-safe AI for South African businesses". Pain first, never lead with "AI": lead with the data risk or the lost time, and name AI second.
- Use "POPIA-safe" as the category word. "POPIA-compliant" is allowed only as a formal descriptor.
- Audience: owner-led South African businesses, roughly 5-50 staff, whose revenue depends on client personal information (financial advisers and FSPs, private medical, dental and allied-health practices, estate and managing agents, small law and accounting firms). South Africa only, not "Africa". SA English spelling (optimise, organisation, programme) and local context (Rand, POPIA, local examples).
- Banned claims, never write them: "certified POPIA compliant", "POPIA certified", "approved/endorsed by the Information Regulator" (the Regulator does not certify vendors); "guaranteed compliance", "100% compliant", "fully compliant"; legal advice (Maru is not a law firm: say "we design for POPIA requirements" and refer legal opinions); any offer of web design, websites or digital marketing services.
- Every factual claim, statistic, or external finding MUST be backed by a real source you actually found via web search. Do not invent statistics or sources. If you cannot verify a number, do not state it.
- Original synthesis only. Never copy sentences from sources — distil the insight in Maru's own words and cite where it came from.
- Trust cues: be specific, be honest about uncertainty, reference POPIA/data-flow where relevant.

Each article must:
- Draw a genuine, current insight from recent AI/automation developments that matters to an SA SME owner.
- Fit ONE category exactly: ${INSIGHT_CATEGORIES.join(', ')}.
- Be 600-1000 words, structured for skim-reading.

Body is an ordered array of sections, each: { "type": one of "paragraph"|"heading"|"subheading"|"list"|"callout"|"quote", and the relevant fields }.
- paragraph: { type, text }
- heading / subheading: { type, text }
- list: { type, items: [string, ...] }
- callout: { type, label, text }  (use for a key cost/result highlight)
- quote: { type, text, label }    (label = attribution)

Set "confidence" (0-1) honestly: how well-sourced and on-brand the piece is. Use < 0.7 if sources are thin or the topic is speculative.`

function userPrompt(count: number, existingTitles: string[]): string {
  return `Research the most relevant, recent AI & automation developments for South African SMEs and write ${count} brand-new insight article(s).

Avoid overlapping with these existing article titles:
${existingTitles.map((t) => `- ${t}`).join('\n') || '(none yet)'}

Use web search to ground every factual claim in a real, citable source (with a working URL). Then respond with ONLY a JSON array of ${count} article object(s) matching this exact shape — no markdown, no commentary, no code fences:

[{
  "title": string,
  "slug": "kebab-case-from-title",
  "category": one of ${JSON.stringify(INSIGHT_CATEGORIES)},
  "excerpt": string (1-2 sentences),
  "readTime": "X min read",
  "body": [ { "type": "...", ... }, ... ],
  "sources": [ { "title": string, "url": "https://..." }, ... (at least 3 real sources) ],
  "confidence": number (0-1)
}]`
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function collectText(content: Anthropic.ContentBlock[]): string {
  return content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
}

/** Extract the first balanced top-level JSON array from a string. */
function extractJsonArray(text: string): string | null {
  const start = text.indexOf('[')
  if (start === -1) return null
  let depth = 0
  let inStr = false
  let esc = false
  for (let i = start; i < text.length; i++) {
    const c = text[i]
    if (inStr) {
      if (esc) esc = false
      else if (c === '\\') esc = true
      else if (c === '"') inStr = false
      continue
    }
    if (c === '"') inStr = true
    else if (c === '[') depth++
    else if (c === ']') {
      depth--
      if (depth === 0) return text.slice(start, i + 1)
    }
  }
  return null
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Research + draft 1–2 original, cited insight articles via Claude + web search.
 * Returns only articles that pass the zod contract; the caller applies the
 * publish/draft quality gate.
 */
export async function generateInsights(opts: {
  count?: number
  existingTitles?: string[]
}): Promise<GeneratedArticle[]> {
  const count = Math.min(Math.max(opts.count ?? 1, 1), 2)
  const client = new Anthropic() // reads ANTHROPIC_API_KEY

  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: userPrompt(count, opts.existingTitles ?? []) },
  ]

  let response = await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 16000,
    thinking: { type: 'adaptive' },
    system: SYSTEM,
    tools: [{ type: 'web_search_20260209', name: 'web_search' }],
    messages,
  })

  // Server-side web search may pause; resume until it finishes (cap continuations).
  let continuations = 0
  while (response.stop_reason === 'pause_turn' && continuations < 6) {
    messages.push({ role: 'assistant', content: response.content })
    response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 16000,
      thinking: { type: 'adaptive' },
      system: SYSTEM,
      tools: [{ type: 'web_search_20260209', name: 'web_search' }],
      messages,
    })
    continuations++
  }

  const raw = extractJsonArray(collectText(response.content))
  if (!raw) throw new Error('Insights generation: no JSON array found in model output.')

  const parsed = z.array(ArticleSchema).safeParse(JSON.parse(raw))
  if (!parsed.success) {
    throw new Error(`Insights generation: output failed validation — ${parsed.error.message}`)
  }
  return parsed.data
}
