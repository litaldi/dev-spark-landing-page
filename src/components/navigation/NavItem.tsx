
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavigationItem } from './navigation-types';

interface NavItemProps {
  item: NavigationItem;
  onClick: () => void;
  showDescription?: boolean;
  delay?: number;
}

export const NavItem = ({ 
  item, 
  onClick, 
  showDescription = false,
  delay = 0 
}: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;

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
