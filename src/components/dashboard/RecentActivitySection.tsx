
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecentActivityProps {
  isLoading?: boolean;
}

export const RecentActivitySection = ({ isLoading = false }: RecentActivityProps) => {
  // Mock recent activity data
  const recentActivities = [
    {
      type: "lesson_completed",
      title: "HTML Basics",
      date: "Today",
      time: "09:45 AM",
      duration: "45m",
    },
    {
      type: "practice_completed",
      title: "CSS Flexbox Challenge",
      date: "Yesterday",
      time: "03:20 PM",
      duration: "30m",
    },
    {
      type: "assessment_started",
      title: "JavaScript Fundamentals Quiz",
      date: "Sep 15, 2025",
      time: "11:15 AM",
      duration: "15m",
    }
  ];
  
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'lesson_completed': 
        return <div className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-900/30" />;
      case 'practice_completed': 
        return <div className="w-2 h-2 rounded-full bg-amber-500 ring-4 ring-amber-100 dark:ring-amber-900/30" />;
      default: 
        return <div className="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30" />;
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700 animate-fade-in">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-sm">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ul className="space-y-3 animate-pulse">
            {[1, 2, 3].map(i => (
              <li key={i} className="flex gap-3">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[19px] w-0.5 bg-gray-100 dark:bg-gray-800 z-0"></div>
            <ul className="relative z-10 space-y-5">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex gap-4">
                  <div className="mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{activity.title}</h4>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2 mt-1">
                      <span>{activity.date} at {activity.time}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                      <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {activity.duration}</span>
                    </div>
                  </div>
                  <div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
