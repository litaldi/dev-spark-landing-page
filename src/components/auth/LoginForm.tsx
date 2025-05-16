
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";

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
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        </motion.div>
      )}
      
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-4"
          onChange={() => clearError()}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    {...field} 
                    className="bg-background"
                    aria-describedby="email-description"
                    autoFocus={focusField === "email"}
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Button
                    variant="link"
                    className="px-0 font-normal text-xs"
                    type="button"
                    asChild
                  >
                    <Link to="/auth/forgot-password">Forgot password?</Link>
                  </Button>
                </div>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    {...field} 
                    className="bg-background"
                    aria-describedby="password-description"
                    autoFocus={focusField === "password"}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
      
      <div className="grid gap-2">
        <Button 
          variant="outline" 
          onClick={onGoogleLogin} 
          disabled={isLoading}
          className="w-full"
          aria-label="Continue with Google"
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Continue with Google</span>
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleMagicLink} 
          disabled={isLoading}
          className="w-full"
          aria-label="Sign in with Magic Link"
        >
          Magic Link Sign In
        </Button>

        <Button
          variant="secondary"
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="w-full bg-brand-100 hover:bg-brand-200 dark:bg-brand-900/30 dark:hover:bg-brand-900/50 border border-brand-200 dark:border-brand-800"
          aria-label="Try with demo account"
        >
          <span>Try with Demo Account</span>
          <Badge variant="outline" className="ml-2 bg-brand-50 dark:bg-brand-900/50 text-xs">Demo</Badge>
        </Button>
      </div>
    </>
  );
}
