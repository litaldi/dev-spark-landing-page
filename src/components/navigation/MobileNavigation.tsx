
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { 
  BookOpen, 
  HelpCircle, 
  User, 
  Settings, 
  LogOut,
  Home,
  MessageSquare,
  FileQuestion
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";

interface MobileNavigationProps {
  isLoggedIn: boolean;
  userName: string | null;
  onLogout: () => void;
  onClose: () => void;
}

const navigationSections = [
  {
    title: "Main",
    items: [
      { title: "Home", href: "/", icon: Home },
      { title: "Dashboard", href: "/dashboard", icon: BookOpen },
      { title: "About", href: "/about", icon: MessageSquare }
    ]
  },
  {
    title: "Support",
    items: [
      { title: "Help Center", href: "/help", icon: HelpCircle },
      { title: "FAQ", href: "/faq", icon: FileQuestion },
      { title: "Contact", href: "/contact", icon: MessageSquare }
    ]
  }
];

export function MobileNavigation({ isLoggedIn, userName, onLogout, onClose }: MobileNavigationProps) {
  const location = useLocation();

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>
          <div className="flex items-center gap-2">
            <AccessibilityMenu />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-auto p-6">
        <nav className="space-y-6">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      location.pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                    aria-current={location.pathname === item.href ? "page" : undefined}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Section */}
      <div className="border-t p-6">
        {isLoggedIn ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium">{userName}</span>
            </div>
            <div className="space-y-1">
              <Link
                to="/profile"
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <Link
                to="/settings"
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/auth/register" onClick={handleLinkClick}>
                Get Started
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/auth/login" onClick={handleLinkClick}>
                Sign In
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
