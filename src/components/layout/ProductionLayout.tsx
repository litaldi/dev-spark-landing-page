
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ResponsiveNavigation } from '@/components/navigation/ResponsiveNavigation';
import { NetworkStatus } from '@/components/system/NetworkStatus';
import { AccessibilityControls } from '@/components/accessibility/AccessibilityControls';
import { PerformanceMonitor } from '@/components/system/PerformanceMonitor';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { SEOHead } from '@/components/seo/SEOHead';
import { SkipNavLink, SkipNavContent } from '@/components/a11y/skip-nav';

interface ProductionLayoutProps {
  children?: React.ReactNode;
}

export const ProductionLayout: React.FC<ProductionLayoutProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <SEOHead 
        title="DevAI - AI-Powered Programming Education"
        description="Learn programming with AI assistance, build real projects, and advance your developer career with personalized learning paths."
        keywords="programming, education, AI, coding, web development, career, learning"
      />
      
      {/* Skip Navigation */}
      <SkipNavLink contentId="main-content">Skip to main content</SkipNavLink>
      
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <ResponsiveNavigation />
        
        {/* Main Content */}
        <SkipNavContent id="main-content">
          <main className="flex-1">
            {children || <Outlet />}
          </main>
        </SkipNavContent>
        
        {/* System Components */}
        <NetworkStatus />
        <AccessibilityControls />
        <PerformanceMonitor />
        
        {/* Toast Notifications */}
        <Toaster />
      </div>
    </ErrorBoundary>
  );
};
