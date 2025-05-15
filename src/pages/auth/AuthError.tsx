
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AlertCircle } from "lucide-react";

const AuthErrorPage = () => {
  const location = useLocation();
  const errorMessage = new URLSearchParams(location.search).get('error') || 
                      "An authentication error occurred";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Authentication Error</CardTitle>
            <CardDescription className="text-center">
              There was a problem with your authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col items-center">
            <div className="rounded-full bg-destructive/10 p-6">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            
            <p className="text-center text-foreground">
              {errorMessage}
            </p>
            
            <div className="space-y-2 w-full pt-4">
              <Button 
                type="button" 
                className="w-full" 
                asChild
              >
                <Link to="/auth/login">Try Again</Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Need help?{" "}
              <Button variant="link" className="px-0" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuthErrorPage;
