
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { logSecurityEvent } from '@/lib/security/http-security';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
  retryCount: number;
}

export class EnhancedErrorBoundary extends Component<Props, State> {
  private retryTimeoutId: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const errorId = Date.now().toString(36) + Math.random().toString(36);
    return {
      hasError: true,
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error for monitoring
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Log security event
    logSecurityEvent('ERROR_BOUNDARY_TRIGGERED', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: Date.now()
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry, LogRocket, etc.
      console.warn('Error should be reported to monitoring service');
    }
  }

  handleRetry = () => {
    const { retryCount } = this.state;
    
    if (retryCount >= 3) {
      // Too many retries, reload the page
      window.location.reload();
      return;
    }

    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorId: null,
      retryCount: prevState.retryCount + 1
    }));

    // Auto-reset retry count after 30 seconds
    this.retryTimeoutId = window.setTimeout(() => {
      this.setState({ retryCount: 0 });
    }, 30000);
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportBug = () => {
    const { error, errorId } = this.state;
    const subject = encodeURIComponent(`Bug Report - Error ${errorId}`);
    const body = encodeURIComponent(
      `Error ID: ${errorId}\n` +
      `Error: ${error?.message}\n` +
      `Stack: ${error?.stack}\n` +
      `URL: ${window.location.href}\n` +
      `User Agent: ${navigator.userAgent}\n` +
      `Timestamp: ${new Date().toISOString()}`
    );
    
    // Open email client or bug reporting system
    window.open(`mailto:support@example.com?subject=${subject}&body=${body}`);
  };

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorId, retryCount } = this.state;
      const isNetworkError = error?.message.includes('fetch') || error?.message.includes('network');
      const tooManyRetries = retryCount >= 3;

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
          <Card className="w-full max-w-md mx-auto animate-fade-in">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle className="text-xl">
                {isNetworkError ? 'Connection Problem' : 'Something went wrong'}
              </CardTitle>
              <CardDescription className="text-sm">
                {isNetworkError 
                  ? 'Please check your internet connection and try again.'
                  : 'An unexpected error occurred. We\'re sorry for the inconvenience.'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Error details for development */}
              {process.env.NODE_ENV === 'development' && error && (
                <details className="text-xs text-muted-foreground bg-muted p-3 rounded border">
                  <summary className="cursor-pointer font-medium mb-2">
                    Error Details (Dev Mode)
                  </summary>
                  <code className="whitespace-pre-wrap break-all">
                    {error.message}
                    {error.stack && `\n\n${error.stack}`}
                  </code>
                </details>
              )}

              {/* Error ID for support */}
              {errorId && (
                <div className="text-xs text-muted-foreground text-center p-2 bg-muted rounded">
                  Error ID: <code className="font-mono">{errorId}</code>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={this.handleRetry}
                  className="w-full"
                  disabled={tooManyRetries}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {tooManyRetries ? 'Refresh Page' : `Try Again ${retryCount > 0 ? `(${retryCount}/3)` : ''}`}
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={this.handleGoHome}
                    className="flex-1"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={this.handleReportBug}
                    className="flex-1"
                  >
                    <Bug className="w-4 h-4 mr-2" />
                    Report Bug
                  </Button>
                </div>
              </div>

              {/* Retry warning */}
              {retryCount > 0 && (
                <p className="text-xs text-amber-600 dark:text-amber-400 text-center">
                  If the problem persists, try refreshing the page or going home.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Convenience wrapper for app-level error boundary
export function AppErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <EnhancedErrorBoundary
      onError={(error, errorInfo) => {
        // Custom error handling for the app
        console.error('App-level error:', { error, errorInfo });
      }}
    >
      {children}
    </EnhancedErrorBoundary>
  );
}
