
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AuthButtonsProps {
  isLoggedIn: boolean;
  userName: string | null;
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
  onLogout: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  isLoggedIn,
  userName,
  isMobile = false,
  onMobileMenuClose = () => {},
  onLogout
}) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    if (isMobile) {
      onMobileMenuClose();
    }
  };

  // Only handle logged in users now
  if (!isLoggedIn) return null;

  return (
    <>
      {!isMobile && (
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-brand-500" aria-hidden="true" />
            <p className="text-brand-700 dark:text-brand-300 font-medium truncate max-w-[120px] lg:max-w-none">
              {userName}
            </p>
          </div>
        </div>
      )}

      {/* User dropdown menu for logged in users */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:inline-flex text-brand-600 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-all"
            aria-label="User menu"
          >
            <User className="h-4 w-4 mr-1" />
            <span className="truncate max-w-[80px] lg:max-w-none">{userName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link to="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogoutClick}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button 
        className={`${isMobile ? 'justify-start text-white bg-brand-500 hover:bg-brand-600 w-full' : 'hidden md:inline-flex bg-brand-500 hover:bg-brand-600 text-white transition-all duration-300'}`}
        asChild
        onClick={isMobile ? onMobileMenuClose : undefined}
      >
        <Link to="/dashboard">Go to Dashboard</Link>
      </Button>
    </>
  );
};

export default AuthButtons;
