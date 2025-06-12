
import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronDown, User, BookOpen, HelpCircle, MessageSquare, FileQuestion, Settings, LogOut, Home, Users, BarChart3, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    description: "Return to homepage"
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    description: "Your learning dashboard",
    children: [
      { title: "Overview", href: "/dashboard", description: "Learning progress overview", icon: BarChart3 },
      { title: "Courses", href: "/dashboard/courses", description: "Browse all courses", icon: BookOpen },
      { title: "Practice", href: "/dashboard/practice", description: "Code challenges", icon: Target },
      { title: "Projects", href: "/dashboard/projects", description: "Build real apps", icon: Zap }
    ]
  },
  {
    title: "Learn",
    href: "/learn",
    icon: BookOpen,
    description: "Learning resources",
    children: [
      { title: "Interactive Tutorials", href: "/learn/tutorials", description: "Step-by-step guides", icon: BookOpen },
      { title: "Code Examples", href: "/learn/examples", description: "Real-world code samples", icon: Target },
      { title: "Best Practices", href: "/learn/practices", description: "Industry standards", icon: Zap }
    ]
  },
  {
    title: "About",
    href: "/about",
    icon: Users,
    description: "Learn about our mission"
  },
  {
    title: "Support",
    href: "/support",
    icon: HelpCircle,
    description: "Get help and resources",
    children: [
      { title: "Help Center", href: "/help", description: "Documentation and guides", icon: HelpCircle },
      { title: "FAQ", href: "/faq", description: "Frequently asked questions", icon: FileQuestion },
      { title: "Contact Us", href: "/contact", description: "Get in touch", icon: MessageSquare }
    ]
  }
];

interface WebFirstNavigationProps {
  isLoggedIn: boolean;
  userName: string | null;
  onLogout: () => void;
}

export function WebFirstNavigation({ isLoggedIn, userName, onLogout }: WebFirstNavigationProps) {
  const location = useLocation();

  const NavDropdown = ({ item }: { item: NavItem }) => {
    if (!item.children) {
      return (
        <Link
          to={item.href}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-primary rounded-md",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "relative group flex items-center gap-2",
            location.pathname === item.href 
              ? "text-primary bg-primary/10" 
              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
          )}
          aria-current={location.pathname === item.href ? "page" : undefined}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          <span>{item.title}</span>
          {location.pathname === item.href && (
            <span 
              className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" 
              aria-hidden="true"
            />
          )}
        </Link>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-primary",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "relative group h-auto flex items-center gap-2",
              location.pathname.startsWith(item.href) && item.href !== "/" 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.title}</span>
            <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
            {location.pathname.startsWith(item.href) && item.href !== "/" && (
              <span 
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" 
                aria-hidden="true"
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-72 bg-background border shadow-lg z-50 p-2"
          sideOffset={8}
        >
          <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
            {item.icon && <item.icon className="h-3 w-3" />}
            {item.title}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="grid gap-1">
            {item.children.map((child) => (
              <DropdownMenuItem key={child.href} asChild className="p-0">
                <Link
                  to={child.href}
                  className="flex items-start gap-3 px-3 py-3 text-sm cursor-pointer hover:bg-accent focus:bg-accent rounded-sm transition-colors group"
                >
                  {child.icon && (
                    <child.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground group-hover:text-primary">
                      {child.title}
                    </span>
                    {child.description && (
                      <span className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {child.description}
                      </span>
                    )}
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 px-3 py-2 hover:bg-accent transition-colors rounded-md"
          aria-label={`User menu for ${userName}`}
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium leading-none">{userName}</span>
            <span className="text-xs text-muted-foreground">Logged in</span>
          </div>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg z-50">
        <DropdownMenuLabel className="flex items-center gap-2 pb-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{userName}</span>
            <span className="text-xs text-muted-foreground">Account Settings</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
            <User className="h-4 w-4" />
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={onLogout}
          className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
      {navigationItems.map((item) => (
        <NavDropdown key={item.title} item={item} />
      ))}
      
      <div className="ml-8 flex items-center gap-3 pl-4 border-l border-border/50">
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hover:bg-accent transition-colors">
              <Link to="/auth/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild className="bg-primary hover:bg-primary/90 transition-colors shadow-sm">
              <Link to="/auth/register">Get Started Free</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
