import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import { ChevronRight, ListCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface LearningPathSectionProps {
  isLoading?: boolean;
  onStartLesson?: (lessonId: string) => void;
}

export const LearningPathSection = ({ isLoading = false, onStartLesson = () => {} }: LearningPathSectionProps) => {
  const isMobile = useIsMobile();
  
  // Example learning path data
  const learningPathSteps = [
    {
      label: "HTML Basics",
      description: "Structure and semantics",
      content: (
        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-muted-foreground">Learn the fundamentals of HTML, including document structure, elements, and semantic markup.</p>
          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 xs:gap-0">
            <div className="text-xs sm:text-sm">
              <span className="text-muted-foreground">Est. time: </span>
              <span className="font-medium">2h</span>
            </div>
            <Button 
              size={isMobile ? "sm" : "default"}
              className="flex items-center gap-1 w-full xs:w-auto"
              onClick={() => onStartLesson("html-basics")}
            >
              {isMobile ? "Start" : "Start Lesson"} <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      label: "CSS Foundations",
      description: "Styling and layout",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Master the basics of CSS, including selectors, properties, the box model, and responsive design.</p>
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="text-muted-foreground">Est. time: </span>
              <span className="font-medium">3h</span>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center gap-1"
              disabled
            >
              Coming Soon
            </Button>
          </div>
        </div>
      ),
    },
    {
      label: "JavaScript Basics",
      description: "Interactivity and logic",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Explore the fundamentals of JavaScript, including variables, functions, control flow, and DOM manipulation.</p>
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="text-muted-foreground">Est. time: </span>
              <span className="font-medium">4h</span>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center gap-1"
              disabled
            >
              Coming Soon
            </Button>
          </div>
        </div>
      ),
    }
  ];

  return (
    <Card className="border border-gray-200 dark:border-gray-700 mb-6 animate-fade-in">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
            <ListCheck className="h-5 w-5 text-primary" />
            Learning Path
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
            View All <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-8 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        ) : (
          <Stepper 
            steps={learningPathSteps} 
            activeStep={0} 
            className={cn(
              "bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/30",
              "rounded-lg p-3 sm:p-4"
            )} 
          />
        )}
      </CardContent>
    </Card>
  );
};
