
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, GraduationCap, LineChart } from "lucide-react";

const WhyItWorks: React.FC = () => {
  const reasons = [
    {
      icon: <BrainCircuit className="h-10 w-10 text-brand-500" />,
      title: "No more guesswork",
      description: "We guide your growth step by step with a personalized learning path"
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-brand-500" />,
      title: "Built with AI + real mentors",
      description: "Combine the power of AI with insights from industry professionals"
    },
    {
      icon: <LineChart className="h-10 w-10 text-brand-500" />,
      title: "Learn what actually gets you hired",
      description: "Focus on the skills and projects that employers are looking for today"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-50" aria-labelledby="why-it-works-title">
      <div className="container">
        <h2 
          id="why-it-works-title" 
          className="text-3xl md:text-4xl font-bold text-center text-brand-800 mb-12"
        >
          Why It <span className="text-brand-500">Works</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card 
              key={index} 
              className="border-brand-100 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="mb-4 bg-brand-50 p-4 rounded-full">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold text-brand-800 mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyItWorks;
