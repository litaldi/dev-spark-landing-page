
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { isRateLimited } from '@/lib/security/rate-limiting';

export function useDashboardActions(onError: (error: string | null) => void) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const startFirstLesson = () => {
    // Check rate limiting
    if (isRateLimited('lesson-start', { maxRequests: 5 })) {
      onError('Too many lesson attempts. Please wait before trying again.');
      return;
    }

    try {
      // Mark first lesson as started
      localStorage.setItem('firstLessonStarted', 'true');
      localStorage.setItem('currentLesson', 'javascript-basics');
      localStorage.setItem('lastActivity', new Date().toISOString());
      
      toast({
        title: "Welcome to your first lesson!",
        description: "Let's start with JavaScript basics. You're about to begin an exciting journey!",
      });
      
      // Navigate to lesson (you can customize this route)
      navigate('/lessons/javascript-basics');
    } catch (error) {
      onError('Failed to start lesson. Please try again.');
    }
  };

  const startSession = () => {
    // Check rate limiting
    if (isRateLimited('session-start', { maxRequests: 10 })) {
      onError('Too many session attempts. Please wait before trying again.');
      return;
    }

    try {
      // Update session info
      const sessionDate = new Date().toISOString().split('T')[0];
      localStorage.setItem('lastSessionDate', sessionDate);
      localStorage.setItem('currentSessionStarted', 'true');
      localStorage.setItem('lastActivity', new Date().toISOString());
      
      toast({
        title: "Session started!",
        description: "Welcome back! Ready to continue your learning journey?",
      });
      
      // You can add navigation or other session start logic here
    } catch (error) {
      onError('Failed to start session. Please try again.');
    }
  };

  const startLesson = (lessonId: string) => {
    // Check rate limiting
    if (isRateLimited('lesson-start', { maxRequests: 5 })) {
      onError('Too many lesson attempts. Please wait before trying again.');
      return;
    }

    try {
      localStorage.setItem('currentLesson', lessonId);
      localStorage.setItem('lastActivity', new Date().toISOString());
      
      toast({
        title: "Lesson started!",
        description: `Starting lesson: ${lessonId}`,
      });
      
      navigate(`/lessons/${lessonId}`);
    } catch (error) {
      onError('Failed to start lesson. Please try again.');
    }
  };

  const handleAction = (action: string) => {
    try {
      switch (action) {
        case 'help':
          navigate('/help');
          break;
        case 'settings':
          navigate('/settings');
          break;
        case 'profile':
          navigate('/profile');
          break;
        default:
          console.log(`Action not implemented: ${action}`);
      }
    } catch (error) {
      onError('Failed to perform action. Please try again.');
    }
  };

  return {
    startFirstLesson,
    startSession,
    startLesson,
    handleAction
  };
}
