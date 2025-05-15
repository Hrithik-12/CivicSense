import { useState } from "react";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Digital & Cyber Security
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how to protect yourself online and keep your personal data secure
          </p>
        </motion.div>

        {/* Alert Banner */}
        <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 mb-8">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800">Stay Vigilant</AlertTitle>
          <AlertDescription className="text-amber-700">
            Recent increase in phishing attempts targeting banking customers. Verify all communication through official channels.
          </AlertDescription>
        </Alert>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-600" />
            <Input
              type="text"
              placeholder="Search digital security topics..."
              className="w-full pl-12 pr-4 h-12 rounded-full border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
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
              {filteredTopics.map(topic => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-200">
                    <CardHeader className="pb-2 bg-gradient-to-br from-blue-50 to-cyan-50">
                      <div className="flex items-center mb-3">
                        <div className="p-3 rounded-xl mr-4 bg-white/80 shadow-sm">
                          {topic.icon}
                        </div>
                        <CardTitle className="text-xl">{topic.title}</CardTitle>
                      </div>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {topic.content.map((item, index) => (
                          <AccordionItem 
                            key={index} 
                            value={`item-${index}`}
                            className="border-b border-gray-100"
                          >
                            <AccordionTrigger className="text-sm font-medium hover:text-blue-600">
                              {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-gray-600">
                              {item.text}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                    <CardFooter className="flex-col items-start pt-4 border-t border-gray-100">
                      <p className="text-sm font-medium mb-3 text-gray-700">Quick Tips:</p>
                      <div className="flex flex-wrap gap-2">
                        {topic.tips.map((tip, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" /> {tip}
                          </Badge>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="personal">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {personalSecurityTopics.map(topic => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-200">
                    <CardHeader className="pb-2 bg-gradient-to-br from-blue-50 to-cyan-50">
                      <div className="flex items-center mb-3">
                        <div className="p-3 rounded-xl mr-4 bg-white/80 shadow-sm">
                          {topic.icon}
                        </div>
                        <CardTitle className="text-xl">{topic.title}</CardTitle>
                      </div>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {topic.content.map((item, index) => (
                          <AccordionItem 
                            key={index} 
                            value={`item-${index}`}
                            className="border-b border-gray-100"
                          >
                            <AccordionTrigger className="text-sm font-medium hover:text-blue-600">
                              {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-gray-600">
                              {item.text}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                    <CardFooter className="flex-col items-start pt-4 border-t border-gray-100">
                      <p className="text-sm font-medium mb-3 text-gray-700">Quick Tips:</p>
                      <div className="flex flex-wrap gap-2">
                        {topic.tips.map((tip, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" /> {tip}
                          </Badge>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="device">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {deviceSecurityTopics.map(topic => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-200">
                    <CardHeader className="pb-2 bg-gradient-to-br from-blue-50 to-cyan-50">
                      <div className="flex items-center mb-3">
                        <div className="p-3 rounded-xl mr-4 bg-white/80 shadow-sm">
                          {topic.icon}
                        </div>
                        <CardTitle className="text-xl">{topic.title}</CardTitle>
                      </div>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {topic.content.map((item, index) => (
                          <AccordionItem 
                            key={index} 
                            value={`item-${index}`}
                            className="border-b border-gray-100"
                          >
                            <AccordionTrigger className="text-sm font-medium hover:text-blue-600">
                              {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-gray-600">
                              {item.text}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                    <CardFooter className="flex-col items-start pt-4 border-t border-gray-100">
                      <p className="text-sm font-medium mb-3 text-gray-700">Quick Tips:</p>
                      <div className="flex flex-wrap gap-2">
                        {topic.tips.map((tip, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" /> {tip}
                          </Badge>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="network">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {networkSecurityTopics.map(topic => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-200">
                    <CardHeader className="pb-2 bg-gradient-to-br from-blue-50 to-cyan-50">
                      <div className="flex items-center mb-3">
                        <div className="p-3 rounded-xl mr-4 bg-white/80 shadow-sm">
                          {topic.icon}
                        </div>
                        <CardTitle className="text-xl">{topic.title}</CardTitle>
                      </div>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {topic.content.map((item, index) => (
                          <AccordionItem 
                            key={index} 
                            value={`item-${index}`}
                            className="border-b border-gray-100"
                          >
                            <AccordionTrigger className="text-sm font-medium hover:text-blue-600">
                              {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-gray-600">
                              {item.text}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                    <CardFooter className="flex-col items-start pt-4 border-t border-gray-100">
                      <p className="text-sm font-medium mb-3 text-gray-700">Quick Tips:</p>
                      <div className="flex flex-wrap gap-2">
                        {topic.tips.map((tip, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" /> {tip}
                          </Badge>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Security Assessment Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-none">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800">Security Self-Assessment</CardTitle>
              <CardDescription className="text-blue-600">
                Check your current digital security practices with our quick assessment tool
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
                Take Security Assessment
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Resources Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Additional Resources</h2>
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
    </div>
  );
};

export default DigitalSecurity;
