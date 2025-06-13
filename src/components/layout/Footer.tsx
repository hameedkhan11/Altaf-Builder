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
  latestNews,
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
    <footer className="dark:bg-[rgb(1,10,26)] text-primary-foreground py-16 border-t-2 border-gray-700">
      <div className="container mx-auto px-6">
        {/* Footer Content with Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Company Info */}
          <div>
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
                className="object-contain -ml-12 z-0 w-auto h-auto mb-4"
                priority
              />
            </div>
            <p className="text-black mb-4 dark:text-white ml-8">
              {companyInfo.description}
            </p>
            {/* <div className="flex items-center space-x-3 ml-6">
              {socialIcons.map((Icon, index) => (
                <a
                  key={index}
                  href={socialMediaLinks[index]?.href || "#"}
                  className="text-[#B91C1C] transition-colors dark:text-white"
                  aria-label={
                    socialMediaLinks[index]?.name || `Social link ${index + 1}`
                  }
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-0">
              {quickLinks.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-black font-bold font-optima hover:text-[#B91C1C] transition-colors dark:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 dark:text-white">
              Contact Information
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-3 w-3 text-[rgb(140,46,71)] mr-2" />
                <span className="text-black dark:text-white">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-3 w-3 text-[#B91C1C] mr-2" />
                <span className="text-black dark:text-white">
                  {contactInfo.phone}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-3 w-3 text-[#B91C1C] mr-2" />
                <span className="text-black dark:text-white">
                  {contactInfo.email}
                </span>
              </li>
              <li className="flex items-center">
                <Clock className="h-3 w-3 text-[#B91C1C] mr-2" />
                <span className="text-black dark:text-white">
                  {contactInfo.workingHours}
                </span>
              </li>
            </ul>
          </div>

          {/* Latest News */}
          <div>
            <h3 className="text-lg font-bold mb-2 dark:text-white">
              Latest News
            </h3>
            <div className="space-y-1">
              {latestNews.map((news, index) => (
                <div key={index} className="border-l-2 border-[#B91C1C] pl-3">
                  <h4 className="dark:text-white">
                    {news.title}
                  </h4>
                  <p className="text-black font-medium  dark:text-white">
                    {news.description}
                  </p>
                  <p className="text-black font-medium mt-1 dark:text-white opacity-75">
                    {news.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}

          <div>
            <h3 className="text-lg mb-4 font-bold dark:text-white">
              Stay Updated
            </h3>
            <p className="text-black dark:text-gray-400 mb-4 leading-relaxed">
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
                  className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded focus:outline-none focus:ring-1 focus:ring-[#8B2131] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
                <Button
                  size="lg"
                  type="submit"
                  onClick={handleNewsletterSubmit}
                  variant="outline"
                  className="py-1 px-3 text-white font-medium hover:bg-transparent border-[#B91C1C] bg-[#B91C1C] cursor-pointer dark:hover:text-white dark:bg-[#B91C1C] dark:hover:bg-transparent dark:border-[#B91C1C] dark:text-white"
                >
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Small Social Icons */}
            <div className="flex items-center space-x-3">
              {socialIcons.map((Icon, index) => (
                <a
                  key={index}
                  href={socialMediaLinks[index]?.href || "#"}
                  className="text-[#B91C1C] transition-colors dark:text-white hover:text-[#8B2131] dark:hover:text-[#8B2131]"
                  aria-label={
                    socialMediaLinks[index]?.name || `Social link ${index + 1}`
                  }
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-black font-semibold text-sm mb-4 md:mb-0 dark:text-white">
              {companyInfo.copyright}
            </p>
            <div className="flex items-center space-x-6">
              <a
                href={footerLinks.privacy}
                className="text-black hover:text-[#B91C1C] font-semibold transition-colors text-sm dark:text-white"
              >
                Privacy Policy
              </a>
              <a
                href={footerLinks.terms}
                className="text-black hover:text-[#B91C1C] transition-colors text-sm dark:text-white font-semibold"
              >
                Terms of Service
              </a>
              <a
                href={footerLinks.cookies}
                className="text-black hover:text-[#B91C1C] transition-colors text-sm dark:text-white font-bold"
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
