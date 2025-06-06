
import React from 'react';
import { motion } from 'framer-motion';
import { NavItem } from './NavItem';
import { navigationItems } from './navigation-data';

interface DesktopNavigationProps {
  onNavigate: (path: string) => void;
}

export const DesktopNavigation = ({ onNavigate }: DesktopNavigationProps) => {
  return (
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
                onClick={() => onNavigate(item.path)}
                delay={0.1 * index}
              />
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
};
