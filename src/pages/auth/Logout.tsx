
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LogOut } from "lucide-react";

const LogoutPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Logged Out</CardTitle>
            <CardDescription className="text-center">
              Your session has ended
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col items-center">
            <div className="rounded-full bg-primary/10 p-6">
              <LogOut className="h-12 w-12 text-primary" />
            </div>
            
            <p className="text-center text-muted-foreground">
              You have been successfully logged out. Thank you for using our platform.
            </p>
            
            <div className="space-y-2 w-full pt-4">
              <Button 
                type="button" 
                className="w-full" 
                asChild
              >
                <Link to="/auth/login">Sign In Again</Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="link" className="px-0" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LogoutPage;
