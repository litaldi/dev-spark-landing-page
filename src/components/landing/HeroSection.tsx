
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import DemoModal from "./DemoModal";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // In a real app, this would come from your auth provider
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const [demoOpen, setDemoOpen] = React.useState(false);

  const handleGetStarted = () => {
    navigate("/practice");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <section 
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-brand-100 via-brand-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden" 
      aria-labelledby="hero-heading"
    >
      {/* Animate decorative elements */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-12 left-12 w-44 h-44 rounded-full bg-brand-300 dark:bg-brand-400 blur-3xl animate-pulse opacity-20" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-brand-400 dark:bg-brand-600 blur-3xl animate-spin-slow opacity-30" style={{ animationDuration: "18s" }} />
      </div>
      
      <div className="container px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto animate-fade-in space-y-6">
          <h1 
            id="hero-heading" 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-brand-800 dark:text-white mb-3 sm:mb-4 md:mb-5 leading-tight tracking-tight"
          >
            Master Sales with <span className="text-brand-500 dark:text-brand-400">AI Voice Training</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
            Practice real sales conversations with AI-powered client simulations. Get instant feedback and build confidence through personalized coaching.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 animate-fade-in">
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
              <>
                <Button 
                  size="lg" 
                  className={`rounded-full bg-brand-500 hover:bg-brand-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-sm sm:text-base transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg ${isMobile ? "w-full" : ""}`}
                  onClick={handleGetStarted}
                  aria-label="Start practicing sales conversations"
                >
                  <Mic className="mr-2 h-4 w-4" />
                  Start Practice Session
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`rounded-full border-brand-200 bg-white/70 dark:bg-gray-900/50 text-brand-600 hover:bg-brand-100 dark:hover:bg-brand-800 transition-shadow duration-200 ${isMobile ? "w-full" : ""}`}
                  onClick={() => setDemoOpen(true)}
                  aria-label="Watch a product demo"
                  type="button"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Demo
                </Button>
              </>
            )}
          </div>
          
          <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
          
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            No credit card required · Start practicing immediately
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
