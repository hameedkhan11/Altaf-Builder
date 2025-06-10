// components/CEOMessage.tsx
"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  microSlide,
  viewportOnce,
  viewportDefault,
  delays,
  shouldAnimate,
  getPerformanceMode,
  getPerformanceVariant,
  createLazyAnimation,
  staggerContainer,
} from "@/lib/constants";
import { visionData } from "@/data/vision";

const CEOMessage = () => {
  const { ceoImage, ceoName, ceoTitle, content, title } = visionData;
  // Performance-aware animations
  const titleAnimation = getPerformanceVariant(fadeInUp);
  const contentAnimation = getPerformanceVariant(fadeInLeft);
  const imageAnimation = getPerformanceVariant(fadeInRight);
  const signatureAnimation = getPerformanceVariant(microSlide);
  const statsAnimation = getPerformanceVariant(microSlide);
  const lazyStatsContainer = createLazyAnimation(staggerContainer);

  // Custom underline animation with performance awareness
  const underlineAnimation = shouldAnimate()
    ? {
        initial: { scaleX: 0 },
        animate: { scaleX: 1 },
        transition: {
          duration:
            getPerformanceMode() === "fast"
              ? 0.6
              : getPerformanceMode() === "slow"
              ? 1.0
              : 0.8,
          delay: delays.medium,
          ease: "easeOut",
        },
      }
    : {
        initial: { scaleX: 1 },
        animate: { scaleX: 1 },
        transition: { duration: 0 },
      };

  return (
    <section className="py-16 px-16">
      <div className="max-w-8xl mx-auto">
        <motion.h1 className=" text-8xl text-center pb-24">
            THE NEW ERA OF LUXURY
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Content Section */}
          <motion.div
            className="space-y-6"
            {...contentAnimation}
            viewport={viewportDefault}
          >
            {/* Title */}
            <motion.div {...titleAnimation} viewport={viewportOnce}>
              <h2 className="text-3xl md:text-4xl mb-2">{title}</h2>
              <motion.div
                className="w-full h-0.5 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full"
                {...underlineAnimation}
                viewport={viewportOnce}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>

            {/* Content Paragraphs */}
            <div className="space-y-4">
              {content.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-gray-700 leading-relaxed text-sm md:text-base"
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
              className="pt-6 space-y-1"
              {...signatureAnimation}
              transition={{
                ...signatureAnimation.transition,
                delay: delays.long * 2,
              }}
              viewport={viewportOnce}
            >
              <h3 className="text-lg font-bold text-[#8B2131]">{ceoName}</h3>
              <p className="text-gray-500 text-sm">{ceoTitle}</p>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="relative"
            {...imageAnimation}
            viewport={viewportDefault}
          >
            <div className="relative h-[500px] lg:h-[600px] w-full overflow-hidden  shadow-2xl">
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src={ceoImage}
                  alt={`${ceoName} - ${ceoTitle}`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full"
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
              <div className="text-5xl font-bold text-[#8B2131] dark:text-red-400 mb-2">
                {stat.value}
              </div>
              <div className="text-[#8B2131] dark:text-gray-300  font-bold">
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
