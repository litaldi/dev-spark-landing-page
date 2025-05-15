
import * as React from "react";
import { cn } from "@/lib/utils";

interface StepProps {
  label: string;
  description?: string;
  content: React.ReactNode;
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepProps[];
  activeStep: number;
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, activeStep, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-8", className)} {...props}>
        <div className="overflow-hidden">
          <div className="flex mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full border flex items-center justify-center font-medium text-sm",
                      index === activeStep
                        ? "bg-primary text-primary-foreground border-primary"
                        : index < activeStep
                        ? "bg-primary/10 text-primary border-primary"
                        : "bg-muted text-muted-foreground border-muted"
                    )}
                  >
                    {index + 1}
                  </div>
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2",
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
                      "text-sm font-medium",
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
                        "text-xs mt-1",
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
        <div className="py-4">
          {steps[activeStep]?.content || null}
        </div>
      </div>
    );
  }
);

Stepper.displayName = "Stepper";
