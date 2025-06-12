
import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronDown, User, BookOpen, HelpCircle, MessageSquare, FileQuestion, Settings, LogOut, Home, Users, BarChart3, Target, Zap, Award, Code, Play } from "lucide-react";
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
    description: "Your learning hub",
    children: [
      { title: "Overview", href: "/dashboard", description: "Learning progress overview", icon: BarChart3 },
      { title: "My Courses", href: "/dashboard/courses", description: "Browse enrolled courses", icon: BookOpen },
      { title: "Practice Labs", href: "/dashboard/practice", description: "Interactive coding challenges", icon: Code },
      { title: "Projects", href: "/dashboard/projects", description: "Build real-world applications", icon: Zap },
      { title: "Achievements", href: "/dashboard/achievements", description: "View badges and milestones", icon: Award },
      { title: "Study Sessions", href: "/dashboard/sessions", description: "Track learning time", icon: Play }
    ]
  },
  {
    title: "Learn",
    href: "/learn",
    icon: BookOpen,
    description: "Educational resources",
    children: [
      { title: "Interactive Tutorials", href: "/learn/tutorials", description: "Step-by-step programming guides", icon: BookOpen },
      { title: "Code Examples", href: "/learn/examples", description: "Real-world code samples", icon: Code },
      { title: "Best Practices", href: "/learn/practices", description: "Industry standards & patterns", icon: Target },
      { title: "Video Lessons", href: "/learn/videos", description: "Comprehensive video courses", icon: Play },
      { title: "Practice Exercises", href: "/learn/exercises", description: "Hands-on coding challenges", icon: Zap }
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
      { title: "Help Center", href: "/help", description: "Comprehensive documentation", icon: HelpCircle },
      { title: "FAQ", href: "/faq", description: "Frequently asked questions", icon: FileQuestion },
      { title: "Contact Support", href: "/contact", description: "Get personalized help", icon: MessageSquare },
      { title: "Community Forum", href: "/community", description: "Connect with other learners", icon: Users },
      { title: "Tutorials", href: "/support/tutorials", description: "Platform usage guides", icon: BookOpen }
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
            "px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:text-primary rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "relative group flex items-center gap-2.5",
            location.pathname === item.href 
              ? "text-primary bg-primary/10 shadow-sm" 
              : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
          )}
          aria-current={location.pathname === item.href ? "page" : undefined}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          <span>{item.title}</span>
          {location.pathname === item.href && (
            <span 
              className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" 
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
              "px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:text-primary",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "relative group h-auto flex items-center gap-2.5 rounded-lg",
              location.pathname.startsWith(item.href) && item.href !== "/" 
                ? "text-primary bg-primary/10 shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
            )}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.title}</span>
            <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
            {location.pathname.startsWith(item.href) && item.href !== "/" && (
              <span 
                className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" 
                aria-hidden="true"
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-80 bg-background/95 backdrop-blur-sm border shadow-xl z-50 p-3"
          sideOffset={8}
        >
          <DropdownMenuLabel className="px-3 py-2.5 text-sm font-bold text-foreground flex items-center gap-2.5 border-b border-border/50 mb-2">
            {item.icon && <item.icon className="h-4 w-4 text-primary" />}
            <span>{item.title}</span>
            <span className="ml-auto text-xs text-muted-foreground font-normal">
              {item.children.length} items
            </span>
          </DropdownMenuLabel>
          
          <div className="grid gap-1.5">
            {item.children.map((child) => (
              <DropdownMenuItem key={child.href} asChild className="p-0">
                <Link
                  to={child.href}
                  className={cn(
                    "flex items-start gap-3 px-3 py-3.5 text-sm cursor-pointer rounded-lg transition-all duration-200 group",
                    "hover:bg-accent/80 focus:bg-accent/80 hover:scale-[1.02] focus:scale-[1.02]",
                    "border border-transparent hover:border-border/50 focus:border-primary/30",
                    location.pathname === child.href && "bg-primary/10 border-primary/20"
                  )}
                >
                  {child.icon && (
                    <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <child.icon className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className={cn(
                      "font-semibold group-hover:text-primary transition-colors",
                      location.pathname === child.href ? "text-primary" : "text-foreground"
                    )}>
                      {child.title}
                    </span>
                    {child.description && (
                      <span className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
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

  return (
    <nav className="hidden lg:flex items-center space-x-2" role="navigation" aria-label="Main navigation">
      {navigationItems.map((item) => (
        <NavDropdown key={item.title} item={item} />
      ))}
      
      <div className="ml-6 flex items-center gap-3 pl-6 border-l border-border/50">
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hover:bg-accent/80 transition-colors font-medium">
              <Link to="/auth/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild className="bg-primary hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md font-medium">
              <Link to="/auth/register">Get Started Free</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
