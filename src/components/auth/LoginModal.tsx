
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleLogin?: () => void;
  onGithubLogin?: () => void;
  onMagicLink?: (email: string) => void;
}

export function LoginModal({ 
  isOpen, 
  onClose, 
  onGoogleLogin, 
  onGithubLogin, 
  onMagicLink 
}: LoginModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign In to Your Account</DialogTitle>
          <DialogDescription>
            Welcome back! Please sign in to continue your learning journey.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <LoginForm
            onGoogleLogin={onGoogleLogin}
            onGithubLogin={onGithubLogin}
            onMagicLink={onMagicLink}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
          aria-label="Close login modal"
        >
          <X className="h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}
