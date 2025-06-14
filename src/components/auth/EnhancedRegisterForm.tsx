
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { EnhancedProgressIndicator } from "@/components/ui/enhanced-progress-indicator";
import { Separator } from "@/components/ui/separator";
import { GoogleSignUpButton } from "@/components/auth/GoogleSignUpButton";
import { AlertError } from "@/components/auth/AlertError";
import { PersonaSelectionStep } from "@/components/auth/PersonaSelectionStep";
import { useAuth, RegisterFormData } from "@/hooks/use-auth";
import { useRateLimit } from "@/hooks/use-rate-limit";
import { useToast } from "@/hooks/use-toast";
import { sanitizeInput } from "@/lib/security";
import { User, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

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

export interface EnhancedRegisterFormProps {
  onGoogleSignUp?: () => void;
}

export function EnhancedRegisterForm({ onGoogleSignUp }: EnhancedRegisterFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const { register: registerUser, isLoading, errorMessage } = useAuth({ redirectTo: "/auth/onboarding" });
  const { toast } = useToast();

  const {
    isBlocked,
    timeRemaining,
    registerAttempt,
  } = useRateLimit("register", {
    maxAttempts: 3,
    timeWindow: 60000 * 30,
    blockDuration: 60000 * 60
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

  const steps = [
    {
      id: "account",
      label: "Account Details",
      description: "Your basic information"
    },
    {
      id: "persona",
      label: "Your Role",
      description: "Tell us about yourself"
    }
  ];

  const nextStep = async () => {
    const fieldsToValidate = activeStep === 0 
      ? ["name", "email", "password"] 
      : ["persona", "acceptTerms"];
    
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) {
      setActiveStep((prev) => (prev < 1 ? prev + 1 : prev));
    }
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const onSubmit = async (data: RegisterFormValues) => {
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
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      form.setError("email", { 
        type: "manual", 
        message: "Invalid email format" 
      });
      return;
    }
    
    const formData: RegisterFormData = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      password: data.password,
      persona: data.persona,
      acceptTerms: data.acceptTerms
    };
    
    await registerUser(formData);
  };

  return (
    <div className="space-y-6">
      <AlertError message={errorMessage} />
      
      {isBlocked && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg"
        >
          <p className="font-medium">Registration temporarily blocked</p>
          <p className="text-sm">
            Too many registration attempts. Please try again in {Math.ceil(timeRemaining / 60000)} minutes.
          </p>
        </motion.div>
      )}

      {/* Enhanced Progress Indicator */}
      <EnhancedProgressIndicator
        steps={steps}
        currentStep={activeStep}
        className="mb-8"
        animated={true}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelInput
                            {...field}
                            label="Full Name"
                            placeholder=""
                            icon={<User className="w-4 h-4" />}
                            error={fieldState.error?.message}
                            success={!fieldState.error && field.value.length > 1}
                            helperText="Enter your full name as it will appear on your profile"
                            disabled={isLoading || isBlocked}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelInput
                            {...field}
                            type="email"
                            label="Email Address"
                            placeholder=""
                            icon={<Mail className="w-4 h-4" />}
                            error={fieldState.error?.message}
                            success={!fieldState.error && field.value.includes('@')}
                            helperText="We'll use this to send you important updates"
                            disabled={isLoading || isBlocked}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <FloatingLabelInput
                            {...field}
                            label="Password"
                            placeholder=""
                            icon={<Lock className="w-4 h-4" />}
                            showPasswordToggle={true}
                            error={fieldState.error?.message}
                            success={!fieldState.error && field.value.length >= 8}
                            helperText="Must be at least 8 characters with uppercase, number, and special character"
                            disabled={isLoading || isBlocked}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <EnhancedButton
                    type="button"
                    onClick={nextStep}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    animation="slide"
                    variant="gradient"
                    disabled={isLoading || isBlocked}
                  >
                    Continue
                  </EnhancedButton>
                </div>

                {/* Social Sign-up */}
                <div className="relative">
                  <Separator className="my-6" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
                    OR CONTINUE WITH
                  </span>
                </div>

                <GoogleSignUpButton 
                  onClick={onGoogleSignUp} 
                  disabled={isLoading || isBlocked}
                />
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PersonaSelectionStep 
                  onPrevious={prevStep}
                  isLoading={isLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Form>
    </div>
  );
}
