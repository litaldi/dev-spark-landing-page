
import React from "react";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

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
      className="md:hidden mt-2 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-b-lg shadow-lg" 
      id="mobile-menu" 
      role="navigation" 
      aria-label="Mobile navigation"
      tabIndex={0}
    >
      {isLoggedIn && isDemoUser && (
        <div className="px-4 mb-2">
          <Badge variant="outline" className="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800">
            Demo Mode
          </Badge>
        </div>
      )}
      <nav className="flex flex-col space-y-2 px-4">
        <NavLinks isMobile={true} onMobileMenuClose={onMenuClose} />
        
        <div className="flex items-center justify-start gap-3 py-2 border-t border-gray-100 dark:border-gray-800 mt-2">
          <AccessibilityMenu />
          <ThemeToggle />
          <span className="text-sm text-muted-foreground ml-2">Theme & Accessibility</span>
        </div>
        
        {/* New prominent CTA buttons */}
        <div className="py-2 space-y-2 border-t border-gray-100 dark:border-gray-800">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-foreground w-full justify-start"
            asChild
            onClick={onMenuClose}
          >
            <Link to="/contact">
              <Mail className="h-4 w-4 mr-2" />
              Contact Sales
            </Link>
          </Button>
        </div>
        
        <div className="py-2 space-y-2 border-t border-gray-100 dark:border-gray-800">
          <AuthButtons 
            isLoggedIn={isLoggedIn}
            userName={userName}
            isDemoUser={isDemoUser}
            isMobile={true}
            onMobileMenuClose={onMenuClose}
            onLogout={onLogout}
            toggleLoginState={toggleLoginState}
          />
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
