
import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  description?: string;
  badge?: string;
}
