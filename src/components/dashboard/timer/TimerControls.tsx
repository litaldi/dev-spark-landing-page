
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Volume2,
  VolumeX
} from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  soundEnabled: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onStop: () => void;
  onToggleSound: () => void;
}

export function TimerControls({ 
  isRunning, 
  soundEnabled, 
  onStart, 
  onPause, 
  onReset, 
  onStop, 
  onToggleSound 
}: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {!isRunning ? (
        <Button onClick={onStart} className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          Start
        </Button>
      ) : (
        <Button onClick={onPause} variant="outline" className="flex items-center gap-2">
          <Pause className="h-4 w-4" />
          Pause
        </Button>
      )}
      
      <Button onClick={onReset} variant="outline" size="icon">
        <RotateCcw className="h-4 w-4" />
      </Button>
      
      <Button onClick={onStop} variant="outline" size="icon">
        <Square className="h-4 w-4" />
      </Button>

      <Button 
        onClick={onToggleSound}
        variant="ghost" 
        size="icon"
        className="ml-2"
      >
        {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
    </div>
  );
}
