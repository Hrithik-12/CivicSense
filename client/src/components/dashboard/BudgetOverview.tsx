import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface BudgetData {
  sector: string;
  percentage: number;
  amount: number;
}

interface BudgetHighlight {
  id: number;
  title: string;
  description: string;
  trend: "up" | "down" | "stable";
  percentage?: number;
}

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#6B7280', '#8B5CF6', '#EC4899'];

const BudgetOverview = () => {
  const [selectedYear, setSelectedYear] = useState("2023-2024");
  
  const { data: budgetData, isLoading: isLoadingBudget } = useQuery({
    queryKey: ['/api/budget', selectedYear],
  });

  // Sample budget highlights
  const budgetHighlights: BudgetHighlight[] = [
    {
      id: 1,
      title: "Education Spending",
      description: "Increased by 12% from last year",
      trend: "up",
      percentage: 12
    },
    {
      id: 2,
      title: "Healthcare Budget",
      description: "Increased by 15% to ₹83,000 crores",
      trend: "up",
      percentage: 15
    },
    {
      id: 3,
      title: "Defense Allocation",
      description: "Decreased by 3% compared to previous year",
      trend: "down",
      percentage: 3
    },
    {
      id: 4,
      title: "Infrastructure Development",
      description: "Increased by 8% with focus on rural roads",
      trend: "up",
      percentage: 8
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Budget Overview</h2>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023-2024">2023-2024</SelectItem>
            <SelectItem value="2022-2023">2022-2023</SelectItem>
            <SelectItem value="2021-2022">2021-2022</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Government Spending by Sector</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingBudget ? (
              <div className="flex justify-center items-center h-[250px]">
                <Skeleton className="h-[250px] w-full rounded-md" />
              </div>
            ) : budgetData && budgetData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                    nameKey="sector"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {budgetData.map((entry: BudgetData, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex justify-center items-center h-[250px] text-neutral-medium">
                No budget data available for this year
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Key Budget Highlights */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Budget Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {budgetHighlights.map((highlight) => (
                <li key={highlight.id} className="flex items-start">
                  <div className={`${highlight.trend === 'up' ? 'bg-green-100' : 'bg-red-100'} p-1 rounded-full mt-0.5`}>
                    {highlight.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-secondary" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-error" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{highlight.title}</p>
                    <p className="text-xs text-neutral-medium">{highlight.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 pt-4 border-t border-neutral-light">
              <a href="/budget" className="text-sm text-primary font-medium flex items-center">
                View detailed budget analysis
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetOverview;
