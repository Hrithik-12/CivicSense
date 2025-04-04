import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  DollarSign, 
  Shield, 
  ShieldCheck, 
  Scale, 
  Landmark, 
  TrendingUp, 
  FileText, 
  Calculator, 
  CheckCircle 
} from "lucide-react";

const Sidebar = () => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  const navLinkClass = (path: string) => {
    return `flex items-center p-1.5 text-sm ${
      isActive(path)
        ? "text-blue-900 bg-blue-200 font-normal"
        : "text-gray-700 hover:bg-gray-100"
    }`;
  };

  return (
    <aside className="bg-gray-50 border-r border-gray-300 lg:w-56 w-full lg:fixed lg:h-full z-10">
      <div className="p-3 border-b border-gray-300 bg-blue-100">
        <div className="flex items-center">
          <h1 className="text-base text-blue-800">Government Portal</h1>
        </div>
      </div>
      
      <nav className="p-2">
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1 pl-2">MAIN MENU</p>
          <ul className="border-t border-b border-gray-200 py-1">
            <li>
              <Link href="/">
                <a className={navLinkClass("/")}>
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </a>
              </Link>
            </li>
            <li>
              <Link href="/budget">
                <a className={navLinkClass("/budget")}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Finance & Budget
                </a>
              </Link>
            </li>
            <li>
              <Link href="/security">
                <a className={navLinkClass("/security")}>
                  <Shield className="h-4 w-4 mr-2" />
                  Digital Security
                </a>
              </Link>
            </li>
            <li>
              <Link href="/rights">
                <a className={navLinkClass("/rights")}>
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Consumer Rights
                </a>
              </Link>
            </li>
            <li>
              <Link href="/laws">
                <a className={navLinkClass("/laws")}>
                  <Scale className="h-4 w-4 mr-2" />
                  Laws & Regulations
                </a>
              </Link>
            </li>
            <li>
              <Link href="/schemes">
                <a className={navLinkClass("/schemes")}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Schemes
                </a>
              </Link>
            </li>
            <li>
              <Link href="/tax">
                <a className={navLinkClass("/tax")}>
                  <FileText className="h-4 w-4 mr-2" />
                  Tax Responsibilities
                </a>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1 pl-2">TOOLS</p>
          <ul className="border-b border-gray-200 py-1">
            <li>
              <Link href="/policy-explainer">
                <a className={navLinkClass("/policy-explainer")}>
                  <Landmark className="h-4 w-4 mr-2" />
                  Policy Explainer
                </a>
              </Link>
            </li>
            <li>
              <Link href="/impact-calculator">
                <a className={navLinkClass("/impact-calculator")}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Impact Calculator
                </a>
              </Link>
            </li>
            <li>
              <Link href="/fact-checker">
                <a className={navLinkClass("/fact-checker")}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Fact Checker
                </a>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mt-4 text-center">
          <div className="bg-gray-200 p-2 text-xs">
            <p className="text-gray-700">Beta Version</p>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
