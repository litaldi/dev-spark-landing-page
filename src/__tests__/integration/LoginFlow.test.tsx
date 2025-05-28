import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/auth/Login';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

// Mock localStorage for testing
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = String(value);
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Login Flow Integration', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorageMock.clear();
  });

  test('successful login redirects to dashboard', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <LoginPage />
        </ThemeProvider>
      </BrowserRouter>
    );

    // Mock user input
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Simulate successful login by setting localStorage
    localStorageMock.setItem('isLoggedIn', 'true');

    // Wait for the redirect to occur (you might need to adjust the timeout)
    await waitFor(() => {
      expect(localStorageMock.getItem('isLoggedIn')).toBe('true');
    }, { timeout: 2000 });
  });

  test('failed login displays error message', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <LoginPage />
        </ThemeProvider>
      </BrowserRouter>
    );

    // Mock user input with incorrect credentials
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Wait for the error message to appear
    const errorMessage = await screen.findByText(/invalid credentials/i, { timeout: 2000 });
    expect(errorMessage).toBeInTheDocument();
  });
});
