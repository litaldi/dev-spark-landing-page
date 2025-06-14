
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  Clock, 
  BookOpen, 
  Award,
  Zap,
  Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InteractiveLearningMetricsProps {
  className?: string;
}

export function InteractiveLearningMetrics({ className }: InteractiveLearningMetricsProps) {
  const [selectedMetric, setSelectedMetric] = useState<string>('overview');
  const [animatedValues, setAnimatedValues] = useState({
    weeklyProgress: 0,
    monthlyProgress: 0,
    yearlyProgress: 0
  });

  // Simulate animated progress counters
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        weeklyProgress: 75,
        monthlyProgress: 60,
        yearlyProgress: 45
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    {
      id: 'overview',
      title: 'Learning Overview',
      icon: TrendingUp,
      value: '15.2hrs',
      label: 'This Week',
      progress: animatedValues.weeklyProgress,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      id: 'consistency',
      title: 'Study Consistency',
      icon: Calendar,
      value: '12 days',
      label: 'Current Streak',
      progress: animatedValues.monthlyProgress,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950'
    },
    {
      id: 'focus',
      title: 'Focus Score',
      icon: Brain,
      value: '8.4/10',
      label: 'Avg. Session',
      progress: 84,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950'
    },
    {
      id: 'mastery',
      title: 'Skill Mastery',
      icon: Award,
      value: '7 skills',
      label: 'Completed',
      progress: animatedValues.yearlyProgress,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950'
    }
  ];

  const goals = [
    { name: 'Complete React Course', progress: 78, target: 100, unit: '% done' },
    { name: 'Weekly Study Hours', progress: 15, target: 20, unit: 'hours' },
    { name: 'Project Submissions', progress: 3, target: 5, unit: 'projects' }
  ];

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Interactive Learning Dashboard
        </CardTitle>
        <CardDescription>
          Track your progress and achieve your learning goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const isSelected = selectedMetric === metric.id;
            
            return (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={cn(
                  "p-4 rounded-lg border text-left transition-all duration-200",
                  "hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  isSelected ? "ring-2 ring-primary shadow-md" : "",
                  metric.bgColor
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={cn("h-5 w-5", metric.color)} />
                  <Badge variant={isSelected ? "default" : "secondary"} className="text-xs">
                    {metric.progress}%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-lg">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <Progress value={metric.progress} className="h-1" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Goals Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Current Goals
            </h3>
            <Button variant="outline" size="sm">
              Set New Goal
            </Button>
          </div>
          
          <div className="space-y-3">
            {goals.map((goal) => (
              <div key={goal.name} className="p-4 rounded-lg border bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{goal.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {goal.progress}/{goal.target} {goal.unit}
                  </span>
                </div>
                <Progress 
                  value={(goal.progress / goal.target) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Start Session
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Review Notes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
