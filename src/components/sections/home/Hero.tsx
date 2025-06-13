"use client";
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

// Import optimized animations
import { 
  scaleOnHover,
  shouldAnimate,
  staggerContainer,
  fadeInUp,
  quickFade,
  deferredAnimation,
  createLazyAnimation,
  getPerformanceVariant
} from "@/lib/constants";

const HeroSection = () => {
  // const { heroY } = useScrollEffects();

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
  
  // const heroDescriptionVariant = getPerformanceVariant({
  //   ...fadeInLeft,
  //   transition: {
  //     ...fadeInLeft.transition,
  //     delay: shouldAnimate() ? delays.medium : 0
  //   }
  // });

  // const ctaButtonsVariant = getPerformanceVariant({
  //   initial: shouldAnimate() ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 },
  //   animate: { opacity: 1, y: 0 },
  //   transition: { 
  //     duration: shouldAnimate() ? 0.25 : 0,
  //     delay: shouldAnimate() ? delays.long : 0,
  //     ease: "easeOut"
  //   }
  // });

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
    <section className="h-screen overflow-hidden">
      {/* Video Background - Full opacity, positioned behind everything */}
      <motion.video
        src="/videos/video2.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
        {...createLazyAnimation(quickFade)}
      />

      <div className="container mx-auto w-full px-6 h-full flex items-center relative z-20">
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
            className="text-2xl md:text-3xl lg:text-6xl leading-tight text-white"
          >
            {COMPANY_INFO.tagline}
          </motion.h1>

          {/* Hero Description with optimized fade in */}
          {/* <motion.p
            variants={deferredAnimation(heroDescriptionVariant)}
            initial="initial"
            animate="animate"
            className="text-lg md:text-xl mb-8 max-w-lg"
          >
            {COMPANY_INFO.description}
          </motion.p>

          CTA Buttons with staggered animation
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
          </motion.div> */}
        </motion.div>
      </div>

      {/* Scroll indicator with higher z-index and proper clickable area */}
      <motion.div
        variants={scrollIndicatorVariant}
        animate="animate"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white z-30 cursor-pointer p-4 hover:bg-white/10 rounded-full transition-colors duration-300"
        onClick={handleScrollDown}
        {...scaleOnHover}
        role="button"
        aria-label="Scroll to next section"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleScrollDown();
          }
        }}
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
};

export default HeroSection;