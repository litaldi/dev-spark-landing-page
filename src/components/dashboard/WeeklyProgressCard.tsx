
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';

interface WeeklyProgressCardProps {
  weeklyProgress: number;
  delay?: number;
}

export const WeeklyProgressCard: React.FC<WeeklyProgressCardProps> = ({
  weeklyProgress,
  delay = 0.6
}) => {
  return (
    <motion.div 
      className="mt-6 p-4 bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-950/30 dark:to-brand-900/30 rounded-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      role="region"
      aria-labelledby="weekly-progress-title"
    >
      <div className="flex justify-between items-center mb-3">
        <h4 
          id="weekly-progress-title"
          className="font-medium text-brand-900 dark:text-brand-100"
        >
          This Week's Progress
        </h4>
        <motion.span 
          className="text-sm font-bold text-brand-600 dark:text-brand-400"
          key={weeklyProgress}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          aria-live="polite"
        >
          {Math.round(weeklyProgress)}%
        </motion.span>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
      >
        <Progress 
          value={weeklyProgress} 
          className="h-3 bg-brand-200 dark:bg-brand-800" 
          aria-label={`Weekly goal progress: ${Math.round(weeklyProgress)}% complete`}
        />
      </motion.div>
    </motion.div>
  );
};
