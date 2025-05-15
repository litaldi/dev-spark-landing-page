
import React from "react";
import { Button } from "@/components/ui/button";

const JoinNowSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-50">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-800">
            Start Your <span className="text-brand-500">Journey Today</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 md:mb-10">
            Join hundreds of juniors already building skills and confidence with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-8">
              Try Free Practice
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-brand-500 text-brand-600 hover:bg-brand-50 px-8">
              Join Beta Program
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinNowSection;
