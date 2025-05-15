
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

  const handleGoogleSignIn = () => {
    console.log("Signing in with Google");
    // This would be replaced with actual Google sign-in logic
    toggleLoginState();
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
              <>
                <Button 
                  className="rounded-full bg-white border border-brand-300 hover:bg-brand-50 text-brand-700 flex items-center"
                  onClick={handleGoogleSignIn}
                >
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign in
                </Button>
                <Button 
                  className="rounded-full bg-brand-500 hover:bg-brand-600 text-white"
                  onClick={openLoginModal}
                >
                  Join Free
                </Button>
              </>
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
