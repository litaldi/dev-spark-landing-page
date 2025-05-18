
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import NavbarLogo from "./NavbarLogo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";
import { SkipNavLink } from "@/components/a11y/skip-nav";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isDemoUser, setIsDemoUser] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  // For demo purposes only - toggle login state
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
    if (!isLoggedIn) {
      setUserName("User");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", "User");
    } else {
      setUserName(null);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("isDemoUser");
    }
  };

  return (
    <header 
      className={`py-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm" : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <SkipNavLink className="focus:absolute focus:z-50" />
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NavbarLogo />
          </div>
          
          <nav 
            className="hidden md:flex items-center space-x-10" 
            aria-label="Main navigation"
          >
            <NavLinks />
          </nav>
          
          <div className="flex items-center gap-3">
            {/* Add accessibility menu and theme toggle to the right side */}
            <div className="hidden md:flex items-center gap-2">
              <AccessibilityMenu />
              <ThemeToggle />
            </div>
            
            <AuthButtons 
              isLoggedIn={isLoggedIn} 
              userName={userName}
              isDemoUser={isDemoUser}
              onLogout={handleLogout}
              toggleLoginState={toggleLoginState}
            />
            
            <button 
              className="md:hidden text-gray-600 dark:text-gray-300" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <MobileMenu 
          isOpen={mobileMenuOpen}
          isLoggedIn={isLoggedIn}
          userName={userName}
          isDemoUser={isDemoUser}
          onMenuClose={() => setMobileMenuOpen(false)}
          onLogout={handleLogout}
          toggleLoginState={toggleLoginState}
        />
      </div>
    </header>
  );
};

export default Navbar;
