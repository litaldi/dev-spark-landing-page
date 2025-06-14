
/**
 * Enhanced input validation with comprehensive security checks
 */
import DOMPurify from 'dompurify';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: string) => boolean;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedValue: string;
}

class EnhancedInputValidator {
  private static readonly MAX_INPUT_LENGTH = 10000;
  private static readonly DANGEROUS_PATTERNS = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /<link/gi,
    /<meta/gi,
  ];

  /**
   * Comprehensive input validation
   */
  static validateInput(input: string, rules: ValidationRule = {}): ValidationResult {
    const errors: string[] = [];
    let sanitizedValue = input;

    // Basic type check
    if (typeof input !== 'string') {
      return {
        isValid: false,
        errors: ['Input must be a string'],
        sanitizedValue: ''
      };
    }

    // Required check
    if (rules.required && (!input || input.trim().length === 0)) {
      errors.push('This field is required');
    }

    // Length checks
    if (rules.minLength && input.length < rules.minLength) {
      errors.push(`Minimum length is ${rules.minLength} characters`);
    }

    if (rules.maxLength && input.length > rules.maxLength) {
      errors.push(`Maximum length is ${rules.maxLength} characters`);
    }

    // Global max length check (DoS prevention)
    if (input.length > this.MAX_INPUT_LENGTH) {
      errors.push(`Input exceeds maximum allowed length`);
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(input)) {
      errors.push('Input format is invalid');
    }

    // Security checks
    const securityErrors = this.checkSecurityThreats(input);
    errors.push(...securityErrors);

    // Custom validation
    if (rules.customValidator && !rules.customValidator(input)) {
      errors.push('Input does not meet custom requirements');
    }

    // Sanitize input
    try {
      sanitizedValue = this.sanitizeInput(input);
    } catch (error) {
      errors.push('Input contains unsafe content');
      sanitizedValue = '';
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue
    };
  }

  /**
   * Enhanced sanitization
   */
  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') {
      return '';
    }

    try {
      // First pass: DOMPurify with strict settings
      let sanitized = DOMPurify.sanitize(input, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u'],
        ALLOWED_ATTR: [],
        ALLOW_DATA_ATTR: false,
        ALLOW_UNKNOWN_PROTOCOLS: false,
        SANITIZE_DOM: true,
        KEEP_CONTENT: true,
      });

      // Second pass: Remove any remaining dangerous patterns
      this.DANGEROUS_PATTERNS.forEach(pattern => {
        sanitized = sanitized.replace(pattern, '');
      });

      // Third pass: Normalize whitespace
      sanitized = sanitized.replace(/\s+/g, ' ').trim();

      return sanitized;
    } catch (error) {
      console.error('Sanitization failed:', error);
      return input.replace(/<[^>]*>/g, ''); // Fallback: strip all HTML
    }
  }

  /**
   * Check for security threats
   */
  private static checkSecurityThreats(input: string): string[] {
    const threats: string[] = [];

    // Check for script injection
    if (this.DANGEROUS_PATTERNS.some(pattern => pattern.test(input))) {
      threats.push('Potentially dangerous content detected');
    }

    // Check for SQL injection patterns
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER)\b)/gi,
      /(;|\|\||&&)/g,
      /('|('')|(\-\-)|(\#))/g
    ];

    if (sqlPatterns.some(pattern => pattern.test(input))) {
      threats.push('Potentially unsafe database query detected');
    }

    // Check for path traversal
    if (input.includes('../') || input.includes('..\\')) {
      threats.push('Path traversal attempt detected');
    }

    // Check for null bytes
    if (input.includes('\0')) {
      threats.push('Null byte injection detected');
    }

    return threats;
  }

  /**
   * Validate email with enhanced security
   */
  static validateEmail(email: string): ValidationResult {
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    return this.validateInput(email, {
      required: true,
      maxLength: 254, // RFC 5321 limit
      pattern: emailPattern,
      customValidator: (value) => {
        // Additional email security checks
        const domain = value.split('@')[1];
        return domain && !domain.includes('..') && !domain.startsWith('.') && !domain.endsWith('.');
      }
    });
  }

  /**
   * Validate password with enhanced security
   */
  static validatePassword(password: string): ValidationResult {
    return this.validateInput(password, {
      required: true,
      minLength: 12, // Increased from 8
      maxLength: 128,
      customValidator: (value) => {
        // Enhanced password requirements
        const hasLowercase = /[a-z]/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const noCommonPatterns = !/(.)\1{2,}/.test(value); // No 3+ repeated chars
        
        return hasLowercase && hasUppercase && hasNumbers && hasSpecialChars && noCommonPatterns;
      }
    });
  }

  /**
   * Validate URL with SSRF protection
   */
  static validateURL(url: string): ValidationResult {
    const result = this.validateInput(url, {
      required: true,
      maxLength: 2048
    });

    if (!result.isValid) return result;

    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname.toLowerCase();

      // Block private/internal networks
      const dangerousHosts = [
        'localhost', '127.0.0.1', '::1',
        '0.0.0.0', '169.254.', '10.',
        '192.168.', '172.16.', '172.17.',
        '172.18.', '172.19.', '172.2',
        '172.30.', '172.31.'
      ];

      if (dangerousHosts.some(host => hostname.includes(host))) {
        result.isValid = false;
        result.errors.push('URL points to restricted network');
      }

      // Only allow HTTP/HTTPS
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        result.isValid = false;
        result.errors.push('Only HTTP and HTTPS protocols are allowed');
      }

    } catch (error) {
      result.isValid = false;
      result.errors.push('Invalid URL format');
    }

    return result;
  }
}

export { EnhancedInputValidator };
export type { ValidationRule, ValidationResult };
