
import React from 'react';
import { CodeReviewPanel } from '@/components/code-review/CodeReviewPanel';
import { Toaster } from '@/components/ui/toaster';

export default function CodeReview() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">AI-Assisted Code Review</h1>
      <p className="text-muted-foreground mb-8">
        Submit your code for automated analysis and receive instant feedback on bugs, 
        performance issues, and best practices.
      </p>
      <CodeReviewPanel />
      <Toaster />
    </div>
  );
}
