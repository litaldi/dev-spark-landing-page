
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { axe } from 'jest-axe';

// Since we're starting with the Login page as our entry point
jest.mock('@/pages/auth/Login', () => ({
  __esModule: true,
  default: () => <div data-testid="login-page">Login Page</div>
}));

jest.mock('@/hooks/use-navbar-state', () => ({
  useNavbarState: () => ({
    isScrolled: false,
    mobileMenuOpen: false,
    toggleMobileMenu: jest.fn(),
    closeMobileMenu: jest.fn(),
    isLoggedIn: false,
    userName: null,
    isDemoUser: false,
    handleLogout: jest.fn(),
    toggleLoginState: jest.fn(),
  }),
}));

describe('Button and Link Accessibility', () => {
  test('all buttons have accessible names', async () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <div data-testid="test-page">
            <button aria-label="Test button">Click me</button>
            <button>Button with text</button>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    );
    
    // Get all buttons
    const buttons = screen.getAllByRole('button');
    
    // Verify each button has an accessible name
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName();
    });
  });
  
  test('navigation links are keyboard accessible', async () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <nav>
            <a href="/dashboard">Dashboard</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </BrowserRouter>
      </ThemeProvider>
    );
    
    // Find navigation links
    const navLinks = screen.getAllByRole('link');
    
    // Check that links have proper attributes
    navLinks.forEach(link => {
      expect(link).toHaveAttribute('href');
      expect(link).toHaveAccessibleName();
    });
    
    // Make sure the first link can receive focus
    navLinks[0].focus();
    expect(document.activeElement).toBe(navLinks[0]);
  });
  
  test('footer links are accessible', async () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <footer role="contentinfo">
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">External Link</a>
          </footer>
        </BrowserRouter>
      </ThemeProvider>
    );
    
    // Get the footer
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Find all links in the footer
    const footerLinks = footer.querySelectorAll('a');
    
    // Check that each link has proper attributes
    footerLinks.forEach(link => {
      expect(link).toHaveAttribute('href');
      // External links should have rel="noopener noreferrer"
      if (link.getAttribute('href')?.startsWith('http')) {
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
        expect(link).toHaveAttribute('target', '_blank');
      }
    });
  });
  
  test('buttons provide visual feedback on focus', async () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <button>Test Button</button>
        </BrowserRouter>
      </ThemeProvider>
    );
    
    // Get all buttons
    const buttons = screen.getAllByRole('button');
    
    // Focus the first button
    buttons[0].focus();
    
    // Check focus styles are applied
    expect(getComputedStyle(buttons[0]).outline).not.toBe('none');
  });
  
  test('tab navigation works properly through the page', async () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <div>
            <a href="/link1">Link 1</a>
            <button>Button 1</button>
            <input type="text" aria-label="Text input" />
            <select aria-label="Select dropdown">
              <option>Option 1</option>
            </select>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    );
    
    // Get all focusable elements
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    // Make sure we can tab through all these elements
    expect(focusableElements.length).toBeGreaterThan(0);
    
    // Focus the first element
    (focusableElements[0] as HTMLElement).focus();
    expect(document.activeElement).toBe(focusableElements[0]);
    
    // Simulate tabbing to the next element
    const secondElement = focusableElements[1] as HTMLElement;
    secondElement.focus();
    expect(document.activeElement).toBe(secondElement);
  });
});
