
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, X, Sparkles } from "lucide-react";
import { GetStartedModal } from "./GetStartedModal";
import { cn } from "@/lib/utils";

const StickyCTABar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  // In a real app, this would come from your auth provider
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px and not dismissed
      const shouldShow = window.scrollY > 300 && !isDismissed;
      if (shouldShow !== isVisible) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
      }
      setIsVisible(shouldShow);
    };

    // Check login status from localStorage
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");

    // Check if user previously dismissed the bar
    const dismissed = localStorage.getItem("ctaBarDismissed");
    setIsDismissed(dismissed === "true");

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDismissed, isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem("ctaBarDismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <>
      <div 
        className={cn(
          "fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border shadow-lg p-3 z-40 transition-all duration-300",
          isAnimating ? "animate-scale-in" : "animate-fade-up"
        )}
        role="complementary"
        aria-label="Call to action"
      >
        <div className="container mx-auto flex items-center justify-between px-4 max-w-6xl">
          <div className="hidden sm:flex items-center gap-2 flex-1">
            <Sparkles className="h-5 w-5 text-brand-500" aria-hidden="true" />
            <p className="font-medium text-brand-700 dark:text-brand-300">
              Ready to accelerate your learning?
            </p>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <Button 
              onClick={scrollToTop} 
              variant="outline"
              size="sm"
              className="h-10 w-10 rounded-full p-0 hover:bg-brand-50 dark:hover:bg-brand-950 transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              aria-label="Scroll back to top of page"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Back to top</span>
            </Button>
            
            {isLoggedIn ? (
              <Button 
                className="rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-md hover:shadow-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
                onClick={() => window.location.href = "/dashboard"}
                aria-label="Navigate to your dashboard"
              >
                Go to Dashboard
              </Button>
            ) : (
              <Button 
                className="rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-md hover:shadow-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
                onClick={() => setModalOpen(true)}
                aria-label="Get started with our learning platform"
              >
                Get Started Free
              </Button>
            )}
            
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-full p-0 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              aria-label="Dismiss this call to action bar"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Get Started Modal */}
      <GetStartedModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default StickyCTABar;
