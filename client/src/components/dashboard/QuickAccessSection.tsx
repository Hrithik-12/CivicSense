import { Link } from "wouter";
import { FileText, IndianRupee, Shield, CheckCircle } from "lucide-react";
import InfoCard from "../shared/InfoCard";

const QuickAccessSection = () => {
  const quickAccessItems = [
    {
      id: 1,
      title: "Know Your Rights",
      description: "Explore legal rights in various scenarios",
      icon: <FileText className="h-6 w-6 text-primary" />,
      color: "bg-blue-100",
      link: "/rights"
    },
    {
      id: 2,
      title: "Budget Visualizer",
      description: "See how government allocates funds",
      icon: <IndianRupee className="h-6 w-6 text-primary" />,
      color: "bg-green-100",
      link: "/budget"
    },
    {
      id: 3,
      title: "Digital Safety",
      description: "Learn about online security best practices",
      icon: <Shield className="h-6 w-6 text-primary" />,
      color: "bg-amber-100",
      link: "/security"
    },
    {
      id: 4,
      title: "Fact Checker",
      description: "Verify news about government policies",
      icon: <CheckCircle className="h-6 w-6 text-error" />,
      color: "bg-red-100",
      link: "/fact-check"
    }
  ];

  return (
    <div className="mb-8 p-4">
      <h2 className="text-xl font-semibold mb-6">Quick Access</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickAccessItems.map((item) => (
          <Link key={item.id} href={item.link}>
            <a className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <InfoCard
                title={item.title}
                description={item.description}
                icon={item.icon}
                iconBgColor={item.color}
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessSection;
