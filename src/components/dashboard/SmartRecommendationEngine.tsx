
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Lightbulb, 
  TrendingUp, 
  Clock, 
  Star, 
  ArrowRight,
  BookOpen,
  Code,
  Video,
  FileText,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmartRecommendationEngineProps {
  userLevel?: string;
  interests?: string[];
  className?: string;
}

export function SmartRecommendationEngine({ 
  userLevel = 'intermediate',
  interests = ['React', 'TypeScript', 'Node.js'],
  className 
}: SmartRecommendationEngineProps) {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Simulate AI-powered recommendations based on user data
    const generateRecommendations = () => {
      const baseRecommendations = [
        {
          id: 1,
          title: 'Advanced React Patterns',
          type: 'course',
          category: 'skill-building',
          difficulty: 'advanced',
          estimatedTime: '4.5 hours',
          completionRate: 87,
          icon: Code,
          description: 'Master compound components, render props, and custom hooks',
          tags: ['React', 'Patterns', 'Advanced'],
          reason: 'Based on your React progress and completion rate'
        },
        {
          id: 2,
          title: 'TypeScript Best Practices',
          type: 'workshop',
          category: 'trending',
          difficulty: 'intermediate',
          estimatedTime: '2 hours',
          completionRate: 92,
          icon: FileText,
          description: 'Learn industry-standard TypeScript patterns and practices',
          tags: ['TypeScript', 'Best Practices', 'Code Quality'],
          reason: 'Trending in your skill area this week'
        },
        {
          id: 3,
          title: 'Building REST APIs with Node.js',
          type: 'project',
          category: 'hands-on',
          difficulty: 'intermediate',
          estimatedTime: '6 hours',
          completionRate: 78,
          icon: BookOpen,
          description: 'Create a full-featured API with authentication and testing',
          tags: ['Node.js', 'API', 'Backend'],
          reason: 'Perfect next step after your frontend focus'
        },
        {
          id: 4,
          title: 'Code Review Masterclass',
          type: 'video',
          category: 'soft-skills',
          difficulty: 'intermediate',
          estimatedTime: '1.5 hours',
          completionRate: 95,
          icon: Video,
          description: 'Learn to give and receive effective code reviews',
          tags: ['Code Review', 'Communication', 'Team Work'],
          reason: 'Recommended for career growth'
        },
        {
          id: 5,
          title: 'React Testing Strategies',
          type: 'course',
          category: 'skill-building',
          difficulty: 'advanced',
          estimatedTime: '3 hours',
          completionRate: 84,
          icon: Code,
          description: 'Unit testing, integration testing, and E2E testing in React',
          tags: ['Testing', 'React', 'Quality Assurance'],
          reason: 'Complete your React skill set'
        }
      ];
      
      setRecommendations(baseRecommendations);
    };

    generateRecommendations();
  }, [userLevel, interests]);

  const categories = [
    { id: 'all', label: 'All Recommendations', icon: Lightbulb },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'skill-building', label: 'Skill Building', icon: Star },
    { id: 'hands-on', label: 'Hands-on', icon: Code },
    { id: 'soft-skills', label: 'Soft Skills', icon: Users }
  ];

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Smart Recommendations
        </CardTitle>
        <CardDescription>
          AI-powered suggestions tailored to your learning journey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-3 w-3" />
                {category.label}
              </Button>
            );
          })}
        </div>

        <Separator />

        {/* Recommendations List */}
        <div className="space-y-4">
          {filteredRecommendations.map((rec, index) => {
            const Icon = rec.icon;
            
            return (
              <div
                key={rec.id}
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
                          {rec.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {rec.description}
                        </p>
                      </div>
                      
                      <Badge className={getDifficultyColor(rec.difficulty)}>
                        {rec.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {rec.estimatedTime}
                      </span>
                      <span>{rec.completionRate}% completion rate</span>
                      <span className="capitalize">{rec.type}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {rec.tags.map((tag: string) => (
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
                      💡 {rec.reason}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRecommendations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recommendations in this category yet.</p>
            <p className="text-xs">Check back after completing more lessons!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
