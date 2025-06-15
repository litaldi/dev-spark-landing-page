
/**
 * Enhanced input validation with comprehensive security checks
 */

export interface ValidationResult {
  isValid: boolean;
  sanitizedValue: string;
  errors: string[];
  warnings: string[];
}

export interface ValidationOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  allowHtml?: boolean;
  allowSpecialChars?: boolean;
  pattern?: RegExp;
}

export class EnhancedInputValidator {
  private static readonly DANGEROUS_PATTERNS = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:\s*text\/html/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /<object[^>]*>.*?<\/object>/gi,
    /<embed[^>]*>/gi,
    /<link[^>]*>/gi,
    /<meta[^>]*>/gi,
    /expression\s*\(/gi,
    /url\s*\(/gi,
    /import\s+/gi,
    /eval\s*\(/gi,
    /setTimeout\s*\(/gi,
    /setInterval\s*\(/gi
  ];

  private static readonly SQL_INJECTION_PATTERNS = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
    /(\b(OR|AND)\s+\d+\s*=\s*\d+)/gi,
    /([\'\"](\s*;\s*|\s*--|\s*\/\*))/gi,
    /(\b(SCRIPT|JAVASCRIPT|VBSCRIPT)\b)/gi
  ];

  static validateInput(input: string, options: ValidationOptions = {}): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      sanitizedValue: input,
      errors: [],
      warnings: []
    };

    // Check if input is required
    if (options.required && (!input || input.trim() === '')) {
      result.isValid = false;
      result.errors.push('This field is required');
      return result;
    }

    // Length validation
    if (options.minLength && input.length < options.minLength) {
      result.isValid = false;
      result.errors.push(`Minimum length is ${options.minLength} characters`);
    }

    if (options.maxLength && input.length > options.maxLength) {
      result.isValid = false;
      result.errors.push(`Maximum length is ${options.maxLength} characters`);
    }

    // Pattern validation
    if (options.pattern && !options.pattern.test(input)) {
      result.isValid = false;
      result.errors.push('Invalid format');
    }

    // Security checks
    const securityCheck = this.performSecurityCheck(input);
    if (!securityCheck.isSafe) {
      result.isValid = false;
      result.errors.push(...securityCheck.threats);
      result.warnings.push(...securityCheck.warnings);
    }

    // Sanitize input
    result.sanitizedValue = this.sanitizeInput(input, options);

    return result;
  }

  static validateEmail(email: string): ValidationResult {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return this.validateInput(email, {
      required: true,
      maxLength: 254,
      pattern: emailPattern
    });
  }

  static validatePassword(password: string): ValidationResult {
    const result = this.validateInput(password, {
      required: true,
      minLength: 8,
      maxLength: 128
    });

    // Additional password strength checks
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUppercase) {
      result.errors.push('Password must contain at least one uppercase letter');
      result.isValid = false;
    }

    if (!hasLowercase) {
      result.errors.push('Password must contain at least one lowercase letter');
      result.isValid = false;
    }

    if (!hasNumbers) {
      result.errors.push('Password must contain at least one number');
      result.isValid = false;
    }

    if (!hasSpecialChars) {
      result.errors.push('Password must contain at least one special character');
      result.isValid = false;
    }

    return result;
  }

  private static performSecurityCheck(input: string): {
    isSafe: boolean;
    threats: string[];
    warnings: string[];
  } {
    const threats: string[] = [];
    const warnings: string[] = [];

    // Check for XSS patterns
    for (const pattern of this.DANGEROUS_PATTERNS) {
      if (pattern.test(input)) {
        threats.push('Potentially dangerous content detected');
        break;
      }
    }

    // Check for SQL injection patterns
    for (const pattern of this.SQL_INJECTION_PATTERNS) {
      if (pattern.test(input)) {
        threats.push('Potential SQL injection attempt detected');
        break;
      }
    }

    // Check for excessive length (DoS prevention)
    if (input.length > 10000) {
      warnings.push('Input is unusually long');
    }

    // Check for suspicious character sequences
    if (/[<>]{3,}/.test(input)) {
      warnings.push('Suspicious character sequence detected');
    }

    return {
      isSafe: threats.length === 0,
      threats,
      warnings
    };
  }

  private static sanitizeInput(input: string, options: ValidationOptions): string {
    let sanitized = input;

    if (!options.allowHtml) {
      // Remove HTML tags
      sanitized = sanitized.replace(/<[^>]*>/g, '');
    }

    if (!options.allowSpecialChars) {
      // Remove potentially dangerous characters
      sanitized = sanitized.replace(/[<>'"&]/g, '');
    }

    // Always remove null bytes and control characters
    sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');

    return sanitized.trim();
  }
}
