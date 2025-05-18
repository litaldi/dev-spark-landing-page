
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import GetStartedButton from "./GetStartedButton";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // In a real app, this would come from your auth provider
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleTryDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="py-16 sm:py-20 md:py-28 lg:py-32 bg-gradient-to-br from-brand-100 via-brand-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden" 
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Geometric patterns */}
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-brand-300 dark:bg-brand-400 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-brand-400 dark:bg-brand-500 blur-3xl"></div>
        </div>
      </div>
      
      <div className="container px-4 max-w-6xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto animate-fade-up z-10">
          <h1 
            id="hero-heading" 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-800 dark:text-white mb-4 sm:mb-6 leading-tight tracking-tight"
          >
            Your First Dev Job <span className="text-brand-500 dark:text-brand-400">Starts Here</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Practice code, build your resume, and get interview-ready — all powered by AI.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6">
            {isLoggedIn ? (
              <Button 
                size="lg" 
                className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                onClick={() => navigate("/dashboard")}
                aria-label="Navigate to your dashboard"
              >
                Go to Dashboard
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className={`rounded-full bg-brand-500 hover:bg-brand-600 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg ${isMobile ? 'w-full' : ''}`}
                  onClick={() => navigate("/auth/register")}
                  aria-label="Sign up for an account"
                >
                  Get Started for Free
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className={`rounded-full border-brand-300 dark:border-brand-700 bg-white dark:bg-gray-900 bg-opacity-90 backdrop-blur-sm hover:bg-brand-50 dark:hover:bg-gray-800 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg text-brand-700 dark:text-brand-300 ${isMobile ? 'w-full' : ''}`}
                  onClick={handleTryDemo}
                  aria-label="Try the demo"
                >
                  Try Demo
                </Button>
              </>
            )}
          </div>
          
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            No credit card required · Start for free · No sign-up required for basic features
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
