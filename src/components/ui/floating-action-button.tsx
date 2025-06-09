
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  badge?: number;
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon: Icon,
  onClick,
  className,
  ariaLabel,
  badge,
  color = "primary"
}) => {
  const colorClasses = {
    primary: "bg-brand-500 hover:bg-brand-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    warning: "bg-orange-500 hover:bg-orange-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };

  return (
    <motion.div
      className={cn("relative", className)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Button
        onClick={onClick}
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
          colorClasses[color]
        )}
        aria-label={ariaLabel}
      >
        <Icon className="h-6 w-6" />
      </Button>
      
      {badge && badge > 0 && (
        <motion.div
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        >
          {badge > 99 ? "99+" : badge}
        </motion.div>
      )}
    </motion.div>
  );
};
