import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import userEvent from '@testing-library/user-event';

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

describe('Keyboard Navigation', () => {
  beforeEach(() => {
    // Reset the DOM
    document.body.innerHTML = '';
  });

  test('navigation links are keyboard accessible', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </BrowserRouter>
    );
    
    // Focus the first link
    const homeLink = screen.getByTestId('nav-link-home');
    homeLink.focus();
    expect(document.activeElement).toBe(homeLink);
    
    // Press tab to move to next link
    userEvent.tab();
    const dashboardLink = screen.getByTestId('nav-link-dashboard');
    expect(document.activeElement).toBe(dashboardLink);
    
    // Press tab again
    userEvent.tab();
    const aboutLink = screen.getByTestId('nav-link-about');
    expect(document.activeElement).toBe(aboutLink);
    
    // Continue tabbing through remaining nav links
    userEvent.tab();
    const contactLink = screen.getByTestId('nav-link-contact');
    expect(document.activeElement).toBe(contactLink);
    
    userEvent.tab();
    const helpLink = screen.getByTestId('nav-link-help');
    expect(document.activeElement).toBe(helpLink);
    
    userEvent.tab();
    const faqLink = screen.getByTestId('nav-link-faq');
    expect(document.activeElement).toBe(faqLink);
  });

  test('skip to content link appears on focus and works', async () => {
    // Add a main content area to the document
    const mainContent = document.createElement('div');
    mainContent.id = 'skip-nav-content';
    mainContent.tabIndex = -1; // Make it focusable
    document.body.appendChild(mainContent);
    
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </BrowserRouter>
    );
    
    // Tab into the page (should hit skip link first)
    userEvent.tab();
    
    // Should focus on the skip link
    const skipLink = screen.getByText('Skip to content');
    expect(document.activeElement).toBe(skipLink);
    
    // Activate skip link with Enter key
    fireEvent.keyDown(skipLink, { key: 'Enter', code: 'Enter' });
    fireEvent.click(skipLink);
    
    // Main content should now have focus
    expect(document.activeElement).toBe(mainContent);
  });

  test('theme toggle is keyboard accessible', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
      </BrowserRouter>
    );

    // Tab to the theme toggle button
    let activeElement: Element | null = document.body;
    while (activeElement && 
           !(activeElement as HTMLElement).getAttribute?.('aria-label')?.includes('Change theme')) {
      userEvent.tab();
      activeElement = document.activeElement;
    }
    
    // Verify we found the theme toggle
    expect((activeElement as HTMLElement)?.getAttribute('aria-label')).toContain('Change theme');
    
    // Press Enter to open dropdown
    fireEvent.keyDown(activeElement as HTMLElement, { key: 'Enter', code: 'Enter' });
    fireEvent.click(activeElement as HTMLElement);
    
    // Check dropdown is visible
    const lightOption = screen.getByText('Light');
    expect(lightOption).toBeInTheDocument();
    
    // Verify we can access the dropdown options
    userEvent.tab();
    
    // At least one option should be focused
    const focusedElement = document.activeElement;
    expect(focusedElement).not.toBe(document.body);
    
    // Press Enter on the focused option
    fireEvent.keyDown(focusedElement as HTMLElement, { key: 'Enter', code: 'Enter' });
    fireEvent.click(focusedElement as HTMLElement);
  });
  
  test('screen reader announcer works correctly', () => {
    // Test the new helper for screen reader announcements
    announceToScreenReader('Test announcement');
    
    // Check that the announcer element exists
    const announcer = document.getElementById('screen-reader-announcer');
    expect(announcer).not.toBeNull();
    
    // Check that it has the correct attributes
    expect(announcer?.getAttribute('aria-live')).toBe('polite');
    expect(announcer?.getAttribute('aria-atomic')).toBe('true');
  });
});
