import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  Home, 
  TrendingUp, 
  FileText, 
  HelpCircle, 
  AlertTriangle,
  Download,
  Share2,
  Info
} from "lucide-react";

const PolicyImpactCalculator = () => {
  const [activeTab, setActiveTab] = useState("income-tax");
  const [income, setIncome] = useState(500000);
  const [investmentAmount, setInvestmentAmount] = useState(150000);
  const [housingLoan, setHousingLoan] = useState(0);
  const [hraAmount, setHraAmount] = useState(0);
  const [medicalInsurance, setMedicalInsurance] = useState(0);
  const [dependents, setDependents] = useState(0);
  const [interestIncome, setInterestIncome] = useState(0);
  const [taxRegime, setTaxRegime] = useState("new");

  // For GST calculator
  const [productPrice, setProductPrice] = useState(1000);
  const [gstRate, setGstRate] = useState(18);

  // For property tax
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [propertyAge, setPropertyAge] = useState(5);
  const [propertyType, setPropertyType] = useState("residential");
  const [propertyLocation, setPropertyLocation] = useState("urban");

  // Results
  const [taxResults, setTaxResults] = useState<any>(null);

  const calculateIncomeTax = () => {
    let taxableIncome = income;
    let taxAmount = 0;
    
    // Basic deductions based on regime
    if (taxRegime === "old") {
      // Section 80C - Investments
      const section80cDeduction = Math.min(investmentAmount, 150000);
      
      // Housing loan interest - Section 24
      const housingLoanDeduction = Math.min(housingLoan, 200000);
      
      // Medical insurance - Section 80D
      const medicalInsuranceDeduction = Math.min(medicalInsurance, 25000 + (dependents > 0 ? 25000 : 0));
      
      // HRA exemption (simplified calculation)
      const hraExemption = Math.min(hraAmount, income * 0.4);
      
      // Total deductions
      const totalDeductions = section80cDeduction + housingLoanDeduction + medicalInsuranceDeduction + hraExemption;
      
      taxableIncome = Math.max(0, income - totalDeductions);
      
      // Old regime tax slabs
      if (taxableIncome <= 250000) {
        taxAmount = 0;
      } else if (taxableIncome <= 500000) {
        taxAmount = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        taxAmount = 12500 + (taxableIncome - 500000) * 0.2;
      } else {
        taxAmount = 112500 + (taxableIncome - 1000000) * 0.3;
      }
    } else {
      // New tax regime (no deductions but different slabs)
      if (taxableIncome <= 300000) {
        taxAmount = 0;
      } else if (taxableIncome <= 600000) {
        taxAmount = (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 900000) {
        taxAmount = 15000 + (taxableIncome - 600000) * 0.10;
      } else if (taxableIncome <= 1200000) {
        taxAmount = 45000 + (taxableIncome - 900000) * 0.15;
      } else if (taxableIncome <= 1500000) {
        taxAmount = 90000 + (taxableIncome - 1200000) * 0.20;
      } else {
        taxAmount = 150000 + (taxableIncome - 1500000) * 0.30;
      }
    }
    
    // Add 4% cess
    const cess = taxAmount * 0.04;
    const totalTaxLiability = taxAmount + cess;
    
    // Calculate effective tax rate
    const effectiveTaxRate = (totalTaxLiability / income) * 100;
    
    // Calculate take-home salary
    const takeHomeSalary = income - totalTaxLiability + interestIncome;
    
    setTaxResults({
      taxableIncome,
      taxAmount,
      cess,
      totalTaxLiability,
      effectiveTaxRate,
      takeHomeSalary,
      monthlyTakeHome: takeHomeSalary / 12,
      type: "income-tax"
    });
  };

  const calculateGST = () => {
    const gstAmount = (productPrice * gstRate) / 100;
    const totalPrice = productPrice + gstAmount;
    
    setTaxResults({
      basePrice: productPrice,
      gstRate,
      gstAmount,
      totalPrice,
      type: "gst"
    });
  };

  const calculatePropertyTax = () => {
    // Property tax calculation (simplified example)
    let baseRate = 0;
    
    // Base rate depends on location
    if (propertyLocation === "urban") {
      baseRate = 0.5; // 0.5% of property value
    } else if (propertyLocation === "semi-urban") {
      baseRate = 0.35; // 0.35% of property value
    } else {
      baseRate = 0.25; // 0.25% of property value
    }
    
    // Apply multiplier based on property type
    let multiplier = 1;
    if (propertyType === "commercial") {
      multiplier = 2;
    } else if (propertyType === "industrial") {
      multiplier = 1.75;
    }
    
    // Depreciation based on age (simplified)
    const ageDepreciation = Math.min(propertyAge * 0.01, 0.25);
    
    // Final tax calculation
    const effectiveRate = baseRate * multiplier * (1 - ageDepreciation);
    const annualPropertyTax = propertyValue * (effectiveRate / 100);
    
    setTaxResults({
      propertyValue,
      effectiveRate,
      annualPropertyTax,
      quarterlyPropertyTax: annualPropertyTax / 4,
      type: "property-tax"
    });
  };

  const handleCalculate = () => {
    if (activeTab === "income-tax") {
      calculateIncomeTax();
    } else if (activeTab === "gst") {
      calculateGST();
    } else if (activeTab === "property-tax") {
      calculatePropertyTax();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSaveResult = () => {
    alert("Results saved to your account");
  };

  const handleShareResult = () => {
    alert("Share link copied to clipboard");
  };

  const renderTaxResults = () => {
    if (!taxResults) return null;
    
    if (taxResults.type === "income-tax") {
      return (
        <div className="mt-6 border rounded-lg p-4 bg-blue-50">
          <h3 className="font-semibold text-lg mb-3">Tax Calculation Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Taxable Income:</span>
              <span className="font-medium">{formatCurrency(taxResults.taxableIncome)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Base Tax:</span>
              <span className="font-medium">{formatCurrency(taxResults.taxAmount)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Health & Education Cess (4%):</span>
              <span className="font-medium">{formatCurrency(taxResults.cess)}</span>
            </div>
            <div className="flex justify-between border-b pb-2 text-lg font-semibold">
              <span>Total Tax Liability:</span>
              <span className="text-primary">{formatCurrency(taxResults.totalTaxLiability)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Effective Tax Rate:</span>
              <span className="font-medium">{taxResults.effectiveTaxRate.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Take Home Annual Income:</span>
              <span className="text-primary">{formatCurrency(taxResults.takeHomeSalary)}</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Take Home:</span>
              <span className="font-medium">{formatCurrency(taxResults.monthlyTakeHome)}</span>
            </div>
          </div>
        </div>
      );
    } else if (taxResults.type === "gst") {
      return (
        <div className="mt-6 border rounded-lg p-4 bg-blue-50">
          <h3 className="font-semibold text-lg mb-3">GST Calculation Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Base Price:</span>
              <span className="font-medium">{formatCurrency(taxResults.basePrice)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>GST Rate:</span>
              <span className="font-medium">{taxResults.gstRate}%</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>GST Amount:</span>
              <span className="font-medium">{formatCurrency(taxResults.gstAmount)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Price (Incl. GST):</span>
              <span className="text-primary">{formatCurrency(taxResults.totalPrice)}</span>
            </div>
          </div>
        </div>
      );
    } else if (taxResults.type === "property-tax") {
      return (
        <div className="mt-6 border rounded-lg p-4 bg-blue-50">
          <h3 className="font-semibold text-lg mb-3">Property Tax Calculation Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>Property Value:</span>
              <span className="font-medium">{formatCurrency(taxResults.propertyValue)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Effective Tax Rate:</span>
              <span className="font-medium">{taxResults.effectiveRate.toFixed(3)}%</span>
            </div>
            <div className="flex justify-between border-b pb-2 text-lg font-semibold">
              <span>Annual Property Tax:</span>
              <span className="text-primary">{formatCurrency(taxResults.annualPropertyTax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Quarterly Payment:</span>
              <span className="font-medium">{formatCurrency(taxResults.quarterlyPropertyTax)}</span>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Policy Impact Calculator</h1>
        <p className="text-neutral-medium">
          Calculate how government policies affect your finances with our interactive tools
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Financial Impact Calculators</CardTitle>
          <CardDescription>
            See how policies and regulations translate to real numbers for your situation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="income-tax">Income Tax</TabsTrigger>
              <TabsTrigger value="gst">GST Calculator</TabsTrigger>
              <TabsTrigger value="property-tax">Property Tax</TabsTrigger>
            </TabsList>
            
            <TabsContent value="income-tax" className="mt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tax-regime">Tax Regime</Label>
                    <Select value={taxRegime} onValueChange={setTaxRegime}>
                      <SelectTrigger id="tax-regime">
                        <SelectValue placeholder="Select Tax Regime" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New Regime</SelectItem>
                        <SelectItem value="old">Old Regime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="annual-income">Annual Income (₹)</Label>
                    <Input
                      id="annual-income"
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                    />
                  </div>
                </div>
                
                {taxRegime === "old" && (
                  <>
                    <Separator className="my-4" />
                    <h3 className="font-medium mb-3">Deductions & Exemptions</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="investment-amount">Section 80C Investments (₹)</Label>
                        <Input
                          id="investment-amount"
                          type="number"
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                        />
                        <p className="text-xs text-neutral-medium">Max: ₹1,50,000</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="housing-loan">Housing Loan Interest (₹)</Label>
                        <Input
                          id="housing-loan"
                          type="number"
                          value={housingLoan}
                          onChange={(e) => setHousingLoan(Number(e.target.value))}
                        />
                        <p className="text-xs text-neutral-medium">Max: ₹2,00,000</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="hra-amount">HRA Exemption (₹)</Label>
                        <Input
                          id="hra-amount"
                          type="number"
                          value={hraAmount}
                          onChange={(e) => setHraAmount(Number(e.target.value))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="medical-insurance">Medical Insurance Premium (₹)</Label>
                        <Input
                          id="medical-insurance"
                          type="number"
                          value={medicalInsurance}
                          onChange={(e) => setMedicalInsurance(Number(e.target.value))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dependents">Senior Citizen Dependents</Label>
                        <Select 
                          value={dependents.toString()} 
                          onValueChange={(val) => setDependents(Number(val))}
                        >
                          <SelectTrigger id="dependents">
                            <SelectValue placeholder="Number of Dependents" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">None</SelectItem>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="interest-income">Interest Income (₹)</Label>
                        <Input
                          id="interest-income"
                          type="number"
                          value={interestIncome}
                          onChange={(e) => setInterestIncome(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <Alert className="bg-blue-50 border-blue-200 mt-6">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Tax Regime Comparison</AlertTitle>
                  <AlertDescription>
                    The new tax regime offers lower tax rates but eliminates most deductions.
                    The old regime allows various deductions but with higher base tax rates.
                  </AlertDescription>
                </Alert>
                
                <Button className="w-full mt-4" onClick={handleCalculate}>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Income Tax
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="gst" className="mt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-price">Base Price (₹)</Label>
                    <Input
                      id="product-price"
                      type="number"
                      value={productPrice}
                      onChange={(e) => setProductPrice(Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gst-rate">GST Rate (%)</Label>
                    <Select 
                      value={gstRate.toString()} 
                      onValueChange={(val) => setGstRate(Number(val))}
                    >
                      <SelectTrigger id="gst-rate">
                        <SelectValue placeholder="Select GST Rate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0% (Exempt)</SelectItem>
                        <SelectItem value="5">5% (Essential Items)</SelectItem>
                        <SelectItem value="12">12% (Standard Rate 1)</SelectItem>
                        <SelectItem value="18">18% (Standard Rate 2)</SelectItem>
                        <SelectItem value="28">28% (Luxury Items)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Alert className="bg-blue-50 border-blue-200 mt-6">
                  <Info className="h-4 w-4" />
                  <AlertTitle>GST Information</AlertTitle>
                  <AlertDescription>
                    GST (Goods and Services Tax) is a consumption tax levied on goods and services.
                    It replaced multiple taxes including VAT, excise duty, and service tax.
                  </AlertDescription>
                </Alert>
                
                <Button className="w-full mt-4" onClick={handleCalculate}>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate GST
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="property-tax" className="mt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="property-value">Property Value (₹)</Label>
                    <Input
                      id="property-value"
                      type="number"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="property-type">Property Type</Label>
                    <Select 
                      value={propertyType} 
                      onValueChange={setPropertyType}
                    >
                      <SelectTrigger id="property-type">
                        <SelectValue placeholder="Select Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="property-location">Property Location</Label>
                    <Select 
                      value={propertyLocation} 
                      onValueChange={setPropertyLocation}
                    >
                      <SelectTrigger id="property-location">
                        <SelectValue placeholder="Select Location Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urban">Urban (Metro City)</SelectItem>
                        <SelectItem value="semi-urban">Semi-Urban</SelectItem>
                        <SelectItem value="rural">Rural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Property Age (Years): {propertyAge}</Label>
                    <Slider
                      min={0}
                      max={30}
                      step={1}
                      value={[propertyAge]}
                      onValueChange={(value) => setPropertyAge(value[0])}
                    />
                  </div>
                </div>
                
                <Alert className="bg-blue-50 border-blue-200 mt-6">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Property Tax Information</AlertTitle>
                  <AlertDescription>
                    Property tax is a tax imposed on real estate by local governments.
                    Rates vary based on property value, type, location, and other factors.
                  </AlertDescription>
                </Alert>
                
                <Button className="w-full mt-4" onClick={handleCalculate}>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Property Tax
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {renderTaxResults()}
          
          {taxResults && (
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={handleSaveResult}>
                <Download className="mr-2 h-4 w-4" />
                Save Result
              </Button>
              <Button variant="outline" onClick={handleShareResult}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Result
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Policy Changes Timeline</CardTitle>
            <CardDescription>
              Recent and upcoming changes to fiscal policies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative pl-5 border-l-2 border-primary pb-4">
                <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary"></div>
                <p className="text-sm font-medium">April 1, 2023</p>
                <h4 className="font-medium mt-1">New Income Tax Regime Introduced</h4>
                <p className="text-sm text-neutral-medium mt-1">
                  Optional new tax structure with lower rates but fewer deductions
                </p>
              </div>
              
              <div className="relative pl-5 border-l-2 border-primary pb-4">
                <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary"></div>
                <p className="text-sm font-medium">July 1, 2023</p>
                <h4 className="font-medium mt-1">GST Rate Adjustments</h4>
                <p className="text-sm text-neutral-medium mt-1">
                  Revision of GST rates for several product categories
                </p>
              </div>
              
              <div className="relative pl-5 border-l-2 border-primary">
                <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary"></div>
                <p className="text-sm font-medium">January 1, 2024</p>
                <h4 className="font-medium mt-1">Property Tax Assessment Changes</h4>
                <p className="text-sm text-neutral-medium mt-1">
                  New valuation methods for property tax assessment in urban areas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Common questions about financial policies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                  Which tax regime is better for me?
                </h4>
                <p className="text-sm text-neutral-medium ml-6 mt-1">
                  It depends on your investments and deductions. Generally, if you claim many deductions, 
                  the old regime may be beneficial. Use our calculator to compare both.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                  How is property tax calculated?
                </h4>
                <p className="text-sm text-neutral-medium ml-6 mt-1">
                  Property tax is typically based on the assessed value of the property, 
                  its location, type (residential/commercial), and age. Local authorities 
                  set the specific rates and assessment methods.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                  What are the current GST slabs?
                </h4>
                <p className="text-sm text-neutral-medium ml-6 mt-1">
                  The current GST slabs are 0% (exempt), 5% (essential items), 
                  12% and 18% (standard rates), and 28% (luxury items). Some luxury 
                  items also have additional cess.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              View Detailed Policy Guide
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Disclaimer</h3>
            <p className="text-sm text-amber-700 mt-1">
              This calculator provides estimates based on general policy rules. 
              Actual tax calculations may vary based on individual circumstances, 
              exemptions, and latest policy changes. For precise financial planning, 
              please consult a tax professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyImpactCalculator;