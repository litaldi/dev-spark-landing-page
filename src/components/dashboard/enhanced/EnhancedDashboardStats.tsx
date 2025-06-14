
import React from 'react';
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from '@/components/ui/enhanced-card';
import { ProgressIndicator } from '@/components/ui/progress-indicator';
import { Trophy, Clock, BookOpen, Target, TrendingUp, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardStatsProps {
  className?: string;
}

export function EnhancedDashboardStats({ className }: DashboardStatsProps) {
  const stats = [
    {
      id: 'streak',
      title: 'Current Streak',
      value: '12',
      unit: 'days',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      progress: 80,
      trend: '+2'
    },
    {
      id: 'hours',
      title: 'Study Hours',
      value: '24',
      unit: 'hours',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      progress: 60,
      trend: '+4'
    },
    {
      id: 'lessons',
      title: 'Lessons',
      value: '18',
      unit: 'completed',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      progress: 90,
      trend: '+3'
    },
    {
      id: 'goals',
      title: 'Weekly Goal',
      value: '7/10',
      unit: 'lessons',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      progress: 70,
      trend: 'on track'
    }
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6", className)}>
      {stats.map((stat, index) => (
        <EnhancedCard 
          key={stat.id} 
          hover 
          className="group transition-all duration-300 hover:shadow-xl"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <EnhancedCardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className={cn(
                "p-2.5 rounded-xl transition-transform duration-200 group-hover:scale-110",
                stat.bgColor
              )}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500" />
                {stat.trend}
              </div>
            </div>
            
            <div className="space-y-1">
              <EnhancedCardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </EnhancedCardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.unit}</span>
              </div>
            </div>
          </EnhancedCardHeader>
          
          <EnhancedCardContent className="pt-0">
            <ProgressIndicator 
              value={stat.progress} 
              size="sm" 
              variant={stat.progress >= 80 ? 'success' : stat.progress >= 60 ? 'default' : 'warning'}
            />
          </EnhancedCardContent>
        </EnhancedCard>
      ))}
    </div>
  );
}
