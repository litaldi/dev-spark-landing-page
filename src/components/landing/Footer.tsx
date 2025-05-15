
import React, { useState } from "react";
import { Github, Linkedin, Twitter, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/auth/LoginModal";

const Footer: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };
  
  const handleGoogleSignIn = () => {
    console.log("Signing in with Google");
    // This would be replaced with actual Google sign-in logic
  };

  return (
    <footer className="py-8 border-t border-gray-200 bg-white" role="contentinfo">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">Made by developers, for developers</p>
            <div className="flex items-center gap-4 mt-2">
              <a 
                href="https://github.com" 
                className="text-gray-400 hover:text-brand-500 transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-brand-300 rounded-full"
                aria-label="GitHub"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-gray-400 hover:text-brand-500 transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-brand-300 rounded-full"
                aria-label="LinkedIn"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="https://twitter.com" 
                className="text-gray-400 hover:text-brand-500 transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-brand-300 rounded-full"
                aria-label="Twitter"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="text-gray-500 text-sm mb-2">
              🔒 Secure · Powered by GPT-4 · Built with Tailwind & ShadCn · RTL & LTR Support
            </p>
            <div className="flex gap-2 mt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-brand-500"
                onClick={openLoginModal}
              >
                <LogIn className="h-4 w-4 mr-1" />
                Sign in
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-600 border-gray-300 hover:border-brand-300 hover:text-brand-600"
                onClick={handleGoogleSignIn}
              >
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} DevAI Companion. All rights reserved.</p>
        </div>
      </div>
      
      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </footer>
  );
};

export default Footer;
