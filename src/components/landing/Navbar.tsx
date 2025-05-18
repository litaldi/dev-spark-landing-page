
import React from "react";
import NavbarLogo from "./NavbarLogo";
import NavLinks from "./NavLinks";
import { SkipNavLink } from "@/components/a11y/skip-nav";
import MobileMenu from "./MobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import NavbarUserSection from "./NavbarUserSection";
import { useNavbarState } from "@/hooks/use-navbar-state";

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const {
    isScrolled,
    mobileMenuOpen,
    isLoggedIn,
    userName,
    isDemoUser,
    toggleMobileMenu,
    closeMobileMenu,
    handleLogout,
    toggleLoginState
  } = useNavbarState();

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
          
          <NavbarUserSection
            isLoggedIn={isLoggedIn}
            userName={userName}
            isDemoUser={isDemoUser}
            mobileMenuOpen={mobileMenuOpen}
            onToggleMobileMenu={toggleMobileMenu}
            onLogout={handleLogout}
          />
        </div>
        
        <MobileMenu 
          isOpen={mobileMenuOpen}
          isLoggedIn={isLoggedIn}
          userName={userName}
          isDemoUser={isDemoUser}
          onMenuClose={closeMobileMenu}
          onLogout={handleLogout}
          toggleLoginState={toggleLoginState}
        />
      </div>
    </header>
  );
};

export default Navbar;
