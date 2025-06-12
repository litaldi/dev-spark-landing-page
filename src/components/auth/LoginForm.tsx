
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { AlertError } from "./AlertError";
import { LoginFormInputs } from "./LoginFormInputs";
import { LoginAlternatives } from "./LoginAlternatives";
import { RateLimitWarning } from "./RateLimitWarning";
import { useLoginForm, loginSchema, LoginFormValues } from "@/hooks/auth/use-login-form";
import { Loader2 } from "lucide-react";
import { useBreakpoint } from "@/hooks/use-mobile";

interface LoginFormProps {
  onGoogleLogin?: () => void;
  onGithubLogin?: () => void;
  onMagicLink?: (email: string) => void;
}

export function LoginForm({ onGoogleLogin, onGithubLogin, onMagicLink }: LoginFormProps) {
  const breakpoint = useBreakpoint();
  const isSmallScreen = breakpoint === "xs" || breakpoint === "mobile";
  
  const { 
    isLoading, 
    isBlocked, 
    timeRemaining, 
    errorMessage, 
    clearError,
    handleSubmit,
    handleMagicLink: handleMagicLinkRequest,
    focusField,
    setFocusField
  } = useLoginForm(onMagicLink);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    handleSubmit(data);
  };
  
  const handleMagicLink = () => {
    const email = form.getValues("email");
    
    if (!email) {
      form.setError("email", {
        type: "manual",
        message: "Please enter a valid email address",
      });
      setFocusField("email");
      return;
    }
    
    handleMagicLinkRequest(email);
  };
  
  return (
    <div className="animate-fade-in space-y-6">
      <AlertError message={errorMessage} />
      
      <RateLimitWarning isBlocked={isBlocked} timeRemaining={timeRemaining} />
      
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-4"
          onChange={() => clearError()}
          aria-label="Login form"
          noValidate
        >
          <LoginFormInputs 
            form={form} 
            focusField={focusField} 
            setFocusField={setFocusField} 
          />
          
          <Button 
            type="submit" 
            className="w-full transition-all duration-300 relative"
            disabled={isLoading || isBlocked}
            aria-busy={isLoading}
            size={isSmallScreen ? "sm" : "default"}
          >
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            )}
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
        onGithubLogin={onGithubLogin}
        onMagicLink={handleMagicLink}
        isLoading={isLoading || isBlocked}
      />
    </div>
  );
}
