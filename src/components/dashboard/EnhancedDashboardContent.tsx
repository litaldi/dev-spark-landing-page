
import React from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { Skeleton } from "@/components/ui/skeleton";
import { announceToScreenReader } from "@/lib/keyboard-utils";

interface EnhancedDashboardContentProps {
  userName: string;
  isFirstTimeUser: boolean;
  isLoading: boolean;
  onError: (error: string | null) => void;
}

/**
 * Enhanced Dashboard Content with improved loading states, error handling,
 * and accessibility features
 */
export function EnhancedDashboardContent({
  userName,
  isFirstTimeUser,
  isLoading,
  onError
}: EnhancedDashboardContentProps) {
  const [loadingState, setLoadingState] = React.useState<
    "initial" | "loading" | "loaded" | "error"
  >(isLoading ? "initial" : "loaded");
  
  // Announce page status to screen readers
  React.useEffect(() => {
    if (isLoading) {
      setLoadingState("loading");
      announceToScreenReader("Loading your dashboard", "polite");
    } else {
      setLoadingState("loaded");
      const message = isFirstTimeUser 
        ? "Dashboard loaded. Welcome to your new dashboard."
        : "Dashboard loaded. Welcome back to your dashboard.";
      announceToScreenReader(message, "polite");
    }
  }, [isLoading, isFirstTimeUser]);
  
  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add keyboard shortcuts for dashboard actions
      if (e.altKey) {
        switch (e.key) {
          case 'h':
            // Alt+H - Go to home
            e.preventDefault();
            window.location.href = '/';
            break;
          case 'p':
            // Alt+P - Go to profile
            e.preventDefault();
            window.location.href = '/profile';
            break;
          case 's':
            // Alt+S - Go to settings
            e.preventDefault();
            window.location.href = '/settings';
            break;
          case 'l':
            // Alt+L - Logout
            e.preventDefault();
            window.location.href = '/auth/logout';
            break;
          default:
            break;
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Show skeleton while loading
  if (loadingState === "initial") {
    return <DashboardSkeleton />;
  }
  
  return (
    <section aria-busy={isLoading}>
      {isLoading && <DashboardSkeleton />}
      
      <div className={isLoading ? 'sr-only' : ''}>
        <DashboardContent 
          userName={userName}
          isFirstTimeUser={isFirstTimeUser}
          isLoading={isLoading}
          onError={onError}
        />
      </div>
      
      {!isLoading && (
        <div 
          role="region" 
          aria-label="Keyboard shortcuts" 
          className="sr-only"
          tabIndex={0}
        >
          <h2>Keyboard shortcuts</h2>
          <ul>
            <li>Alt+H: Go to home page</li>
            <li>Alt+P: Go to profile page</li>
            <li>Alt+S: Go to settings page</li>
            <li>Alt+L: Logout</li>
          </ul>
        </div>
      )}
    </section>
  );
}

/**
 * Skeleton loader for dashboard content
 */
function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[150px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Skeleton className="h-[180px] w-full rounded-lg" />
          <Skeleton className="h-[250px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
