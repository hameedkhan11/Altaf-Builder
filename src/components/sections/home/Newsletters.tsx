"use client";
import { useState, FormEvent } from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const socialIcons = [Facebook, Instagram, Twitter, Linkedin];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 w-full">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center w-full">
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 dark:text-white">
              Stay Updated with ALTAF BUILDER
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
              Subscribe to our newsletter to receive the latest updates on our
              new projects, exclusive offers, and market insights.
            </p>

            <div className="mb-6 sm:mb-8 w-full">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-center">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B2131] focus:border-transparent text-sm sm:text-base placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
                <Button
                  size="lg"
                  type="submit"
                  onClick={handleNewsletterSubmit}
                  variant="outline"
                  className="py-4 text-white  font-medium hover:bg-transparent  border-[#B91C1C] bg-[#B91C1C] cursor-pointer  dark:hover:text-white dark:bg-[#B91C1C] dark:hover:bg-transparent dark:border-[#B91C1C] dark:text-white"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6">
              {socialIcons.map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-[#8B2131] dark:hover:text-[#8B2131] transition-colors duration-300"
                  aria-label={`Social media link ${index + 1}`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#B91C1C]" />
                </a>
              ))}
            </div>
          </div>

          <div className="w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] relative rounded-lg overflow-hidden shadow-xl">
            <Image
              width={800}
              height={600}
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center"
              alt="ALTAF BUILDER Consultation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
