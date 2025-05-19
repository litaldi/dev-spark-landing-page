
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";

interface AuthButtonsProps {
  isLoggedIn: boolean;
  userName: string | null;
  onLogout: () => void;
  isMobile?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ 
  isLoggedIn, 
  userName, 
  onLogout,
  isMobile = false
}) => {
  if (!isLoggedIn) {
    return (
      <div className={`flex ${isMobile ? "flex-col w-full" : "items-center gap-2"}`}>
        <Link to="/auth/login">
          <Button 
            variant="ghost" 
            size={isMobile ? "default" : "sm"}
            className={`${isMobile ? "w-full justify-start" : ""}`}
          >
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex items-center p-2 bg-muted rounded-md">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2">
            <User size={16} />
          </div>
          <div>
            <p className="text-sm font-medium">{userName || 'User'}</p>
            <p className="text-xs text-muted-foreground">Signed in</p>
          </div>
        </div>
        
        <Link to="/dashboard" className="w-full">
          <Button variant="secondary" className="w-full justify-start">
            Dashboard
          </Button>
        </Link>
        
        <Link to="/profile" className="w-full">
          <Button variant="ghost" className="w-full justify-start">
            <User size={16} className="mr-2" />
            Profile
          </Button>
        </Link>
        
        <Link to="/settings" className="w-full">
          <Button variant="ghost" className="w-full justify-start">
            <Settings size={16} className="mr-2" />
            Settings
          </Button>
        </Link>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={onLogout}
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2"
          aria-label="User menu"
        >
          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <User size={14} />
          </div>
          <span className="max-w-[100px] truncate">{userName || 'User'}</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="w-full cursor-pointer">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile" className="w-full cursor-pointer">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="w-full cursor-pointer">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-destructive focus:text-destructive cursor-pointer"
          onClick={onLogout}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButtons;
