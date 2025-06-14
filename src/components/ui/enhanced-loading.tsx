
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Sparkles } from "lucide-react";

interface EnhancedLoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse" | "sparkle";
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export function EnhancedLoading({
  size = "md",
  variant = "spinner",
  text,
  className,
  fullScreen = false
}: EnhancedLoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const containerClasses = cn(
    "flex flex-col items-center justify-center gap-3",
    fullScreen && "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
    className
  );

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return (
          <Loader2 
            className={cn(sizeClasses[size], "animate-spin text-primary")}
            aria-hidden="true"
          />
        );
      
      case "dots":
        return (
          <div className="flex space-x-1" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full bg-primary",
                  size === "sm" && "w-1 h-1",
                  size === "md" && "w-2 h-2", 
                  size === "lg" && "w-3 h-3",
                  "animate-pulse"
                )}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1s"
                }}
              />
            ))}
          </div>
        );
      
      case "pulse":
        return (
          <div
            className={cn(
              "rounded-full bg-primary/20 animate-pulse",
              sizeClasses[size]
            )}
            aria-hidden="true"
          />
        );
      
      case "sparkle":
        return (
          <Sparkles 
            className={cn(sizeClasses[size], "animate-pulse text-primary")}
            aria-hidden="true"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      {renderLoader()}
      {text && (
        <p className="text-sm text-muted-foreground animate-fade-in">
          {text}
        </p>
      )}
      <span className="sr-only">
        {text || "Loading, please wait..."}
      </span>
    </div>
  );
}

// Specific loading components for common use cases
export function PageLoading({ text = "Loading page..." }: { text?: string }) {
  return (
    <EnhancedLoading
      size="lg"
      variant="spinner"
      text={text}
      fullScreen
    />
  );
}

export function ButtonLoading({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <EnhancedLoading
      size={size}
      variant="spinner"
      className="inline-flex"
    />
  );
}

export function InlineLoading({ text }: { text?: string }) {
  return (
    <EnhancedLoading
      size="sm"
      variant="dots"
      text={text}
      className="inline-flex"
    />
  );
}

// Add the missing LoadingSkeleton component
export function LoadingSkeleton({ 
  className, 
  lines = 3 
}: { 
  className?: string; 
  lines?: number 
}) {
  return (
    <div className={cn("space-y-2", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 bg-muted rounded animate-pulse",
            i === lines - 1 && "w-3/4" // Last line is shorter
          )}
        />
      ))}
    </div>
  );
}
