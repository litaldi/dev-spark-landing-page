
import React from "react";
import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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
      className={cn("animate-fade-in", className)}
    >
      <XCircle className="h-4 w-4" />
      {showTitle && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

export function SuccessMessage({
  message,
  showTitle = true,
  title = "Success",
  className,
}: Omit<FormErrorProps, "onDismiss">) {
  if (!message) return null;

  return (
    <Alert 
      className={cn("bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900", className)}
    >
      {showTitle && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
