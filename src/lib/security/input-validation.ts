
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: []
  });
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Check if password meets strength requirements
 */
export function isStrongPassword(password: string): boolean {
  if (typeof password !== 'string' || password.length < 8) {
    return false;
  }
  
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
}

/**
 * Validate form inputs for security risks
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
      
      // Check for excessively long inputs
      if (value.length > 1000) {
        errors[key] = 'Input too long';
      }
    }
  });
  
  return errors;
}

/**
 * Check if input contains potentially malicious content
 */
export function containsMaliciousContent(input: string): boolean {
  const maliciousPatterns = [
    /<script\b/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe\b/i,
    /<object\b/i,
    /<embed\b/i
  ];
  
  return maliciousPatterns.some(pattern => pattern.test(input));
}
