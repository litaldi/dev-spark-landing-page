
import React, { useState, useEffect } from "react";
import { WebFirstLayout } from "@/components/layout/WebFirstLayout";
import { EnhancedDashboardContent } from "@/components/dashboard/EnhancedDashboardContent";
import { useAuth } from "@/hooks/auth/use-auth";
import { useToast } from "@/hooks/use-toast";
import { LoadingPage } from "@/components/ui/enhanced-loading";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const userName = currentUser?.name || "Alex";
  const isFirstTimeUser = currentUser?.isFirstTimeUser || false;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      if (!localStorage.getItem("currentStreak")) {
        localStorage.setItem("currentStreak", "5");
        localStorage.setItem("totalStudyHours", "15");
        localStorage.setItem("lessonsCompleted", "8");
        localStorage.setItem("projectsStarted", "3");
        localStorage.setItem("lastSessionDate", new Date(Date.now() - 86400000).toISOString());
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleError = (errorMessage: string | null) => {
    setError(errorMessage);
    if (errorMessage) {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return (
      <LoadingPage 
        message="Loading your dashboard..." 
        submessage="Preparing your personalized learning experience"
        showProgress={true}
        progress={75}
      />
    );
  }
  
  if (error) {
    return (
      <WebFirstLayout 
        title="Dashboard - Error"
        description="Dashboard loading error"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">
              Something went wrong
            </h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button 
              onClick={() => {
                setError(null);
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1000);
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </WebFirstLayout>
    );
  }
  
  return (
    <ErrorBoundary>
      <WebFirstLayout
        title={`${userName}'s Learning Dashboard`}
        description="Track your progress, discover new content, and accelerate your learning journey"
        className="bg-gradient-to-br from-background via-background to-muted/30"
      >
        <div className="container mx-auto px-4 py-6 lg:py-8 space-y-6">
          <EnhancedDashboardContent
            userName={userName}
            isFirstTimeUser={isFirstTimeUser}
            isLoading={isLoading}
            onError={handleError}
          />
        </div>
      </WebFirstLayout>
    </ErrorBoundary>
  );
};

export default Dashboard;
