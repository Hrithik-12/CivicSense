import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lightbulb, Share2, Download, CheckCircle } from "lucide-react";
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
      <h2 className="text-xl font-semibold mb-4">AI Law & Policy Explainer</h2>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Simplify Complex Legal Information</CardTitle>
          <CardDescription>Upload a document or search for a law to get an easy-to-understand explanation.</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="bg-neutral-light bg-opacity-20 rounded-lg p-4 mb-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Search Laws</Button>
              <Button variant="outline">Upload Document</Button>
              <Button variant="outline">Trending Laws</Button>
            </div>
          </div>
          
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search for a law, policy, or regulation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-neutral-medium mb-2">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <span 
                  key={index}
                  className="text-xs bg-blue-50 text-primary px-2 py-1 rounded-full cursor-pointer"
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
            <div className="bg-blue-50 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-blue-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-blue-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-blue-200 rounded w-5/6"></div>
            </div>
          )}
          
          {result && (
            <div className="bg-blue-50 rounded-lg p-4 border border-primary border-opacity-20">
              <div className="flex items-start">
                <div className="bg-primary p-2 rounded-lg mr-3">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-primary mb-1">{result.summary}</h4>
                  <p className="text-sm mb-3">{result.explanation}</p>
                  <ul className="text-sm space-y-2 mb-3">
                    {result.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center text-sm">
                    <a href="#" className="text-primary font-medium">Read full explanation</a>
                    <div className="flex items-center space-x-4">
                      <button className="text-neutral-medium hover:text-primary">
                        <Share2 className="h-5 w-5" />
                      </button>
                      <button className="text-neutral-medium hover:text-primary">
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
