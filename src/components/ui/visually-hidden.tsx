
import React from 'react';
import { cn } from '@/lib/utils';

interface VisuallyHiddenProps {
  children: React.ReactNode;
  className?: string;
}

export function VisuallyHidden({ children, className }: VisuallyHiddenProps) {
  return (
    <span 
      className={cn(
        'sr-only absolute w-px h-px p-0 m-[-1px] overflow-hidden whitespace-nowrap border-0',
        className
      )}
    >
      {children}
    </span>
  );
}
