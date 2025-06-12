
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User, LogOut, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  userName: string;
  onLogout: () => void;
}

export function UserMenu({ userName, onLogout }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2.5 px-3 py-2 hover:bg-accent/80 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
          aria-label={`User menu for ${userName}`}
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm ring-2 ring-primary/20">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-semibold leading-none">{userName}</span>
            <span className="text-xs text-muted-foreground">Logged in</span>
          </div>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-background/95 backdrop-blur-sm border shadow-xl z-50 p-2">
        <DropdownMenuLabel className="flex items-center gap-3 pb-3 border-b border-border/50 mb-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">{userName}</span>
            <span className="text-xs text-muted-foreground">Account Settings</span>
          </div>
        </DropdownMenuLabel>
        
        <div className="space-y-1">
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center gap-3 cursor-pointer px-3 py-2.5 rounded-md">
              <User className="h-4 w-4 text-primary" />
              <span className="font-medium">My Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard" className="flex items-center gap-3 cursor-pointer px-3 py-2.5 rounded-md">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex items-center gap-3 cursor-pointer px-3 py-2.5 rounded-md">
              <Settings className="h-4 w-4 text-primary" />
              <span className="font-medium">Settings</span>
            </Link>
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem 
          onClick={onLogout}
          className="flex items-center gap-3 cursor-pointer text-destructive hover:text-destructive focus:text-destructive hover:bg-destructive/10 focus:bg-destructive/10 px-3 py-2.5 rounded-md font-medium"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
