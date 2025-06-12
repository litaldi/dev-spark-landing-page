
import React from "react";
import { cn } from "@/lib/utils";

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
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(contentId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const target = document.getElementById(contentId);
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <a
      href={`#${contentId}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50",
        "focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md",
        "focus:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "font-medium text-sm transition-all duration-200",
        "hover:bg-primary/90 focus:outline-none",
        className
      )}
      role="button"
      tabIndex={0}
      aria-label={`Skip to ${contentId.replace('-', ' ')}`}
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
    <main
      id={id}
      tabIndex={-1}
      className={cn("focus:outline-none", className)}
      role="main"
      aria-label="Main content"
    >
      {children}
    </main>
  );
};

// Enhanced skip navigation for better accessibility
export const SkipNavigation: React.FC = () => {
  return (
    <div className="sr-only focus-within:not-sr-only fixed top-0 left-0 right-0 z-50 bg-background border-b shadow-lg">
      <div className="container mx-auto p-4">
        <div className="flex gap-4">
          <SkipNavLink contentId="main-content">
            Skip to main content
          </SkipNavLink>
          <SkipNavLink contentId="main-navigation">
            Skip to navigation
          </SkipNavLink>
          <SkipNavLink contentId="search">
            Skip to search
          </SkipNavLink>
        </div>
      </div>
    </div>
  );
};
