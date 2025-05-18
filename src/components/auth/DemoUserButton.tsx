
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function DemoUserButton() {
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

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <Button
      onClick={handleDemoLogin}
      variant="outline" 
      size="sm"
      className="flex items-center gap-2 border-brand-500 text-brand-600 hover:bg-brand-50 dark:border-brand-400 dark:text-brand-400 dark:hover:bg-brand-900/20"
      aria-label="Try as demo user"
    >
      <UserRound className="h-4 w-4" />
      <span className="hidden md:inline">Try Demo</span>
    </Button>
  );
}
