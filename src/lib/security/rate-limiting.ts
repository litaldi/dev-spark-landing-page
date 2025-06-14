
/**
 * Client-side rate limiting utilities
 */

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
}

interface RateLimitOptions {
  maxRequests: number;
  timeWindow?: number;
}

class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private blocked: Map<string, number> = new Map();

  isBlocked(key: string, config: RateLimitConfig): boolean {
    const blockedUntil = this.blocked.get(key);
    if (blockedUntil && Date.now() < blockedUntil) {
      return true;
    }
    
    if (blockedUntil && Date.now() >= blockedUntil) {
      this.blocked.delete(key);
      this.attempts.delete(key);
    }
    
    return false;
  }

  attempt(key: string, config: RateLimitConfig): boolean {
    if (this.isBlocked(key, config)) {
      return false;
    }

    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove attempts outside the window
    const validAttempts = attempts.filter(time => now - time < config.windowMs);
    
    if (validAttempts.length >= config.maxAttempts) {
      // Block the key
      const blockDuration = config.blockDurationMs || config.windowMs;
      this.blocked.set(key, now + blockDuration);
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    return true;
  }

  getRemainingAttempts(key: string, config: RateLimitConfig): number {
    if (this.isBlocked(key, config)) {
      return 0;
    }

    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    const validAttempts = attempts.filter(time => now - time < config.windowMs);
    
    return Math.max(0, config.maxAttempts - validAttempts.length);
  }

  getBlockedUntil(key: string): number | null {
    return this.blocked.get(key) || null;
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter();

/**
 * Simple rate limiting function for backward compatibility
 */
export function isRateLimited(key: string, options: RateLimitOptions): boolean {
  const config: RateLimitConfig = {
    maxAttempts: options.maxRequests,
    windowMs: options.timeWindow || 60000, // Default 1 minute
  };
  
  const storageKey = `rateLimit_${key}`;
  
  try {
    const stored = localStorage.getItem(storageKey);
    const attempts = stored ? JSON.parse(stored) : [];
    const now = Date.now();
    
    // Filter out old attempts
    const validAttempts = attempts.filter((time: number) => now - time < config.windowMs);
    
    if (validAttempts.length >= config.maxAttempts) {
      return true; // Rate limited
    }
    
    // Add this attempt
    validAttempts.push(now);
    localStorage.setItem(storageKey, JSON.stringify(validAttempts));
    
    return false; // Not rate limited
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return false; // Fail open
  }
}

// Common rate limit configurations
export const rateLimitConfigs = {
  login: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDurationMs: 30 * 60 * 1000, // 30 minutes
  },
  registration: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
    blockDurationMs: 60 * 60 * 1000, // 1 hour
  },
  passwordReset: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
    blockDurationMs: 60 * 60 * 1000, // 1 hour
  },
  apiRequest: {
    maxAttempts: 100,
    windowMs: 60 * 1000, // 1 minute
    blockDurationMs: 60 * 1000, // 1 minute
  }
};

export type { RateLimitConfig, RateLimitOptions };
