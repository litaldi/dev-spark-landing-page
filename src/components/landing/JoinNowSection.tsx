
import React from "react";
import { Button } from "@/components/ui/button";

const JoinNowSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-100/50 to-brand-50/70"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-800">
              Start Your <span className="text-brand-500">Journey Today</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8 md:mb-10">
              Join hundreds of juniors already building skills and confidence with our AI-powered platform.
            </p>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-10 shadow-lg border border-brand-100">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 relative overflow-hidden group"
                >
                  <span className="relative z-10">Try Free Practice</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full border-brand-500 text-brand-600 hover:bg-brand-50 px-8 py-6 relative overflow-hidden group"
                >
                  <span className="relative z-10">Join Beta Program</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-brand-100/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-brand-600 font-medium">
                  <span className="inline-block bg-brand-100/50 px-3 py-1 rounded-full">
                    Limited spots available: 94% full
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinNowSection;
