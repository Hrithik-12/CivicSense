import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Shield, Search, ChevronRight, Lock, Users } from "lucide-react";

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
    if (!rightsCategories || !Array.isArray(rightsCategories)) return [];
    
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Know Your Rights
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understand and protect your legal rights as a citizen, consumer, and digital user in the modern world
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-hover:text-primary" />
            <Input
              type="text"
              placeholder="Search for specific rights or topics..."
              className="w-full pl-12 pr-4 h-12 rounded-full border-gray-200 shadow-sm focus:ring-2 focus:ring-primary/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white/50 backdrop-blur-sm p-1 rounded-full border shadow-sm w-fit mx-auto">
            <TabsTrigger 
              value="consumer" 
              className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-200"
            >
              <Shield className="w-4 h-4 mr-2" />
              Consumer Rights
            </TabsTrigger>
            <TabsTrigger 
              value="digital"
              className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-200"
            >
              <Lock className="w-4 h-4 mr-2" />
              Digital Rights
            </TabsTrigger>
            <TabsTrigger 
              value="citizen"
              className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-200"
            >
              <Users className="w-4 h-4 mr-2" />
              Citizen Rights
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    key={right.id}
                  >
                    <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-200">
                      <CardHeader className="pb-2 bg-gradient-to-br from-primary/5 to-transparent">
                        <CardTitle className="text-xl">{right.title}</CardTitle>
                        <CardDescription className="text-primary/60">Consumer protection</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-6 line-clamp-3">{right.description}</p>
                        <a 
                          href={`/rights/${right.id}`} 
                          className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                        >
                          Learn more
                          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-3 py-16 text-center"
                >
                  <div className="max-w-md mx-auto">
                    <p className="text-gray-500 text-lg">
                      {searchQuery ? 
                        "No rights found matching your search query." : 
                        "No consumer rights information available. Please check back later."}
                    </p>
                  </div>
                </motion.div>
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    key={right.id}
                  >
                    <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-200">
                      <CardHeader className="pb-2 bg-gradient-to-br from-primary/5 to-transparent">
                        <CardTitle className="text-xl">{right.title}</CardTitle>
                        <CardDescription className="text-primary/60">Digital privacy & security</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-6 line-clamp-3">{right.description}</p>
                        <a 
                          href={`/rights/${right.id}`} 
                          className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                        >
                          Learn more
                          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-3 py-16 text-center"
                >
                  <div className="max-w-md mx-auto">
                    <p className="text-gray-500 text-lg">
                      {searchQuery ? 
                        "No rights found matching your search query." : 
                        "No digital rights information available. Please check back later."}
                    </p>
                  </div>
                </motion.div>
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    key={right.id}
                  >
                    <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-200">
                      <CardHeader className="pb-2 bg-gradient-to-br from-primary/5 to-transparent">
                        <CardTitle className="text-xl">{right.title}</CardTitle>
                        <CardDescription className="text-primary/60">Fundamental rights</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-6 line-clamp-3">{right.description}</p>
                        <a 
                          href={`/rights/${right.id}`} 
                          className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                        >
                          Learn more
                          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-3 py-16 text-center"
                >
                  <div className="max-w-md mx-auto">
                    <p className="text-gray-500 text-lg">
                      {searchQuery ? 
                        "No rights found matching your search query." : 
                        "No citizen rights information available. Please check back later."}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KnowYourRights;
