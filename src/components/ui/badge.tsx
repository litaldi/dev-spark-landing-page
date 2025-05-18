
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input text-foreground hover:bg-accent/40 hover:text-accent-foreground",
        success:
          "border-transparent bg-emerald-500 text-white shadow-sm hover:bg-emerald-600",
        warning:
          "border-transparent bg-amber-500 text-white shadow-sm hover:bg-amber-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div 
      className={cn(badgeVariants({ variant }), className)} 
      {...props} 
    />
  );
}

export { Badge, badgeVariants };
