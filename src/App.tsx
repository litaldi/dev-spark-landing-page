
import React, { useState } from "react";
import { AppErrorBoundary } from "@/components/error/AppErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import { LoadingSpinnerOverlay } from "@/components/ui/LoadingSpinnerOverlay";
import { SkipNavLink } from "@/components/a11y/skip-nav";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/context/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const [loading, setLoading] = useState(false);
  const queryClient = new QueryClient();

  // In a real app, loading state may come from context or suspense, etc.
  // Here for demo purposes only.
  const toggleLoading = () => setLoading(prev => !prev);

  return (
    <AppErrorBoundary>
      <SkipNavLink contentId="main-content" className="fixed top-0 left-0">
        Skip to main content
      </SkipNavLink>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          <AuthProvider>
            <LoadingSpinnerOverlay visible={loading} />
            <main id="main-content" aria-label="Main content">
              <Outlet />
            </main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}

export default App;
