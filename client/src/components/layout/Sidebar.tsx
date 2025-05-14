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
  CheckCircle,
  ChevronLeft,
  Menu
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, onCollapse }: SidebarProps) => {
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  const navLinkClass = (path: string) => {
    return `flex items-center px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${
      isActive(path)
        ? "text-blue-600 bg-blue-50 font-medium shadow-sm"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    } ${isCollapsed ? 'justify-center' : ''}`;
  };

  return (
    <aside className={`bg-white shadow-lg fixed h-full z-10 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-between">
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'hidden' : ''}`}>
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-blue-900">Civic Sense</h1>
        </div>
        <button
          onClick={() => onCollapse(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5 text-blue-600" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-blue-600" />
          )}
        </button>
      </div>
      
      <nav className="p-4">
        <div className="mb-6">
          <p className={`text-xs font-medium text-gray-400 mb-3 px-4 uppercase tracking-wider ${
            isCollapsed ? 'hidden' : ''
          }`}>
            Main Menu
          </p>
          <ul className="space-y-1">
            {[
              { href: "/", icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard" },
              { href: "/budget", icon: <DollarSign className="h-5 w-5" />, label: "Finance & Budget" },
              { href: "/security", icon: <Shield className="h-5 w-5" />, label: "Digital Security" },
              { href: "/rights", icon: <ShieldCheck className="h-5 w-5" />, label: "Consumer Rights" },
              { href: "/laws", icon: <Scale className="h-5 w-5" />, label: "Laws & Regulations" },
              { href: "/schemes", icon: <TrendingUp className="h-5 w-5" />, label: "Schemes" },
              { href: "/tax", icon: <FileText className="h-5 w-5" />, label: "Tax Responsibilities" },
            ].map(item => (
              <li key={item.href}>
                <Link href={item.href}>
                  <a className={navLinkClass(item.href)}>
                    <span className={isCollapsed ? '' : 'mr-3'}>{item.icon}</span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <p className={`text-xs font-medium text-gray-400 mb-3 px-4 uppercase tracking-wider ${
            isCollapsed ? 'hidden' : ''
          }`}>
            Tools
          </p>
          <ul className="space-y-1">
            {[
              { href: "/policy-explainer", icon: <Landmark className="h-5 w-5" />, label: "Policy Explainer" },
              { href: "/impact-calculator", icon: <Calculator className="h-5 w-5" />, label: "Impact Calculator" },
              { href: "/fact-checker", icon: <CheckCircle className="h-5 w-5" />, label: "Fact Checker" },
            ].map(item => (
              <li key={item.href}>
                <Link href={item.href}>
                  <a className={navLinkClass(item.href)}>
                    <span className={isCollapsed ? '' : 'mr-3'}>{item.icon}</span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={`mt-8 ${isCollapsed ? 'px-2' : ''}`}>
          <div className={`p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 ${
            isCollapsed ? 'text-center' : 'mx-4'
          }`}>
            {!isCollapsed && (
              <>
                <p className="text-sm font-medium text-blue-800">Beta Version</p>
                <p className="text-xs text-blue-600 mt-1">Help us improve by providing feedback</p>
              </>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
