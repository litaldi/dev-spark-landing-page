
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Started with DevAI</DialogTitle>
          <DialogDescription>
            Choose how you'd like to begin your learning journey
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Link to="/auth/register">
            <Button className="w-full" size="lg" onClick={onClose}>
              Create Free Account
            </Button>
          </Link>
          <Link to="/auth/login">
            <Button variant="outline" className="w-full" size="lg" onClick={onClose}>
              Sign In
            </Button>
          </Link>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
