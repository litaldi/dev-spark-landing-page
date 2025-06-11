
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Code, Zap } from "lucide-react";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatingIconVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-brand-100 via-brand-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden" 
      aria-labelledby="hero-heading"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10" aria-hidden="true">
        <motion.div 
          className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-brand-300 to-brand-400 dark:from-brand-400 dark:to-brand-500 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-gradient-to-r from-brand-400 to-brand-500 dark:from-brand-500 dark:to-brand-600 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Floating Code Icons */}
        <motion.div 
          className="absolute top-1/4 right-1/4 opacity-30"
          variants={floatingIconVariants}
          animate="animate"
        >
          <Code className="w-8 h-8 text-brand-500" />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-1/4 opacity-30"
          variants={floatingIconVariants}
          animate="animate"
          transition={{ delay: 1 }}
        >
          <Zap className="w-6 h-6 text-brand-600" />
        </motion.div>
      </div>
      
      <div className="container px-4 sm:px-6 max-w-6xl mx-auto relative">
        <motion.div 
          className="text-center max-w-4xl mx-auto z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-brand-100/80 dark:bg-brand-900/40 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-brand-700 dark:text-brand-300 mb-6 border border-brand-200/50 dark:border-brand-700/50 shadow-sm"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
            <span className="font-medium">AI-Powered Learning Platform</span>
          </motion.div>

          <motion.h1 
            id="hero-heading" 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-brand-800 dark:text-white mb-4 sm:mb-5 md:mb-6 leading-tight tracking-tight"
            variants={itemVariants}
          >
            Your First Dev Job{" "}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600 dark:from-brand-400 dark:to-brand-500"
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
            className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-7 md:mb-8 max-w-3xl mx-auto leading-relaxed font-medium"
            variants={itemVariants}
          >
            Practice code, build your resume, and get interview-ready — all powered by{" "}
            <span className="text-brand-600 dark:text-brand-400 font-semibold">cutting-edge AI</span>.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8"
            variants={itemVariants}
          >
            {isLoggedIn ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="rounded-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  onClick={handleDashboard}
                  aria-label="Navigate to your dashboard"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={isMobile ? 'w-full' : ''}
              >
                <Button 
                  size="lg" 
                  className={`rounded-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group ${isMobile ? 'w-full' : ''}`}
                  onClick={handleGetStarted}
                  aria-label="Sign up for an account"
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={isMobile ? 'w-full' : ''}
            >
              <Button 
                variant="outline"
                size="lg" 
                className={`rounded-full border-2 border-brand-300 dark:border-brand-600 text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-semibold backdrop-blur-sm transition-all duration-300 ${isMobile ? 'w-full' : ''}`}
                onClick={() => navigate("/about")}
                aria-label="Learn more about DevAI"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-6 sm:mt-8 space-y-2"
            variants={itemVariants}
          >
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              ✨ No credit card required • 🚀 Start learning in 30 seconds
            </p>
            <motion.div 
              className="flex justify-center items-center gap-6 text-xs sm:text-sm text-gray-400 dark:text-gray-500"
              variants={itemVariants}
            >
              <span className="flex items-center gap-1">
                ⭐ <strong className="text-brand-600 dark:text-brand-400">4.9/5</strong> rating
              </span>
              <span className="flex items-center gap-1">
                👥 <strong className="text-brand-600 dark:text-brand-400">10k+</strong> developers
              </span>
              <span className="flex items-center gap-1">
                🎯 <strong className="text-brand-600 dark:text-brand-400">95%</strong> job success
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
