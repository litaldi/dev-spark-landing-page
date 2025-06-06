
import { MessageSquare, Award, BarChart3, Sparkles } from 'lucide-react';

export interface OnboardingStepData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  illustration?: React.ReactNode;
  targetSelector?: string;
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
  benefits: string[];
}

export const onboardingSteps: OnboardingStepData[] = [
  {
    id: 'welcome',
    title: 'Welcome to Your Learning Journey!',
    description: 'You\'re about to unlock personalized AI-powered programming education.',
    icon: Sparkles,
    position: 'center',
    benefits: ['Personalized learning paths', 'Real-time AI assistance', 'Track your progress']
  },
  {
    id: 'ai-assistant',
    title: 'Meet Your AI Study Companion',
    description: 'Get instant help, code reviews, and learning suggestions tailored just for you.',
    icon: MessageSquare,
    targetSelector: '[aria-label="Open AI Study Assistant"]',
    position: 'left',
    benefits: ['24/7 AI assistance', 'Code review & feedback', 'Personalized suggestions']
  },
  {
    id: 'progress',
    title: 'Track Your Growth',
    description: 'Watch your skills develop with detailed progress tracking and insights.',
    icon: BarChart3,
    position: 'center',
    benefits: ['Visual progress tracking', 'Skill development insights', 'Learning analytics']
  },
  {
    id: 'achievements',
    title: 'Earn & Celebrate',
    description: 'Complete challenges, earn badges, and maintain your learning streak.',
    icon: Award,
    position: 'center',
    benefits: ['Achievement badges', 'Learning streaks', 'Milestone celebrations']
  }
];
