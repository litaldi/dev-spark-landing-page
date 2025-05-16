
import React from "react";
import FeatureCard from "./FeatureCard";
import { Activity, Award, Headphones, MessageSquare, LayoutDashboard, Github } from "lucide-react";

const FeatureGrid: React.FC = () => {
  const features = [
    {
      id: "feature-daily-practice",
      title: "Daily coding practice with GPT feedback",
      icon: Activity,
      description: "Practice with AI-generated challenges tailored to your skill level."
    },
    {
      id: "feature-resume-builder",
      title: "Smart resume builder with AI polish",
      icon: Award,
      description: "Create a standout resume with AI-powered suggestions and formatting."
    },
    {
      id: "feature-interview-simulator",
      title: "Interview simulator with real-time tips",
      icon: Headphones,
      description: "Practice technical interviews and receive feedback to improve."
    },
    {
      id: "feature-mentor-feedback",
      title: "Mentor feedback on code and resumes",
      icon: MessageSquare,
      description: "Get personalized advice from industry professionals."
    },
    {
      id: "feature-dashboard",
      title: "Personal dashboard and career tracker",
      icon: LayoutDashboard,
      description: "Track your progress and set goals for your development journey."
    },
    {
      id: "feature-github-analyzer",
      title: "GitHub + LinkedIn analyzer",
      icon: Github,
      description: "Get insights on how to improve your online professional presence."
    },
  ];

  return (
    <section className="py-16 md:py-24 relative bg-white dark:bg-gray-900" aria-labelledby="features-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50/30 to-white dark:from-gray-900 dark:via-brand-900/10 dark:to-gray-900 opacity-70 pointer-events-none"></div>
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold mb-4 text-brand-800 dark:text-brand-100">
            Features to <span className="text-brand-500 dark:text-brand-400">Boost Your Career</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Tools and resources designed to help you stand out in the job market
          </p>
        </div>
        
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="region"
          aria-labelledby="features-heading"
        >
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className="animate-fade-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard 
                id={feature.id}
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
