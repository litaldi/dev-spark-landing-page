
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  try {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a'],
      ALLOWED_ATTR: ['href', 'target'],
      ALLOW_DATA_ATTR: false
    });
  } catch (error) {
    console.error('Error sanitizing input:', error);
    return input.replace(/<[^>]*>/g, ''); // Fallback: strip all HTML tags
  }
}

/**
 * Validate form inputs for security issues
 */
export function validateFormSecurity(inputs: Record<string, any>): Record<string, string> {
  const errors: Record<string, string> = {};
  
  Object.entries(inputs).forEach(([key, value]) => {
    if (typeof value === 'string') {
      // Check for script tags
      if (/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(value)) {
        errors[key] = 'Invalid content detected';
      }
      
      // Check for event handlers
      if (/on\w+\s*=/gi.test(value)) {
        errors[key] = 'Invalid content detected';
      }
      
      // Check for extremely long inputs (potential DoS)
      if (value.length > 1000) {
        errors[key] = 'Input too long';
      }
    }
  });
  
  return errors;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
