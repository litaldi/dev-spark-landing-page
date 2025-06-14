
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
  isBreak: boolean;
  isRunning: boolean;
}

export function TimerDisplay({ timeLeft, totalTime, isBreak, isRunning }: TimerDisplayProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="text-center space-y-4">
      <div className={cn(
        "text-6xl font-mono font-bold transition-colors duration-300",
        isBreak ? "text-green-600" : "text-primary",
        timeLeft <= 60 && isRunning ? "text-red-500 animate-pulse" : ""
      )}>
        {formatTime(timeLeft)}
      </div>
      
      <Progress 
        value={progress} 
        className={cn(
          "h-3 transition-all duration-1000",
          isBreak ? "[&>div]:bg-green-500" : ""
        )}
      />
      
      <p className="text-sm text-muted-foreground">
        {isBreak ? "Take a well-deserved break!" : "Focus time - minimize distractions"}
      </p>
    </div>
  );
}
