
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import NavbarLogo from "./NavbarLogo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // In a real app, this would come from your auth provider
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

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
    // Demo only: simulate fetching user data
    if (isLoggedIn && !userName) {
      setUserName("Lital");
    }
  }, [isLoggedIn, userName]);

  const handleLogout = () => {
    // This would be replaced with actual logout logic
    setIsLoggedIn(false);
    setUserName(null);
  };

  // For demo purposes only - toggle login state
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header 
      className={`py-4 border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm" : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      }`}
      role="banner"
    >
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
            
            <div className="hidden lg:flex">
              <SearchBar />
            </div>
          </nav>
          
          <div className="flex items-center gap-4">
            <AuthButtons 
              isLoggedIn={isLoggedIn} 
              userName={userName}
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
          onMenuClose={() => setMobileMenuOpen(false)}
          onLogout={handleLogout}
          toggleLoginState={toggleLoginState}
        />
      </div>
    </header>
  );
};

export default Navbar;
