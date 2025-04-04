import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  Search, 
  Clock, 
  FileText, 
  ChevronRight, 
  AlertTriangle,
  BookOpen,
  Building,
  User,
  Landmark,
  Shield,
  Megaphone
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Law {
  id: number;
  title: string;
  category: string;
  summary: string;
  enactmentDate: string;
  lastUpdated: string;
  status: "in-effect" | "pending" | "repealed";
}

interface Regulation {
  id: number;
  title: string;
  issuingAuthority: string;
  sector: string;
  summary: string;
  publicationDate: string;
  effectiveDate: string;
  status: "active" | "under-review" | "superseded";
}

interface Amendment {
  id: number;
  lawId: number;
  title: string;
  description: string;
  date: string;
  status: "passed" | "pending" | "rejected";
}

const LawsAndRegulations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);

  // Mock data - would be fetched from API in production
  const laws: Law[] = [
    {
      id: 1,
      title: "Digital Personal Data Protection Act, 2023",
      category: "Digital Rights",
      summary: "This act establishes comprehensive framework for the protection of personal data, defines rights of individuals regarding their data, and specifies obligations of entities processing personal data.",
      enactmentDate: "2023-08-11",
      lastUpdated: "2023-11-03",
      status: "in-effect"
    },
    {
      id: 2,
      title: "Consumer Protection Act, 2019",
      category: "Consumer Rights",
      summary: "Law designed to protect consumer interests by establishing authorities and regulatory mechanisms for timely and effective dispute resolution related to consumer grievances.",
      enactmentDate: "2019-08-09",
      lastUpdated: "2022-07-20",
      status: "in-effect"
    },
    {
      id: 3,
      title: "Information Technology Act, 2000",
      category: "Digital Rights",
      summary: "Legal framework addressing various aspects of electronic commerce, electronic records, digital signatures, and cybercrime. Provides legal recognition to electronic transactions.",
      enactmentDate: "2000-06-09",
      lastUpdated: "2022-01-17",
      status: "in-effect"
    },
    {
      id: 4,
      title: "National Blockchain Framework",
      category: "Digital Technology",
      summary: "Proposed regulatory framework for blockchain technology implementation across government services, digital identity, and financial transactions.",
      enactmentDate: "2023-02-15",
      lastUpdated: "2023-12-01",
      status: "pending"
    },
    {
      id: 5,
      title: "Finance Act, 2023",
      category: "Finance",
      summary: "Annual legislation that implements the financial proposals for the fiscal year, including changes to tax rates, exemptions, and procedural frameworks.",
      enactmentDate: "2023-04-01",
      lastUpdated: "2023-10-15",
      status: "in-effect"
    },
    {
      id: 6,
      title: "Digital Competition Bill",
      category: "Digital Rights",
      summary: "Proposed legislation aimed at ensuring fair competition in digital markets, preventing monopolistic practices, and protecting smaller digital businesses.",
      enactmentDate: "2023-03-30",
      lastUpdated: "2023-11-12",
      status: "pending"
    }
  ];
  
  const regulations: Regulation[] = [
    {
      id: 1,
      title: "Personal Data Protection Rules, 2023",
      issuingAuthority: "Ministry of Electronics & IT",
      sector: "Digital",
      summary: "Implementation rules for the Digital Personal Data Protection Act, specifying compliance requirements for different types of data fiduciaries.",
      publicationDate: "2023-09-15",
      effectiveDate: "2023-12-01",
      status: "active"
    },
    {
      id: 2,
      title: "E-Commerce Marketplace Rules, 2022",
      issuingAuthority: "Ministry of Consumer Affairs",
      sector: "E-commerce",
      summary: "Regulations governing online marketplaces, addressing issues like flash sales, preferential treatment, and vendor responsibilities.",
      publicationDate: "2022-06-21",
      effectiveDate: "2023-01-01",
      status: "active"
    },
    {
      id: 3,
      title: "Digital Payment Security Guidelines",
      issuingAuthority: "Reserve Bank of India",
      sector: "Finance",
      summary: "Technical and operational security standards for all entities participating in the digital payment ecosystem.",
      publicationDate: "2023-07-11",
      effectiveDate: "2024-01-01",
      status: "under-review"
    },
    {
      id: 4,
      title: "Cloud Services Framework",
      issuingAuthority: "Ministry of Electronics & IT",
      sector: "Digital",
      summary: "Guidelines for cloud service providers handling government and sensitive personal data, including data localization requirements.",
      publicationDate: "2022-05-15",
      effectiveDate: "2022-10-01",
      status: "active"
    },
    {
      id: 5,
      title: "Social Media Intermediary Guidelines",
      issuingAuthority: "Ministry of Electronics & IT",
      sector: "Digital",
      summary: "Regulations for social media platforms regarding content moderation, user grievances, and traceability of messages.",
      publicationDate: "2021-02-25",
      effectiveDate: "2021-05-26",
      status: "superseded"
    }
  ];
  
  const amendments: Amendment[] = [
    {
      id: 1,
      lawId: 2,
      title: "Consumer Protection (E-Commerce) Amendment",
      description: "Addition of specific provisions for e-commerce platforms, particularly related to sale of counterfeit products and misleading advertisements.",
      date: "2022-07-20",
      status: "passed"
    },
    {
      id: 2,
      lawId: 3,
      title: "IT Act Amendment for Cryptocurrency",
      description: "Proposed amendments to include provisions for regulation of cryptocurrency and digital assets within the legal framework.",
      date: "2023-06-05",
      status: "pending"
    },
    {
      id: 3,
      lawId: 1,
      title: "Data Localization Requirements Amendment",
      description: "Additional provisions regarding storage of critical personal data within national boundaries and cross-border data transfer mechanisms.",
      date: "2023-11-03",
      status: "passed"
    },
    {
      id: 4,
      lawId: 3,
      title: "Intermediary Liability Amendment",
      description: "Changes to provisions regarding liability of intermediaries for user-generated content and due diligence requirements.",
      date: "2022-01-17",
      status: "passed"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-effect":
      case "active":
      case "passed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "pending":
      case "under-review":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
      case "repealed":
      case "superseded":
      case "rejected":
        return <Badge className="bg-neutral-100 text-neutral-800 hover:bg-neutral-100">Inactive</Badge>;
      default:
        return <Badge className="bg-neutral-100">Unknown</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "digital rights":
        return <Shield className="h-10 w-10 p-2 rounded-lg bg-primary bg-opacity-10 text-primary" />;
      case "consumer rights":
        return <User className="h-10 w-10 p-2 rounded-lg bg-green-100 text-green-600" />;
      case "finance":
        return <Building className="h-10 w-10 p-2 rounded-lg bg-amber-100 text-amber-600" />;
      case "digital technology":
        return <BookOpen className="h-10 w-10 p-2 rounded-lg bg-blue-100 text-blue-600" />;
      default:
        return <Landmark className="h-10 w-10 p-2 rounded-lg bg-neutral-100 text-neutral-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredLaws = laws.filter(law => {
    const matchesSearch = law.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          law.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || law.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || law.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredRegulations = regulations.filter(regulation => {
    const matchesSearch = regulation.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          regulation.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || regulation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleLawSelect = (law: Law) => {
    setSelectedLaw(law);
  };

  const lawAmendments = amendments.filter(amendment => 
    selectedLaw && amendment.lawId === selectedLaw.id
  );

  const categories = Array.from(new Set(laws.map(law => law.category)));

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Laws & Regulations</h1>
        <p className="text-neutral-medium">
          Explore key legislation, regulations and amendments impacting citizens
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-medium" />
            <Input
              type="text"
              placeholder="Search laws, regulations, and amendments..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="md:col-span-1 grid grid-cols-2 gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="in-effect">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="repealed">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="laws" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="laws">Laws</TabsTrigger>
              <TabsTrigger value="regulations">Regulations</TabsTrigger>
            </TabsList>
            <TabsContent value="laws" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  {filteredLaws.length > 0 ? (
                    <div className="space-y-4">
                      {filteredLaws.map(law => (
                        <div 
                          key={law.id} 
                          className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                            selectedLaw?.id === law.id ? 'border-primary bg-blue-50' : 'hover:bg-blue-50'
                          }`}
                          onClick={() => handleLawSelect(law)}
                        >
                          <div className="flex items-start">
                            <div className="mr-4">
                              {getCategoryIcon(law.category)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold">{law.title}</h3>
                                {getStatusBadge(law.status)}
                              </div>
                              <p className="text-sm text-neutral-medium mb-2">{law.summary}</p>
                              <div className="flex items-center text-xs text-neutral-medium">
                                <Clock className="h-3 w-3 mr-1" /> 
                                <span>Enacted: {formatDate(law.enactmentDate)}</span>
                                <span className="mx-2">•</span>
                                <span>Last updated: {formatDate(law.lastUpdated)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-center">
                      <Scale className="mx-auto h-10 w-10 text-neutral-medium mb-4" />
                      <h3 className="text-lg font-medium">No laws found</h3>
                      <p className="text-neutral-medium">Try adjusting your search or filters</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="regulations" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  {filteredRegulations.length > 0 ? (
                    <div className="space-y-4">
                      {filteredRegulations.map(regulation => (
                        <div key={regulation.id} className="p-4 border rounded-lg hover:bg-blue-50 transition-colors">
                          <div className="flex items-start">
                            <div className="mr-4">
                              <Megaphone className="h-10 w-10 p-2 rounded-lg bg-blue-100 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold">{regulation.title}</h3>
                                {getStatusBadge(regulation.status)}
                              </div>
                              <p className="text-sm text-neutral-medium mb-2">{regulation.summary}</p>
                              <div className="text-xs flex justify-between">
                                <div className="text-neutral-medium">
                                  <span className="font-medium">Issuing Authority:</span> {regulation.issuingAuthority}
                                </div>
                                <div className="text-neutral-medium">
                                  <span className="font-medium">Effective Date:</span> {formatDate(regulation.effectiveDate)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-center">
                      <Scale className="mx-auto h-10 w-10 text-neutral-medium mb-4" />
                      <h3 className="text-lg font-medium">No regulations found</h3>
                      <p className="text-neutral-medium">Try adjusting your search or filters</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          {selectedLaw ? (
            <Card>
              <CardHeader>
                <CardTitle>Law Details</CardTitle>
                <CardDescription>{selectedLaw.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Category</h4>
                    <div className="flex items-center">
                      {getCategoryIcon(selectedLaw.category)}
                      <span className="ml-2">{selectedLaw.category}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Summary</h4>
                    <p className="text-sm">{selectedLaw.summary}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Important Dates</h4>
                    <div className="text-sm grid grid-cols-2 gap-2">
                      <div>
                        <span className="block text-xs text-neutral-medium">Enacted</span>
                        <span>{formatDate(selectedLaw.enactmentDate)}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-neutral-medium">Last Updated</span>
                        <span>{formatDate(selectedLaw.lastUpdated)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Status</h4>
                    <div>
                      {getStatusBadge(selectedLaw.status)}
                    </div>
                  </div>
                  
                  {lawAmendments.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Amendments</h4>
                      <Accordion type="single" collapsible className="border rounded-md">
                        {lawAmendments.map(amendment => (
                          <AccordionItem key={amendment.id} value={amendment.id.toString()}>
                            <AccordionTrigger className="px-3 text-sm">
                              <div className="flex items-center">
                                <span className="mr-2">{amendment.title}</span>
                                {getStatusBadge(amendment.status)}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-3 text-sm">
                              <p className="mb-2">{amendment.description}</p>
                              <div className="text-xs text-neutral-medium">
                                <Clock className="inline h-3 w-3 mr-1" /> 
                                {formatDate(amendment.date)}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Text
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Law Details</CardTitle>
                <CardDescription>Select a law to view details</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-10">
                <Scale className="mx-auto h-12 w-12 text-neutral-medium mb-4" />
                <p className="text-neutral-medium">Click on any law from the list to view its details, amendments, and related information</p>
              </CardContent>
            </Card>
          )}

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Legal Resources</CardTitle>
              <CardDescription>
                Helpful links and documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center text-primary hover:underline">
                    <FileText className="h-4 w-4 mr-2" />
                    Citizen's Guide to New Digital Laws
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-primary hover:underline">
                    <FileText className="h-4 w-4 mr-2" />
                    Understanding Consumer Protection
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-primary hover:underline">
                    <FileText className="h-4 w-4 mr-2" />
                    National Gazette Publications
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-primary hover:underline">
                    <FileText className="h-4 w-4 mr-2" />
                    Legal Glossary & Terminology
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Important Disclaimer</h3>
            <p className="text-sm text-amber-700 mt-1">
              The information provided here is for general understanding and may not reflect the most current legal developments. 
              This platform is not a substitute for professional legal advice. For specific questions or concerns, 
              please consult with a qualified legal professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawsAndRegulations;