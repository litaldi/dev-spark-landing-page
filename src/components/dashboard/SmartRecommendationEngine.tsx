
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lightbulb, TrendingUp, Star, Code, Users, FileText, BookOpen, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CategoryFilter } from './recommendations/CategoryFilter';
import { RecommendationCard } from './recommendations/RecommendationCard';

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
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <Separator />

        <div className="space-y-4">
          {filteredRecommendations.map((rec, index) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              index={index}
            />
          ))}
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
