
import { useToast } from "@/hooks/use-toast";

export const useDashboardActions = (
  onError?: (error: string | null) => void
) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `You clicked on ${action}. This feature is coming soon!`,
    });
  };

  const startFirstLesson = () => {
    try {
      localStorage.setItem("onboardingComplete", "true");
      toast({
        title: "First Lesson Started",
        description: "Welcome to your learning journey!",
      });
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Failed to start first lesson");
    }
  };

  const startSession = () => {
    handleAction("Start Today's Session");
  };

  const startLesson = (lessonId: string) => {
    toast({
      title: "Lesson Started",
      description: `You've started the lesson: ${lessonId}`,
    });
  };

  return {
    handleAction,
    startFirstLesson,
    startSession,
    startLesson
  };
};
