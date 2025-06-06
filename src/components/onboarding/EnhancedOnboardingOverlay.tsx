
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ArrowRight, ArrowLeft, Lightbulb, MessageSquare, Award, BarChart3, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  illustration?: React.ReactNode;
  targetSelector?: string;
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
  benefits: string[];
}

const onboardingSteps: OnboardingStep[] = [
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

interface EnhancedOnboardingOverlayProps {
  onComplete: () => void;
}

export const EnhancedOnboardingOverlay = ({ onComplete }: EnhancedOnboardingOverlayProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useLocalStorage('onboarding-completed', false);

  useEffect(() => {
    if (hasCompletedOnboarding) {
      setIsVisible(false);
    }
  }, [hasCompletedOnboarding]);

  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setHasCompletedOnboarding(true);
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible || hasCompletedOnboarding) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card className="relative w-full max-w-lg p-8 bg-white dark:bg-gray-900 shadow-2xl border-0">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 h-8 w-8 opacity-60 hover:opacity-100"
                onClick={handleComplete}
                aria-label="Skip onboarding"
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="text-center space-y-6">
                {/* Icon with enhanced animation */}
                <motion.div 
                  className="flex justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                >
                  <div className="relative p-4 bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-brand-800 rounded-2xl">
                    <currentStepData.icon className="h-8 w-8 text-brand-600 dark:text-brand-400" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-brand-200/40 to-transparent rounded-2xl"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {currentStepData.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {currentStepData.description}
                  </p>
                  
                  {/* Benefits list */}
                  <div className="space-y-2 mb-6">
                    {currentStepData.benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                        className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-3 flex-shrink-0" />
                        {benefit}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Enhanced Progress Indicator */}
                <motion.div 
                  className="flex justify-center space-x-2 py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {onboardingSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        index <= currentStep
                          ? "bg-brand-500 w-8"
                          : "bg-gray-200 dark:bg-gray-700 w-2"
                      )}
                      animate={{
                        width: index === currentStep ? 32 : index < currentStep ? 20 : 8
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </motion.div>

                {/* Navigation */}
                <motion.div 
                  className="flex justify-between items-center pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center transition-all duration-200 hover:scale-105"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {currentStep + 1} of {onboardingSteps.length}
                  </span>

                  <Button
                    onClick={handleNext}
                    className="flex items-center bg-brand-500 hover:bg-brand-600 transition-all duration-200 hover:scale-105"
                  >
                    {isLastStep ? 'Start Learning' : 'Next'}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </motion.div>

                {/* Skip option */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    variant="ghost"
                    onClick={handleComplete}
                    className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    Skip tutorial
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
