
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

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    // This would be replaced with actual logout logic
    setIsLoggedIn(false);
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
                <Button 
                  className="hidden md:inline-flex bg-brand-500 hover:bg-brand-600 text-white transition-all duration-300"
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
                  <Button 
                    className="justify-start text-white bg-brand-500 hover:bg-brand-600 w-full"
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

export default Navbar;
