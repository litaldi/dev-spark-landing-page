
import React from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";
import { Menu, X } from "lucide-react";
import GetStartedButton from "./GetStartedButton";
import AuthButtons from "./AuthButtons";
import { announceToScreenReader } from "@/lib/keyboard-utils";

interface NavbarUserSectionProps {
  isLoggedIn: boolean;
  userName: string | null;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onLogout: () => void;
}

const NavbarUserSection: React.FC<NavbarUserSectionProps> = ({
  isLoggedIn,
  userName,
  mobileMenuOpen,
  onToggleMobileMenu,
  onLogout
}) => {
  // Announce mobile menu state changes for screen readers
  const handleToggleMobileMenu = () => {
    onToggleMobileMenu();
    
    // Use a slight delay to ensure the state has changed
    setTimeout(() => {
      const state = !mobileMenuOpen ? "open" : "closed";
      announceToScreenReader(`Mobile menu is now ${state}`, "polite");
    }, 50);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2">
        <AccessibilityMenu />
        <ThemeToggle />
      </div>
      
      {!isLoggedIn && (
        <div className="hidden md:block">
          <GetStartedButton 
            size="sm" 
            className="bg-brand-500 hover:bg-brand-600" 
            data-testid="nav-get-started-button"
          />
        </div>
      )}
      
      {isLoggedIn && (
        <AuthButtons 
          isLoggedIn={isLoggedIn} 
          userName={userName}
          onLogout={onLogout}
        />
      )}
      
      <button 
        className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
        onClick={handleToggleMobileMenu}
        aria-expanded={mobileMenuOpen}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-controls="mobile-menu"
        data-testid="mobile-menu-toggle"
      >
        {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
      </button>
    </div>
  );
};

export default NavbarUserSection;
