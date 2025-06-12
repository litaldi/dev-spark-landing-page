
import React from "react";
import { Link } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MobileNavigationFooterProps {
  isLoggedIn: boolean;
  userName: string | null;
  onLogout: () => void;
  onLinkClick: () => void;
}

export function MobileNavigationFooter({ 
  isLoggedIn, 
  userName, 
  onLogout, 
  onLinkClick 
}: MobileNavigationFooterProps) {
  return (
    <div className="border-t bg-muted/30 p-6">
      {isLoggedIn ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4 px-4 py-4 bg-gradient-to-r from-primary/15 to-primary/5 rounded-xl border border-primary/20 shadow-sm">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md ring-2 ring-primary/20">
              <User className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground">{userName}</span>
              <span className="text-xs text-muted-foreground">Logged in • Premium Member</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Link
              to="/profile"
              onClick={onLinkClick}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-lg transition-colors"
            >
              <User className="h-4 w-4" />
              My Profile
            </Link>
            <Link
              to="/settings"
              onClick={onLinkClick}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-lg transition-colors"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <Separator className="my-3" />
            <button
              onClick={() => {
                onLogout();
                onLinkClick();
              }}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors w-full text-left"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Button asChild className="w-full bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 font-semibold h-12">
            <Link to="/auth/register" onClick={onLinkClick}>
              Get Started Free
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full font-medium h-11 border-2 hover:bg-accent/80">
            <Link to="/auth/login" onClick={onLinkClick}>
              Sign In
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
            Join thousands of developers learning with AI-powered education
          </p>
        </div>
      )}
    </div>
  );
}
