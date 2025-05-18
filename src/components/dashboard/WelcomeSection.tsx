
import React from "react";
import { useViewportSize } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { CalendarDays, BookOpen, Award, Bell, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";

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
  
  // Get time of day for personalized greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  // Use local storage to track and display session data
  const [lastSessionDate, setLastSessionDate] = useLocalStorage<string | null>("lastSessionDate", null);
  const [preferredSessionTime, setPreferredSessionTime] = useLocalStorage<string>("preferredSessionTime", "morning");
  const [totalSessionsCompleted, setTotalSessionsCompleted] = useLocalStorage<number>("totalSessionsCompleted", 0);
  
  // Get motivational message based on user pattern
  const getMotivationalMessage = () => {
    if (isFirstTimeUser) return "Ready to begin your learning journey?";
    
    if (!lastSessionDate) return "Let's start building your knowledge today!";
    
    const lastSession = new Date(lastSessionDate);
    const today = new Date();
    const daysSinceLastSession = Math.floor((today.getTime() - lastSession.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastSession === 0) return "Great job continuing your learning today!";
    if (daysSinceLastSession === 1) return "Welcome back! Ready to pick up where you left off?";
    if (daysSinceLastSession <= 3) return "It's been a few days. Let's keep your momentum going!";
    return "We've missed you! Let's get back to learning.";
  };
  
  // Handle starting a session
  const handleStartSession = () => {
    setLastSessionDate(new Date().toISOString());
    setTotalSessionsCompleted(totalSessionsCompleted + 1);
    
    // Update preferred time based on current time of day
    const hour = new Date().getHours();
    if (hour < 12) setPreferredSessionTime("morning");
    else if (hour < 18) setPreferredSessionTime("afternoon");
    else setPreferredSessionTime("evening");
    
    onStartTodaysSession();
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                {getGreeting()}, {userName}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {getMotivationalMessage()}
              </p>
              {!isFirstTimeUser && totalSessionsCompleted > 0 && (
                <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">
                  You've completed {totalSessionsCompleted} learning {totalSessionsCompleted === 1 ? 'session' : 'sessions'} so far!
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              {!isFirstTimeUser && (
                <Button 
                  onClick={handleStartSession}
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <p className="text-sm font-medium text-brand-700 dark:text-brand-300">
                  <span className="inline-flex items-center">
                    <Clock className="inline-block mr-1 h-3.5 w-3.5" />
                    Your next session: 
                  </span>
                  <span className="font-semibold ml-1">Introduction to CSS Flexbox</span> · 
                  <span className="ml-1 text-gray-600 dark:text-gray-400">Scheduled for today</span>
                </p>
                
                <Button size="sm" variant="ghost" className="text-xs flex items-center gap-1 h-8">
                  <Bell className="h-3.5 w-3.5" />
                  Set Reminder
                </Button>
              </div>
              
              {preferredSessionTime && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span className="font-medium">Tip:</span> Based on your activity, you seem to prefer learning in the {preferredSessionTime}. 
                  We've optimized your schedule accordingly.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
