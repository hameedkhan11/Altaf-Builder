// faqData.ts
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What exclusive neighborhoods do you specialize in?",
    answer:
      "We specialize in the most prestigious neighborhoods including Beverly Hills, Manhattan's Upper East Side, Malibu beachfront, Aspen ski-in/ski-out properties, and exclusive gated communities in Miami Beach. Our portfolio features only the finest addresses with proven investment potential and unparalleled luxury amenities.",
  },
  {
    id: 2,
    question: "What is your minimum property price range?",
    answer:
      "Our luxury portfolio begins at $2.5 million and extends to ultra-premium estates exceeding $100 million. We focus exclusively on high-end properties that meet our rigorous standards for location, architecture, amenities, and investment potential. Each property undergoes comprehensive evaluation to ensure it meets our luxury criteria.",
  },
  {
    id: 3,
    question: "Do you offer private showings and concierge services?",
    answer:
      "Absolutely. We provide exclusive private showings by appointment, often outside traditional hours for maximum privacy. Our white-glove concierge services include helicopter tours, private jet coordination, luxury transportation, and access to off-market properties. Your privacy and convenience are our top priorities.",
  },
  {
    id: 4,
    question: "How do you ensure transaction confidentiality?",
    answer:
      "We maintain the highest levels of discretion through confidentiality agreements, private showings, and secure transaction processes. Our team includes former investment bankers and legal professionals who understand the importance of privacy in high-net-worth transactions. All client information is protected with bank-level security protocols.",
  },
];