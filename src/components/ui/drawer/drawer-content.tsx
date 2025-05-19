
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cn } from "@/lib/utils"
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"
import { DrawerOverlay } from "./drawer-parts"

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const firstFocusableElementRef = React.useRef<HTMLElement | null>(null)
  
  // Use keyboard navigation hook to trap focus and handle escape key
  useKeyboardNavigation(contentRef, {
    trapFocus: true,
    autoFocus: true,
    enabled: isOpen
  })

  // Extract any onOpenChange prop separately since it's not supported
  // by DrawerPrimitive.Content
  const { onOpenChange, ...contentProps } = props as any
  
  // Handle state changes and trigger the parent handler if provided
  const handleStateChange = (open: boolean) => {
    setIsOpen(open)
    if (onOpenChange && typeof onOpenChange === 'function') {
      onOpenChange(open)
    }
    
    if (open) {
      // When opened, find the first focusable element and focus it
      setTimeout(() => {
        if (contentRef.current) {
          const focusableElements = Array.from(
            contentRef.current.querySelectorAll(
              'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          ) as HTMLElement[];
          
          if (focusableElements.length > 0) {
            firstFocusableElementRef.current = focusableElements[0];
            focusableElements[0].focus();
          }
        }
      }, 100);
    }
  }

  // Monitor the open state using an effect and React's forwardRef pattern
  React.useEffect(() => {
    const drawerContent = contentRef.current
    if (!drawerContent) return

    // Create a mutation observer to detect when the drawer opens/closes
    // by looking at data-state attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-state') {
          const isNowOpen = drawerContent.getAttribute('data-state') === 'open'
          handleStateChange(isNowOpen)
        }
      })
    })

    observer.observe(drawerContent, { attributes: true })
    return () => observer.disconnect()
  }, [])

  return (
    <DrawerPrimitive.Portal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={(node) => {
          // Handle both the forwarded ref and our local ref
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
          contentRef.current = node
        }}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background focus:outline-none",
          className
        )}
        {...contentProps}
        role="dialog"
        aria-modal="true"
      >
        <div 
          className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" 
          role="presentation" 
          aria-hidden="true"
        />
        
        {/* Skip to close button for keyboard users */}
        <a 
          href="#drawer-close" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4"
        >
          Skip to close button
        </a>
        
        {children}
        
        {/* Ensure there's a way to close the drawer with keyboard */}
        <button
          id="drawer-close"
          onClick={() => handleStateChange(false)}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
        >
          Close drawer
        </button>
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  )
})
DrawerContent.displayName = "DrawerContent"
