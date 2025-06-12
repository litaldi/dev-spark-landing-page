
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";
import { useToast } from "@/hooks/use-toast";
import { AlertError } from "@/components/auth/AlertError";
import { EnhancedDashboardContent } from "@/components/dashboard/EnhancedDashboardContent";
import { EnhancedOnboardingOverlay } from "@/components/onboarding/EnhancedOnboardingOverlay";
import { AccessibilityProvider } from "@/components/a11y/AccessibilityProvider";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("User");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const navigate = useNavigate();
  
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
    
    // Check if first-time user (no lessons completed)
    const onboardingComplete = localStorage.getItem("onboardingComplete");
    const onboardingOverlayComplete = localStorage.getItem("onboarding-completed");
    
    setIsFirstTimeUser(onboardingComplete !== "true");
    setShowOnboarding(onboardingOverlayComplete !== "true" && onboardingComplete !== "true");

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  return (
    <AccessibilityProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <SkipNavLink contentId="main-content">Skip to content</SkipNavLink>
        <Navbar />
        <main className="flex-1 container py-6 md:py-10 lg:py-12" id="main-content">
          <SkipNavContent id="main-content">
            <AlertError 
              message={error}
              onClose={() => setError(null)}
              className="mb-6"
            />
            
            <EnhancedDashboardContent
              userName={userName}
              isFirstTimeUser={isFirstTimeUser}
              isLoading={isLoading}
              onError={setError}
            />
          </SkipNavContent>
        </main>
        <Footer />
        
        {/* Enhanced Onboarding Overlay */}
        {showOnboarding && (
          <EnhancedOnboardingOverlay onComplete={handleOnboardingComplete} />
        )}
      </div>
    </AccessibilityProvider>
  );
};

export default Dashboard;
