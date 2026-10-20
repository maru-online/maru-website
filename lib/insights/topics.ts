/**
 * The Insights hub filters on two reader-facing topics, not on the six editorial
 * categories in categoryImages.ts. "Compliance" articles are the POPIA topic;
 * everything else is AI in business. If a third topic is ever needed, add it
 * here and to the hub's filter — the Sanity schema does not have to change.
 */
export const INSIGHT_TOPICS = ['AI in business', 'POPIA'] as const
export type InsightTopic = (typeof INSIGHT_TOPICS)[number]

export function topicFor(category?: string | null): InsightTopic {
  return category === 'Compliance' ? 'POPIA' : 'AI in business'
}
