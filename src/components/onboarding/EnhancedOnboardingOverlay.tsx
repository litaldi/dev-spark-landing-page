
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingStep } from './OnboardingStep';
import { ProgressIndicator } from './ProgressIndicator';
import { NavigationControls } from './NavigationControls';
import { onboardingSteps } from './onboarding-data';

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleComplete();
      } else if (event.key === 'ArrowRight' || event.key === 'Enter') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      // Trap focus within the modal
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible, currentStep]);

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
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      aria-describedby="onboarding-description"
    >
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

              <OnboardingStep stepData={currentStepData} />
              
              <ProgressIndicator 
                currentStep={currentStep} 
                totalSteps={onboardingSteps.length} 
              />

              <NavigationControls
                currentStep={currentStep}
                totalSteps={onboardingSteps.length}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onComplete={handleComplete}
              />
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
