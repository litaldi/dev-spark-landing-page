
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Coffee, 
  Timer,
  Volume2,
  VolumeX
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface StudySessionTimerProps {
  className?: string;
}

export function StudySessionTimer({ className }: StudySessionTimerProps) {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
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
      // Play notification sound (browser notification sound)
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
    setTimeLeft(5 * 60); // 5 minute break
    setTotalTime(5 * 60);
    setIsRunning(true);
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

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
        {/* Timer Display */}
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

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          {!isRunning ? (
            <Button onClick={startTimer} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Start
            </Button>
          ) : (
            <Button onClick={pauseTimer} variant="outline" className="flex items-center gap-2">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          )}
          
          <Button onClick={resetTimer} variant="outline" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <Button onClick={stopSession} variant="outline" size="icon">
            <Square className="h-4 w-4" />
          </Button>

          <Button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            variant="ghost" 
            size="icon"
            className="ml-2"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>

        {/* Session Stats */}
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
      </CardContent>
    </Card>
  );
}
