
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import Navbar from '@/components/landing/Navbar';
import { sanitizeInput, validateFormSecurity } from '@/lib/security';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

// Mock hooks
jest.mock('@/hooks/use-navbar-state', () => ({
  useNavbarState: () => ({
    isScrolled: false,
    mobileMenuOpen: false,
    isLoggedIn: false,
    userName: null,
    toggleMobileMenu: jest.fn(),
    closeMobileMenu: jest.fn(),
    handleLogout: jest.fn(),
    toggleLoginState: jest.fn(),
  }),
}));

describe('Accessibility and Security Integration', () => {
  test('navbar has no accessibility violations', async () => {
    const { container } = render(
      <BrowserRouter>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </BrowserRouter>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('input sanitization works correctly', () => {
    // Test basic sanitization
    expect(sanitizeInput('<script>alert("XSS")</script>Hello')).toBe('Hello');
    
    // Test attribute sanitization
    expect(sanitizeInput('<div onmouseover="alert(\'XSS\')">Hover me</div>')).toBe('<div>Hover me</div>');
    
    // Test safe content passes through
    expect(sanitizeInput('Normal <strong>text</strong> is safe')).toBe('Normal <strong>text</strong> is safe');
  });

  test('form validation correctly identifies security risks', () => {
    const testInputs = {
      name: 'John Doe',
      email: 'john@example.com',
      comment: 'This is a normal comment',
      scriptAttempt: '<script>alert("XSS")</script>',
      eventAttempt: '<div onclick="evil()">Click me</div>',
      longInput: 'a'.repeat(2000)
    };
    
    const errors = validateFormSecurity(testInputs);
    
    // Valid fields should have no errors
    expect(errors.name).toBeUndefined();
    expect(errors.email).toBeUndefined();
    expect(errors.comment).toBeUndefined();
    
    // Invalid fields should have errors
    expect(errors.scriptAttempt).toBeDefined();
    expect(errors.eventAttempt).toBeDefined();
    expect(errors.longInput).toBeDefined();
  });
  
  test('mobile menu correctly handles sanitized content', async () => {
    // Create a full test for mobile menu with potentially unsafe content
    // Mock the navbar state to include an unsanitized userName
    jest.resetModules();
    jest.mock('@/hooks/use-navbar-state', () => ({
      useNavbarState: () => ({
        isScrolled: false,
        mobileMenuOpen: true,
        isLoggedIn: true,
        userName: 'User <script>alert("XSS")</script>',
        toggleMobileMenu: jest.fn(),
        closeMobileMenu: jest.fn(),
        handleLogout: jest.fn(),
        toggleLoginState: jest.fn(),
      }),
    }));
    
    const { rerender } = render(
      <BrowserRouter>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </BrowserRouter>
    );
    
    // Find user display in the UI - it should be sanitized
    await waitFor(() => {
      const userDisplayElements = screen.getAllByText(/User/);
      expect(userDisplayElements.length).toBeGreaterThan(0);
      expect(userDisplayElements[0].innerHTML).not.toContain('<script>');
    });
    
    // Clean up after this test
    jest.resetModules();
  });
});
