import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { 
  Search,
  CalendarDays, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  HelpCircle, 
  Building, 
  User, 
  Home,
  FileCheck,
  DollarSign,
  Calculator,
  FileText,
  Download,
  ChevronRight,
  ArrowRight,
  Briefcase,
  Landmark,
  GraduationCap,
  Coins
} from "lucide-react";

interface TaxType {
  id: number;
  name: string;
  description: string;
  category: "income" | "consumption" | "property" | "other";
  paymentDates: string;
  applicableFor: string[];
  exemptions: string[];
  deductions: string[];
  rates: {
    description: string;
    rate: string;
  }[];
  resources: {
    title: string;
    url: string;
  }[];
}

interface TaxDeadline {
  id: number;
  title: string;
  date: string;
  description: string;
  category: string;
  applicableFor: string[];
  lateFilingPenalty: string;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const TaxResponsibilities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [incomeLevel, setIncomeLevel] = useState(50000);
  const [selectedTax, setSelectedTax] = useState<TaxType | null>(null);

  // Mock data for tax types
  const taxTypes: TaxType[] = [
    {
      id: 1,
      name: "Personal Income Tax",
      description: "Annual tax on income earned by individuals including salaries, wages, investments, and other sources of income.",
      category: "income",
      paymentDates: "Annual filing by April 30, quarterly advance payments may be required for self-employed individuals.",
      applicableFor: [
        "Individuals with taxable income",
        "Self-employed professionals",
        "Freelancers",
        "Investment income recipients"
      ],
      exemptions: [
        "Income below the basic personal amount",
        "Certain disability benefits",
        "Some scholarship and bursary income",
        "Gifts and inheritances"
      ],
      deductions: [
        "Registered retirement savings contributions",
        "Childcare expenses",
        "Medical expenses",
        "Charitable donations",
        "Education-related expenses"
      ],
      rates: [
        {
          description: "First tax bracket (up to $49,020)",
          rate: "15%"
        },
        {
          description: "Second tax bracket ($49,021 to $98,040)",
          rate: "20.5%"
        },
        {
          description: "Third tax bracket ($98,041 to $151,978)",
          rate: "26%"
        },
        {
          description: "Fourth tax bracket ($151,979 to $216,511)",
          rate: "29%"
        },
        {
          description: "Fifth tax bracket (over $216,511)",
          rate: "33%"
        }
      ],
      resources: [
        {
          title: "Complete Guide to Personal Income Tax",
          url: "#personal-income-tax-guide"
        },
        {
          title: "Tax Deductions Checklist",
          url: "#tax-deductions-checklist"
        },
        {
          title: "Income Tax Calculator",
          url: "#income-tax-calculator"
        }
      ]
    },
    {
      id: 2,
      name: "Goods and Services Tax (GST)",
      description: "A value-added tax applied to most goods and services sold within the country.",
      category: "consumption",
      paymentDates: "Collected at the point of sale, businesses remit according to their reporting period (monthly, quarterly, or annually).",
      applicableFor: [
        "Most purchases of goods and services",
        "Imported goods",
        "Real property"
      ],
      exemptions: [
        "Basic groceries",
        "Medical devices",
        "Educational services",
        "Financial services",
        "Residential rent"
      ],
      deductions: [
        "Input tax credits for businesses",
        "GST rebates for low-income individuals",
        "New housing rebates",
        "Public service bodies rebates"
      ],
      rates: [
        {
          description: "Standard rate",
          rate: "5%"
        },
        {
          description: "Zero-rated goods and services",
          rate: "0%"
        }
      ],
      resources: [
        {
          title: "GST Guide for Consumers",
          url: "#gst-guide-consumers"
        },
        {
          title: "GST/HST Credit Calculator",
          url: "#gst-credit-calculator"
        },
        {
          title: "GST Rebate Application",
          url: "#gst-rebate-application"
        }
      ]
    },
    {
      id: 3,
      name: "Property Tax",
      description: "Annual tax based on the assessed value of real property including land and buildings.",
      category: "property",
      paymentDates: "Generally paid annually or semi-annually, with due dates varying by municipality.",
      applicableFor: [
        "Homeowners",
        "Commercial property owners",
        "Land owners",
        "Residential landlords"
      ],
      exemptions: [
        "Properties owned by religious organizations",
        "Government properties",
        "Some educational institutions",
        "Certain agricultural lands"
      ],
      deductions: [
        "Homestead exemptions",
        "Senior citizen reductions",
        "Home renovation credits",
        "Energy efficiency improvements"
      ],
      rates: [
        {
          description: "Residential property (average)",
          rate: "0.5% - 2.5% of assessed value"
        },
        {
          description: "Commercial property (average)",
          rate: "1% - 4% of assessed value"
        }
      ],
      resources: [
        {
          title: "Property Tax Assessment Guide",
          url: "#property-tax-assessment"
        },
        {
          title: "Property Tax Appeal Process",
          url: "#property-tax-appeal"
        },
        {
          title: "Senior Property Tax Relief Programs",
          url: "#senior-tax-relief"
        }
      ]
    },
    {
      id: 4,
      name: "Capital Gains Tax",
      description: "Tax on the profit from the sale of capital assets such as real estate, stocks, bonds, or business interests.",
      category: "income",
      paymentDates: "Reported on annual income tax return.",
      applicableFor: [
        "Individuals selling investments",
        "Real estate sellers (non-primary residence)",
        "Business owners selling business interests",
        "Inheritance recipients selling inherited assets"
      ],
      exemptions: [
        "Primary residence sale (with limitations)",
        "Some small business shares",
        "Certain farm or fishing property",
        "Assets transferred on death (deferral)"
      ],
      deductions: [
        "Capital losses (can offset capital gains)",
        "Lifetime capital gains exemption for qualified small business shares",
        "Capital gains reserve for installment sales"
      ],
      rates: [
        {
          description: "Inclusion rate (portion of gain that is taxable)",
          rate: "50%"
        },
        {
          description: "Taxed at individual's marginal tax rate after inclusion",
          rate: "Varies by income level"
        }
      ],
      resources: [
        {
          title: "Capital Gains Tax Guide",
          url: "#capital-gains-guide"
        },
        {
          title: "Capital Gains Calculator",
          url: "#capital-gains-calculator"
        },
        {
          title: "Tax Planning for Capital Gains",
          url: "#capital-gains-planning"
        }
      ]
    },
    {
      id: 5,
      name: "Business Income Tax",
      description: "Tax on the net income earned by corporations and other business entities.",
      category: "income",
      paymentDates: "Annual filing with quarterly installment payments required for most businesses.",
      applicableFor: [
        "Corporations",
        "Limited liability companies",
        "Partnerships (reporting only)",
        "Self-employed individuals (on Schedule C)"
      ],
      exemptions: [
        "Some non-profit organizations",
        "Certain agricultural cooperatives",
        "Specific income from foreign subsidiaries"
      ],
      deductions: [
        "Business expenses",
        "Employee compensation",
        "Rent and utilities",
        "Depreciation of assets",
        "Marketing and advertising",
        "Research and development costs"
      ],
      rates: [
        {
          description: "Small business rate (first $500,000 of active business income)",
          rate: "9%"
        },
        {
          description: "General corporate rate",
          rate: "15%"
        },
        {
          description: "Manufacturing and processing rate",
          rate: "15%"
        }
      ],
      resources: [
        {
          title: "Business Tax Filing Guide",
          url: "#business-tax-guide"
        },
        {
          title: "Small Business Deductions Checklist",
          url: "#small-business-deductions"
        },
        {
          title: "Corporate Tax Planning Strategies",
          url: "#corporate-tax-planning"
        }
      ]
    }
  ];

  // Mock data for deadlines
  const taxDeadlines: TaxDeadline[] = [
    {
      id: 1,
      title: "Individual Income Tax Filing",
      date: "April 30, 2023",
      description: "Deadline for filing personal income tax returns for the previous calendar year.",
      category: "income",
      applicableFor: ["All individual taxpayers"],
      lateFilingPenalty: "5% of balance owing plus 1% per month of delay (up to 12 months)"
    },
    {
      id: 2,
      title: "Self-Employed Tax Filing",
      date: "June 15, 2023",
      description: "Deadline for filing income tax returns for self-employed individuals and their spouses/partners.",
      category: "income",
      applicableFor: ["Self-employed individuals", "Spouses or partners of self-employed individuals"],
      lateFilingPenalty: "5% of balance owing plus 1% per month of delay (up to a maximum of 12 months)"
    },
    {
      id: 3,
      title: "Q1 GST/HST Return (Monthly Filers)",
      date: "April 30, 2023",
      description: "Deadline for filing GST/HST returns and remitting taxes collected for Q1 for monthly filers.",
      category: "consumption",
      applicableFor: ["Businesses required to file monthly GST/HST returns"],
      lateFilingPenalty: "1% of amount owing plus 0.25% per month of delay (up to 12 months)"
    },
    {
      id: 4,
      title: "Corporate Tax Filing",
      date: "Six months after fiscal year-end",
      description: "Deadline for filing corporate income tax returns for the previous fiscal year.",
      category: "income",
      applicableFor: ["Corporations", "Limited liability companies"],
      lateFilingPenalty: "5% of unpaid tax plus 1% per month of delay (up to 12 months)"
    },
    {
      id: 5,
      title: "Property Tax Payment (First Installment)",
      date: "March 1, 2023",
      description: "Deadline for the first installment of annual property taxes (varies by municipality).",
      category: "property",
      applicableFor: ["Property owners"],
      lateFilingPenalty: "Varies by municipality, typically 1.25% per month of delay"
    },
    {
      id: 6,
      title: "RRSP Contribution Deadline",
      date: "March 1, 2023",
      description: "Last day to make RRSP contributions eligible for tax deduction on the previous year's return.",
      category: "income",
      applicableFor: ["Individual taxpayers with RRSP contribution room"],
      lateFilingPenalty: "No penalty, but contributions after this date count toward the next tax year"
    }
  ];

  // Mock FAQs
  const taxFAQs: FAQ[] = [
    {
      question: "What income is taxable in my personal tax return?",
      answer: "Taxable income includes employment income, self-employment earnings, certain benefits, investment income (interest, dividends, capital gains), rental income, and pension income. Some income may be partially exempt or eligible for special treatment such as capital gains (only 50% is taxable) or dividends (eligible for tax credits).",
      category: "income"
    },
    {
      question: "How do I calculate my property tax amount?",
      answer: "Property tax is calculated by multiplying your property's assessed value by the tax rate (mill rate) set by your local government. For example, if your property is assessed at $300,000 and the tax rate is 1%, your annual property tax would be $3,000. Assessment values are typically determined by local assessment authorities based on market value, size, location, and improvements.",
      category: "property"
    },
    {
      question: "What's the difference between tax deductions and tax credits?",
      answer: "Tax deductions reduce your taxable income before tax rates are applied. For example, a $1,000 deduction would save you $200 if you're in the 20% tax bracket. Tax credits directly reduce your tax payable after all calculations are done. A $1,000 tax credit would reduce your taxes owing by exactly $1,000, regardless of your tax bracket. Non-refundable credits can only reduce tax to zero, while refundable credits can generate a refund.",
      category: "income"
    },
    {
      question: "How long should I keep my tax records?",
      answer: "Generally, you should keep all tax records and supporting documents for at least 6 years from the end of the tax year to which they relate. For property and investment documents, keep records for 6 years after you dispose of the property. For business records and documents related to long-term assets, keep records for 6 years after the end of the last tax year they were relevant to.",
      category: "other"
    },
    {
      question: "What GST/HST expenses can my business claim?",
      answer: "Businesses can claim input tax credits (ITCs) for GST/HST paid on most business purchases and operating expenses, including inventory, supplies, equipment, utilities, rent, advertising, and professional services. To qualify, these expenses must be reasonable and directly related to commercial activities. Keep all invoices and receipts showing GST/HST paid as supporting documentation for your claims.",
      category: "consumption"
    },
    {
      question: "What happens if I can't pay my taxes on time?",
      answer: "If you can't pay on time, file your return by the deadline anyway to avoid late-filing penalties. Contact the tax authority immediately to discuss payment arrangements. You'll still be charged interest on the outstanding amount, but you may be able to set up a payment plan. For hardship cases, you may be eligible for taxpayer relief provisions that could waive penalties and interest in extraordinary circumstances.",
      category: "other"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "income":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "consumption":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "property":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      default:
        return "bg-neutral-100 text-neutral-800 hover:bg-neutral-100";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "income":
        return <DollarSign className="h-10 w-10 p-2 rounded-lg bg-blue-100 text-blue-700" />;
      case "consumption":
        return <Coins className="h-10 w-10 p-2 rounded-lg bg-green-100 text-green-700" />;
      case "property":
        return <Home className="h-10 w-10 p-2 rounded-lg bg-amber-100 text-amber-700" />;
      default:
        return <FileText className="h-10 w-10 p-2 rounded-lg bg-neutral-100 text-neutral-700" />;
    }
  };

  const getApplicableForIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "individuals with taxable income":
      case "all individual taxpayers":
      case "individual taxpayers with rrsp contribution room":
        return <User className="h-4 w-4 mr-2 text-blue-600" />;
      case "corporations":
      case "limited liability companies":
      case "businesses required to file monthly gst/hst returns":
        return <Building className="h-4 w-4 mr-2 text-indigo-600" />;
      case "self-employed individuals":
      case "freelancers":
      case "self-employed professionals":
      case "spouses or partners of self-employed individuals":
        return <Briefcase className="h-4 w-4 mr-2 text-amber-600" />;
      case "homeowners":
      case "property owners":
      case "commercial property owners":
      case "residential landlords":
        return <Home className="h-4 w-4 mr-2 text-green-600" />;
      default:
        return <User className="h-4 w-4 mr-2 text-neutral-600" />;
    }
  };

  const formatDate = (date: string) => {
    if (date.includes("varies") || date.includes("after") || date.includes("Six")) {
      return date;
    }
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const filteredTaxTypes = taxTypes.filter(tax => {
    const matchesSearch = tax.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tax.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || tax.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const filteredDeadlines = taxDeadlines.filter(deadline => {
    const matchesSearch = deadline.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          deadline.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || deadline.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const filteredFAQs = taxFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || faq.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Calculate estimated income tax
  const calculateIncomeTax = (income: number) => {
    if (income <= 49020) {
      return income * 0.15;
    } else if (income <= 98040) {
      return 49020 * 0.15 + (income - 49020) * 0.205;
    } else if (income <= 151978) {
      return 49020 * 0.15 + (98040 - 49020) * 0.205 + (income - 98040) * 0.26;
    } else if (income <= 216511) {
      return 49020 * 0.15 + (98040 - 49020) * 0.205 + (151978 - 98040) * 0.26 + (income - 151978) * 0.29;
    } else {
      return 49020 * 0.15 + (98040 - 49020) * 0.205 + (151978 - 98040) * 0.26 + (216511 - 151978) * 0.29 + (income - 216511) * 0.33;
    }
  };

  // Formats numbers as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  // Get effective tax rate
  const getEffectiveTaxRate = (income: number, tax: number) => {
    return income > 0 ? tax / income : 0;
  };

  const incomeTaxAmount = calculateIncomeTax(incomeLevel);
  const effectiveTaxRate = getEffectiveTaxRate(incomeLevel, incomeTaxAmount);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Tax Responsibilities</h1>
        <p className="text-neutral-medium">
          Understand your tax obligations, filing deadlines, and available deductions and credits
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-medium" />
            <Input
              type="text"
              placeholder="Search tax types, deadlines, and FAQs..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="md:col-span-1">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="income">Income Tax</SelectItem>
              <SelectItem value="consumption">Consumption Tax</SelectItem>
              <SelectItem value="property">Property Tax</SelectItem>
              <SelectItem value="other">Other Taxes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="tax-types" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tax-types">Tax Types</TabsTrigger>
          <TabsTrigger value="deadlines">Key Deadlines</TabsTrigger>
          <TabsTrigger value="calculator">Tax Calculator</TabsTrigger>
          <TabsTrigger value="faqs">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tax-types" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-4">
                  {filteredTaxTypes.length > 0 ? (
                    <div className="space-y-4">
                      {filteredTaxTypes.map(tax => (
                        <div 
                          key={tax.id} 
                          className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                            selectedTax?.id === tax.id ? 'border-primary bg-blue-50' : 'hover:bg-blue-50'
                          }`}
                          onClick={() => setSelectedTax(tax)}
                        >
                          <div className="flex items-start">
                            <div className="mr-4">
                              {getCategoryIcon(tax.category)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold">{tax.name}</h3>
                                <Badge className={getCategoryColor(tax.category)}>
                                  {tax.category.charAt(0).toUpperCase() + tax.category.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-sm text-neutral-medium mb-2">{tax.description}</p>
                              <div className="text-xs text-neutral-medium">
                                <span><CalendarDays className="inline h-3 w-3 mr-1" /> {tax.paymentDates}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-center">
                      <Info className="mx-auto h-10 w-10 text-neutral-medium mb-4" />
                      <h3 className="text-lg font-medium">No tax types found</h3>
                      <p className="text-neutral-medium">Try adjusting your search or filters</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              {selectedTax ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedTax.name}</CardTitle>
                    <CardDescription>
                      <Badge className={getCategoryColor(selectedTax.category)}>
                        {selectedTax.category.charAt(0).toUpperCase() + selectedTax.category.slice(1)} Tax
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Description</h4>
                      <p className="text-sm">{selectedTax.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Payment Schedule</h4>
                      <p className="text-sm">{selectedTax.paymentDates}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Applicable For</h4>
                      <ul className="text-sm space-y-1">
                        {selectedTax.applicableFor.map((item, i) => (
                          <li key={i} className="flex items-center">
                            {getApplicableForIcon(item)}
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Tax Rates</h4>
                      <ul className="text-sm space-y-1">
                        {selectedTax.rates.map((rate, i) => (
                          <li key={i} className="flex justify-between">
                            <span>{rate.description}:</span>
                            <span className="font-semibold">{rate.rate}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Accordion type="single" collapsible className="border rounded-md">
                      <AccordionItem value="exemptions">
                        <AccordionTrigger className="text-sm px-3">
                          Exemptions
                        </AccordionTrigger>
                        <AccordionContent className="px-3">
                          <ul className="text-sm list-disc pl-5 space-y-1">
                            {selectedTax.exemptions.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="deductions">
                        <AccordionTrigger className="text-sm px-3">
                          Deductions & Credits
                        </AccordionTrigger>
                        <AccordionContent className="px-3">
                          <ul className="text-sm list-disc pl-5 space-y-1">
                            {selectedTax.deductions.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <div className="mb-3 w-full text-sm">
                      <h4 className="font-medium mb-2">Helpful Resources</h4>
                      <div className="space-y-2">
                        {selectedTax.resources.map((resource, i) => (
                          <a key={i} href={resource.url} className="flex items-center text-primary hover:underline">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>{resource.title}</span>
                            <ChevronRight className="h-4 w-4 ml-auto" />
                          </a>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full mt-2">
                      <Download className="h-4 w-4 mr-2" />
                      Download Filing Guide
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Details</CardTitle>
                    <CardDescription>Select a tax type to view details</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-10">
                    <Info className="mx-auto h-12 w-12 text-neutral-medium mb-4" />
                    <p className="text-neutral-medium">Click on any tax type from the list to view detailed information, rates, and filing requirements</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="deadlines" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Important Tax Deadlines</CardTitle>
              <CardDescription>Mark your calendar for these critical tax filing and payment dates</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredDeadlines.length > 0 ? (
                <div className="space-y-4">
                  {filteredDeadlines.map(deadline => (
                    <div key={deadline.id} className="p-4 border rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="font-semibold flex items-center">
                          <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                          {deadline.title}
                        </h3>
                        <div className="flex items-center mt-2 md:mt-0">
                          <Badge className={getCategoryColor(deadline.category)}>
                            {deadline.category.charAt(0).toUpperCase() + deadline.category.slice(1)}
                          </Badge>
                          <span className="ml-3 text-sm font-medium">{formatDate(deadline.date)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-medium mb-3">{deadline.description}</p>
                      <div className="bg-red-50 border border-red-100 p-3 rounded-md text-sm">
                        <div className="flex">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                          <div>
                            <span className="font-medium text-red-700">Late Filing Penalty:</span>
                            <p className="text-red-600 mt-0.5">{deadline.lateFilingPenalty}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-1">Applies To:</h4>
                        <div className="flex flex-wrap gap-2">
                          {deadline.applicableFor.map((item, i) => (
                            <div key={i} className="inline-flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                              {getApplicableForIcon(item)}
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <Info className="mx-auto h-10 w-10 text-neutral-medium mb-4" />
                  <h3 className="text-lg font-medium">No deadlines found</h3>
                  <p className="text-neutral-medium">Try adjusting your search or filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calculator" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Income Tax Calculator</CardTitle>
                <CardDescription>Estimate your personal income tax based on your annual income</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="income">Annual Income</Label>
                      <span className="text-sm font-medium">{formatCurrency(incomeLevel)}</span>
                    </div>
                    <Slider
                      id="income"
                      min={0}
                      max={250000}
                      step={1000}
                      value={[incomeLevel]}
                      onValueChange={(value) => setIncomeLevel(value[0])}
                    />
                    <div className="flex justify-between mt-1 text-xs text-neutral-medium">
                      <span>$0</span>
                      <span>$125,000</span>
                      <span>$250,000</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-neutral-medium">Estimated Tax</h4>
                        <p className="text-2xl font-bold text-blue-700">{formatCurrency(incomeTaxAmount)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm text-neutral-medium">Effective Tax Rate</h4>
                        <p className="text-2xl font-bold text-blue-700">{formatPercentage(effectiveTaxRate)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm text-neutral-medium">After-Tax Income</h4>
                        <p className="text-lg font-semibold">{formatCurrency(incomeLevel - incomeTaxAmount)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm text-neutral-medium">Monthly Take-Home</h4>
                        <p className="text-lg font-semibold">{formatCurrency((incomeLevel - incomeTaxAmount) / 12)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Tax Breakdown by Bracket</h4>
                    <div className="space-y-2">
                      {incomeLevel > 0 && (
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="h-6 bg-blue-200 rounded-sm" style={{ 
                              width: `${Math.min(100, (Math.min(incomeLevel, 49020) / incomeLevel) * 100)}%` 
                            }}></div>
                          </div>
                          <div className="ml-4 text-sm">
                            <span className="font-medium">15%: </span>
                            <span>{formatCurrency(Math.min(incomeLevel, 49020) * 0.15)}</span>
                          </div>
                        </div>
                      )}
                      
                      {incomeLevel > 49020 && (
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="h-6 bg-blue-300 rounded-sm" style={{ 
                              width: `${Math.min(100, (Math.min(incomeLevel - 49020, 98040 - 49020) / incomeLevel) * 100)}%` 
                            }}></div>
                          </div>
                          <div className="ml-4 text-sm">
                            <span className="font-medium">20.5%: </span>
                            <span>{formatCurrency(Math.min(incomeLevel - 49020, 98040 - 49020) * 0.205)}</span>
                          </div>
                        </div>
                      )}
                      
                      {incomeLevel > 98040 && (
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="h-6 bg-blue-400 rounded-sm" style={{ 
                              width: `${Math.min(100, (Math.min(incomeLevel - 98040, 151978 - 98040) / incomeLevel) * 100)}%` 
                            }}></div>
                          </div>
                          <div className="ml-4 text-sm">
                            <span className="font-medium">26%: </span>
                            <span>{formatCurrency(Math.min(incomeLevel - 98040, 151978 - 98040) * 0.26)}</span>
                          </div>
                        </div>
                      )}
                      
                      {incomeLevel > 151978 && (
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="h-6 bg-blue-500 rounded-sm" style={{ 
                              width: `${Math.min(100, (Math.min(incomeLevel - 151978, 216511 - 151978) / incomeLevel) * 100)}%` 
                            }}></div>
                          </div>
                          <div className="ml-4 text-sm">
                            <span className="font-medium">29%: </span>
                            <span>{formatCurrency(Math.min(incomeLevel - 151978, 216511 - 151978) * 0.29)}</span>
                          </div>
                        </div>
                      )}
                      
                      {incomeLevel > 216511 && (
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="h-6 bg-blue-600 rounded-sm" style={{ 
                              width: `${Math.min(100, ((incomeLevel - 216511) / incomeLevel) * 100)}%` 
                            }}></div>
                          </div>
                          <div className="ml-4 text-sm">
                            <span className="font-medium">33%: </span>
                            <span>{formatCurrency((incomeLevel - 216511) * 0.33)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-xs text-neutral-medium">
                  This is a simplified estimate. Actual tax will vary based on deductions, credits, and other factors.
                </p>
                <Button variant="outline" size="sm">
                  <Calculator className="h-4 w-4 mr-2" />
                  Detailed Calculator
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Common Tax Deductions</CardTitle>
                  <CardDescription>Deductions that may reduce your taxable income</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">Retirement Contributions</span>
                        <p className="text-sm text-neutral-medium">Contributions to qualified retirement accounts like 401(k)s and IRAs</p>
                      </div>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">Mortgage Interest</span>
                        <p className="text-sm text-neutral-medium">Interest paid on home mortgages up to certain limits</p>
                      </div>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">Medical Expenses</span>
                        <p className="text-sm text-neutral-medium">Qualifying expenses exceeding 7.5% of your adjusted gross income</p>
                      </div>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">Charitable Donations</span>
                        <p className="text-sm text-neutral-medium">Contributions to qualified charitable organizations</p>
                      </div>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">Education Expenses</span>
                        <p className="text-sm text-neutral-medium">Qualified education expenses including tuition and fees</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tax Credits</CardTitle>
                  <CardDescription>Credits that directly reduce your tax bill</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">Child Tax Credit</span>
                        <p className="text-sm text-neutral-medium">Up to $2,000 per qualifying child under 17</p>
                      </div>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">Earned Income Tax Credit</span>
                        <p className="text-sm text-neutral-medium">For low to moderate income working individuals and couples</p>
                      </div>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">Education Credits</span>
                        <p className="text-sm text-neutral-medium">American Opportunity and Lifetime Learning credits</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="faqs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common tax questions</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-start">
                          <HelpCircle className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-7">
                        <div className="p-3 bg-neutral-50 rounded-md text-sm">
                          {faq.answer}
                        </div>
                        <div className="mt-2 flex justify-end">
                          <Badge className={getCategoryColor(faq.category)}>
                            {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                          </Badge>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="py-10 text-center">
                  <Info className="mx-auto h-10 w-10 text-neutral-medium mb-4" />
                  <h3 className="text-lg font-medium">No FAQs found</h3>
                  <p className="text-neutral-medium">Try adjusting your search or filters</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <div className="text-center">
                <p className="text-sm mb-2">Can't find what you're looking for?</p>
                <Button>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Ask a Tax Expert
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center mb-2">
              <FileCheck className="h-5 w-5 mr-2 text-blue-600" />
              <CardTitle className="text-lg">Filing Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>File electronically for faster processing and refunds</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>Double-check all numbers and personal information</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>Keep all supporting documents for at least 6 years</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>Consider professional help for complex situations</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center mb-2">
              <Landmark className="h-5 w-5 mr-2 text-indigo-600" />
              <CardTitle className="text-lg">Government Resources</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center text-primary hover:underline text-sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Official Tax Guide
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-primary hover:underline text-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Tax Forms
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-primary hover:underline text-sm">
                  <Calculator className="h-4 w-4 mr-2" />
                  Official Tax Calculators
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-primary hover:underline text-sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Contact Tax Authority
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center mb-2">
              <GraduationCap className="h-5 w-5 mr-2 text-amber-600" />
              <CardTitle className="text-lg">Tax Planning</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>Maximize retirement account contributions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>Consider tax-efficient investing strategies</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>Time income and deductions strategically</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 shrink-0" />
                <span>Review tax situation quarterly for adjustments</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Important Disclaimer</h3>
            <p className="text-sm text-amber-700 mt-1">
              The information provided here is for general guidance only and may not reflect the most current tax laws or your specific situation. 
              This information should not be considered as tax, legal, or financial advice. 
              Please consult with a qualified tax professional for personalized assistance with your tax matters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxResponsibilities;