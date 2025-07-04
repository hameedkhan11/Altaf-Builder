"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  MapPin,
  DollarSign,
  Key,
  Shield,
  Users,
  Clock,
  Star,
  Sparkles,
  Phone,
} from "lucide-react";

const LuxuryRealEstateFAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />,
      question: "What exclusive neighborhoods do you specialize in?",
      answer:
        "We specialize in the most prestigious neighborhoods including Beverly Hills, Manhattan's Upper East Side, Malibu beachfront, Aspen ski-in/ski-out properties, and exclusive gated communities in Miami Beach. Our portfolio features only the finest addresses with proven investment potential and unparalleled luxury amenities.",
    },
    {
      id: 2,
      icon: <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />,
      question: "What is your minimum property price range?",
      answer:
        "Our luxury portfolio begins at $2.5 million and extends to ultra-premium estates exceeding $100 million. We focus exclusively on high-end properties that meet our rigorous standards for location, architecture, amenities, and investment potential. Each property undergoes comprehensive evaluation to ensure it meets our luxury criteria.",
    },
    {
      id: 3,
      icon: <Key className="w-4 h-4 sm:w-5 sm:h-5" />,
      question: "Do you offer private showings and concierge services?",
      answer:
        "Absolutely. We provide exclusive private showings by appointment, often outside traditional hours for maximum privacy. Our white-glove concierge services include helicopter tours, private jet coordination, luxury transportation, and access to off-market properties. Your privacy and convenience are our top priorities.",
    },
    {
      id: 4,
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
      question: "How do you ensure transaction confidentiality?",
      answer:
        "We maintain the highest levels of discretion through confidentiality agreements, private showings, and secure transaction processes. Our team includes former investment bankers and legal professionals who understand the importance of privacy in high-net-worth transactions. All client information is protected with bank-level security protocols.",
    },
    {
      id: 5,
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      question: "What makes your team different from other luxury agents?",
      answer:
        "Our team consists of former investment bankers, luxury brand executives, and international real estate specialists with decades of combined experience. We speak multiple languages, understand global markets, and have exclusive relationships with architects, designers, and luxury service providers worldwide.",
    },
    {
      id: 6,
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      question: "How long does a typical luxury transaction take?",
      answer:
        "Luxury transactions typically take 45-90 days from accepted offer to closing, though this varies based on property complexity, international buyers, and custom requirements. We expedite the process through our network of luxury-focused attorneys, inspectors, and financial institutions while ensuring every detail meets our exacting standards.",
    },
    {
      id: 7,
      icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />,
      question: "Do you work with international buyers?",
      answer:
        "Yes, we specialize in international luxury transactions and work with buyers from over 40 countries. Our team includes multilingual specialists who understand international banking, tax implications, and legal requirements. We coordinate with global financial institutions and provide cultural concierge services for international clients.",
    },
    {
      id: 8,
      icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />,
      question: "What additional services do you provide?",
      answer:
        "Beyond traditional real estate services, we offer interior design consultation, property management, investment analysis, estate planning coordination, and access to exclusive lifestyle amenities. Our network includes private chefs, art consultants, security specialists, and luxury lifestyle managers to ensure a seamless luxury living experience.",
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-3 sm:px-4 md:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-3 sm:mb-4 md:mb-6 tracking-tight px-2 sm:px-0">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto leading-relaxed font-light px-2 sm:px-4 md:px-0 font-optima">
            Your guide to luxury real estate excellence. Discover answers to the
            most common questions about our premium property services.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-0 border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-sm">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className={`group ${index !== faqData.length - 1 ? 'border-b border-neutral-200' : ''}`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-3 sm:p-4 md:p-6 text-left hover:bg-neutral-50 transition-colors duration-200 focus:outline-none border-b border-black"
              >
                <div className="flex items-start sm:items-center justify-between w-full">
                  <div className="flex items-start sm:items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5 flex-1 min-w-0">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-neutral-100 text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300 flex-shrink-0 mt-1 sm:mt-0">
                      {item.icon}
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-neutral-900 text-left leading-snug pr-2 sm:pr-4 flex-1 min-w-0">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 transition-transform duration-300 flex-shrink-0 ml-2 sm:ml-3 md:ml-4 mt-1 sm:mt-0 ${
                      openItem === item.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Answer Section */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItem === item.id
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
                  <div className="ml-10 sm:ml-13 md:ml-16 lg:ml-17">
                    <div className="w-full h-px bg-neutral-200 mb-3 sm:mb-4 md:mb-6" />
                    <p className="leading-relaxed text-sm sm:text-base md:text-lg font-light font-optima">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 text-center">
          <div className="border border-neutral-200 rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-sm bg-[rgb(140,46,71)]">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light mb-2 sm:mb-3 md:mb-4 text-white px-2 sm:px-0">
              Still have questions?
            </h3>
            <p className="mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white leading-relaxed px-2 sm:px-4 md:px-0">
              Our luxury real estate specialists are available 24/7 to provide
              personalized consultation and answer any specific questions about
              your property needs.
            </p>
            <button className="inline-flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-4 bg-neutral-900 cursor-pointer text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors duration-300 shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryRealEstateFAQ;