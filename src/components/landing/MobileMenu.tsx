
import React from "react";
import { SearchBar } from "@/components/search/SearchBar";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

interface MobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  userName: string | null;
  onMenuClose: () => void;
  onLogout: () => void;
  toggleLoginState: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  isLoggedIn, 
  userName,
  onMenuClose,
  onLogout,
  toggleLoginState
}) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="md:hidden mt-4 py-4 border-t border-gray-100 dark:border-gray-800" 
      id="mobile-menu" 
      role="navigation" 
      aria-label="Mobile navigation"
    >
      <div className="mb-4 px-2">
        <SearchBar />
      </div>
      <nav className="flex flex-col space-y-4">
        <NavLinks isMobile={true} onMobileMenuClose={onMenuClose} />
        
        <AuthButtons 
          isLoggedIn={isLoggedIn}
          userName={userName}
          isMobile={true}
          onMobileMenuClose={onMenuClose}
          onLogout={onLogout}
          toggleLoginState={toggleLoginState}
        />
      </nav>
    </div>
  );
};

export default MobileMenu;
