
import React from "react";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <header className="py-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-xl">D</div>
            <span className="font-bold text-xl text-brand-800">DevAI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-brand-500 transition-colors">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-brand-500 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-gray-600 hover:text-brand-500 transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex text-brand-600 hover:bg-brand-50">Log in</Button>
            <Button className="bg-brand-500 hover:bg-brand-600 text-white">Sign up</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
