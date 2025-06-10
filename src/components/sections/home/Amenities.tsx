"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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

const Amenities = () => {
  const [activeAmenity, setActiveAmenity] = useState<string>('shopping-mall');
  const canAnimate = shouldAnimate();

  const amenityKeys = Object.keys(amenitiesData);
  const currentAmenity: AmenityData = amenitiesData[activeAmenity];

  const handleAmenityClick = (amenityId: string) => {
    setActiveAmenity(amenityId);
  };

  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 bg-gray-50">
      <div className=" mx-auto">
        {/* Header Section */}
        <motion.div 
          className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12"
          {...fadeInUp}
          viewport={viewportOnce}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl uppercase w-full lg:w-2/3 leading-tight"
            {...fadeInLeft}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.short }}
          >
            Explore premium world-class amenities at your neigborhood
          </motion.h1>
          <motion.p 
            className="text-lg w-full lg:w-1/3 leading-relaxed"
            {...fadeInRight}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.medium }}
          >
            At Altaf Devlopment, the neigborhood offers top-tier fitness centers, luxurious pools, parks, high-end shopping, dining, coworking spaces, and event venues. Enjoy security, high-speed internet, and eco-friendly infrastructure for modern living in Zimbabwe's premier smart city.
          </motion.p>
        </motion.div>

        {/* Amenity Tabs */}
        <motion.div 
          className="mb-12"
          variants={batchStagger.container}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
        >
          <motion.ul className="flex flex-wrap gap-4 justify-start">
            {amenityKeys.map((amenityKey, index) => {
              const amenity = amenitiesData[amenityKey];
              const isActive = activeAmenity === amenityKey;
              
              return (
                <motion.li 
                  key={amenityKey}
                  variants={batchStagger.item}
                  whileHover={canAnimate ? { scale: 1.02 } : {}}
                  whileTap={canAnimate ? { scale: 0.98 } : {}}
                >
                  <button
                    onClick={() => handleAmenityClick(amenityKey)}
                    className={`text-base sm:text-lg px-4 py-3 rounded-full border-2 transition-all duration-300 font-medium ${
                      isActive
                        ? 'bg-amber-600 text-white border-amber-600 shadow-lg'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:text-amber-600'
                    }`}
                  >
                    {amenity.name}
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
          key={activeAmenity} // This ensures re-animation when content changes
          {...fadeInUp}
          viewport={viewportOnce}
        >
          {/* Left Content */}
          <motion.div 
            className="space-y-6"
            {...fadeInLeft}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.short }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentAmenity.title}
            </motion.h2>
            
            <motion.p 
              className="text-lg leading-relaxed"
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
              <h3 className="text-xl font-semibold mb-4">Key Features:</h3>
              <ul className="space-y-2">
                {currentAmenity.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  >
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 flex-shrink-0"/>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="relative"
            {...fadeInRight}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: delays.medium }}
          >
            <motion.div
              className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={currentAmenity.image}
                alt={currentAmenity.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
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