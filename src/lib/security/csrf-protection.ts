
/**
 * CSRF (Cross-Site Request Forgery) protection utilities
 */

/**
 * Generate a random CSRF token
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Store CSRF token in session storage
 */
export function storeCSRFToken(token: string): void {
  try {
    sessionStorage.setItem('csrf-token', token);
  } catch (error) {
    console.warn('Could not store CSRF token:', error);
  }
}

/**
 * Get CSRF token from session storage
 */
export function getCSRFToken(): string | null {
  try {
    return sessionStorage.getItem('csrf-token');
  } catch (error) {
    console.warn('Could not retrieve CSRF token:', error);
    return null;
  }
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string): boolean {
  const storedToken = getCSRFToken();
  return storedToken !== null && token === storedToken;
}

/**
 * Initialize CSRF protection for the application
 */
export function initializeCSRFProtection(): string {
  let token = getCSRFToken();
  
  if (!token) {
    token = generateCSRFToken();
    storeCSRFToken(token);
  }
  
  return token;
}

/**
 * Legacy alias for backward compatibility
 */
export const initializeCSRF = initializeCSRFProtection;

/**
 * Add CSRF token to form data
 */
export function addCSRFTokenToFormData(formData: FormData): void {
  const token = getCSRFToken();
  if (token) {
    formData.append('csrf-token', token);
  }
}

/**
 * Add CSRF token to request headers
 */
export function addCSRFTokenToHeaders(headers: Record<string, string>): Record<string, string> {
  const token = getCSRFToken();
  if (token) {
    return {
      ...headers,
      'X-CSRF-Token': token,
    };
  }
  return headers;
}

/**
 * React hook for CSRF protection
 */
export function useCSRFProtection() {
  const token = initializeCSRFProtection();
  
  return {
    token,
    addToFormData: addCSRFTokenToFormData,
    addToHeaders: addCSRFTokenToHeaders,
    validate: validateCSRFToken,
  };
}
