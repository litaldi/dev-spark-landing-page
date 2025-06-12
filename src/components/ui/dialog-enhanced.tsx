
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

interface EnhancedDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  hideTitle?: boolean;
  hideDescription?: boolean;
  className?: string;
}

export function EnhancedDialog({ 
  children, 
  open, 
  onOpenChange, 
  title = "Dialog",
  description,
  hideTitle = false,
  hideDescription = false,
  className 
}: EnhancedDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-md", className)}>
        <DialogHeader>
          {hideTitle ? (
            <VisuallyHidden>
              <DialogTitle>{title}</DialogTitle>
            </VisuallyHidden>
          ) : (
            <DialogTitle>{title}</DialogTitle>
          )}
          {description && (
            hideDescription ? (
              <VisuallyHidden>
                <DialogDescription>{description}</DialogDescription>
              </VisuallyHidden>
            ) : (
              <DialogDescription>{description}</DialogDescription>
            )
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export function AccessibleDialogContent({ 
  children, 
  title = "Dialog", 
  description, 
  hideTitle = false,
  hideDescription = false,
  className,
  ...props 
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  hideTitle?: boolean;
  hideDescription?: boolean;
  className?: string;
} & React.ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent className={cn("sm:max-w-md", className)} {...props}>
      <DialogHeader>
        {hideTitle ? (
          <VisuallyHidden>
            <DialogTitle>{title}</DialogTitle>
          </VisuallyHidden>
        ) : (
          <DialogTitle>{title}</DialogTitle>
        )}
        {description && (
          hideDescription ? (
            <VisuallyHidden>
              <DialogDescription>{description}</DialogDescription>
            </VisuallyHidden>
          ) : (
            <DialogDescription>{description}</DialogDescription>
          )
        )}
      </DialogHeader>
      {children}
    </DialogContent>
  );
}
