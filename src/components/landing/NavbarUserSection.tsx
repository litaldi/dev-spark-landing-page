
import React from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";
import { Menu, X } from "lucide-react";
import GetStartedButton from "./GetStartedButton";
import AuthButtons from "./AuthButtons";

interface NavbarUserSectionProps {
  isLoggedIn: boolean;
  userName: string | null;
  isDemoUser: boolean;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onLogout: () => void;
}

const NavbarUserSection: React.FC<NavbarUserSectionProps> = ({
  isLoggedIn,
  userName,
  isDemoUser,
  mobileMenuOpen,
  onToggleMobileMenu,
  onLogout
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2">
        <AccessibilityMenu />
        <ThemeToggle />
      </div>
      
      {isLoggedIn && (
        <AuthButtons 
          isLoggedIn={isLoggedIn} 
          userName={userName}
          isDemoUser={isDemoUser}
          onLogout={onLogout}
        />
      )}
      
      <button 
        className="md:hidden text-gray-600 dark:text-gray-300" 
        onClick={onToggleMobileMenu}
        aria-expanded={mobileMenuOpen}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-controls="mobile-menu"
      >
        {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
    </div>
  );
};

export default NavbarUserSection;
