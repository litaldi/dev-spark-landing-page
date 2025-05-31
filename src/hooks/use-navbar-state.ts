
import { useState, useEffect } from 'react';

interface NavbarState {
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  isLoggedIn: boolean;
  userName: string | null;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  handleLogout: () => void;
  toggleLoginState: () => void;
}

export function useNavbarState(): NavbarState {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for stored user session
  useEffect(() => {
    const storedUser = localStorage.getItem('demo-user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUserName(storedUser);
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName(null);
    localStorage.removeItem('demo-user');
    closeMobileMenu();
  };

  const toggleLoginState = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      const demoUser = 'Demo User';
      setIsLoggedIn(true);
      setUserName(demoUser);
      localStorage.setItem('demo-user', demoUser);
    }
  };

  return {
    isScrolled,
    mobileMenuOpen,
    isLoggedIn,
    userName,
    toggleMobileMenu,
    closeMobileMenu,
    handleLogout,
    toggleLoginState,
  };
}
