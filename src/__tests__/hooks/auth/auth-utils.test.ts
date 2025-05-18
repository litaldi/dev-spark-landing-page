
import { isAuthenticated, getCurrentUserFromStorage, storeUserData, clearUserData } from '@/hooks/auth/auth-utils';
import { sanitizeInput } from '@/lib/security';

// Mock the security utility
jest.mock('@/lib/security', () => ({
  sanitizeInput: jest.fn(input => input),
}));

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('Authentication Utilities', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });
  
  describe('isAuthenticated', () => {
    test('returns true if user is logged in', () => {
      localStorage.setItem('isLoggedIn', 'true');
      expect(isAuthenticated()).toBe(true);
    });
    
    test('returns false if user is not logged in', () => {
      localStorage.setItem('isLoggedIn', 'false');
      expect(isAuthenticated()).toBe(false);
    });
    
    test('returns false if isLoggedIn is not in localStorage', () => {
      expect(isAuthenticated()).toBe(false);
    });
  });
  
  describe('getCurrentUserFromStorage', () => {
    test('returns null if user is not authenticated', () => {
      expect(getCurrentUserFromStorage()).toBeNull();
    });
    
    test('returns user data for authenticated user', () => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', 'test@example.com');
      localStorage.setItem('userName', 'Test User');
      localStorage.setItem('isDemoUser', 'false');
      localStorage.setItem('onboardingComplete', 'true');
      
      const user = getCurrentUserFromStorage();
      
      expect(user).toEqual({
        email: 'test@example.com',
        name: 'Test User',
        isDemoUser: false,
        isFirstTimeUser: false,
      });
    });
    
    test('handles first-time user correctly', () => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', 'new@example.com');
      localStorage.setItem('userName', 'New User');
      // onboardingComplete is intentionally not set
      
      const user = getCurrentUserFromStorage();
      
      expect(user?.isFirstTimeUser).toBe(true);
    });
  });
  
  describe('storeUserData', () => {
    test('stores user data in localStorage', () => {
      storeUserData('test@example.com', 'Test User', false);
      
      expect(localStorage.getItem('userEmail')).toBe('test@example.com');
      expect(localStorage.getItem('userName')).toBe('Test User');
      expect(localStorage.getItem('isDemoUser')).toBe('false');
      expect(localStorage.getItem('isLoggedIn')).toBe('true');
      expect(localStorage.getItem('onboardingComplete')).toBeNull();
      
      // Ensure sanitizeInput was called for security
      expect(sanitizeInput).toHaveBeenCalledWith('test@example.com');
      expect(sanitizeInput).toHaveBeenCalledWith('Test User');
    });
    
    test('handles skipOnboarding flag', () => {
      storeUserData('test@example.com', 'Test User', false, true);
      
      expect(localStorage.getItem('onboardingComplete')).toBe('true');
    });
  });
  
  describe('clearUserData', () => {
    test('removes user data from localStorage', () => {
      // Set up localStorage with user data
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', 'test@example.com');
      localStorage.setItem('userName', 'Test User');
      localStorage.setItem('isDemoUser', 'false');
      
      clearUserData();
      
      // Check items were removed
      expect(localStorage.getItem('isLoggedIn')).toBeNull();
      expect(localStorage.getItem('userName')).toBeNull();
      expect(localStorage.getItem('userEmail')).toBeNull();
      expect(localStorage.getItem('isDemoUser')).toBeNull();
    });
  });
});
