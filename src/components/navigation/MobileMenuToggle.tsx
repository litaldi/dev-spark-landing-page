
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuToggleProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const MobileMenuToggle = ({ isExpanded, onToggle }: MobileMenuToggleProps) => {
  return (
    <div className="lg:hidden fixed top-4 left-4 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={onToggle}
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
  );
};
