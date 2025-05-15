
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Mail } from "lucide-react";

const MagicLinkPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Get email from URL or localStorage
  const email = new URLSearchParams(window.location.search).get('email') || 
                localStorage.getItem('magicLinkEmail') || 
                'your email';

  const handleResend = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call to resend magic link
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Magic Link Resent",
        description: "Check your email inbox for a new login link.",
      });
    } catch (error) {
      console.error("Resend error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Check Your Email</CardTitle>
            <CardDescription className="text-center">
              We've sent a magic link to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col items-center">
            <div className="rounded-full bg-primary/10 p-6">
              <Mail className="h-12 w-12 text-primary" />
            </div>
            
            <Alert className="bg-primary/10 border-primary text-foreground">
              <AlertTitle>Magic link sent</AlertTitle>
              <AlertDescription>
                We've sent a login link to <strong>{email}</strong>.
                <br />
                Click the link in your email to sign in.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2 w-full pt-4">
              <Button 
                type="button" 
                className="w-full" 
                onClick={handleResend}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Resend Magic Link"}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Want to try another method?{" "}
              <Button variant="link" className="px-0" asChild>
                <Link to="/auth/login">Back to Sign In</Link>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MagicLinkPage;
