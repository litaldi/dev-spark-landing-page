
import React from 'react';
import { SkipNavLink, SkipNavContent } from '@/components/a11y/skip-nav';
import { WebFirstHeader } from '@/components/layout/WebFirstHeader';
import { BackToTop } from '@/components/navigation/BackToTop';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { prefersReducedMotion, announceToScreenReader } from '@/lib/keyboard-utils';
import { cn } from '@/lib/utils';

interface EnhancedWebFirstLayoutProps {
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
  variant?: 'default' | 'centered' | 'sidebar' | 'minimal';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export function EnhancedWebFirstLayout({
  children,
  title,
  description,
  mainId = 'main-content',
  includeHeader = true,
  includeBreadcrumbs = true,
  includeBackToTop = true,
  className = '',
  containerClassName = '',
  fullWidth = false,
  variant = 'default',
  maxWidth = 'xl'
}: EnhancedWebFirstLayoutProps) {
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

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-none'
  };

  const variantClasses = {
    default: '',
    centered: 'flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]',
    sidebar: 'flex',
    minimal: 'bg-background'
  };
  
  return (
    <div className={cn("min-h-screen flex flex-col", variantClasses[variant], className)}>
      <SkipNavLink contentId={mainId}>Skip to main content</SkipNavLink>
      
      {includeHeader && <WebFirstHeader />}
      
      <SkipNavContent id={mainId}>
        <main 
          id="main-content" 
          className={cn("flex-1", variant === 'sidebar' ? 'flex-1' : '')} 
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
          
          {includeBreadcrumbs && variant !== 'minimal' && (
            <div className={cn("border-b bg-muted/30", fullWidth ? "" : "")}>
              <div className={cn(
                "py-4 px-4 lg:px-6 mx-auto",
                fullWidth ? "max-w-none" : maxWidthClasses[maxWidth]
              )}>
                <Breadcrumbs />
              </div>
            </div>
          )}
          
          <div className={cn(
            fullWidth ? "w-full" : `mx-auto ${maxWidthClasses[maxWidth]} px-4 lg:px-6`,
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
