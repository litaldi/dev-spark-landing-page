
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";
import { useState } from "react";

interface AccountDetailsStepProps {
  onNext: () => void;
}

export const AccountDetailsStep: React.FC<AccountDetailsStepProps> = ({ onNext }) => {
  const { control, watch } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <FormControl>
              <Input 
                id="name"
                placeholder="John Doe" 
                {...field} 
                className="bg-background" 
                aria-required="true"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Input 
                id="email"
                type="email" 
                placeholder="your@email.com" 
                {...field} 
                className="bg-background"
                aria-required="true" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  {...field} 
                  className="bg-background pr-10" 
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </FormControl>
            <PasswordStrengthIndicator password={password} />
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="flex justify-end">
        <Button 
          type="button" 
          onClick={onNext}
          className="animate-fade-in"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
