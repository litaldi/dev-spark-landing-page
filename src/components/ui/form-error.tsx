
import React from "react";
import { cn } from "@/lib/utils";
import { XCircle, CheckCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface FormErrorProps {
  /** Error message to display */
  message?: string | null;
  /** Whether to show a title */
  showTitle?: boolean;
  /** Custom title */
  title?: string;
  /** Additional CSS classes */
  className?: string;
  /** Called when the error is dismissed */
  onDismiss?: () => void;
}

export function FormError({
  message,
  showTitle = true,
  title = "Error",
  className,
  onDismiss,
}: FormErrorProps) {
  if (!message) return null;

  return (
    <Alert 
      variant="destructive" 
      className={cn("animate-fade-in max-w-full sm:max-w-md mx-auto", className)}
      role="alert"
      aria-live="assertive"
    >
      <XCircle className="h-4 w-4" aria-hidden="true" />
      <div className="flex-1">
        {showTitle && <AlertTitle className="text-sm font-medium">{title}</AlertTitle>}
        <AlertDescription className="text-sm md:text-base">{message}</AlertDescription>
      </div>
      {onDismiss && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onDismiss}
          className="ml-auto h-8 w-8 p-0 flex items-center justify-center"
          aria-label="Dismiss error"
        >
          <XCircle className="h-4 w-4" />
        </Button>
      )}
    </Alert>
  );
}

export function SuccessMessage({
  message,
  showTitle = true,
  title = "Success",
  className,
  onDismiss,
}: Omit<FormErrorProps, "onDismiss"> & { onDismiss?: () => void }) {
  if (!message) return null;

  return (
    <Alert 
      className={cn(
        "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900 animate-fade-in max-w-full sm:max-w-md mx-auto",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" aria-hidden="true" />
      <div className="flex-1">
        {showTitle && <AlertTitle className="text-sm font-medium">{title}</AlertTitle>}
        <AlertDescription className="text-sm md:text-base">{message}</AlertDescription>
      </div>
      {onDismiss && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onDismiss}
          className="ml-auto h-8 w-8 p-0 flex items-center justify-center text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800/30"
          aria-label="Dismiss notification"
        >
          <XCircle className="h-4 w-4" />
        </Button>
      )}
    </Alert>
  );
}
