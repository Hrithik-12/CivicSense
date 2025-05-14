import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
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

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6'];

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
    <div className="mb-8 p-4 bg-gray-50 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Budget Overview</h2>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px] bg-white shadow-sm">
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
        <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg font-semibold text-gray-700">Government Spending by Sector</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoadingBudget ? (
              <div className="flex justify-center items-center h-[300px]">
                <Skeleton className="h-[300px] w-full rounded-lg" />
              </div>
            ) : budgetData && budgetData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="percentage"
                    nameKey="sector"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {budgetData.map((entry: BudgetData, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                    }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex justify-center items-center h-[300px] text-gray-500">
                No budget data available for this year
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Key Budget Highlights */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg font-semibold text-gray-700">Budget Highlights</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {budgetHighlights.map((highlight) => (
                <li key={highlight.id} className="flex items-start group hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
                  <div className={`${
                    highlight.trend === 'up' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  } p-2 rounded-full mt-0.5`}>
                    {highlight.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-800">{highlight.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{highlight.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-4 border-t">
              <a href="/budget" 
                className="text-sm text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors duration-200">
                View detailed budget analysis
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetOverview;
