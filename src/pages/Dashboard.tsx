
import React, { useState, useEffect } from "react";
import { EnhancedWebFirstLayout } from "@/components/layout/EnhancedWebFirstLayout";
import { EnhancedDashboardContent } from "@/components/dashboard/EnhancedDashboardContent";
import { EnhancedDashboardStats } from "@/components/dashboard/enhanced/EnhancedDashboardStats";
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
      <EnhancedWebFirstLayout 
        title="Dashboard - Error"
        description="Dashboard loading error"
        variant="centered"
      >
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold text-destructive">
            Something went wrong
          </h1>
          <p className="text-muted-foreground">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1000);
            }}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </EnhancedWebFirstLayout>
    );
  }
  
  return (
    <ErrorBoundary>
      <EnhancedWebFirstLayout
        title={`${userName}'s Learning Dashboard`}
        description="Track your progress, discover new content, and accelerate your learning journey"
        className="bg-gradient-to-br from-background via-background to-muted/30"
        maxWidth="2xl"
      >
        <div className="py-6 lg:py-8 space-y-8">
          {/* Enhanced Stats Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's your learning progress and what's next on your journey.
              </p>
            </div>
            
            <EnhancedDashboardStats />
          </div>
          
          {/* Main Dashboard Content */}
          <EnhancedDashboardContent
            userName={userName}
            isFirstTimeUser={isFirstTimeUser}
            isLoading={isLoading}
            onError={handleError}
          />
        </div>
      </EnhancedWebFirstLayout>
    </ErrorBoundary>
  );
};

export default Dashboard;
