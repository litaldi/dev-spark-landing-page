
import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import NavbarContent from '@/components/landing/NavbarContent';
import MobileMenu from '@/components/landing/MobileMenu';

// Mock the useNavbarState hook
jest.mock('@/hooks/use-navbar-state', () => ({
  useNavbarState: () => ({
    isScrolled: false,
    mobileMenuOpen: false,
    toggleMobileMenu: jest.fn(),
    closeMobileMenu: jest.fn(),
    isLoggedIn: false,
    userName: null,
    handleLogout: jest.fn(),
    toggleLoginState: jest.fn(),
  }),
}));

// Skip nav is important for accessibility testing
jest.mock('@/components/a11y/skip-nav', () => ({
  SkipNavLink: ({ children, ...props }) => (
    <a data-testid="skip-nav-link" {...props}>{children}</a>
  ),
  SkipNavContent: ({ children }) => <div data-testid="skip-nav-content">{children}</div>,
}));

describe('Navigation Accessibility', () => {
  test('Navbar has appropriate ARIA attributes', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    const header = screen.getByRole('banner');
    expect(header).toHaveAttribute('aria-label', 'Site header');
  });
  
  test('NavbarContent includes skip navigation link', () => {
    render(
      <BrowserRouter>
        <NavbarContent 
          mobileMenuOpen={false}
          toggleMobileMenu={jest.fn()}
          navbarState={{
            isLoggedIn: false,
            userName: null,
            handleLogout: jest.fn(),
          }}
        />
      </BrowserRouter>
    );
    
    const skipNavLink = screen.getByTestId('skip-nav-link');
    expect(skipNavLink).toBeInTheDocument();
    expect(skipNavLink).toHaveClass('sr-only');
    expect(skipNavLink).toHaveTextContent('Skip to content');
  });
  
  test('Navigation has proper semantic markup and roles', () => {
    render(
      <BrowserRouter>
        <NavbarContent 
          mobileMenuOpen={false}
          toggleMobileMenu={jest.fn()}
          navbarState={{
            isLoggedIn: false,
            userName: null,
            handleLogout: jest.fn(),
          }}
        />
      </BrowserRouter>
    );
    
    // Check for semantic nav element with appropriate aria-label
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });
  
  test('Mobile menu is properly hidden when closed', () => {
    render(
      <BrowserRouter>
        <MobileMenu 
          isOpen={false}
          isLoggedIn={false}
          userName={null}
          onMenuClose={jest.fn()}
          onLogout={jest.fn()}
          toggleLoginState={jest.fn()}
        />
      </BrowserRouter>
    );
    
    // The component should not be visible in the DOM
    const mobileMenu = document.querySelector('[role="dialog"]');
    expect(mobileMenu).not.toBeInTheDocument();
  });

  test('Mobile menu has appropriate ARIA attributes when open', () => {
    render(
      <BrowserRouter>
        <MobileMenu 
          isOpen={true}
          isLoggedIn={false}
          userName={null}
          onMenuClose={jest.fn()}
          onLogout={jest.fn()}
          toggleLoginState={jest.fn()}
        />
      </BrowserRouter>
    );
    
    // Check for appropriate ARIA attributes for accessibility
    const mobileMenu = screen.getByRole('dialog');
    expect(mobileMenu).toHaveAttribute('aria-modal', 'true');
    expect(mobileMenu).toHaveAttribute('aria-label', 'Mobile navigation');
  });
});
