
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ArrowRight, ArrowLeft, Lightbulb, MessageSquare, Award, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  targetSelector?: string;
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to DevAI Learning Platform!',
    description: 'Let\'s take a quick tour of your personalized learning dashboard.',
    icon: Lightbulb,
    position: 'center'
  },
  {
    id: 'ai-assistant',
    title: 'Meet Your AI Study Companion',
    description: 'Click the chat button to get personalized help, code reviews, and learning suggestions.',
    icon: MessageSquare,
    targetSelector: '[aria-label="Open AI Study Assistant"]',
    position: 'left'
  },
  {
    id: 'progress',
    title: 'Track Your Progress',
    description: 'Monitor your learning journey with detailed progress tracking and achievement badges.',
    icon: BarChart3,
    position: 'center'
  },
  {
    id: 'achievements',
    title: 'Earn Achievements',
    description: 'Complete lessons and projects to unlock badges and maintain your learning streak.',
    icon: Award,
    position: 'center'
  }
];

interface OnboardingOverlayProps {
  onComplete: () => void;
}

export const OnboardingOverlay = ({ onComplete }: OnboardingOverlayProps) => {
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

  const handleSkip = () => {
    setHasCompletedOnboarding(true);
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible || hasCompletedOnboarding) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Overlay Background */}
      <div className="absolute inset-0" onClick={handleSkip} />
      
      {/* Onboarding Card */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="relative w-full max-w-md p-6 bg-white dark:bg-gray-900 shadow-2xl animate-scale-in">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 h-8 w-8"
            onClick={handleSkip}
            aria-label="Skip onboarding"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-brand-100 dark:bg-brand-900 rounded-full">
                <currentStepData.icon className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {currentStepData.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center space-x-2 py-4">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-2 w-8 rounded-full transition-colors",
                    index <= currentStep
                      ? "bg-brand-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  )}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentStep + 1} of {onboardingSteps.length}
              </span>

              <Button
                onClick={handleNext}
                className="flex items-center bg-brand-500 hover:bg-brand-600"
              >
                {isLastStep ? 'Get Started' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={handleSkip}
              className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Skip tutorial
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
