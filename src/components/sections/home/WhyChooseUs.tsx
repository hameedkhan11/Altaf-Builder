// components/sections/home/WhyChooseUs.tsx

"use client";

import { motion } from "framer-motion";
import { features } from "@/data/features";
import { 
  fadeInLeft, 
  fadeInRight, 
  batchStaggerContainer,
  batchStaggerItem,
  viewportOnce,
  delays,
  shouldAnimate,
  getPerformanceMode,
  createLazyAnimation,
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
      <div className="relative h-[120vh] overflow-hidden">
        <CldImage
          src="imgi_28_hFGYVnlwaecZbMBXIolx5d7ExQ_uo5x2i"
          alt="ALTAF BUILDER Office"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-6 md:px-16 lg:px-24 mb-40">
          {/* Header Section */}
          <motion.div
            {...titleAnimation}
            className="mb-8 max-w-4xl"
          >
            <h2 className="text-4xl md:text-6xl lg:text-6xl text-white tracking-wide leading-tight">
              Why Choose
            </h2>
            <h2 className="text-4xl md:text-6xl lg:text-6xl text-white tracking-wide leading-tight ml-44">
              ALTAF DEVELOPMENT
            </h2>
          </motion.div>
          
          <motion.p
            {...subtitleAnimation}
            className="text-base text-white/90 max-w-3xl leading-relaxed font-optima ml-96"
          >
            With over 25 years of experience in luxury real estate development, 
            we have established ourselves as a leader in creating exceptional living spaces 
            that combine innovative design, premium materials, and unparalleled craftsmanship.
          </motion.p>
        </div>
      </div>

      {/* White Section - Cards will overlap this */}
      <div className="relative bg-white pt-48 pb-32">
        {/* Cards Container - Positioned to overlap 50/50 */}
        <motion.div
          {...cardsAnimation}
          className="absolute -top-48 left-0 right-0 px-6 md:px-16 z-10"
        >
          <div className="max-w-8xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
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
                    className="bg-gray-300  shadow-xl p-10 w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] min-w-[330px] max-w-[400px] h-96 border border-gray-100 hover:shadow-3xl transition-all duration-500"
                  >
                    {/* Icon */}
                    <motion.div 
                      className="w-18 h-18 bg-gradient-to-br from-[#8B2131] to-[#B91C1C] rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-xl"
                      {...iconHoverAnimation}
                    >
                      <Icon className="h-9 w-9 text-white" />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-2xl mb-5 text-gray-800 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-light text-lg">
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
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-[#8B2131]/5 to-[#B91C1C]/5 rounded-full blur-3xl pointer-events-none"
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
        className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-2xl pointer-events-none"
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