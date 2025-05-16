
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { EnhancedStepper } from "@/components/ui/enhanced-stepper";
import { AccountDetailsStep } from "@/components/auth/AccountDetailsStep";
import { PersonaSelectionStep } from "@/components/auth/PersonaSelectionStep";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";

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

export type RegisterFormValues = z.infer<typeof registerSchema>;

export interface RegisterFormProps {
  onGoogleSignUp?: () => void;
}

export function RegisterForm({ onGoogleSignUp }: RegisterFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const { register: registerUser, isLoading, errorMessage } = useAuth({ redirectTo: "/auth/onboarding" });

  // Rate limiting for form submissions (simple implementation)
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  
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

  // Submit handler with rate limiting
  const onSubmit = async (data: RegisterFormValues) => {
    // Basic rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < 2000) { // 2 seconds cooldown
      return;
    }
    
    if (submitCount > 5) {
      form.setError("root", {
        type: "manual",
        message: "Too many attempts. Please try again later."
      });
      return;
    }
    
    setSubmitCount(prev => prev + 1);
    setLastSubmitTime(now);
    
    await registerUser(data);
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
    <>
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <EnhancedStepper
            activeStep={activeStep}
            steps={steps}
          />
        </form>
      </Form>
      
      <AnimatePresence mode="wait">
        {activeStep === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative flex items-center justify-center mt-4">
              <Separator className="w-full" />
              <span className="absolute bg-card px-2 text-xs text-muted-foreground">
                OR CONTINUE WITH
              </span>
            </div>
            
            <div className="grid gap-2 mt-4">
              <Button 
                variant="outline" 
                onClick={onGoogleSignUp} 
                disabled={isLoading}
                className="w-full"
                aria-label="Sign up with Google account"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
