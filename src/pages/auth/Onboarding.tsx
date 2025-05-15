
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Stepper } from "@/components/ui/stepper";
import { Slider } from "@/components/ui/slider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

// Form validation schema
const onboardingSchema = z.object({
  stack: z.array(z.string()).min(1, { message: "Select at least one technology" }),
  weeklyGoal: z.number().min(1).max(40),
  receiveUpdates: z.boolean().default(false),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

const technologyStacks = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "angular", label: "Angular" },
  { id: "nextjs", label: "Next.js" },
  { id: "node", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "django", label: "Django" },
  { id: "ruby", label: "Ruby" },
  { id: "rails", label: "Rails" },
  { id: "flutter", label: "Flutter" },
  { id: "kotlin", label: "Kotlin" },
  { id: "swift", label: "Swift" },
];

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

  // Step 1: Stack Selection
  const StackSelectionStep = () => (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="stack"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Select your tech stack</FormLabel>
              <FormDescription>
                Choose the technologies you're interested in learning or improving
              </FormDescription>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {technologyStacks.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="stack"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="flex justify-end">
        <Button type="button" onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );

  // Step 2: Weekly Goals
  const WeeklyGoalsStep = () => (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="weeklyGoal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weekly Learning Goal (hours)</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <Slider
                  value={[field.value]}
                  onValueChange={(vals) => field.onChange(vals[0])}
                  max={40}
                  min={1}
                  step={1}
                />
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">1 hour</span>
                  <span className="font-medium">{field.value} hours</span>
                  <span className="text-muted-foreground text-sm">40 hours</span>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="receiveUpdates"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm font-normal">
                I want to receive updates about new courses, features and promotions
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Complete Setup"}
        </Button>
      </div>
    </div>
  );

  const steps = [
    {
      label: "Technologies",
      description: "Your stack",
      content: <StackSelectionStep />,
    },
    {
      label: "Goals",
      description: "Your commitment",
      content: <WeeklyGoalsStep />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Complete your profile</CardTitle>
            <CardDescription>
              Let's personalize your learning experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
