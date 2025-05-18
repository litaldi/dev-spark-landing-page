
import React from "react";
import NavbarLogo from "./NavbarLogo";
import NavLinks from "./NavLinks";
import { SkipNavLink } from "@/components/a11y/skip-nav";
import MobileMenu from "./MobileMenu";
import NavbarContent from "./NavbarContent";
import { useNavbarState } from "@/hooks/use-navbar-state";

const Navbar: React.FC = () => {
  const navbarState = useNavbarState();
  const { isScrolled, mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = navbarState;

  return (
    <header 
      className={`py-3 md:py-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm" : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <SkipNavLink className="focus:absolute focus:z-50" />
      <div className="container">
        <NavbarContent 
          mobileMenuOpen={mobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          navbarState={navbarState}
        />
        
        <MobileMenu 
          isOpen={mobileMenuOpen}
          isLoggedIn={navbarState.isLoggedIn}
          userName={navbarState.userName}
          isDemoUser={navbarState.isDemoUser}
          onMenuClose={closeMobileMenu}
          onLogout={navbarState.handleLogout}
          toggleLoginState={navbarState.toggleLoginState}
        />
      </div>
    </header>
  );
};

export default Navbar;
