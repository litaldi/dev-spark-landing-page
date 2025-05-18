
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Clock, Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface RecommendedContentProps {
  isLoading?: boolean;
  onStartLesson?: (lessonId: string) => void;
}

export const RecommendedContent: React.FC<RecommendedContentProps> = ({ 
  isLoading = false,
  onStartLesson = () => {}
}) => {
  // Mock data for recommended content
  const [recommendations, setRecommendations] = useLocalStorage("recommendedContent", [
    {
      id: "lesson-flexbox",
      title: "CSS Flexbox Layout",
      description: "Learn how to create responsive layouts using CSS Flexbox",
      duration: "45m",
      difficulty: "Intermediate",
      match: 95,
      type: "lesson"
    },
    {
      id: "quiz-js",
      title: "JavaScript Arrays",
      description: "Test your knowledge of JavaScript array methods and properties",
      duration: "20m",
      difficulty: "Beginner",
      match: 87,
      type: "quiz"
    },
    {
      id: "project-portfolio",
      title: "Build a Portfolio",
      description: "Apply your HTML & CSS skills by building a personal portfolio",
      duration: "2h",
      difficulty: "Advanced",
      match: 82,
      type: "project"
    }
  ]);
  
  // Get user interests from localStorage (mock)
  const interests = ['CSS', 'responsive design', 'animations'];
  
  // Get difficulty label and style
  const getDifficultyData = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'beginner':
        return { label: 'Beginner', className: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' };
      case 'intermediate':
        return { label: 'Intermediate', className: 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' };
      case 'advanced':
        return { label: 'Advanced', className: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' };
      default:
        return { label: difficulty, className: 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' };
    }
  };
  
  // Get content type icon
  const getContentTypeIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'lesson':
        return <BookOpen className="h-5 w-5 text-brand-600 dark:text-brand-400" />;
      case 'quiz':
        return <Star className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      case 'project':
        return <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700 animate-fade-in">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Recommended For You
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-sm">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {interests.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Based on your interest in: {interests.join(', ')}
                </p>
              </div>
            )}
            
            {recommendations.map((item, index) => {
              const difficulty = getDifficultyData(item.difficulty);
              
              return (
                <div 
                  key={index}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-brand-200 dark:hover:border-brand-700 transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                      {getContentTypeIcon(item.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {item.title}
                        </h3>
                        <div className="ml-2 flex-shrink-0">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400">
                            {item.match}% match
                          </span>
                        </div>
                      </div>
                      
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" /> {item.duration}
                          </span>
                          <span className={cn(
                            "px-1.5 py-0.5 rounded-full text-xs font-medium",
                            difficulty.className
                          )}>
                            {difficulty.label}
                          </span>
                        </div>
                        
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => onStartLesson(item.id)}
                          className="h-7 text-xs"
                        >
                          Start {item.type === 'lesson' ? 'Lesson' : 
                                 item.type === 'quiz' ? 'Quiz' : 'Project'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
