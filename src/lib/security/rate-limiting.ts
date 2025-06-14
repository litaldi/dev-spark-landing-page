
/**
 * Enhanced rate limiting with multiple strategies
 */

interface RateLimitConfig {
  maxRequests: number;
  timeWindow: number; // in milliseconds
  blockDuration?: number; // in milliseconds
  strategy?: 'sliding' | 'fixed';
}

interface RateLimitResult {
  isAllowed: boolean;
  remainingRequests: number;
  resetTime: number;
  retryAfter?: number;
}

interface RateLimitEntry {
  requests: number[];
  blockedUntil?: number;
  strategy: 'sliding' | 'fixed';
  windowStart?: number;
}

class EnhancedRateLimit {
  private static storage = new Map<string, RateLimitEntry>();
  private static readonly CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
  private static cleanupTimer: NodeJS.Timeout | null = null;

  /**
   * Check if request is rate limited
   */
  static checkLimit(key: string, config: RateLimitConfig): RateLimitResult {
    this.ensureCleanup();
    
    const now = Date.now();
    const entry = this.getOrCreateEntry(key, config);

    // Check if currently blocked
    if (entry.blockedUntil && now < entry.blockedUntil) {
      return {
        isAllowed: false,
        remainingRequests: 0,
        resetTime: entry.blockedUntil,
        retryAfter: entry.blockedUntil - now
      };
    }

    // Clear block if expired
    if (entry.blockedUntil && now >= entry.blockedUntil) {
      entry.blockedUntil = undefined;
      entry.requests = [];
    }

    const result = config.strategy === 'sliding' 
      ? this.checkSlidingWindow(entry, config, now)
      : this.checkFixedWindow(entry, config, now);

    // Apply blocking if limit exceeded
    if (!result.isAllowed && config.blockDuration) {
      entry.blockedUntil = now + config.blockDuration;
      entry.requests = [];
    }

    this.storage.set(key, entry);
    return result;
  }

  /**
   * Register a request attempt
   */
  static registerRequest(key: string, config: RateLimitConfig): RateLimitResult {
    const result = this.checkLimit(key, config);
    
    if (result.isAllowed) {
      const entry = this.storage.get(key)!;
      entry.requests.push(Date.now());
      this.storage.set(key, entry);
    }
    
    return result;
  }

  /**
   * Sliding window rate limiting
   */
  private static checkSlidingWindow(
    entry: RateLimitEntry, 
    config: RateLimitConfig, 
    now: number
  ): RateLimitResult {
    const windowStart = now - config.timeWindow;
    
    // Remove old requests outside the window
    entry.requests = entry.requests.filter(time => time > windowStart);
    
    const remainingRequests = Math.max(0, config.maxRequests - entry.requests.length);
    const isAllowed = entry.requests.length < config.maxRequests;
    
    let resetTime = now + config.timeWindow;
    if (entry.requests.length > 0) {
      resetTime = entry.requests[0] + config.timeWindow;
    }

    return {
      isAllowed,
      remainingRequests,
      resetTime
    };
  }

  /**
   * Fixed window rate limiting
   */
  private static checkFixedWindow(
    entry: RateLimitEntry, 
    config: RateLimitConfig, 
    now: number
  ): RateLimitResult {
    const windowStart = entry.windowStart || now;
    const windowEnd = windowStart + config.timeWindow;

    // Reset window if expired
    if (now >= windowEnd) {
      entry.requests = [];
      entry.windowStart = now;
    }

    const remainingRequests = Math.max(0, config.maxRequests - entry.requests.length);
    const isAllowed = entry.requests.length < config.maxRequests;

    return {
      isAllowed,
      remainingRequests,
      resetTime: entry.windowStart! + config.timeWindow
    };
  }

  /**
   * Get or create rate limit entry
   */
  private static getOrCreateEntry(key: string, config: RateLimitConfig): RateLimitEntry {
    let entry = this.storage.get(key);
    
    if (!entry) {
      entry = {
        requests: [],
        strategy: config.strategy || 'sliding'
      };
    }

    return entry;
  }

  /**
   * Reset rate limit for a key
   */
  static resetLimit(key: string): void {
    this.storage.delete(key);
  }

  /**
   * Clear all rate limits
   */
  static clearAllLimits(): void {
    this.storage.clear();
  }

  /**
   * Get current status for a key
   */
  static getStatus(key: string, config: RateLimitConfig): RateLimitResult {
    return this.checkLimit(key, config);
  }

  /**
   * Ensure cleanup timer is running
   */
  private static ensureCleanup(): void {
    if (!this.cleanupTimer) {
      this.cleanupTimer = setInterval(() => {
        this.cleanup();
      }, this.CLEANUP_INTERVAL);
    }
  }

  /**
   * Clean up expired entries
   */
  private static cleanup(): void {
    const now = Date.now();
    
    for (const [key, entry] of this.storage.entries()) {
      // Remove entries that are no longer blocked and have no recent requests
      const hasRecentRequests = entry.requests.some(time => 
        now - time < this.CLEANUP_INTERVAL
      );
      
      const isBlocked = entry.blockedUntil && now < entry.blockedUntil;
      
      if (!hasRecentRequests && !isBlocked) {
        this.storage.delete(key);
      }
    }
  }

  /**
   * Get storage size for monitoring
   */
  static getStorageSize(): number {
    return this.storage.size;
  }
}

// Legacy compatibility function
export function isRateLimited(key: string, options: { maxRequests: number; timeWindow?: number }): boolean {
  const config: RateLimitConfig = {
    maxRequests: options.maxRequests,
    timeWindow: options.timeWindow || 60000, // 1 minute default
    strategy: 'sliding'
  };
  
  const result = EnhancedRateLimit.registerRequest(key, config);
  return !result.isAllowed;
}

// Legacy compatibility function  
export function checkRateLimit(key: string): boolean {
  const config: RateLimitConfig = {
    maxRequests: 10,
    timeWindow: 60000, // 1 minute
    strategy: 'sliding'
  };
  
  const result = EnhancedRateLimit.checkLimit(key, config);
  return result.isAllowed;
}

export { EnhancedRateLimit };
export type { RateLimitConfig, RateLimitResult };
