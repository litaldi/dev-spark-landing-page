
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Trophy, Clock, BookOpen, Target } from "lucide-react";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressSectionProps {
  weeklyGoalHours: number;
  currentHours: number;
  streakDays: number;
  lessonsCompleted: number;
  projectsStarted: number;
  isLoading: boolean;
}

const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  subtext, 
  progress, 
  color = "blue",
  delay = 0 
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtext?: string;
  progress?: number;
  color?: "blue" | "green" | "orange" | "purple";
  delay?: number;
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

export const EnhancedProgressSection: React.FC<ProgressSectionProps> = ({
  weeklyGoalHours,
  currentHours,
  streakDays,
  lessonsCompleted,
  projectsStarted,
  isLoading
}) => {
  const weeklyProgress = Math.min((currentHours / weeklyGoalHours) * 100, 100);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              aria-label="Loading progress data"
            >
              <Target className="h-5 w-5" />
            </motion.div>
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse" aria-hidden="true">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-24"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              aria-hidden="true"
            >
              <Target className="h-5 w-5 text-brand-600" />
            </motion.div>
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Clock}
              label="Weekly Goal"
              value={`${currentHours}h`}
              subtext={`of ${weeklyGoalHours}h goal`}
              progress={weeklyProgress}
              color="blue"
              delay={0.1}
            />
            
            <StatCard
              icon={Flame}
              label="Learning Streak"
              value={`${streakDays}`}
              subtext="days in a row"
              color="orange"
              delay={0.2}
            />
            
            <StatCard
              icon={BookOpen}
              label="Lessons Done"
              value={lessonsCompleted}
              subtext="completed"
              color="green"
              delay={0.3}
            />
            
            <StatCard
              icon={Trophy}
              label="Projects"
              value={projectsStarted}
              subtext="started"
              color="purple"
              delay={0.4}
            />
          </div>
          
          {/* Enhanced weekly progress visualization */}
          <motion.div 
            className="mt-6 p-4 bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-950/30 dark:to-brand-900/30 rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
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
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            >
              <Progress 
                value={weeklyProgress} 
                className="h-3 bg-brand-200 dark:bg-brand-800" 
                aria-label={`Weekly goal progress: ${Math.round(weeklyProgress)}% complete`}
              />
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
