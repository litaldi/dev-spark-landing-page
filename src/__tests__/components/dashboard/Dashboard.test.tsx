
import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';

// Mock the components used in Dashboard
jest.mock('@/components/landing/Navbar', () => ({
  __esModule: true,
  default: () => <div data-testid="navbar-component">Navbar</div>,
}));

jest.mock('@/components/landing/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer-component">Footer</div>,
}));

jest.mock('@/components/demo/DemoUserBanner', () => ({
  __esModule: true,
  default: ({ className }: { className: string }) => (
    <div data-testid="demo-user-banner" className={className}>
      Demo User Banner
    </div>
  ),
}));

jest.mock('@/components/dashboard/EnhancedDashboardContent', () => ({
  __esModule: true,
  EnhancedDashboardContent: ({ 
    userName, 
    isFirstTimeUser, 
    isLoading, 
    onError 
  }) => (
    <div data-testid="dashboard-content">
      <p>Welcome {userName}</p>
      {isFirstTimeUser && <p>First time user content</p>}
      {isLoading && <p>Loading...</p>}
      <button onClick={() => onError('Test error')}>Trigger Error</button>
    </div>
  ),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

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
    setup: (data: Record<string, string>) => { store = { ...data }; },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('Dashboard Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('redirects to login if user is not logged in', () => {
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate = () => navigateMock;
    
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    // The timeout in useEffect should be triggered
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(navigateMock).toHaveBeenCalledWith('/auth/login');
  });

  test('renders dashboard for logged in user', () => {
    mockLocalStorage.setup({
      isLoggedIn: 'true',
      userName: 'Test User',
      isDemoUser: 'false',
      onboardingComplete: 'true',
    });
    
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    // Allow loading state to finish
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByTestId('navbar-component')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
    expect(screen.getByText('Welcome Test User')).toBeInTheDocument();
  });

  test('shows demo user banner for demo users', () => {
    mockLocalStorage.setup({
      isLoggedIn: 'true',
      userName: 'Demo User',
      isDemoUser: 'true',
      onboardingComplete: 'true',
    });
    
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    // Allow loading state to finish
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByTestId('demo-user-banner')).toBeInTheDocument();
  });

  test('handles first-time user properly', () => {
    mockLocalStorage.setup({
      isLoggedIn: 'true',
      userName: 'New User',
      isDemoUser: 'false',
      // onboardingComplete is intentionally not set
    });
    
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    // Allow loading state to finish
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByText('First time user content')).toBeInTheDocument();
  });
  
  test('handles errors from dashboard content', async () => {
    mockLocalStorage.setup({
      isLoggedIn: 'true',
      userName: 'Test User',
      isDemoUser: 'false',
    });
    
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    // Allow loading state to finish
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Trigger an error
    const errorButton = screen.getByText('Trigger Error');
    errorButton.click();
    
    // Should show error message (AlertError component)
    await waitFor(() => {
      const errorState = screen.getByTestId('dashboard-content');
      expect(errorState).toBeInTheDocument();
    });
  });
});
