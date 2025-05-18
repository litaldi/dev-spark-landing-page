
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import * as useMobileHook from '@/hooks/use-mobile';

jest.mock('@/hooks/use-mobile', () => ({
  useIsMobile: jest.fn(),
}));

describe('NotFound Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default to desktop view
    (useMobileHook.useIsMobile as jest.Mock).mockReturnValue(false);
  });

  test('renders correctly in desktop view', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText(/we couldn't find the page/i)).toBeInTheDocument();
    expect(screen.getByText('Return to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
  });

  test('renders correctly in mobile view', () => {
    // Mock mobile view
    (useMobileHook.useIsMobile as jest.Mock).mockReturnValue(true);
    
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('has correct navigation links', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    
    const homeLink = screen.getByText('Return to Home').closest('a');
    const dashboardLink = screen.getByText('Go to Dashboard').closest('a');
    const contactLink = screen.getByText('Contact support');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  test('logs error to console on render', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <NotFound />
      </MemoryRouter>
    );
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '404 Error: User attempted to access non-existent route:',
      '/not-found'
    );
    
    consoleErrorSpy.mockRestore();
  });
});
