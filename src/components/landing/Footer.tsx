
import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-gray-200 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">Made by developers, for developers</p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            🔒 Secure · Powered by GPT-4 · Built with Tailwind & ShadCn · RTL & LTR Support
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          <p>© 2025 DevAI Companion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
