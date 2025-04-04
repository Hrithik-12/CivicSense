import { Link } from "wouter";

interface PolicyCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  isNew: boolean;
}

const PolicyCard = ({ id, title, description, date, isNew }: PolicyCardProps) => {
  return (
    <li className={`border-l-2 ${isNew ? "border-accent" : "border-neutral-light"} pl-4`}>
      {isNew && <span className="text-xs font-medium text-accent">New</span>}
      <h4 className="font-medium mt-1">{title}</h4>
      <p className="text-sm text-neutral-medium mt-1">{description}</p>
      <div className="flex items-center mt-2">
        <span className="text-xs text-neutral-medium">{date}</span>
        <Link href={`/policy-updates/${id}/compare`}>
          <a className="text-xs text-primary font-medium ml-4">Compare changes</a>
        </Link>
      </div>
    </li>
  );
};

export default PolicyCard;
