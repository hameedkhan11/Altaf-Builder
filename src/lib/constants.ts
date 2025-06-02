import { NavigationItem, NewsItem } from "./types";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: "Properties", href: "/properties" },
  { name: "Communities", href: "/communities" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Blogs", href: "/blogs" },
  { name: "Media Center", href: "/media" },
  { name: "Contact Us", href: "/contact" },
];

export const COMPANY_INFO = {
  name: "ALTAF BUILDER",
  tagline: "Redefining Luxury Living in Prime Locations",
  description:
    "Discover exceptional properties crafted with precision and designed for those who appreciate the finest details in life.",
  address: "Sheikh Zayed Road, Dubai, UAE",
  phone: "+971 4 123 4567",
  email: "info@altafbuilder.com",
  hours: "Sun - Thu: 9AM - 6PM",
};

export const quickLinks = [
  'Properties',
  'Communities', 
  'Projects',
  'Services',
  'About Us',
  'Contact Us'
];

export const socialMediaLinks = [
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'LinkedIn', href: '#' }
];

export const contactInfo = {
  address: "Sheikh Zayed Road, Dubai, UAE",
  phone: "+971 4 123 4567",
  email: "info@altafbuilder.com",
  workingHours: "Sun - Thu: 9AM - 6PM"
};

export const footerLinks = {
  privacy: "#",
  terms: "#",
  cookies: "#"
};

export const companyInfo = {
  name: "ALTAF BUILDER",
  description: "Redefining luxury living with exceptional properties in prime locations. Experience the pinnacle of architectural excellence and craftsmanship.",
  copyright: "© 2024 ALTAF BUILDER. All rights reserved."
};
export const latestNews: NewsItem[] = [
  {
    title: "New Project Launch",
    description: "The Oasis Towers breaks ground in Business Bay",
    date: "Dec 15, 2024"
  },
  {
    title: "Award Recognition",
    description: "Best Luxury Developer Award 2024",
    date: "Nov 28, 2024"
  },
  {
    title: "Sustainability Initiative",
    description: "Green building certification for all new projects",
    date: "Oct 20, 2024"
  }
];