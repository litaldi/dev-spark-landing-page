
import React from 'react';
import { LoadingBoundary } from '@/components/ui/loading-boundary';
import { EnhancedErrorBoundary } from '@/components/error/EnhancedErrorBoundary';
import { SkipNavLink, SkipNavContent } from '@/components/a11y/skip-nav';
import { WebFirstHeader } from '@/components/layout/WebFirstHeader';
import { BackToTop } from '@/components/navigation/BackToTop';
import { cn } from '@/lib/utils';

interface FinalPolishLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  includeHeader?: boolean;
  includeBackToTop?: boolean;
  className?: string;
  loading?: boolean;
}

export function FinalPolishLayout({
  children,
  title,
  description,
  includeHeader = true,
  includeBackToTop = true,
  className,
  loading = false
}: FinalPolishLayoutProps) {
  React.useEffect(() => {
    if (title) {
      document.title = `${title} | DevAI Learning Platform`;
    }
  }, [title]);

  return (
    <EnhancedErrorBoundary>
      <div className={cn("min-h-screen flex flex-col bg-background", className)}>
        <SkipNavLink contentId="main-content">Skip to main content</SkipNavLink>
        
        {includeHeader && <WebFirstHeader />}
        
        <SkipNavContent id="main-content">
          <main 
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
            
            <LoadingBoundary
              text={loading ? "Loading content..." : undefined}
              className={loading ? "min-h-[50vh]" : undefined}
            >
              {children}
            </LoadingBoundary>
          </main>
        </SkipNavContent>
        
        {includeBackToTop && <BackToTop />}
      </div>
    </EnhancedErrorBoundary>
  );
}
