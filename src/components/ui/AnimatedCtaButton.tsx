
import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedCtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AnimatedCtaButton = React.forwardRef<HTMLButtonElement, AnimatedCtaButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "bg-brand-500 text-white px-6 py-2 rounded-lg font-semibold shadow-sm transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 animate-fade-in",
        className
      )}
      {...props}
    />
  )
);
AnimatedCtaButton.displayName = "AnimatedCtaButton";
