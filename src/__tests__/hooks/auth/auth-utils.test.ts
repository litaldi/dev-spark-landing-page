import { storeUserData, clearUserData } from '@/hooks/auth/auth-utils';

// Mock localStorage
beforeEach(() => {
  // Clear localStorage before each test
  localStorage.clear();
  
  // Mock localStorage methods
  jest.spyOn(Storage.prototype, 'getItem');
  jest.spyOn(Storage.prototype, 'setItem');
  jest.spyOn(Storage.prototype, 'removeItem');
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Auth utilities', () => {
  describe('clearUserData', () => {
    test('clears user data from localStorage', () => {
      clearUserData();
      
      expect(localStorage.removeItem).toHaveBeenCalledWith('userEmail');
      expect(localStorage.removeItem).toHaveBeenCalledWith('userName');
      expect(localStorage.removeItem).toHaveBeenCalledWith('isLoggedIn');
      expect(localStorage.removeItem).toHaveBeenCalledWith('onboardingComplete');
    });
  });
  
  describe('storeUserData', () => {
    test('stores user data in localStorage', () => {
      storeUserData('test@example.com', 'Test User');
      
      expect(localStorage.setItem).toHaveBeenCalledWith('userEmail', 'test@example.com');
      expect(localStorage.setItem).toHaveBeenCalledWith('userName', 'Test User');
      expect(localStorage.setItem).toHaveBeenCalledWith('isLoggedIn', 'true');
    });
    
    test('handles skipOnboarding flag', () => {
      storeUserData('test@example.com', 'Test User', true);
      
      expect(localStorage.getItem('onboardingComplete')).toBe('true');
    });
  });
});
