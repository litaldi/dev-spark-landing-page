
/**
 * Enhanced rate limiting utilities with blocking and advanced features
 */

export interface RateLimitConfig {
  maxRequests: number;
  timeWindow: number; // in milliseconds
  blockDuration?: number; // in milliseconds
}

interface RateLimitEntry {
  count: number;
  firstRequest: number;
  lastRequest: number;
  isBlocked?: boolean;
  blockStartTime?: number;
}

interface RateLimitResult {
  isAllowed: boolean;
  remainingRequests: number;
  retryAfter?: number;
}

const rateLimitStore: Map<string, RateLimitEntry> = new Map();

export class EnhancedRateLimit {
  /**
   * Check if a request should be rate limited
   */
  static checkLimit(key: string, config: RateLimitConfig): RateLimitResult {
    const now = Date.now();
    const existing = rateLimitStore.get(key);
    
    if (!existing) {
      return {
        isAllowed: true,
        remainingRequests: config.maxRequests - 1
      };
    }
    
    // Check if currently blocked
    if (existing.isBlocked && existing.blockStartTime) {
      const blockDuration = config.blockDuration || config.timeWindow;
      const timeInBlock = now - existing.blockStartTime;
      
      if (timeInBlock < blockDuration) {
        return {
          isAllowed: false,
          remainingRequests: 0,
          retryAfter: blockDuration - timeInBlock
        };
      } else {
        // Block period expired, reset
        rateLimitStore.set(key, {
          count: 0,
          firstRequest: now,
          lastRequest: now,
          isBlocked: false
        });
        return {
          isAllowed: true,
          remainingRequests: config.maxRequests - 1
        };
      }
    }
    
    // Check if time window has expired
    if (now - existing.firstRequest >= config.timeWindow) {
      return {
        isAllowed: true,
        remainingRequests: config.maxRequests - 1
      };
    }
    
    // Check if we've exceeded the limit
    if (existing.count >= config.maxRequests) {
      return {
        isAllowed: false,
        remainingRequests: 0,
        retryAfter: config.blockDuration || config.timeWindow
      };
    }
    
    return {
      isAllowed: true,
      remainingRequests: config.maxRequests - existing.count - 1
    };
  }
  
  /**
   * Register a request attempt
   */
  static registerRequest(key: string, config: RateLimitConfig): RateLimitResult {
    const now = Date.now();
    const existing = rateLimitStore.get(key);
    
    if (!existing) {
      // First request for this key
      rateLimitStore.set(key, {
        count: 1,
        firstRequest: now,
        lastRequest: now
      });
      return {
        isAllowed: true,
        remainingRequests: config.maxRequests - 1
      };
    }
    
    // Check if currently blocked
    if (existing.isBlocked && existing.blockStartTime) {
      const blockDuration = config.blockDuration || config.timeWindow;
      const timeInBlock = now - existing.blockStartTime;
      
      if (timeInBlock < blockDuration) {
        return {
          isAllowed: false,
          remainingRequests: 0,
          retryAfter: blockDuration - timeInBlock
        };
      } else {
        // Block period expired, reset and allow this request
        rateLimitStore.set(key, {
          count: 1,
          firstRequest: now,
          lastRequest: now,
          isBlocked: false
        });
        return {
          isAllowed: true,
          remainingRequests: config.maxRequests - 1
        };
      }
    }
    
    // Check if time window has expired
    if (now - existing.firstRequest >= config.timeWindow) {
      // Reset the counter
      rateLimitStore.set(key, {
        count: 1,
        firstRequest: now,
        lastRequest: now
      });
      return {
        isAllowed: true,
        remainingRequests: config.maxRequests - 1
      };
    }
    
    // Check if we've exceeded the limit
    if (existing.count >= config.maxRequests) {
      // Block the user
      rateLimitStore.set(key, {
        ...existing,
        isBlocked: true,
        blockStartTime: now
      });
      
      return {
        isAllowed: false,
        remainingRequests: 0,
        retryAfter: config.blockDuration || config.timeWindow
      };
    }
    
    // Increment counter
    rateLimitStore.set(key, {
      ...existing,
      count: existing.count + 1,
      lastRequest: now
    });
    
    return {
      isAllowed: true,
      remainingRequests: config.maxRequests - existing.count - 1
    };
  }
  
  /**
   * Reset rate limit for a key
   */
  static resetLimit(key: string): void {
    rateLimitStore.delete(key);
  }
  
  /**
   * Clear all rate limits
   */
  static clearAllLimits(): void {
    rateLimitStore.clear();
  }
}

// Legacy exports for backward compatibility
export function isRateLimited(
  key: string, 
  options: { maxRequests?: number; timeWindow?: number } = {}
): boolean {
  const { maxRequests = 10, timeWindow = 60000 } = options;
  const config: RateLimitConfig = { maxRequests, timeWindow };
  const result = EnhancedRateLimit.checkLimit(key, config);
  
  if (result.isAllowed) {
    EnhancedRateLimit.registerRequest(key, config);
  }
  
  return !result.isAllowed;
}

export function getRateLimitStatus(key: string): {
  count: number;
  remaining: number;
  resetTime: number;
} | null {
  const entry = rateLimitStore.get(key);
  
  if (!entry) {
    return null;
  }
  
  const maxRequests = 10; // Default
  const timeWindow = 60000; // Default
  
  return {
    count: entry.count,
    remaining: Math.max(0, maxRequests - entry.count),
    resetTime: entry.firstRequest + timeWindow
  };
}

export function clearRateLimit(key: string): void {
  EnhancedRateLimit.resetLimit(key);
}

export function clearAllRateLimits(): void {
  EnhancedRateLimit.clearAllLimits();
}
