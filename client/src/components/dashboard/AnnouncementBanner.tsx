import { Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

const AnnouncementBanner = () => {
  const { data: announcements, isLoading, error } = useQuery({
    queryKey: ['/api/announcements'],
  });

  if (isLoading) {
    return (
      <Alert className="bg-blue-50 border-l-4 border-primary p-4 rounded-lg mb-8 animate-pulse">
        <div className="flex">
          <div className="h-5 w-20 bg-blue-200 rounded"></div>
        </div>
      </Alert>
    );
  }

  if (error || !announcements || announcements.length === 0) {
    return null;
  }

  const latestAnnouncement = announcements[0] as Announcement;

  return (
    <Alert className="bg-blue-50 border-l-4 border-primary p-4 rounded-lg mb-8">
      <div className="flex">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-primary" />
        </div>
        <div className="ml-3">
          <AlertTitle className="text-sm font-medium text-primary">{latestAnnouncement.title}</AlertTitle>
          <AlertDescription className="mt-2 text-sm text-neutral-medium">
            <p>{latestAnnouncement.content}</p>
          </AlertDescription>
          <div className="mt-3">
            <a href="#" className="text-sm font-medium text-primary hover:text-indigo-500">
              Learn more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </Alert>
  );
};

export default AnnouncementBanner;
