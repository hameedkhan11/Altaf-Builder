// components/sections/home/WhyChooseUs.tsx

"use client";

import { motion } from "framer-motion";
import { features } from "@/data/features";
import { 
  // fadeInLeft, 
  // fadeInRight, 
  // batchStaggerContainer,
  // batchStaggerItem,
  viewportOnce,
  delays,
  shouldAnimate,
  getPerformanceMode,
  // createLazyAnimation,
  animationMetrics,
  quickFade,
  easingPresets
} from "@/lib/constants";
import { useEffect } from "react";
import { CldImage } from "next-cloudinary";

const WhyChoose = () => {
  const performanceMode = getPerformanceMode();
  const canAnimate = shouldAnimate();

  // Performance-optimized animations
  const titleAnimation = canAnimate ? {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: { 
      duration: performanceMode === "fast" ? 0.8 : 1.0,
      ease: easingPresets.smooth
    }
  } : quickFade;

  const subtitleAnimation = canAnimate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: { 
      duration: performanceMode === "fast" ? 0.6 : 0.8,
      delay: 0.3,
      ease: easingPresets.smooth
    }
  } : quickFade;

  const cardsAnimation = canAnimate ? {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: { 
      duration: performanceMode === "fast" ? 0.8 : 1.0,
      delay: 0.5,
      ease: easingPresets.smooth
    }
  } : quickFade;

  // Track animation performance
  useEffect(() => {
    animationMetrics.track('whychoose-section', !canAnimate);
  }, [canAnimate]);

  return (
    <div className="relative">
      {/* Background Image Section */}
      <div className="relative h-[100vh] sm:h-[110vh] overflow-hidden">
        <CldImage
          src="imgi_28_hFGYVnlwaecZbMBXIolx5d7ExQ_uo5x2i"
          alt="ALTAF BUILDER Office"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 mb-20 sm:mb-32 lg:mb-36">
          {/* Header Section */}
          <motion.div
            {...titleAnimation}
            className="mb-6 sm:mb-8 max-w-5xl"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-wide leading-tight">
              Why Choose
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-wide leading-tight ml-8 sm:ml-16 md:ml-24 lg:ml-32 xl:ml-44">
              ALTAF DEVELOPMENT
            </h2>
          </motion.div>
          
          <motion.p
            {...subtitleAnimation}
            className="text-sm sm:text-base text-white/90 max-w-2xl lg:max-w-3xl leading-relaxed font-optima ml-8 sm:ml-16 md:ml-32 lg:ml-48 xl:ml-96"
          >
            With over 25 years of experience in luxury real estate development, 
            we have established ourselves as a leader in creating exceptional living spaces 
            that combine innovative design, premium materials, and unparalleled craftsmanship.
          </motion.p>
        </div>
      </div>

      {/* White Section - Cards will overlap this */}
      <div className="relative bg-white pt-16 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-48 pb-16 sm:pb-24 md:pb-32">
        {/* Cards Container - Positioned to overlap 10% on image, 90% after */}
        <motion.div
          {...cardsAnimation}
          className="absolute -top-8 sm:-top-12 md:-top-16 lg:-top-20 xl:-top-24 left-0 right-0 px-4 sm:px-6 md:px-12 lg:px-16 z-10"
        >
          <div className="max-w-8xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-4 xl:gap-2 justify-items-center">
              {features.map((item, index) => {
                const Icon = item.icon;
                
                // Performance-optimized feature item animation
                const featureAnimation = canAnimate ? {
                  initial: { opacity: 0, y: 20, scale: 0.95 },
                  whileInView: { opacity: 1, y: 0, scale: 1 },
                  viewport: viewportOnce,
                  transition: { 
                    duration: performanceMode === "fast" ? 0.5 : 0.7,
                    delay: delays.stagger(index) * 0.1,
                    ease: easingPresets.smooth
                  }
                } : {
                  initial: { opacity: 1, y: 0, scale: 1 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  transition: { duration: 0 }
                };

                // Optimized hover animations
                const itemHoverAnimation = canAnimate ? {
                  whileHover: { 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: performanceMode === "fast" ? 0.3 : 0.4 }
                  }
                } : {};

                const iconHoverAnimation = canAnimate ? {
                  whileHover: { 
                    scale: 1.15,
                    transition: { duration: performanceMode === "fast" ? 0.3 : 0.4 }
                  }
                } : {};

                return (
                  <motion.div
                    key={index}
                    {...featureAnimation}
                    {...itemHoverAnimation}
                    viewport={viewportOnce}
                    className="bg-[rgb(140,46,71)] shadow-xl p-6 sm:p-8 lg:p-10 w-full max-w-[330px] sm:max-w-[350px] lg:max-w-[400px] h-80 sm:h-88 lg:h-96 border border-gray-100 hover:shadow-3xl transition-all duration-500 overflow-hidden"
                  >
                    {/* Icon */}
                    <motion.div 
                      className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br bg-[rgb(80,18,35)] rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 mx-auto shadow-xl"
                      {...iconHoverAnimation}
                    >
                      <Icon className="h-8 w-8 sm:h-9 sm:w-9 text-white" />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl mb-4 sm:mb-5 text-white leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-optima text-white leading-relaxed font-light text-base sm:text-lg">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Animated Background Elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-[#8B2131]/5 to-[#B91C1C]/5 rounded-full blur-2xl sm:blur-3xl pointer-events-none"
        animate={canAnimate && performanceMode !== "slow" ? {
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        } : {
          scale: 1,
          opacity: 0.3
        }}
        transition={{
          duration: performanceMode === "fast" ? 4 : 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-xl sm:blur-2xl pointer-events-none"
        animate={canAnimate && performanceMode !== "slow" ? {
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        } : {
          scale: 1,
          opacity: 0.2
        }}
        transition={{
          duration: performanceMode === "fast" ? 5 : 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

export default WhyChoose;