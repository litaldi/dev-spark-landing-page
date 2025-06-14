
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl px-0 rounded-xl bg-background shadow-2xl animate-fade-in">
        <DialogHeader className="flex items-center justify-between px-6 pt-4">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Play className="h-5 w-5 text-brand-500" />
            Interactive Live Demo
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close Demo">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="px-6 pb-6">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            {/* Placeholder for demo video or live playground */}
            <span className="text-muted-foreground text-base">[Demo goes here – e.g., video, playground, code preview]</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
