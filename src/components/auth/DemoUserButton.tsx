
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ButtonProps } from "@/components/ui/button";

interface DemoUserButtonProps extends Omit<ButtonProps, "onClick"> {
  variant?: "default" | "outline";
  showText?: boolean;
  onSuccess?: () => void;
}

export function DemoUserButton({ 
  variant = "outline",
  showText = true,
  onSuccess,
  className,
  ...props
}: DemoUserButtonProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDemoLogin = () => {
    // Set demo user data in localStorage
    localStorage.setItem("isDemoUser", "true");
    localStorage.setItem("userName", "Demo User");
    localStorage.setItem("userEmail", "demo@looplist.app");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("onboardingComplete", "true");

    // Show success toast
    toast({
      title: "Demo Mode Activated",
      description: "You've been logged in as a demo user.",
    });

    // Call onSuccess if provided
    if (onSuccess) {
      onSuccess();
    }

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <Button
      onClick={handleDemoLogin}
      variant={variant} 
      size="sm"
      className={`flex items-center gap-2 ${variant === "outline" ? "border-brand-500 text-brand-600 hover:bg-brand-50 dark:border-brand-400 dark:text-brand-400 dark:hover:bg-brand-900/20" : ""} ${className || ""}`}
      aria-label="Try as demo user"
      {...props}
    >
      <UserRound className="h-4 w-4" />
      {showText && <span className={showText === true ? "hidden md:inline" : ""}>Try Demo</span>}
    </Button>
  );
}
