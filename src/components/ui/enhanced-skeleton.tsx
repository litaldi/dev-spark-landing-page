
import React from "react";
import { cn } from "@/lib/utils";

interface EnhancedSkeletonProps {
  className?: string;
  variant?: "default" | "text" | "avatar" | "card" | "button";
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
  ...props
}: EnhancedSkeletonProps & React.HTMLAttributes<HTMLDivElement>) {
  const baseClasses = "animate-pulse bg-muted rounded-md";

  const getVariantClasses = () => {
    switch (variant) {
      case "text":
        return "h-4 w-3/4";
      case "avatar":
        return "h-10 w-10 rounded-full";
      case "card":
        return "h-32 w-full";
      case "button":
        return "h-10 w-20";
      default:
        return "h-4 w-full";
    }
  };

  const style = {
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && { height: typeof height === "number" ? `${height}px` : height }),
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              getVariantClasses(),
              index === lines - 1 && "w-1/2", // Last line is shorter
              className
            )}
            style={style}
            {...props}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, getVariantClasses(), className)}
      style={style}
      {...props}
    />
  );
}

// Preset skeleton components for common use cases
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3 p-6 border rounded-lg", className)}>
      <EnhancedSkeleton variant="avatar" />
      <div className="space-y-2">
        <EnhancedSkeleton variant="text" width="60%" />
        <EnhancedSkeleton variant="text" lines={2} />
      </div>
      <EnhancedSkeleton variant="button" />
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <EnhancedSkeleton key={index} variant="text" width="80%" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <EnhancedSkeleton key={colIndex} variant="text" />
          ))}
        </div>
      ))}
    </div>
  );
}
