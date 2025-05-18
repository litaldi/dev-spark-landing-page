
import React, { useEffect } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";
import { NavLinks } from "./NavLinks";
import AuthButtons from "./AuthButtons";
import GetStartedButton from "./GetStartedButton";

interface MobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  userName: string | null;
  onMenuClose: () => void;
  onLogout: () => void;
  toggleLoginState?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isLoggedIn,
  userName,
  onMenuClose,
  onLogout,
  toggleLoginState
}) => {
  // Trap focus inside the modal when it's open
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
      
      // Add escape key listener
      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onMenuClose();
      };
      
      document.addEventListener('keydown', handleEscapeKey);
      
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, onMenuClose]);
  
  if (!isOpen) return null;

  return (
    <div 
      className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div 
        className="fixed inset-0 overflow-y-auto pb-20"
        onClick={(e) => {
          // Close menu when clicking the background (but not on menu items)
          if (e.target === e.currentTarget) onMenuClose();
        }}
      >
        <div 
          className="pt-20 p-4 flex flex-col gap-6 min-h-[60vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col gap-6">
            <NavLinks isMobile={true} onLinkClick={onMenuClose} />
          </nav>
          
          <div className="flex gap-4 mt-auto">
            <AccessibilityMenu />
            <ThemeToggle />
          </div>
          
          <div className="flex flex-col gap-4">
            {!isLoggedIn && (
              <>
                <GetStartedButton isMobile onMenuClose={onMenuClose} />
              </>
            )}
            
            {isLoggedIn && (
              <AuthButtons 
                isLoggedIn={isLoggedIn}
                userName={userName}
                isMobile={true}
                onMobileMenuClose={onMenuClose}
                onLogout={onLogout}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
