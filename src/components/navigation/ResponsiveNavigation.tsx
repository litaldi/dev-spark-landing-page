
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, ChevronDown, User, Settings, LogOut, Home, BookOpen, Trophy, HelpCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { 
    label: 'Learn', 
    href: '/learn', 
    icon: BookOpen,
    children: [
      { label: 'Courses', href: '/learn/courses', icon: BookOpen },
      { label: 'Practice', href: '/learn/practice', icon: BookOpen },
      { label: 'Projects', href: '/learn/projects', icon: BookOpen }
    ]
  },
  { label: 'Achievements', href: '/achievements', icon: Trophy },
  { label: 'Help', href: '/help', icon: HelpCircle }
];

export const ResponsiveNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginStatus);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account.",
    });
    navigate("/");
  };

  const NavItem: React.FC<{ 
    item: NavigationItem; 
    isMobile?: boolean; 
    depth?: number 
  }> = ({ item, isMobile = false, depth = 0 }) => {
    const isActive = location.pathname === item.href;
    const isExpanded = expandedItems.includes(item.label);
    const hasChildren = item.children && item.children.length > 0;

    if (isMobile) {
      return (
        <div className={cn("space-y-1", depth > 0 && "ml-4")}>
          <div className="flex items-center justify-between">
            <Link
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors flex-1",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
            {hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpanded(item.label)}
                className="p-1 h-8 w-8"
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label} menu`}
              >
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isExpanded && "rotate-180"
                  )} 
                />
              </Button>
            )}
          </div>
          <AnimatePresence>
            {hasChildren && isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1"
              >
                {item.children?.map((child) => (
                  <NavItem 
                    key={child.label} 
                    item={child} 
                    isMobile={true} 
                    depth={depth + 1} 
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <div className="relative group">
        <Link
          to={item.href}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
            isActive 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted"
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
          {hasChildren && <ChevronDown className="h-3 w-3" />}
        </Link>
        {hasChildren && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-1">
              {item.children?.map((child) => (
                <Link
                  key={child.label}
                  to={child.href}
                  className="block px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <child.icon className="h-3 w-3" />
                    {child.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-background border-b sticky top-0 z-40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">DA</span>
            </div>
            <span className="font-bold text-lg">DevAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navigationItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden md:flex"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    Login
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="sm" className="hidden md:flex">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <Link to="/" className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">DA</span>
                      </div>
                      <span className="font-bold text-lg">DevAI</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      aria-label="Close navigation menu"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Navigation Items */}
                  <div className="flex-1 p-4 space-y-2">
                    {navigationItems.map((item) => (
                      <NavItem key={item.label} item={item} isMobile={true} />
                    ))}
                  </div>

                  {/* User Actions */}
                  <div className="p-4 border-t space-y-2">
                    {isLoggedIn ? (
                      <>
                        <Link to="/dashboard" className="block">
                          <Button variant="outline" className="w-full justify-start">
                            <User className="h-4 w-4 mr-2" />
                            Dashboard
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/auth/login" className="block">
                          <Button variant="outline" className="w-full">
                            Login
                          </Button>
                        </Link>
                        <Link to="/auth/register" className="block">
                          <Button className="w-full">
                            Get Started
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
