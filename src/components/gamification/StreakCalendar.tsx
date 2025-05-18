
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, CalendarDays, Flame, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface CalendarDay {
  date: string; // ISO string format
  status: "completed" | "partial" | "missed" | "future";
  minutesLearned?: number;
}

interface StreakCalendarProps {
  className?: string;
}

export function StreakCalendar({ className }: StreakCalendarProps) {
  // Mock data for streak calendar - would come from API in a real app
  const today = new Date();
  const [streakData, setStreakData] = useLocalStorage<{
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: string;
    calendar: CalendarDay[];
  }>("userStreakData", {
    currentStreak: 5,
    longestStreak: 12,
    lastActivityDate: today.toISOString(),
    calendar: generateCalendarMockData(30),
  });

  function generateCalendarMockData(days: number): CalendarDay[] {
    const result: CalendarDay[] = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      let status: "completed" | "partial" | "missed" | "future";
      let minutesLearned = 0;
      
      if (i > 0) {
        // Past days
        if (Math.random() > 0.3) {
          status = Math.random() > 0.7 ? "completed" : "partial";
          minutesLearned = status === "completed" ? 
            Math.floor(Math.random() * 30) + 30 : 
            Math.floor(Math.random() * 20) + 10;
        } else {
          status = "missed";
        }
      } else {
        // Today
        status = "partial";
        minutesLearned = 15;
      }
      
      result.push({
        date: date.toISOString(),
        status,
        minutesLearned
      });
    }
    
    return result;
  }

  // Calculate weekly stats
  const weeklyData = streakData.calendar
    .slice(streakData.calendar.length - 7)
    .reduce((acc, day) => {
      if (day.minutesLearned) {
        acc.totalMinutes += day.minutesLearned;
        if (day.status === "completed") {
          acc.completedDays += 1;
        } else if (day.status === "partial") {
          acc.partialDays += 1;
        }
      }
      return acc;
    }, { totalMinutes: 0, completedDays: 0, partialDays: 0 });

  return (
    <Card className={cn("border border-gray-200 dark:border-gray-700", className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <span>Your Learning Streak</span>
          </div>
          <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
            <Flame className="h-4 w-4" />
            <span className="text-lg font-bold">{streakData.currentStreak}</span>
          </div>
        </CardTitle>
        <CardDescription>
          Keep your streak going by learning every day
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-7 gap-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div key={i} className="text-center text-xs text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
          
          {streakData.calendar.slice(streakData.calendar.length - 28).map((day, i) => {
            const date = new Date(day.date);
            
            return (
              <div 
                key={i}
                className={cn(
                  "aspect-square rounded-sm flex items-center justify-center",
                  day.status === "completed" && "bg-brand-500 text-white",
                  day.status === "partial" && "bg-brand-200 dark:bg-brand-800 text-brand-800 dark:text-brand-200",
                  day.status === "missed" && "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500",
                  day.status === "future" && "bg-transparent"
                )}
                title={`${date.toLocaleDateString()}: ${day.minutesLearned || 0} minutes`}
              >
                <span className="text-xs">{date.getDate()}</span>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between pt-2 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Longest streak</p>
            <p className="font-bold">{streakData.longestStreak} days</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">This week</p>
            <p className="font-bold">{Math.floor(weeklyData.totalMinutes / 60)}<span className="text-xs font-normal"> hrs </span>{weeklyData.totalMinutes % 60}<span className="text-xs font-normal"> min</span></p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Days active</p>
            <p className="font-bold">{weeklyData.completedDays + weeklyData.partialDays}/7</p>
          </div>
        </div>

        <div className="pt-2">
          <Button className="w-full" size="sm">
            View Activity History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
