import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface RightsCategory {
  id: number;
  title: string;
  description: string;
}

const KnowYourRights = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("consumer");
  
  const { data: rightsCategories, isLoading } = useQuery({
    queryKey: ['/api/rights'],
  });

  const filterRightsByCategory = (category: string) => {
    if (!rightsCategories) return [];
    
    let filtered = [...rightsCategories];
    
    if (searchQuery) {
      filtered = filtered.filter((right: RightsCategory) => 
        right.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        right.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const consumerRights = filterRightsByCategory("consumer");
  const digitalRights = filterRightsByCategory("digital");
  const citizenRights = filterRightsByCategory("citizen");

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Know Your Rights</h1>
        <p className="text-neutral-medium">Understand your legal rights and protections as a citizen, consumer, and digital user</p>
      </div>
      
      <div className="mb-6">
        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-medium" />
          <Input
            type="text"
            placeholder="Search for specific rights or topics..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="consumer">Consumer Rights</TabsTrigger>
          <TabsTrigger value="digital">Digital Rights</TabsTrigger>
          <TabsTrigger value="citizen">Citizen Rights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="consumer">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : consumerRights.length > 0 ? (
              consumerRights.map((right: RightsCategory) => (
                <Card key={right.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{right.title}</CardTitle>
                    <CardDescription>Consumer protection</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-medium mb-4">{right.description}</p>
                    <a href={`/rights/${right.id}`} className="text-primary text-sm font-medium flex items-center">
                      Learn more
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center text-neutral-medium">
                {searchQuery ? 
                  "No rights found matching your search query." : 
                  "No consumer rights information available. Please check back later."}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="digital">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : digitalRights.length > 0 ? (
              digitalRights.map((right: RightsCategory) => (
                <Card key={right.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{right.title}</CardTitle>
                    <CardDescription>Digital privacy & security</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-medium mb-4">{right.description}</p>
                    <a href={`/rights/${right.id}`} className="text-primary text-sm font-medium flex items-center">
                      Learn more
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center text-neutral-medium">
                {searchQuery ? 
                  "No rights found matching your search query." : 
                  "No digital rights information available. Please check back later."}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="citizen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : citizenRights.length > 0 ? (
              citizenRights.map((right: RightsCategory) => (
                <Card key={right.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{right.title}</CardTitle>
                    <CardDescription>Fundamental rights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-medium mb-4">{right.description}</p>
                    <a href={`/rights/${right.id}`} className="text-primary text-sm font-medium flex items-center">
                      Learn more
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center text-neutral-medium">
                {searchQuery ? 
                  "No rights found matching your search query." : 
                  "No citizen rights information available. Please check back later."}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowYourRights;
