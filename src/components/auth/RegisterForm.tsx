
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { EnhancedStepper } from "@/components/ui/enhanced-stepper";
import { AccountDetailsStep } from "@/components/auth/AccountDetailsStep";
import { PersonaSelectionStep } from "@/components/auth/PersonaSelectionStep";
import { useAuth, RegisterFormData } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";
import { AlertError } from "@/components/auth/AlertError";
import { GoogleSignUpButton } from "@/components/auth/GoogleSignUpButton";

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
    
    // Make sure data is cast correctly to RegisterFormData
    const formData: RegisterFormData = {
      name: data.name,
      email: data.email,
      password: data.password,
      persona: data.persona,
      acceptTerms: data.acceptTerms
    };
    
    await registerUser(formData);
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
      <AlertError message={errorMessage} />
      
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
              <GoogleSignUpButton onClick={onGoogleSignUp} disabled={isLoading} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
