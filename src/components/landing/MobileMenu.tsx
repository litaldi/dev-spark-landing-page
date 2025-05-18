
import React from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";
import { NavLinks } from "./NavLinks";
import AuthButtons from "./AuthButtons";
import GetStartedButton from "./GetStartedButton";
// DemoUserButton import is maintained but not used in the UI

interface MobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  userName: string | null;
  isDemoUser: boolean;
  onMenuClose: () => void;
  onLogout: () => void;
  toggleLoginState?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isLoggedIn,
  userName,
  isDemoUser,
  onMenuClose,
  onLogout,
  toggleLoginState
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="fixed inset-0 overflow-y-auto pb-20">
        <div className="pt-20 p-4 flex flex-col gap-6 min-h-[60vh]">
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
                {/* DemoUserButton is removed from mobile menu */}
                <GetStartedButton isMobile onMenuClose={onMenuClose} />
              </>
            )}
            
            {isLoggedIn && (
              <AuthButtons 
                isLoggedIn={isLoggedIn}
                userName={userName}
                isDemoUser={isDemoUser}
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
