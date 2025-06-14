
import React from 'react';
import { motion } from 'framer-motion';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { EnhancedWebFirstLayout } from '@/components/layout/EnhancedWebFirstLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <EnhancedWebFirstLayout
      title="Sign Up - DevAI Learning Platform"
      description="Create your account and start learning"
      variant="minimal"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto p-4"
      >
        <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
            <CardDescription>
              Join thousands of developers advancing their skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to="/auth/login" 
                  className="font-medium text-primary hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </EnhancedWebFirstLayout>
  );
}
