
/**
 * Input validation and sanitization utilities
 */

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/&/g, '&amp;');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate password strength
 */
export function isStrongPassword(password: string): boolean {
  if (!password || typeof password !== 'string') {
    return false;
  }

  // At least 8 characters, with uppercase, lowercase, number, and special character
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
}

/**
 * Validate form data for security threats
 */
export function validateFormSecurity(formData: Record<string, any>): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      // Check for script injection
      if (/<script[^>]*>.*?<\/script>/gi.test(value)) {
        errors[key] = 'Invalid content detected';
      }
      
      // Check for event handlers
      if (/on\w+\s*=/gi.test(value)) {
        errors[key] = 'Invalid content detected';
      }
      
      // Check for excessive length (DoS prevention)
      if (value.length > 1000) {
        errors[key] = 'Content too long';
      }
    }
  }

  return errors;
}
