import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, Lock, Shield, Smartphone, Laptop, Wifi, Globe, Search, ExternalLink } from "lucide-react";

const DigitalSecurity = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Digital safety topics with structured content
  const digitalSafetyTopics = [
    {
      id: 1,
      title: "Password Security",
      category: "personal",
      icon: <Lock className="h-6 w-6 text-primary" />,
      description: "Learn how to create strong passwords and manage them securely.",
      content: [
        {
          title: "Create Strong Passwords",
          text: "Use a combination of uppercase and lowercase letters, numbers, and special characters. Aim for at least 12 characters."
        },
        {
          title: "Use Unique Passwords",
          text: "Never reuse passwords across different accounts. If one service is compromised, others remain secure."
        },
        {
          title: "Consider a Password Manager",
          text: "Password managers generate and store complex passwords securely, so you only need to remember one master password."
        },
        {
          title: "Enable Two-Factor Authentication",
          text: "Add an extra layer of security with 2FA, which requires a second verification method beyond your password."
        }
      ],
      tips: [
        "Change critical passwords every 3-6 months",
        "Never share passwords via email or text",
        "Check your password strength on trusted sites",
        "Consider using passphrases that are easy to remember but hard to guess"
      ]
    },
    {
      id: 2,
      title: "Phishing Awareness",
      category: "personal",
      icon: <AlertTriangle className="h-6 w-6 text-accent" />,
      description: "Recognize and avoid phishing attempts that try to steal your information.",
      content: [
        {
          title: "Recognize Phishing Emails",
          text: "Check for suspicious sender addresses, poor grammar, urgent requests for personal information, and unexpected attachments."
        },
        {
          title: "Verify Before Clicking",
          text: "Hover over links to see the actual URL before clicking. Don't click on suspicious links even if they appear to come from people you know."
        },
        {
          title: "Be Wary of Unsolicited Messages",
          text: "Government agencies and legitimate companies won't ask for sensitive information via email or text messages."
        },
        {
          title: "Report Phishing Attempts",
          text: "Report suspicious emails to your organization's IT department or to the Cyber Crime portal."
        }
      ],
      tips: [
        "Never provide personal information in response to an email",
        "Type website addresses directly in your browser instead of clicking links",
        "Be especially cautious of messages creating urgency or fear",
        "Use email filters to reduce spam and phishing attempts"
      ]
    },
    {
      id: 3,
      title: "Mobile Device Security",
      category: "device",
      icon: <Smartphone className="h-6 w-6 text-secondary" />,
      description: "Protect your smartphones and tablets from various security threats.",
      content: [
        {
          title: "Keep Your Device Updated",
          text: "Install operating system and app updates promptly as they often contain security patches."
        },
        {
          title: "Use Screen Locks",
          text: "Secure your device with a strong PIN, pattern, password, or biometric authentication."
        },
        {
          title: "Be Cautious with App Permissions",
          text: "Only grant necessary permissions to apps and review them regularly."
        },
        {
          title: "Install from Official Sources",
          text: "Download apps only from official app stores like Google Play or Apple App Store."
        }
      ],
      tips: [
        "Enable remote tracking and wiping features",
        "Backup your data regularly",
        "Use VPN when connecting to public WiFi",
        "Disable Bluetooth and WiFi when not in use"
      ]
    },
    {
      id: 4,
      title: "Secure Browsing",
      category: "device",
      icon: <Globe className="h-6 w-6 text-primary" />,
      description: "Browse the internet safely and protect your online activities.",
      content: [
        {
          title: "Use Secure Connections",
          text: "Look for HTTPS in the URL and a padlock icon before entering sensitive information on websites."
        },
        {
          title: "Keep Browsers Updated",
          text: "Ensure your browser is up to date to protect against known vulnerabilities."
        },
        {
          title: "Use Private Browsing Mode",
          text: "Use incognito or private browsing mode when using public computers or for sensitive searches."
        },
        {
          title: "Manage Cookies and Site Data",
          text: "Regularly clear browsing data and manage cookie settings to enhance privacy."
        }
      ],
      tips: [
        "Consider using privacy-focused browsers",
        "Install trusted ad-blockers and privacy extensions",
        "Be cautious when allowing browser notifications",
        "Disable autofill for sensitive information"
      ]
    },
    {
      id: 5,
      title: "Wi-Fi Security",
      category: "network",
      icon: <Wifi className="h-6 w-6 text-accent" />,
      description: "Secure your home network and safely use public Wi-Fi.",
      content: [
        {
          title: "Secure Your Home Network",
          text: "Use WPA3 encryption, change default router credentials, and create a strong network password."
        },
        {
          title: "Be Cautious on Public Wi-Fi",
          text: "Avoid accessing sensitive accounts or making financial transactions on public networks."
        },
        {
          title: "Use VPN Services",
          text: "Virtual Private Networks encrypt your internet traffic, providing additional security on public networks."
        },
        {
          title: "Disable Auto-Connect",
          text: "Prevent your device from automatically connecting to available networks."
        }
      ],
      tips: [
        "Create a guest network for visitors",
        "Update your router's firmware regularly",
        "Use 'https' websites on public Wi-Fi",
        "Consider using mobile data instead of public Wi-Fi for sensitive tasks"
      ]
    },
    {
      id: 6,
      title: "Data Privacy",
      category: "personal",
      icon: <Shield className="h-6 w-6 text-secondary" />,
      description: "Understand how to protect your personal data online.",
      content: [
        {
          title: "Review Privacy Settings",
          text: "Regularly check and update privacy settings on social media and other online accounts."
        },
        {
          title: "Be Mindful of Sharing",
          text: "Limit the personal information you share online, especially on social media platforms."
        },
        {
          title: "Read Privacy Policies",
          text: "Understand how websites and services collect, use, and share your data before agreeing to terms."
        },
        {
          title: "Know Your Rights",
          text: "Familiarize yourself with data protection regulations like the Digital Personal Data Protection Act."
        }
      ],
      tips: [
        "Use privacy-focused search engines",
        "Consider using encrypted messaging apps",
        "Regularly delete unused accounts and apps",
        "Check for data breaches involving your accounts"
      ]
    }
  ];

  // Filter topics based on search query
  const filteredTopics = searchQuery
    ? digitalSafetyTopics.filter(
        topic =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : digitalSafetyTopics;

  // Group topics by category
  const personalSecurityTopics = filteredTopics.filter(topic => topic.category === "personal");
  const deviceSecurityTopics = filteredTopics.filter(topic => topic.category === "device");
  const networkSecurityTopics = filteredTopics.filter(topic => topic.category === "network");

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Digital & Cyber Security</h1>
        <p className="text-neutral-medium">
          Learn how to protect yourself online and keep your personal data secure
        </p>
      </div>

      {/* Alert Banner */}
      <Alert className="bg-blue-50 border-l-4 border-primary mb-6">
        <AlertTriangle className="h-5 w-5 text-primary" />
        <AlertTitle className="text-primary">Stay Vigilant</AlertTitle>
        <AlertDescription>
          Recent increase in phishing attempts targeting banking customers. Verify all communication through official channels.
        </AlertDescription>
      </Alert>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-medium" />
          <Input
            type="text"
            placeholder="Search digital security topics..."
            className="pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Security Categories Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Topics</TabsTrigger>
          <TabsTrigger value="personal">Personal Security</TabsTrigger>
          <TabsTrigger value="device">Device Security</TabsTrigger>
          <TabsTrigger value="network">Network Security</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredTopics.length > 0 ? (
              filteredTopics.map(topic => (
                <Card key={topic.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-50 p-2 rounded-lg mr-3">{topic.icon}</div>
                      <CardTitle>{topic.title}</CardTitle>
                    </div>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {topic.content.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-sm font-medium">{item.title}</AccordionTrigger>
                          <AccordionContent className="text-sm text-neutral-medium">
                            {item.text}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                  <CardFooter className="flex-col items-start">
                    <p className="text-sm font-medium mb-2">Quick Tips:</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.tips.map((tip, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> {tip}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center text-neutral-medium">
                No security topics found matching your search query.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="personal">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {personalSecurityTopics.length > 0 ? (
              personalSecurityTopics.map(topic => (
                <Card key={topic.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-50 p-2 rounded-lg mr-3">{topic.icon}</div>
                      <CardTitle>{topic.title}</CardTitle>
                    </div>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {topic.content.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-sm font-medium">{item.title}</AccordionTrigger>
                          <AccordionContent className="text-sm text-neutral-medium">
                            {item.text}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                  <CardFooter className="flex-col items-start">
                    <p className="text-sm font-medium mb-2">Quick Tips:</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.tips.map((tip, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> {tip}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center text-neutral-medium">
                No personal security topics found matching your search query.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="device">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {deviceSecurityTopics.length > 0 ? (
              deviceSecurityTopics.map(topic => (
                <Card key={topic.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-50 p-2 rounded-lg mr-3">{topic.icon}</div>
                      <CardTitle>{topic.title}</CardTitle>
                    </div>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {topic.content.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-sm font-medium">{item.title}</AccordionTrigger>
                          <AccordionContent className="text-sm text-neutral-medium">
                            {item.text}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                  <CardFooter className="flex-col items-start">
                    <p className="text-sm font-medium mb-2">Quick Tips:</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.tips.map((tip, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> {tip}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center text-neutral-medium">
                No device security topics found matching your search query.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="network">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {networkSecurityTopics.length > 0 ? (
              networkSecurityTopics.map(topic => (
                <Card key={topic.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-50 p-2 rounded-lg mr-3">{topic.icon}</div>
                      <CardTitle>{topic.title}</CardTitle>
                    </div>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {topic.content.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-sm font-medium">{item.title}</AccordionTrigger>
                          <AccordionContent className="text-sm text-neutral-medium">
                            {item.text}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                  <CardFooter className="flex-col items-start">
                    <p className="text-sm font-medium mb-2">Quick Tips:</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.tips.map((tip, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> {tip}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center text-neutral-medium">
                No network security topics found matching your search query.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Security Assessment */}
      <div className="mb-8">
        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle>Security Self-Assessment</CardTitle>
            <CardDescription>
              Check your current digital security practices with our quick assessment tool
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full sm:w-auto">Take Security Assessment</Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Resources */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Official Government Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.cert-in.org.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    CERT-In (Indian Computer Emergency Response Team)
                  </a>
                </li>
                <li>
                  <a
                    href="https://cybercrime.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    National Cyber Crime Reporting Portal
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.meity.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ministry of Electronics & Information Technology
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Educational Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center text-primary hover:underline">
                    <Laptop className="h-4 w-4 mr-2" />
                    Online Safety Guide for Children and Parents
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-primary hover:underline">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Mobile Security Best Practices
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-primary hover:underline">
                    <Shield className="h-4 w-4 mr-2" />
                    Understanding Data Privacy Rights
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DigitalSecurity;
