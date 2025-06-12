
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

// Enhanced Status Badge
interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  const variants = {
    success: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800',
    error: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    info: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
  };

  const icons = {
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle,
    info: Info
  };

  const Icon = icons[status];

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border rounded-full',
      variants[status],
      className
    )}>
      <Icon className="h-3 w-3" />
      {children}
    </span>
  );
}

// Enhanced Feature Card
interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  status?: 'completed' | 'in-progress' | 'planned';
  children?: React.ReactNode;
  className?: string;
}

export function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  status = 'completed',
  children,
  className 
}: FeatureCardProps) {
  const statusColors = {
    completed: 'success' as const,
    'in-progress': 'warning' as const,
    planned: 'info' as const
  };

  return (
    <Card className={cn('transition-all duration-200 hover:shadow-md', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            )}
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
          <StatusBadge status={statusColors[status]}>
            {status.replace('-', ' ')}
          </StatusBadge>
        </div>
      </CardHeader>
      {children && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  );
}

// Enhanced Call-to-Action Component
interface EnhancedCTAProps {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EnhancedCTA({ 
  title, 
  description, 
  primaryAction, 
  secondaryAction,
  className 
}: EnhancedCTAProps) {
  return (
    <div className={cn(
      'bg-gradient-to-r from-primary/10 via-primary/5 to-transparent',
      'border border-primary/20 rounded-lg p-6 text-center',
      className
    )}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={primaryAction.onClick} size="lg">
          {primaryAction.label}
        </Button>
        {secondaryAction && (
          <Button 
            variant="outline" 
            onClick={secondaryAction.onClick}
            size="lg"
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}
