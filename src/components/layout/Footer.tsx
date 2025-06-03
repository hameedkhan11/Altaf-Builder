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
              />
              <Image
                src="/logos/altaf.png"
                alt="Altaf Builder Text"
                width={100}
                height={32}
                className="object-contain -ml-12 z-0"
              />
            </div>
            <p className="text-black mb-6 dark:text-white ml-8">
              {companyInfo.description}
            </p>
            <div className="flex items-center space-x-4 ml-6">
              {socialIcons.map((Icon, index) => (
                <a
                  key={index}
                  href={socialMediaLinks[index]?.href || "#"}
                  className="text-[#8B2131] transition-colors dark:text-white"
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
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-black hover:text-indigo-400 transition-colors dark:text-white"
                  >
                    {item}
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
                <MapPin className="h-5 w-5 text-[#8B2131] mr-3" />
                <span className="text-black dark:text-white">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#8B2131] mr-3" />
                <span className="text-black dark:text-white">
                  {contactInfo.phone}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#8B2131] mr-3" />
                <span className="text-black dark:text-white">
                  {contactInfo.email}
                </span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-[#8B2131] mr-3" />
                <span className="text-black dark:text-white">
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
                <div key={index} className="border-l-2 border-indigo-400 pl-4">
                  <h3 className="font-bold text-sm mb-1 dark:text-white">
                    {news.title}
                  </h3>
                  <p className="text-black text-sm dark:text-white">
                    {news.description}
                  </p>
                  <p className="text-gray-400 text-xs mt-1 dark:text-white">
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
                className="text-black hover:text-indigo-400 font-semibold transition-colors text-sm dark:text-white"
              >
                Privacy Policy
              </a>
              <a
                href={footerLinks.terms}
                className="text-black hover:text-indigo-400 transition-colors text-sm dark:text-white font-semibold"
              >
                Terms of Service
              </a>
              <a
                href={footerLinks.cookies}
                className="text-black hover:text-indigo-400 transition-colors text-sm dark:text-white font-semibold"
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
