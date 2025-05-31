
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface EnhancedLoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  variant?: "spinner" | "dots" | "pulse";
  className?: string;
  fullScreen?: boolean;
}

export function EnhancedLoading({
  size = "md",
  text,
  variant = "spinner",
  className,
  fullScreen = false
}: EnhancedLoadingProps) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const containerClasses = cn(
    "flex flex-col items-center justify-center gap-3",
    {
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm": fullScreen,
      "py-8": !fullScreen
    },
    className
  );

  const renderSpinner = () => (
    <div className="animate-spin" aria-hidden="true">
      <Loader2 className={cn("text-brand-500", sizeMap[size])} />
    </div>
  );

  const renderDots = () => (
    <div className="flex space-x-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "bg-brand-500 rounded-full animate-pulse",
            size === "sm" ? "h-2 w-2" : "h-3 w-3"
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1s"
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div
      className={cn(
        "bg-brand-500/20 rounded-full animate-pulse",
        sizeMap[size]
      )}
      aria-hidden="true"
    />
  );

  const renderVariant = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={containerClasses} role="status">
      {renderVariant()}
      {text && (
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          {text}
        </p>
      )}
      <span className="sr-only">
        {text ? `Loading: ${text}` : "Loading content"}
      </span>
    </div>
  );
}

interface ContentSkeletonProps {
  lines?: number;
  className?: string;
  showAvatar?: boolean;
  showImage?: boolean;
}

export function ContentSkeleton({
  lines = 3,
  className,
  showAvatar = false,
  showImage = false
}: ContentSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)} aria-hidden="true">
      {showAvatar && (
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-muted rounded w-1/4 animate-pulse" />
            <div className="h-3 bg-muted rounded w-1/6 animate-pulse" />
          </div>
        </div>
      )}
      
      {showImage && (
        <div className="h-48 bg-muted rounded-md animate-pulse" />
      )}
      
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-4 bg-muted rounded animate-pulse",
              i === lines - 1 ? "w-2/3" : "w-full"
            )}
          />
        ))}
      </div>
    </div>
  );
}
