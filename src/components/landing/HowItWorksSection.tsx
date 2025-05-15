
import React from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      title: "Sign up",
      description: "Create a free account to track your progress and get personalized recommendations.",
      icon: "✍️"
    },
    {
      title: "Choose your path",
      description: "Select from frontend, backend, or full-stack development paths based on your goals.",
      icon: "🧭"
    },
    {
      title: "Practice with AI",
      description: "Get real-time feedback as you code and solve realistic coding challenges.",
      icon: "🤖"
    },
    {
      title: "Track progress",
      description: "Monitor your skills growth and identify areas for improvement.",
      icon: "📈"
    },
    {
      title: "Get hired",
      description: "Build your portfolio, prepare for interviews, and land your first dev role.",
      icon: "🎉"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-50/50" aria-labelledby="how-it-works-heading">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-up">
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold mb-4 text-brand-800">
            How It <span className="text-brand-500">Works</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our step-by-step approach helps you build skills and confidence on your journey to becoming a professional developer.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4">
          {steps.map((step, index) => (
            <Card key={index} className="border border-brand-100 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-300 to-brand-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <CardHeader className="pt-6 pb-2">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                </div>
                <CardTitle className="text-center text-lg font-bold text-brand-700">
                  {step.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-center text-gray-600">
                  {step.description}
                </CardDescription>
              </CardContent>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-brand-300 text-2xl">
                  →
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
