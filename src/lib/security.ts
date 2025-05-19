
import DOMPurify from 'dompurify';

/**
 * Sanitizes a string to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input.trim());
}

/**
 * Validates an email address format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates a password has sufficient complexity
 */
export function isStrongPassword(password: string): boolean {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return !!password && strongPasswordRegex.test(password);
}

/**
 * Security headers configuration object
 * This can be used with middleware in a production setup
 */
export const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.supabase.co https://*.lovable.app; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://*.lovable.app;",
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin'
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
  console.warn('Crypto API not available, using less secure CSRF token generation');
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

/**
 * Validates input content length to prevent payload attacks
 * @param input Input string to validate
 * @param maxLength Maximum allowed length
 */
export function validateInputLength(input: string, maxLength: number = 1000): boolean {
  if (typeof input !== 'string') return false;
  return input.length <= maxLength;
}

/**
 * Filters and sanitizes URL parameters to prevent injection attacks
 * @param url URL to sanitize
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') return '';
  
  try {
    // Remove any script or data URIs
    if (/^(javascript|data|vbscript|file):/i.test(url)) {
      return '';
    }
    
    // Ensure it's a proper URL or relative path
    if (url.startsWith('http') || url.startsWith('https')) {
      const urlObj = new URL(url);
      return urlObj.toString();
    }
    
    // For relative URLs, sanitize path
    return url.replace(/[^\w\s\/\-._~:?#[\]@!$&'()*+,;=]/gi, '');
  } catch (e) {
    console.error('URL sanitization error:', e);
    return '';
  }
}

/**
 * Validates form inputs against common security issues
 * @param inputs Key-value pairs of form inputs
 */
export function validateFormSecurity(inputs: Record<string, string>): Record<string, string | null> {
  const errors: Record<string, string | null> = {};
  
  for (const [key, value] of Object.entries(inputs)) {
    // Check for potential XSS attempts
    if (/<script|javascript:|on\w+=/i.test(value)) {
      errors[key] = 'Invalid input detected';
      continue;
    }
    
    // Check input length
    if (value.length > 1000) {
      errors[key] = 'Input exceeds maximum allowed length';
      continue;
    }
    
    // Field-specific validation
    if (key.includes('email') && !isValidEmail(value)) {
      errors[key] = 'Please enter a valid email address';
    }
    
    if (key.includes('password') && key.includes('new') && !isStrongPassword(value)) {
      errors[key] = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }
    
    if (key.includes('url') && value && !sanitizeUrl(value)) {
      errors[key] = 'Please enter a valid URL';
    }
  }
  
  return errors;
}

/**
 * Adds security attributes to prevent clickjacking
 * @param window The window object
 */
export function applySecurityDefenses(): void {
  try {
    // Prevent clickjacking
    if (window.top !== window.self) {
      // We're in an iframe - block potentially malicious embedding
      throw new Error('This application does not allow embedding in iframes');
    }
    
    // Set CSP via meta tag if headers aren't available
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', 'Content-Security-Policy');
      meta.setAttribute('content', securityHeaders['Content-Security-Policy']);
      document.head.appendChild(meta);
    }
    
    // Strengthen session storage against XSS
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key: string, value: string) {
      if (typeof key === 'string' && key.includes('token')) {
        console.warn('Sensitive data should not be stored in localStorage/sessionStorage');
      }
      originalSetItem.apply(this, [key, value]);
    };
  } catch (e) {
    // Log security defense application failure
    console.error('Failed to apply security defenses:', e);
  }
}
