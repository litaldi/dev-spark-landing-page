
/**
 * Rate limiting utility to prevent brute force attacks
 * @param key Identifier for the rate limit
 * @param maxAttempts Maximum number of attempts allowed
 * @param timeWindow Time window in ms (default: 60000ms = 1 minute)
 * @returns Boolean indicating if rate limit is exceeded
 */
export function isRateLimited(key: string, maxAttempts: number, timeWindow = 60000): boolean {
  try {
    const now = Date.now();
    const storageKey = `rateLimit_${key}`;
    const storedData = localStorage.getItem(storageKey);
    
    let attempts: {timestamp: number}[] = [];
    if (storedData) {
      attempts = JSON.parse(storedData);
      // Filter out attempts outside the time window
      attempts = attempts.filter(attempt => now - attempt.timestamp < timeWindow);
    }
    
    // Check if max attempts exceeded
    if (attempts.length >= maxAttempts) {
      return true;
    }
    
    // Add new attempt
    attempts.push({ timestamp: now });
    localStorage.setItem(storageKey, JSON.stringify(attempts));
    return false;
  } catch (error) {
    console.error('Rate limiting error:', error);
    return false; // Fail open if storage is unavailable
  }
}

/**
 * Detects storage tampering attempts
 * This helps protect against some client-side attacks
 */
export function detectStorageTampering(key: string, expectedType: 'string' | 'boolean' | 'number' | 'object'): boolean {
  try {
    const value = localStorage.getItem(key);
    
    // Check if the item exists
    if (!value) return false;
    
    // Type checking based on expected type
    switch (expectedType) {
      case 'string':
        return typeof value === 'string';
      case 'boolean':
        const boolValue = JSON.parse(value);
        return typeof boolValue === 'boolean';
      case 'number':
        const numValue = JSON.parse(value);
        return typeof numValue === 'number' && !isNaN(numValue);
      case 'object':
        try {
          const objValue = JSON.parse(value);
          return typeof objValue === 'object' && objValue !== null;
        } catch {
          return false;
        }
      default:
        return false;
    }
  } catch {
    return false; // Any parsing error indicates tampering
  }
}
