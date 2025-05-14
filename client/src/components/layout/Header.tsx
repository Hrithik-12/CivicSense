import { useState } from "react";
import { Search, HelpCircle, Mail, UserCircle, Shield } from "lucide-react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center mb-3 md:mb-0">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-xl shadow-md mr-3">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                Citizen Portal
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Government Information System
              </p>
            </div>
          </div>
        </div>
        
        <div className="relative md:w-1/3">
          <input 
            type="text" 
            placeholder="Search resources, laws, schemes..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-100 text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 
            transition-all duration-200 shadow-sm hover:shadow-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="h-5 w-5 text-blue-500 absolute left-3 top-2.5" />
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center text-gray-600 hover:text-blue-600 
          transition-all duration-200 px-3 py-2 rounded-lg hover:bg-blue-50">
            <HelpCircle className="h-5 w-5 mr-1.5" />
            <span className="text-sm font-medium">Help</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600 
          transition-all duration-200 px-3 py-2 rounded-lg hover:bg-blue-50">
            <Mail className="h-5 w-5 mr-1.5" />
            <span className="text-sm font-medium">Contact</span>
          </button>
          <button className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 
          text-white px-4 py-2 rounded-lg hover:shadow-md transition-all duration-200">
            <UserCircle className="h-5 w-5 mr-1.5" />
            <span className="text-sm font-medium">Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
