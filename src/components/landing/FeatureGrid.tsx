
import React from "react";
import FeatureCard from "./FeatureCard";
import { Activity, Award, Headphones, MessageSquare, LayoutDashboard, Github } from "lucide-react";

const FeatureGrid: React.FC = () => {
  const features = [
    {
      title: "Daily coding practice with GPT feedback",
      icon: Activity,
      description: "Practice with AI-generated challenges tailored to your skill level."
    },
    {
      title: "Smart resume builder with AI polish",
      icon: Award,
      description: "Create a standout resume with AI-powered suggestions and formatting."
    },
    {
      title: "Interview simulator with real-time tips",
      icon: Headphones,
      description: "Practice technical interviews and receive feedback to improve."
    },
    {
      title: "Mentor feedback on code and resumes",
      icon: MessageSquare,
      description: "Get personalized advice from industry professionals."
    },
    {
      title: "Personal dashboard and career tracker",
      icon: LayoutDashboard,
      description: "Track your progress and set goals for your development journey."
    },
    {
      title: "GitHub + LinkedIn analyzer",
      icon: Github,
      description: "Get insights on how to improve your online professional presence."
    },
  ];

  return (
    <section className="py-16 md:py-24 relative" aria-labelledby="features-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50/30 to-white opacity-70 pointer-events-none"></div>
      <div className="container relative z-10">
        <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-800">
          Features to <span className="text-brand-500">Boost Your Career</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="animate-fade-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard 
                title={feature.title} 
                icon={feature.icon} 
                description={feature.description} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
