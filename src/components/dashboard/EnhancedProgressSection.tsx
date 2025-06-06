
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Trophy, Clock, BookOpen, Target } from "lucide-react";
import { motion } from 'framer-motion';
import { StatCard } from './StatCard';
import { WeeklyProgressCard } from './WeeklyProgressCard';

interface ProgressSectionProps {
  weeklyGoalHours: number;
  currentHours: number;
  streakDays: number;
  lessonsCompleted: number;
  projectsStarted: number;
  isLoading: boolean;
}

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
          
          <WeeklyProgressCard 
            weeklyProgress={weeklyProgress}
            delay={0.6}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};
