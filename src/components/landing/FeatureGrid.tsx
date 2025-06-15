
import React from 'react';
import FeatureCard from './FeatureCard';
import { Mic, Brain, TrendingUp, Users, Target, Clock } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: "Voice-Powered Practice",
    description: "Engage in realistic sales conversations with AI-powered client simulations that respond naturally to your pitch."
  },
  {
    icon: Brain,
    title: "Smart Feedback Engine",
    description: "Get instant analysis of your tone, pace, persuasion techniques, and conversation flow with actionable improvement suggestions."
  },
  {
    icon: Users,
    title: "Diverse Client Personalities",
    description: "Practice with different client types - from friendly prospects to skeptical decision-makers and busy executives."
  },
  {
    icon: Target,
    title: "Scenario-Based Training",
    description: "Master discovery calls, product pitches, objection handling, and follow-up conversations in realistic business contexts."
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed analytics, skill progression reports, and personalized learning paths."
  },
  {
    icon: Clock,
    title: "Flexible Practice Sessions",
    description: "Train on your schedule with sessions ranging from 5-minute quick practices to full 30-minute mock sales calls."
  }
];

const FeatureGrid: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            id="features-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Why VoiceSeller Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your sales skills with AI-powered voice training designed for real-world success
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
