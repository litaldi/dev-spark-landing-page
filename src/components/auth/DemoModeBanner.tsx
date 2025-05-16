
import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DemoModeBannerProps {
  className?: string;
}

export function DemoModeBanner({ className }: DemoModeBannerProps) {
  // Check localStorage directly instead of using useAuth hook
  const isDemoUser = localStorage.getItem("isDemoUser") === "true";
  
  if (!isDemoUser) {
    return null;
  }
  
  return (
    <Alert className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <span className="font-medium">Demo Mode:</span> You're currently using a demo account. Some features may be limited.
      </AlertDescription>
    </Alert>
  );
}
