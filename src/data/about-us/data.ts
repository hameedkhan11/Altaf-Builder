// data/aboutData.ts
import { AboutPageData } from "@/lib/about-us/types";

export const aboutPageData: AboutPageData = {
  hero: {
    title: "Redefining Luxury Real Estate Excellence",
    subtitle: "Where Vision Meets Reality in Premium Property Development",
    backgroundImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  missionVision: [
    {
      title: "Our Mission",
      description: "To transform the real estate landscape by delivering exceptional luxury properties that exceed expectations, while maintaining the highest standards of integrity, innovation, and client satisfaction.",
      icon: "🎯",
      features: [
        "Deliver premium quality construction and design",
        "Provide unparalleled customer service experience",
        "Create sustainable and innovative living spaces",
        "Build lasting relationships with our clients and partners"
      ]
    },
    {
      title: "Our Vision",
      description: "To be the most trusted and recognized luxury real estate developer, setting new benchmarks in architectural excellence and creating iconic properties that define modern living.",
      icon: "🌟",
      features: [
        "Lead the market in luxury property development",
        "Pioneer sustainable construction practices",
        "Establish global presence in premium real estate",
        "Create communities that enhance quality of life"
      ]
    }
  ],
  team: [
    {
      id: "chairman",
      name: "Robert Sterling",
      position: "Chairman",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "With over 30 years of experience in luxury real estate development, Robert Sterling has been the visionary force behind our company's growth into one of the region's most prestigious property developers.",
      experience: "30+ Years in Real Estate",
      achievements: [
        "Founded the company in 1993 with a vision for luxury development",
        "Led development of over $2B worth of premium properties",
        "Recipient of Real Estate Developer of the Year Award 2023",
        "Pioneer in sustainable luxury construction practices",
        "Established strategic partnerships across 15+ countries"
      ],
      socialLinks: {
        linkedin: "#",
        email: "chairman@company.com"
      }
    },
    {
      id: "md",
      name: "Sarah Davidson",
      position: "Managing Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b977?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Sarah Davidson brings exceptional operational expertise and strategic leadership to our organization. Her innovative approach to project management and client relations has elevated our standards of excellence.",
      experience: "25+ Years in Operations",
      achievements: [
        "Streamlined operations resulting in 40% efficiency improvement",
        "Implemented award-winning customer service protocols",
        "Led successful delivery of 50+ luxury projects on time",
        "Established quality assurance standards adopted industry-wide",
        "MBA from Harvard Business School with Real Estate specialization"
      ],
      socialLinks: {
        linkedin: "#",
        email: "md@company.com"
      }
    },
    {
      id: "sales",
      name: "Michael Chen",
      position: "Sales Expert",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Michael Chen is our top-performing sales professional, renowned for his deep market knowledge and ability to match clients with their perfect luxury properties. His consultative approach has earned him recognition as a trusted advisor.",
      experience: "20+ Years in Luxury Sales",
      achievements: [
        "Achieved over $500M in luxury property sales",
        "Maintained 98% client satisfaction rate over 10 years",
        "Top Sales Professional Award winner for 5 consecutive years",
        "Specialist in ultra-high-net-worth client relationships",
        "Fluent in 6 languages serving international clientele"
      ],
      socialLinks: {
        linkedin: "#",
        email: "sales@company.com"
      }
    }
  ],
  stats: [
    {
      value: "500+",
      label: "Luxury Properties Delivered",
      description: "Premium developments across prime locations"
    },
    {
      value: "$2.5B+",
      label: "Total Project Value",
      description: "Cumulative value of completed developments"
    },
    {
      value: "98%",
      label: "Client Satisfaction",
      description: "Consistently exceeding client expectations"
    },
    {
      value: "30+",
      label: "Years of Excellence",
      description: "Three decades of luxury real estate expertise"
    }
  ],
  company: {
    foundedYear: "1993",
    description: "Established in 1993, we have grown from a boutique real estate firm to one of the region's most prestigious luxury property developers. Our commitment to excellence, innovation, and client satisfaction has made us the preferred choice for discerning buyers seeking exceptional properties.",
    values: [
      "Uncompromising Quality",
      "Innovative Design",
      "Client-Centric Approach",
      "Sustainable Development",
      "Integrity & Transparency"
    ]
  }
};