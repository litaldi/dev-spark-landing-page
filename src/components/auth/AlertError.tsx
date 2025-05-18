
import React, { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertErrorProps {
  message?: string | null;
  className?: string;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export function AlertError({ 
  message, 
  className,
  onClose,
  autoClose = false,
  autoCloseDelay = 5000
}: AlertErrorProps) {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (message && autoClose) {
      timer = setTimeout(() => {
        if (onClose) onClose();
      }, autoCloseDelay);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [message, onClose, autoClose, autoCloseDelay]);

  if (!message) return null;

  return (
    <Alert 
      variant="destructive" 
      className={cn(
        "animate-fade-in transition-all duration-300", 
        className
      )}
    >
      <XCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
