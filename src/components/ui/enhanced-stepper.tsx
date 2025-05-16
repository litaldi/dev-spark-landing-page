
import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepProps {
  label: string;
  description?: string;
  content: React.ReactNode;
  isCompleted?: boolean;
}

interface EnhancedStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepProps[];
  activeStep: number;
  onStepChange?: (step: number) => void;
}

export const EnhancedStepper = React.forwardRef<HTMLDivElement, EnhancedStepperProps>(
  ({ steps, activeStep, onStepChange, className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("space-y-8", className)} 
        {...props}
        role="region"
        aria-label="Registration progress"
      >
        <div className="overflow-hidden">
          <div className="flex mb-4">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPrevious = index < activeStep;
              const isClickable = onStepChange && (isPrevious || index === activeStep + 1);
              
              return (
                <div key={index} className="flex-1">
                  <div className="flex items-center">
                    <button
                      type="button"
                      disabled={!isClickable}
                      onClick={() => isClickable && onStepChange?.(index)}
                      className={cn(
                        "w-8 h-8 rounded-full border flex items-center justify-center font-medium text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground border-primary"
                          : isPrevious
                          ? "bg-primary/10 text-primary border-primary hover:bg-primary/20"
                          : "bg-muted text-muted-foreground border-muted",
                        !isClickable && "cursor-default"
                      )}
                      aria-current={isActive ? "step" : undefined}
                    >
                      {isPrevious ? <Check className="h-4 w-4" /> : index + 1}
                    </button>
                    <div
                      className={cn(
                        "flex-1 h-0.5 mx-2 transition-colors duration-300",
                        index === steps.length - 1 && "hidden",
                        isPrevious
                          ? "bg-primary"
                          : "bg-muted"
                      )}
                    ></div>
                  </div>
                  <div className="mt-2 text-center">
                    <div
                      className={cn(
                        "text-sm font-medium transition-colors",
                        isActive
                          ? "text-primary"
                          : isPrevious
                          ? "text-muted-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </div>
                    {step.description && (
                      <div
                        className={cn(
                          "text-xs mt-1 transition-colors",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {step.description}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div 
          className="py-4 animate-fade-in" 
          role="tabpanel" 
          aria-labelledby={`step-${activeStep}`}
        >
          {steps[activeStep]?.content || null}
        </div>
      </div>
    );
  }
);

EnhancedStepper.displayName = "EnhancedStepper";
