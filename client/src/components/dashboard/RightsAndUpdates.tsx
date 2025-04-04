import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
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
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Know Your Rights</CardTitle>
          <CardDescription>Understand your legal rights in various scenarios</CardDescription>
        </CardHeader>
        
        <CardContent>
          {isLoadingRights ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <ul className="divide-y divide-neutral-light">
              {rightsCategories && rightsCategories.length > 0 ? (
                rightsCategories.slice(0, 3).map((category: RightsCategory) => (
                  <li key={category.id} className="py-3 first:pt-0 last:pb-0">
                    <Link href={`/rights/${category.id}`}>
                      <a className="flex justify-between items-center hover:text-primary">
                        <div>
                          <h4 className="font-medium">{category.title}</h4>
                          <p className="text-sm text-neutral-medium mt-1">{category.description}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-neutral-medium" />
                      </a>
                    </Link>
                  </li>
                ))
              ) : (
                <div className="py-6 text-center text-neutral-medium">
                  No rights categories available
                </div>
              )}
            </ul>
          )}
          
          <Button variant="outline" className="mt-4 w-full" asChild>
            <Link href="/rights">
              <a>Explore All Rights Topics</a>
            </Link>
          </Button>
        </CardContent>
      </Card>
      
      {/* Recent Policy Updates */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Recent Policy Updates</CardTitle>
          <CardDescription>Latest changes in government policies and regulations</CardDescription>
        </CardHeader>
        
        <CardContent>
          {isLoadingPolicies ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
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
                <div className="py-6 text-center text-neutral-medium">
                  No policy updates available
                </div>
              )}
            </ul>
          )}
          
          <Link href="/policy-updates">
            <a className="mt-4 inline-block text-sm text-primary font-medium">
              View all policy updates
              <ChevronRight className="h-4 w-4 inline ml-1" />
            </a>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightsAndUpdates;
