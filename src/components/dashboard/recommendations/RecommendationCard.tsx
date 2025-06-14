
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecommendationCardProps {
  recommendation: {
    id: number;
    title: string;
    type: string;
    category: string;
    difficulty: string;
    estimatedTime: string;
    completionRate: number;
    icon: React.ComponentType<any>;
    description: string;
    tags: string[];
    reason: string;
  };
  index: number;
}

export function RecommendationCard({ recommendation, index }: RecommendationCardProps) {
  const Icon = recommendation.icon;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:border-primary/50 group",
        "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {recommendation.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {recommendation.description}
              </p>
            </div>
            
            <Badge className={getDifficultyColor(recommendation.difficulty)}>
              {recommendation.difficulty}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {recommendation.estimatedTime}
            </span>
            <span>{recommendation.completionRate}% completion rate</span>
            <span className="capitalize">{recommendation.type}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {recommendation.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Start Learning
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground italic">
            💡 {recommendation.reason}
          </p>
        </div>
      </div>
    </div>
  );
}
