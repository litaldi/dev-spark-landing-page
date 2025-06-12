
import React from 'react';
import { motion } from 'framer-motion';
import { SEOHead } from '@/components/seo/SEOHead';
import { SkipNavLink, SkipNavContent } from '@/components/a11y/skip-nav';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const RegisterPage: React.FC = () => {
  return (
    <React.Fragment>
      <SEOHead 
        title="Register - DevAI"
        description="Join DevAI and start your AI-powered programming education journey"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <SkipNavLink contentId="main-content">Skip to main content</SkipNavLink>
        
        {/* Header */}
        <header className="p-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </header>

        <SkipNavContent id="main-content">
          <main className="flex items-center justify-center px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full text-primary-foreground font-bold text-xl mb-4"
                >
                  DA
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-foreground mb-2"
                >
                  Join DevAI
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground"
                >
                  Start your AI-powered programming journey today
                </motion.p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Get started with personalized AI learning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Registration form coming soon!
                    </p>
                    <Link to="/auth/login">
                      <Button>
                        Go to Login
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-6"
              >
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/auth/login" className="text-primary hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </main>
        </SkipNavContent>
      </div>
    </React.Fragment>
  );
};

export default RegisterPage;
