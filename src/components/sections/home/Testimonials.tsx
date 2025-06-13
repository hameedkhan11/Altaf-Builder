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
    <section className="py-24 px-16 relative">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" />

      <div className="mx-auto relative z-10">
        {/* Header Section - Performance Optimized */}
        <motion.div
          className="text-center mb-16"
          {...headerAnimation}
        >
          <motion.h2
            className="text-3xl md:text-4xl mb-4 dark:text-white"
            {...titleAnimation}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            className=" max-w-2xl mx-auto"
            {...subtitleAnimation}
          >
            Hear from our satisfied clients about their experience with ALTAF
            DEVELOPMENT.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid - Batch Stagger Optimization */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                <Card className="p-8 h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <motion.div
                      className="flex items-center mb-6"
                      {...profileAnimation}
                    >
                      <div className="w-12 h-12 bg-[rgb(140,46,71)] rounded-full flex items-center justify-center mr-4">
                        <Quote className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm dark:text-white">
                          {testimonial.role}
                        </p>
                      </div>
                    </motion.div>

                    <motion.p
                      className="mb-4 dark:text-white"
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
                          className={`h-5 w-5 ${
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