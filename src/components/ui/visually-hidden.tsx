
import React from 'react';
import { cn } from '@/lib/utils';

interface VisuallyHiddenProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

export function VisuallyHidden({ children, asChild = false, className }: VisuallyHiddenProps) {
  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      className: cn((children as React.ReactElement).props.className, "sr-only", className)
    });
  }
  
  return <span className={cn("sr-only", className)}>{children}</span>;
}
