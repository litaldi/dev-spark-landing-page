
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import NavbarLogo from "./NavbarLogo";
import NavLinks from "./NavLinks";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";
import { SkipNavLink } from "@/components/a11y/skip-nav";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import GetStartedButton from "./GetStartedButton";
import AuthButtons from "./AuthButtons";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isDemoUser, setIsDemoUser] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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

  return (
    <header 
      className={`py-3 md:py-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-all duration-300 ${
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
            className="hidden md:flex items-center space-x-8" 
            aria-label="Main navigation"
          >
            <NavLinks />
          </nav>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4">
              {!isLoggedIn && (
                <GetStartedButton className="hidden lg:flex" />
              )}
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <AccessibilityMenu />
              <ThemeToggle />
            </div>
            
            {isLoggedIn && (
              <AuthButtons 
                isLoggedIn={isLoggedIn} 
                userName={userName}
                isDemoUser={isDemoUser}
                onLogout={handleLogout}
              />
            )}
            
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
        
        <MobileMenu 
          isOpen={mobileMenuOpen}
          isLoggedIn={isLoggedIn}
          userName={userName}
          isDemoUser={isDemoUser}
          onMenuClose={() => setMobileMenuOpen(false)}
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
};

export default Navbar;

interface MobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  userName: string | null;
  isDemoUser?: boolean;
  onMenuClose: () => void;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  isLoggedIn, 
  userName,
  isDemoUser = false,
  onMenuClose,
  onLogout
}) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="md:hidden mt-2 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-b-lg shadow-lg" 
      id="mobile-menu" 
      role="navigation" 
      aria-label="Mobile navigation"
      tabIndex={0}
    >
      {isLoggedIn && isDemoUser && (
        <div className="px-4 mb-2">
          <div className="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 rounded-md px-3 py-1.5 text-sm">
            Demo Mode
          </div>
        </div>
      )}
      <nav className="flex flex-col space-y-2 px-4">
        <NavLinks isMobile={true} onMobileMenuClose={onMenuClose} />
        
        <div className="flex items-center justify-start gap-3 py-2 border-t border-gray-100 dark:border-gray-800 mt-2">
          <AccessibilityMenu />
          <ThemeToggle />
          <span className="text-sm text-muted-foreground ml-2">Theme & Accessibility</span>
        </div>
        
        <div className="py-2 space-y-2 border-t border-gray-100 dark:border-gray-800">
          {isLoggedIn ? (
            <>
              {isDemoUser && (
                <div className="px-2 py-1">
                  <p className="text-brand-700 dark:text-brand-300 font-medium flex items-center gap-2">
                    <span className="ml-1 text-xs text-brand-500">(Demo User)</span>
                    {userName}
                  </p>
                </div>
              )}
              <Button 
                className="justify-start text-white bg-brand-500 hover:bg-brand-600 w-full"
                asChild
                onClick={onMenuClose}
              >
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start text-brand-600 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 w-full"
                onClick={() => {
                  onLogout();
                  onMenuClose();
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <GetStartedButton isMobile onMenuClose={onMenuClose} />
          )}
        </div>
      </nav>
    </div>
  );
};
