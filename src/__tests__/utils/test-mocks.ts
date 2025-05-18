
import { ReactElement } from 'react';

/**
 * Mock for authentication hooks and context
 */
export const createAuthMock = (isLoggedIn = false) => ({
  useAuth: jest.fn().mockReturnValue({
    login: jest.fn().mockResolvedValue(isLoggedIn),
    logout: jest.fn().mockResolvedValue(true),
    isLoading: false,
    errorMessage: null,
    clearError: jest.fn(),
    showLoginSuccess: false,
    currentUser: isLoggedIn ? {
      name: 'Test User',
      email: 'test@example.com',
      isFirstTimeUser: false
    } : null,
    resetLoginSuccess: jest.fn()
  })
});

/**
 * Mock for toast notifications
 */
export const createToastMock = () => ({
  useToast: () => ({
    toast: jest.fn(),
  })
});

/**
 * Mock for react-router-dom
 */
export const createRouterMock = (currentPath = '/') => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: currentPath }),
  useParams: () => ({}),
});

/**
 * Mock for local storage
 */
export const createLocalStorageMock = () => {
  const store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(key => delete store[key]); },
    getAllItems: () => ({ ...store }),
    length: Object.keys(store).length,
    key: (index: number) => Object.keys(store)[index] || null,
  };
};

/**
 * Mock for form context and components
 */
export const createFormMock = () => ({
  Form: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-form">{children}</div>
  ),
  FormProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-form-provider">{children}</div>
  ),
});
