
import { useState, useEffect } from "react";

export function useNavbarState() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isDemoUser, setIsDemoUser] = useState(false);

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

    // Check if demo user
    const demoStatus = localStorage.getItem("isDemoUser");
    setIsDemoUser(demoStatus === "true");
  }, []);

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("isDemoUser");
    setIsLoggedIn(false);
    setUserName(null);
    setIsDemoUser(false);
  };

  const toggleLoginState = () => {
    const newState = !isLoggedIn;
    setIsLoggedIn(newState);
    localStorage.setItem("isLoggedIn", String(newState));
    
    if (newState) {
      // Mock user data for demo purposes
      setUserName("Demo User");
      setIsDemoUser(true);
      localStorage.setItem("userName", "Demo User");
      localStorage.setItem("isDemoUser", "true");
    } else {
      setUserName(null);
      setIsDemoUser(false);
      localStorage.removeItem("userName");
      localStorage.removeItem("isDemoUser");
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
    isDemoUser,
    toggleMobileMenu,
    closeMobileMenu,
    handleLogout,
    toggleLoginState
  };
}
