
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface EnhancedProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  animated?: boolean;
}

export const EnhancedProgressIndicator: React.FC<EnhancedProgressIndicatorProps> = ({
  steps,
  currentStep,
  className = '',
  orientation = 'horizontal',
  showLabels = true,
  animated = true
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={cn(
      'flex items-center gap-4',
      isHorizontal ? 'flex-row' : 'flex-col',
      className
    )}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <div
            key={step.id}
            className={cn(
              'flex items-center gap-3',
              isHorizontal ? 'flex-row' : 'flex-col'
            )}
          >
            {/* Step Circle */}
            <motion.div
              className={cn(
                'relative flex items-center justify-center rounded-full border-2 transition-all duration-300',
                'w-10 h-10',
                isCompleted && 'bg-primary border-primary text-primary-foreground',
                isCurrent && 'bg-primary/10 border-primary text-primary',
                isUpcoming && 'bg-muted border-muted-foreground/30 text-muted-foreground'
              )}
              initial={animated ? { scale: 0.8, opacity: 0 } : false}
              animate={animated ? { scale: 1, opacity: 1 } : false}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="number"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-semibold"
                  >
                    {index + 1}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pulse animation for current step */}
              {isCurrent && animated && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
            </motion.div>

            {/* Step Labels */}
            {showLabels && (
              <motion.div
                className={cn(
                  'flex flex-col',
                  isHorizontal ? 'text-left' : 'text-center'
                )}
                initial={animated ? { opacity: 0, y: 10 } : false}
                animate={animated ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.3, delay: (index * 0.1) + 0.1 }}
              >
                <span className={cn(
                  'text-sm font-medium transition-colors',
                  isCompleted && 'text-foreground',
                  isCurrent && 'text-primary',
                  isUpcoming && 'text-muted-foreground'
                )}>
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </span>
                )}
              </motion.div>
            )}

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <motion.div
                className={cn(
                  'bg-muted transition-all duration-500',
                  isHorizontal ? 'h-0.5 w-8' : 'w-0.5 h-8'
                )}
                initial={animated ? { scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0 } : false}
                animate={animated ? { 
                  scaleX: 1, 
                  scaleY: 1,
                  backgroundColor: index < currentStep ? 'rgb(var(--primary))' : undefined
                } : false}
                transition={{ duration: 0.3, delay: (index * 0.1) + 0.2 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
