
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";
import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGoogleLogin = () => {
    // Implementation would connect to Google OAuth
    setIsProcessing(true);
    console.log("Google login clicked");
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Google Sign-In",
        description: "Redirecting to Google authentication...",
      });
      setIsProcessing(false);
    }, 500);
  };

  const handleMagicLink = async (email: string) => {
    // Implementation would send a magic link
    setIsProcessing(true);
    console.log("Sending magic link to:", email);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Magic Link Sent",
      description: "Check your email inbox to continue.",
    });
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 bg-gradient-to-b from-background to-background/80">
      <SkipNavLink>Skip to content</SkipNavLink>
      
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
      </div>
      
      <SkipNavContent>
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <Link to="/" className="inline-block">
              <img 
                src="/logo.svg" 
                alt="DevSpark Logo" 
                className="h-10 mx-auto"
                onError={(e) => {
                  // Fallback if logo doesn't exist
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </Link>
          </div>
          
          <Card className="w-full shadow-lg border-opacity-50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-50 pointer-events-none" />
            <CardHeader className="space-y-1 relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Link to="/" className="text-sm">
                    Back to Home
                  </Link>
                </Button>
              </div>
              <CardDescription>
                Sign in to access your learning dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <LoginForm 
                onGoogleLogin={handleGoogleLogin} 
                onMagicLink={handleMagicLink} 
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-0 relative">
              <div className="text-center w-full">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Button variant="link" className="px-0" asChild>
                    <Link to="/auth/register" className="text-primary hover:text-primary/80 font-medium">
                      Create account
                    </Link>
                  </Button>
                </p>
              </div>
            </CardFooter>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="underline hover:text-foreground transition-colors">Terms</Link>
              {" "}and{" "}
              <Link to="/privacy" className="underline hover:text-foreground transition-colors">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </SkipNavContent>
    </div>
  );
};

export default LoginPage;
