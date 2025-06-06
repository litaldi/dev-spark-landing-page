
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OnboardingStepData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  illustration?: React.ReactNode;
  targetSelector?: string;
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
  benefits: string[];
}

interface OnboardingStepProps {
  stepData: OnboardingStepData;
}

export const OnboardingStep = ({ stepData }: OnboardingStepProps) => {
  const { title, description, icon: Icon, benefits } = stepData;

  return (
    <div className="text-center space-y-6">
      {/* Icon with enhanced animation */}
      <motion.div 
        className="flex justify-center"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative p-4 bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-brand-800 rounded-2xl">
          <Icon className="h-8 w-8 text-brand-600 dark:text-brand-400" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-brand-200/40 to-transparent rounded-2xl"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <h2 
          id="onboarding-title"
          className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
        >
          {title}
        </h2>
        <p 
          id="onboarding-description"
          className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4"
        >
          {description}
        </p>
        
        {/* Benefits list */}
        <ul className="space-y-2 mb-6" role="list">
          {benefits.map((benefit, index) => (
            <motion.li
              key={benefit}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
              className="flex items-center text-sm text-gray-700 dark:text-gray-300"
            >
              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-3 flex-shrink-0" />
              {benefit}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};
