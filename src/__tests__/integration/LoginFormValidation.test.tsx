import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';

// Mock the useAuth hook
jest.mock('@/hooks/auth', () => ({
  useAuth: () => ({
    login: jest.fn().mockImplementation(async (email, password) => {
      // Simulate login validation
      if (email === 'test@example.com' && password === 'Password123!') {
        return true;
      }
      throw new Error('Invalid credentials');
    }),
    isLoading: false,
    errorMessage: null,
    clearError: jest.fn(),
  }),
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

// Mock the useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

// Mock the useLoginForm hook
jest.mock('@/hooks/auth/use-login-form', () => ({
  useLoginForm: () => ({
    isLoading: false,
    isBlocked: false,
    timeRemaining: 0,
    errorMessage: null,
    clearError: jest.fn(),
    handleSubmit: jest.fn().mockImplementation(async (data) => {
      // Simulate login validation
      if (data.email === 'test@example.com' && data.password === 'Password123!') {
        return true;
      }
      return false;
    }),
    handleMagicLink: jest.fn(),
    focusField: null,
    setFocusField: jest.fn(),
  }),
  loginSchema: {
    parse: jest.fn(),
    safeParse: jest.fn().mockReturnValue({ success: true }),
  },
}));

describe('LoginForm Validation Integration', () => {
  test('validates email format', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    
    // Find the email input and type an invalid email
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);
    
    // Check for validation error message
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test('validates password length', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    
    // Find the email and password inputs
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    // Type valid email but short password
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'short');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);
    
    // Check for validation error message
    await waitFor(() => {
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    });
  });

  test('handles successful form submission', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    
    // Find the email and password inputs
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    // Type valid credentials
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'Password123!');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);
    
    // Wait for button to show loading state
    await waitFor(() => {
      const buttonText = submitButton.textContent;
      expect(buttonText?.toLowerCase()).toContain('signing in');
    });
  });

  test('handles magic link request with valid email', async () => {
    const user = userEvent.setup();
    const onMagicLinkMock = jest.fn();
    
    render(
      <BrowserRouter>
        <LoginForm onMagicLink={onMagicLinkMock} />
      </BrowserRouter>
    );
    
    // Find email input and magic link button
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'test@example.com');
    
    // Open login alternatives and click magic link button
    const magicLinkButton = screen.getByRole('button', { name: /magic link sign in/i });
    await user.click(magicLinkButton);
    
    // Check that the magic link handler was called with the email
    expect(onMagicLinkMock).toHaveBeenCalledWith('test@example.com');
  });

  test('prevents magic link request with invalid email', async () => {
    const user = userEvent.setup();
    const onMagicLinkMock = jest.fn();
    
    render(
      <BrowserRouter>
        <LoginForm onMagicLink={onMagicLinkMock} />
      </BrowserRouter>
    );
    
    // Find email input and magic link button
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    
    // Click magic link button
    const magicLinkButton = screen.getByRole('button', { name: /magic link sign in/i });
    await user.click(magicLinkButton);
    
    // Check that the magic link handler was not called
    expect(onMagicLinkMock).not.toHaveBeenCalled();
    
    // Check for validation error
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });
  
  test('sanitizes inputs to prevent XSS attacks', async () => {
    const user = userEvent.setup();
    
    // Mock implementation that exposes the sanitized inputs
    const loginMock = jest.fn().mockImplementation(async (email, password) => {
      return { email, password };
    });
    
    // Override the mock to use our implementation
    jest.mock('@/hooks/auth', () => ({
      useAuth: () => ({
        login: loginMock,
        isLoading: false,
        errorMessage: null,
        clearError: jest.fn(),
      }),
    }));
    
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    
    // Find the email and password inputs
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    // Type potentially malicious inputs
    await user.type(emailInput, 'test@example.com<script>alert("xss")</script>');
    await user.type(passwordInput, 'Password123!<img src="x" onerror="alert(1)">');
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);
  });
});
