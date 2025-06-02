// components/layout/Footer.tsx

import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { quickLinks, latestNews, socialMediaLinks, contactInfo, footerLinks, companyInfo } from '@/lib/constants';

const Footer = () => {
  const socialIcons = [Facebook, Instagram, Twitter, Linkedin];
  
  return (
    <footer className="bg-rgb(30,5,36) dark:text-white text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold">
                ALTAF <span className="text-indigo-400">BUILDER</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              {companyInfo.description}
            </p>
            <div className="flex items-center space-x-4">
              {socialIcons.map((Icon, index) => (
                <a 
                  key={index} 
                  href={socialMediaLinks[index]?.href || '#'} 
                  className="text-gray-300 hover:text-indigo-400 transition-colors"
                  aria-label={socialMediaLinks[index]?.name || `Social link ${index + 1}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 text-indigo-400 mr-3" />
                <span className="text-gray-300">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-indigo-400 mr-3" />
                <span className="text-gray-300">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-indigo-400 mr-3" />
                <span className="text-gray-300">{contactInfo.email}</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-indigo-400 mr-3" />
                <span className="text-gray-300">{contactInfo.workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Latest News */}
          <div>
            <h3 className="text-lg font-bold mb-6">Latest News</h3>
            <div className="space-y-4">
              {latestNews.map((news, index) => (
                <div key={index} className="border-l-2 border-indigo-400 pl-4">
                  <h4 className="font-semibold text-sm mb-1">{news.title}</h4>
                  <p className="text-gray-300 text-sm">{news.description}</p>
                  <p className="text-gray-400 text-xs mt-1">{news.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              {companyInfo.copyright}
            </p>
            <div className="flex items-center space-x-6">
              <a href={footerLinks.privacy} className="text-gray-300 hover:text-indigo-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href={footerLinks.terms} className="text-gray-300 hover:text-indigo-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href={footerLinks.cookies} className="text-gray-300 hover:text-indigo-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;