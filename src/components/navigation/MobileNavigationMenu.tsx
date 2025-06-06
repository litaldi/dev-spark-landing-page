
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavItem } from './NavItem';
import { navigationItems } from './navigation-data';

interface MobileNavigationMenuProps {
  isExpanded: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const MobileNavigationMenu = ({ 
  isExpanded, 
  onClose, 
  onNavigate 
}: MobileNavigationMenuProps) => {
  // Close navigation on escape key
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isExpanded) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, onClose]);

  return (
    <AnimatePresence>
      {isExpanded && (
        <>
          {/* Backdrop */}
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                      onClick={() => onNavigate(item.path)}
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
  );
};
