import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import BudgetExplorer from "@/pages/BudgetExplorer";
import KnowYourRights from "@/pages/KnowYourRights";
import DigitalSecurity from "@/pages/DigitalSecurity";
import PolicyExplainer from "@/pages/PolicyExplainer";
import FactChecker from "@/pages/FactChecker";
import PolicyImpactCalculator from "@/pages/PolicyImpactCalculator";
import LawsAndRegulations from "@/pages/LawsAndRegulations";
import SchemesAndResponsibilities from "@/pages/SchemesAndResponsibilities";
import TaxResponsibilities from "@/pages/TaxResponsibilities";
import Govt from "@/pages/Govt";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/budget" component={BudgetExplorer} />
        <Route path="/rights" component={KnowYourRights} />
        <Route path="/security" component={DigitalSecurity} />
        <Route path="/policy-explainer" component={PolicyExplainer} />
        <Route path="/fact-checker" component={FactChecker} />
        <Route path="/impact-calculator" component={PolicyImpactCalculator} />
        <Route path="/laws" component={LawsAndRegulations} />
        <Route path="/schemes" component={SchemesAndResponsibilities} />
        <Route path="/tax" component={TaxResponsibilities} />
        <Route path="/Govt" component={Govt} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
