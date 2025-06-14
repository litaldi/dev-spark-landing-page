
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  label: string;
  description?: string;
  content: React.ReactNode;
}

interface EnhancedStepperProps {
  steps: Step[];
  activeStep: number;
  className?: string;
}

export function EnhancedStepper({ steps, activeStep, className }: EnhancedStepperProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-200",
                    index < activeStep
                      ? "bg-primary border-primary text-primary-foreground"
                      : index === activeStep
                      ? "border-primary text-primary bg-primary/10"
                      : "border-muted-foreground/20 text-muted-foreground"
                  )}
                  aria-label={`Step ${index + 1}: ${step.label}`}
                  role="button"
                  tabIndex={0}
                >
                  {index < activeStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className={cn(
                    "text-sm font-medium",
                    index <= activeStep ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={cn(
                      "h-0.5 transition-all duration-200",
                      index < activeStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          {steps[activeStep]?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
