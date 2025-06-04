"use client";
import React from "react";
import { motion } from "framer-motion";
import { PropertyCard } from "@/components/common/PropertyCard";
import { properties } from "@/data/properties";
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  microSlide,
  scaleOnHover,
  staggerContainer,
  batchStagger,
  viewportOnce, 
  viewportDefault,
  delays,
  shouldAnimate,
  getPerformanceMode,
  createLazyAnimation,
  getPerformanceVariant
} from "@/lib/constants";

export const LatestProperties: React.FC = () => {
  // Performance-aware animations
  const headerAnimation = getPerformanceVariant(fadeInUp);
  const titleAnimation = getPerformanceVariant(fadeInLeft);
  const buttonAnimation = getPerformanceVariant(fadeInRight);
  // const gridAnimation = getPerformanceVariant(slideInFromBottom);
  const statsAnimation = getPerformanceVariant(microSlide);

  // Create lazy-loaded animations for better performance
  const lazyStatsContainer = createLazyAnimation(staggerContainer);
  const lazyBatchStagger = batchStagger;

  // Custom underline animation with performance awareness
  const underlineAnimation = shouldAnimate() ? {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: {
      duration: getPerformanceMode() === 'fast' ? 0.6 : getPerformanceMode() === 'slow' ? 1.0 : 0.8,
      delay: delays.medium,
      ease: "easeOut",
    }
  } : {
    initial: { scaleX: 1 },
    animate: { scaleX: 1 },
    transition: { duration: 0 }
  };

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Performance optimized */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6"
          {...headerAnimation}
          viewport={viewportDefault}
        >
          <motion.div
            {...titleAnimation}
            viewport={viewportOnce}
          >
            <h2 className="text-3xl sm:text-4xl dark:text-white mb-2">
              LATEST PROPERTIES
            </h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full"
              {...underlineAnimation}
              viewport={viewportOnce}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          <motion.button
            className="px-8 py-3 bg-[#B91C1C] text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-transparent hover:border-2 hover:text-black dark:text-white hover:border-[#8B2131] font-medium cursor-pointer"
            {...buttonAnimation}
            {...scaleOnHover}
            viewport={viewportOnce}
          >
            SEE ALL PROPERTIES
          </motion.button>
        </motion.div>

        {/* Properties Grid - Batch staggered for performance */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          {...lazyBatchStagger.container}
          viewport={viewportDefault}
        >
          {properties.slice(0, 6).map((property, index) => (
            <motion.div
              key={property.id}
              {...lazyBatchStagger.item}
              transition={{
                ...lazyBatchStagger.item.transition,
                delay: delays.stagger(index)
              }}
            >
              <PropertyCard property={property} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics Section - Optimized stagger container */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
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
                delay: delays.stagger(index) + delays.long
              }}
              viewport={viewportOnce}
            >
              <div className="text-3xl font-bold text-[#8B2131] dark:text-red-400 mb-2">
                {stat.value}
              </div>
              <div className="text-[#8B2131] dark:text-gray-300 text-sm font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};