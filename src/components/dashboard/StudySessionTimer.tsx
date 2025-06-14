
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timer, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { TimerDisplay } from './timer/TimerDisplay';
import { TimerControls } from './timer/TimerControls';
import { TimerStats } from './timer/TimerStats';

interface StudySessionTimerProps {
  className?: string;
}

export function StudySessionTimer({ className }: StudySessionTimerProps) {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (soundEnabled) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBj2a3/LIeC0FLYHNmtiLOAcZabr3659NEAxPqOL4t2UcCjiK1/LJeSsFJHfJ7uCSQgoVXqql56lUEwlFnN91wGAaBzo=');
      audio.play().catch(() => {});
    }

    if (!isBreak) {
      setSessionCount(prev => prev + 1);
      toast({
        title: "Study Session Complete! 🎉",
        description: "Great work! Time for a 5-minute break.",
      });
      startBreak();
    } else {
      toast({
        title: "Break Time Over! 💪",
        description: "Ready for your next study session?",
      });
      setIsBreak(false);
      setTimeLeft(25 * 60);
      setTotalTime(25 * 60);
    }
  };

  const startBreak = () => {
    setIsBreak(true);
    setTimeLeft(5 * 60);
    setTotalTime(5 * 60);
    setIsRunning(true);
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  
  const resetTimer = () => {
    setIsRunning(false);
    if (isBreak) {
      setTimeLeft(5 * 60);
      setTotalTime(5 * 60);
    } else {
      setTimeLeft(25 * 60);
      setTotalTime(25 * 60);
    }
  };

  const stopSession = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
    setTotalTime(25 * 60);
  };

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-primary" />
          Pomodoro Study Timer
          {isBreak && (
            <Badge variant="secondary" className="ml-2">
              <Coffee className="h-3 w-3 mr-1" />
              Break Time
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Stay focused with timed study sessions • Session {sessionCount + 1}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <TimerDisplay 
          timeLeft={timeLeft}
          totalTime={totalTime}
          isBreak={isBreak}
          isRunning={isRunning}
        />

        <TimerControls
          isRunning={isRunning}
          soundEnabled={soundEnabled}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
          onStop={stopSession}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
        />

        <TimerStats sessionCount={sessionCount} />
      </CardContent>
    </Card>
  );
}
