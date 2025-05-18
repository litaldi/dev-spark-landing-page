
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { CodeLanguage, CodeReviewFeedback, FeedbackItem } from './types';
import { CodePreview } from './CodePreview';

interface CodeFeedbackDisplayProps {
  feedback: CodeReviewFeedback;
  codeSnippet: string;
  language: CodeLanguage;
  onRatingSubmit: (feedbackId: string, helpful: boolean) => void;
  onNewSubmission: () => void;
  isLoading: boolean;
}

export function CodeFeedbackDisplay({
  feedback,
  codeSnippet,
  language,
  onRatingSubmit,
  onNewSubmission,
  isLoading,
}: CodeFeedbackDisplayProps) {
  if (isLoading) {
    return <div className="flex justify-center items-center h-60">Analyzing your code...</div>;
  }

  const feedbackSummary = {
    bugs: feedback.items.filter(item => item.type === 'bug'),
    improvements: feedback.items.filter(item => item.type === 'improvement'),
    bestPractices: feedback.items.filter(item => item.type === 'best_practice'),
    security: feedback.items.filter(item => item.type === 'security'),
    accessibility: feedback.items.filter(item => item.type === 'accessibility'),
  };

  const feedbackScoreColor = () => {
    if (feedback.overallScore >= 80) return "text-green-600";
    if (feedback.overallScore >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getIconForFeedbackType = (type: FeedbackItem['type']) => {
    switch (type) {
      case 'bug': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'security': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'improvement': return <Info className="h-4 w-4 text-blue-500" />;
      case 'best_practice': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'accessibility': return <CheckCircle className="h-4 w-4 text-purple-500" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getBadgeForSeverity = (severity: FeedbackItem['severity']) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Code Review Results</h2>
        <div className="flex items-center gap-2">
          <div className="text-sm">Overall Score:</div>
          <div className={`text-xl font-bold ${feedbackScoreColor()}`}>
            {feedback.overallScore}/100
          </div>
        </div>
      </div>

      <Card className="p-4 bg-muted/50">
        <h3 className="font-medium mb-2">Summary</h3>
        <p>{feedback.summary}</p>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="mb-4 w-full md:w-auto">
          <TabsTrigger value="all">
            All
            <Badge className="ml-2 bg-gray-200 text-gray-800" variant="outline">{feedback.items.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="bugs">
            Bugs
            <Badge className="ml-2 bg-red-100 text-red-800" variant="outline">{feedbackSummary.bugs.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="improvements">
            Improvements
            <Badge className="ml-2 bg-blue-100 text-blue-800" variant="outline">{feedbackSummary.improvements.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="best-practices">
            Best Practices
            <Badge className="ml-2 bg-green-100 text-green-800" variant="outline">{feedbackSummary.bestPractices.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <div className="grid md:grid-cols-[1fr,1fr] gap-6">
          <div className="order-2 md:order-1">
            {/* Feedback Items */}
            <TabsContent value="all" className="mt-0">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {feedback.items.map((item) => (
                    <FeedbackItemCard 
                      key={item.id} 
                      item={item} 
                      onRatingSubmit={onRatingSubmit} 
                      getIcon={getIconForFeedbackType}
                      getBadge={getBadgeForSeverity}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="bugs" className="mt-0">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {feedbackSummary.bugs.map((item) => (
                    <FeedbackItemCard 
                      key={item.id} 
                      item={item} 
                      onRatingSubmit={onRatingSubmit} 
                      getIcon={getIconForFeedbackType}
                      getBadge={getBadgeForSeverity}
                    />
                  ))}
                  {feedbackSummary.bugs.length === 0 && (
                    <p className="text-center py-4 text-muted-foreground">No bugs detected!</p>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="improvements" className="mt-0">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {feedbackSummary.improvements.map((item) => (
                    <FeedbackItemCard 
                      key={item.id} 
                      item={item} 
                      onRatingSubmit={onRatingSubmit} 
                      getIcon={getIconForFeedbackType}
                      getBadge={getBadgeForSeverity}
                    />
                  ))}
                  {feedbackSummary.improvements.length === 0 && (
                    <p className="text-center py-4 text-muted-foreground">No improvement suggestions.</p>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="best-practices" className="mt-0">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {feedbackSummary.bestPractices.map((item) => (
                    <FeedbackItemCard 
                      key={item.id} 
                      item={item} 
                      onRatingSubmit={onRatingSubmit} 
                      getIcon={getIconForFeedbackType}
                      getBadge={getBadgeForSeverity}
                    />
                  ))}
                  {feedbackSummary.bestPractices.length === 0 && (
                    <p className="text-center py-4 text-muted-foreground">No best practice recommendations.</p>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </div>

          <div className="order-1 md:order-2">
            <h3 className="font-medium mb-2">Your Code</h3>
            <CodePreview code={codeSnippet} language={language} />
          </div>
        </div>
      </Tabs>

      <div className="flex justify-between items-center pt-4 mt-6 border-t">
        <Button
          variant="outline"
          onClick={onNewSubmission}
          className="flex gap-2 items-center"
        >
          Submit Another Snippet
        </Button>
        <div className="text-sm text-muted-foreground">
          Was this review helpful?
          <div className="flex gap-2 mt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRatingSubmit(feedback.id, true)}
              aria-label="Feedback was helpful"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              Yes
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRatingSubmit(feedback.id, false)}
              aria-label="Feedback was not helpful"
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeedbackItemCardProps {
  item: FeedbackItem;
  onRatingSubmit: (id: string, helpful: boolean) => void;
  getIcon: (type: FeedbackItem['type']) => React.ReactNode;
  getBadge: (severity: FeedbackItem['severity']) => React.ReactNode;
}

function FeedbackItemCard({ item, onRatingSubmit, getIcon, getBadge }: FeedbackItemCardProps) {
  return (
    <Card className="p-4">
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          {getIcon(item.type)}
          <h4 className="font-medium">{item.title}</h4>
        </div>
        {getBadge(item.severity)}
      </div>
      
      <p className="text-sm mb-2">{item.description}</p>
      
      {item.suggestion && (
        <div className="bg-muted p-2 rounded-md text-sm font-mono mt-2">
          <div className="text-xs text-muted-foreground mb-1">Suggestion:</div>
          {item.suggestion}
        </div>
      )}
      
      <div className="flex items-center justify-end mt-3 text-sm">
        <div className="mr-2 text-xs text-muted-foreground">Helpful?</div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => onRatingSubmit(item.id, true)}
          aria-label="This feedback item was helpful"
        >
          <ThumbsUp className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => onRatingSubmit(item.id, false)}
          aria-label="This feedback item was not helpful"
        >
          <ThumbsDown className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
}
