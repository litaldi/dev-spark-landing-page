
import React from 'react';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const handleReportError = () => {
    // In a real app, this would send error reports to your error tracking service
    console.error('Error reported:', error);
    
    // Create a mailto link for error reporting
    const subject = encodeURIComponent('DevAI Error Report');
    const body = encodeURIComponent(`
Error: ${error.message}
Stack: ${error.stack}
URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toISOString()}
    `);
    
    window.location.href = `mailto:support@devai.com?subject=${subject}&body=${body}`;
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 bg-background ${className}`}>
      <Card className="w-full max-w-lg animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-destructive/10 rounded-full">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-xl font-semibold text-foreground">
            Oops! Something went wrong
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            We encountered an unexpected error. Don't worry, this has been logged and we're looking into it.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isDevelopment && (
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">Error Details (Dev Mode)</h4>
              <p className="text-xs text-muted-foreground font-mono break-all">
                {error.message}
              </p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                    Stack Trace
                  </summary>
                  <pre className="text-xs text-muted-foreground mt-2 whitespace-pre-wrap break-all">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Here are some things you can try:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Refresh the page to try again</li>
              <li>Go back to the homepage</li>
              <li>Clear your browser cache</li>
              <li>Contact support if the problem persists</li>
            </ul>
          </div>
        </CardContent>
        
        <Separator />
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button 
            onClick={resetErrorBoundary}
            className="w-full sm:w-auto"
            variant="default"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          
          <Button 
            onClick={handleGoHome}
            className="w-full sm:w-auto"
            variant="outline"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
          
          <Button 
            onClick={handleReportError}
            className="w-full sm:w-auto"
            variant="ghost"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
