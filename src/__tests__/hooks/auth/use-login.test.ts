
import { renderHook, act } from '@testing-library/react-hooks';
import { useLogin } from '@/hooks/auth/use-login';

// Mock dependencies
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
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

describe('useLogin hook', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });
  
  test('initializes with correct default state', () => {
    const setCurrentUser = jest.fn();
    const { result } = renderHook(() => useLogin(setCurrentUser));
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.errorMessage).toBeNull();
  });
  
  test('handles successful login for regular user', async () => {
    const setCurrentUser = jest.fn();
    const { result } = renderHook(() => useLogin(setCurrentUser));
    
    let success: boolean | undefined;
    
    await act(async () => {
      success = await result.current.login('user@example.com', 'Password123!');
    });
    
    expect(success).toBe(true);
    expect(setCurrentUser).toHaveBeenCalled();
    expect(localStorage.getItem('isLoggedIn')).toBe('true');
    expect(localStorage.getItem('userEmail')).toBe('user@example.com');
  });
  
  test('handles login error states', async () => {
    const setCurrentUser = jest.fn();
    const originalPromise = global.Promise;
    
    // Mock Promise to reject for this test
    global.Promise = class extends Promise<any> {
      constructor(executor: any) {
        super((resolve, reject) => {
          return executor((value: any) => {
            // Always reject after timeout
            setTimeout(() => reject(new Error('Login failed')), 10);
          }, reject);
        });
      }
    } as any;
    
    const { result } = renderHook(() => useLogin(setCurrentUser));
    
    let success: boolean | undefined;
    
    await act(async () => {
      success = await result.current.login('user@example.com', 'password');
    });
    
    expect(success).toBe(false);
    expect(result.current.errorMessage).toBe('Invalid email or password. Please try again.');
    expect(setCurrentUser).not.toHaveBeenCalled();
    
    // Restore original Promise
    global.Promise = originalPromise;
  });
  
  test('clears error when clearError is called', async () => {
    const setCurrentUser = jest.fn();
    const { result } = renderHook(() => useLogin(setCurrentUser));
    
    // Set an error manually
    await act(async () => {
      // @ts-ignore - accessing private property for testing
      result.current.errorMessage = 'Test error';
    });
    
    act(() => {
      result.current.clearError();
    });
    
    expect(result.current.errorMessage).toBeNull();
  });
});
