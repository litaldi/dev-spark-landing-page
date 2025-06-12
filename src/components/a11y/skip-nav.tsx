
import React from 'react';
import { cn } from '@/lib/utils';

interface SkipNavLinkProps {
  contentId: string;
  children: React.ReactNode;
  className?: string;
}

export const SkipNavLink: React.FC<SkipNavLinkProps> = ({ 
  contentId, 
  children, 
  className 
}) => {
  return (
    <a
      href={`#${contentId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4",
        "bg-primary text-primary-foreground px-4 py-2 rounded-md",
        "z-50 font-medium transition-all",
        className
      )}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const target = document.getElementById(contentId);
          if (target) {
            target.focus();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }}
    >
      {children}
    </a>
  );
};

interface SkipNavContentProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const SkipNavContent: React.FC<SkipNavContentProps> = ({ 
  id, 
  children, 
  className 
}) => {
  return (
    <div 
      id={id} 
      tabIndex={-1}
      className={className}
      role="main"
      aria-label="Main content"
    >
      {children}
    </div>
  );
};
