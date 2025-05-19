
import { 
  sanitizeInput, 
  isValidEmail, 
  isStrongPassword,
  validateCsrfToken,
  getCsrfToken,
  generateCsrfToken
} from '@/lib/security';

describe('Input Sanitization and Validation', () => {
  describe('sanitizeInput', () => {
    it('removes dangerous HTML tags', () => {
      const input = '<script>alert("XSS attack")</script>Hello world';
      const sanitized = sanitizeInput(input);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('Hello world');
    });
    
    it('removes dangerous attributes', () => {
      const input = '<div onmouseover="alert(\'XSS\')">Hover me</div>';
      const sanitized = sanitizeInput(input);
      expect(sanitized).not.toContain('onmouseover');
      expect(sanitized).toContain('Hover me');
    });

    it('handles edge cases gracefully', () => {
      // @ts-ignore - Testing invalid input type
      expect(sanitizeInput(null)).toBe('');
      // @ts-ignore - Testing invalid input type
      expect(sanitizeInput(undefined)).toBe('');
      expect(sanitizeInput('')).toBe('');
      expect(sanitizeInput('   ')).toBe('   ');
    });
  });
  
  describe('isValidEmail', () => {
    it('accepts valid email formats', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('user.name@example.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
    });
    
    it('rejects invalid email formats', () => {
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('user@example')).toBe(false);
      expect(isValidEmail('user.example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('  ')).toBe(false);
    });
  });
  
  describe('isStrongPassword', () => {
    it('accepts strong passwords', () => {
      expect(isStrongPassword('StrongP@ss1')).toBe(true);
      expect(isStrongPassword('C0mpl3x!Pa$$')).toBe(true);
      expect(isStrongPassword('Abcde12!@')).toBe(true);
    });
    
    it('rejects weak passwords', () => {
      expect(isStrongPassword('password')).toBe(false); // No uppercase, number, or special char
      expect(isStrongPassword('Password')).toBe(false); // No number or special char
      expect(isStrongPassword('Password1')).toBe(false); // No special char
      expect(isStrongPassword('p@ss1')).toBe(false); // Too short
      expect(isStrongPassword('PASS@123')).toBe(false); // No lowercase
    });
  });
  
  describe('CSRF Protection', () => {
    it('generates, validates, and retrieves tokens correctly', () => {
      const token = generateCsrfToken();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(10);
      
      expect(validateCsrfToken(token)).toBe(true);
      expect(validateCsrfToken('fake-token')).toBe(false);
      
      expect(getCsrfToken()).toBe(token); // Should return the same token
    });
  });
});
