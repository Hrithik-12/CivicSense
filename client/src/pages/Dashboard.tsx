import WelcomeSection from "@/components/dashboard/WelcomeSection";
import AnnouncementBanner from "@/components/dashboard/AnnouncementBanner";
import QuickAccessSection from "@/components/dashboard/QuickAccessSection";
import BudgetOverview from "@/components/dashboard/BudgetOverview";
import AIExplainer from "@/components/dashboard/AIExplainer";
import RightsAndUpdates from "@/components/dashboard/RightsAndUpdates";
import SpendingTracker from "@/components/dashboard/SpendingTracker";
import FeedbackSection from "@/components/dashboard/FeedbackSection";

const Dashboard = () => {
  return (
    <div className="p-6">
      <WelcomeSection />
      <AnnouncementBanner />
      <QuickAccessSection />
      <BudgetOverview />
      <AIExplainer />
      <RightsAndUpdates />
      <SpendingTracker />
      <FeedbackSection />
    </div>
  );
};

export default Dashboard;
