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
    <section className="py-10 md:py-16 bg-muted/20">
      <div className="container max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-800 dark:text-brand-100 text-center mb-10 animate-fade-in">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {/* Add fade-in & hover micro-interaction to each card */}
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="group bg-white dark:bg-gray-900/80 rounded-lg p-6 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <span className="inline-flex items-center justify-center rounded-full bg-brand-100 dark:bg-brand-700 mb-3 p-3 shadow hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-brand-500" />
              </span>
              <h3 className="font-semibold text-lg text-brand-800 dark:text-brand-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
