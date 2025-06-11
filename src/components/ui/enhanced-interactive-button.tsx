
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const enhancedButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/95 hover:shadow-md",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/95 hover:shadow-md",
        outline:
          "border border-input bg-background hover:bg-accent/50 hover:text-accent-foreground active:bg-accent/30 dark:border-gray-700 hover:shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 active:bg-secondary/95 dark:bg-gray-800 dark:hover:bg-gray-700 hover:shadow-md",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground active:bg-accent/30",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg hover:from-brand-600 hover:to-brand-700 hover:shadow-xl active:from-brand-700 active:to-brand-800",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface EnhancedInteractiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  ripple?: boolean;
}

const EnhancedInteractiveButton = React.forwardRef<HTMLButtonElement, EnhancedInteractiveButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, ripple = true, children, ...props }, ref) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const Comp = asChild ? Slot : motion.button;

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsPressed(false);

    return (
      <Comp
        className={cn(enhancedButtonVariants({ variant, size, className }))}
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        aria-disabled={props.disabled || loading}
        aria-busy={loading}
        data-state={props.disabled || loading ? "disabled" : undefined}
        {...props}
      >
        {/* Ripple effect */}
        {ripple && isPressed && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-md"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
        
        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-inherit rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
        
        <motion.div
          className={cn("flex items-center gap-2", loading && "opacity-0")}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </Comp>
    );
  }
);

EnhancedInteractiveButton.displayName = "EnhancedInteractiveButton";

export { EnhancedInteractiveButton, enhancedButtonVariants };
