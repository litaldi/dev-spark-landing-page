
import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  showPasswordToggle?: boolean;
  icon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ 
    label, 
    error, 
    success, 
    helperText, 
    showPasswordToggle = false,
    icon,
    variant = 'default',
    className,
    type = 'text',
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);
    const id = useId();
    
    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;
    const isFloating = isFocused || hasValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    return (
      <div className="space-y-2">
        <div className="relative">
          {/* Background for filled variant */}
          {variant === 'filled' && (
            <div className="absolute inset-0 bg-muted/50 rounded-lg" />
          )}
          
          {/* Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={id}
            type={inputType}
            className={cn(
              'peer w-full h-14 px-4 pt-6 pb-2 bg-transparent border rounded-lg transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              icon && 'pl-11',
              showPasswordToggle && 'pr-12',
              variant === 'filled' && 'bg-muted/50',
              variant === 'outlined' && 'border-2',
              error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
              success && 'border-green-500 focus:border-green-500 focus:ring-green-500/20',
              className
            )}
            placeholder=""
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            {...props}
          />

          {/* Floating Label */}
          <motion.label
            htmlFor={id}
            className={cn(
              'absolute left-4 text-muted-foreground pointer-events-none transition-all duration-200',
              icon && 'left-11',
              isFloating ? 'top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base',
              isFocused && 'text-primary',
              error && 'text-destructive',
              success && 'text-green-600'
            )}
            animate={{
              y: isFloating ? 0 : 0,
              scale: isFloating ? 0.85 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>

          {/* Password Toggle */}
          {showPasswordToggle && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}

          {/* Success/Error Icons */}
          {(error || success) && !showPasswordToggle && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {error && <AlertCircle className="w-4 h-4 text-destructive" />}
              {success && <Check className="w-4 h-4 text-green-500" />}
            </div>
          )}

          {/* Focus Ring Animation */}
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-primary pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: isFocused ? 0.2 : 0, 
              scale: isFocused ? 1 : 0.95 
            }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Helper Text / Error Message */}
        <AnimatePresence mode="wait">
          {(error || helperText) && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'text-sm flex items-center gap-1',
                error ? 'text-destructive' : 'text-muted-foreground'
              )}
            >
              {error && <AlertCircle className="w-3 h-3" />}
              {error || helperText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

FloatingLabelInput.displayName = 'FloatingLabelInput';
