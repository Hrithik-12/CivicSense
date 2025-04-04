import { useState } from "react";
import { Bell, Search } from "lucide-react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="relative md:w-1/2 mb-4 md:mb-0">
          <input 
            type="text" 
            placeholder="Search laws, policies, or topics..." 
            className="w-full pl-10 pr-4 py-2 border border-neutral-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="h-5 w-5 text-neutral-medium absolute left-3 top-2.5" />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-neutral-medium hover:text-primary">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
              <span>JS</span>
            </div>
            <span className="hidden md:block font-medium">John Smith</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
