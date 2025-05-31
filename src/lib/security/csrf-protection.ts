
/**
 * CSRF Protection utilities
 */

// Generate a random CSRF token
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Set CSRF token in localStorage and return it
 */
export function setCSRFToken(): string {
  const token = generateCSRFToken();
  localStorage.setItem('csrf-token', token);
  return token;
}

/**
 * Get CSRF token from localStorage
 */
export function getCSRFToken(): string | null {
  return localStorage.getItem('csrf-token');
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string): boolean {
  const storedToken = getCSRFToken();
  return storedToken !== null && storedToken === token;
}

/**
 * Add CSRF token to form data
 */
export function addCSRFToFormData(formData: FormData): FormData {
  const token = getCSRFToken();
  if (token) {
    formData.append('csrf_token', token);
  }
  return formData;
}

/**
 * Initialize CSRF protection on app start
 */
export function initializeCSRF(): void {
  if (!getCSRFToken()) {
    setCSRFToken();
  }
}
