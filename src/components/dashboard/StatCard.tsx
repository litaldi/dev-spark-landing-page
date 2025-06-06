
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtext?: string;
  progress?: number;
  color?: "blue" | "green" | "orange" | "purple";
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  subtext, 
  progress, 
  color = "blue",
  delay = 0 
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600", 
    orange: "from-orange-500 to-orange-600",
    purple: "from-purple-500 to-purple-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="relative overflow-hidden group cursor-pointer">
        <motion.div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
            colorClasses[color]
          )}
        />
        <CardContent className="p-4 relative">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <motion.div 
                className="text-2xl font-bold"
                key={value}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                aria-live="polite"
              >
                {value}
              </motion.div>
              {subtext && (
                <p className="text-xs text-muted-foreground">{subtext}</p>
              )}
            </div>
            <motion.div 
              className={cn(
                "p-2 rounded-lg bg-gradient-to-br",
                colorClasses[color]
              )}
              whileHover={{ 
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.5 }
              }}
              aria-hidden="true"
            >
              <Icon className="h-5 w-5 text-white" />
            </motion.div>
          </div>
          {progress !== undefined && (
            <motion.div 
              className="mt-3"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: delay + 0.3, duration: 0.6 }}
            >
              <Progress 
                value={progress} 
                className="h-2" 
                aria-label={`${label} progress: ${Math.round(progress)}%`}
              />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
