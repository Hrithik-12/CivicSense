import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconBgColor: string;
}

const InfoCard = ({ title, description, icon, iconBgColor }: InfoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-neutral-light">
      <div className="flex items-center mb-3">
        <div className={`${iconBgColor} p-2 rounded-lg`}>
          {icon}
        </div>
        <h3 className="ml-3 font-medium">{title}</h3>
      </div>
      <p className="text-sm text-neutral-medium">{description}</p>
    </div>
  );
};

export default InfoCard;
