
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StepProps {
  label: string;
  description?: string;
  content: React.ReactNode;
}

interface EnhancedStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepProps[];
  activeStep: number;
}

export const EnhancedStepper = React.forwardRef<HTMLDivElement, EnhancedStepperProps>(
  ({ steps, activeStep, className, ...props }, ref) => {
    // For announcing step changes to screen readers
    const prevActiveStep = React.useRef(activeStep);
    
    React.useEffect(() => {
      // Only announce if the step has changed
      if (prevActiveStep.current !== activeStep) {
        // Create and use an ARIA live region
        const announcement = `Step ${activeStep + 1} of ${steps.length}: ${steps[activeStep].label}`;
        const ariaLive = document.createElement('div');
        ariaLive.setAttribute('aria-live', 'polite');
        ariaLive.classList.add('sr-only'); // Screen reader only
        ariaLive.innerText = announcement;
        document.body.appendChild(ariaLive);
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(ariaLive);
        }, 1000);
        
        prevActiveStep.current = activeStep;
      }
    }, [activeStep, steps]);
    
    return (
      <div 
        ref={ref} 
        className={cn("space-y-8", className)} 
        {...props}
        role="region" 
        aria-label="Progress steps"
      >
        <div className="overflow-hidden">
          <div className="flex mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full border flex items-center justify-center font-medium text-sm transition-colors duration-300",
                      index === activeStep
                        ? "bg-primary text-primary-foreground border-primary"
                        : index < activeStep
                        ? "bg-primary/10 text-primary border-primary"
                        : "bg-muted text-muted-foreground border-muted"
                    )}
                    aria-current={index === activeStep ? "step" : undefined}
                  >
                    {index + 1}
                  </div>
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 transition-colors duration-300",
                      index === steps.length - 1 && "hidden",
                      index < activeStep
                        ? "bg-primary"
                        : "bg-muted"
                    )}
                  ></div>
                </div>
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      index === activeStep
                        ? "text-primary"
                        : index < activeStep
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div
                      className={cn(
                        "text-xs mt-1 transition-colors duration-300",
                        index === activeStep
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <motion.div 
          className="py-4"
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {steps[activeStep]?.content || null}
        </motion.div>
      </div>
    );
  }
);

EnhancedStepper.displayName = "EnhancedStepper";
