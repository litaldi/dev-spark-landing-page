
import React from "react";
import { cn } from "@/lib/utils";

interface EnhancedSkeletonProps {
  className?: string;
  variant?: "default" | "text" | "circular" | "rectangular";
  lines?: number;
  width?: string | number;
  height?: string | number;
}

export function EnhancedSkeleton({
  className,
  variant = "default",
  lines = 1,
  width,
  height,
}: EnhancedSkeletonProps) {
  const baseClass = "animate-pulse bg-muted";
  
  const variantClasses = {
    default: "rounded-md",
    text: "rounded",
    circular: "rounded-full",
    rectangular: "",
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClass,
              variantClasses.text,
              "h-4",
              index === lines - 1 ? "w-3/4" : "w-full"
            )}
            style={{ width, height }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClass,
        variantClasses[variant],
        variant === "default" && "h-4 w-full",
        variant === "circular" && "h-12 w-12",
        className
      )}
      style={{ width, height }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-4 p-6 border rounded-lg">
      <div className="flex items-center space-x-4">
        <EnhancedSkeleton variant="circular" className="h-12 w-12" />
        <div className="space-y-2 flex-1">
          <EnhancedSkeleton className="h-4 w-[200px]" />
          <EnhancedSkeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <EnhancedSkeleton variant="text" lines={3} />
      <div className="flex space-x-2">
        <EnhancedSkeleton className="h-8 w-20" />
        <EnhancedSkeleton className="h-8 w-24" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <EnhancedSkeleton key={index} className="h-6 w-full" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <EnhancedSkeleton key={colIndex} className="h-8 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}
