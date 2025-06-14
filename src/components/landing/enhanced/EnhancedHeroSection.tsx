
import React from "react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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

  const handleWatchDemo = () => {
    // In a real app, this would open a demo video
    console.log("Watch demo clicked");
  };

  return (
    <section 
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden" 
      aria-labelledby="hero-heading"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-brand-100/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-brand-300 dark:bg-brand-400 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-brand-400 dark:bg-brand-500 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-brand-200 to-transparent opacity-20 blur-3xl animate-spin" style={{ animationDuration: '20s' }} />
      </div>
      
      <div className="container px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Learning Platform</span>
          </div>
          
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 
              id="hero-heading" 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-brand-800 dark:text-white leading-tight tracking-tight"
            >
              Your First Dev Job{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600 dark:from-brand-400 dark:to-brand-500">
                Starts Here
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Practice code, build your resume, and get interview-ready — all powered by AI that adapts to your learning style.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-4">
            {isLoggedIn ? (
              <EnhancedButton 
                size="lg" 
                variant="gradient"
                onClick={handleDashboard}
                className={cn("group", isMobile && "w-full")}
                aria-label="Navigate to your dashboard"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </EnhancedButton>
            ) : (
              <>
                <EnhancedButton 
                  size="lg" 
                  variant="gradient"
                  onClick={handleGetStarted}
                  className={cn("group shadow-xl", isMobile && "w-full")}
                  aria-label="Sign up for an account"
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </EnhancedButton>
                
                <EnhancedButton 
                  size="lg" 
                  variant="outline"
                  onClick={handleWatchDemo}
                  className={cn("group", isMobile && "w-full")}
                  aria-label="Watch product demo"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </EnhancedButton>
              </>
            )}
          </div>
          
          {/* Trust Indicators */}
          <div className="pt-8 space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No credit card required · Start for free · Join 10,000+ developers
            </p>
            
            {/* Social Proof */}
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-400 to-brand-500 border-2 border-white dark:border-gray-800" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-3">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
