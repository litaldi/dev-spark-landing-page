
import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  completed?: boolean;
  index?: number;
}

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ className, active, completed, index, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center",
          {
            "text-muted-foreground": !active && !completed,
            "text-primary": active || completed,
          },
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border",
            {
              "border-muted bg-background": !active && !completed,
              "border-primary bg-primary text-primary-foreground": active,
              "border-primary bg-primary/90 text-primary-foreground": completed,
            }
          )}
        >
          {completed ? <Check className="h-4 w-4" /> : index}
        </div>
      </div>
    );
  }
);
Step.displayName = "Step";

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep: number;
  steps: Array<{
    label: string;
    description?: string;
    content?: React.ReactNode;
  }>;
  showLabels?: boolean;
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, activeStep, steps, showLabels = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("", className)}
        {...props}
      >
        <div className="mb-8 flex items-center justify-center">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <Step
                  index={index + 1}
                  active={activeStep === index}
                  completed={activeStep > index}
                />
                {showLabels && (
                  <span
                    className={cn("mt-2 text-sm", {
                      "text-muted-foreground": activeStep !== index,
                      "font-medium": activeStep === index,
                    })}
                  >
                    {step.label}
                  </span>
                )}
                {step.description && (
                  <span className="mt-1 hidden text-xs text-muted-foreground sm:block">
                    {step.description}
                  </span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn("mx-2 h-px w-full flex-1", {
                    "bg-muted": activeStep <= index,
                    "bg-primary": activeStep > index,
                  })}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-4">{steps[activeStep]?.content}</div>
      </div>
    );
  }
);
Stepper.displayName = "Stepper";
