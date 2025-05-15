
import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-brand-50 to-white">
      <div className="container px-4 max-w-6xl mx-auto text-center">
        <div className="animate-fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-800 mb-4 md:mb-6 leading-tight">
            Your First Dev Job <span className="text-brand-500">Starts Here</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 md:mb-10 max-w-3xl mx-auto">
            Practice code, build your resume, and get interview-ready — all powered by AI.
          </p>
          <Button size="lg" className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 text-lg">
            Get Started for Free
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required · RTL Ready · Built for juniors
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
