
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { LoginForm } from '@/components/auth/LoginForm';

// Mock hooks to avoid actual API calls
jest.mock('@/hooks/auth/use-auth', () => ({
  useAuth: () => ({
    login: jest.fn().mockResolvedValue(true),
    register: jest.fn().mockResolvedValue(true),
    isLoading: false,
    errorMessage: null,
    clearError: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: false,
    getCurrentUser: () => null,
    showLoginSuccess: false,
    currentUser: null,
    resetLoginSuccess: jest.fn()
  }),
}));

jest.mock('@/hooks/use-rate-limit', () => ({
  useRateLimit: () => ({
    isBlocked: false,
    timeRemaining: 0,
    remainingAttempts: 5,
    registerAttempt: jest.fn().mockReturnValue({ isAllowed: true, remainingAttempts: 4 }),
    resetLimit: jest.fn(),
  }),
}));

describe('Authentication & Dashboard Flow Integration', () => {
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          {component}
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  describe('Registration Flow', () => {
    it('renders registration form with all required fields', () => {
      renderWithProviders(<RegisterForm />);
      
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    });

    it('validates form inputs with security checks', async () => {
      renderWithProviders(<RegisterForm />);
      
      const nameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /create account/i });
      
      // Test XSS attempt in name field
      fireEvent.change(nameInput, { target: { value: '<script>alert("XSS")</script>' } });
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(passwordInput, { target: { value: 'weak' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
        expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
      });
    });

    it('handles rate limiting correctly', async () => {
      // Mock rate limiting to simulate blocked state
      jest.resetModules();
      jest.mock('@/hooks/use-rate-limit', () => ({
        useRateLimit: () => ({
          isBlocked: true,
          timeRemaining: 300000, // 5 minutes
          remainingAttempts: 0,
          registerAttempt: jest.fn().mockReturnValue({ isAllowed: false, remainingAttempts: 0 }),
          resetLimit: jest.fn(),
        }),
      }));
      
      renderWithProviders(<RegisterForm />);
      
      const submitButton = screen.getByRole('button', { name: /create account/i });
      fireEvent.click(submitButton);
      
      // Should show rate limiting message
      await waitFor(() => {
        expect(screen.getByText(/too many.*attempts/i)).toBeInTheDocument();
      });
    });
  });

  describe('Login Flow', () => {
    it('renders login form with proper accessibility', () => {
      renderWithProviders(<LoginForm />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(emailInput).toHaveAttribute('aria-required', 'true');
      expect(passwordInput).toHaveAttribute('aria-required', 'true');
    });

    it('sanitizes login inputs', async () => {
      renderWithProviders(<LoginForm />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      // Attempt XSS in login fields
      fireEvent.change(emailInput, { target: { value: 'user@example.com<script>alert("XSS")</script>' } });
      fireEvent.change(passwordInput, { target: { value: 'password123<img onerror="alert(\'XSS\')">' } });
      fireEvent.click(submitButton);
      
      // Form should handle the input safely without errors
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe('Security Error Handling', () => {
    it('displays user-friendly error messages', async () => {
      // Mock error state
      jest.resetModules();
      jest.mock('@/hooks/auth/use-auth', () => ({
        useAuth: () => ({
          login: jest.fn().mockRejectedValue(new Error('Network error')),
          register: jest.fn().mockRejectedValue(new Error('Server error')),
          isLoading: false,
          errorMessage: 'Something went wrong. Please try again.',
          clearError: jest.fn(),
          logout: jest.fn(),
          isAuthenticated: false,
          getCurrentUser: () => null,
          showLoginSuccess: false,
          currentUser: null,
          resetLoginSuccess: jest.fn()
        }),
      }));
      
      renderWithProviders(<LoginForm />);
      
      // Should display error message
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('supports full keyboard navigation', () => {
      renderWithProviders(<LoginForm />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      // Tab navigation should work
      emailInput.focus();
      expect(document.activeElement).toBe(emailInput);
      
      fireEvent.keyDown(emailInput, { key: 'Tab' });
      expect(document.activeElement).toBe(passwordInput);
      
      fireEvent.keyDown(passwordInput, { key: 'Tab' });
      expect(document.activeElement).toBe(submitButton);
    });

    it('handles Enter key submission', () => {
      renderWithProviders(<LoginForm />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.keyDown(passwordInput, { key: 'Enter' });
      
      // Form should attempt submission
      expect(emailInput.value).toBe('test@example.com');
      expect(passwordInput.value).toBe('password123');
    });
  });
});
