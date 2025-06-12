
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEOHead } from '@/components/seo/SEOHead';
import { SkipNavLink, SkipNavContent } from '@/components/a11y/skip-nav';

const NotFound: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Page Not Found - DevAI"
        description="The page you're looking for doesn't exist. Return to DevAI homepage."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
        <SkipNavLink contentId="main-content">Skip to main content</SkipNavLink>
        
        <SkipNavContent id="main-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card>
              <CardHeader className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                >
                  <Search className="w-10 h-10 text-primary" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CardTitle className="text-3xl font-bold mb-2">404</CardTitle>
                  <CardDescription className="text-lg">
                    Oops! This page seems to have wandered off into the digital void.
                  </CardDescription>
                </motion.div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-muted-foreground"
                >
                  The page you're looking for doesn't exist or has been moved. 
                  Let's get you back to learning!
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col gap-3 pt-4"
                >
                  <Link to="/" className="block">
                    <Button className="w-full" size="lg">
                      <Home className="w-4 h-4 mr-2" />
                      Go to Homepage
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => window.history.back()}
                    className="w-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center pt-4"
                >
                  <p className="text-sm text-muted-foreground">
                    Need help?{' '}
                    <Link to="/help" className="text-primary hover:underline">
                      Contact support
                    </Link>
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </SkipNavContent>
      </div>
    </>
  );
};

export default NotFound;
