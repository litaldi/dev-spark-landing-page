
import React from "react";
import { CheckCircle } from "lucide-react";

const ForWhomSection: React.FC = () => {
  const audiences = [
    "Bootcamp graduates looking for structure",
    "Final-year students preparing for interviews",
    "Self-taught devs building their first portfolio",
    "Freelancers aiming to go full-time",
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-brand-50/80 to-brand-100/40" aria-labelledby="audience-heading">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="audience-heading" className="text-3xl md:text-4xl font-bold mb-10 text-brand-800">
            Built for future developers <span className="text-brand-500">like you</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audiences.map((audience, index) => (
              <div 
                key={index} 
                className="flex items-center bg-white p-6 rounded-lg shadow-sm border border-brand-100 hover:border-brand-300 transition-all duration-300 group transform hover:-translate-y-1 animate-fade-up focus-within:ring-2 focus-within:ring-brand-400 focus-within:ring-offset-2"
                style={{ animationDelay: `${index * 0.1}s` }}
                tabIndex={0}
              >
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-brand-200 transition-colors" aria-hidden="true">
                  <CheckCircle className="text-brand-600 w-5 h-5" />
                </div>
                <p className="text-lg text-gray-700 text-left">{audience}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhomSection;
