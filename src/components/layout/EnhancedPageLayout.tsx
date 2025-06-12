
import React from 'react';
import { SkipNavLink, SkipNavContent } from '@/components/a11y/skip-nav';
import Navbar from '@/components/landing/Navbar';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { BackToTop } from '@/components/navigation/BackToTop';
import { prefersReducedMotion, announceToScreenReader } from '@/lib/keyboard-utils';

interface EnhancedPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  mainId?: string;
  includeNavbar?: boolean;
  includeBreadcrumbs?: boolean;
  includeBackToTop?: boolean;
  className?: string;
}

/**
 * Enhanced page layout with improved UX patterns
 */
export function EnhancedPageLayout({
  children,
  title,
  description,
  mainId = 'skip-nav-content',
  includeNavbar = true,
  includeBreadcrumbs = true,
  includeBackToTop = true,
  className = ''
}: EnhancedPageLayoutProps) {
  // Announce page title to screen readers when navigating to a new page
  React.useEffect(() => {
    if (title) {
      document.title = title;
      announceToScreenReader(`Page loaded: ${title}`, 'polite');
    }
    
    // Check motion preferences
    const reducedMotion = prefersReducedMotion();
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    }
  }, [title]);
  
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <SkipNavLink contentId={mainId}>Skip to main content</SkipNavLink>
      
      {includeNavbar && <Navbar />}
      
      <SkipNavContent id={mainId}>
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {title && (
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {title}
              {description && ` - ${description}`}
            </div>
          )}
          
          {includeBreadcrumbs && (
            <div className="container mx-auto px-4 py-4">
              <Breadcrumbs />
            </div>
          )}
          
          {children}
        </main>
      </SkipNavContent>
      
      {includeBackToTop && <BackToTop />}
    </div>
  );
}
