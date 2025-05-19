
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"
import { announceToScreenReader } from "@/lib/keyboard-utils"

const Drawer = ({
  shouldScaleBackground = true,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>) => {
  // Announce drawer state changes to screen readers
  const handleOpenChange = (open: boolean) => {
    if (open) {
      announceToScreenReader('Drawer opened', 'polite')
    } else {
      announceToScreenReader('Drawer closed', 'polite')
    }
  }

  return (
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      onOpenChange={handleOpenChange}
      {...props}
    >
      {children}
    </DrawerPrimitive.Root>
  )
}
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  
  // Use keyboard navigation hook to trap focus and handle escape key
  useKeyboardNavigation(contentRef, {
    trapFocus: true,
    autoFocus: true,
    enabled: isOpen
  })

  // Handle open state change
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    // Call the original onOpenChange if provided
    if (props.onOpenChange) {
      props.onOpenChange(open)
    }
  }

  // Extract onOpenChange from props to avoid passing it twice
  const { onOpenChange, ...otherProps } = props

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={(node) => {
          // Handle both the forwarded ref and our local ref
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
          contentRef.current = node
        }}
        onOpenChange={handleOpenChange}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background focus:outline-none",
          className
        )}
        {...otherProps}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
})
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
