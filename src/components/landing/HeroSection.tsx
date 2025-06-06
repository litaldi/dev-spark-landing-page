
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // In a real app, this would come from your auth provider
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleGetStarted = () => {
    navigate("/auth/register");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <section 
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-brand-100 via-brand-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden" 
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Geometric patterns */}
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-brand-300 dark:bg-brand-400 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-brand-400 dark:bg-brand-500 blur-3xl"></div>
        </div>
      </div>
      
      <div className="container px-4 sm:px-6 max-w-6xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto animate-fade-up z-10">
          <h1 
            id="hero-heading" 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-brand-800 dark:text-white mb-3 sm:mb-4 md:mb-5 leading-tight tracking-tight"
          >
            Your First Dev Job <span className="text-brand-500 dark:text-brand-400">Starts Here</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
            Practice code, build your resume, and get interview-ready — all powered by AI.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6">
            {isLoggedIn ? (
              <Button 
                size="lg" 
                className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-sm sm:text-base transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                onClick={handleDashboard}
                aria-label="Navigate to your dashboard"
              >
                Go to Dashboard
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                size="lg" 
                className={`rounded-full bg-brand-500 hover:bg-brand-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-sm sm:text-base transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg ${isMobile ? 'w-full' : ''}`}
                onClick={handleGetStarted}
                aria-label="Sign up for an account"
              >
                Get Started for Free
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
          
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            No credit card required · Start for free
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
