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
    return `flex items-center p-2 rounded-lg ${
      isActive(path)
        ? "text-primary bg-blue-50"
        : "text-neutral-medium hover:bg-blue-50 hover:text-primary"
    }`;
  };

  return (
    <aside className="bg-white shadow-lg lg:w-64 w-full lg:fixed lg:h-full z-10">
      <div className="p-4 border-b border-neutral-light">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-neutral-dark">CivicSense</h1>
        </div>
      </div>
      
      <nav className="p-4">
        <div className="mb-4">
          <p className="text-xs uppercase text-neutral-medium mb-2">Main Categories</p>
          <ul>
            <li className="mb-1">
              <Link href="/">
                <a className={navLinkClass("/")}>
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  Dashboard
                </a>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/budget">
                <a className={navLinkClass("/budget")}>
                  <DollarSign className="h-5 w-5 mr-2" />
                  Finance & Budget
                </a>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/security">
                <a className={navLinkClass("/security")}>
                  <Shield className="h-5 w-5 mr-2" />
                  Digital Security
                </a>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/rights">
                <a className={navLinkClass("/rights")}>
                  <ShieldCheck className="h-5 w-5 mr-2" />
                  Consumer Rights
                </a>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/laws">
                <a className={navLinkClass("/laws")}>
                  <Scale className="h-5 w-5 mr-2" />
                  Laws & Regulations
                </a>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/schemes">
                <a className={navLinkClass("/schemes")}>
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Schemes
                </a>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/tax">
                <a className={navLinkClass("/tax")}>
                  <FileText className="h-5 w-5 mr-2" />
                  Tax Responsibilities
                </a>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mb-4">
          <p className="text-xs uppercase text-neutral-medium mb-2">Tools</p>
          <ul>
            <li className="mb-1">
              <Link href="/policy-explainer">
                <a className={navLinkClass("/policy-explainer")}>
                  <Landmark className="h-5 w-5 mr-2" />
                  AI Policy Explainer
                </a>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/impact-calculator">
                <a className={navLinkClass("/impact-calculator")}>
                  <Calculator className="h-5 w-5 mr-2" />
                  Policy Impact Calculator
                </a>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/fact-check">
                <a className={navLinkClass("/fact-check")}>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Fact Checker
                </a>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mt-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-primary mb-2">Need Help?</h3>
            <p className="text-sm text-neutral-medium mb-3">Have questions about using CivicSense?</p>
            <button className="bg-primary text-white py-2 px-4 rounded-lg text-sm w-full">Contact Support</button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
