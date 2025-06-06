
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index);

  return (
    <motion.div 
      className="flex justify-center space-x-2 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
    >
      {steps.map((_, index) => (
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
  );
};
