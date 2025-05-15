import { Mail, Phone, Facebook, Twitter, Instagram, ArrowRight, Send, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 py-8 px-6 text-white relative">
      <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-3xl pattern-grid-lg"></div>
      <div className="container mx-auto relative">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 items-start">
          {/* Brand Section - Compact */}
          <div className="col-span-2 md:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500/10 p-1.5 rounded-lg">
                <Shield/>
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                CivicSense
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Making government information accessible for every citizen.
            </p>
          </div>

          {/* Quick Links - Compact */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold text-gray-300">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Home', 'Budget', 'Rights', 'Updates'].map((label) => (
                <li key={label}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources - Compact */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold text-gray-300">Resources</h4>
            <ul className="space-y-2 text-sm">
              {['Help', 'Privacy', 'Terms', 'API'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Subscribe - Compact */}
          <div className="col-span-2 md:col-span-5 space-y-4">
            <div className="flex items-center gap-6">
              <a href="mailto:support@civicsense.gov" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@civicsense.gov
              </a>
              <a href="tel:18001234567" className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                <Phone className="h-4 w-4" />
                1800-123-4567
              </a>
            </div>
            
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Subscribe to updates" 
                className="flex-1 px-3 py-1.5 bg-gray-800/50 rounded-lg text-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 border-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                size="sm"
                className="bg-blue-600/80 hover:bg-blue-700 px-3"
                onClick={() => {/* handle subscribe */}}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className="mt-8 pt-4 border-t border-gray-800/60">
          <div className="flex flex-wrap justify-between items-center gap-4 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} CivicSense. All rights reserved.</p>
            
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram].map((Icon, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
