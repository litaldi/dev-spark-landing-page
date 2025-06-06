
import { 
  Home, 
  BookOpen, 
  User, 
  Settings, 
  HelpCircle
} from 'lucide-react';
import { NavigationItem } from './navigation-types';

export const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    path: '/dashboard',
    description: 'Your learning overview'
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    path: '/profile',
    description: 'Manage your account'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    description: 'App preferences'
  },
  {
    id: 'help',
    label: 'Help',
    icon: HelpCircle,
    path: '/help',
    description: 'Get support'
  }
];
