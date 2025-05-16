
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { StackSelectionStep } from "@/components/onboarding/StackSelectionStep";
import { WeeklyGoalsStep } from "@/components/onboarding/WeeklyGoalsStep";
import { onboardingSchema, OnboardingFormValues } from "@/schemas/onboarding-schema";
import { useFormState } from "@/hooks/use-form-state";

const OnboardingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      stack: [],
      weeklyGoal: 10,
      receiveUpdates: false,
    },
  });
  
  // Setup form submission with enhanced form state hook
  const { handleSubmit, isSubmitting, announceToScreenReader } = useFormState({
    onSubmit: async (data: OnboardingFormValues) => {
      // This would be replaced with actual onboarding logic
      console.log("Onboarding form submitted:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Navigate to dashboard
      navigate("/dashboard");
      return true;
    },
    successMessage: "Your preferences have been saved.",
    errorMessage: "Something went wrong. Please try again.",
    focusOptions: {
      announceResult: true
    }
  });

  const nextStep = () => {
    const fieldsToValidate = activeStep === 0 
      ? ["stack"]
      : ["weeklyGoal", "receiveUpdates"];
      
    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) {
        setActiveStep((prev) => (prev < 2 ? prev + 1 : prev));
      }
    });
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };
  
  // Announce step changes for screen readers
  useEffect(() => {
    // Focus on the heading when step changes
    if (headingRef.current) {
      headingRef.current.focus();
    }
    
    // Announce step change
    const stepNames = ["technology selection", "weekly goals"];
    announceToScreenReader(`Moving to step ${activeStep + 1}: ${stepNames[activeStep]}`);
  }, [activeStep, announceToScreenReader]);

  const steps = [
    {
      label: "Technologies",
      description: "Your stack",
      content: <StackSelectionStep onNext={nextStep} />,
    },
    {
      label: "Goals",
      description: "Your commitment",
      content: <WeeklyGoalsStep onPrevious={prevStep} isLoading={isSubmitting} />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 md:p-6 lg:p-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div 
        className="w-full max-w-md" 
        role="main" 
        aria-label="Onboarding process"
      >
        <Card className="w-full shadow-md border-opacity-40">
          <CardHeader className="space-y-2">
            <CardTitle 
              className="text-2xl font-bold tracking-tight" 
              ref={headingRef}
              tabIndex={-1}
            >
              Complete your profile
            </CardTitle>
            <CardDescription className="text-base">
              Let's personalize your learning experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div 
                  role="region" 
                  aria-label={`Step ${activeStep + 1} of ${steps.length}`}
                >
                  {steps[activeStep].content}
                </div>
                
                <div className="sr-only" aria-live="polite">
                  {isSubmitting ? "Submitting your preferences. Please wait." : ""}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingPage;
