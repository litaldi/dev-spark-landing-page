
import React from "react";
import { Button } from "@/components/ui/consolidated-button";

const JoinNowSection: React.FC = () => {
  return (
    <section className="py-16 text-center bg-brand-100/40 dark:bg-brand-900/40">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-800 dark:text-brand-100 mb-4">
          Ready to <span className="text-brand-500 dark:text-brand-400">transform</span> your programming journey?
        </h2>
        <p className="max-w-xl mx-auto text-lg text-gray-700 dark:text-gray-200 mb-8">
          Sign up today and unlock access to personalized learning, community support, and cutting-edge tools!
        </p>
        <Button variant="cta" size="lg">
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default JoinNowSection;
