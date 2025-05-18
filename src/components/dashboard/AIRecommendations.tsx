
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Brain, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface AIRecommendationsProps {
  userName: string;
  isLoading?: boolean;
}

export const AIRecommendations = ({ userName, isLoading = false }: AIRecommendationsProps) => {
  // Mock data for AI-powered recommendations - would be replaced with actual API calls
  const [recommendations, setRecommendations] = useLocalStorage("aiRecommendations", [
    {
      type: "course",
      title: "JavaScript Fundamentals",
      reason: "Based on your interest in web development",
      confidence: 0.92,
      icon: "code"
    },
    {
      type: "practice",
      title: "CSS Grid Challenge",
      reason: "To strengthen your layout skills",
      confidence: 0.86,
      icon: "layout"
    },
    {
      type: "review",
      title: "HTML Semantics Review",
      reason: "You've mastered the basics",
      confidence: 0.78,
      icon: "refresh"
    }
  ]);

  // Mock data for learning insights
  const [insights, setInsights] = useLocalStorage("aiInsights", [
    "You seem to learn best in 30-minute sessions",
    "You make the most progress on Wednesdays",
    "You excel at practical exercises over theory"
  ]);

  // Mock goal suggestion based on user behavior
  const suggestedGoal = {
    currentGoal: 10,
    suggestedGoal: 12,
    reason: "You're consistently exceeding your current goal"
  };

  // Function to handle accepting a recommendation
  const handleAcceptRecommendation = (index: number) => {
    console.log("Accepted recommendation:", recommendations[index]);
    // Here we would implement the actual logic for accepting a recommendation
  };

  // Function to handle adjusting goals
  const handleAdjustGoal = () => {
    console.log("Adjusting goal to:", suggestedGoal.suggestedGoal);
    // Here we would implement the logic to adjust the user's goal
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700 mb-6 animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI-Powered Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Smart Recommendations */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Personalized Recommendations
              </h3>
              <div className="space-y-2">
                {recommendations.map((rec, index) => (
                  <div 
                    key={index} 
                    className="p-3 border border-gray-100 dark:border-gray-800 rounded-md bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800/50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{rec.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{rec.reason}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleAcceptRecommendation(index)}
                        className="text-xs h-7"
                      >
                        Try Now
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="w-full max-w-24">
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-brand-500 rounded-full" 
                            style={{ width: `${rec.confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {Math.round(rec.confidence * 100)}% match
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Goal Adjustment Assistant */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                Goal Adjustment
              </h3>
              <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-md bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800/50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Increase your weekly goal</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      From {suggestedGoal.currentGoal} to {suggestedGoal.suggestedGoal} hours/week
                    </p>
                    <p className="text-xs text-brand-600 dark:text-brand-400 mt-1">
                      {suggestedGoal.reason}
                    </p>
                  </div>
                  <Button 
                    size="sm"
                    onClick={handleAdjustGoal}
                    className="text-xs"
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>

            {/* Learning Insights */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Learning Insights
              </h3>
              <ul className="space-y-1.5 text-sm">
                {insights.map((insight, index) => (
                  <li 
                    key={index} 
                    className="flex gap-2 items-center text-gray-600 dark:text-gray-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500"></span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
