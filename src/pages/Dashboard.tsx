
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/auth/use-auth';
import { EnhancedDashboardContent } from '@/components/dashboard/EnhancedDashboardContent';
import { SEOHead } from '@/components/seo/SEOHead';
import { SkipNavLink, SkipNavContent } from '@/components/a11y/skip-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { isAuthenticated, getCurrentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading time for demo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const currentUser = getCurrentUser();

  if (!isAuthenticated()) {
    return (
      <>
        <SEOHead 
          title="Dashboard - DevAI"
          description="Access your learning dashboard and track your progress"
        />
        
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <SkipNavLink contentId="main-content">Skip to main content</SkipNavLink>
          
          <SkipNavContent id="main-content">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>Access Required</CardTitle>
                  <CardDescription>
                    Please log in to access your dashboard and continue your learning journey.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link to="/auth/login" className="block">
                    <Button className="w-full" size="lg">
                      <LogIn className="w-4 h-4 mr-2" />
                      Log In to Dashboard
                    </Button>
                  </Link>
                  <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/auth/register" className="text-primary hover:underline">
                      Sign up here
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </SkipNavContent>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Dashboard - DevAI"
        description="Your personalized learning dashboard with AI-powered recommendations"
      />
      
      <div className="min-h-screen bg-background">
        <SkipNavLink contentId="main-content">Skip to main content</SkipNavLink>
        
        <SkipNavContent id="main-content">
          <main className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EnhancedDashboardContent
                userName={currentUser?.name || 'Student'}
                isFirstTimeUser={currentUser?.isFirstTimeUser || false}
                isLoading={isLoading}
                onError={setError}
              />
            </motion.div>
          </main>
        </SkipNavContent>
      </div>
    </>
  );
};

export default Dashboard;
