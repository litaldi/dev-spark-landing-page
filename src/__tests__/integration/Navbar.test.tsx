
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import * as useNavbarStateModule from '@/hooks/use-navbar-state';

// Mock the hooks and components used by Navbar
jest.mock('@/hooks/use-navbar-state', () => ({
  useNavbarState: jest.fn(),
}));

jest.mock('@/components/landing/NavbarContent', () => ({
  __esModule: true,
  default: ({ toggleMobileMenu, navbarState }) => (
    <div data-testid="navbar-content">
      <button 
        onClick={toggleMobileMenu} 
        data-testid="toggle-mobile-menu"
      >
        Toggle Menu
      </button>
      <span data-testid="user-status">
        {navbarState.isLoggedIn ? 'Logged In' : 'Logged Out'}
      </span>
    </div>
  ),
}));

jest.mock('@/components/landing/MobileMenu', () => ({
  __esModule: true,
  default: ({ isOpen, onMenuClose }) => (
    isOpen ? (
      <div data-testid="mobile-menu">
        <button onClick={onMenuClose} data-testid="close-menu">
          Close Menu
        </button>
      </div>
    ) : null
  ),
}));

describe('Navbar Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation
    (useNavbarStateModule.useNavbarState as jest.Mock).mockReturnValue({
      isScrolled: false,
      mobileMenuOpen: false,
      toggleMobileMenu: jest.fn(),
      closeMobileMenu: jest.fn(),
      isLoggedIn: false,
      userName: null,
      isDemoUser: false,
      handleLogout: jest.fn(),
    });
  });

  test('renders correctly with default state', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('navbar-content')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged Out');
  });

  test('toggles mobile menu when button is clicked', () => {
    const mockToggleMenu = jest.fn();
    
    (useNavbarStateModule.useNavbarState as jest.Mock).mockReturnValue({
      isScrolled: false,
      mobileMenuOpen: false,
      toggleMobileMenu: mockToggleMenu,
      closeMobileMenu: jest.fn(),
      isLoggedIn: false,
      userName: null,
      isDemoUser: false,
      handleLogout: jest.fn(),
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    const toggleButton = screen.getByTestId('toggle-mobile-menu');
    fireEvent.click(toggleButton);
    
    expect(mockToggleMenu).toHaveBeenCalled();
  });

  test('displays mobile menu when mobileMenuOpen is true', () => {
    (useNavbarStateModule.useNavbarState as jest.Mock).mockReturnValue({
      isScrolled: false,
      mobileMenuOpen: true,
      toggleMobileMenu: jest.fn(),
      closeMobileMenu: jest.fn(),
      isLoggedIn: false,
      userName: null,
      isDemoUser: false,
      handleLogout: jest.fn(),
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });

  test('closes mobile menu when close button is clicked', () => {
    const mockCloseMenu = jest.fn();
    
    (useNavbarStateModule.useNavbarState as jest.Mock).mockReturnValue({
      isScrolled: false,
      mobileMenuOpen: true,
      toggleMobileMenu: jest.fn(),
      closeMobileMenu: mockCloseMenu,
      isLoggedIn: false,
      userName: null,
      isDemoUser: false,
      handleLogout: jest.fn(),
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    const closeButton = screen.getByTestId('close-menu');
    fireEvent.click(closeButton);
    
    expect(mockCloseMenu).toHaveBeenCalled();
  });

  test('applies scrolled styles when isScrolled is true', () => {
    (useNavbarStateModule.useNavbarState as jest.Mock).mockReturnValue({
      isScrolled: true,
      mobileMenuOpen: false,
      toggleMobileMenu: jest.fn(),
      closeMobileMenu: jest.fn(),
      isLoggedIn: false,
      userName: null,
      isDemoUser: false,
      handleLogout: jest.fn(),
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm');
  });

  test('displays logged in state when user is logged in', () => {
    (useNavbarStateModule.useNavbarState as jest.Mock).mockReturnValue({
      isScrolled: false,
      mobileMenuOpen: false,
      toggleMobileMenu: jest.fn(),
      closeMobileMenu: jest.fn(),
      isLoggedIn: true,
      userName: 'Test User',
      isDemoUser: false,
      handleLogout: jest.fn(),
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged In');
  });
});
