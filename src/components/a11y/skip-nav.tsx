
import React from 'react';
import { cn } from '@/lib/utils';

interface SkipNavLinkProps {
  contentId: string;
  className?: string;
  children?: React.ReactNode;
}

export function SkipNavLink({ contentId, className, children = "Skip to main content" }: SkipNavLinkProps) {
  return (
    <a
      href={`#${contentId}`}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999]',
        'bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'transition-all duration-200',
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
}

export function SkipNavContent({ id, children }: SkipNavContentProps) {
  return (
    <div id={id} tabIndex={-1}>
      {children}
    </div>
  );
}
