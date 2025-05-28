
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, X, Calendar } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface StreakReminderProps {
  currentStreak: number;
  lastActivityDate?: string;
}

export const StreakReminder = ({ currentStreak, lastActivityDate }: StreakReminderProps) => {
  const [showReminder, setShowReminder] = useState(false);
  const [reminderDismissed, setReminderDismissed] = useLocalStorage('streak-reminder-dismissed', '');

  useEffect(() => {
    const today = new Date().toDateString();
    const lastActivity = lastActivityDate ? new Date(lastActivityDate).toDateString() : '';
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    // Show reminder if user hasn't studied today but did yesterday, and reminder wasn't dismissed today
    if (lastActivity === yesterday && lastActivity !== today && reminderDismissed !== today) {
      setShowReminder(true);
    }
  }, [lastActivityDate, reminderDismissed]);

  const handleDismiss = () => {
    setShowReminder(false);
    setReminderDismissed(new Date().toDateString());
  };

  const handleStartStudying = () => {
    setShowReminder(false);
    // Navigate to learning content
    window.location.hash = '#start-lesson';
  };

  if (!showReminder) return null;

  return (
    <Card className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-full">
            <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="font-semibold text-orange-900 dark:text-orange-100">
              Don't break your streak!
            </h3>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              You have a {currentStreak}-day streak. Study today to keep it going!
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="h-6 w-6 text-orange-600 hover:text-orange-800"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-3 flex gap-2">
        <Button
          onClick={handleStartStudying}
          size="sm"
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          <Calendar className="h-4 w-4 mr-1" />
          Start Today's Session
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDismiss}
          className="border-orange-300 text-orange-700 hover:bg-orange-50"
        >
          Remind me later
        </Button>
      </div>
    </Card>
  );
};
