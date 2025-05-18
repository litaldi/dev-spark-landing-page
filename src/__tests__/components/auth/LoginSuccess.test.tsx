
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginSuccess } from '@/components/auth/LoginSuccess';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginSuccess Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders correctly for returning users', () => {
    render(
      <MemoryRouter>
        <LoginSuccess 
          userName="John Doe" 
          redirectTo="/dashboard" 
          isFirstTimeUser={false} 
        />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
    expect(screen.getByText(/Good to see you again, John Doe/i)).toBeInTheDocument();
  });

  test('renders correctly for first-time users', () => {
    render(
      <MemoryRouter>
        <LoginSuccess 
          userName="Jane Smith" 
          redirectTo="/auth/onboarding" 
          isFirstTimeUser={true} 
        />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Welcome to DevSpark!')).toBeInTheDocument();
    expect(screen.getByText(/Great to have you here, Jane Smith/i)).toBeInTheDocument();
  });

  test('redirects to specified route after timeout', () => {
    render(
      <MemoryRouter>
        <LoginSuccess 
          userName="John Doe" 
          redirectTo="/dashboard" 
          isFirstTimeUser={false} 
        />
      </MemoryRouter>
    );
    
    // Fast-forward past countdown
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('displays countdown timer correctly', () => {
    render(
      <MemoryRouter>
        <LoginSuccess 
          userName="John Doe" 
          redirectTo="/dashboard" 
          isFirstTimeUser={false} 
        />
      </MemoryRouter>
    );
    
    // Initially shows 2 seconds
    expect(screen.getByText('2 seconds')).toBeInTheDocument();
    
    // After 1 second, shows 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(screen.getByText('1 second')).toBeInTheDocument();
  });

  test('has accessible ARIA attributes', () => {
    render(
      <MemoryRouter>
        <LoginSuccess 
          userName="John Doe" 
          redirectTo="/dashboard" 
          isFirstTimeUser={false} 
        />
      </MemoryRouter>
    );
    
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveAttribute('aria-live', 'assertive');
  });
});
