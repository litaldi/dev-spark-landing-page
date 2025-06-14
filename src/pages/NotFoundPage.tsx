
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { EnhancedWebFirstLayout } from '@/components/layout/EnhancedWebFirstLayout';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <EnhancedWebFirstLayout
      title="Page Not Found - DevAI Learning Platform"
      description="The page you're looking for doesn't exist"
      variant="minimal"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto p-4 text-center"
      >
        <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm">
          <CardContent className="pt-8 pb-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-6xl mb-6"
            >
              🤖
            </motion.div>
            
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              404
            </h1>
            
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Page Not Found
            </h2>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Oops! It looks like this page took a wrong turn in the code. 
              Let's get you back on track to your learning journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              
              <Link to="/">
                <Button className="flex items-center gap-2 w-full sm:w-auto">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Need help? <Link to="/contact" className="text-primary hover:underline">Contact support</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </EnhancedWebFirstLayout>
  );
}
