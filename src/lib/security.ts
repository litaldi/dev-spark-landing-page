
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
 * Security headers configuration object
 * This can be used with middleware in a production setup
 */
export const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;",
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff', // Fixed typo: was 'nosnify'
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};

// CSRF token management
let csrfToken: string | null = null;

/**
 * Generates a random CSRF token
 */
export function generateCsrfToken(): string {
  const token = Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
  csrfToken = token;
  return token;
}

/**
 * Validates a CSRF token against the stored one
 */
export function validateCsrfToken(token: string): boolean {
  return token === csrfToken;
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
