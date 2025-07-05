// components/layout/Footer.tsx
"use client";
import { useState, FormEvent } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  quickLinks,
  socialMediaLinks,
  footerLinks,
  companyInfo,
} from "@/lib/constants";
import Link from "next/link";
import AltafLogo from "../../../public/logos/altaf-logo.svg";

const Footer = () => {
  const [email, setEmail] = useState("");
  const socialIcons = [Facebook, Instagram, Twitter, Linkedin];

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission logic here
    console.log("Newsletter subscription:", email);
    setEmail(""); // Clear form after submission
  };

  return (
    <footer className="text-white py-8 sm:py-12 lg:py-16 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          
          {/* Company Info - Takes more space */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <AltafLogo 
                className="w-[120px] h-[88px] sm:w-[140px] sm:h-[102px] lg:w-[160px] lg:h-[116px] text-[#8c2e47] transition-all duration-300 hover:opacity-80 ml-6"
              />
            </Link>
            
            {/* Company Description */}
            <p className="text-black dark:text-white text-sm sm:text-base leading-relaxed max-w-sm font-optima ml-8">
              {companyInfo.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-lg font-medium  mb-4 font-optima">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-black dark:text-white hover:text-[#8c2e47] dark:hover:text-[#8c2e47] transition-colors duration-300 text-sm sm:text-base font-optima "
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1 lg:col-span-3">
            <h3 className="text-lg font-medium mb-4 font-optima">
              Contact Information
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 text-[#8c2e47] mr-3 mt-1 flex-shrink-0" />
                <span className="text-black dark:text-white text-sm sm:text-base leading-relaxed font-optima ">
                  Main Boulevard Plot #1<br />
                  Block B Faisal Hills
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-[#8c2e47] mr-3 flex-shrink-0" />
                <span className="text-black text-sm sm:text-base font-optima ">
                  03330777775
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-[#8c2e47] mr-3 flex-shrink-0" />
                <span className="text-black dark:text-white text-sm sm:text-base break-all font-optima ">
                  info@alef.developments.com
                </span>
              </li>
              <li className="flex items-start">
                <Clock className="h-4 w-4 text-[#8c2e47] mr-3 mt-1 flex-shrink-0" />
                <span className="text-black dark:text-white text-sm sm:text-base leading-relaxed font-optima ">
                  Mon - Sun 9AM - 7PM
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <h3 className="text-lg  mb-4 font-medium font-optima">
              Stay Updated
            </h3>
            <p className="text-black dark:text-white text-sm sm:text-base leading-relaxed mb-4 font-optima ">
              Subscribe for latest updates on projects and offers.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="mb-6">
              <div className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c2e47] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base transition-all duration-300 font-optima"
                  required
                />
                <Button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-[#8c2e47] hover:bg-[#6d1f36] text-white font-medium rounded-lg transition-all duration-300 text-sm sm:text-base font-optima"
                >
                  Subscribe
                </Button>
              </div>
            </form>

            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <span className="text-black dark:text-white text-sm font-medium font-optima ">
                Follow us:
              </span>
              {socialIcons.map((Icon, index) => (
                <Link
                  key={index}
                  href={socialMediaLinks[index]?.href || "#"}
                  className="text-black dark:text-white hover:text-[#8c2e47] dark:hover:text-[#8c2e47] transition-colors duration-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  aria-label={
                    socialMediaLinks[index]?.name || `Social link ${index + 1}`
                  }
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-black dark:text-white text-xs sm:text-sm text-center md:text-left font-optima ">
              {companyInfo.copyright}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6">
              <a
                href={footerLinks.privacy}
                className="text-black dark:text-white hover:text-[#8c2e47] dark:hover:text-[#8c2e47] transition-colors duration-300 text-xs sm:text-sm font-optima "
              >
                Privacy Policy
              </a>
              <a
                href={footerLinks.terms}
                className="text-black dark:text-white hover:text-[#8c2e47] dark:hover:text-[#8c2e47] transition-colors duration-300 text-xs sm:text-sm font-optima "
              >
                Terms of Service
              </a>
              <a
                href={footerLinks.cookies}
                className="text-black dark:text-white hover:text-[#8c2e47] dark:hover:text-[#8c2e47] transition-colors duration-300 text-xs sm:text-sm font-optima "
              >
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