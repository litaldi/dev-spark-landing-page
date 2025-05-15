
import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer: React.FC = () => {
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
          <p className="text-gray-500 text-sm">
            🔒 Secure · Powered by GPT-4 · Built with Tailwind & ShadCn · RTL & LTR Support
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} DevAI Companion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
