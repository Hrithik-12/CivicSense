import { 
  LayoutDashboard, 
  DollarSign, 
  Shield, 
  ShieldCheck, 
  Scale, 
  Landmark, 
  TrendingUp, 
  FileText, 
  Calculator, 
  CheckCircle 
} from "lucide-react";

export const navItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: <LayoutDashboard className="h-5 w-5 mr-2" />
  },
  {
    title: "Finance & Budget",
    path: "/budget",
    icon: <DollarSign className="h-5 w-5 mr-2" />
  },
  {
    title: "Digital Security",
    path: "/security",
    icon: <Shield className="h-5 w-5 mr-2" />
  },
  {
    title: "Consumer Rights",
    path: "/rights",
    icon: <ShieldCheck className="h-5 w-5 mr-2" />
  },
  {
    title: "Laws & Regulations",
    path: "/laws",
    icon: <Scale className="h-5 w-5 mr-2" />
  },
  {
    title: "Schemes",
    path: "/schemes",
    icon: <TrendingUp className="h-5 w-5 mr-2" />
  },
  {
    title: "Tax Responsibilities",
    path: "/tax",
    icon: <FileText className="h-5 w-5 mr-2" />
  }
];

export const toolItems = [
  {
    title: "AI Policy Explainer",
    path: "/policy-explainer",
    icon: <Landmark className="h-5 w-5 mr-2" />
  },
  {
    title: "Policy Impact Calculator",
    path: "/impact-calculator",
    icon: <Calculator className="h-5 w-5 mr-2" />
  },
  {
    title: "Fact Checker",
    path: "/fact-checker",
    icon: <CheckCircle className="h-5 w-5 mr-2" />
  }
];

export const quickAccessItems = [
  {
    id: 1,
    title: "Know Your Rights",
    description: "Explore legal rights in various scenarios",
    icon: <FileText className="h-6 w-6 text-primary" />,
    color: "bg-blue-100",
    link: "/rights"
  },
  {
    id: 2,
    title: "Budget Visualizer",
    description: "See how government allocates funds",
    icon: <DollarSign className="h-6 w-6 text-secondary" />,
    color: "bg-green-100",
    link: "/budget"
  },
  {
    id: 3,
    title: "Digital Safety",
    description: "Learn about online security best practices",
    icon: <Shield className="h-6 w-6 text-accent" />,
    color: "bg-amber-100",
    link: "/security"
  },
  {
    id: 4,
    title: "Fact Checker",
    description: "Verify news about government policies",
    icon: <CheckCircle className="h-6 w-6 text-error" />,
    color: "bg-red-100",
    link: "/fact-checker"
  }
];

export const budgetHighlights = [
  {
    id: 1,
    title: "Education Spending",
    description: "Increased by 12% from last year",
    trend: "up" as const,
    percentage: 12
  },
  {
    id: 2,
    title: "Healthcare Budget",
    description: "Increased by 15% to ₹83,000 crores",
    trend: "up" as const,
    percentage: 15
  },
  {
    id: 3,
    title: "Defense Allocation",
    description: "Decreased by 3% compared to previous year",
    trend: "down" as const,
    percentage: 3
  },
  {
    id: 4,
    title: "Infrastructure Development",
    description: "Increased by 8% with focus on rural roads",
    trend: "up" as const,
    percentage: 8
  }
];
