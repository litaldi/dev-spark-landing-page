
import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";

interface DemoModeBannerProps {
  className?: string;
}

export function DemoModeBanner({ className }: DemoModeBannerProps) {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  
  if (!user?.isDemoUser) {
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
