
import React from "react";
import { SearchBar } from "@/components/search/SearchBar";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import { Badge } from "@/components/ui/badge";

interface MobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  userName: string | null;
  isDemoUser?: boolean;
  onMenuClose: () => void;
  onLogout: () => void;
  toggleLoginState: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  isLoggedIn, 
  userName,
  isDemoUser = false,
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
      tabIndex={0}
    >
      <div className="mb-4 px-2">
        <SearchBar />
      </div>
      {isLoggedIn && isDemoUser && (
        <div className="px-2 mb-2">
          <Badge variant="outline" className="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800">
            Demo Mode
          </Badge>
        </div>
      )}
      <nav className="flex flex-col space-y-4">
        <NavLinks isMobile={true} onMobileMenuClose={onMenuClose} />
        
        <AuthButtons 
          isLoggedIn={isLoggedIn}
          userName={userName}
          isDemoUser={isDemoUser}
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
