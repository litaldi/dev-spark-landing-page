
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";
import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  const { toast } = useToast();

  const handleGoogleLogin = () => {
    // Implementation would connect to Google OAuth
    console.log("Google login clicked");
    toast({
      title: "Google Sign-In",
      description: "Redirecting to Google authentication...",
    });
  };

  const handleMagicLink = async (email: string) => {
    // Implementation would send a magic link
    console.log("Sending magic link to:", email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Magic Link Sent",
      description: "Check your email inbox to continue.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <SkipNavLink>Skip to content</SkipNavLink>
      
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <SkipNavContent>
        <div className="w-full max-w-md">
          <Card className="w-full shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
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
                Enter your credentials to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <LoginForm 
                onGoogleLogin={handleGoogleLogin} 
                onMagicLink={handleMagicLink} 
              />
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Button variant="link" className="px-0" asChild>
                  <Link to="/auth/register">Sign up</Link>
                </Button>
              </p>
            </CardFooter>
          </Card>
        </div>
      </SkipNavContent>
    </div>
  );
};

export default LoginPage;
