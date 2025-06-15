
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JoinNowSection: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    "Unlimited practice sessions",
    "AI-powered feedback and coaching",
    "Multiple client personality types",
    "Progress tracking and analytics",
    "Mobile and desktop access",
    "30-day money-back guarantee"
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-950 dark:to-brand-900">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-brand-100 mb-6">
            Ready to Transform Your Sales Performance?
          </h2>
          <p className="text-lg text-brand-700 dark:text-brand-300 mb-8">
            Join thousands of sales professionals who have already improved their conversation skills with VoiceSeller.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-brand-800 dark:text-brand-200">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-brand-800 rounded-lg p-6 shadow-lg">
                <div className="text-3xl font-bold text-brand-900 dark:text-brand-100 mb-2">
                  Start Free
                </div>
                <div className="text-brand-600 dark:text-brand-400 mb-4">
                  No credit card required
                </div>
                <Button 
                  size="lg" 
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white"
                  onClick={() => navigate('/auth/register')}
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <p className="text-sm text-brand-600 dark:text-brand-400">
                Trusted by sales teams at 500+ companies worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinNowSection;
