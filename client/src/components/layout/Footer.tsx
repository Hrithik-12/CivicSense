import { Mail, Phone, Facebook, Twitter, Instagram, ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-6 text-white relative">
      <div className="absolute inset-0 bg-blue-600 opacity-5 pattern-grid-lg"></div>
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <img src="/logo.png" alt="Logo" className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                CivicSense
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Making government information accessible and understandable for every citizen.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  <Icon className="h-5 w-5 text-gray-300 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                ['Home', '/'],
                ['Budget Explorer', '/budget'],
                ['Know Your Rights', '/rights'],
                ['Policy Updates', '/policy-updates'],
                ['Government Schemes', '/schemes']
              ].map(([label, href]) => (
                <li key={href}>
                  <a 
                    href={href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-3">
              {[
                'Help Center',
                'Privacy Policy',
                'Terms of Service',
                'API Documentation',
                'Government Offices'
              ].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Subscribe */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Stay Connected</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-gray-300">support@civicsense.gov</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-gray-300">1800-123-4567</span>
              </li>
            </ul>

            <div className="space-y-4">
              <h5 className="text-lg font-semibold text-white">Subscribe to Updates</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-2 bg-gray-800 rounded-l-lg text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 rounded-l-none px- flex items-center gap-2"
                  onClick={() => {/* handle subscribe */}}
                >
                  <Send className="h-4 w-4" />
                  <span>Subscribe</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CivicSense. All rights reserved.
            </p>
            <p className="text-sm">
              <span className="text-gray-400">Our  Initiative</span>
              <span className="mx-2 text-gray-600">|</span>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                Terms
              </a>
              <span className="mx-2 text-gray-600">|</span>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                Privacy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
