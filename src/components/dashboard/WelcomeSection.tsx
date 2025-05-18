
import React from "react";
import { useViewportSize } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { CalendarDays, BookOpen, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeSectionProps {
  userName: string;
  isFirstTimeUser: boolean;
  isLoading: boolean;
  onStartFirstLesson: () => void;
  onStartTodaysSession: () => void;
}

export const WelcomeSection = ({
  userName,
  isFirstTimeUser,
  isLoading,
  onStartFirstLesson,
  onStartTodaysSession
}: WelcomeSectionProps) => {
  const { width } = useViewportSize();
  const isMobileOrTablet = width < 768;
  
  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className={cn(
      "relative rounded-lg overflow-hidden bg-gradient-to-br from-brand-50/80 to-brand-100/50 dark:from-brand-900/30 dark:to-brand-800/20",
      "border border-brand-200 dark:border-brand-800",
      "mb-6 p-4 md:p-6 animate-fade-in"
    )}>
      {isLoading ? (
        <div className="flex flex-col gap-3 animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-1/2"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-md w-40 mt-2"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                {getGreeting()}, {userName}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {isFirstTimeUser 
                  ? "Let's start your learning journey today" 
                  : "Here's your learning dashboard for today"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              {!isFirstTimeUser && (
                <Button 
                  onClick={onStartTodaysSession}
                  className="whitespace-nowrap"
                  aria-label="Start your daily learning session"
                >
                  <BookOpen className="mr-1 h-4 w-4" />
                  {isMobileOrTablet ? "Start Session" : "Start Today's Session"}
                </Button>
              )}
              {isFirstTimeUser && (
                <Button 
                  onClick={onStartFirstLesson}
                  className="whitespace-nowrap bg-brand-500 hover:bg-brand-600 text-white"
                >
                  <Award className="mr-1 h-4 w-4" />
                  Start First Lesson
                </Button>
              )}
              <Button 
                variant="outline" 
                aria-label="View schedule"
              >
                <CalendarDays className="mr-1 h-4 w-4" />
                {isMobileOrTablet ? "Schedule" : "View Schedule"}
              </Button>
            </div>
          </div>

          {!isFirstTimeUser && (
            <div className="mt-4 pt-4 border-t border-brand-200/50 dark:border-brand-800/50">
              <p className="text-sm font-medium text-brand-700 dark:text-brand-300">
                Your next session: <span className="font-semibold">Introduction to CSS Flexbox</span> · 
                <span className="ml-1 text-gray-600 dark:text-gray-400">Scheduled for today</span>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
