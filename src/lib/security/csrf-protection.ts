
/**
 * CSRF token management and protection utilities
 */

// Store CSRF token in memory (not accessible from other scripts)
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
 * Adds a meta tag with CSRF token to document head
 * This helps with framework integration
 */
export function addCsrfTokenMeta(token: string): void {
  let metaTag = document.querySelector('meta[name="csrf-token"]');
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('name', 'csrf-token');
    document.head.appendChild(metaTag);
  }
  
  metaTag.setAttribute('content', token);
}

/**
 * Gets CSRF token from meta tag in document head
 * Useful when tokens are generated server-side
 */
export function getCsrfTokenFromMeta(): string {
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  return metaTag ? metaTag.getAttribute('content') || '' : '';
}
