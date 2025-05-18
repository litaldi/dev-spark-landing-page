
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import DemoUserBanner from "@/components/demo/DemoUserBanner";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";
import { useToast } from "@/hooks/use-toast";
import { AlertError } from "@/components/auth/AlertError";
import { EnhancedDashboardContent } from "@/components/dashboard/EnhancedDashboardContent";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("User");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
          
          <EnhancedDashboardContent
            userName={userName}
            isFirstTimeUser={isFirstTimeUser}
            isLoading={isLoading}
            onError={setError}
          />
        </SkipNavContent>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
