
import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EnhancedErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  className?: string;
}

export function EnhancedErrorFallback({ 
  error, 
  resetErrorBoundary, 
  className 
}: EnhancedErrorFallbackProps) {
  const handleReportBug = () => {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.log('Bug report data:', errorDetails);
    // In production, send to error tracking service
  };

  const suggestions = [
    "Try refreshing the page",
    "Check your internet connection", 
    "Clear your browser cache",
    "Try again in a few minutes"
  ];

  return (
    <div className={cn("min-h-screen flex items-center justify-center p-6 bg-background", className)}>
      <Card className="w-full max-w-2xl p-8 text-center space-y-6 shadow-lg border-destructive/20">
        <div className="flex justify-center">
          <div className="p-4 bg-destructive/10 rounded-full animate-pulse">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            Oops! Something went wrong
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
            We're sorry for the inconvenience. An unexpected error occurred while loading this content.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 p-4 bg-muted rounded-lg text-left text-sm">
              <summary className="font-medium cursor-pointer mb-2 flex items-center gap-2">
                <Bug className="h-4 w-4" />
                Error Details (Development Mode)
              </summary>
              <pre className="whitespace-pre-wrap text-xs text-destructive overflow-auto max-h-32 mt-2">
                {error.message}
                {error.stack && (
                  <>
                    {'\n\nStack Trace:'}
                    {error.stack}
                  </>
                )}
              </pre>
            </details>
          )}

          <div className="bg-muted/50 rounded-lg p-4 text-left">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Try these solutions:</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button 
            onClick={resetErrorBoundary}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>

          <Button 
            onClick={handleReportBug}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Bug className="h-4 w-4" />
            Report Issue
          </Button>
        </div>

        <p className="text-xs text-muted-foreground pt-4 border-t border-border/50">
          If this problem persists, please contact our support team at{' '}
          <a href="mailto:support@devai.com" className="text-primary hover:underline">
            support@devai.com
          </a>
        </p>
      </Card>
    </div>
  );
}
