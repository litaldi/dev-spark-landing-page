
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { useBreakpoint } from "@/hooks/use-mobile";

interface FloatingHelpButtonProps {
  onHelpClick: () => void;
}

export const FloatingHelpButton: React.FC<FloatingHelpButtonProps> = ({
  onHelpClick
}) => {
  const breakpoint = useBreakpoint();
  const isSmallScreen = breakpoint === "xs" || breakpoint === "mobile";
  const isTabletScreen = breakpoint === "tablet";

  if (isSmallScreen || isTabletScreen) {
    return (
      <div className="fixed bottom-6 right-6 z-10">
        <FloatingActionButton
          icon={HelpCircle}
          onClick={onHelpClick}
          ariaLabel="Get help with dashboard features"
          color="primary"
        />
      </div>
    );
  }

  return (
    <motion.div 
      className="mt-4 flex justify-end"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Button 
        variant="outline"
        size="sm"
        className="rounded-md hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-300 group"
        aria-label="Get help with dashboard features"
        onClick={onHelpClick}
      >
        <HelpCircle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
        <span>Get Help</span>
      </Button>
    </motion.div>
  );
};
