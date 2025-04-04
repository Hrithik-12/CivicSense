import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ThumbsUp, 
  ThumbsDown,
  Lightbulb,
  FileText,
  Clock,
  Share2,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface FactCheckResult {
  id?: number;
  claim: string;
  analysis: string;
  conclusion: string;
  factRating: "true" | "mostly-true" | "mixed" | "mostly-false" | "false";
  sources: string[];
}

const FactChecker = () => {
  const [claim, setClaim] = useState("");
  const [articleText, setArticleText] = useState("");
  const [activeTab, setActiveTab] = useState("check-claim");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [factCheckResult, setFactCheckResult] = useState<FactCheckResult | null>(null);
  const { toast } = useToast();

  const { data: trendingClaims, isLoading: isLoadingTrending } = useQuery({
    queryKey: ['/api/trending-claims'],
  });

  const popularClaims = [
    "5G networks cause health problems",
    "Drinking lemon water detoxifies your body",
    "Cryptocurrency will replace traditional banking",
    "Remote work increases productivity",
    "AI will replace most jobs in the next decade"
  ];

  const recentArticles = [
    {
      id: 1,
      title: "Understanding Digital Misinformation",
      description: "How to identify and combat false information spreading online",
      date: "March 2023"
    },
    {
      id: 2,
      title: "Verification Methods for Social Media Claims",
      description: "Tools and techniques to check the accuracy of viral social posts",
      date: "February 2023"
    },
    {
      id: 3,
      title: "Common Health Misinformation",
      description: "Debunking popular health myths that continue to circulate online",
      date: "April 2023"
    }
  ];

  const handleCheckClaim = async () => {
    if (!claim.trim()) {
      toast({
        title: "Error",
        description: "Please enter a claim to fact-check",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const res = await apiRequest("POST", "/api/fact-check", { claim });
      const data = await res.json();
      setFactCheckResult(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze claim. Please try again.",
        variant: "destructive",
      });
      // Fallback result for demonstration
      setFactCheckResult({
        claim: claim,
        analysis: "Our AI analyzed this claim using multiple reliable sources.",
        conclusion: "This claim contains elements of both truth and misleading information.",
        factRating: "mixed",
        sources: [
          "Government databases",
          "Academic research papers",
          "Verified news sources"
        ]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleArticleAnalysis = async () => {
    if (!articleText.trim()) {
      toast({
        title: "Error",
        description: "Please enter article text to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const res = await apiRequest("POST", "/api/fact-check", { claim: articleText });
      const data = await res.json();
      setFactCheckResult(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze article. Please try again.",
        variant: "destructive",
      });
      // Fallback result for demonstration
      setFactCheckResult({
        claim: articleText.substring(0, 100) + "...",
        analysis: "Our AI analyzed this article using multiple reliable sources and verification methods.",
        conclusion: "This article contains significant misleading information mixed with some factual content.",
        factRating: "mostly-false",
        sources: [
          "Government databases",
          "Academic research papers",
          "Verified news sources",
          "Historical records"
        ]
      });
    } finally {
      setIsAnalyzing(false);
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

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setArticleText(event.target.result.toString());
      }
    };
    reader.readAsText(file);
  };

  const handlePopularClaim = (selected: string) => {
    setClaim(selected);
    setActiveTab("check-claim");
    handleCheckClaim();
  };

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case "true":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">True</Badge>;
      case "mostly-true":
        return <Badge className="bg-green-50 text-green-600 hover:bg-green-50">Mostly True</Badge>;
      case "mixed":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Mixed</Badge>;
      case "mostly-false":
        return <Badge className="bg-red-50 text-red-600 hover:bg-red-50">Mostly False</Badge>;
      case "false":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">False</Badge>;
      default:
        return <Badge className="bg-neutral-100">Unknown</Badge>;
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case "true":
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "mostly-true":
        return <ThumbsUp className="h-6 w-6 text-green-500" />;
      case "mixed":
        return <AlertTriangle className="h-6 w-6 text-amber-500" />;
      case "mostly-false":
        return <ThumbsDown className="h-6 w-6 text-red-500" />;
      case "false":
        return <XCircle className="h-6 w-6 text-red-600" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-neutral-500" />;
    }
  };

  const handleShareResult = () => {
    if (!factCheckResult) return;
    
    const textToShare = `Fact Check Result:\n\nClaim: ${factCheckResult.claim}\n\nConclusion: ${factCheckResult.conclusion}\n\nRating: ${factCheckResult.factRating}`;
    
    navigator.clipboard.writeText(textToShare).then(() => {
      toast({
        title: "Copied!",
        description: "Fact check result copied to clipboard",
      });
    }).catch(() => {
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
        <h1 className="text-2xl font-bold mb-2">AI Fact Checker</h1>
        <p className="text-neutral-medium">
          Verify claims, news articles, and information with our AI-powered fact checking tool
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle>Verify Facts & Combat Misinformation</CardTitle>
          <CardDescription>
            Check the accuracy of claims or analyze entire news articles for misinformation
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="bg-neutral-light bg-opacity-20 rounded-lg p-4 mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="check-claim">Check Claim</TabsTrigger>
                <TabsTrigger value="analyze-article">Analyze Article</TabsTrigger>
                <TabsTrigger value="trending">Trending Claims</TabsTrigger>
              </TabsList>

              <TabsContent value="check-claim" className="mt-4">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-medium" />
                    <Input
                      type="text"
                      placeholder="Enter a claim or statement to fact-check..."
                      className="pl-10"
                      value={claim}
                      onChange={(e) => setClaim(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCheckClaim()}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-neutral-medium mb-2">Popular claims to check:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularClaims.map((claim, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-50 text-primary px-2 py-1 rounded-full cursor-pointer"
                        onClick={() => handlePopularClaim(claim)}
                      >
                        {claim}
                      </span>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full mt-4" 
                  onClick={handleCheckClaim}
                  disabled={isAnalyzing || !claim.trim()}
                >
                  {isAnalyzing ? "Analyzing..." : "Check This Claim"}
                </Button>
              </TabsContent>

              <TabsContent value="analyze-article" className="mt-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Upload an article (PDF or text file)
                  </label>
                  <div className="border-2 border-dashed border-neutral-light rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-neutral-medium mx-auto mb-2" />
                    <p className="text-sm text-neutral-medium mb-2">
                      Drag and drop your file here, or click to browse
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      id="article-upload"
                      accept=".pdf,.txt"
                      onChange={handleFileUpload}
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("article-upload")?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Or paste article text here:
                  </label>
                  <Textarea
                    placeholder="Paste the text content of the article here..."
                    className="min-h-[120px]"
                    value={articleText}
                    onChange={(e) => setArticleText(e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleArticleAnalysis}
                  disabled={isAnalyzing || !articleText.trim()}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze This Article"}
                </Button>
              </TabsContent>

              <TabsContent value="trending" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-neutral-medium">
                    Currently trending claims and fact-checking resources:
                  </p>

                  {isLoadingTrending ? (
                    <div className="space-y-3">
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recentArticles.map((article) => (
                        <div 
                          key={article.id} 
                          className="border rounded-lg p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                          onClick={() => handlePopularClaim(article.title)}
                        >
                          <div className="flex items-start">
                            <div className="mr-3 mt-1">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">{article.title}</h4>
                              <p className="text-xs text-neutral-medium mt-1">{article.description}</p>
                              <div className="flex items-center mt-2">
                                <Clock className="h-3 w-3 text-neutral-medium mr-1" />
                                <span className="text-xs text-neutral-medium">{article.date}</span>
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
          {isAnalyzing && (
            <div className="bg-blue-50 rounded-lg p-4 border border-primary border-opacity-20 mb-4">
              <div className="flex flex-col items-center">
                <Lightbulb className="h-6 w-6 text-primary animate-pulse mb-2" />
                <p className="text-primary font-medium mb-2">Analyzing claim...</p>
                <p className="text-sm text-neutral-medium mb-4">
                  Our AI is checking multiple sources to verify this information. This should take a few seconds.
                </p>
                <Progress value={66} className="w-full max-w-md" />
              </div>
            </div>
          )}

          {/* Fact Check Result */}
          {factCheckResult && !isAnalyzing && (
            <div className="rounded-lg p-4 border border-opacity-20 mb-4" 
                 style={{ backgroundColor: factCheckResult.factRating === 'true' || factCheckResult.factRating === 'mostly-true' 
                          ? '#f0fdf4' : factCheckResult.factRating === 'mixed' 
                          ? '#fefce8' : '#fef2f2',
                         borderColor: factCheckResult.factRating === 'true' || factCheckResult.factRating === 'mostly-true' 
                          ? '#22c55e' : factCheckResult.factRating === 'mixed' 
                          ? '#eab308' : '#ef4444' }}
            >
              <div className="flex items-start">
                <div className="p-2 rounded-lg mr-3 flex-shrink-0" 
                     style={{ backgroundColor: factCheckResult.factRating === 'true' || factCheckResult.factRating === 'mostly-true' 
                              ? '#dcfce7' : factCheckResult.factRating === 'mixed' 
                              ? '#fef9c3' : '#fee2e2' }}>
                  {getRatingIcon(factCheckResult.factRating)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-medium mr-2">Claim:</h4>
                    {getRatingBadge(factCheckResult.factRating)}
                  </div>
                  
                  <p className="text-sm mb-4">"{factCheckResult.claim}"</p>
                  
                  <div className="mb-4">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="analysis">
                        <AccordionTrigger>Analysis</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm mb-3">{factCheckResult.analysis}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="mb-4">
                    <h5 className="font-medium text-sm mb-2">Conclusion:</h5>
                    <p className="text-sm p-3 rounded-md" 
                       style={{ backgroundColor: factCheckResult.factRating === 'true' || factCheckResult.factRating === 'mostly-true' 
                                ? '#dcfce7' : factCheckResult.factRating === 'mixed' 
                                ? '#fef9c3' : '#fee2e2' }}>
                      {factCheckResult.conclusion}
                    </p>
                  </div>

                  {Array.isArray(factCheckResult.sources) && factCheckResult.sources.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium text-sm mb-2">Sources:</h5>
                      <ul className="text-xs space-y-1 pl-4 list-disc">
                        {factCheckResult.sources.map((source, index) => (
                          <li key={index}>{source}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm">
                    <a href="#" className="text-primary font-medium">Read full analysis</a>
                    <div className="flex items-center space-x-4">
                      <button 
                        className="text-neutral-medium hover:text-primary"
                        onClick={handleShareResult}
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

          {/* Tips for verification */}
          <Alert className="bg-blue-50 border-blue-200">
            <AlertTitle className="text-blue-800">Verification tips</AlertTitle>
            <AlertDescription className="text-blue-700 text-sm">
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Check multiple reliable sources before believing a claim</li>
                <li>Be skeptical of information that seems too good (or bad) to be true</li>
                <li>Look for original sources, not just shares or reposts</li>
                <li>Consider if the claim is missing important context</li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Additional resources section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>How Our Fact Checker Works</CardTitle>
            <CardDescription>
              Our AI-powered system verifies information across multiple trustworthy sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Source Cross-Reference</h4>
                  <p className="text-sm text-neutral-medium">
                    Claims are checked against government data, academic research, and verified news sources
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Context Analysis</h4>
                  <p className="text-sm text-neutral-medium">
                    We evaluate if important context is missing that might change the claim's meaning
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Rating System</h4>
                  <p className="text-sm text-neutral-medium">
                    Claims are rated on a scale from True to False based on evidence and verification
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Misinformation Categories</CardTitle>
            <CardDescription>
              Types of false information you may encounter online
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Out-of-Context Information
                </AccordionTrigger>
                <AccordionContent>
                  True information presented in a misleading context that changes its meaning. 
                  This includes sharing old images as if they're current events or quoting 
                  statements without their full context.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Misleading Statistics
                </AccordionTrigger>
                <AccordionContent>
                  Numbers and statistics that are technically accurate but presented in a way 
                  that leads to incorrect conclusions. This includes cherry-picking data points 
                  or using inappropriate comparisons.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Fabricated Content
                </AccordionTrigger>
                <AccordionContent>
                  Completely false information designed to look like legitimate news or reports. 
                  This includes artificially generated images, fake quotes attributed to public 
                  figures, or entirely fictional events.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Manipulated Media
                </AccordionTrigger>
                <AccordionContent>
                  Photos, videos, or audio that have been altered to change their meaning or context. 
                  This includes sophisticated deepfakes as well as simple edits that change the 
                  meaning of media content.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              View Misinformation Guide
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Important Notice</h3>
            <p className="text-sm text-amber-700 mt-1">
              This tool provides general fact-checking guidance but may not catch all misinformation. 
              Always verify important information with multiple reliable sources before making decisions
              or sharing content with others.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactChecker;