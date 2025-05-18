
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background transition-all duration-200 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/60 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:placeholder:text-gray-500 dark:focus-visible:ring-brand-500 dark:focus-visible:border-brand-500 md:text-sm",
          className
        )}
        ref={ref}
        aria-invalid={props["aria-invalid"]}
        aria-describedby={props["aria-describedby"]}
        aria-required={props["aria-required"] || props.required}
        data-state={props.disabled ? "disabled" : undefined}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
