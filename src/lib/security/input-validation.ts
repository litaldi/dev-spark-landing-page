
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
