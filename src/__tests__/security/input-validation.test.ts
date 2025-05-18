
import { 
  sanitizeInput, 
  isValidEmail, 
  isStrongPassword,
} from '@/lib/security';

describe('Input Validation', () => {
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
});
