
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { isRateLimited } from '@/lib/security';

interface DashboardActions {
  startFirstLesson: () => void;
  startSession: () => void;
  startLesson: (lessonId?: string) => void;
  handleAction: (action: string) => void;
}

export const useDashboardActions = (onError: (error: string | null) => void): DashboardActions => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const startFirstLesson = useCallback(() => {
    // Check rate limiting
    if (isRateLimited('start-lesson', 5)) {
      onError('Too many attempts. Please wait a moment before trying again.');
      return;
    }

    try {
      // Mark onboarding as complete
      localStorage.setItem('onboardingComplete', 'true');
      localStorage.setItem('firstLessonStarted', 'true');
      
      toast({
        title: 'Welcome to your first lesson!',
        description: 'Let\'s start with the basics of web development.',
      });
      
      // Navigate to first lesson or simulate starting
      console.log('Starting first lesson...');
    } catch (error) {
      console.error('Error starting first lesson:', error);
      onError('Failed to start the lesson. Please try again.');
    }
  }, [onError, toast]);

  const startSession = useCallback(() => {
    // Check rate limiting
    if (isRateLimited('start-session', 10)) {
      onError('Too many session starts. Please wait a moment.');
      return;
    }

    try {
      // Update last session date
      localStorage.setItem('lastSessionDate', new Date().toISOString());
      
      toast({
        title: 'Session started!',
        description: 'Ready to continue your learning journey.',
      });
      
      console.log('Starting learning session...');
    } catch (error) {
      console.error('Error starting session:', error);
      onError('Failed to start the session. Please try again.');
    }
  }, [onError, toast]);

  const startLesson = useCallback((lessonId?: string) => {
    // Check rate limiting
    if (isRateLimited('start-lesson', 5)) {
      onError('Too many lesson starts. Please wait a moment.');
      return;
    }

    try {
      const lesson = lessonId || 'default-lesson';
      
      toast({
        title: 'Lesson started!',
        description: `Beginning lesson: ${lesson}`,
      });
      
      console.log(`Starting lesson: ${lesson}`);
    } catch (error) {
      console.error('Error starting lesson:', error);
      onError('Failed to start the lesson. Please try again.');
    }
  }, [onError, toast]);

  const handleAction = useCallback((action: string) => {
    try {
      switch (action) {
        case 'help':
          toast({
            title: 'Help Center',
            description: 'Opening help documentation...',
          });
          // Could navigate to help page or open help modal
          break;
        case 'settings':
          navigate('/settings');
          break;
        case 'profile':
          navigate('/profile');
          break;
        default:
          console.log(`Handling action: ${action}`);
      }
    } catch (error) {
      console.error('Error handling action:', error);
      onError('Failed to complete the action. Please try again.');
    }
  }, [navigate, onError, toast]);

  return {
    startFirstLesson,
    startSession,
    startLesson,
    handleAction
  };
};
