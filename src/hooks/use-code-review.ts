
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { CodeLanguage, CodeReviewFeedback } from '@/components/code-review/types';
import { generateSampleFeedback } from '@/lib/code-review-utils';

export function useCodeReviewAnalysis() {
  const [analyzedFeedback, setAnalyzedFeedback] = useState<CodeReviewFeedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeCode = useCallback(async (code: string, language: CodeLanguage) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll use our mock implementation
      const result = await mockCodeReviewAPI(code, language);
      setAnalyzedFeedback(result);
      
      if (result.items.length === 0) {
        toast({
          title: "No issues found",
          description: "Your code looks great! We didn't find any issues to report.",
        });
      } else {
        toast({
          title: "Code analysis complete",
          description: `Found ${result.items.length} items to review.`,
        });
      }
    } catch (err) {
      console.error("Error analyzing code:", err);
      setError("There was a problem analyzing your code. Please try again.");
      toast({
        title: "Analysis failed",
        description: "There was a problem analyzing your code.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const recordFeedbackRating = useCallback((feedbackId: string, helpful: boolean) => {
    // In a real implementation, this would call an API endpoint to record the feedback
    console.log(`Feedback ${feedbackId} rated as ${helpful ? 'helpful' : 'not helpful'}`);
    
    toast({
      title: "Thank you for your feedback",
      description: "Your rating helps us improve our analysis.",
    });
    
    // If we want to update the UI to show the user rated this item
    if (analyzedFeedback) {
      setAnalyzedFeedback(prev => {
        if (!prev) return prev;
        
        return {
          ...prev,
          items: prev.items.map(item => 
            item.id === feedbackId 
              ? { ...item, ratedHelpful: helpful }
              : item
          )
        };
      });
    }
  }, [analyzedFeedback]);

  return {
    analyzedFeedback,
    isAnalyzing,
    error,
    analyzeCode,
    recordFeedbackRating
  };
}

// Mock API for development purposes
async function mockCodeReviewAPI(code: string, language: CodeLanguage): Promise<CodeReviewFeedback> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(generateSampleFeedback(code, language));
    }, 2000);
  });
}
