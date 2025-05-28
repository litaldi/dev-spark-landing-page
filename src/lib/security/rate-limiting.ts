
/**
 * Client-side rate limiting utilities
 */

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  windowStart: number;
}

const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const RATE_LIMIT_STORAGE_KEY = 'rate_limits';

/**
 * Checks if an action is rate limited
 * @param key Unique identifier for the action
 * @param maxAttempts Maximum attempts allowed in the time window
 * @param windowMs Time window in milliseconds (default: 1 minute)
 */
export function isRateLimited(
  key: string, 
  maxAttempts: number, 
  windowMs: number = RATE_LIMIT_WINDOW
): boolean {
  try {
    const now = Date.now();
    const stored = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    const rateLimits: Record<string, RateLimitEntry> = stored ? JSON.parse(stored) : {};
    
    const entry = rateLimits[key];
    
    // If no entry exists, create one and allow the request
    if (!entry) {
      rateLimits[key] = {
        count: 1,
        firstAttempt: now,
        windowStart: now
      };
      localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(rateLimits));
      return false;
    }
    
    // Check if we're outside the time window
    if (now - entry.windowStart > windowMs) {
      // Reset the window
      rateLimits[key] = {
        count: 1,
        firstAttempt: now,
        windowStart: now
      };
      localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(rateLimits));
      return false;
    }
    
    // Check if we've exceeded the rate limit
    if (entry.count >= maxAttempts) {
      return true;
    }
    
    // Increment the count
    entry.count++;
    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(rateLimits));
    return false;
    
  } catch (error) {
    console.error('Rate limiting error:', error);
    // Fail open - allow the request if there's an error
    return false;
  }
}

/**
 * Clears rate limit data for a specific key
 */
export function clearRateLimit(key: string): void {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    if (!stored) return;
    
    const rateLimits: Record<string, RateLimitEntry> = JSON.parse(stored);
    delete rateLimits[key];
    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(rateLimits));
  } catch (error) {
    console.error('Clear rate limit error:', error);
  }
}

/**
 * Gets remaining attempts for a rate limited action
 */
export function getRemainingAttempts(key: string, maxAttempts: number): number {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    if (!stored) return maxAttempts;
    
    const rateLimits: Record<string, RateLimitEntry> = JSON.parse(stored);
    const entry = rateLimits[key];
    
    if (!entry) return maxAttempts;
    
    const now = Date.now();
    
    // Check if we're outside the time window
    if (now - entry.windowStart > RATE_LIMIT_WINDOW) {
      return maxAttempts;
    }
    
    return Math.max(0, maxAttempts - entry.count);
  } catch (error) {
    console.error('Get remaining attempts error:', error);
    return maxAttempts;
  }
}
