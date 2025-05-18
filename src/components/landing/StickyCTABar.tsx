
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import GetStartedModal from "./GetStartedModal";

const StickyCTABar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // In a real app, this would come from your auth provider
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check login status from localStorage
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div 
        className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg p-3 md:hidden z-40 animate-fade-up"
        role="complementary"
        aria-label="Call to action"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="font-medium text-brand-700 dark:text-brand-300">🚀 Ready to start?</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={scrollToTop} 
              variant="outline"
              size="sm"
              className="h-10 w-10 rounded-full p-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
            
            {isLoggedIn ? (
              <Button 
                className="rounded-full bg-brand-500 hover:bg-brand-600 text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={() => window.location.href = "/dashboard"}
                aria-label="Go to dashboard"
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                className="rounded-full bg-brand-500 hover:bg-brand-600 text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                onClick={() => setModalOpen(true)}
                aria-label="Get started with our app"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Get Started Modal */}
      <GetStartedModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default StickyCTABar;
