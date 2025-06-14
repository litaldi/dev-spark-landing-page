
/**
 * CSRF Protection utilities
 */

let csrfToken: string | null = null;

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  setCSRFToken(token);
  return token;
}

/**
 * Get the current CSRF token
 */
export function getCSRFToken(): string | null {
  return csrfToken;
}

/**
 * Set the CSRF token
 */
export function setCSRFToken(token: string): void {
  csrfToken = token;
  // Store in session storage for persistence across page reloads
  try {
    sessionStorage.setItem('csrf-token', token);
  } catch (error) {
    console.warn('Unable to store CSRF token in session storage:', error);
  }
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string): boolean {
  return token === csrfToken;
}

/**
 * Add CSRF token to form data
 */
export function addCSRFToFormData(formData: FormData): void {
  const token = getCSRFToken();
  if (token) {
    formData.append('csrf-token', token);
  }
}

/**
 * Initialize CSRF protection
 */
export function initializeCSRF(): void {
  try {
    const storedToken = sessionStorage.getItem('csrf-token');
    if (storedToken) {
      setCSRFToken(storedToken);
    } else {
      generateCSRFToken();
    }
  } catch (error) {
    console.warn('Unable to initialize CSRF protection:', error);
    generateCSRFToken();
  }
}
