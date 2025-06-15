
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, X } from 'lucide-react';

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            VoiceSeller Demo
          </DialogTitle>
          <DialogDescription>
            Watch how VoiceSeller helps sales professionals practice and improve their conversation skills.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Demo video coming soon</p>
              <p className="text-sm text-muted-foreground mt-2">
                In the meantime, try our practice sessions to experience VoiceSeller firsthand!
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">What you'll see in the demo:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Real-time voice conversation with AI clients</li>
              <li>• Instant feedback on your sales approach</li>
              <li>• Progress tracking and skill development</li>
              <li>• Multiple scenario types and difficulty levels</li>
            </ul>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={() => {
              onOpenChange(false);
              // Navigate to practice page
              window.location.href = '/practice';
            }}>
              Try Practice Session
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
