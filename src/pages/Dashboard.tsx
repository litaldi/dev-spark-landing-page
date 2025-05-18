
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import DemoUserBanner from "@/components/demo/DemoUserBanner";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";
import { AlertError } from "@/components/auth/AlertError";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { ProgressSection } from "@/components/dashboard/ProgressSection";
import { LearningPathSection } from "@/components/dashboard/LearningPathSection";
import { RecentActivitySection } from "@/components/dashboard/RecentActivitySection";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("User");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Check login status
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus !== "true") {
      navigate("/auth/login");
      return () => clearTimeout(timer);
    }

    setIsLoggedIn(true);
    
    // Get user name
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
    
    // Check if demo user
    const demoStatus = localStorage.getItem("isDemoUser");
    setIsDemoUser(demoStatus === "true");
    
    // Check if first-time user (no lessons completed)
    const onboardingComplete = localStorage.getItem("onboardingComplete");
    setIsFirstTimeUser(onboardingComplete !== "true");

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `You clicked on ${action}. This feature is coming soon!`,
    });
  };

  const startFirstLesson = () => {
    localStorage.setItem("onboardingComplete", "true");
    setIsFirstTimeUser(false);
    toast({
      title: "First Lesson Started",
      description: "Welcome to your learning journey!",
    });
  };

  const startSession = () => {
    handleAction("Start Today's Session");
  };

  const startLesson = (lessonId: string) => {
    toast({
      title: "Lesson Started",
      description: `You've started the lesson: ${lessonId}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipNavLink>Skip to content</SkipNavLink>
      <Navbar />
      <main className="flex-1 container py-6 md:py-10 lg:py-12" id="main-content">
        <SkipNavContent>
          {isDemoUser && <DemoUserBanner className="mb-6" />}
          <AlertError 
            message={error}
            onClose={() => setError(null)}
            className="mb-6"
          />
          
          <WelcomeSection
            userName={userName}
            isFirstTimeUser={isFirstTimeUser}
            isLoading={isLoading}
            onStartFirstLesson={startFirstLesson}
            onStartTodaysSession={startSession}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ProgressSection 
                weeklyGoalHours={10}
                currentHours={2}
                streakDays={5}
                lessonsCompleted={2}
                projectsStarted={1}
                isLoading={isLoading}
              />
              
              <LearningPathSection 
                isLoading={isLoading}
                onStartLesson={startLesson}
              />
            </div>
            
            <div className="lg:col-span-1">
              <RecentActivitySection isLoading={isLoading} />
            </div>
          </div>
        </SkipNavContent>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
