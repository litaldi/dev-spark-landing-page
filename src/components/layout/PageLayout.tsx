
import React from 'react';
import { SkipNavLink, SkipNavContent } from '@/components/a11y/skip-nav';
import { Navbar } from '@/components/landing/Navbar';
import { prefersReducedMotion } from '@/lib/keyboard-utils';
import { announceToScreenReader } from '@/lib/keyboard-utils';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  mainId?: string;
  includeNavbar?: boolean;
}

/**
 * Standard page layout with accessibility features
 */
export function PageLayout({
  children,
  title,
  description,
  mainId = 'skip-nav-content',
  includeNavbar = true
}: PageLayoutProps) {
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
    <>
      <SkipNavLink contentId={mainId} />
      
      {includeNavbar && <Navbar />}
      
      <SkipNavContent id={mainId}>
        <main id="main-content" tabIndex={-1}>
          {title && (
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {title}
              {description && ` - ${description}`}
            </div>
          )}
          
          {children}
        </main>
      </SkipNavContent>
    </>
  );
}
