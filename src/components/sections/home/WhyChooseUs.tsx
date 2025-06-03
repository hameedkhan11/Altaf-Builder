// components/sections/home/WhyChooseUs.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { features } from "@/data/features";
import { 
  fadeInLeft, 
  fadeInRight, 
  fadeInUp, 
  staggerContainer,
  viewportOnce,
  delays 
} from "@/lib/constants";

const WhyChoose = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            {...fadeInLeft}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl  dark:text-white mb-6">
                Why Choose ALTAF BUILDER
              </h2>
              <motion.div 
                className="w-20 h-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full mb-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
            
            <motion.p 
              className="text-muted-foreground mb-8 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: delays.short }}
            >
              With over 25 years of experience in luxury real estate
              development, we have established ourselves as a leader in creating
              exceptional living spaces that combine innovative design, premium
              materials, and unparalleled craftsmanship.
            </motion.p>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              {...staggerContainer}
              viewport={viewportOnce}
            >
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    {...fadeInUp}
                    viewport={viewportOnce}
                    transition={{ 
                      duration: 0.6, 
                      delay: delays.stagger(index) + delays.medium,
                      ease: [0.25, 0.25, 0, 1]
                    }}
                    whileHover={{ 
                      y: -5, 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    className="flex items-start p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-300"
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-[#8B2131] to-[#B91C1C] rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                      whileHover={{ 
                        rotate: 5,
                        scale: 1.1,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            {...fadeInRight}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: delays.short }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.4 }
            }}
            className="relative h-[500px] rounded-lg overflow-hidden shadow-xl group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            />
            <Image
              src="/images/avi-waxman-f9qZuKoZYoY-unsplash.jpg"
              alt="ALTAF BUILDER Office"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              fill
            />
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#8B2131] to-[#B91C1C] rounded-full opacity-20 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full opacity-15 blur-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;