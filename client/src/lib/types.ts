export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  isActive: boolean;
}

export interface BudgetData {
  id: number;
  year: string;
  sector: string;
  amount: number;
  percentage: number;
}

export interface Project {
  id: number;
  name: string;
  sector: string;
  budget: string;
  timeline: string;
  status: string;
  progress: number;
}

export interface RightsCategory {
  id: number;
  title: string;
  description: string;
}

export interface PolicyUpdate {
  id: number;
  title: string;
  description: string;
  date: string;
  isNew: boolean;
}

export interface ExplanationResult {
  id: number;
  query: string;
  explanation: string;
  summary: string;
  keyPoints: string[];
}

export interface Feedback {
  id: number;
  userId?: number;
  message: string;
  category?: string;
  timestamp: string;
}

export interface NavItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

export interface QuickAccessItem {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  link: string;
}

export interface BudgetHighlight {
  id: number;
  title: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
  percentage?: number;
}
