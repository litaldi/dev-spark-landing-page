
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { EnhancedSkeleton, SkeletonCard, SkeletonTable } from "./enhanced-skeleton";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Loader2 className={cn("animate-spin", sizeClasses[size])} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
}

interface PageLoadingProps {
  message?: string;
  showSkeleton?: boolean;
  skeletonType?: "cards" | "table" | "text";
}

export function PageLoading({ 
  message = "Loading...", 
  showSkeleton = true,
  skeletonType = "cards" 
}: PageLoadingProps) {
  if (!showSkeleton) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-lg text-muted-foreground">{message}</p>
      </div>
    );
  }

  const renderSkeleton = () => {
    switch (skeletonType) {
      case "table":
        return <SkeletonTable rows={8} columns={4} />;
      case "text":
        return (
          <div className="space-y-4 max-w-3xl">
            <EnhancedSkeleton variant="text" lines={3} />
            <EnhancedSkeleton variant="text" lines={4} />
            <EnhancedSkeleton variant="text" lines={2} />
          </div>
        );
      case "cards":
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2 mb-6">
        <LoadingSpinner size="sm" />
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
      {renderSkeleton()}
    </div>
  );
}

interface InlineLoadingProps {
  text?: string;
  className?: string;
}

export function InlineLoading({ text = "Loading...", className }: InlineLoadingProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LoadingSpinner size="sm" />
      <span className="text-sm">{text}</span>
    </div>
  );
}

interface ButtonLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
}

export function ButtonLoading({ isLoading, children, loadingText = "Loading..." }: ButtonLoadingProps) {
  if (!isLoading) return <>{children}</>;
  
  return (
    <div className="flex items-center gap-2">
      <LoadingSpinner size="sm" />
      <span>{loadingText}</span>
    </div>
  );
}
