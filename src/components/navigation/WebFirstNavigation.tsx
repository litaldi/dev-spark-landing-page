
import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronDown, User, BookOpen, HelpCircle, MessageSquare, FileQuestion, Settings, LogOut } from "lucide-react";
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
    title: "Learn",
    href: "/dashboard",
    icon: BookOpen,
    description: "Interactive learning dashboard",
    children: [
      { title: "Dashboard", href: "/dashboard", description: "Your learning hub" },
      { title: "Courses", href: "/courses", description: "Browse all courses" },
      { title: "Practice", href: "/practice", description: "Code challenges" },
      { title: "Projects", href: "/projects", description: "Build real apps" }
    ]
  },
  {
    title: "Support",
    href: "/help",
    icon: HelpCircle,
    description: "Get help and resources",
    children: [
      { title: "Help Center", href: "/help", description: "Documentation and guides" },
      { title: "FAQ", href: "/faq", description: "Common questions" },
      { title: "Contact", href: "/contact", description: "Get in touch" },
      { title: "Community", href: "/community", description: "Join discussions" }
    ]
  },
  {
    title: "About",
    href: "/about",
    description: "Learn about our mission"
  }
];

interface WebFirstNavigationProps {
  isLoggedIn: boolean;
  userName: string | null;
  onLogout: () => void;
}

export function WebFirstNavigation({ isLoggedIn, userName, onLogout }: WebFirstNavigationProps) {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const NavDropdown = ({ item }: { item: NavItem }) => {
    if (!item.children) {
      return (
        <Link
          to={item.href}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md",
            location.pathname === item.href 
              ? "text-primary border-b-2 border-primary" 
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-current={location.pathname === item.href ? "page" : undefined}
        >
          <span className="flex items-center gap-2">
            {item.icon && <item.icon className="h-4 w-4" />}
            {item.title}
          </span>
        </Link>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              location.pathname.startsWith(item.href) 
                ? "text-primary border-b-2 border-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-2">
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.title}
              <ChevronDown className="h-3 w-3" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-64 bg-white dark:bg-gray-900 border shadow-lg"
          sideOffset={8}
        >
          <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {item.title}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.children.map((child) => (
            <DropdownMenuItem key={child.href} asChild>
              <Link
                to={child.href}
                className="flex flex-col items-start px-3 py-3 text-sm cursor-pointer hover:bg-accent focus:bg-accent rounded-sm"
              >
                <span className="font-medium text-foreground">{child.title}</span>
                {child.description && (
                  <span className="text-xs text-muted-foreground mt-1">{child.description}</span>
                )}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="hidden md:inline text-sm font-medium">{userName}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-900 border shadow-lg">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
            <User className="h-4 w-4" />
            Profile
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
          className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
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
      
      <div className="ml-8 flex items-center gap-3">
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/auth/register">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
