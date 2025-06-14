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
import { sanitizeInput } from "@/lib/security";
import { useRateLimit } from "@/hooks/use-rate-limit";
import { useToast } from "@/hooks/use-toast";

// Form validation schema with stronger requirements and sanitization
const registerSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .transform(sanitizeInput),
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .transform(sanitizeInput),
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
  const { toast } = useToast();

  // Rate limiting for registration
  const {
    isBlocked,
    timeRemaining,
    registerAttempt,
  } = useRateLimit("register", {
    maxRequests: 3,            // Max 3 attempts
    timeWindow: 60000 * 30,    // Within 30 minutes
    blockDuration: 60000 * 60  // Block for 1 hour after exceeding
  });
  
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

  // Submit handler with security enhancements
  const onSubmit = async (data: RegisterFormValues) => {
    // Check rate limiting
    const { isAllowed } = registerAttempt();
    if (!isBlocked && !isAllowed) {
      const minutesRemaining = Math.ceil(timeRemaining / 60000);
      toast({
        title: "Too many registration attempts",
        description: `For security reasons, please try again in ${minutesRemaining} minutes.`,
        variant: "destructive",
      });
      return;
    }
    
    // Additional email validation for defence in depth
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      form.setError("email", { 
        type: "manual", 
        message: "Invalid email format" 
      });
      return;
    }
    
    // Make sure data is sanitized and cast correctly to RegisterFormData
    const formData: RegisterFormData = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      password: data.password, // Do not sanitize password as it may contain special chars
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
      
      {isBlocked && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-4">
          <p className="font-medium">Registration temporarily blocked</p>
          <p className="text-sm">
            Too many registration attempts. Please try again in {Math.ceil(timeRemaining / 60000)} minutes.
          </p>
        </div>
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
              <GoogleSignUpButton onClick={onGoogleSignUp} disabled={isLoading || isBlocked} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
