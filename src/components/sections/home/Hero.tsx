"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useScrollEffects } from "@/hooks/useScroll";
import { COMPANY_INFO } from "@/lib/constants";
import { Home } from "lucide-react";

// Import optimized animations
import { 
  scaleOnHover,
  shouldAnimate,
  staggerContainer,
  delays,
  fadeInUp,
  fadeInLeft,
  quickFade,
  deferredAnimation,
  createLazyAnimation,
  getPerformanceVariant
} from "@/lib/constants";

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

  // Optimized animation variants using the performance system
  const heroTitleVariant = getPerformanceVariant(fadeInUp);
  
  const heroDescriptionVariant = getPerformanceVariant({
    ...fadeInLeft,
    transition: {
      ...fadeInLeft.transition,
      delay: shouldAnimate() ? delays.medium : 0
    }
  });

  const ctaButtonsVariant = getPerformanceVariant({
    initial: shouldAnimate() ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: shouldAnimate() ? 0.25 : 0,
      delay: shouldAnimate() ? delays.long : 0,
      ease: "easeOut"
    }
  });

  const scrollIndicatorVariant = shouldAnimate() ? {
    animate: { y: [0, -10, 0] },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {
    animate: { y: 0 },
    transition: { duration: 0 }
  };

  return (
    <section className="relative h-screen overflow-hidden z-0">
      {/* Background Image - Critical content, minimal animation */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/ravi-patel-qsMGnaxDGuw-unsplash.jpg')",
          y: heroY,
        }}
        {...quickFade}
      />
      
      {/* Video - Load after critical content with lazy animation */}
      <motion.video
        src="/videos/video.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
        {...createLazyAnimation(quickFade)}
      />
      
      {/* Gradient overlay with quick fade */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"
        {...quickFade}
      />

      <div className="container mx-auto px-6 h-full flex items-center relative z-10">
        {/* Main content container with optimized stagger */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="w-full md:w-1/2 text-white"
        >
          {/* Hero Title - Critical content with optimized animation */}
          <motion.h1
            variants={deferredAnimation(heroTitleVariant)}
            initial="initial"
            animate="animate"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight font-chronicle"
          >
            {COMPANY_INFO.tagline}
          </motion.h1>

          {/* Hero Description with optimized fade in */}
          <motion.p
            variants={deferredAnimation(heroDescriptionVariant)}
            initial="initial"
            animate="animate"
            className="text-lg md:text-xl mb-8 max-w-lg"
          >
            {COMPANY_INFO.description}
          </motion.p>

          {/* CTA Buttons with staggered animation */}
          <motion.div
            variants={deferredAnimation(ctaButtonsVariant)}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <motion.button
              className="bg-[#B91C1C] text-white py-2 cursor-pointer hover:bg-transparent px-4 rounded-md font-semibold hover:border-2 hover:border-[#8B2131] hover:text-white transition-colors"
              {...scaleOnHover}
            >
              <Home size={20} className="inline-block mr-2" />
              Explore Properties
            </motion.button>
            
            <motion.div {...scaleOnHover}>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black dark:bg-white hover:bg-transparent hover:text-white cursor-pointer"
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with performance-aware pulse */}
      <motion.div
        variants={scrollIndicatorVariant}
        animate="animate"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white z-20 cursor-pointer"
        onClick={handleScrollDown}
        {...scaleOnHover}
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
};

export default HeroSection;