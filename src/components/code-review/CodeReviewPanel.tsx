
import React, { useState } from 'react';
import { CodeSubmissionForm } from './CodeSubmissionForm';
import { CodeFeedbackDisplay } from './CodeFeedbackDisplay';
import { useCodeReviewAnalysis } from '@/hooks/use-code-review';
import { CodeLanguage, CodeReviewFeedback } from './types';
import { Card } from '@/components/ui/card';

export function CodeReviewPanel() {
  const [codeSnippet, setCodeSnippet] = useState<string>('');
  const [language, setLanguage] = useState<CodeLanguage>('javascript');
  
  const { 
    analyzedFeedback,
    isAnalyzing,
    error,
    analyzeCode,
    recordFeedbackRating
  } = useCodeReviewAnalysis();

  const handleSubmit = async (code: string, lang: CodeLanguage) => {
    setCodeSnippet(code);
    setLanguage(lang);
    await analyzeCode(code, lang);
  };

  const handleRating = (feedbackId: string, helpful: boolean) => {
    recordFeedbackRating(feedbackId, helpful);
  };

  const handleNewSubmission = () => {
    setCodeSnippet('');
  };

  return (
    <Card className="p-6 shadow-lg">
      {!analyzedFeedback ? (
        <CodeSubmissionForm 
          onSubmit={handleSubmit}
          isSubmitting={isAnalyzing}
          error={error}
        />
      ) : (
        <CodeFeedbackDisplay
          feedback={analyzedFeedback}
          codeSnippet={codeSnippet}
          language={language}
          onRatingSubmit={handleRating}
          onNewSubmission={handleNewSubmission}
          isLoading={isAnalyzing}
        />
      )}
    </Card>
  );
}
