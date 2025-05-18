
import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Info, Mail, MailPlus } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer 
      className="py-12 border-t border-border bg-background" 
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <Link 
              to="/" 
              className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
              aria-label="Go to homepage"
            >
              <div 
                className="w-8 h-8 rounded-md bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-base" 
                aria-hidden="true"
              >
                D
              </div>
              <span className="font-bold text-lg text-foreground">DevAI</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">Secure & privacy-focused platform.</p>
            <div className="flex items-center gap-4 mt-3">
              <a 
                href="https://github.com" 
                className="text-muted-foreground hover:text-brand-500 dark:hover:text-brand-400 transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 rounded-full"
                aria-label="Visit our GitHub"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-muted-foreground hover:text-brand-500 dark:hover:text-brand-400 transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 rounded-full"
                aria-label="Visit our LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="https://twitter.com" 
                className="text-muted-foreground hover:text-brand-500 dark:hover:text-brand-400 transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 rounded-full"
                aria-label="Visit our Twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            <div>
              <h3 className="font-medium text-foreground mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/about" 
                    className="text-muted-foreground hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:text-brand-500 focus-visible:underline"
                  >
                    <Info className="h-3.5 w-3.5" aria-hidden="true" />
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-muted-foreground hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:text-brand-500 focus-visible:underline"
                  >
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/newsletter" 
                    className="text-muted-foreground hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:text-brand-500 focus-visible:underline"
                  >
                    <MailPlus className="h-3.5 w-3.5" aria-hidden="true" />
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-foreground mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/faq" 
                    className="text-muted-foreground hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors focus:outline-none focus-visible:text-brand-500 focus-visible:underline"
                  >
                    FAQ / Help
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms" 
                    className="text-muted-foreground hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors focus:outline-none focus-visible:text-brand-500 focus-visible:underline"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/privacy" 
                    className="text-muted-foreground hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors focus:outline-none focus-visible:text-brand-500 focus-visible:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-medium text-foreground mb-3">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/faq" 
                    className="text-muted-foreground hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors focus:outline-none focus-visible:text-brand-500 focus-visible:underline"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/accessibility" 
                    className="text-muted-foreground hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors focus:outline-none focus-visible:text-brand-500 focus-visible:underline"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} DevAI Companion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
