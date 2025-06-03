"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useScrollEffects } from "@/hooks/useScroll";
import { COMPANY_INFO, scaleOnHover } from "@/lib/constants";
import { Home } from "lucide-react";

const HeroSection = () => {
  const { heroY } = useScrollEffects();

  const handleScrollDown = () => {
    const nextSection =
      document.querySelector("section:nth-of-type(2)") ||
      document.querySelector('[data-section="about"]') ||
      document.querySelector(".next-section");

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Fallback: scroll down by viewport height
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden z-0">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/ravi-patel-qsMGnaxDGuw-unsplash.jpg')",
          y: heroY,
        }}
      />
      <video
        src="/videos/video.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

      <div className="container mx-auto px-6 h-full flex items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight font-chronicle"
          >
            {COMPANY_INFO.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl mb-8 max-w-lg"
          >
            {COMPANY_INFO.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <motion.button
              className="bg-[#8B2131] text-white cursor-pointer hover:bg-transparent px-4  rounded-md font-semibold  hover:border-2 hover:border-[#8B2131] hover:text-white transition-colors"
              {...scaleOnHover}
            >
              <Home size={20} className="inline-block mr-2" />
              Explore Properties
            </motion.button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black dark:bg-white  hover:bg-transparent hover:text-white cursor-pointer"
            >
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white z-20 cursor-pointer"
        onClick={handleScrollDown}
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
