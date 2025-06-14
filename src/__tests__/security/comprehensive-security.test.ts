
import { 
  sanitizeInput, 
  isValidEmail, 
  isStrongPassword,
  validateFormSecurity,
  generateCSRFToken,
  validateCSRFToken,
  getCSRFToken,
  isRateLimited,
  validateURL,
  applySecurityHeaders
} from '@/lib/security';

describe('Comprehensive Security Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    jest.spyOn(Date, 'now').mockImplementation(() => 1000);
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Input Sanitization & XSS Prevention', () => {
    it('prevents script injection attacks', () => {
      const maliciousInputs = [
        '<script>alert("XSS")</script>',
        '<img src="x" onerror="alert(\'XSS\')">',
        'javascript:alert("XSS")',
        '<iframe src="javascript:alert(\'XSS\')"></iframe>',
        '<svg onload="alert(\'XSS\')"></svg>',
        '<div onclick="alert(\'XSS\')">Click me</div>'
      ];
      
      maliciousInputs.forEach(input => {
        const sanitized = sanitizeInput(input);
        expect(sanitized).not.toContain('<script');
        expect(sanitized).not.toContain('onerror');
        expect(sanitized).not.toContain('javascript:');
        expect(sanitized).not.toContain('onclick');
        expect(sanitized).not.toContain('onload');
      });
    });

    it('preserves safe HTML content', () => {
      const safeInputs = [
        'Hello <strong>world</strong>',
        '<p>This is a paragraph</p>',
        '<em>Emphasized text</em>',
        '<a href="https://example.com">Safe link</a>'
      ];
      
      safeInputs.forEach(input => {
        const sanitized = sanitizeInput(input);
        expect(sanitized).toContain('Hello');
        expect(sanitized).toContain('world');
      });
    });

    it('handles edge cases gracefully', () => {
      expect(sanitizeInput('')).toBe('');
      expect(sanitizeInput('   ')).toBe('   ');
      // @ts-ignore - Testing invalid input types
      expect(sanitizeInput(null)).toBe('');
      // @ts-ignore - Testing invalid input types
      expect(sanitizeInput(undefined)).toBe('');
      // @ts-ignore - Testing invalid input types
      expect(sanitizeInput(123)).toBe('');
    });
  });

  describe('Form Security Validation', () => {
    it('detects script injection attempts', () => {
      const formData = {
        name: 'John Doe',
        comment: '<script>alert("XSS")</script>malicious content',
        description: 'Normal content'
      };
      
      const errors = validateFormSecurity(formData);
      expect(errors.comment).toBeDefined();
      expect(errors.name).toBeUndefined();
      expect(errors.description).toBeUndefined();
    });

    it('detects event handler injection', () => {
      const formData = {
        content: '<div onmouseover="alert(\'XSS\')">Hover me</div>'
      };
      
      const errors = validateFormSecurity(formData);
      expect(errors.content).toBeDefined();
    });

    it('detects excessively long inputs (DoS prevention)', () => {
      const formData = {
        longInput: 'a'.repeat(2000)
      };
      
      const errors = validateFormSecurity(formData);
      expect(errors.longInput).toBeDefined();
    });
  });

  describe('Email & Password Validation', () => {
    it('validates email formats correctly', () => {
      const validEmails = [
        'user@example.com',
        'test.email@domain.co.uk',
        'user+tag@example.org',
        'user123@sub.domain.com'
      ];
      
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user@domain',
        '',
        '   ',
        'user space@domain.com'
      ];
      
      validEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(true);
      });
      
      invalidEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(false);
      });
    });

    it('validates password strength correctly', () => {
      const strongPasswords = [
        'StrongP@ss1',
        'C0mpl3x!Pa$$word',
        'Secure123!@#',
        'MyP@ssw0rd2024'
      ];
      
      const weakPasswords = [
        'password',          // No uppercase, number, special char
        'PASSWORD123',       // No lowercase, special char
        'Password',          // No number, special char
        'Pass1!',           // Too short
        'UPPERCASE123!',    // No lowercase
        'lowercase123!',    // No uppercase
        'NoNumbers!',       // No numbers
        'NoSpecial123'      // No special characters
      ];
      
      strongPasswords.forEach(password => {
        expect(isStrongPassword(password)).toBe(true);
      });
      
      weakPasswords.forEach(password => {
        expect(isStrongPassword(password)).toBe(false);
      });
    });
  });

  describe('CSRF Protection', () => {
    it('generates valid tokens', () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();
      
      expect(typeof token1).toBe('string');
      expect(token1.length).toBeGreaterThan(10);
      expect(token1).not.toBe(token2); // Should be unique
    });

    it('validates tokens correctly', () => {
      const token = generateCSRFToken();
      expect(validateCSRFToken(token)).toBe(true);
      expect(validateCSRFToken('invalid-token')).toBe(false);
      expect(validateCSRFToken('')).toBe(false);
    });

    it('persists tokens in session storage', () => {
      const token = getCSRFToken();
      expect(typeof token).toBe('string');
      
      // Second call should return same token
      const token2 = getCSRFToken();
      expect(token2).toBe(token);
    });
  });

  describe('Rate Limiting', () => {
    it('allows requests within limits', () => {
      expect(isRateLimited('test-key', { maxRequests: 3 })).toBe(false);
      expect(isRateLimited('test-key', { maxRequests: 3 })).toBe(false);
      expect(isRateLimited('test-key', { maxRequests: 3 })).toBe(false);
    });

    it('blocks requests exceeding limits', () => {
      expect(isRateLimited('block-test', { maxRequests: 2 })).toBe(false);
      expect(isRateLimited('block-test', { maxRequests: 2 })).toBe(false);
      expect(isRateLimited('block-test', { maxRequests: 2 })).toBe(true);
    });

    it('maintains separate limits for different keys', () => {
      expect(isRateLimited('key1', { maxRequests: 1 })).toBe(false);
      expect(isRateLimited('key2', { maxRequests: 1 })).toBe(false);
      expect(isRateLimited('key1', { maxRequests: 1 })).toBe(true);
      expect(isRateLimited('key2', { maxRequests: 1 })).toBe(true);
    });

    it('resets after time window expires', () => {
      expect(isRateLimited('time-test', { maxRequests: 1, timeWindow: 1000 })).toBe(false);
      expect(isRateLimited('time-test', { maxRequests: 1, timeWindow: 1000 })).toBe(true);
      
      // Advance time past window
      jest.spyOn(Date, 'now').mockImplementation(() => 2500);
      expect(isRateLimited('time-test', { maxRequests: 1, timeWindow: 1000 })).toBe(false);
    });
  });

  describe('URL Validation & SSRF Prevention', () => {
    it('allows safe URLs', () => {
      const safeUrls = [
        'https://example.com',
        'https://api.example.com/data',
        'http://public-api.com',
        'https://cdn.example.com/image.jpg'
      ];
      
      safeUrls.forEach(url => {
        expect(validateURL(url)).toBe(true);
      });
    });

    it('blocks dangerous URLs', () => {
      const dangerousUrls = [
        'http://localhost:3000',
        'https://127.0.0.1:8080',
        'http://192.168.1.1',
        'https://10.0.0.1',
        'ftp://example.com',
        'file:///etc/passwd',
        'javascript:alert("XSS")',
        'invalid-url'
      ];
      
      dangerousUrls.forEach(url => {
        expect(validateURL(url)).toBe(false);
      });
    });
  });

  describe('Security Headers', () => {
    it('applies comprehensive security headers', () => {
      const headers = applySecurityHeaders();
      
      expect(headers['X-Content-Type-Options']).toBe('nosniff');
      expect(headers['X-Frame-Options']).toBe('DENY');
      expect(headers['X-XSS-Protection']).toBe('1; mode=block');
      expect(headers['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
    });

    it('preserves existing headers', () => {
      const existingHeaders = {
        'Authorization': 'Bearer token',
        'Custom-Header': 'value'
      };
      
      const secureHeaders = applySecurityHeaders(existingHeaders);
      
      expect(secureHeaders['Authorization']).toBe('Bearer token');
      expect(secureHeaders['Custom-Header']).toBe('value');
      expect(secureHeaders['X-Content-Type-Options']).toBe('nosniff');
    });
  });
});
