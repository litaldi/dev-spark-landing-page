
import React from 'react';
import { SkipNavLink, SkipNavContent } from '@/components/a11y/skip-nav';
import { WebFirstHeader } from '@/components/layout/WebFirstHeader';
import { BackToTop } from '@/components/navigation/BackToTop';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { prefersReducedMotion, announceToScreenReader } from '@/lib/keyboard-utils';
import { cn } from '@/lib/utils';

interface WebFirstLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  mainId?: string;
  includeHeader?: boolean;
  includeBreadcrumbs?: boolean;
  includeBackToTop?: boolean;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
}

export function WebFirstLayout({
  children,
  title,
  description,
  mainId = 'main-content',
  includeHeader = true,
  includeBreadcrumbs = true,
  includeBackToTop = true,
  className = '',
  containerClassName = '',
  fullWidth = false
}: WebFirstLayoutProps) {
  React.useEffect(() => {
    if (title) {
      document.title = title;
      announceToScreenReader(`Page loaded: ${title}`, 'polite');
    }
    
    const reducedMotion = prefersReducedMotion();
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    }
  }, [title]);
  
  return (
    <div className={cn("min-h-screen flex flex-col bg-background", className)}>
      <SkipNavLink contentId={mainId}>Skip to main content</SkipNavLink>
      
      {includeHeader && <WebFirstHeader />}
      
      <SkipNavContent id={mainId}>
        <main 
          id="main-content" 
          className="flex-1" 
          tabIndex={-1}
          role="main"
          aria-label="Main content"
        >
          {title && (
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {title}
              {description && ` - ${description}`}
            </div>
          )}
          
          {includeBreadcrumbs && (
            <div className={cn("border-b bg-muted/30", fullWidth ? "" : "container mx-auto")}>
              <div className={cn("py-4 px-4 lg:px-6", fullWidth ? "max-w-none" : "")}>
                <Breadcrumbs />
              </div>
            </div>
          )}
          
          <div className={cn(
            fullWidth ? "" : "container mx-auto",
            containerClassName
          )}>
            {children}
          </div>
        </main>
      </SkipNavContent>
      
      {includeBackToTop && <BackToTop />}
    </div>
  );
}
