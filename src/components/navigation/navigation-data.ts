
import { 
  Home, 
  BookOpen, 
  User, 
  Settings, 
  HelpCircle,
  Users,
  MessageSquare,
  FileQuestion,
  BarChart3,
  Target,
  Zap,
  Award,
  Code,
  Play
} from 'lucide-react';
import { NavigationItem, NavigationSection } from './navigation-types';

export const mainNavigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    path: '/',
    description: 'Return to homepage'
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: BarChart3,
    path: '/dashboard',
    description: 'Your learning hub',
    children: [
      { id: 'dashboard-overview', label: 'Overview', icon: BarChart3, path: '/dashboard', description: 'Learning progress overview' },
      { id: 'dashboard-courses', label: 'My Courses', icon: BookOpen, path: '/dashboard/courses', description: 'Browse enrolled courses' },
      { id: 'dashboard-practice', label: 'Practice Labs', icon: Code, path: '/dashboard/practice', description: 'Interactive coding challenges' },
      { id: 'dashboard-projects', label: 'Projects', icon: Zap, path: '/dashboard/projects', description: 'Build real applications' },
      { id: 'dashboard-achievements', label: 'Achievements', icon: Award, path: '/dashboard/achievements', description: 'View badges & milestones' },
      { id: 'dashboard-sessions', label: 'Study Sessions', icon: Play, path: '/dashboard/sessions', description: 'Track learning time' }
    ]
  },
  {
    id: 'learn',
    label: 'Learn',
    icon: BookOpen,
    path: '/learn',
    description: 'Educational resources',
    children: [
      { id: 'learn-tutorials', label: 'Interactive Tutorials', icon: BookOpen, path: '/learn/tutorials', description: 'Step-by-step guides' },
      { id: 'learn-examples', label: 'Code Examples', icon: Code, path: '/learn/examples', description: 'Real-world samples' },
      { id: 'learn-practices', label: 'Best Practices', icon: Target, path: '/learn/practices', description: 'Industry standards' },
      { id: 'learn-videos', label: 'Video Lessons', icon: Play, path: '/learn/videos', description: 'Comprehensive courses' },
      { id: 'learn-exercises', label: 'Practice Exercises', icon: Zap, path: '/learn/exercises', description: 'Hands-on challenges' }
    ]
  },
  {
    id: 'about',
    label: 'About',
    icon: Users,
    path: '/about',
    description: 'Learn about our mission'
  },
  {
    id: 'support',
    label: 'Support',
    icon: HelpCircle,
    path: '/support',
    description: 'Get help and resources',
    children: [
      { id: 'support-help', label: 'Help Center', icon: HelpCircle, path: '/help', description: 'Documentation & guides' },
      { id: 'support-faq', label: 'FAQ', icon: FileQuestion, path: '/faq', description: 'Common questions' },
      { id: 'support-contact', label: 'Contact Support', icon: MessageSquare, path: '/contact', description: 'Get personalized help' },
      { id: 'support-community', label: 'Community Forum', icon: Users, path: '/community', description: 'Connect with learners' }
    ]
  }
];

export const mobileNavigationSections: NavigationSection[] = [
  {
    title: "Main Navigation",
    items: [
      { id: 'home', label: 'Home', icon: Home, path: '/', description: 'Return to homepage' },
      { id: 'about', label: 'About', icon: Users, path: '/about', description: 'Learn about our mission' }
    ]
  },
  {
    title: "Dashboard",
    items: [
      { id: 'dashboard', label: 'Overview', icon: BarChart3, path: '/dashboard', description: 'Your learning hub' },
      { id: 'courses', label: 'My Courses', icon: BookOpen, path: '/dashboard/courses', description: 'Browse enrolled courses' },
      { id: 'practice', label: 'Practice Labs', icon: Code, path: '/dashboard/practice', description: 'Interactive coding challenges' },
      { id: 'projects', label: 'Projects', icon: Zap, path: '/dashboard/projects', description: 'Build real applications' },
      { id: 'achievements', label: 'Achievements', icon: Award, path: '/dashboard/achievements', description: 'View badges & milestones' },
      { id: 'sessions', label: 'Study Sessions', icon: Play, path: '/dashboard/sessions', description: 'Track learning time' }
    ]
  },
  {
    title: "Learning Resources",
    items: [
      { id: 'tutorials', label: 'Interactive Tutorials', icon: BookOpen, path: '/learn/tutorials', description: 'Step-by-step guides' },
      { id: 'examples', label: 'Code Examples', icon: Code, path: '/learn/examples', description: 'Real-world samples' },
      { id: 'practices', label: 'Best Practices', icon: Target, path: '/learn/practices', description: 'Industry standards' },
      { id: 'videos', label: 'Video Lessons', icon: Play, path: '/learn/videos', description: 'Comprehensive courses' },
      { id: 'exercises', label: 'Practice Exercises', icon: Zap, path: '/learn/exercises', description: 'Hands-on challenges' }
    ]
  },
  {
    title: "Support & Help",
    items: [
      { id: 'help', label: 'Help Center', icon: HelpCircle, path: '/help', description: 'Documentation & guides' },
      { id: 'faq', label: 'FAQ', icon: FileQuestion, path: '/faq', description: 'Common questions' },
      { id: 'contact', label: 'Contact Support', icon: MessageSquare, path: '/contact', description: 'Get personalized help' },
      { id: 'community', label: 'Community Forum', icon: Users, path: '/community', description: 'Connect with learners' }
    ]
  }
];
