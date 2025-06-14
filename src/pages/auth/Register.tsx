
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { EnhancedRegisterForm } from "@/components/auth/EnhancedRegisterForm";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";
import { ArrowLeft, Sparkles } from "lucide-react";
import { LoginSuccess } from "@/components/auth/LoginSuccess";
import { useAuth } from "@/hooks/auth";
import { useBreakpoint } from "@/hooks/use-mobile";

const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { showLoginSuccess, currentUser } = useAuth({
    showSuccessScreen: true,
    redirectTo: "/auth/onboarding"
  });
  
  const breakpoint = useBreakpoint();
  const isSmallScreen = breakpoint === "xs" || breakpoint === "mobile";

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    console.log("Google signup clicked");
    
    setTimeout(() => {
      toast({
        title: "Google Sign-Up",
        description: "Redirecting to Google authentication...",
      });
      setIsLoading(false);
    }, 800);
  };

  if (showLoginSuccess && currentUser) {
    return (
      <LoginSuccess 
        userName={currentUser.name} 
        redirectTo="/auth/onboarding"
        isFirstTimeUser={true}
      />
    );
  }

  return (
    <AnimatedBackground variant="geometric" className="min-h-screen">
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm p-4"
        aria-labelledby="register-page-title"
      >
        <SkipNavLink contentId="main-content">Skip to content</SkipNavLink>
        
        <motion.div 
          className="absolute top-4 right-4 flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ThemeToggle />
        </motion.div>
        
        <SkipNavContent id="main-content">
          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo Section */}
            <motion.div 
              className="mb-6 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <Link to="/" className="inline-block group">
                <motion.div 
                  className="flex items-center justify-center gap-2 text-2xl font-bold text-primary"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Sparkles className="h-8 w-8" />
                  DevSpark
                </motion.div>
                <p className="text-sm text-muted-foreground mt-1">
                  Ignite your development journey
                </p>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card className="w-full shadow-2xl border-border/50 backdrop-blur-sm bg-background/80 overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
                
                <CardHeader className="space-y-1 relative p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className={`${isSmallScreen ? 'text-xl' : 'text-2xl'} font-bold`} id="register-page-title">
                        Join DevSpark
                      </CardTitle>
                      <CardDescription className="text-sm mt-2">
                        Create your account to start your learning journey
                      </CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Link to="/" className="flex items-center gap-1">
                        <ArrowLeft className="h-4 w-4" />
                        {!isSmallScreen && <span>Home</span>}
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="relative p-6 pt-0">
                  <EnhancedRegisterForm onGoogleSignUp={handleGoogleSignUp} />
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4 pt-0 relative p-6">
                  <div className="text-center w-full">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Button variant="link" className="px-0 h-auto text-sm" asChild>
                        <Link to="/auth/login" className="text-primary hover:text-primary/80 font-medium">
                          Sign in
                        </Link>
                      </Button>
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <p className="text-xs text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="underline hover:text-foreground transition-colors">Terms</Link>
                {" "}and{" "}
                <Link to="/privacy" className="underline hover:text-foreground transition-colors">Privacy Policy</Link>
              </p>
            </motion.div>
          </motion.div>
        </SkipNavContent>
      </div>
    </AnimatedBackground>
  );
};

export default RegisterPage;
