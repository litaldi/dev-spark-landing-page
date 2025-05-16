
import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DemoUserBannerProps {
  className?: string;
}

const DemoUserBanner: React.FC<DemoUserBannerProps> = ({ className }) => {
  return (
    <Alert 
      className={`bg-brand-50 border-brand-200 dark:bg-brand-900/30 dark:border-brand-800 my-2 ${className}`}
      aria-live="polite"
      role="status"
      data-testid="demo-banner"
    >
      <AlertCircle className="h-4 w-4 text-brand-500" aria-hidden="true" />
      <AlertTitle className="text-brand-700 dark:text-brand-300 font-medium">Demo Mode</AlertTitle>
      <AlertDescription className="text-brand-600 dark:text-brand-400">
        You're currently using a demo account. Some features may be limited.
      </AlertDescription>
    </Alert>
  );
};

export default DemoUserBanner;
