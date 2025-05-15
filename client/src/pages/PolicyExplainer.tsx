import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Search, 
  Upload, 
  FileText, 
  CheckCircle, 
  Share2, 
  Download, 
  Clock, 
  AlertTriangle,
  FileQuestion,
  TrendingUp,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface ExplanationResult {
  id: number;
  query: string;
  explanation: string;
  summary: string;
  keyPoints: string[];
  error?: string;
}

const PolicyExplainer = () => {
  const [query, setQuery] = useState("");
  const [documentText, setDocumentText] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanationResult, setExplanationResult] = useState<ExplanationResult | null>(null);
  const { toast } = useToast();

  const { data: trendingQueries, isLoading: isLoadingTrending } = useQuery({
    queryKey: ['/api/trending-policies'],
  });

  const popularSearches = [
    "Digital Personal Data Protection Act",
    "Consumer Protection Act",
    "Income Tax Rules",
    "Banking Regulations",
    "Right to Information Act",
    "Motor Vehicles Act"
  ];

  const recentPolicies = [
    {
      id: 1,
      title: "Digital Personal Data Protection Act, 2023",
      description: "Establishes a comprehensive framework for the protection of personal digital data in India.",
      date: "August 2023"
    },
    {
      id: 2,
      title: "New Banking Regulations",
      description: "Updated rules for digital banking, mobile payments, and customer verification procedures.",
      date: "July 2023"
    },
    {
      id: 3,
      title: "Telecom Bill 2023",
      description: "New legislation governing telecommunications services, infrastructure, and licensing.",
      date: "September 2023"
    }
  ];

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a policy or law to explain",
        variant: "destructive",
      });
      return;
    }

    setIsExplaining(true);
    try {
      console.log('Sending search request with:', { text: query, type: 'policy' });
      
      const res = await apiRequest("POST", "/api/explain-policy", {
        text: query,  // This is the key field needed by the API
        type: "policy",
        language: "en",
        format: "detailed"
      });
      
      console.log('Response status:', res.status);
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error('API error response:', errorData);
        throw new Error(errorData.message || 'Failed to get explanation');
      }

      const data = await res.json();
      console.log('API success response:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }

      setExplanationResult(data);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to get explanation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExplaining(false);
    }
  };

  const handleDocumentExplain = async () => {
    if (!documentText.trim()) {
      toast({
        title: "Error",
        description: "Please enter the document text to explain",
        variant: "destructive",
      });
      return;
    }

    setIsExplaining(true);
    try {
      console.log('Sending document explain request with text length:', documentText.length);
      
      const res = await apiRequest("POST", "/api/explain-policy", {
        text: documentText,  // This is the key field needed by the API
        type: "document",
        language: "en",
        format: "detailed"
      });
      
      console.log('Response status:', res.status);

      if (!res.ok) {
        const errorData = await res.json();
        console.error('API error response:', errorData);
        throw new Error(errorData.message || 'Failed to process document');
      }

      const data = await res.json();
      console.log('API success response:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }

      setExplanationResult(data);
    } catch (error) {
      console.error('Document processing error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExplaining(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && file.type !== "text/plain") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or text file only",
        variant: "destructive",
      });
      return;
    }

    // Add file size check
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setDocumentText(event.target.result.toString());
      }
    };
    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to read file. Please try again.",
        variant: "destructive",
      });
    };
    reader.readAsText(file);
  };

  const handlePopularSearch = (search: string) => {
    setQuery(search);
    setActiveTab("search");
    handleSearch();
  };

  const handleCopyToClipboard = () => {
    if (!explanationResult) return;
    
    const keyPointsText = Array.isArray(explanationResult.keyPoints) 
      ? explanationResult.keyPoints.map(point => `- ${point}`).join('\n')
      : '';
    
    const textToCopy = `${explanationResult.summary}\n\n${explanationResult.explanation}\n\nKey Points:\n${keyPointsText}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "Copied!",
        description: "Explanation copied to clipboard",
      });
    }).catch(err => {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-xl mb-2">Legal Document Analyzer</h1>
        <p className="text-gray-600 text-sm">
          Analyze official documents and get basic information in simpler format
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle>Understand Legal Documents</CardTitle>
          <CardDescription>
            Find information about laws or upload documents to see them explained in simple terms
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="bg-neutral-light bg-opacity-20 rounded-lg p-4 mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="search">Search Laws</TabsTrigger>
                <TabsTrigger value="upload">Upload Document</TabsTrigger>
                <TabsTrigger value="trending">Trending Laws</TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="mt-4">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-medium" />
                    <Input
                      type="text"
                      placeholder="Search for a law, policy, or regulation..."
                      className="pl-10"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-neutral-medium mb-2">Popular searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-50 text-primary px-2 py-1 rounded-full cursor-pointer"
                        onClick={() => handlePopularSearch(search)}
                      >
                        {search}
                      </span>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full mt-4" 
                  onClick={handleSearch}
                  disabled={isExplaining || !query.trim()}
                >
                  {isExplaining ? "Processing..." : "Explain This Law/Policy"}
                </Button>
              </TabsContent>

              <TabsContent value="upload" className="mt-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Upload a legal document (PDF or text file)
                  </label>
                  <div className="border-2 border-dashed border-neutral-light rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-neutral-medium mx-auto mb-2" />
                    <p className="text-sm text-neutral-medium mb-2">
                      Drag and drop your file here, or click to browse
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.txt"
                      onChange={handleFileUpload}
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Or paste document text here:
                  </label>
                  <Textarea
                    placeholder="Paste the text content of the document here..."
                    className="min-h-[120px]"
                    value={documentText}
                    onChange={(e) => setDocumentText(e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleDocumentExplain}
                  disabled={isExplaining || !documentText.trim()}
                >
                  {isExplaining ? "Processing..." : "Explain This Document"}
                </Button>
              </TabsContent>

              <TabsContent value="trending" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-neutral-medium">
                    Currently trending laws and policies that people are searching for:
                  </p>

                  {isLoadingTrending ? (
                    <div className="space-y-3">
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recentPolicies.map((policy) => (
                        <div 
                          key={policy.id} 
                          className="border rounded-lg p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                          onClick={() => handlePopularSearch(policy.title)}
                        >
                          <div className="flex items-start">
                            <div className="mr-3 mt-1">
                              <TrendingUp className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{policy.title}</h4>
                              <p className="text-xs text-neutral-medium mt-1">{policy.description}</p>
                              <div className="flex items-center mt-2">
                                <Clock className="h-3 w-3 text-neutral-medium mr-1" />
                                <span className="text-xs text-neutral-medium">{policy.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Processing indicator */}
          {isExplaining && (
            <div className="bg-blue-50 rounded-lg p-4 border border-primary border-opacity-20 mb-4">
              <div className="flex flex-col items-center">
                <Info className="h-6 w-6 text-primary animate-pulse mb-2" />
                <p className="text-primary font-medium mb-2">Processing your request...</p>
                <p className="text-sm text-neutral-medium mb-4">
                  We are analyzing and simplifying the legal language for you. This should take a moment.
                </p>
                <Progress value={66} className="w-full max-w-md" />
              </div>
            </div>
          )}

          {/* Explanation Result */}
          {explanationResult && !isExplaining && (
            <div className="bg-blue-50 rounded-lg p-4 border border-primary border-opacity-20">
              <div className="flex items-start">
                <div className="bg-primary p-2 rounded-lg mr-3 flex-shrink-0">
                  <Info className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-primary mb-1">{explanationResult.summary}</h4>
                  
                  <div className="mb-4">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="explanation">
                        <AccordionTrigger>Detailed Explanation</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm mb-3">{explanationResult.explanation}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="mb-4">
                    <h5 className="font-medium text-sm mb-2">Key Points:</h5>
                    <ul className="text-sm space-y-2">
                      {Array.isArray(explanationResult.keyPoints) && explanationResult.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <a href="#" className="text-primary font-medium">Read full explanation</a>
                    <div className="flex items-center space-x-4">
                      <button 
                        className="text-neutral-medium hover:text-primary"
                        onClick={handleCopyToClipboard}
                      >
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

      {/* Additional sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              Our tool helps understand legal documents more easily
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Input Legal Text</h4>
                  <p className="text-sm text-neutral-medium">
                    Search for a specific law or upload your legal document
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Document Analysis</h4>
                  <p className="text-sm text-neutral-medium">
                    We analyze and break down the complex legal terminology
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Simple Explanation</h4>
                  <p className="text-sm text-neutral-medium">
                    Get an easy-to-understand explanation with key points highlighted
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Common questions about laws and policies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  What is the Digital Personal Data Protection Act?
                </AccordionTrigger>
                <AccordionContent>
                  The Digital Personal Data Protection Act, 2023 is a law that protects individuals' personal data, 
                  gives them rights over their information, and sets rules for how organizations can collect and use 
                  personal data.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What are my rights as a consumer in online shopping?
                </AccordionTrigger>
                <AccordionContent>
                  As an online consumer, you have the right to return products within 30 days, receive accurate 
                  product information, data privacy protection, and file complaints against unfair trade practices 
                  under the Consumer Protection Act, 2019.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How do recent tax law changes affect me?
                </AccordionTrigger>
                <AccordionContent>
                  Recent tax law changes include new income tax slabs, simplified filing procedures, and updated 
                  deduction limits. The specific impact depends on your income level and investment patterns. 
                  Use our Policy Impact Calculator for personalized information.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <FileQuestion className="mr-2 h-4 w-4" />
              Ask Another Question
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Warning notice */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Important Notice</h3>
            <p className="text-sm text-amber-700 mt-1">
              The explanations provided by this tool are meant to simplify understanding and should not be 
              considered legal advice. For specific legal situations, please consult with a qualified legal professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyExplainer;
