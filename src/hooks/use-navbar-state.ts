
import { useState, useEffect } from "react";

export function useNavbarState() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check login status from localStorage
  useEffect(() => {
    // Check login status from localStorage
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
    
    // Get user name from localStorage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserName(null);
  };

  const toggleLoginState = () => {
    const newState = !isLoggedIn;
    setIsLoggedIn(newState);
    localStorage.setItem("isLoggedIn", String(newState));
    
    if (newState) {
      // Mock user data for testing purposes
      setUserName("Test User");
      localStorage.setItem("userName", "Test User");
    } else {
      setUserName(null);
      localStorage.removeItem("userName");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return {
    isScrolled,
    mobileMenuOpen,
    isLoggedIn,
    userName,
    toggleMobileMenu,
    closeMobileMenu,
    handleLogout,
    toggleLoginState
  };
}
