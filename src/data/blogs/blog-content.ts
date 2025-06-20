// components/blog-detail/blogContentData.ts
import { BlogPost } from "@/lib/blogs/types";

export interface BlogContentSection {
  id: string;
  heading: string;
  content: string;
}

export interface BlogContentData {
  introduction: string;
  mainContent: BlogContentSection[];
  conclusion: string;
}

// Blog content data for different posts
export const getBlogContent = (post: BlogPost): BlogContentData => {
  switch (post.id) {
    case "1":
      return {
        introduction:
          "The luxury real estate market in 2025 is experiencing unprecedented transformation. As we navigate through changing consumer preferences and technological advancements, Altaf Development remains at the forefront of innovation, creating spaces that redefine modern luxury living.",

        mainContent: [
          {
            id: "smart-integration",
            heading: "Smart Integration Revolution",
            content:
              "Today's luxury buyers expect seamless integration of technology into their living spaces. From AI-powered climate control systems to voice-activated home automation, smart homes are no longer a luxury—they're an expectation. Our latest developments feature cutting-edge IoT integration that learns from residents' habits and preferences, creating truly personalized living experiences.",
          },
          {
            id: "sustainable-luxury",
            heading: "Sustainable Luxury Redefined",
            content:
              "Environmental consciousness has become a cornerstone of luxury living. Our developments incorporate solar energy systems, rainwater harvesting, and energy-efficient designs without compromising on opulence. Green buildings not only reduce environmental impact but also offer significant long-term cost savings for homeowners.",
          },
          {
            id: "wellness-design",
            heading: "Wellness-Centered Design",
            content:
              "The pandemic has shifted focus toward health and wellness in residential design. Our properties feature dedicated wellness zones, air purification systems, and biophilic design elements that promote mental and physical well-being. Natural light optimization and green spaces are integral to our architectural philosophy.",
          },
        ],

        conclusion:
          "As we look toward the future, Altaf Development continues to innovate and set new standards in luxury real estate. Our commitment to excellence, sustainability, and cutting-edge design ensures that our properties remain valuable investments for generations to come.",
      };

    case "2":
      return {
        introduction:
          "The integration of smart home technology in luxury properties has evolved from a novelty to an essential feature. At Altaf Development, we understand that modern luxury is defined by seamless connectivity and intelligent automation.",

        mainContent: [
          {
            id: "home-automation",
            heading: "Advanced Home Automation Systems",
            content:
              "Our luxury properties feature comprehensive automation systems that control lighting, temperature, security, and entertainment through unified platforms. These systems learn from user behavior to optimize energy consumption while maintaining perfect comfort levels throughout the day.",
          },
          {
            id: "security-privacy",
            heading: "Security and Privacy Enhancement",
            content:
              "State-of-the-art security systems with facial recognition, biometric access, and AI-powered monitoring ensure complete privacy and safety. Smart locks, surveillance cameras, and alarm systems are seamlessly integrated into the home's architecture without compromising aesthetic appeal.",
          },
          {
            id: "energy-management",
            heading: "Energy Management and Efficiency",
            content:
              "Intelligent energy management systems monitor and optimize power consumption across all connected devices. Solar panels, smart thermostats, and automated lighting systems work together to reduce environmental impact while maintaining luxury standards.",
          },
        ],

        conclusion:
          "Smart home technology in luxury properties represents the perfect marriage of convenience, security, and sustainability. Our developments ensure that residents enjoy the ultimate in modern living while maintaining the highest standards of luxury and comfort.",
      };

    case "3":
      return {
        introduction:
          "Sustainable architecture is revolutionizing the luxury real estate landscape. Today's discerning buyers seek properties that combine environmental responsibility with uncompromising elegance and comfort.",

        mainContent: [
          {
            id: "green-building-materials",
            heading: "Innovative Green Building Materials",
            content:
              "We utilize cutting-edge sustainable materials including recycled steel, bamboo flooring, and low-VOC paints that maintain air quality while providing durability and aesthetic appeal. These materials are sourced responsibly and contribute to LEED certification standards.",
          },
          {
            id: "renewable-energy",
            heading: "Renewable Energy Integration",
            content:
              "Solar panels, geothermal heating systems, and wind power solutions are seamlessly integrated into our architectural designs. These systems significantly reduce carbon footprint while providing long-term energy cost savings for homeowners.",
          },
          {
            id: "water-conservation",
            heading: "Water Conservation Systems",
            content:
              "Advanced water management includes rainwater harvesting, greywater recycling, and drought-resistant landscaping. These systems reduce water consumption by up to 40% while maintaining lush, beautiful outdoor spaces.",
          },
        ],

        conclusion:
          "Sustainable luxury is not a compromise—it's an enhancement. Our eco-friendly developments prove that environmental responsibility and luxury living can coexist beautifully, creating homes that are both prestigious and planet-friendly.",
      };

    default:
      return {
        introduction:
          "This comprehensive guide explores the latest trends and innovations in luxury real estate, providing insights into what defines premium living in today's market.",

        mainContent: [
          {
            id: "market-dynamics",
            heading: "Market Dynamics and Trends",
            content:
              "The luxury real estate market continues to evolve with changing consumer preferences and economic conditions. Understanding these dynamics is crucial for both investors and homebuyers seeking premium properties.",
          },
          {
            id: "design-excellence",
            heading: "Design and Architecture Excellence",
            content:
              "Contemporary luxury properties showcase innovative architectural designs that blend functionality with aesthetic appeal. From minimalist modern styles to classical elegance, each development tells a unique story.",
          },
          {
            id: "investment-opportunities",
            heading: "Investment Opportunities",
            content:
              "Luxury real estate remains a stable investment option with strong potential for appreciation. Strategic location selection and premium amenities contribute to long-term value growth.",
          },
        ],

        conclusion:
          "The luxury real estate sector continues to thrive, driven by innovation, quality, and attention to detail. Altaf Development remains committed to creating exceptional properties that exceed expectations.",
      };
  }
};