
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Book, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressSectionProps {
  weeklyGoalHours: number;
  currentHours: number;
  streakDays: number;
  lessonsCompleted: number;
  projectsStarted: number;
  isLoading: boolean;
}

export const ProgressSection = ({
  weeklyGoalHours = 10,
  currentHours = 2,
  streakDays = 5,
  lessonsCompleted = 2,
  projectsStarted = 1,
  isLoading = false
}: ProgressSectionProps) => {
  const progressPercentage = Math.round((currentHours / weeklyGoalHours) * 100);
  
  const stats = [
    {
      value: lessonsCompleted,
      label: "Lessons completed",
      icon: <Book className="h-5 w-5 text-brand-600 dark:text-brand-400" />,
      color: "border-brand-200 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-900/20"
    },
    {
      value: projectsStarted,
      label: "Projects started",
      icon: <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
      color: "border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/20"
    },
    {
      value: streakDays,
      label: "Days streak",
      icon: <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
      color: "border-emerald-200 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/20"
    }
  ];

  return (
    <Card className="border border-gray-200 dark:border-gray-700 mb-6 animate-fade-in">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl md:text-2xl">Your Progress</CardTitle>
          <CalendarDays className="text-muted-foreground h-5 w-5" />
        </div>
        <CardDescription>
          Track your learning goals and recent achievements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-full animate-pulse"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full animate-pulse"></div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Weekly Goal Progress</span>
                  <span className="text-primary font-medium">{currentHours}/{weeklyGoalHours} hours</span>
                </div>
                <Progress value={progressPercentage} className="h-2" aria-label={`Weekly goal progress: ${progressPercentage}%`} />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-1">
                  <span>0 hours</span>
                  <span>{weeklyGoalHours} hours</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "p-4 rounded-lg border flex flex-col items-center justify-center text-center gap-1 transition-all hover:shadow-sm",
                      stat.color
                    )}
                  >
                    {stat.icon}
                    <div className="text-3xl font-bold mt-1">{stat.value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
