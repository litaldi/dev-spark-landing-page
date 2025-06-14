
import React from 'react';

interface TimerStatsProps {
  sessionCount: number;
}

export function TimerStats({ sessionCount }: TimerStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">{sessionCount}</p>
        <p className="text-xs text-muted-foreground">Sessions Today</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">{Math.round(sessionCount * 25 / 60 * 10) / 10}</p>
        <p className="text-xs text-muted-foreground">Hours Focused</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">{sessionCount * 2}</p>
        <p className="text-xs text-muted-foreground">Points Earned</p>
      </div>
    </div>
  );
}
