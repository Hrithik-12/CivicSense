import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects', selectedSector !== "All Sectors" ? selectedSector : undefined],
  });

  // Status badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-secondary";
      case "Delayed":
        return "bg-yellow-100 text-accent";
      case "Completed":
        return "bg-green-100 text-secondary";
      case "At Risk":
        return "bg-red-100 text-error";
      default:
        return "bg-gray-100 text-neutral-medium";
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Government Spending Tracker</h2>
      
      <Card>
        <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base font-medium">Track Public Infrastructure Projects</CardTitle>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <span className="text-sm text-neutral-medium">Filter by:</span>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-[180px]">
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
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-neutral-light bg-opacity-30">
                <TableRow>
                  <TableHead className="whitespace-nowrap">Project Name</TableHead>
                  <TableHead className="whitespace-nowrap">Budget</TableHead>
                  <TableHead className="whitespace-nowrap">Timeline</TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead className="whitespace-nowrap">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <TableRow key={index}>
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
                ) : projects && projects.length > 0 ? (
                  projects.map((project: Project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-neutral-medium">{project.sector}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{project.budget}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{project.timeline}</div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Progress value={project.progress} className="h-2.5" />
                        <div className="text-xs text-right mt-1">{project.progress}%</div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-neutral-medium">
                      No projects available for the selected sector
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {projects && projects.length > 0 && (
            <div className="p-4 border-t border-neutral-light flex justify-between items-center">
              <div className="text-sm text-neutral-medium">Showing {projects.length} of {projects.length} projects</div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled={true}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled={true}>
                  Next
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
