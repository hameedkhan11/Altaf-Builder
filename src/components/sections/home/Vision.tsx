// components/CEOMessage.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  microSlide,
  viewportOnce,
  viewportDefault,
  delays,
  // shouldAnimate,
  // getPerformanceMode,
  getPerformanceVariant,
  createLazyAnimation,
  staggerContainer,
} from "@/lib/constants";
import { visionData } from "@/data/vision";
import { CldImage } from "next-cloudinary";

const CEOMessage = () => {
  const { ceoName, ceoTitle} = visionData;
  // Performance-aware animations
  const titleAnimation = getPerformanceVariant(fadeInUp);
  const contentAnimation = getPerformanceVariant(fadeInLeft);
  const imageAnimation = getPerformanceVariant(fadeInRight);
  const signatureAnimation = getPerformanceVariant(microSlide);
  const statsAnimation = getPerformanceVariant(microSlide);
  const lazyStatsContainer = createLazyAnimation(staggerContainer);

  // Custom underline animation with performance awareness
  // const underlineAnimation = shouldAnimate()
  //   ? {
  //       initial: { scaleX: 0 },
  //       animate: { scaleX: 1 },
  //       transition: {
  //         duration:
  //           getPerformanceMode() === "fast"
  //             ? 0.6
  //             : getPerformanceMode() === "slow"
  //             ? 1.0
  //             : 0.8,
  //         delay: delays.medium,
  //         ease: "easeOut",
  //       },
  //     }
  //   : {
  //       initial: { scaleX: 1 },
  //       animate: { scaleX: 1 },
  //       transition: { duration: 0 },
  //     };

  // Using content from visionData
  const shortContent = [
    "Our vision at Altaf Developments lies in creating communities that not only reflect architectural brilliance, but also resonate with the dreams and aspirations of modern living.",
    "With unwavering commitment to innovation, sustainability, and quality, we're dedicated to shaping environments that inspire and elevate every aspect of modern luxury living."
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-8xl mx-auto">
        <motion.h1 className="text-3xl sm:text-4xl md:text-5xl text-center pb-12 sm:pb-16 md:pb-20 lg:pb-24">
            THE NEW ERA OF LUXURY
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Content Section */}
          <motion.div
            className="space-y-4 sm:space-y-5 md:space-y-6 flex flex-col justify-center h-full"
            {...contentAnimation}
            viewport={viewportDefault}
          >
            {/* Title */}
            <motion.div {...titleAnimation} viewport={viewportOnce} className="text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-0">OUR MISSION</h2>
            </motion.div>

            {/* Content Paragraphs */}
            <div className="space-y-3 sm:space-y-4 text-left">
              {shortContent.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="leading-relaxed font-optima max-w-xl text-sm sm:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: delays.stagger(index) + delays.long,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  viewport={viewportOnce}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* CEO Signature */}
            <motion.div
              className="pt-4 sm:pt-5 md:pt-6 space-y-1 text-center lg:text-left"
              {...signatureAnimation}
              transition={{
                ...signatureAnimation.transition,
                delay: delays.long * 2,
              }}
              viewport={viewportOnce}
            >
              <h3 className="text-base sm:text-lg font-bold text-[#8B2131]">{ceoName}</h3>
              <p className="text-xs sm:text-sm">{ceoTitle}</p>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="relative order-first lg:order-last"
            {...imageAnimation}
            viewport={viewportDefault}
          >
            <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px] w-full overflow-hidden shadow-2xl">
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <CldImage
                  src={"imgi_81_x1jKKGBbcFDotH9VW4wXmw2gA_jtti68"}
                  alt={`${ceoName} - ${ceoTitle}`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        </div>
        {/* Statistics Section - Optimized stagger container */}
        <motion.div
          className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full"
          {...lazyStatsContainer}
          viewport={viewportDefault}
        >
          {[
            { label: "Properties Sold", value: "500+" },
            { label: "Happy Clients", value: "1000+" },
            { label: "Years Experience", value: "15+" },
            { label: "Awards Won", value: "25+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              {...statsAnimation}
              transition={{
                ...statsAnimation.transition,
                delay: delays.stagger(index) + delays.long,
              }}
              viewport={viewportOnce}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B2131] dark:text-red-400 mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-[#8B2131] dark:text-gray-300 font-bold text-xs sm:text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CEOMessage;