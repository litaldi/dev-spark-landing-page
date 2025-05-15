
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, LogIn } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";

const StickyCTABar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
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

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-100 shadow-lg p-3 md:hidden z-40 animate-fade-up"
        role="complementary"
        aria-label="Call to action"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="font-medium text-brand-700">🚀 Ready to start?</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={scrollToTop} 
              variant="outline"
              size="sm"
              className="h-10 w-10 rounded-full p-0"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
            
            {isLoggedIn ? (
              <Button 
                className="rounded-full bg-brand-500 hover:bg-brand-600 text-white"
                onClick={toggleLoginState}
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                className="rounded-full bg-brand-500 hover:bg-brand-600 text-white"
                onClick={isLoggedIn ? toggleLoginState : openLoginModal}
              >
                {isLoggedIn ? "Dashboard" : "Join Free"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default StickyCTABar;
