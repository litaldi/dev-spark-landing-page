import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { EnhancedStepper } from "@/components/ui/enhanced-stepper";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccountDetailsStep } from "@/components/auth/AccountDetailsStep";
import { PersonaSelectionStep } from "@/components/auth/PersonaSelectionStep";

// Form validation schema with stronger requirements
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .refine(val => /[A-Z]/.test(val), { message: "Password must include at least one uppercase letter" })
    .refine(val => /[0-9]/.test(val), { message: "Password must include at least one number" })
    .refine(val => /[^A-Za-z0-9]/.test(val), { message: "Password must include at least one special character" }),
  persona: z.enum(["junior", "mentor", "instructor"], { 
    required_error: "Please select a role" 
  }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      persona: "junior",
      acceptTerms: false as unknown as true,
    },
    mode: "onChange",
  });

  const nextStep = () => {
    const fieldsToValidate = activeStep === 0 
      ? ["name", "email", "password"] 
      : ["persona", "acceptTerms"];
    
    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) {
        setActiveStep((prev) => (prev < 1 ? prev + 1 : prev));
      }
    });
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Submit handler
  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    
    try {
      // This would be replaced with actual registration logic
      console.log("Register form submitted:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      
      // Navigate to onboarding
      navigate("/auth/onboarding");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    // Implementation would connect to Supabase Google OAuth
    console.log("Google signup clicked");
    toast({
      title: "Google Sign-Up",
      description: "Redirecting to Google authentication...",
    });
    setIsLoading(false);
  };

  // Define steps with their content
  const steps = [
    {
      label: "Account",
      description: "Your details",
      content: <AccountDetailsStep onNext={nextStep} />,
    },
    {
      label: "Persona",
      description: "Your role",
      content: <PersonaSelectionStep onPrevious={prevStep} isLoading={isLoading} />,
    },
  ];

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-background p-4"
      aria-labelledby="register-page-title"
    >
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold" id="register-page-title">Create an account</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
              >
                <Link to="/" className="text-sm text-muted-foreground">
                  Back to Home
                </Link>
              </Button>
            </div>
            <CardDescription>
              Get started by filling in your information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormProvider {...form}>
              <Form>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <EnhancedStepper
                    activeStep={activeStep}
                    steps={steps}
                  />
                </form>
              </Form>
            </FormProvider>
            
            {activeStep === 0 && (
              <>
                <div className="relative flex items-center justify-center">
                  <Separator className="w-full" />
                  <span className="absolute bg-card px-2 text-xs text-muted-foreground">
                    OR CONTINUE WITH
                  </span>
                </div>
                
                <div className="grid gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleGoogleSignUp} 
                    disabled={isLoading}
                    className="w-full"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Sign up with Google
                  </Button>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button variant="link" className="px-0" asChild>
                <Link to="/auth/login">Sign in</Link>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
