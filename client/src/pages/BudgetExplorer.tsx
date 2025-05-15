import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ['#0EA5E9', '#10B981', '#F59E0B', '#6B7280', '#8B5CF6', '#EC4899'];

const BudgetExplorer = () => {
  const [selectedYear, setSelectedYear] = useState("2023-2024");
  const [selectedView, setSelectedView] = useState("overview");
  
  const { data: budgetData, isLoading } = useQuery({
    queryKey: ['/api/budget', selectedYear],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Minimal Header */}
      <div className="mb-10 space-y-1">
        <h1 className="text-3xl font-medium">Budget Explorer</h1>
        <p className="text-neutral-500 text-sm">Financial Year {selectedYear}</p>
      </div>
      
      {/* Clean Year Selector */}
      <div className="mb-8 flex items-center space-x-4">
        {["2023-2024", "2022-2023", "2021-2022"].map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={cn(
              "px-4 py-2 rounded-full text-sm transition-colors",
              year === selectedYear 
                ? "bg-blue-50 text-blue-600" 
                : "text-neutral-500 hover:text-neutral-800"
            )}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Minimal Tabs */}
      <div className="mb-8 border-b">
        {["overview", "comparison", "details"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedView(tab)}
            className={cn(
              "px-6 py-3 text-sm capitalize transition-colors relative",
              selectedView === tab 
                ? "text-blue-600" 
                : "text-neutral-500 hover:text-neutral-800",
              "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5",
              selectedView === tab && "after:bg-blue-600"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {selectedView === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white rounded-xl p-6">
              <h2 className="text-lg font-medium mb-6">Sector-wise Allocation</h2>
              <div className="h-[400px]">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <Skeleton className="h-[350px] w-full rounded" />
                  </div>
                ) : budgetData?.length ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <Pie
                        data={budgetData}
                        cx="35%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={120}
                        fill="#0EA5E9"
                        dataKey="percentage"
                        nameKey="sector"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelStyle={{ fontSize: '12px' }}
                      >
                        {budgetData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '8px', 
                          border: 'none', 
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                        }}
                        formatter={(value) => `${value}%`} 
                      />
                      <Legend 
                        verticalAlign="middle" 
                        align="right" 
                        layout="vertical"
                        wrapperStyle={{
                          paddingLeft: "60px",
                          right: 20,
                          fontSize: '12px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-neutral-500">
                    No data available
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {/* Simplified Budget Cards */}
              {!isLoading && budgetData?.length ? (
                <>
                  <div className="p-6 bg-white rounded-xl">
                    <div className="text-sm text-neutral-500">Total Budget</div>
                    <div className="text-2xl font-medium mt-1">₹39.45L Cr</div>
                  </div>
                  <div className="p-6 bg-white rounded-xl">
                    <div className="text-sm text-neutral-500">Fiscal Deficit</div>
                    <div className="text-2xl font-medium mt-1">5.9%</div>
                    <div className="text-xs text-neutral-400 mt-1">of GDP</div>
                  </div>
                </>
              ) : (
                <Skeleton className="h-[200px] w-full rounded-xl" />
              )}
            </div>
          </div>
        )}

        {selectedView === "comparison" && (
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-medium mb-6">Year-on-Year Comparison</h2>
            <div className="h-[500px]">
              {isLoading ? (
                <Skeleton className="h-full w-full rounded" />
              ) : budgetData?.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Education', '2021-2022': 15, '2022-2023': 17, '2023-2024': 18 },
                      { name: 'Healthcare', '2021-2022': 19, '2022-2023': 22, '2023-2024': 24 },
                      { name: 'Infrastructure', '2021-2022': 17, '2022-2023': 18, '2023-2024': 20 },
                      { name: 'Defense', '2021-2022': 14, '2022-2023': 15, '2023-2024': 15 },
                      { name: 'Agriculture', '2021-2022': 11, '2022-2023': 12, '2023-2024': 12 },
                      { name: 'Other', '2021-2022': 14, '2022-2023': 11, '2023-2024': 11 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="2021-2022" fill={COLORS[0]} />
                    <Bar dataKey="2022-2023" fill={COLORS[1]} />
                    <Bar dataKey="2023-2024" fill={COLORS[2]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-neutral-500">
                  No comparison data available
                </div>
              )}
            </div>
          </div>
        )}

        {selectedView === "details" && (
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-medium mb-6">Detailed Breakdown</h2>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : budgetData?.length ? (
              <div className="space-y-8">
                {/* Simplified sector breakdown */}
                {['Education', 'Healthcare', 'Infrastructure'].map((sector, i) => (
                  <div key={sector} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{sector}</h3>
                      <span className="text-sm text-neutral-500">
                        {[18, 24, 20][i]}%
                      </span>
                    </div>
                    <div className="space-y-2">
                      {/* Progress bars with minimal styling */}
                      <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${[60, 50, 65][i]}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-neutral-500">
                No detailed data available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetExplorer;