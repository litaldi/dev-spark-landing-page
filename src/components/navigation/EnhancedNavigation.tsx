
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  User, 
  Settings, 
  HelpCircle, 
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  description?: string;
  badge?: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    path: '/dashboard',
    description: 'Your learning overview'
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    path: '/profile',
    description: 'Manage your account'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    description: 'App preferences'
  },
  {
    id: 'help',
    label: 'Help',
    icon: HelpCircle,
    path: '/help',
    description: 'Get support'
  }
];

const NavItem = ({ 
  item, 
  isActive, 
  onClick, 
  showDescription = false,
  delay = 0 
}: {
  item: NavigationItem;
  isActive: boolean;
  onClick: () => void;
  showDescription?: boolean;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Button
        variant={isActive ? "default" : "ghost"}
        className={cn(
          "w-full justify-start relative group transition-all duration-200",
          showDescription ? "h-auto p-4" : "h-10",
          isActive 
            ? "bg-brand-500 text-white hover:bg-brand-600" 
            : "hover:bg-muted/80 hover:scale-105"
        )}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        aria-describedby={showDescription ? `nav-${item.id}-desc` : undefined}
      >
        <motion.div
          className="flex items-center w-full"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          <item.icon 
            className={cn(
              "h-4 w-4 flex-shrink-0",
              showDescription ? "mr-3" : "mr-2"
            )} 
            aria-hidden="true"
          />
          <div className="flex-1 text-left">
            <div className="font-medium">{item.label}</div>
            {showDescription && item.description && (
              <div 
                id={`nav-${item.id}-desc`}
                className="text-xs opacity-70 mt-1"
              >
                {item.description}
              </div>
            )}
          </div>
          {!isActive && (
            <ChevronRight 
              className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" 
              aria-hidden="true"
            />
          )}
        </motion.div>
        
        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
            layoutId="activeIndicator"
            transition={{ duration: 0.2 }}
          />
        )}
      </Button>
    </motion.div>
  );
};

export const EnhancedNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsExpanded(false);
  };

  // Close navigation on escape key
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-background/80 backdrop-blur-sm"
          aria-label={isExpanded ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isExpanded}
          aria-controls="mobile-navigation"
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              aria-hidden="true"
            />

            {/* Navigation Panel */}
            <motion.nav
              id="mobile-navigation"
              className="lg:hidden fixed left-0 top-0 bottom-0 w-80 bg-background border-r z-50 overflow-y-auto"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              role="navigation"
              aria-label="Main navigation"
            >
              <div className="p-6 pt-20">
                <motion.h2 
                  className="text-lg font-semibold mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Navigation
                </motion.h2>
                
                <ul className="space-y-2" role="list">
                  {navigationItems.map((item, index) => (
                    <li key={item.id}>
                      <NavItem
                        item={item}
                        isActive={location.pathname === item.path}
                        onClick={() => handleNavigate(item.path)}
                        showDescription={true}
                        delay={0.1 * index}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav 
        className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-40"
        role="navigation"
        aria-label="Quick navigation"
      >
        <motion.div
          className="bg-background/80 backdrop-blur-sm border rounded-lg p-2 space-y-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ul className="space-y-1" role="list">
            {navigationItems.map((item, index) => (
              <li key={item.id}>
                <NavItem
                  item={item}
                  isActive={location.pathname === item.path}
                  onClick={() => handleNavigate(item.path)}
                  delay={0.1 * index}
                />
              </li>
            ))}
          </ul>
        </motion.div>
      </nav>
    </>
  );
};
