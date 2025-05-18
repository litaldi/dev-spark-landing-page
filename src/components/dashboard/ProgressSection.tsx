
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Book, Award, TrendingUp, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";

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
  const [lastWeekHours] = useLocalStorage<number>("lastWeekHours", 1.5);
  const weekOverWeekChange = currentHours - lastWeekHours;
  const weekOverWeekPercentage = lastWeekHours ? Math.round((weekOverWeekChange / lastWeekHours) * 100) : 100;

  // Get achievement level based on streak
  const getAchievementLevel = (streak: number) => {
    if (streak < 3) return "Getting Started";
    if (streak < 7) return "Consistent Learner";
    if (streak < 14) return "Knowledge Builder";
    if (streak < 30) return "Dedication Master";
    return "Learning Champion";
  };

  // Get next milestone based on lessons completed
  const getNextMilestone = (completed: number) => {
    const milestones = [5, 10, 25, 50, 100];
    return milestones.find(milestone => milestone > completed) || (completed + 5);
  };

  // Get time remaining to reach goal
  const getRemainingTimeMessage = () => {
    const remainingHours = weeklyGoalHours - currentHours;
    if (remainingHours <= 0) return "Weekly goal achieved!";
    return `${remainingHours} hours left to reach your goal`;
  };
  
  const stats = [
    {
      value: lessonsCompleted,
      label: "Lessons completed",
      sublabel: `${getNextMilestone(lessonsCompleted) - lessonsCompleted} more to next milestone`,
      icon: <Book className="h-5 w-5 text-brand-600 dark:text-brand-400" />,
      color: "border-brand-200 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-900/20"
    },
    {
      value: projectsStarted,
      label: "Projects started",
      sublabel: "1 more available now",
      icon: <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
      color: "border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/20"
    },
    {
      value: streakDays,
      label: `Days streak (${getAchievementLevel(streakDays)})`,
      sublabel: "Keep going!",
      icon: <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
      color: "border-emerald-200 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/20"
    }
  ];

  return (
    <Card className="border border-gray-200 dark:border-gray-700 mb-6 animate-fade-in">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl md:text-2xl">Your Progress</CardTitle>
          <div className="flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400">
            <Star className="h-4 w-4" /> 
            <span>Weekly Goal</span>
          </div>
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
                  <div className="font-medium flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>Weekly Goal Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-medium">{currentHours}/{weeklyGoalHours} hours</span>
                    {weekOverWeekChange !== 0 && (
                      <span className={cn(
                        "text-xs rounded-full px-2 py-0.5", 
                        weekOverWeekChange > 0 
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" 
                          : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                      )}>
                        {weekOverWeekChange > 0 ? "+" : ""}{weekOverWeekPercentage}% vs last week
                      </span>
                    )}
                  </div>
                </div>
                <Progress 
                  value={progressPercentage} 
                  className="h-2" 
                  aria-label={`Weekly goal progress: ${progressPercentage}%`}
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-1">
                  <span>0 hours</span>
                  <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                    {getRemainingTimeMessage()}
                  </span>
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
                    <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">{stat.sublabel}</div>
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
