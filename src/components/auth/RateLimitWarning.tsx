
import React from "react";
import { useBreakpoint } from "@/hooks/use-mobile";
import { AlertCircle } from "lucide-react";

interface RateLimitWarningProps {
  isBlocked: boolean;
  timeRemaining: number;
}

export function RateLimitWarning({ isBlocked, timeRemaining }: RateLimitWarningProps) {
  if (!isBlocked) return null;
  
  const breakpoint = useBreakpoint();
  const isSmallScreen = breakpoint === "xs" || breakpoint === "mobile";
  
  return (
    <div 
      className="bg-destructive/10 border border-destructive text-destructive px-3 sm:px-4 py-3 rounded-lg mb-4 flex items-start gap-3" 
      role="alert" 
      aria-live="assertive"
    >
      <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
      <div>
        <p className={`font-medium ${isSmallScreen ? 'text-sm' : ''}`}>Account protection activated</p>
        <p className={`${isSmallScreen ? 'text-xs' : 'text-sm'}`}>
          Too many login attempts. Please try again in {Math.ceil(timeRemaining / 60000)} minutes.
        </p>
      </div>
    </div>
  );
}
