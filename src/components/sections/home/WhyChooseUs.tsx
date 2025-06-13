// components/sections/home/WhyChooseUs.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

const WhyChoose = () => {
  const performanceMode = getPerformanceMode();
  const canAnimate = shouldAnimate();

  // Performance-optimized animations
  const leftAnimation = createLazyAnimation({
    ...fadeInLeft,
    transition: { 
      duration: performanceMode === "fast" ? 0.6 : 0.8 
    }
  });

  const rightAnimation = createLazyAnimation({
    ...fadeInRight,
    transition: { 
      duration: performanceMode === "fast" ? 0.6 : 0.8, 
      delay: delays.short 
    }
  });

  // Optimized title animation
  const titleAnimation = canAnimate ? {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: { 
      duration: performanceMode === "fast" ? 0.4 : 0.6 
    }
  } : quickFade;

  // Optimized underline animation
  const underlineAnimation = canAnimate ? {
    initial: { scaleX: 0 },
    whileInView: { scaleX: 1 },
    viewport: viewportOnce,
    transition: { 
      duration: performanceMode === "fast" ? 0.6 : 0.8, 
      delay: performanceMode === "fast" ? 0.1 : 0.2, 
      ease: easingPresets.smooth 
    },
    style: { transformOrigin: "left" }
  } : {
    initial: { scaleX: 1 },
    animate: { scaleX: 1 },
    transition: { duration: 0 }
  };

  // Optimized description animation
  const descriptionAnimation = canAnimate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: { 
      duration: performanceMode === "fast" ? 0.4 : 0.6, 
      delay: delays.short 
    }
  } : quickFade;

  // Optimized image hover animation
  const imageHoverAnimation = canAnimate ? {
    whileHover: { 
      scale: 1.02,
      transition: { duration: performanceMode === "fast" ? 0.3 : 0.4 }
    }
  } : {};

  // Optimized decorative animations - disable on slow devices
  const decorativeAnimation1 = canAnimate && performanceMode !== "slow" ? {
    animate: { 
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.3, 0.2]
    },
    transition: { 
      duration: performanceMode === "fast" ? 2 : 3,
      repeat: Infinity,
      ease: easingPresets.smooth
    }
  } : {
    animate: { scale: 1, opacity: 0.2 },
    transition: { duration: 0 }
  };

  const decorativeAnimation2 = canAnimate && performanceMode !== "slow" ? {
    animate: { 
      scale: [1, 1.1, 1],
      opacity: [0.15, 0.25, 0.15]
    },
    transition: { 
      duration: performanceMode === "fast" ? 3 : 4,
      repeat: Infinity,
      ease: easingPresets.smooth,
      delay: 1
    }
  } : {
    animate: { scale: 1, opacity: 0.15 },
    transition: { duration: 0 }
  };

  // Track animation performance
  useEffect(() => {
    animationMetrics.track('whychoose-section', !canAnimate);
  }, [canAnimate]);

  return (
    <section className="py-24 px-16">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            {...leftAnimation}
            viewport={viewportOnce}
          >
            <motion.div
              {...titleAnimation}
            >
              <h2 className="text-3xl md:text-4xl dark:text-white mb-0">
                Why Choose ALTAF DEVELOPMENT
              </h2>
              <motion.div 
                className="w-[95%] h-0.5 bg-[rgb(140,46,71)] rounded-full mb-6"
                {...underlineAnimation}
              />
            </motion.div>
            
            <motion.p 
              className=" mb-8 text-lg font-medium leading-relaxed"
              {...descriptionAnimation}
            >
              With over 25 years of experience in luxury real estate
              development, we have established ourselves as a leader in creating
              exceptional living spaces that combine innovative design, premium
              materials, and unparalleled craftsmanship.
            </motion.p>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              {...(canAnimate ? batchStaggerContainer : {
                initial: { opacity: 1 },
                animate: { opacity: 1 },
                transition: { duration: 0 }
              })}
              viewport={viewportOnce}
            >
              {features.map((item, index) => {
                const Icon = item.icon;
                
                // Performance-optimized feature item animation
                const featureAnimation = canAnimate ? {
                  ...batchStaggerItem,
                  transition: { 
                    duration: performanceMode === "fast" ? 0.4 : 0.6,
                    delay: delays.stagger(index) + delays.medium,
                    ease: easingPresets.smooth
                  }
                } : {
                  initial: { opacity: 1, y: 0 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0 }
                };

                // Optimized hover animations
                const itemHoverAnimation = canAnimate ? {
                  whileHover: { 
                    y: -5, 
                    scale: 1.02,
                    transition: { duration: performanceMode === "fast" ? 0.2 : 0.3 }
                  }
                } : {};

                const iconHoverAnimation = canAnimate ? {
                  whileHover: { 
                    rotate: 5,
                    scale: 1.1,
                    transition: { duration: performanceMode === "fast" ? 0.2 : 0.3 }
                  }
                } : {};

                return (
                  <motion.div
                    key={index}
                    {...featureAnimation}
                    {...itemHoverAnimation}
                    viewport={viewportOnce}
                    className="flex items-start p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-300"
                  >
                    <motion.div 
                      className="w-12 h-12 bg-[rgb(140,46,71)] rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                      {...iconHoverAnimation}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 dark:text-white">
                        {item.title}
                      </h3>
                      <p className=" leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            {...rightAnimation}
            {...imageHoverAnimation}
            viewport={viewportOnce}
            className="relative h-[500px] rounded-lg overflow-hidden shadow-xl group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            />
            <Image
              src="/images/avi-waxman-f9qZuKoZYoY-unsplash.jpg"
              alt="ALTAF BUILDER Office"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              width={800}
              height={600}
            />
            
            {/* Decorative elements - Performance optimized */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#8B2131] to-[#B91C1C] rounded-full opacity-20 blur-xl"
              {...decorativeAnimation1}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full opacity-15 blur-2xl"
              {...decorativeAnimation2}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;