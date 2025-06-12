
import React from 'react';
import { cn } from '@/lib/utils';

interface SkipNavLinkProps {
  contentId: string;
  children: React.ReactNode;
  className?: string;
}

export function SkipNavLink({ contentId, children, className }: SkipNavLinkProps) {
  return (
    <a
      href={`#${contentId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50",
        "bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "transition-all duration-200",
        className
      )}
    >
      {children}
    </a>
  );
}

interface SkipNavContentProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SkipNavContent({ id, children, className }: SkipNavContentProps) {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}
