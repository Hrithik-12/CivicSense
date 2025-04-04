import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background font-sans text-neutral-dark">
      <Sidebar />
      <main className="lg:ml-64 w-full">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
