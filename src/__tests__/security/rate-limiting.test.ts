
import { isRateLimited } from '@/lib/security';

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
    expect(isRateLimited('test', 3)).toBe(false); // First attempt
    expect(isRateLimited('test', 3)).toBe(false); // Second attempt
    expect(isRateLimited('test', 3)).toBe(false); // Third attempt
  });
  
  it('blocks requests over the limit', () => {
    expect(isRateLimited('test', 2)).toBe(false); // First attempt
    expect(isRateLimited('test', 2)).toBe(false); // Second attempt
    expect(isRateLimited('test', 2)).toBe(true);  // Third attempt - blocked
  });
  
  it('uses different limits for different keys', () => {
    expect(isRateLimited('login', 2)).toBe(false); 
    expect(isRateLimited('login', 2)).toBe(false);
    expect(isRateLimited('register', 1)).toBe(false);
    
    // login is at limit, register is not
    expect(isRateLimited('login', 2)).toBe(true);  // Blocked
    expect(isRateLimited('register', 1)).toBe(true); // Also at limit now
  });
  
  it('resets after time window', () => {
    expect(isRateLimited('test', 1)).toBe(false); // First attempt
    expect(isRateLimited('test', 1)).toBe(true);  // Second attempt - blocked
    
    // Advance time past the window
    jest.spyOn(Date, 'now').mockImplementation(() => 70000); // 70 seconds later
    
    expect(isRateLimited('test', 1)).toBe(false); // Should be allowed again
  });
});
