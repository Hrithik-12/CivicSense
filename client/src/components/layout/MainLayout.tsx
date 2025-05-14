import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Sidebar isCollapsed={isCollapsed} onCollapse={setIsCollapsed} />
      <main 
        className={`transition-all duration-300 ${
          isCollapsed 
            ? 'ml-20' 
            : 'ml-64'
        }`}
      >
        <Header />
        <div className={`
          transition-all duration-300 px-4 py-8
          ${isCollapsed 
            ? 'container mx-auto' 
            : 'pr-6 pl-6'
          }
        `}>
          <div className={`
            max-w-5xl mx-auto transition-all duration-300
            ${!isCollapsed && 'transform -translate-x-22'}
          `}>
            {children}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
