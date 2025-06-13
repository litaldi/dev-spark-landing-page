
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Calendar, Target, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakReminderProps {
  currentStreak: number;
  lastActivityDate?: string;
  className?: string;
}

export function StreakReminder({ currentStreak, lastActivityDate, className }: StreakReminderProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  
  // Check if user needs a reminder (hasn't studied today)
  const today = new Date().toDateString();
  const lastActivity = lastActivityDate ? new Date(lastActivityDate).toDateString() : null;
  const needsReminder = lastActivity !== today;
  
  if (isDismissed || !needsReminder) {
    return null;
  }
  
  const getStreakMessage = () => {
    if (currentStreak === 0) {
      return "Start your learning streak today!";
    } else if (currentStreak < 7) {
      return `Keep it up! You're on a ${currentStreak}-day streak.`;
    } else {
      return `Amazing! ${currentStreak} days strong. Don't break it now!`;
    }
  };
  
  const getStreakColor = () => {
    if (currentStreak === 0) return "bg-blue-500";
    if (currentStreak < 7) return "bg-orange-500";
    return "bg-red-500";
  };
  
  return (
    <Card className={cn("border-l-4 border-l-primary animate-fade-in", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-full", getStreakColor())}>
              <Flame className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{getStreakMessage()}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />
                {currentStreak > 0 
                  ? `Last activity: ${lastActivityDate ? new Date(lastActivityDate).toLocaleDateString() : 'Unknown'}`
                  : "Ready to start your first session?"
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {currentStreak} days
            </Badge>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsDismissed(true)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
