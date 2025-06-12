
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
  FileQuestion,
  Users,
  X,
  BarChart3,
  Target,
  Zap
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
      { title: "Home", href: "/", icon: Home, description: "Return to homepage" },
      { title: "Dashboard", href: "/dashboard", icon: BarChart3, description: "Your learning hub" },
      { title: "About", href: "/about", icon: Users, description: "Learn about our mission" }
    ]
  },
  {
    title: "Learning",
    items: [
      { title: "Courses", href: "/dashboard/courses", icon: BookOpen, description: "Browse all courses" },
      { title: "Practice", href: "/dashboard/practice", icon: Target, description: "Code challenges" },
      { title: "Projects", href: "/dashboard/projects", icon: Zap, description: "Build real apps" }
    ]
  },
  {
    title: "Support",
    items: [
      { title: "Help Center", href: "/help", icon: HelpCircle, description: "Documentation and guides" },
      { title: "FAQ", href: "/faq", icon: FileQuestion, description: "Common questions" },
      { title: "Contact", href: "/contact", icon: MessageSquare, description: "Get in touch" }
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
      <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-sm" 
              aria-hidden="true"
            >
              D
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-foreground">DevAI</h2>
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
              className="h-8 w-8 hover:bg-accent/80"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-auto p-6">
        <nav className="space-y-6">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      "hover:bg-accent/80 active:bg-accent group",
                      location.pathname === item.href
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-foreground hover:text-primary"
                    )}
                    aria-current={location.pathname === item.href ? "page" : undefined}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 flex-shrink-0",
                      location.pathname === item.href 
                        ? "text-primary-foreground" 
                        : "text-muted-foreground group-hover:text-primary"
                    )} />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.title}</span>
                      <span className={cn(
                        "text-xs mt-0.5",
                        location.pathname === item.href 
                          ? "text-primary-foreground/80" 
                          : "text-muted-foreground"
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

      {/* User Section */}
      <div className="border-t bg-muted/20 p-6">
        {isLoggedIn ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-3 py-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{userName}</span>
                <span className="text-xs text-muted-foreground">Logged in</span>
              </div>
            </div>
            <div className="space-y-1">
              <Link
                to="/profile"
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              >
                <User className="h-4 w-4" />
                My Profile
              </Link>
              <Link
                to="/settings"
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <Separator className="my-2" />
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Button asChild className="w-full bg-primary hover:bg-primary/90 shadow-sm">
              <Link to="/auth/register" onClick={handleLinkClick}>
                Get Started Free
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/auth/login" onClick={handleLinkClick}>
                Sign In
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Join thousands of developers learning with AI
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
