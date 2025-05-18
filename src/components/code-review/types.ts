
export type CodeLanguage = 'javascript' | 'typescript' | 'python' | 'html' | 'css';

export type FeedbackType = 'bug' | 'improvement' | 'best_practice' | 'security' | 'accessibility';
export type FeedbackSeverity = 'high' | 'medium' | 'low';

export interface FeedbackItem {
  id: string;
  type: FeedbackType;
  severity: FeedbackSeverity;
  title: string;
  description: string;
  lineNumbers?: number[];
  suggestion?: string;
  ratedHelpful?: boolean;
}

export interface CodeReviewFeedback {
  id: string;
  overallScore: number;
  summary: string;
  items: FeedbackItem[];
}
