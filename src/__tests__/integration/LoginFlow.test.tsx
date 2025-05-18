
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/auth/Login';
import Dashboard from '@/pages/Dashboard';
import * as authHook from '@/hooks/auth';
import { LoginSuccess } from '@/components/auth/LoginSuccess';

// Mock the hooks and components used in the login flow
jest.mock('@/hooks/auth', () => ({
  useAuth: jest.fn(),
}));

// Mock the LoginSuccess component
jest.mock('@/components/auth/LoginSuccess', () => ({
  LoginSuccess: jest.fn().mockImplementation(({ userName, redirectTo, isFirstTimeUser }) => (
    <div data-testid="login-success-screen">
      <p>Success: {userName}</p>
      <p>Redirect: {redirectTo}</p>
      <p>First time: {isFirstTimeUser ? 'Yes' : 'No'}</p>
    </div>
  ))
}));

// Mock toast for notifications
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

// Mock the useRateLimit hook
jest.mock('@/hooks/use-rate-limit', () => ({
  useRateLimit: () => ({
    isBlocked: false,
    timeRemaining: 0,
    registerAttempt: () => ({ isAllowed: true, remainingAttempts: 5 }),
    resetLimit: jest.fn(),
  }),
}));

describe('Login Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation of useAuth
    (authHook.useAuth as jest.Mock).mockReturnValue({
      login: jest.fn().mockResolvedValue(false),
      isLoading: false,
      errorMessage: null,
      clearError: jest.fn(),
      showLoginSuccess: false,
      currentUser: null,
      resetLoginSuccess: jest.fn()
    });
  });

  test('shows error message for invalid credentials', async () => {
    const mockLogin = jest.fn().mockResolvedValue(false);
    const mockSetErrorMessage = jest.fn();
    
    (authHook.useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      errorMessage: 'Invalid email or password',
      clearError: jest.fn(),
      showLoginSuccess: false,
      currentUser: null,
      resetLoginSuccess: jest.fn()
    });
    
    render(
      <MemoryRouter initialEntries={['/auth/login']}>
        <LoginPage />
      </MemoryRouter>
    );
    
    // Fill in login form
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Login function should be called with form values
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
    
    // Error message should be displayed
    expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
  });

  test('shows success screen after successful login', async () => {
    const mockLogin = jest.fn().mockResolvedValue(true);
    
    // First render without success screen
    (authHook.useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      errorMessage: null,
      clearError: jest.fn(),
      showLoginSuccess: false,
      currentUser: null,
      resetLoginSuccess: jest.fn()
    });
    
    const { rerender } = render(
      <MemoryRouter initialEntries={['/auth/login']}>
        <LoginPage />
      </MemoryRouter>
    );
    
    // Fill in login form with valid credentials
    await userEvent.type(screen.getByLabelText(/email/i), 'valid@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'validpassword');
    
    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    // Login function should be called
    expect(mockLogin).toHaveBeenCalledWith('valid@example.com', 'validpassword');
    
    // Update the mock to simulate successful login state
    (authHook.useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      errorMessage: null,
      clearError: jest.fn(),
      showLoginSuccess: true,
      currentUser: {
        name: 'Test User',
        email: 'valid@example.com',
        isFirstTimeUser: false
      },
      resetLoginSuccess: jest.fn()
    });
    
    // Re-render with updated state
    rerender(
      <MemoryRouter initialEntries={['/auth/login']}>
        <LoginPage />
      </MemoryRouter>
    );
    
    // Success screen should be shown
    expect(screen.getByTestId('login-success-screen')).toBeInTheDocument();
    expect(screen.getByText(/Success: Test User/i)).toBeInTheDocument();
  });

  test('handles magic link option correctly', async () => {
    const mockMagicLink = jest.fn();
    
    render(
      <MemoryRouter initialEntries={['/auth/login']}>
        <Routes>
          <Route path="/auth/login" element={
            <LoginPage />
          } />
        </Routes>
      </MemoryRouter>
    );
    
    // Fill in just the email for magic link
    await userEvent.type(screen.getByLabelText(/email/i), 'magic@example.com');
    
    // Find and click the magic link button
    const magicLinkButton = screen.getByRole('button', { name: /magic link/i });
    await userEvent.click(magicLinkButton);
    
    // We can't easily test the full magic link flow in this unit test,
    // but we would verify that the appropriate action happens
    // e.g., toast notification, redirect, etc.
  });
});
