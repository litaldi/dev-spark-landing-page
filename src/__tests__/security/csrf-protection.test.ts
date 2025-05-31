
import { 
  generateCSRFToken,
  validateCSRFToken,
  getCSRFToken,
} from '@/lib/security';

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
