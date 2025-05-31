
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

export function GetStartedModal({ isOpen, onClose, onGetStarted }: GetStartedModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby="get-started-description">
        <DialogHeader>
          <DialogTitle>Get Started with DevAI</DialogTitle>
          <DialogDescription id="get-started-description">
            Join thousands of developers enhancing their skills with AI-powered learning.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">
            Ready to accelerate your learning journey? Create your account now and get access to:
          </p>
          
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Personalized AI-powered recommendations</li>
            <li>• Interactive coding challenges</li>
            <li>• Real-time code review and feedback</li>
            <li>• Progress tracking and achievements</li>
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={onGetStarted} 
              className="flex-1 bg-brand-500 hover:bg-brand-600"
            >
              Start Learning Now
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Maybe Later
            </Button>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>
      </DialogContent>
    </Dialog>
  );
}
