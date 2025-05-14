import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lightbulb, Share2, Download, CheckCircle, Search, Upload, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExplanationResult {
  id: number;
  query: string;
  explanation: string;
  summary: string;
  keyPoints: string[];
}

const AIExplainer = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ExplanationResult | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a query to search for laws or policies",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiRequest("POST", "/api/explain-policy", { query });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get explanation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const popularSearches = [
    "Digital Personal Data Protection Act",
    "Consumer Protection Act",
    "Income Tax Rules",
    "Banking Regulations"
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">AI Law & Policy Explainer</h2>
      
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4 border-b border-gray-100">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Simplify Complex Legal Information
          </CardTitle>
          <CardDescription className="text-gray-600">
            Upload a document or search for a law to get an easy-to-understand explanation.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Search Laws
              </Button>
              <Button 
                variant="outline"
                className="border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Document
              </Button>
              <Button 
                variant="outline"
                className="border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Trending Laws
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for a law, policy, or regulation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 py-3 border-gray-200 focus:border-blue-300 focus:ring-blue-100 transition-all"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <span 
                  key={index}
                  className="text-sm bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full cursor-pointer hover:bg-blue-100 transition-colors duration-200"
                  onClick={() => {
                    setQuery(search);
                    handleSearch();
                  }}
                >
                  {search}
                </span>
              ))}
            </div>
          </div>
          
          {isLoading && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-blue-200/50 rounded-full w-3/4 mb-3"></div>
              <div className="h-4 bg-blue-200/50 rounded-full w-1/2 mb-3"></div>
              <div className="h-4 bg-blue-200/50 rounded-full w-5/6"></div>
            </div>
          )}
          
          {result && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{result.summary}</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">{result.explanation}</p>
                  <ul className="space-y-3 mb-6">
                    {result.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center pt-4 border-t border-blue-100">
                    <a href="#" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                      Read full explanation
                    </a>
                    <div className="flex items-center gap-4">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full">
                        <Share2 className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIExplainer;
