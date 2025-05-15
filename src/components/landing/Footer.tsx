
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-gray-200">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">Made by developers, for developers</p>
          <p className="text-gray-500 text-sm">
            🔒 Secure · Powered by GPT-4 · Built with MUI · RTL & LTR Support
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
