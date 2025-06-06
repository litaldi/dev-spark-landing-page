
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
}

export const NavigationControls = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious, 
  onComplete 
}: NavigationControlsProps) => {
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="space-y-4">
      {/* Navigation */}
      <motion.div 
        className="flex justify-between items-center pt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentStep === 0}
          className="flex items-center transition-all duration-200 hover:scale-105"
          aria-label="Go to previous step"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <span 
          className="text-sm text-gray-500 dark:text-gray-400 font-medium"
          aria-live="polite"
        >
          {currentStep + 1} of {totalSteps}
        </span>

        <Button
          onClick={onNext}
          className="flex items-center bg-brand-500 hover:bg-brand-600 transition-all duration-200 hover:scale-105"
          aria-label={isLastStep ? 'Complete onboarding and start learning' : 'Go to next step'}
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
          onClick={onComplete}
          className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          aria-label="Skip onboarding tutorial"
        >
          Skip tutorial
        </Button>
      </motion.div>
    </div>
  );
};
