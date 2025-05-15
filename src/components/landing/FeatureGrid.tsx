
import React from "react";
import FeatureCard from "./FeatureCard";
import { Activity, Award, Headphones, MessageSquare, LayoutDashboard, Github } from "lucide-react";

const FeatureGrid: React.FC = () => {
  const features = [
    {
      title: "Daily coding practice with GPT feedback",
      icon: Activity,
    },
    {
      title: "Smart resume builder with AI polish",
      icon: Award,
    },
    {
      title: "Interview simulator with real-time tips",
      icon: Headphones,
    },
    {
      title: "Mentor feedback on code and resumes",
      icon: MessageSquare,
    },
    {
      title: "Personal dashboard and career tracker",
      icon: LayoutDashboard,
    },
    {
      title: "GitHub + LinkedIn analyzer",
      icon: Github,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-800">
          Features to <span className="text-brand-500">Boost Your Career</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <FeatureCard title={feature.title} icon={feature.icon} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
