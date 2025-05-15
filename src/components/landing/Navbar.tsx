
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header 
      className={`py-4 border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-xl">D</div>
            <span className="font-bold text-xl text-brand-800">DevAI</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-brand-500 transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-brand-500 transition-colors relative group">
              Testimonials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-brand-500 transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="hidden md:inline-flex text-brand-600 hover:bg-brand-50 transition-all"
            >
              Log in
            </Button>
            <Button className="bg-brand-500 hover:bg-brand-600 text-white transition-all duration-300 hover:scale-105">
              Sign up
            </Button>
            
            <button 
              className="md:hidden text-gray-600" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-gray-600 hover:text-brand-500 transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-600 hover:text-brand-500 transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#pricing" 
                className="text-gray-600 hover:text-brand-500 transition-colors px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Button 
                variant="ghost" 
                className="justify-start text-brand-600 hover:bg-brand-50 w-full"
              >
                Log in
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
