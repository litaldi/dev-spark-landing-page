
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Stepper } from "@/components/ui/stepper";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { StackSelectionStep } from "@/components/onboarding/StackSelectionStep";
import { WeeklyGoalsStep } from "@/components/onboarding/WeeklyGoalsStep";
import { onboardingSchema, OnboardingFormValues } from "@/schemas/onboarding-schema";

const OnboardingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      stack: [],
      weeklyGoal: 10,
      receiveUpdates: false,
    },
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

  // Submit handler
  const onSubmit = async (data: OnboardingFormValues) => {
    setIsLoading(true);
    
    try {
      // This would be replaced with actual onboarding logic
      console.log("Onboarding form submitted:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Onboarding complete",
        description: "Your preferences have been saved.",
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Onboarding error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    {
      label: "Technologies",
      description: "Your stack",
      content: <StackSelectionStep onNext={nextStep} />,
    },
    {
      label: "Goals",
      description: "Your commitment",
      content: <WeeklyGoalsStep onPrevious={prevStep} isLoading={isLoading} />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 md:p-6 lg:p-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        <Card className="w-full shadow-md border-opacity-40">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">Complete your profile</CardTitle>
            <CardDescription className="text-base">
              Let's personalize your learning experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Stepper
                  activeStep={activeStep}
                  steps={steps}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingPage;
