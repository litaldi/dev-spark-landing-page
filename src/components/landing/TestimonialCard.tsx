
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialCard: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Card className="border-brand-200 shadow-md bg-white">
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col items-center text-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-brand-400 mb-6"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
                <p className="text-xl md:text-2xl font-medium mb-6 text-brand-800">
                  "I landed my first frontend job in 6 weeks thanks to this app. I finally felt ready."
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mr-3">
                    <span className="text-brand-600 font-bold text-xl">D</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Dana</p>
                    <p className="text-sm text-gray-500">Junior Developer, Tel Aviv</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCard;
