
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";

const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    // Implementation would connect to Google OAuth
    console.log("Google signup clicked");
    toast({
      title: "Google Sign-Up",
      description: "Redirecting to Google authentication...",
    });
    setIsLoading(false);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-background p-4"
      aria-labelledby="register-page-title"
    >
      <SkipNavLink>Skip to content</SkipNavLink>
      
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <SkipNavContent>
        <div className="w-full max-w-md">
          <Card className="w-full shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold" id="register-page-title">Create an account</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                >
                  <Link to="/" className="text-sm text-muted-foreground">
                    Back to Home
                  </Link>
                </Button>
              </div>
              <CardDescription>
                Get started by filling in your information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RegisterForm onGoogleSignUp={handleGoogleSignUp} />
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button variant="link" className="px-0" asChild>
                  <Link to="/auth/login">Sign in</Link>
                </Button>
              </p>
            </CardFooter>
          </Card>
        </div>
      </SkipNavContent>
    </div>
  );
};

export default RegisterPage;
