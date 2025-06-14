
import React from "react";
import { AppErrorBoundary } from "@/components/error/EnhancedErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import { SkipNavLink } from "@/components/a11y/skip-nav";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSecurityMonitor } from "@/hooks/use-security-monitor";

// Create a stable query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as any).status;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  // Initialize security monitoring
  useSecurityMonitor({
    trackFailedLogins: true,
    trackRateLimits: true,
    trackCSRFViolations: true
  });

  return (
    <>
      <SkipNavLink contentId="main-content" className="fixed top-0 left-0 z-50">
        Skip to main content
      </SkipNavLink>
      <main id="main-content" aria-label="Main content" tabIndex={-1}>
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}

function App() {
  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          <AppContent />
        </ThemeProvider>
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}

export default App;
