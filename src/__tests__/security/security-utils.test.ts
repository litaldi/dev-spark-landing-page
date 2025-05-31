
import { 
  sanitizeInput, 
  isValidEmail, 
  isStrongPassword,
  generateCSRFToken,
  validateCSRFToken,
  getCSRFToken,
  isRateLimited
} from '@/lib/security';

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('removes dangerous HTML', () => {
      const input = '<script>alert("XSS")</script>Hello';
      const sanitized = sanitizeInput(input);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('Hello');
    });
    
    it('handles non-string inputs gracefully', () => {
      // @ts-ignore - Testing invalid input type
      expect(sanitizeInput(null)).toBe('');
      // @ts-ignore - Testing invalid input type
      expect(sanitizeInput(undefined)).toBe('');
      // @ts-ignore - Testing invalid input type
      expect(sanitizeInput(123)).toBe('');
    });
  });
  
  describe('isValidEmail', () => {
    it('validates correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('test.name@sub.example.co.uk')).toBe(true);
    });
    
    it('rejects invalid email formats', () => {
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test@example')).toBe(false);
      expect(isValidEmail('test.example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });
  
  describe('isStrongPassword', () => {
    it('validates strong passwords', () => {
      expect(isStrongPassword('Password123!')).toBe(true);
      expect(isStrongPassword('StrongP@ss1')).toBe(true);
    });
    
    it('rejects weak passwords', () => {
      expect(isStrongPassword('password')).toBe(false); // No uppercase, number or special char
      expect(isStrongPassword('PASSWORD123')).toBe(false); // No lowercase or special char
      expect(isStrongPassword('Password')).toBe(false); // No number or special char
      expect(isStrongPassword('Pass1!')).toBe(false); // Too short
    });
  });
  
  describe('CSRF Protection', () => {
    it('generates a token with correct format', () => {
      const token = generateCSRFToken();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(10);
    });
    
    it('validates a valid token', () => {
      const token = generateCSRFToken();
      expect(validateCSRFToken(token)).toBe(true);
    });
    
    it('rejects an invalid token', () => {
      generateCSRFToken(); // Create a real token first
      expect(validateCSRFToken('fake-token')).toBe(false);
    });
    
    it('gets existing token or generates a new one', () => {
      // First call should generate a new token
      const token1 = getCSRFToken();
      expect(typeof token1).toBe('string');
      expect(token1.length).toBeGreaterThan(10);
      
      // Second call should return the same token
      const token2 = getCSRFToken();
      expect(token2).toBe(token1);
    });
  });
  
  describe('Rate Limiting', () => {
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
      jest.spyOn(Date, 'now').mockImplementation(() => 1000);
    });
    
    afterEach(() => {
      jest.restoreAllMocks();
    });
    
    it('allows requests under the limit', () => {
      expect(isRateLimited('test', { maxRequests: 3 })).toBe(false); // First attempt
      expect(isRateLimited('test', { maxRequests: 3 })).toBe(false); // Second attempt
      expect(isRateLimited('test', { maxRequests: 3 })).toBe(false); // Third attempt
    });
    
    it('blocks requests over the limit', () => {
      expect(isRateLimited('test', { maxRequests: 2 })).toBe(false); // First attempt
      expect(isRateLimited('test', { maxRequests: 2 })).toBe(false); // Second attempt
      expect(isRateLimited('test', { maxRequests: 2 })).toBe(true);  // Third attempt - blocked
    });
    
    it('uses different limits for different keys', () => {
      expect(isRateLimited('login', { maxRequests: 2 })).toBe(false); 
      expect(isRateLimited('login', { maxRequests: 2 })).toBe(false);
      expect(isRateLimited('register', { maxRequests: 1 })).toBe(false);
      
      // login is at limit, register is not
      expect(isRateLimited('login', { maxRequests: 2 })).toBe(true);  // Blocked
      expect(isRateLimited('register', { maxRequests: 1 })).toBe(true); // Also at limit now
    });
    
    it('resets after time window', () => {
      expect(isRateLimited('test', { maxRequests: 1 })).toBe(false); // First attempt
      expect(isRateLimited('test', { maxRequests: 1 })).toBe(true);  // Second attempt - blocked
      
      // Advance time past the window
      jest.spyOn(Date, 'now').mockImplementation(() => 70000); // 70 seconds later
      
      expect(isRateLimited('test', { maxRequests: 1 })).toBe(false); // Should be allowed again
    });
  });
});
