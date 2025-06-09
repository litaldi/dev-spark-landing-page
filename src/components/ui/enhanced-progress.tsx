
import React from "react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnhancedProgressProps {
  value: number;
  className?: string;
  color?: "blue" | "green" | "orange" | "purple";
  showPercentage?: boolean;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
}

export const EnhancedProgress: React.FC<EnhancedProgressProps> = ({
  value,
  className,
  color = "blue",
  showPercentage = false,
  animated = true,
  size = "md"
}) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500"
  };

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };

  const ProgressComponent = animated ? motion.div : "div";
  const progressProps = animated ? {
    initial: { width: 0 },
    animate: { width: `${value}%` },
    transition: { duration: 1, ease: "easeOut" }
  } : {};

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <ProgressComponent
          className={cn(
            "h-full rounded-full transition-all duration-300",
            colorClasses[color]
          )}
          {...progressProps}
          style={!animated ? { width: `${value}%` } : undefined}
        />
      </div>
      {showPercentage && (
        <motion.span 
          className="absolute right-0 top-full mt-1 text-xs font-medium text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(value)}%
        </motion.span>
      )}
    </div>
  );
};
