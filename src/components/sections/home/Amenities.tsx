"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  batchStagger,
  viewportOnce,
  delays,
  shouldAnimate
} from '@/lib/constants';
import { amenitiesData } from '@/data/amenities';
import { AmenityData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CldImage } from 'next-cloudinary';

const Amenities = () => {
  const [activeAmenity, setActiveAmenity] = useState<string>('shopping-mall');
  const canAnimate = shouldAnimate();

  const amenityKeys = Object.keys(amenitiesData);
  const currentAmenity: AmenityData = amenitiesData[activeAmenity];

  const handleAmenityClick = (amenityId: string) => {
    setActiveAmenity(amenityId);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto">
        {/* Header Section */}
        <motion.div 
          className="w-full flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10 lg:mb-12"
          {...fadeInUp}
          viewport={viewportOnce}
        >
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  uppercase w-full lg:w-2/3 leading-tight"
            {...fadeInLeft}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.short }}
          >
            Explore premium world-class amenities at your neigborhood
          </motion.h1>
          <motion.p 
            className="sm:text-md  w-full lg:w-1/3 leading-relaxed font-light"
            {...fadeInRight}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.medium }}
          >
            At Altaf Devlopment, the neigborhood offers top-tier fitness centers, luxurious pools, parks, high-end shopping, dining, coworking spaces, and event venues. Enjoy security, high-speed internet, and eco-friendly infrastructure for modern living in Pakistan&apos;s premier smart city.
          </motion.p>
        </motion.div>

        {/* Amenity Tabs */}
        <motion.div 
          className="mb-8 sm:mb-10 lg:mb-12"
          variants={batchStagger.container}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
        >
          <motion.ul className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-start">
            {amenityKeys.map((amenityKey) => {
              const amenity = amenitiesData[amenityKey];
              const isActive = activeAmenity === amenityKey;
              
              return (
                <motion.li 
                  key={amenityKey}
                  variants={batchStagger.item}
                  whileHover={canAnimate ? { scale: 1.02 } : {}}
                  whileTap={canAnimate ? { scale: 0.98 } : {}}
                >
                  <Button
                    onClick={() => handleAmenityClick(amenityKey)}
                    className={`uiverse-btn p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base transition-all duration-300 ${
                      isActive
                        ? 'bg-[rgb(140,46,71)] text-white border-[rgb(140,46,71)] shadow-lg hover:bg-[rgb(140,46,71)]'
                        : 'bg-white border-gray-300 hover:border-amber-400 hover:text-amber-600'
                    }`}
                  >
                    {amenity.name}
                  </Button>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start"
          key={activeAmenity} // This ensures re-animation when content changes
          {...fadeInUp}
          viewport={viewportOnce}
        >
          {/* Left Content */}
          <motion.div 
            className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1"
            {...fadeInLeft}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.short }}
          >
            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentAmenity.title}
            </motion.h2>
            
            <motion.p 
              className="text-sm sm:text-base leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {currentAmenity.description}
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Key Features:</h3>
              <ul className="space-y-2 sm:space-y-3">
                {currentAmenity.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start font-optima text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  >
                    <div className="w-2 h-2 bg-[rgb(140,46,71)] rounded-full mr-3 mt-2 flex-shrink-0"/>
                    <span className="leading-relaxed">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="relative order-1 lg:order-2"
            {...fadeInRight}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.medium }}
          >
            <motion.div
              className="relative w-full h-[280px] xs:h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <CldImage
                src={currentAmenity.image}
                alt={currentAmenity.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"/>
              
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Amenities;