
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { LoginFormValues } from "@/hooks/auth/use-login-form";

interface LoginFormInputsProps {
  form: UseFormReturn<LoginFormValues>;
  focusField: string | null;
  setFocusField: (field: string | null) => void;
}

export function LoginFormInputs({ form, focusField, setFocusField }: LoginFormInputsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="space-y-1.5">
            <FormLabel className="text-sm font-medium text-foreground">Email</FormLabel>
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
            <FormMessage className="text-xs font-medium" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="space-y-1.5">
            <div className="flex items-center justify-between">
              <FormLabel className="text-sm font-medium text-foreground">Password</FormLabel>
              <Button
                variant="link"
                className="h-auto p-0 font-normal text-xs"
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
            <FormMessage className="text-xs font-medium" />
          </FormItem>
        )}
      />
    </>
  );
}
