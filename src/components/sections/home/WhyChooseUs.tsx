// components/sections/home/WhyChooseUs.tsx

"use client";

import { motion } from "framer-motion";
// import { features } from "@/data/features";
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
  easingPresets,
  viewportDefault,
  getPerformanceVariant,
  createLazyAnimation,
  microSlide,
  staggerContainer,
} from "@/lib/constants";
import { useEffect } from "react";
import { CldImage } from "next-cloudinary";

const WhyChoose = () => {
  const performanceMode = getPerformanceMode();
  const canAnimate = shouldAnimate();
  const statsAnimation = getPerformanceVariant(microSlide);
  const lazyStatsContainer = createLazyAnimation(staggerContainer);

  // Performance-optimized animations
  const titleAnimation = canAnimate
    ? {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: viewportOnce,
        transition: {
          duration: performanceMode === "fast" ? 0.8 : 1.0,
          ease: easingPresets.smooth,
        },
      }
    : quickFade;

  // const subtitleAnimation = canAnimate
  //   ? {
  //       initial: { opacity: 0, y: 20 },
  //       whileInView: { opacity: 1, y: 0 },
  //       viewport: viewportOnce,
  //       transition: {
  //         duration: performanceMode === "fast" ? 0.6 : 0.8,
  //         delay: 0.3,
  //         ease: easingPresets.smooth,
  //       },
  //     }
  //   : quickFade;

  // const cardsAnimation = canAnimate
  //   ? {
  //       initial: { opacity: 0, y: 40 },
  //       whileInView: { opacity: 1, y: 0 },
  //       viewport: viewportOnce,
  //       transition: {
  //         duration: performanceMode === "fast" ? 0.8 : 1.0,
  //         delay: 0.5,
  //         ease: easingPresets.smooth,
  //       },
  //     }
  //   : quickFade;

  // Track animation performance
  useEffect(() => {
    animationMetrics.track("whychoose-section", !canAnimate);
  }, [canAnimate]);

  return (
    <div className="relative">
      {/* Background Image Section */}
      <div className="relative h-[90vh] overflow-hidden">
        <CldImage
          src="imgi_33_XHjb2nvN3Jd2DDPrmmf2kYt3IM_1_d6eb7c"
          alt="ALTAF Development Office"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-left px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 ">
          {/* Header Section */}
          <motion.div {...titleAnimation} className="mb-6 sm:mb-8 text-center">
            <motion.p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/70 mb-4">
              Why choose us?
            </motion.p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-wider leading-tight">
              Why Choose ALTAF DEVELOPMENT?
            </h2>
            {/* <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-wide leading-tight ml-8 sm:ml-16 md:ml-24 lg:ml-32 xl:ml-44">
              ALTAF DEVELOPMENT
            </h2> */}
            {/* Statistics Section - Optimized stagger container */}
            <motion.div
              className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full"
              {...lazyStatsContainer}
              viewport={viewportDefault}
            >
              {[
                { label: "Properties Sold", value: "500+" },
                { label: "Happy Clients", value: "1000+" },
                { label: "Years Experience", value: "15+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center mb-6"
                  {...statsAnimation}
                  transition={{
                    ...statsAnimation.transition,
                    delay: delays.stagger(index) + delays.long,
                  }}
                  viewport={viewportOnce}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl text-white mb-2 sm:mb-4">
                    {stat.value}
                  </div>
                  <div className="text-white text-xs sm:text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          {/*           
          <motion.p
            {...subtitleAnimation}
            className="text-sm sm:text-base text-white/90 max-w-2xl lg:max-w-3xl leading-relaxed font-optima ml-8 sm:ml-16 md:ml-32 lg:ml-48 xl:ml-96"
          >
            With over 25 years of experience in luxury real estate development, 
            we have established ourselves as a leader in creating exceptional living spaces 
            that combine innovative design, premium materials, and unparalleled craftsmanship.
          </motion.p> */}
        </div>
      </div>

      {/* Subtle Animated Background Elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-[#8B2131]/5 to-[#B91C1C]/5 rounded-full blur-2xl sm:blur-3xl pointer-events-none"
        animate={
          canAnimate && performanceMode !== "slow"
            ? {
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }
            : {
                scale: 1,
                opacity: 0.3,
              }
        }
        transition={{
          duration: performanceMode === "fast" ? 4 : 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-xl sm:blur-2xl pointer-events-none"
        animate={
          canAnimate && performanceMode !== "slow"
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }
            : {
                scale: 1,
                opacity: 0.2,
              }
        }
        transition={{
          duration: performanceMode === "fast" ? 5 : 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
};

export default WhyChoose;
