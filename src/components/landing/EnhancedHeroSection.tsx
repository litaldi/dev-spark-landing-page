
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const EnhancedHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
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
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div 
            className="absolute top-10 left-10 w-40 h-40 rounded-full bg-brand-300 dark:bg-brand-400 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-brand-400 dark:bg-brand-500 blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-brand-200 dark:bg-brand-600 blur-2xl"
            animate={{ 
              rotate: [0, 360],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>
      </div>
      
      <div className="container px-4 sm:px-6 max-w-6xl mx-auto relative">
        <motion.div 
          className="text-center max-w-3xl mx-auto z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 px-4 py-2 rounded-full text-sm text-brand-700 dark:text-brand-300 mb-6 border border-brand-200 dark:border-brand-700"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Learning Platform</span>
          </motion.div>

          <motion.h1 
            id="hero-heading" 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-brand-800 dark:text-white mb-3 sm:mb-4 md:mb-5 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Your First Dev Job{" "}
            <motion.span 
              className="text-brand-500 dark:text-brand-400"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              Starts Here
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Practice code, build your resume, and get interview-ready — all powered by AI.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {isLoggedIn ? (
              <Button 
                size="lg" 
                className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-sm sm:text-base transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg group"
                onClick={handleDashboard}
                aria-label="Navigate to your dashboard"
              >
                Go to Dashboard
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button 
                size="lg" 
                className={`rounded-full bg-brand-500 hover:bg-brand-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-sm sm:text-base transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg group ${isMobile ? 'w-full' : ''}`}
                onClick={handleGetStarted}
                aria-label="Sign up for an account"
              >
                Get Started for Free
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </motion.div>
          
          <motion.p 
            className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            No credit card required · Start for free
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
