// components/layout/Footer.tsx
"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";
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
  contactInfo,
  footerLinks,
  companyInfo,
} from "@/lib/constants";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = useState("");
  const socialIcons = [Facebook, Instagram, Twitter, Linkedin];

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="dark:bg-[rgb(1,10,26)] bg-[rgb(35,18,38)] text-white py-8 sm:py-12 lg:py-16 border-t-2 border-gray-700">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Footer Content with Newsletter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="relative flex items-center cursor-pointer">
              <Image
                src="/logos/removal-809.png"
                alt="Altaf Builder Logo"
                width={100}
                height={34}
                className="object-contain w-auto h-auto z-10"
                priority
              />
              <Image
                src="/logos/altaf.png"
                alt="Altaf Builder Text"
                width={100}
                height={34}
                className="object-contain -ml-8 sm:-ml-10 lg:-ml-12 z-0 w-auto h-auto mb-4"
                priority
              />
            </div>
            <p className="mb-4 dark:text-white ml-4 sm:ml-6 lg:ml-8 text-sm sm:text-base">
              {companyInfo.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="ml-0 sm:ml-6 lg:ml-12">
            <h3 className="text-base sm:text-lg text-white font-bold mb-3 sm:mb-4 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-0">
              {quickLinks.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="font-bold font-optima hover:text-[#B91C1C] transition-colors dark:text-white text-sm sm:text-base"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white">
              Contact Information
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start sm:items-center">
                <MapPin className="h-3 w-3 text-[rgb(140,46,71)] mr-2 mt-1 sm:mt-0 flex-shrink-0" />
                <span className="dark:text-white text-sm sm:text-base">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-3 w-3 text-[#B91C1C] mr-2 flex-shrink-0" />
                <span className="dark:text-white text-sm sm:text-base">
                  {contactInfo.phone}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-3 w-3 text-[#B91C1C] mr-2 flex-shrink-0" />
                <span className="dark:text-white text-sm sm:text-base break-all">
                  {contactInfo.email}
                </span>
              </li>
              <li className="flex items-start sm:items-center">
                <Clock className="h-3 w-3 text-[#B91C1C] mr-2 mt-1 sm:mt-0 flex-shrink-0" />
                <span className="dark:text-white text-sm sm:text-base">
                  {contactInfo.workingHours}
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-base sm:text-lg mb-3 sm:mb-4 font-bold text-white">
              Stay Updated
            </h3>
            <p className="mb-4 leading-relaxed text-sm sm:text-base">
              Subscribe for latest updates on projects and offers.
            </p>

            {/* Newsletter Form */}
            <div className="mb-4">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded focus:outline-none focus:ring-1 focus:ring-[#8B2131] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
                  required
                />
                <Button
                  size="lg"
                  type="submit"
                  onClick={handleNewsletterSubmit}
                  variant="outline"
                  className="py-1 px-3 text-white font-medium hover:bg-transparent border-[#B91C1C] bg-[#B91C1C] cursor-pointer dark:hover:text-white dark:bg-[#B91C1C] dark:hover:bg-transparent dark:border-[#B91C1C] dark:text-white text-sm sm:text-base"
                >
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Small Social Icons */}
            <div className="flex items-center space-x-3">
              {socialIcons.map((Icon, index) => (
                <Link
                  key={index}
                  href={socialMediaLinks[index]?.href || "#"}
                  className="text-white transition-colors dark:text-white hover:text-[#8B2131] dark:hover:text-[#8B2131]"
                  aria-label={
                    socialMediaLinks[index]?.name || `Social link ${index + 1}`
                  }
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-semibold text-xs sm:text-sm dark:text-white text-center md:text-left">
              {companyInfo.copyright}
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <a
                href={footerLinks.privacy}
                className="hover:text-[#B91C1C] font-semibold transition-colors text-xs sm:text-sm dark:text-white"
              >
                Privacy Policy
              </a>
              <a
                href={footerLinks.terms}
                className="hover:text-[#B91C1C] transition-colors text-xs sm:text-sm dark:text-white font-semibold"
              >
                Terms of Service
              </a>
              <a
                href={footerLinks.cookies}
                className="hover:text-[#B91C1C] transition-colors text-xs sm:text-sm dark:text-white font-bold"
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