import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BarChart2 } from "lucide-react";

interface Project {
  id: number;
  name: string;
  sector: string;
  budget: string;
  timeline: string;
  status: string;
  progress: number;
}

const SpendingTracker = () => {
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects', selectedSector !== "All Sectors" ? selectedSector : undefined],
  });

  const totalPages = Math.ceil((projects?.length || 0) / itemsPerPage);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Status badge colors with improved contrast
  const getStatusColor = (status: string) => {
    const colors = {
      "On Track": "bg-green-100 text-green-700",
      "Delayed": "bg-yellow-100 text-yellow-700",
      "Completed": "bg-blue-100 text-blue-700",
      "At Risk": "bg-red-100 text-red-700",
      "default": "bg-gray-100 text-gray-700"
    };
    return colors[status as keyof typeof colors] || colors.default;
  };

  // Progress bar color based on progress value
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <BarChart2 className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Government Spending Tracker</h2>
      </div>
      
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Public Infrastructure Projects
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 mt-1">
                Track the progress and spending of government projects
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Filter by:</span>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="All Sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Sectors">All Sectors</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Defense">Defense</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="whitespace-nowrap font-semibold">Project Name</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold">Budget</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold">Timeline</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold">Status</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: itemsPerPage }).map((_, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell>
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2 mt-1" />
                      </TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                    </TableRow>
                  ))
                ) : paginatedProjects.length > 0 ? (
                  paginatedProjects.map((project: Project) => (
                    <TableRow key={project.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-800">{project.name}</div>
                          <div className="text-sm text-gray-500">{project.sector}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{project.budget}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{project.timeline}</div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Progress 
                          value={project.progress} 
                          className={`h-2 ${getProgressColor(project.progress)}`} 
                        />
                        <div className="text-xs text-right mt-1 font-medium">{project.progress}%</div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No projects available for the selected sector
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {projects.length > 0 && (
            <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
              <div className="text-sm text-gray-600">
                Showing {Math.min(currentPage * itemsPerPage, projects.length)} of {projects.length} projects
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="hover:bg-gray-100"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="hover:bg-gray-100"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SpendingTracker;