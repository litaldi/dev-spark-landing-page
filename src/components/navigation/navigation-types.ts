
import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  description?: string;
  children?: NavigationItem[];
  badge?: string;
  isNew?: boolean;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}
