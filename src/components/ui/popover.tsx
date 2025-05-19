
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { announceToScreenReader } from "@/lib/keyboard-utils"

const Popover = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>
>(({ children, ...props }, ref) => {
  // Announce popover state changes to screen readers
  const handleOpenChange = (open: boolean) => {
    if (open) {
      announceToScreenReader('Popover opened', 'polite')
    } else {
      announceToScreenReader('Popover closed', 'polite')
    }
  }

  return (
    <PopoverPrimitive.Root 
      onOpenChange={handleOpenChange}
      {...props}
    >
      {children}
    </PopoverPrimitive.Root>
  )
})
Popover.displayName = "Popover"

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
  const contentRef = React.useRef<HTMLDivElement>(null)

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
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
})
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
