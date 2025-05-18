
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SmartRecommendationsProps {
  userName: string;
  isLoading: boolean;
  userTopics: string[];
}

export const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  userName,
  isLoading,
  userTopics
}) => {
  // Mock recommendations data
  const recommendations = [
    {
      id: 1,
      title: "Advanced JavaScript Patterns",
      description: "Based on your progress, we think you're ready for some advanced concepts.",
      type: "course",
      level: "intermediate",
      match: "95%"
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      description: "Complement your React knowledge with this in-depth hooks tutorial.",
      type: "tutorial",
      level: "advanced",
      match: "87%"
    },
    {
      id: 3,
      title: "Building a Full-Stack App",
      description: "Put your skills to practice with this comprehensive project.",
      type: "project",
      level: "intermediate",
      match: "82%"
    }
  ];

  const handleRecommendationClick = (recommendationId: number) => {
    console.log(`Clicked on recommendation ${recommendationId}`);
    // Navigate to the recommended content
  };

  if (isLoading) {
    return (
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="flex flex-col gap-2 animate-pulse">
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded self-end"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" aria-hidden="true" />
          Smart Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Based on your recent activity and learning patterns, here are personalized recommendations to enhance your skills.
        </p>

        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <div 
              key={recommendation.id} 
              className="bg-muted/50 p-3 rounded-lg border border-border"
            >
              <div className="flex justify-between">
                <h4 className="font-medium text-sm">{recommendation.title}</h4>
                <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                  {recommendation.match} match
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 mb-2">{recommendation.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                    {recommendation.type}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                    {recommendation.level}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs h-7 px-2"
                  onClick={() => handleRecommendationClick(recommendation.id)}
                >
                  Explore
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
