import { Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-neutral-dark py-8 px-6 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CivicSense</h3>
            <p className="text-neutral-light text-sm mb-4">Making government information accessible and understandable for every citizen.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-light hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-light hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-light hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-base font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-neutral-light hover:text-white">Home</a></li>
              <li><a href="/budget" className="text-neutral-light hover:text-white">Budget Explorer</a></li>
              <li><a href="/rights" className="text-neutral-light hover:text-white">Know Your Rights</a></li>
              <li><a href="/policy-updates" className="text-neutral-light hover:text-white">Policy Updates</a></li>
              <li><a href="/schemes" className="text-neutral-light hover:text-white">Government Schemes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-neutral-light hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-neutral-light hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-light hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-neutral-light hover:text-white">API Documentation</a></li>
              <li><a href="#" className="text-neutral-light hover:text-white">Government Offices</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-neutral-light" />
                <span className="text-neutral-light">support@civicsense.gov</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-neutral-light" />
                <span className="text-neutral-light">1800-123-4567</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-base font-semibold mb-2">Subscribe to Updates</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-white bg-opacity-10 rounded-l-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="bg-primary px-4 py-2 rounded-r-lg text-white text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white border-opacity-10 text-center text-xs text-neutral-light">
          <p>© {new Date().getFullYear()} CivicSense. All rights reserved. A Government of India Initiative.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
