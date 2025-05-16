
import React, { useState } from "react";
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

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
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
  
  // For accessibility, track focus management during form interactions
  const [focusField, setFocusField] = useState<string | null>(null);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit handler
  const onSubmit = async (data: LoginFormValues) => {
    await login(data.email, data.password);
  };

  const handleDemoLogin = () => {
    form.setValue("email", DEMO_USER.email);
    form.setValue("password", DEMO_USER.password);
    
    // Short delay to show the form being filled
    setTimeout(() => {
      form.handleSubmit(onSubmit)();
    }, 500);
  };

  const handleMagicLink = async () => {
    const email = form.getValues("email");
    if (!z.string().email().safeParse(email).success) {
      form.setError("email", {
        type: "manual",
        message: "Please enter a valid email address",
      });
      return;
    }

    if (onMagicLink) {
      onMagicLink(email);
    }
  };

  return (
    <>
      <AlertError message={errorMessage} />
      
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-4"
          onChange={() => clearError()}
        >
          <LoginFormInputs 
            form={form} 
            focusField={focusField} 
            setFocusField={setFocusField} 
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
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
        isLoading={isLoading}
      />
    </>
  );
}
