
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
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";
import { Stepper } from "@/components/ui/stepper";

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
      
      // Store in localStorage for demo purposes
      localStorage.setItem("onboardingComplete", "true");
      localStorage.setItem("userStack", JSON.stringify(data.stack));
      localStorage.setItem("weeklyGoal", data.weeklyGoal.toString());
      
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
        setActiveStep((prev) => (prev < 1 ? prev + 1 : prev));
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 md:p-6 lg:p-8 bg-gradient-to-b from-background to-background/80">
      <SkipNavLink contentId="main-content">Skip to content</SkipNavLink>
      
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <SkipNavContent id="main-content">
        <div 
          className="w-full max-w-lg" 
          role="main" 
          aria-label="Onboarding process"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to DevSpark</h1>
            <p className="text-muted-foreground">Let's personalize your experience in just two steps</p>
          </div>
          
          <Card className="w-full shadow-md border-opacity-40 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-30 pointer-events-none" />
            
            <CardHeader className="space-y-2 relative pb-2">
              <CardTitle 
                className="text-2xl font-bold tracking-tight" 
                ref={headingRef}
                tabIndex={-1}
              >
                Complete your profile
              </CardTitle>
              <CardDescription className="text-base">
                Personalize your learning experience
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 relative pt-4">
              <Stepper steps={steps} activeStep={activeStep} className="mb-8" />
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div 
                    role="region" 
                    aria-label={`Step ${activeStep + 1} of ${steps.length}`}
                    className="min-h-[320px]"
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
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>You can always change these settings later in your profile</p>
          </div>
        </div>
      </SkipNavContent>
    </div>
  );
};

export default OnboardingPage;
