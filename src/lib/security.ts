
import DOMPurify from 'dompurify';

/**
 * Sanitizes a string to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input);
}

/**
 * Validates an email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a password has sufficient complexity
 */
export function isStrongPassword(password: string): boolean {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
}

/**
 * Security headers configuration object
 * This can be used with middleware in a production setup
 */
export const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self' https://*.supabase.co;",
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

// CSRF token management
let csrfToken: string | null = null;

/**
 * Generates a cryptographically secure random CSRF token
 */
export function generateCsrfToken(): string {
  // Use crypto API for more secure token generation
  const buffer = new Uint8Array(32);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(buffer);
    const token = btoa(String.fromCharCode.apply(null, [...buffer]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    csrfToken = token;
    return token;
  }
  
  // Fallback for older browsers (less secure)
  const token = Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15) +
               Math.random().toString(36).substring(2, 15);
  csrfToken = token;
  return token;
}

/**
 * Validates a CSRF token against the stored one
 */
export function validateCsrfToken(token: string): boolean {
  return token === csrfToken && !!token;
}

/**
 * Gets the current CSRF token or generates a new one
 */
export function getCsrfToken(): string {
  if (!csrfToken) {
    return generateCsrfToken();
  }
  return csrfToken;
}

/**
 * Rate limiting utility
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
