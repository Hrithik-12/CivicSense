import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#6B7280', '#8B5CF6', '#EC4899'];

const BudgetExplorer = () => {
  const [selectedYear, setSelectedYear] = useState("2023-2024");
  const [selectedView, setSelectedView] = useState("overview");
  
  const { data: budgetData, isLoading } = useQuery({
    queryKey: ['/api/budget', selectedYear],
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Budget Explorer</h1>
        <p className="text-neutral-medium">Visualize and understand government spending and budget allocations</p>
      </div>
      
      <div className="flex justify-end mb-4">
        <div className="flex items-center">
          <span className="mr-2 text-sm">Budget Year:</span>
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
      </div>
      
      <Tabs value={selectedView} onValueChange={setSelectedView} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Year Comparison</TabsTrigger>
          <TabsTrigger value="details">Detailed Breakdown</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Sector-wise Budget Allocation</CardTitle>
                <CardDescription>Breakdown of budget allocation across different sectors</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                {isLoading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <Skeleton className="h-[350px] w-full rounded" />
                  </div>
                ) : budgetData && Array.isArray(budgetData) && budgetData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={budgetData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="percentage"
                        nameKey="sector"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {budgetData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-neutral-medium">
                    No budget data available for this year
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Budget Highlights</CardTitle>
                <CardDescription>Key figures and changes from the budget</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : budgetData && Array.isArray(budgetData) && budgetData.length > 0 ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-primary bg-opacity-10 rounded-lg">
                      <p className="text-sm text-neutral-medium">Total Budget</p>
                      <p className="text-xl font-bold text-primary">₹39.45 Lakh Crores</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-neutral-medium">Fiscal Deficit</p>
                      <p className="text-lg font-semibold">5.9% of GDP</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-neutral-medium">Capital Expenditure</p>
                      <p className="text-lg font-semibold">₹11.11 Lakh Crores</p>
                      <p className="text-xs text-secondary">11.1% increase from last year</p>
                    </div>
                    
                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <p className="text-sm text-neutral-medium">Revenue Deficit</p>
                      <p className="text-lg font-semibold">2.9% of GDP</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-[350px] flex items-center justify-center text-neutral-medium">
                    No budget data available for this year
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Year-on-Year Budget Comparison</CardTitle>
              <CardDescription>Compare budget allocation across years for each sector</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              {isLoading ? (
                <div className="h-full w-full flex items-center justify-center">
                  <Skeleton className="h-[450px] w-full rounded" />
                </div>
              ) : budgetData && Array.isArray(budgetData) && budgetData.length > 0 ? (
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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Percentage of Budget (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="2021-2022" fill="#8884d8" name="2021-2022" />
                    <Bar dataKey="2022-2023" fill="#82ca9d" name="2022-2023" />
                    <Bar dataKey="2023-2024" fill="#ffc658" name="2023-2024" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-neutral-medium">
                  No comparison data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Budget Breakdown</CardTitle>
              <CardDescription>Sub-sector level breakdown of budget allocations</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : budgetData && Array.isArray(budgetData) && budgetData.length > 0 ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Education (18%)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">School Education</p>
                        <p className="text-sm font-medium">₹68,804 Cr</p>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Higher Education</p>
                        <p className="text-sm font-medium">₹44,094 Cr</p>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Healthcare (24%)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Public Health Services</p>
                        <p className="text-sm font-medium">₹41,650 Cr</p>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Medical Research</p>
                        <p className="text-sm font-medium">₹8,300 Cr</p>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Medical Education & Training</p>
                        <p className="text-sm font-medium">₹33,050 Cr</p>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Infrastructure (20%)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Roads & Highways</p>
                        <p className="text-sm font-medium">₹73,000 Cr</p>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full">
                        <div className="h-2 bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Railways</p>
                        <p className="text-sm font-medium">₹40,000 Cr</p>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full">
                        <div className="h-2 bg-amber-500 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[350px] flex items-center justify-center text-neutral-medium">
                  No detailed budget data available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetExplorer;