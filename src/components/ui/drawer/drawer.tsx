
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"
import { prefersReducedMotion, announceToScreenReader } from "@/lib/keyboard-utils"
import { DrawerContent } from "./drawer-content"
import { DrawerOverlay } from "./drawer-parts"
import { DrawerTrigger, DrawerClose } from "./drawer-triggers"
import { DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription } from "./drawer-layout"

const Drawer = ({
  shouldScaleBackground = true,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>) => {
  // Check for reduced motion preference
  const shouldReduceMotion = prefersReducedMotion();
  
  // Announce drawer state changes to screen readers
  const handleOpenChange = (open: boolean) => {
    if (open) {
      announceToScreenReader('Drawer opened', 'polite');
    } else {
      announceToScreenReader('Drawer closed', 'polite');
    }
    
    // Call the original onOpenChange if provided
    if (props.onOpenChange) {
      props.onOpenChange(open);
    }
  }

  return (
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldReduceMotion ? false : shouldScaleBackground}
      onOpenChange={handleOpenChange}
      {...props}
    >
      {children}
    </DrawerPrimitive.Root>
  )
}
Drawer.displayName = "Drawer"

const DrawerPortal = DrawerPrimitive.Portal

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerPortal,
  DrawerOverlay,
}
