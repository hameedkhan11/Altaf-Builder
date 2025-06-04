// components/layout/Footer.tsx
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
import {
  quickLinks,
  latestNews,
  socialMediaLinks,
  contactInfo,
  footerLinks,
  companyInfo,
} from "@/lib/constants";

const Footer = () => {
  const socialIcons = [Facebook, Instagram, Twitter, Linkedin];

  return (
    <footer className="bg-rgb(30,5,36)  text-primary-foreground py-16 border-t-2 border-gray-700">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="relative flex items-center cursor-pointer">
              <Image
                src="/logos/removal-809.png"
                alt="Altaf Builder Logo"
                width={100}
                height={32}
                className="object-contain z-10"
                priority
              />
              <Image
                src="/logos/altaf.png"
                alt="Altaf Builder Text"
                width={100}
                height={32}
                className="object-contain -ml-12 z-0"
                priority
              />
            </div>
            <p className="text-black font-bold mb-6 dark:text-white ml-8">
              {companyInfo.description}
            </p>
            <div className="flex items-center space-x-4 ml-6">
              {socialIcons.map((Icon, index) => (
                <a
                  key={index}
                  href={socialMediaLinks[index]?.href || "#"}
                  className="text-[#B91C1C] transition-colors dark:text-white"
                  aria-label={
                    socialMediaLinks[index]?.name || `Social link ${index + 1}`
                  }
                >
                  <Icon className="h-5 w-5 " />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 dark:text-white text-black">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-black font-bold hover:text-[#B91C1C] transition-colors dark:text-white"
                  >
                    <span className="font-bold">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg text-black font-bold mb-6 dark:text-white">
              Contact Information
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 text-[#B91C1C] mr-3 " />
                <span className="text-black dark:text-white font-bold">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#B91C1C] mr-3" />
                <span className="text-black dark:text-white font-bold">
                  {contactInfo.phone}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#B91C1C] mr-3" />
                <span className="text-black dark:text-white font-bold">
                  {contactInfo.email}
                </span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-[#B91C1C] mr-3" />
                <span className="text-black dark:text-white font-bold">
                  {contactInfo.workingHours}
                </span>
              </li>
            </ul>
          </div>

          {/* Latest News */}
          <div>
            <h3 className="text-lg text-black font-bold mb-6 dark:text-white">
              Latest News
            </h3>
            <div className="space-y-4">
              {latestNews.map((news, index) => (
                <div key={index} className="border-l-2 border-[#B91C1C] pl-4">
                  <h3 className="font-bold text-sm mb-1 dark:text-white">
                    {news.title}
                  </h3>
                  <p className="text-black font-bold text-sm dark:text-white">
                    {news.description}
                  </p>
                  <p className="text-black font-bold text-xs mt-1 dark:text-white">
                    {news.date}
                  </p>
                </div>
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
