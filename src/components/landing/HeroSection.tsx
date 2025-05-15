
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";

const HeroSection: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  // In a real app, this would come from your auth provider
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  // For demo purposes only - toggle login state
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <section 
      className="py-20 md:py-32 bg-gradient-to-br from-brand-100 via-brand-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden" 
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-800 dark:text-white mb-6 leading-tight tracking-tight"
          >
            Your First Dev Job <span className="text-brand-500 dark:text-brand-400">Starts Here</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Practice code, build your resume, and get interview-ready — all powered by AI.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            {isLoggedIn ? (
              <Button 
                size="lg" 
                className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 text-lg transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                onClick={toggleLoginState}
                aria-label="Navigate to your dashboard"
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 text-lg transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                  onClick={() => window.location.href = "#demo"}
                  aria-label="Try the demo"
                >
                  Try Demo
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full border-brand-300 dark:border-brand-700 bg-white dark:bg-gray-900 bg-opacity-90 backdrop-blur-sm hover:bg-brand-50 dark:hover:bg-gray-800 px-8 py-6 text-brand-700 dark:text-brand-300"
                  onClick={openLoginModal}
                  aria-label="Get started with the platform"
                >
                  <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                  Get Started
                </Button>
              </>
            )}
          </div>
          
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            No credit card required · Start for free · No sign-up required for basic features
          </p>
        </div>
      </div>
      
      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </section>
  );
};

export default HeroSection;
