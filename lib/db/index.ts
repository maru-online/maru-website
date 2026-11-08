/**
 * Multi-Database Connection Layer for Neon Serverless Postgres
 * 
 * Architecture:
 * - Single Neon Project with multiple logical databases
 * - Connection pooling via Neon's `-pooler` endpoint
 * - Separate Drizzle clients for domain isolation
 * 
 * Databases:
 * - maru_website: Core site data (users, sessions, content)
 * - maru_lead_engine: AI tools data (assessments, leads, pipeline analysis)
 */

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as websiteSchema from './schema/website';
import * as leadEngineSchema from './schema/lead-engine';

// Configure Neon for serverless environments
neonConfig.fetchConnectionCache = true;

// =============================================================================
// Connection Pool Caching (prevents connection exhaustion in development)
// =============================================================================

declare global {
  var _websitePool: Pool | undefined;
  var _leadEnginePool: Pool | undefined;
}

function getWebsitePool(): Pool {
  if (process.env.NODE_ENV === 'production') {
    return new Pool({ connectionString: process.env.DATABASE_URL_WEBSITE });
  }
  
  // In development, cache the pool to prevent hot-reload connection exhaustion
  if (!global._websitePool) {
    global._websitePool = new Pool({ connectionString: process.env.DATABASE_URL_WEBSITE });
  }
  return global._websitePool;
}

function getLeadEnginePool(): Pool {
  if (process.env.NODE_ENV === 'production') {
    return new Pool({ connectionString: process.env.DATABASE_URL_LEAD_ENGINE });
  }
  
  // In development, cache the pool to prevent hot-reload connection exhaustion
  if (!global._leadEnginePool) {
    global._leadEnginePool = new Pool({ connectionString: process.env.DATABASE_URL_LEAD_ENGINE });
  }
  return global._leadEnginePool;
}

// =============================================================================
// Drizzle Client Instances
// =============================================================================

/**
 * Website Database Client
 * Use for: users, sessions, general site data
 */
export const dbWebsite = drizzle(getWebsitePool(), { 
  schema: websiteSchema,
});

/**
 * Lead Engine Database Client  
 * Use for: assessments, leads, pipeline analysis, AI tool results
 */
export const dbLeadEngine = drizzle(getLeadEnginePool(), { 
  schema: leadEngineSchema,
});

// =============================================================================
// Health Check Utilities
// =============================================================================

export async function checkDatabaseConnections(): Promise<{
  website: boolean;
  leadEngine: boolean;
}> {
  const results = { website: false, leadEngine: false };
  
  try {
    const websitePool = getWebsitePool();
    await websitePool.query('SELECT 1');
    results.website = true;
  } catch (error) {
    console.error('Website database connection failed:', error);
  }
  
  try {
    const leadEnginePool = getLeadEnginePool();
    await leadEnginePool.query('SELECT 1');
    results.leadEngine = true;
  } catch (error) {
    console.error('Lead Engine database connection failed:', error);
  }
  
  return results;
}

/**
 * Check if databases are configured
 */
export function isDatabaseConfigured(db: 'website' | 'leadEngine' | 'both' = 'both'): boolean {
  switch (db) {
    case 'website':
      return !!process.env.DATABASE_URL_WEBSITE;
    case 'leadEngine':
      return !!process.env.DATABASE_URL_LEAD_ENGINE;
    case 'both':
    default:
      return !!process.env.DATABASE_URL_WEBSITE && !!process.env.DATABASE_URL_LEAD_ENGINE;
  }
}

// =============================================================================
// Re-export Schemas for Convenience
// =============================================================================

export { websiteSchema, leadEngineSchema };
