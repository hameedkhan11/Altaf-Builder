"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { testimonials } from '@/data/testimonials';
import { 
  fadeInUp, 
  cardHover, 
  staggerContainer, 
  viewportOnce, 
  delays 
} from '@/lib/constants';

const Testimonials = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-cover bg-center opacity-10"
           style={{ backgroundImage: "url('/api/placeholder/1920/1080')" }} />
           
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 "
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={viewportOnce}
          transition={fadeInUp.transition}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 dark:text-white"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.short }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.medium }}
          >
            Hear from our satisfied clients about their experience with ALTAF BUILDER.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={fadeInUp}
              custom={index}
              {...cardHover}
              className="h-full "
            >
              <Card className="p-8 h-full hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900">
                <CardContent className="p-0">
                  <motion.div 
                    className="flex items-center mb-6 "
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, delay: delays.stagger(index) + 0.2 }}
                  >
                    <div className="w-12 h-12 bg-[#8B2131] rounded-full flex items-center justify-center mr-4">
                      <Quote className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold dark:text-white">{testimonial.name}</h4>
                      <p className="text-muted-foreground text-sm dark:text-white">{testimonial.role}</p>
                    </div>
                  </motion.div>
                  
                  <motion.p 
                    className="text-muted-foreground mb-4 dark:text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, delay: delays.stagger(index) + 0.4 }}
                  >
                    {testimonial.content}
                  </motion.p>
                  
                  <motion.div 
                    className="flex text-yellow-500"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.3, delay: delays.stagger(index) + 0.6 }}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? 'fill-current' : ''}`}
                      />
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;