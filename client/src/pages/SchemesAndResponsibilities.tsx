import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Search, 
  Landmark, 
  Download, 
  Calendar, 
  User, 
  FileCheck, 
  CheckCircle, 
  Info, 
  Filter,
  AlertTriangle,
  Car as TaxiIcon,
  Car,
  Bus,
  Truck,
  Train,
  Shield,
  BookOpen,
  Leaf,
  Building
} from "lucide-react";

interface Scheme {
  id: number;
  title: string;
  description: string;
  ministry: string;
  category: string;
  eligibility: string[];
  benefits: string[];
  applicationProcess: string;
  documents: string[];
  deadline: string;
  status: "active" | "upcoming" | "expired";
  url: string;
}

interface Responsibility {
  id: number;
  title: string;
  category: string;
  description: string;
  relatedTo: string;
  consequences: string;
  deadlines: string;
  paymentInfo?: {
    amount: string;
    frequency: string;
    paymentMethods: string[];
  };
  exemptions?: string[];
}

const SchemesAndResponsibilities = () => {
  const [activeTab, setActiveTab] = useState("schemes");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [selectedResponsibility, setSelectedResponsibility] = useState<Responsibility | null>(null);

  // Mock data for schemes - would come from API in production
  const governmentSchemes: Scheme[] = [
    {
      id: 1,
      title: "Digital Infrastructure Development Fund",
      description: "Financial support for technology companies and startups developing digital infrastructure solutions for smart cities, rural connectivity, and public services digitization.",
      ministry: "Ministry of Electronics & Information Technology",
      category: "Technology",
      eligibility: [
        "Technology startups registered for at least 1 year",
        "Companies with proven expertise in digital infrastructure",
        "Must have a viable implementation plan"
      ],
      benefits: [
        "Grants up to $100,000 for qualifying projects",
        "Technical mentorship from industry experts",
        "Access to government testing facilities",
        "Fast-track approval for implementation in designated smart cities"
      ],
      applicationProcess: "Online application through official portal with project proposal and company details.",
      documents: [
        "Company registration certificate",
        "Detailed project proposal",
        "Financial statements for the past year",
        "Technical qualifications of team members"
      ],
      deadline: "2023-12-31",
      status: "active",
      url: "https://example.gov/digital-infrastructure-fund"
    },
    {
      id: 2,
      title: "Small Business Cybersecurity Grant",
      description: "Financial assistance program designed to help small businesses implement essential cybersecurity measures and protect against digital threats.",
      ministry: "Ministry of Small Business & Entrepreneurship",
      category: "Cybersecurity",
      eligibility: [
        "Businesses with 5-50 employees",
        "Annual revenue under $5 million",
        "Must not have received cybersecurity funding previously"
      ],
      benefits: [
        "Reimbursement up to $5,000 for cybersecurity improvements",
        "Free security assessment by certified experts",
        "Access to discounted security software packages",
        "Employee cybersecurity awareness training"
      ],
      applicationProcess: "Submit application through the small business portal with required documentation.",
      documents: [
        "Business registration certificate",
        "Tax identification number",
        "Employee count verification",
        "Cybersecurity implementation plan"
      ],
      deadline: "2023-11-15",
      status: "active",
      url: "https://example.gov/small-business-security"
    },
    {
      id: 3,
      title: "Green Energy Transition Support",
      description: "Financial incentives for businesses transitioning to renewable energy sources and implementing energy-efficient technologies.",
      ministry: "Ministry of Energy & Environment",
      category: "Sustainability",
      eligibility: [
        "Any registered business implementing renewable energy solutions",
        "Demonstrated reduction in carbon footprint",
        "Project must be completed within 18 months"
      ],
      benefits: [
        "Tax deductions up to 30% of project cost",
        "Low-interest loans for qualifying projects",
        "Technical assistance for implementation",
        "Green business certification"
      ],
      applicationProcess: "Submit proposal through the green energy portal with implementation timeline and expected outcomes.",
      documents: [
        "Current energy consumption audit",
        "Project implementation plan",
        "Vendor quotes for equipment",
        "Expected environmental impact assessment"
      ],
      deadline: "2024-03-31",
      status: "active",
      url: "https://example.gov/green-energy-transition"
    },
    {
      id: 4,
      title: "Rural Broadband Initiative",
      description: "Support program to expand high-speed internet access to rural communities and bridge the digital divide.",
      ministry: "Ministry of Communications",
      category: "Technology",
      eligibility: [
        "Internet service providers",
        "Telecom infrastructure companies",
        "Public-private partnerships for rural connectivity"
      ],
      benefits: [
        "Subsidies for infrastructure deployment in underserved areas",
        "Tax incentives for rural broadband projects",
        "Access to government-owned infrastructure for deployment",
        "Simplified regulatory approval process"
      ],
      applicationProcess: "Apply through the rural development portal with detailed coverage expansion plans.",
      documents: [
        "Company credentials and experience",
        "Coverage expansion map and timeline",
        "Technology implementation details",
        "Financial viability assessment"
      ],
      deadline: "2024-06-30",
      status: "upcoming",
      url: "https://example.gov/rural-broadband"
    },
    {
      id: 5,
      title: "Digital Literacy Training Program",
      description: "Funding for organizations providing digital literacy training to underserved communities, seniors, and low-income populations.",
      ministry: "Ministry of Education & Digital Skills",
      category: "Education",
      eligibility: [
        "Registered non-profit organizations",
        "Educational institutions",
        "Libraries and community centers"
      ],
      benefits: [
        "Grants up to $25,000 for training programs",
        "Free access to digital literacy curriculum",
        "Equipment subsidies for training facilities",
        "Train-the-trainer certification"
      ],
      applicationProcess: "Submit program proposal through the education portal detailing target audience, curriculum, and expected outcomes.",
      documents: [
        "Organization registration certificate",
        "Training program curriculum",
        "Instructor qualifications",
        "Implementation timeline and budget"
      ],
      deadline: "2023-10-15",
      status: "expired",
      url: "https://example.gov/digital-literacy"
    }
  ];

  // Mock data for responsibilities - would come from API in production
  const citizenResponsibilities: Responsibility[] = [
    {
      id: 1,
      title: "Annual Vehicle Emission Testing",
      category: "Transportation",
      description: "All registered vehicles must undergo yearly emission testing to ensure compliance with environmental standards and reduce air pollution.",
      relatedTo: "Vehicle Ownership",
      consequences: "Failure to comply may result in fines up to $500, vehicle registration suspension, or inability to renew vehicle license.",
      deadlines: "Testing must be completed by the last day of the month in which the vehicle registration expires.",
      paymentInfo: {
        amount: "$30-75 depending on vehicle type",
        frequency: "Annual",
        paymentMethods: ["Credit/debit card", "Cash at testing centers", "Online payment"]
      },
      exemptions: [
        "Electric vehicles",
        "Vehicles manufactured within the last 2 years",
        "Classic cars over 40 years old (with special registration)"
      ]
    },
    {
      id: 2,
      title: "Commercial Transportation License Renewal",
      category: "Transportation",
      description: "All commercial transportation operators must renew their specialized licenses and undergo additional safety inspections beyond standard vehicle requirements.",
      relatedTo: "Commercial Vehicle Operation",
      consequences: "Operating with an expired license may result in fines up to $2,000, license suspension for up to 6 months, and possible vehicle impoundment.",
      deadlines: "Renewal required annually, with applications submitted 30 days before expiration date.",
      paymentInfo: {
        amount: "$150-300 depending on vehicle class",
        frequency: "Annual",
        paymentMethods: ["Online payment portal", "Transportation authority offices", "Authorized service centers"]
      },
      exemptions: [
        "Agricultural vehicles used exclusively on private property",
        "Emergency response vehicles (different licensing system applies)"
      ]
    },
    {
      id: 3,
      title: "Taxi and Rideshare Operator Requirements",
      category: "Transportation",
      description: "All taxi drivers and rideshare operators must comply with specialized licensing, background checks, vehicle standards, and operating guidelines.",
      relatedTo: "Passenger Transportation Services",
      consequences: "Non-compliance can result in license revocation, fines up to $5,000, and prohibition from operating passenger services.",
      deadlines: "License renewal required annually, vehicle inspections every 6 months, background check renewals every 2 years.",
      paymentInfo: {
        amount: "$200 for license, $75 per vehicle inspection",
        frequency: "Various (see deadlines)",
        paymentMethods: ["Transportation authority portal", "Approved inspection centers", "Municipal offices"]
      }
    },
    {
      id: 4,
      title: "Digital Business Registration",
      category: "Business",
      description: "All online businesses, digital service providers, and e-commerce platforms must register with the Digital Commerce Authority and comply with consumer protection regulations.",
      relatedTo: "Online Business Operation",
      consequences: "Unregistered digital businesses may face fines up to $10,000, service blocking, and legal action for consumer protection violations.",
      deadlines: "Initial registration within 30 days of business launch, annual renewal by December 31st.",
      paymentInfo: {
        amount: "$100-500 based on annual revenue",
        frequency: "Annual",
        paymentMethods: ["Digital Commerce Portal", "Bank transfer", "Credit card"]
      },
      exemptions: [
        "Businesses with annual digital sales under $5,000",
        "Non-commercial personal websites and blogs"
      ]
    },
    {
      id: 5,
      title: "Data Protection Compliance",
      category: "Cybersecurity",
      description: "Businesses collecting personal data must register with the Data Protection Authority, implement privacy safeguards, and allow consumer access to their stored information.",
      relatedTo: "Data Collection & Processing",
      consequences: "Non-compliance may result in fines up to 4% of annual revenue or $20 million (whichever is higher), mandatory audits, and business operation restrictions.",
      deadlines: "Registration within 60 days of beginning data collection, annual compliance reporting by March 31st.",
      paymentInfo: {
        amount: "$200-5,000 based on data volume and company size",
        frequency: "Annual",
        paymentMethods: ["Data Protection Portal", "Electronic funds transfer"]
      },
      exemptions: [
        "Small businesses processing limited personal data for basic business operations only",
        "Certain public interest and research organizations (with approval)"
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Upcoming</Badge>;
      case "expired":
        return <Badge className="bg-neutral-100 text-neutral-800 hover:bg-neutral-100">Expired</Badge>;
      default:
        return <Badge className="bg-neutral-100">Unknown</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "technology":
        return <Landmark className="h-10 w-10 p-2 rounded-lg bg-blue-100 text-blue-600" />;
      case "cybersecurity":
        return <Shield className="h-10 w-10 p-2 rounded-lg bg-violet-100 text-violet-600" />;
      case "education":
        return <BookOpen className="h-10 w-10 p-2 rounded-lg bg-amber-100 text-amber-600" />;
      case "sustainability":
        return <Leaf className="h-10 w-10 p-2 rounded-lg bg-green-100 text-green-600" />;
      case "transportation":
        return <TaxiIcon className="h-10 w-10 p-2 rounded-lg bg-yellow-100 text-yellow-600" />;
      case "business":
        return <Building className="h-10 w-10 p-2 rounded-lg bg-gray-100 text-gray-600" />;
      default:
        return <Info className="h-10 w-10 p-2 rounded-lg bg-neutral-100 text-neutral-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isDateExpired = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return date < today;
  };

  const filteredSchemes = governmentSchemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || scheme.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || scheme.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredResponsibilities = citizenResponsibilities.filter(responsibility => {
    const matchesSearch = responsibility.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          responsibility.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || responsibility.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const schemeCategories = Array.from(new Set(governmentSchemes.map(scheme => scheme.category)));
  const responsibilityCategories = Array.from(new Set(citizenResponsibilities.map(resp => resp.category)));
  
  // Display categories based on active tab
  const categories = activeTab === "schemes" ? schemeCategories : responsibilityCategories;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Government Schemes & Responsibilities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover available government schemes and understand your legal obligations
          </p>
        </motion.div>

        {/* Main Navigation Tabs */}
        <Tabs defaultValue="schemes" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="inline-flex p-1 bg-white rounded-full border shadow-sm mx-auto mb-8">
            <TabsTrigger 
              value="schemes"
              className="rounded-full px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
            >
              <Landmark className="w-4 h-4 mr-2" />
              Government Schemes
            </TabsTrigger>
            <TabsTrigger 
              value="responsibilities"
              className="rounded-full px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
            >
              <Shield className="w-4 h-4 mr-2" />
              Citizen Responsibilities
            </TabsTrigger>
          </TabsList>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-7">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search schemes and responsibilities..."
                    className="pl-10 h-11 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:col-span-3">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-11 w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {activeTab === "schemes" && (
                <div className="md:col-span-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <TabsContent value="schemes">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {filteredSchemes.map((scheme) => (
                    <motion.div
                      key={scheme.id}
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div 
                        className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                          selectedScheme?.id === scheme.id ? 'border-primary bg-blue-50' : 'hover:bg-blue-50'
                        }`}
                        onClick={() => setSelectedScheme(scheme)}
                      >
                        <div className="flex items-start">
                          <div className="mr-4">
                            {getCategoryIcon(scheme.category)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold">{scheme.title}</h3>
                              {getStatusBadge(scheme.status)}
                            </div>
                            <p className="text-sm text-neutral-medium mb-2">{scheme.description}</p>
                            <div className="flex items-center justify-between text-xs text-neutral-medium">
                              <span>Ministry: {scheme.ministry}</span>
                              {scheme.deadline && (
                                <span className={`flex items-center ${isDateExpired(scheme.deadline) ? 'text-red-500' : ''}`}>
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Deadline: {formatDate(scheme.deadline)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="responsibilities">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {filteredResponsibilities.map((responsibility) => (
                    <motion.div
                      key={responsibility.id}
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div 
                        className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                          selectedResponsibility?.id === responsibility.id ? 'border-primary bg-blue-50' : 'hover:bg-blue-50'
                        }`}
                        onClick={() => setSelectedResponsibility(responsibility)}
                      >
                        <div className="flex items-start">
                          <div className="mr-4">
                            {getCategoryIcon(responsibility.category)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold">{responsibility.title}</h3>
                              <Badge className="bg-neutral-100 text-neutral-800 hover:bg-neutral-100">
                                {responsibility.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-neutral-medium mb-2">{responsibility.description}</p>
                            <div className="flex items-center text-xs text-neutral-medium">
                              <span>Related to: {responsibility.relatedTo}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Details Card */}
              <Card className="bg-white shadow-sm border-none">
                {selectedScheme || selectedResponsibility ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>{selectedScheme ? "Scheme Details" : "Responsibility Details"}</CardTitle>
                      <CardDescription>{selectedScheme ? selectedScheme.title : selectedResponsibility?.title}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedScheme && (
                        <>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Description</h4>
                            <p className="text-sm">{selectedScheme.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Eligibility</h4>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              {selectedScheme.eligibility.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Benefits</h4>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              {selectedScheme.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Application Process</h4>
                            <p className="text-sm">{selectedScheme.applicationProcess}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Required Documents</h4>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              {selectedScheme.documents.map((doc, index) => (
                                <li key={index}>{doc}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium mb-1">Deadline</h4>
                              <p className={`text-sm ${isDateExpired(selectedScheme.deadline) ? 'text-red-500' : ''}`}>
                                {formatDate(selectedScheme.deadline)}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1">Status</h4>
                              {getStatusBadge(selectedScheme.status)}
                            </div>
                          </div>
                        </>
                      )}

                      {selectedResponsibility && (
                        <>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Description</h4>
                            <p className="text-sm">{selectedResponsibility.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Related To</h4>
                            <p className="text-sm">{selectedResponsibility.relatedTo}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Consequences of Non-Compliance</h4>
                            <p className="text-sm text-red-700">{selectedResponsibility.consequences}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-1">Important Deadlines</h4>
                            <p className="text-sm">{selectedResponsibility.deadlines}</p>
                          </div>
                          
                          {selectedResponsibility.paymentInfo && (
                            <div>
                              <h4 className="text-sm font-medium mb-1">Payment Information</h4>
                              <ul className="text-sm space-y-1">
                                <li><span className="font-medium">Amount:</span> {selectedResponsibility.paymentInfo.amount}</li>
                                <li><span className="font-medium">Frequency:</span> {selectedResponsibility.paymentInfo.frequency}</li>
                                <li>
                                  <span className="font-medium">Payment Methods:</span>
                                  <ul className="list-disc pl-5 mt-1">
                                    {selectedResponsibility.paymentInfo.paymentMethods.map((method, index) => (
                                      <li key={index}>{method}</li>
                                    ))}
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          )}
                          
                          {selectedResponsibility.exemptions && selectedResponsibility.exemptions.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-1">Exemptions</h4>
                              <ul className="text-sm list-disc pl-5 space-y-1">
                                {selectedResponsibility.exemptions.map((exemption, index) => (
                                  <li key={index}>{exemption}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <CardContent className="text-center py-12">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Info className="mx-auto h-12 w-12 text-blue-200 mb-4" />
                      <p className="text-gray-500">
                        Select an item to view detailed information
                      </p>
                    </motion.div>
                  </CardContent>
                )}
              </Card>

              {/* Resource Center */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-blue-800">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <ul className="space-y-3">
                      <li>
                        <a href="#" className="flex items-center text-primary hover:underline">
                          <FileCheck className="h-4 w-4 mr-2" />
                          Scheme Application Guidelines
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-primary hover:underline">
                          <Download className="h-4 w-4 mr-2" />
                          Download Application Forms
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-primary hover:underline">
                          <User className="h-4 w-4 mr-2" />
                          Book Appointment with Advisor
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-primary hover:underline">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Check Application Status
                        </a>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Notice/Disclaimer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-amber-800">Important Notice</h3>
                      <p className="text-sm text-amber-700 mt-1">
                        The information provided here is for general guidance only and may not reflect the most current legal requirements. 
                        Always verify the latest regulations with the appropriate authorities before taking action.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Tabs>

        {/* Transportation Section - Enhanced */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Transportation Responsibilities Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center mb-2">
                  <Car className="h-5 w-5 mr-2 text-blue-600" />
                  <CardTitle className="text-lg">Personal Vehicles</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                    <span>Annual emissions testing required</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                    <span>Registration renewal by birth month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                    <span>Insurance requirements must be maintained</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center mb-2">
                  <TaxiIcon className="h-5 w-5 mr-2 text-yellow-600" />
                  <CardTitle className="text-lg">Taxis & Rideshare</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                    <span>Special commercial transportation license</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                    <span>Semi-annual vehicle inspections</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                    <span>Background checks every 2 years</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center mb-2">
                  <Bus className="h-5 w-5 mr-2 text-green-600" />
                  <CardTitle className="text-lg">Public Transportation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                    <span>Quarterly safety inspections</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                    <span>Driver certification and training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                    <span>Accessibility compliance requirements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center mb-2">
                  <Truck className="h-5 w-5 mr-2 text-red-600" />
                  <CardTitle className="text-lg">Commercial Freight</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                    <span>Weight compliance monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                    <span>Hazardous materials certification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                    <span>Driver hours and log requirements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemesAndResponsibilities;