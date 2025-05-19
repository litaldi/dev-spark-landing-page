
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { announceToScreenReader, getFocusableElements } from "@/lib/keyboard-utils"

const Popover = PopoverPrimitive.Root;
Popover.displayName = "Popover"

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    className={cn("focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
    {...props}
  />
))
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    /**
     * Whether to announce the popover opening/closing to screen readers
     */
    announceChanges?: boolean
  }
>(({ className, align = "center", sideOffset = 4, announceChanges = true, ...props }, ref) => {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  
  // Focus the first focusable element when the popover opens
  React.useEffect(() => {
    if (isOpen && contentRef.current) {
      const elements = getFocusableElements(contentRef.current);
      if (elements.length > 0) {
        setTimeout(() => {
          elements[0].focus();
        }, 50);
      }
    }
  }, [isOpen]);
  
  // Handle keyboard navigation within the popover
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!contentRef.current || !isOpen) return;
      
      // Handle escape key
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      
      // Handle tab key for focus trapping
      if (e.key === 'Tab') {
        const elements = getFocusableElements(contentRef.current);
        if (elements.length === 0) return;
        
        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];
        const activeElement = document.activeElement;
        
        if (e.shiftKey && activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Custom handler for announcements
  const handleStateChange = React.useCallback((open: boolean) => {
    if (announceChanges) {
      if (open) {
        announceToScreenReader('Popover opened', 'polite');
      } else {
        announceToScreenReader('Popover closed', 'polite');
      }
    }
    
    setIsOpen(open);
  }, [announceChanges]);

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={(node) => {
          // Handle both the forwarded ref and our local ref
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
          contentRef.current = node
        }}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        role="dialog"
        aria-modal="true"
        onOpenAutoFocus={(e) => {
          // Let our custom focus management handle it
          e.preventDefault();
        }}
        onCloseAutoFocus={(e) => {
          // Default behavior is fine for auto-focus on close
        }}
        onOpenChange={handleStateChange}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
})
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
