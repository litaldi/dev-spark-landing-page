
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cn } from "@/lib/utils"

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Trigger
    ref={ref}
    className={cn("focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
    {...props}
  >
    {children}
  </DrawerPrimitive.Trigger>
))
DrawerTrigger.displayName = DrawerPrimitive.Trigger.displayName

const DrawerClose = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>
>(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Close
    ref={ref}
    className={cn("focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
    {...props}
  >
    {children}
  </DrawerPrimitive.Close>
))
DrawerClose.displayName = DrawerPrimitive.Close.displayName

export { DrawerTrigger, DrawerClose }
