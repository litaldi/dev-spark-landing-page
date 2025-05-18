
import { renderHook, act } from '@testing-library/react-hooks';
import { useLoginForm } from '@/hooks/auth/use-login-form';

// Mock dependencies
jest.mock('@/hooks/auth', () => ({
  useAuth: () => ({
    login: jest.fn().mockResolvedValue(true),
    isLoading: false,
    errorMessage: null,
    clearError: jest.fn()
  })
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

jest.mock('@/hooks/use-rate-limit', () => ({
  useRateLimit: () => ({
    isBlocked: false,
    timeRemaining: 0,
    registerAttempt: jest.fn().mockReturnValue({ isAllowed: true, remainingAttempts: 5 }),
    resetLimit: jest.fn()
  })
}));

describe('useLoginForm hook', () => {
  const mockMagicLinkFn = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('initializes with correct default state', () => {
    const { result } = renderHook(() => useLoginForm(mockMagicLinkFn));
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isBlocked).toBe(false);
    expect(result.current.timeRemaining).toBe(0);
    expect(result.current.errorMessage).toBeNull();
    expect(result.current.focusField).toBeNull();
  });
  
  test('handleSubmit calls login with form values', async () => {
    const { result } = renderHook(() => useLoginForm(mockMagicLinkFn));
    
    const formData = {
      email: 'test@example.com',
      password: 'Password123!'
    };
    
    let success;
    await act(async () => {
      success = await result.current.handleSubmit(formData);
    });
    
    expect(success).toBe(true);
    // Check that the login function from useAuth was called
    expect(require('@/hooks/auth').useAuth().login).toHaveBeenCalledWith(
      'test@example.com',
      'Password123!'
    );
  });
  
  test('handleMagicLink calls onMagicLink with email', () => {
    const { result } = renderHook(() => useLoginForm(mockMagicLinkFn));
    
    act(() => {
      result.current.handleMagicLink('test@example.com');
    });
    
    expect(mockMagicLinkFn).toHaveBeenCalledWith('test@example.com');
  });
  
  test('setFocusField updates focus field state', () => {
    const { result } = renderHook(() => useLoginForm(mockMagicLinkFn));
    
    act(() => {
      result.current.setFocusField('email');
    });
    
    expect(result.current.focusField).toBe('email');
  });
  
  test('clearError calls auth clearError', () => {
    const { result } = renderHook(() => useLoginForm(mockMagicLinkFn));
    
    act(() => {
      result.current.clearError();
    });
    
    expect(require('@/hooks/auth').useAuth().clearError).toHaveBeenCalled();
  });
});
