
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the loading indicator */
  size?: "sm" | "md" | "lg";
  /** Text to display below the spinner */
  text?: string;
  /** Whether to center the loading indicator */
  center?: boolean;
  /** Whether the loading state should take up the full viewport */
  fullScreen?: boolean;
}

export function Loading({
  size = "md",
  text,
  center = true,
  fullScreen = false,
  className,
  ...props
}: LoadingProps) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const containerClasses = cn(
    "flex flex-col items-center justify-center",
    { 
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm": fullScreen,
      "h-full w-full": center && !fullScreen,
      "py-8": !fullScreen && !center,
    },
    className
  );

  return (
    <div className={containerClasses} role="status" {...props}>
      <div className="animate-spin" aria-hidden="true">
        <Loader2 className={cn("text-muted-foreground/70", sizeMap[size])} />
      </div>
      {text && (
        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      )}
      <span className="sr-only">Loading{text ? `: ${text}` : ""}</span>
    </div>
  );
}

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  rounded?: boolean;
  animated?: boolean;
}

export function Skeleton({
  width = "100%",
  height = "1rem",
  rounded = true,
  animated = true,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div 
      className={cn(
        "bg-muted/60", 
        { 
          "rounded": rounded,
          "animate-pulse": animated 
        },
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
      {...props}
    />
  );
}
