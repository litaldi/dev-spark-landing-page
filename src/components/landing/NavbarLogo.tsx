
import React from "react";
import { Link } from "react-router-dom";

const NavbarLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div 
        className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-xl" 
        aria-hidden="true"
      >
        D
      </div>
      <span className="font-bold text-xl text-brand-800 dark:text-white">DevAI</span>
    </Link>
  );
};

export default NavbarLogo;
