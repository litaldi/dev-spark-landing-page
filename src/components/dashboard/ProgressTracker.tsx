
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, FileCheck, Code } from "lucide-react";

interface ProgressTrackerProps {
  weeklyGoalHours: number;
  currentHours: number;
  lessonsCompleted: number;
  projectsStarted: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  weeklyGoalHours,
  currentHours,
  lessonsCompleted,
  projectsStarted,
}) => {
  // Calculate percentages
  const hoursPercentage = Math.min(Math.round((currentHours / weeklyGoalHours) * 100), 100);
  
  // Get learning path completion percentage
  const totalLearningPathItems = 12; // This would ideally come from actual learning path data
  const learningPathCompletion = Math.round((lessonsCompleted / totalLearningPathItems) * 100);
  
  // Weeks streak calculation (example)
  const streakWeeks = Math.floor(Math.random() * 5) + 1; // Mock data, replace with actual tracking
  
  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-brand-500" aria-hidden="true" />
          Progress Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Weekly Goal Progress</span>
                <span className="text-sm font-medium">{currentHours}/{weeklyGoalHours} hrs</span>
              </div>
              <Progress value={hoursPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {hoursPercentage >= 100 
                  ? "Goal achieved! Great work!"
                  : `${hoursPercentage}% of your weekly goal completed`
                }
              </p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Learning Path Progress</span>
                <span className="text-sm font-medium">{learningPathCompletion}%</span>
              </div>
              <Progress value={learningPathCompletion} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {lessonsCompleted} of {totalLearningPathItems} lessons completed
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col items-center justify-center bg-muted rounded-md p-3">
                <FileCheck className="h-5 w-5 text-green-500 mb-2" />
                <span className="text-xl font-bold">{lessonsCompleted}</span>
                <span className="text-xs text-muted-foreground text-center">
                  Lessons Completed
                </span>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-muted rounded-md p-3">
                <Code className="h-5 w-5 text-blue-500 mb-2" />
                <span className="text-xl font-bold">{projectsStarted}</span>
                <span className="text-xs text-muted-foreground text-center">
                  Projects Started
                </span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/30 dark:to-brand-800/40 rounded-md p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Streak</span>
                <span className="text-xl font-bold">{streakWeeks} weeks</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Keep learning daily to maintain your streak!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
