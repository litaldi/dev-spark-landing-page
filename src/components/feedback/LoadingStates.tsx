
import React from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  message?: string;
  variant?: "default" | "dots" | "pulse" | "spinner" | "skeleton";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  variant = "default",
  size = "md",
  className
}) => {
  const sizeClasses = {
    sm: "text-sm gap-2",
    md: "text-base gap-3",
    lg: "text-lg gap-4"
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center", sizeClasses[size], className)}>
        <span className="text-muted-foreground">{message}</span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center justify-center", sizeClasses[size], className)}>
        <motion.div
          className={cn("rounded-full bg-primary/20", iconSizes[size])}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <span className="text-muted-foreground">{message}</span>
      </div>
    );
  }

  if (variant === "spinner") {
    return (
      <div className={cn("flex items-center justify-center", sizeClasses[size], className)}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className={cn(iconSizes[size], "text-primary")} />
        </motion.div>
        <span className="text-muted-foreground">{message}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", sizeClasses[size], className)}>
      <Loader2 className={cn(iconSizes[size], "animate-spin text-primary")} />
      <span className="text-muted-foreground">{message}</span>
    </div>
  );
};

export const FullPageLoading: React.FC<{ message?: string }> = ({ 
  message = "Loading your dashboard..." 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="text-center space-y-4">
        <LoadingState variant="spinner" size="lg" message="" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
};

export const InlineLoading: React.FC<{ size?: "sm" | "md" | "lg" }> = ({ size = "md" }) => {
  return (
    <div className="flex items-center justify-center py-8">
      <LoadingState variant="dots" size={size} message="Loading content" />
    </div>
  );
};
