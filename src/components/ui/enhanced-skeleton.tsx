
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnhancedSkeletonProps {
  className?: string;
  variant?: "card" | "text" | "avatar" | "button" | "custom";
  lines?: number;
  animated?: boolean;
}

export const EnhancedSkeleton: React.FC<EnhancedSkeletonProps> = ({
  className,
  variant = "custom",
  lines = 3,
  animated = true
}) => {
  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: { 
      x: "100%",
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "card":
        return "h-48 w-full rounded-lg";
      case "text":
        return "h-4 w-3/4 rounded";
      case "avatar":
        return "h-12 w-12 rounded-full";
      case "button":
        return "h-10 w-24 rounded-md";
      default:
        return "";
    }
  };

  const SkeletonComponent = animated ? motion.div : "div";

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <SkeletonComponent
            key={index}
            className={cn(
              "relative overflow-hidden bg-gray-200 dark:bg-gray-800",
              getVariantClasses(),
              index === lines - 1 && "w-1/2", // Last line shorter
              className
            )}
          >
            {animated && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
              />
            )}
          </SkeletonComponent>
        ))}
      </div>
    );
  }

  return (
    <SkeletonComponent
      className={cn(
        "relative overflow-hidden bg-gray-200 dark:bg-gray-800",
        getVariantClasses(),
        className
      )}
    >
      {animated && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        />
      )}
    </SkeletonComponent>
  );
};

export const SkeletonCard = () => (
  <div className="space-y-4 p-6 border rounded-lg">
    <EnhancedSkeleton variant="text" className="h-6 w-1/3" />
    <EnhancedSkeleton variant="text" lines={3} />
    <div className="flex gap-2 pt-2">
      <EnhancedSkeleton variant="button" />
      <EnhancedSkeleton variant="button" />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => (
  <div className="space-y-3">
    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }).map((_, i) => (
        <EnhancedSkeleton key={i} variant="text" className="h-8 w-full" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <EnhancedSkeleton key={colIndex} variant="text" className="h-6 w-full" />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonDashboard = () => (
  <div className="space-y-6">
    <div className="space-y-4 p-6 border rounded-lg">
      <div className="flex items-center gap-4">
        <EnhancedSkeleton variant="avatar" />
        <div className="space-y-2 flex-1">
          <EnhancedSkeleton variant="text" className="h-6 w-1/4" />
          <EnhancedSkeleton variant="text" className="h-4 w-1/2" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);
