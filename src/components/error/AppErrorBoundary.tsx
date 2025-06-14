
import React from "react";

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}
interface AppErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // You can log error info here (e.g., Sentry)
    // console.error("App caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          className="w-full min-h-screen flex flex-col items-center justify-center"
          aria-label="Error message"
        >
          <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-destructive/30 max-w-lg text-center animate-fade-in">
            <h1 className="text-2xl font-semibold text-destructive mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-500 dark:text-gray-300 mb-4">
              An unexpected error occurred. Please refresh the page or contact support if the problem persists.
            </p>
            <button
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              onClick={() => window.location.reload()}
              aria-label="Reload page"
            >
              Refresh
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

