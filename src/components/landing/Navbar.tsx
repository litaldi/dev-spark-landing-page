
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  // In a real app, this would come from your auth provider
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Demo only: simulate fetching user data
    if (isLoggedIn && !userName) {
      setUserName("Lital");
    }
  }, [isLoggedIn, userName]);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    // This would be replaced with actual logout logic
    setIsLoggedIn(false);
    setUserName(null);
  };

  // For demo purposes only - toggle login state
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header 
      className={`py-4 border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/80 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-xl" aria-hidden="true">D</div>
            <span className="font-bold text-xl text-brand-800">DevAI</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            <a href="#features" className="text-gray-600 hover:text-brand-500 transition-colors relative group focus:outline-none focus:ring-2 focus:ring-brand-300 rounded-sm px-1">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-400 group-hover:w-full group-focus:w-full transition-all duration-300" aria-hidden="true"></span>
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-brand-500 transition-colors relative group focus:outline-none focus:ring-2 focus:ring-brand-300 rounded-sm px-1">
              Testimonials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-400 group-hover:w-full group-focus:w-full transition-all duration-300" aria-hidden="true"></span>
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-brand-500 transition-colors relative group focus:outline-none focus:ring-2 focus:ring-brand-300 rounded-sm px-1">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-400 group-hover:w-full group-focus:w-full transition-all duration-300" aria-hidden="true"></span>
            </a>
            <a href="#faq" className="text-gray-600 hover:text-brand-500 transition-colors relative group focus:outline-none focus:ring-2 focus:ring-brand-300 rounded-sm px-1">
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-400 group-hover:w-full group-focus:w-full transition-all duration-300" aria-hidden="true"></span>
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <div className="hidden md:block">
                  <p className="text-brand-700 font-medium">Hi {userName} 👋</p>
                </div>
                <Button 
                  className="hidden md:inline-flex bg-brand-500 hover:bg-brand-600 text-white transition-all duration-300"
                  onClick={() => console.log("Navigate to dashboard")}
                >
                  Go to Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  className="hidden md:inline-flex text-brand-600 hover:bg-brand-50 transition-all"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="hidden md:inline-flex text-brand-600 hover:bg-brand-50 transition-all"
                  onClick={openLoginModal}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Log in
                </Button>
                <Button 
                  className="bg-brand-500 hover:bg-brand-600 text-white transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    // For demo purposes - toggle login state
                    toggleLoginState();
                  }}
                >
                  {isLoggedIn ? "Account" : "Sign up"}
                </Button>
                <Button 
                  variant="outline"
                  className="hidden md:inline-flex border-brand-300 hover:bg-brand-50"
                  onClick={() => handleLogin("Google")}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign in with Google
                </Button>
              </>
            )}
            
            <button 
              className="md:hidden text-gray-600" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100" id="mobile-menu" role="navigation" aria-label="Mobile navigation">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-gray-600 hover:text-brand-500 transition-colors px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-300 rounded-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-600 hover:text-brand-500 transition-colors px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-300 rounded-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#pricing" 
                className="text-gray-600 hover:text-brand-500 transition-colors px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-300 rounded-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#faq" 
                className="text-gray-600 hover:text-brand-500 transition-colors px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-300 rounded-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              {isLoggedIn ? (
                <>
                  <div className="px-2 py-1">
                    <p className="text-brand-700 font-medium">Hi {userName} 👋</p>
                  </div>
                  <Button 
                    className="justify-start text-white bg-brand-500 hover:bg-brand-600 w-full"
                    onClick={() => console.log("Navigate to dashboard")}
                  >
                    Go to Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-brand-600 hover:bg-brand-50 w-full"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-brand-600 hover:bg-brand-50 w-full"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openLoginModal();
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Log in
                  </Button>
                  <Button 
                    className="justify-start w-full"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      const handleLogin = (provider: string) => {
                        console.log(`Logging in with ${provider}`);
                        toggleLoginState();
                      };
                      handleLogin("Google");
                    }}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Sign in with Google
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
      
      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </header>
  );
};

const handleLogin = (provider: string) => {
  console.log(`Logging in with ${provider}`);
  // This would be replaced with actual auth logic
};

export default Navbar;
