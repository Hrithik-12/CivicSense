import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Shield, Bell, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import PolicyCard from "../shared/PolicyCard";

interface RightsCategory {
  id: number;
  title: string;
  description: string;
}

interface PolicyUpdate {
  id: number;
  title: string;
  description: string;
  date: string;
  isNew: boolean;
}

const RightsAndUpdates = () => {
  const { data: rightsCategories, isLoading: isLoadingRights } = useQuery({
    queryKey: ['/api/rights'],
  });

  const { data: policyUpdates, isLoading: isLoadingPolicies } = useQuery({
    queryKey: ['/api/policy-updates'],
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Know Your Rights */}
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-t-blue-500">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-lg font-semibold">Know Your Rights</CardTitle>
          </div>
          <CardDescription className="text-gray-600">Understand your legal rights in various scenarios</CardDescription>
        </CardHeader>
        
        <CardContent>
          {isLoadingRights ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {rightsCategories && rightsCategories.length > 0 ? (
                rightsCategories.slice(0, 3).map((category: RightsCategory) => (
                  <li key={category.id} className="py-4 first:pt-0 last:pb-0">
                    <Link href={`/rights/${category.id}`}>
                      <a className="flex justify-between items-center group hover:bg-blue-50 p-3 rounded-lg transition-all duration-200">
                        <div>
                          <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{category.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                      </a>
                    </Link>
                  </li>
                ))
              ) : (
                <div className="py-6 text-center text-gray-500">
                  No rights categories available
                </div>
              )}
            </ul>
          )}
          
          <Button 
            variant="outline" 
            className="mt-6 w-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            asChild
          >
            <Link href="/rights">
              <a className="flex items-center justify-center gap-2">
                Explore All Rights Topics
                <ChevronRight className="h-4 w-4" />
              </a>
            </Link>
          </Button>
        </CardContent>
      </Card>
      
      {/* Recent Policy Updates */}
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-t-amber-500">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Bell className="h-5 w-5 text-amber-600" />
            </div>
            <CardTitle className="text-lg font-semibold">Recent Policy Updates</CardTitle>
          </div>
          <CardDescription className="text-gray-600">Latest changes in government policies and regulations</CardDescription>
        </CardHeader>
        
        <CardContent>
          {isLoadingPolicies ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full rounded-lg" />
              <Skeleton className="h-20 w-full rounded-lg" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
          ) : (
            <ul className="space-y-4">
              {policyUpdates && policyUpdates.length > 0 ? (
                policyUpdates.slice(0, 3).map((update: PolicyUpdate) => (
                  <PolicyCard
                    key={update.id}
                    id={update.id}
                    title={update.title}
                    description={update.description}
                    date={new Date(update.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                    isNew={update.isNew}
                  />
                ))
              ) : (
                <div className="py-6 text-center text-gray-500">
                  No policy updates available
                </div>
              )}
            </ul>
          )}
          
          <Link href="/policy-updates">
            <a className="mt-6 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors group">
              View all policy updates
              <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightsAndUpdates;
