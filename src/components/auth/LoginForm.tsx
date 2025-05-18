
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { AlertError } from "./AlertError";
import { LoginFormInputs } from "./LoginFormInputs";
import { LoginAlternatives } from "./LoginAlternatives";
import { useRateLimit } from "@/hooks/use-rate-limit";
import { sanitizeInput } from "@/lib/security";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Form validation schema
const loginSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .transform(sanitizeInput),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .transform(sanitizeInput),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onGoogleLogin?: () => void;
  onMagicLink?: (email: string) => void;
}

const DEMO_USER = {
  email: "demo@looplist.app",
  password: "Demo123!",
};

export function LoginForm({ onGoogleLogin, onMagicLink }: LoginFormProps) {
  const { login, isLoading, errorMessage, clearError } = useAuth();
  const { toast } = useToast();
  
  // For accessibility, track focus management during form interactions
  const [focusField, setFocusField] = useState<string | null>(null);
  
  // Animation state for demo login
  const [isDemoFilling, setIsDemoFilling] = useState<boolean>(false);
  
  // Implement rate limiting for login attempts
  const {
    isBlocked,
    timeRemaining,
    registerAttempt,
    resetLimit,
  } = useRateLimit("login", {
    maxAttempts: 5,           // Max 5 attempts
    timeWindow: 60000 * 10,   // Within 10 minutes
    blockDuration: 60000 * 15 // Block for 15 minutes after exceeding
  });
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Clear form errors when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  // Submit handler with rate limiting
  const onSubmit = async (data: LoginFormValues) => {
    clearError();
    
    // Check rate limiting before proceeding
    const { isAllowed, remainingAttempts } = registerAttempt();
    if (!isAllowed) {
      const minutesRemaining = Math.ceil(timeRemaining / 60000);
      toast({
        title: "Too many login attempts",
        description: `For security reasons, please try again in ${minutesRemaining} minutes.`,
        variant: "destructive",
      });
      return;
    }
    
    // If we're running low on attempts, warn the user
    if (remainingAttempts <= 2) {
      toast({
        title: "Login Attempt Limit",
        description: `You have ${remainingAttempts} login attempts remaining before a temporary block.`,
        variant: "default", // Using 'default' variant as it's a supported type
      });
    }
    
    // Proceed with login attempt
    const success = await login(data.email, data.password);
    
    // If login was successful, reset the rate limit
    if (success) {
      resetLimit();
    }
  };

  const handleDemoLogin = () => {
    if (isBlocked) {
      const minutesRemaining = Math.ceil(timeRemaining / 60000);
      toast({
        title: "Too many login attempts",
        description: `For security reasons, please try again in ${minutesRemaining} minutes.`,
        variant: "destructive",
      });
      return;
    }
    
    // Show animation of form filling
    setIsDemoFilling(true);
    form.setValue("email", DEMO_USER.email);
    
    // Simulate typing
    setTimeout(() => {
      form.setValue("password", DEMO_USER.password);
      
      // Submit after a short delay
      setTimeout(() => {
        setIsDemoFilling(false);
        form.handleSubmit(onSubmit)();
      }, 300);
    }, 300);
  };

  const handleMagicLink = async () => {
    const email = form.getValues("email");
    if (!z.string().email().safeParse(email).success) {
      form.setError("email", {
        type: "manual",
        message: "Please enter a valid email address",
      });
      setFocusField("email");
      return;
    }

    // Apply rate limiting to magic link requests as well
    const { isAllowed } = registerAttempt();
    if (!isAllowed) {
      const minutesRemaining = Math.ceil(timeRemaining / 60000);
      toast({
        title: "Too many login attempts",
        description: `For security reasons, please try again in ${minutesRemaining} minutes.`,
        variant: "destructive",
      });
      return;
    }

    if (onMagicLink) {
      onMagicLink(sanitizeInput(email));
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <AlertError message={errorMessage} />
      
      {isBlocked && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-4">
          <p className="font-medium">Account protection activated</p>
          <p className="text-sm">
            Too many login attempts. Please try again in {Math.ceil(timeRemaining / 60000)} minutes.
          </p>
        </div>
      )}
      
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-4"
          onChange={() => clearError()}
          aria-label="Login form"
        >
          <LoginFormInputs 
            form={form} 
            focusField={focusField} 
            setFocusField={setFocusField} 
          />
          
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              size="sm"
              className="px-0 text-xs"
              onClick={() => navigate("/auth/forgot-password")}
              tabIndex={0}
            >
              Forgot password?
            </Button>
          </div>
          
          <Button 
            type="submit" 
            className="w-full transition-all duration-300 relative"
            disabled={isLoading || isBlocked || isDemoFilling}
            aria-busy={isLoading || isDemoFilling}
          >
            {(isLoading || isDemoFilling) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            )}
            {isLoading ? "Signing in..." : isDemoFilling ? "Filling demo data..." : "Sign in"}
          </Button>
        </form>
      </Form>
      
      <div className="relative flex items-center justify-center">
        <Separator className="w-full" />
        <span className="absolute bg-card px-2 text-xs text-muted-foreground">
          OR CONTINUE WITH
        </span>
      </div>
      
      <LoginAlternatives
        onGoogleLogin={onGoogleLogin}
        onMagicLink={handleMagicLink}
        onDemoLogin={handleDemoLogin}
        isLoading={isLoading || isBlocked || isDemoFilling}
      />
    </div>
  );
}

function navigate(path: string): void {
  window.location.href = path;
}
