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
  copyright: "© 2025 ALTAF BUILDER. All rights reserved."
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

// lib/constants/animations.ts

// Optimized Animation Constants
// Performance improvements: shorter durations, GPU acceleration, reduced complexity

export const fadeInUp = {
  initial: { opacity: 0, y: 30 }, // Reduced from 50px
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.4, // Reduced from 0.6s
    ease: [0.25, 0.25, 0, 1],
    // GPU acceleration hint
    willChange: "transform, opacity"
  }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 }, // Reduced from -50px
  animate: { opacity: 1, x: 0 },
  transition: { 
    duration: 0.4, // Reduced from 0.6s
    willChange: "transform, opacity"
  }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 }, // Reduced from 50px
  animate: { opacity: 1, x: 0 },
  transition: { 
    duration: 0.4, // Reduced from 0.6s
    willChange: "transform, opacity"
  }
};

export const scaleOnHover = {
  whileHover: { scale: 1.03 }, // Reduced from 1.05 for subtlety
  whileTap: { scale: 0.97 }, // Reduced from 0.95
  transition: { 
    duration: 0.15, // Reduced from 0.2s for snappier feel
    ease: "easeOut"
  }
};

export const cardHover = {
  whileHover: { 
    y: -6, // Reduced from -8px
    scale: 1.01 // Reduced from 1.02
  },
  transition: { 
    duration: 0.2, // Reduced from 0.3s
    ease: "easeOut",
    willChange: "transform"
  }
};

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.3, // Reduced from 0.6s
    staggerChildren: 0.08, // Reduced from 0.1s
    ease: "easeOut"
  }
};

export const slideInFromBottom = {
  initial: { opacity: 0, y: 40 }, // Reduced from 100px
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.5, // Reduced from 0.8s
    ease: "easeOut",
    willChange: "transform, opacity"
  }
};

export const rotateOnHover = {
  whileHover: { rotate: 3 }, // Reduced from 5 degrees
  transition: { 
    duration: 0.2, // Reduced from 0.3s
    ease: "easeOut",
    willChange: "transform"
  }
};

// Optimized pulse - use CSS for better performance
export const pulseAnimation = {
  initial: { scale: 1 },
  animate: { scale: [1, 1.02, 1] }, // Smaller scale change, removed opacity
  transition: {
    duration: 1.5, // Reduced from 2s
    repeat: Infinity,
    ease: "easeInOut",
    willChange: "transform"
  }
};

// New optimized animations
export const quickFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

export const microSlide = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.25,
    ease: "easeOut",
    willChange: "transform, opacity"
  }
};

// Optimized viewport settings
export const viewportOnce = {
  once: true,
  margin: "-50px" // Reduced from -100px for earlier trigger
};

export const viewportDefault = {
  once: true,
  amount: 0.2 // Reduced from 0.3 for earlier trigger
};

// Performance-focused viewport for mobile
export const viewportMobile = {
  once: true,
  margin: "-20px",
  amount: 0.1
};

// Updated easing presets - more performant
export const easingPresets = {
  smooth: [0.25, 0.25, 0, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275], 
  fast: [0.4, 0, 0.2, 1],
  slow: [0.4, 0, 0.6, 1],
  // New optimized easings
  snappy: [0.25, 0.46, 0.45, 0.94],
  gentle: [0.25, 0.1, 0.25, 1]
};

// Optimized animation delays
export const delays = {
  instant: 0,
  short: 0.05, // Reduced from 0.1
  medium: 0.15, // Reduced from 0.3
  long: 0.25, // Reduced from 0.5
  stagger: (index: number) => index * 0.05 // Reduced from 0.1
};

// Performance monitoring utilities
export const getOptimizedVariant = (baseVariant: any, isLowPower: boolean) => {
  if (isLowPower) {
    return {
      ...baseVariant,
      transition: {
        ...baseVariant.transition,
        duration: baseVariant.transition.duration * 0.5,
        ease: "linear" // Simpler easing for low-power devices
      }
    };
  }
  return baseVariant;
};

// Conditional animation based on device capability
export const smartAnimation = (prefersReducedMotion: boolean) => ({
  initial: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
  animate: prefersReducedMotion ? {} : { opacity: 1, y: 0 },
  transition: prefersReducedMotion ? {} : { duration: 0.3 }
});

// Batch animation for multiple elements
export const batchStagger = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.03, // Very quick stagger
        delayChildren: 0.05
      }
    }
  },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  }
};