
/**
 * Rate limiting utilities
 */

interface RateLimitOptions {
  maxRequests?: number;
  timeWindow?: number; // in milliseconds
}

interface RateLimitEntry {
  count: number;
  firstRequest: number;
  lastRequest: number;
}

const rateLimitStore: Map<string, RateLimitEntry> = new Map();

/**
 * Check if a request should be rate limited
 */
export function isRateLimited(
  key: string, 
  options: RateLimitOptions = {}
): boolean {
  const { maxRequests = 10, timeWindow = 60000 } = options;
  const now = Date.now();
  
  const existing = rateLimitStore.get(key);
  
  if (!existing) {
    // First request for this key
    rateLimitStore.set(key, {
      count: 1,
      firstRequest: now,
      lastRequest: now
    });
    return false;
  }
  
  // Check if time window has expired
  if (now - existing.firstRequest >= timeWindow) {
    // Reset the counter
    rateLimitStore.set(key, {
      count: 1,
      firstRequest: now,
      lastRequest: now
    });
    return false;
  }
  
  // Check if we've exceeded the limit
  if (existing.count >= maxRequests) {
    return true;
  }
  
  // Increment counter
  rateLimitStore.set(key, {
    ...existing,
    count: existing.count + 1,
    lastRequest: now
  });
  
  return false;
}

/**
 * Get rate limit status for a key
 */
export function getRateLimitStatus(key: string): {
  count: number;
  remaining: number;
  resetTime: number;
} | null {
  const entry = rateLimitStore.get(key);
  
  if (!entry) {
    return null;
  }
  
  const maxRequests = 10; // Default, should match your rate limit
  const timeWindow = 60000; // Default, should match your rate limit
  
  return {
    count: entry.count,
    remaining: Math.max(0, maxRequests - entry.count),
    resetTime: entry.firstRequest + timeWindow
  };
}

/**
 * Clear rate limit for a key
 */
export function clearRateLimit(key: string): void {
  rateLimitStore.delete(key);
}

/**
 * Clear all rate limits (useful for testing)
 */
export function clearAllRateLimits(): void {
  rateLimitStore.clear();
}
