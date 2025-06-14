
import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  animation?: 'bounce' | 'scale' | 'slide' | 'glow' | 'none';
  motionProps?: Omit<MotionProps, 'ref'>;
}

export const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({
    className,
    variant = 'default',
    size = 'default',
    loading = false,
    leftIcon,
    rightIcon,
    animation = 'scale',
    motionProps,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'relative overflow-hidden'
    );

    const variants = {
      default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
      outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
      gradient: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl'
    };

    const sizes = {
      default: 'h-11 px-6 py-2',
      sm: 'h-9 px-4 text-xs',
      lg: 'h-12 px-8 text-base',
      icon: 'h-10 w-10'
    };

    const animations = {
      bounce: {
        whileTap: { scale: 0.95 },
        whileHover: { y: -2 },
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
      scale: {
        whileTap: { scale: 0.95 },
        whileHover: { scale: 1.02 },
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
      slide: {
        whileTap: { x: 2 },
        whileHover: { x: 4 },
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
      glow: {
        whileHover: { 
          boxShadow: "0 0 20px rgba(var(--primary), 0.5)",
          scale: 1.02
        },
        whileTap: { scale: 0.98 }
      },
      none: {}
    };

    const motionSettings = animation !== 'none' ? {
      ...animations[animation],
      ...motionProps
    } : motionProps;

    return (
      <motion.button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...motionSettings}
        {...props}
      >
        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-current/10 rounded-lg"
          >
            <Loader className="w-4 h-4 animate-spin" />
          </motion.div>
        )}

        {/* Button Content */}
        <motion.div
          className="flex items-center gap-2"
          initial={false}
          animate={{ opacity: loading ? 0.3 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {leftIcon && (
            <motion.span
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {leftIcon}
            </motion.span>
          )}
          
          {children && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {children}
            </motion.span>
          )}
          
          {rightIcon && (
            <motion.span
              initial={{ x: 5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {rightIcon}
            </motion.span>
          )}
        </motion.div>

        {/* Gradient overlay for gradient variant */}
        {variant === 'gradient' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        )}
      </motion.button>
    );
  }
);

EnhancedButton.displayName = 'EnhancedButton';
