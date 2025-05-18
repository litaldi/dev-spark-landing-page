
import React from "react";

interface RateLimitWarningProps {
  isBlocked: boolean;
  timeRemaining: number;
}

export function RateLimitWarning({ isBlocked, timeRemaining }: RateLimitWarningProps) {
  if (!isBlocked) return null;
  
  return (
    <div 
      className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-4" 
      role="alert" 
      aria-live="assertive"
    >
      <p className="font-medium">Account protection activated</p>
      <p className="text-sm">
        Too many login attempts. Please try again in {Math.ceil(timeRemaining / 60000)} minutes.
      </p>
    </div>
  );
}
