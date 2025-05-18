
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Info, Mail, MailPlus } from "lucide-react";
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

  return (
    <footer 
      className="py-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900" 
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity">
              <div 
                className="w-8 h-8 rounded-md bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-base" 
                aria-hidden="true"
              >
                D
              </div>
              <span className="font-bold text-lg text-brand-800 dark:text-white">DevAI</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-xs">Secure & privacy-focused platform.</p>
            <div className="flex items-center gap-4 mt-3">
              <a 
                href="https://github.com" 
                className="text-gray-400 dark:text-gray-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 rounded-full"
                aria-label="GitHub"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-gray-400 dark:text-gray-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 rounded-full"
                aria-label="LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="https://twitter.com" 
                className="text-gray-400 dark:text-gray-500 hover:text-brand-500 dark:hover:text-brand-400 transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 rounded-full"
                aria-label="Twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/about" 
                    className="text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors flex items-center gap-1.5"
                  >
                    <Info className="h-3.5 w-3.5" aria-hidden="true" />
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/newsletter" 
                    className="text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors flex items-center gap-1.5"
                  >
                    <MailPlus className="h-3.5 w-3.5" aria-hidden="true" />
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/faq" 
                    className="text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors"
                  >
                    FAQ / Help
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms" 
                    className="text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/privacy" 
                    className="text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Get Started</h3>
              <div className="flex flex-col space-y-2">
                <Button 
                  className="bg-brand-500 hover:bg-brand-600 text-white"
                  size="sm"
                  asChild
                >
                  <Link to="/auth/register">Create account</Link>
                </Button>
                <Link 
                  to="/dashboard"
                  className="text-gray-500 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors"
                >
                  Visit Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-400 dark:text-gray-500">
          <p>© {new Date().getFullYear()} DevAI Companion. All rights reserved.</p>
        </div>
      </div>
      
      {/* Login Modal (kept for compatibility with other components) */}
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </footer>
  );
};

export default Footer;
