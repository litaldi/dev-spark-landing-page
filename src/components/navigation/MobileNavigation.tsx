
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { 
  User, 
  Settings, 
  LogOut,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";
import { mobileNavigationSections } from "./navigation-data";

interface MobileNavigationProps {
  isLoggedIn: boolean;
  userName: string | null;
  onLogout: () => void;
  onClose: () => void;
}

export function MobileNavigation({ isLoggedIn, userName, onLogout, onClose }: MobileNavigationProps) {
  const location = useLocation();

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Enhanced Header */}
      <div className="p-6 border-b bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/20" 
              aria-hidden="true"
            >
              D
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-foreground">DevAI</h2>
              <p className="text-xs text-muted-foreground">Learning Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AccessibilityMenu />
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-9 w-9 hover:bg-accent/80 transition-colors rounded-lg"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Content */}
      <div className="flex-1 overflow-auto p-6">
        <nav className="space-y-8">
          {mobileNavigationSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-primary rounded-full"></span>
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-medium transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      "hover:bg-accent/80 active:bg-accent group border border-transparent",
                      "hover:border-border/50 hover:shadow-sm hover:scale-[1.02]",
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground shadow-md border-primary/20 scale-[1.02]"
                        : "text-foreground hover:text-primary"
                    )}
                    aria-current={location.pathname === item.path ? "page" : undefined}
                  >
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      location.pathname === item.path 
                        ? "bg-primary-foreground/10" 
                        : "bg-primary/10 group-hover:bg-primary/20"
                    )}>
                      <item.icon className={cn(
                        "h-5 w-5",
                        location.pathname === item.path 
                          ? "text-primary-foreground" 
                          : "text-primary"
                      )} />
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className="font-semibold">{item.label}</span>
                      <span className={cn(
                        "text-xs mt-0.5 leading-relaxed",
                        location.pathname === item.path 
                          ? "text-primary-foreground/80" 
                          : "text-muted-foreground group-hover:text-foreground/80"
                      )}>
                        {item.description}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Enhanced User Section */}
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
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-lg transition-colors"
              >
                <User className="h-4 w-4" />
                My Profile
              </Link>
              <Link
                to="/settings"
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-lg transition-colors"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <Separator className="my-3" />
              <button
                onClick={() => {
                  onLogout();
                  onClose();
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
              <Link to="/auth/register" onClick={handleLinkClick}>
                Get Started Free
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full font-medium h-11 border-2 hover:bg-accent/80">
              <Link to="/auth/login" onClick={handleLinkClick}>
                Sign In
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
              Join thousands of developers learning with AI-powered education
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
