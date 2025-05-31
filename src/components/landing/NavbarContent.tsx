
import React from "react";
import NavbarLogo from "./NavbarLogo";
import { NavLinks } from "./NavLinks";
import NavbarUserSection from "./NavbarUserSection";
import { SkipNavLink } from "@/components/a11y/skip-nav";

interface NavbarContentProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  navbarState: {
    isLoggedIn: boolean;
    userName: string | null;
    handleLogout: () => void;
  };
}

const NavbarContent: React.FC<NavbarContentProps> = ({
  mobileMenuOpen,
  toggleMobileMenu,
  navbarState
}) => {
  return (
    <div className="flex items-center justify-between w-full px-4 sm:px-6 md:px-0">
      <div className="flex items-center gap-2">
        <SkipNavLink 
          contentId="main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to content
        </SkipNavLink>
        <NavbarLogo />
      </div>
      
      <nav 
        className="hidden md:flex items-center space-x-4 lg:space-x-8" 
        aria-label="Main navigation"
      >
        <NavLinks />
      </nav>
      
      <NavbarUserSection
        isLoggedIn={navbarState.isLoggedIn}
        userName={navbarState.userName}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
        onLogout={navbarState.handleLogout}
      />
    </div>
  );
};

export default NavbarContent;
