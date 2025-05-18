
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Brain, TrendingUp, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";

interface AIRecommendationsProps {
  userName: string;
  isLoading?: boolean;
  userTopics?: string[];
}

export const AIRecommendations = ({ 
  userName, 
  isLoading = false, 
  userTopics = ['web development', 'JavaScript'] 
}: AIRecommendationsProps) => {
  const { toast } = useToast();
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
  const [suggestedGoal, setSuggestedGoal] = useLocalStorage("aiSuggestedGoal", {
    currentGoal: 10,
    suggestedGoal: 12,
    reason: "You're consistently exceeding your current goal"
  });

  // Mock feedback collection
  const [feedbackRatings, setFeedbackRatings] = useLocalStorage("aiFeedbackRatings", {
    recommendations: null,
    goalAdjustment: null,
    insights: null
  });

  // Function to handle accepting a recommendation
  const handleAcceptRecommendation = (index: number) => {
    toast({
      title: "Recommendation Accepted",
      description: `You've started: ${recommendations[index].title}`,
    });
  };

  // Function to handle adjusting goals
  const handleAdjustGoal = () => {
    toast({
      title: "Goal Adjusted",
      description: `Your weekly goal is now ${suggestedGoal.suggestedGoal} hours`,
    });
    setSuggestedGoal({
      ...suggestedGoal,
      currentGoal: suggestedGoal.suggestedGoal,
      suggestedGoal: suggestedGoal.suggestedGoal + 2,
    });
  };

  // Handle feedback for AI features
  const handleFeedback = (feature: keyof typeof feedbackRatings, isPositive: boolean) => {
    setFeedbackRatings({
      ...feedbackRatings,
      [feature]: isPositive
    });
    
    toast({
      title: "Thank you for your feedback",
      description: "We'll use this to improve our recommendations.",
    });
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
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Personalized Recommendations
                </h3>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleFeedback('recommendations', true)}
                    className={cn(
                      "h-6 w-6 p-0",
                      feedbackRatings.recommendations === true && "text-emerald-500"
                    )}
                    aria-label="Mark recommendations as helpful"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleFeedback('recommendations', false)}
                    className={cn(
                      "h-6 w-6 p-0",
                      feedbackRatings.recommendations === false && "text-red-500"
                    )}
                    aria-label="Mark recommendations as not helpful"
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
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
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  Goal Adjustment
                </h3>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleFeedback('goalAdjustment', true)}
                    className={cn(
                      "h-6 w-6 p-0",
                      feedbackRatings.goalAdjustment === true && "text-emerald-500"
                    )}
                    aria-label="Mark goal suggestion as helpful"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleFeedback('goalAdjustment', false)}
                    className={cn(
                      "h-6 w-6 p-0",
                      feedbackRatings.goalAdjustment === false && "text-red-500"
                    )}
                    aria-label="Mark goal suggestion as not helpful"
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
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
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Learning Insights
                </h3>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleFeedback('insights', true)}
                    className={cn(
                      "h-6 w-6 p-0",
                      feedbackRatings.insights === true && "text-emerald-500"
                    )}
                    aria-label="Mark insights as helpful"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleFeedback('insights', false)}
                    className={cn(
                      "h-6 w-6 p-0",
                      feedbackRatings.insights === false && "text-red-500"
                    )}
                    aria-label="Mark insights as not helpful"
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
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
            
            {userTopics && userTopics.length > 0 && (
              <div className="pt-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
                <p>Based on your interests: {userTopics.join(", ")}</p>
                <p className="mt-1">
                  <span className="text-brand-500">Privacy note:</span> Your learning data is only used to personalize your experience.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
