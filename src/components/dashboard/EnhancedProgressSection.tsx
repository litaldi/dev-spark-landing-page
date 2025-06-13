
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Code, 
  Award,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LoadingSkeleton } from '@/components/ui/enhanced-loading';

interface EnhancedProgressSectionProps {
  weeklyGoalHours: number;
  currentHours: number;
  streakDays: number;
  lessonsCompleted: number;
  projectsStarted: number;
  isLoading?: boolean;
  className?: string;
}

export function EnhancedProgressSection({
  weeklyGoalHours,
  currentHours,
  streakDays,
  lessonsCompleted,
  projectsStarted,
  isLoading,
  className
}: EnhancedProgressSectionProps) {
  const progressPercentage = Math.min((currentHours / weeklyGoalHours) * 100, 100);
  const isOnTrack = progressPercentage >= 60;
  
  const stats = [
    {
      icon: Clock,
      label: 'Study Hours',
      value: currentHours,
      target: weeklyGoalHours,
      unit: 'hrs',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      icon: TrendingUp,
      label: 'Streak Days',
      value: streakDays,
      unit: 'days',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950'
    },
    {
      icon: BookOpen,
      label: 'Lessons',
      value: lessonsCompleted,
      unit: 'completed',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950'
    },
    {
      icon: Code,
      label: 'Projects',
      value: projectsStarted,
      unit: 'started',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950'
    }
  ];
  
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <LoadingSkeleton lines={2} />
        </CardHeader>
        <CardContent>
          <LoadingSkeleton lines={4} />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Weekly Progress
            </CardTitle>
            <CardDescription>
              You're {isOnTrack ? 'on track' : 'behind'} to meet your weekly goal
            </CardDescription>
          </div>
          <Badge variant={isOnTrack ? "default" : "secondary"} className="flex items-center gap-1">
            <Award className="h-3 w-3" />
            {Math.round(progressPercentage)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weekly Goal Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {currentHours} of {weeklyGoalHours} hours completed
            </span>
            <span className={cn(
              "font-medium",
              isOnTrack ? "text-green-600" : "text-orange-600"
            )}>
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2"
          />
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className={cn(
                  "p-4 rounded-lg border transition-colors hover:shadow-sm",
                  stat.bgColor
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-5 w-5", stat.color)} />
                  <div className="min-w-0 flex-1">
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                      {stat.target && (
                        <span className="text-lg text-muted-foreground">
                          /{stat.target}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label} {stat.unit}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Motivational Message */}
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground text-center">
            {isOnTrack 
              ? "Great work! Keep up the momentum to reach your weekly goal."
              : "You've got this! A little more effort will get you back on track."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
