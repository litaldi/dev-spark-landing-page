
import React from "react";
import NavbarLogo from "./NavbarLogo";
import NavLinks from "./NavLinks";
import NavbarUserSection from "./NavbarUserSection";

interface NavbarContentProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  navbarState: {
    isLoggedIn: boolean;
    userName: string | null;
    isDemoUser: boolean;
    handleLogout: () => void;
  };
}

const NavbarContent: React.FC<NavbarContentProps> = ({
  mobileMenuOpen,
  toggleMobileMenu,
  navbarState
}) => {
  return (
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
        isLoggedIn={navbarState.isLoggedIn}
        userName={navbarState.userName}
        isDemoUser={navbarState.isDemoUser}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
        onLogout={navbarState.handleLogout}
      />
    </div>
  );
};

export default NavbarContent;
