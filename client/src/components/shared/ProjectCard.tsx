import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  id: number;
  name: string;
  sector: string;
  budget: string;
  timeline: string;
  status: string;
  progress: number;
}

const ProjectCard = ({ name, sector, budget, timeline, status, progress }: ProjectCardProps) => {
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
    <div className="bg-white rounded-lg shadow-sm p-4 border border-neutral-light">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-neutral-medium">{sector}</p>
        </div>
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-neutral-medium">Budget</p>
          <p className="text-sm font-medium">{budget}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-medium">Timeline</p>
          <p className="text-sm font-medium">{timeline}</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs text-neutral-medium">Progress</p>
          <p className="text-xs font-medium">{progress}%</p>
        </div>
        <Progress value={progress} className="h-2.5" />
      </div>
    </div>
  );
};

export default ProjectCard;
