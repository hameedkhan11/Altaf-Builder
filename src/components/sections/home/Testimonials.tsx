"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data/testimonials";
import {
  fadeInUp,
  cardHover,
  batchStaggerContainer,
  batchStaggerItem,
  viewportOnce,
  delays,
  shouldAnimate,
  getPerformanceMode,
  createLazyAnimation,
  animationMetrics,
  quickFade,
} from "@/lib/constants";

const Testimonials = () => {
  const performanceMode = getPerformanceMode();
  const canAnimate = shouldAnimate();

  // Performance-optimized header animation
  const headerAnimation = createLazyAnimation(fadeInUp);
  
  // Optimized title animation with performance awareness
  const titleAnimation = canAnimate ? {
    initial: { opacity: 0, y: -30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: { 
      duration: performanceMode === "fast" ? 0.4 : 0.6, 
      delay: delays.short 
    }
  } : quickFade;

  // Optimized subtitle animation
  const subtitleAnimation = canAnimate ? {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: viewportOnce,
    transition: { 
      duration: performanceMode === "fast" ? 0.4 : 0.6, 
      delay: delays.medium 
    }
  } : quickFade;

  // Track animation performance
  React.useEffect(() => {
    animationMetrics.track('testimonials-section', !canAnimate);
  }, [canAnimate]);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" />

      <div className="mx-auto relative z-10">
        {/* Header Section - Performance Optimized */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          {...headerAnimation}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 dark:text-white leading-tight"
            {...titleAnimation}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base md:text-lg max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-0 font-optima"
            {...subtitleAnimation}
          >
            Hear from our satisfied clients about their experience with ALTAF
            DEVELOPMENT.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid - Batch Stagger Optimization */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          {...batchStaggerContainer}
        >
          {testimonials.map((testimonial, index) => {
            // Performance-aware card animations
            const cardAnimation = canAnimate ? {
              ...batchStaggerItem,
              ...cardHover,
            } : {
              initial: { opacity: 1, y: 0 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0 }
            };

            // Optimized profile section animation
            const profileAnimation = canAnimate ? {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: viewportOnce,
              transition: {
                duration: performanceMode === "fast" ? 0.3 : 0.5,
                delay: delays.stagger(index) + (performanceMode === "fast" ? 0.1 : 0.2),
              }
            } : quickFade;

            // Optimized content animation
            const contentAnimation = canAnimate ? {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: viewportOnce,
              transition: {
                duration: performanceMode === "fast" ? 0.3 : 0.5,
                delay: delays.stagger(index) + (performanceMode === "fast" ? 0.2 : 0.4),
              }
            } : quickFade;

            // Optimized stars animation
            const starsAnimation = canAnimate ? {
              initial: { opacity: 0, scale: 0.8 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: viewportOnce,
              transition: {
                duration: performanceMode === "fast" ? 0.2 : 0.3,
                delay: delays.stagger(index) + (performanceMode === "fast" ? 0.3 : 0.6),
              }
            } : quickFade;

            return (
              <motion.div
                key={testimonial.id}
                {...cardAnimation}
                className="h-full"
              >
                <Card className="p-4 sm:p-6 md:p-8 h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <motion.div
                      className="flex items-center mb-4 sm:mb-6"
                      {...profileAnimation}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[rgb(140,46,71)] rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="dark:text-white text-sm md:text-base lg:text-xl font-medium truncate">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs sm:text-sm dark:text-white  opacity-80 truncate font-optima">
                          {testimonial.role}
                        </p>
                      </div>
                    </motion.div>

                    <motion.p
                      className="mb-3 sm:mb-4 dark:text-white text-sm sm:text-base leading-relaxed font-optima"
                      {...contentAnimation}
                    >
                      {testimonial.content}
                    </motion.p>

                    <motion.div
                      className="flex text-[rgb(140,46,71)]"
                      {...starsAnimation}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${
                            i < testimonial.rating ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;