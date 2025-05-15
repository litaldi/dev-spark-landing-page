
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, LogIn } from "lucide-react";
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-brand-100 via-brand-50 to-white relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Geometric patterns */}
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-brand-300 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-brand-400 blur-3xl"></div>
        </div>
      </div>
      
      <div className="container px-4 max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 text-center md:text-left animate-fade-up z-10">
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-800 mb-4 md:mb-6 leading-tight">
              Your First Dev Job <span className="text-brand-500">Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 md:mb-10 max-w-3xl">
              Practice code, build your resume, and get interview-ready — all powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              {isLoggedIn ? (
                <Button 
                  size="lg" 
                  className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 text-lg transform transition-all duration-300 hover:scale-105 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-4"
                  onClick={toggleLoginState}
                >
                  <span className="relative z-10">Go to Dashboard</span>
                  <span className="absolute inset-0 bg-brand-600 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>
                  <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" aria-hidden="true"></span>
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 text-lg transform transition-all duration-300 hover:scale-105 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-4"
                    onClick={toggleLoginState}
                  >
                    <span className="relative z-10">Start practicing today</span>
                    <span className="absolute inset-0 bg-brand-600 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>
                    <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" aria-hidden="true"></span>
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="rounded-full border-brand-300 bg-white bg-opacity-70 backdrop-blur-sm hover:bg-brand-50 text-brand-700"
                      onClick={openLoginModal}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign in
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="rounded-full border-brand-300 bg-white bg-opacity-70 backdrop-blur-sm hover:bg-brand-50 text-brand-700"
                      onClick={openLoginModal}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Continue with GitHub
                    </Button>
                  </div>
                </>
              )}
            </div>
            
            <p className="mt-4 text-sm text-gray-500">
              No credit card required · Start for free · No sign-up required for basic features
            </p>
            
            {!isLoggedIn && (
              <p className="mt-6 text-sm text-gray-600">
                Already have an account?{" "}
                <button 
                  onClick={openLoginModal}
                  className="text-brand-500 hover:text-brand-600 underline font-medium focus:outline-none focus:ring-2 focus:ring-brand-300 rounded-sm px-1"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
          
          <div className="md:w-2/5 mt-10 md:mt-0 animate-fade-up" style={{ animationDelay: "0.3s" }} aria-hidden="true">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-300 to-brand-500 rounded-xl transform rotate-2 scale-105 blur-sm"></div>
              <div className="relative bg-white border-4 border-gray-100 rounded-xl shadow-xl overflow-hidden">
                <div className="h-8 bg-gray-100 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50">
                  <div className="h-40 bg-white rounded border border-gray-200 p-3 text-left">
                    <div className="h-4 w-3/4 bg-brand-100 rounded mb-2"></div>
                    <div className="h-3 w-full bg-gray-100 rounded mb-2"></div>
                    <div className="h-3 w-5/6 bg-gray-100 rounded mb-2"></div>
                    <div className="h-3 w-4/6 bg-gray-100 rounded"></div>
                    <div className="mt-4 h-5 w-1/4 bg-brand-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </section>
  );
};

export default HeroSection;
