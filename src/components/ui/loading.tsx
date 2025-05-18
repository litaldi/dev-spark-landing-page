
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the loading indicator */
  size?: "sm" | "md" | "lg" | "xl";
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
    xl: "h-16 w-16",
  };

  const containerClasses = cn(
    "flex flex-col items-center justify-center",
    { 
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm": fullScreen,
      "h-full w-full": center && !fullScreen,
      "py-6 md:py-8": !fullScreen && !center,
    },
    className
  );

  return (
    <div className={containerClasses} role="status" {...props}>
      <div className="animate-spin" aria-hidden="true">
        <Loader2 className={cn("text-primary/70", sizeMap[size])} />
      </div>
      {text && (
        <p className="mt-3 text-sm md:text-base text-muted-foreground animate-pulse">{text}</p>
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
  repeat?: number;
}

export function Skeleton({
  width = "100%",
  height = "1rem",
  rounded = true,
  animated = true,
  repeat = 1,
  className,
  ...props
}: SkeletonProps) {
  if (repeat > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: repeat }).map((_, i) => (
          <Skeleton 
            key={i}
            width={width}
            height={height}
            rounded={rounded}
            animated={animated}
            className={className}
            {...props}
          />
        ))}
      </div>
    );
  }

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
