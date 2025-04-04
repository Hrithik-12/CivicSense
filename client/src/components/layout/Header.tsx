import { useState } from "react";
import { Search } from "lucide-react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-blue-100 border-b border-gray-300 py-3 px-4 sticky top-0 z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center mb-2 md:mb-0">
          <div className="text-blue-700 font-normal mr-2 text-lg">Citizen Portal</div>
          <div className="text-xs text-gray-600 hidden md:block">Government Information System</div>
        </div>
        
        <div className="relative md:w-1/2">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-8 pr-4 py-1 border border-gray-400 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="h-4 w-4 text-gray-500 absolute left-2 top-2" />
        </div>
        
        <div className="hidden md:flex items-center space-x-2 text-xs">
          <span>Help</span>
          <span>|</span>
          <span>Contact</span>
          <span>|</span>
          <span>Login</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
