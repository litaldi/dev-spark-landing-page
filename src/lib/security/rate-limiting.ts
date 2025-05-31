
/**
 * Client-side rate limiting utilities
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  blockDurationMs: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 10,
  windowMs: 60000, // 1 minute
  blockDurationMs: 300000, // 5 minutes
};

const requestCounts: Record<string, { count: number; firstRequest: number; blocked?: number }> = {};

/**
 * Check if an action is rate limited
 * @param key Unique identifier for the action (e.g., 'login', 'search')
 * @param config Rate limiting configuration
 */
export function isRateLimited(key: string, config: Partial<RateLimitConfig> = {}): boolean {
  const { maxRequests, windowMs, blockDurationMs } = { ...DEFAULT_CONFIG, ...config };
  const now = Date.now();
  
  if (!requestCounts[key]) {
    requestCounts[key] = { count: 1, firstRequest: now };
    return false;
  }
  
  const record = requestCounts[key];
  
  // Check if currently blocked
  if (record.blocked && now - record.blocked < blockDurationMs) {
    return true;
  }
  
  // Reset if window has passed
  if (now - record.firstRequest > windowMs) {
    record.count = 1;
    record.firstRequest = now;
    record.blocked = undefined;
    return false;
  }
  
  // Increment count
  record.count++;
  
  // Check if limit exceeded
  if (record.count > maxRequests) {
    record.blocked = now;
    return true;
  }
  
  return false;
}

/**
 * Get remaining requests for a key
 */
export function getRemainingRequests(key: string, config: Partial<RateLimitConfig> = {}): number {
  const { maxRequests } = { ...DEFAULT_CONFIG, ...config };
  const record = requestCounts[key];
  
  if (!record) return maxRequests;
  
  return Math.max(0, maxRequests - record.count);
}

/**
 * Clear rate limit for a key
 */
export function clearRateLimit(key: string): void {
  delete requestCounts[key];
}
