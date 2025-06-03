"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Home, Bed, Bath, Square, Star, Eye, Heart } from 'lucide-react';
import Image from 'next/image';

// Optimized animations from constants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.4,
    ease: [0.25, 0.25, 0, 1],
    willChange: "transform, opacity"
  }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { 
    duration: 0.4,
    willChange: "transform, opacity"
  }
};

const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { 
    duration: 0.4,
    willChange: "transform, opacity"
  }
};

const scaleOnHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { 
    duration: 0.15,
    ease: "easeOut"
  }
};

const cardHover = {
  whileHover: { 
    y: -6,
    scale: 1.01
  },
  transition: { 
    duration: 0.2,
    ease: "easeOut",
    willChange: "transform"
  }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.3,
    staggerChildren: 0.08,
    ease: "easeOut"
  }
};

const slideInFromBottom = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.5,
    ease: "easeOut",
    willChange: "transform, opacity"
  }
};

const quickFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

const microSlide = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.25,
    ease: "easeOut",
    willChange: "transform, opacity"
  }
};

// Property data with Unsplash images
const showcaseProperties = [
  {
    id: 1,
    title: "Luxury Villa Paradise",
    location: "Beverly Hills, CA",
    price: "$2,850,000",
    image: "/images/image1.jpg",
    beds: 5,
    baths: 4,
    sqft: "3,200",
    rating: 4.9,
    type: "Villa",
    features: ["Swimming Pool", "Garden", "Garage", "Security"],
    description: "Experience luxury living in this stunning villa with panoramic city views."
  },
  {
    id: 2,
    title: "Modern Downtown Penthouse",
    location: "Manhattan, NY",
    price: "$4,200,000",
    image: "/images/image2.jpg",
    beds: 3,
    baths: 3,
    sqft: "2,800",
    rating: 4.8,
    type: "Penthouse",
    features: ["City View", "Rooftop Access", "Modern Kitchen", "Elevator"],
    description: "Sophisticated penthouse offering the ultimate urban lifestyle experience."
  },
  {
    id: 3,
    title: "Oceanfront Estate",
    location: "Malibu, CA",
    price: "$6,750,000",
    image: "/images/image3.jpg",
    beds: 6,
    baths: 5,
    sqft: "4,500",
    rating: 5.0,
    type: "Estate",
    features: ["Ocean View", "Private Beach", "Wine Cellar", "Guest House"],
    description: "Exclusive oceanfront estate with private beach access and stunning sunset views."
  },
  {
    id: 4,
    title: "Mountain Retreat Cabin",
    location: "Aspen, CO",
    price: "$1,850,000",
    image: "/images/image1.jpg",
    beds: 4,
    baths: 3,
    sqft: "2,400",
    rating: 4.7,
    type: "Cabin",
    features: ["Mountain View", "Fireplace", "Ski Access", "Hot Tub"],
    description: "Charming mountain retreat perfect for year-round outdoor adventures."
  }
];

const PropertyShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Auto-switch images
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % showcaseProperties.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % showcaseProperties.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + showcaseProperties.length) % showcaseProperties.length);
  }, []);

  const currentProperty = showcaseProperties[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key={currentIndex}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.6 },
              scale: { duration: 0.8 }
            }}
            className="absolute inset-0"
            onMouseEnter={() => {
              setIsHovered(true);
              setShowDetails(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setShowDetails(false);
            }}
          >
            <Image
              fill
              src={currentProperty.image}
              alt={currentProperty.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border border-white/30 text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300"
        {...scaleOnHover}
        {...fadeInLeft}
      >
        <ChevronLeft size={24} />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border border-white/30 text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300"
        {...scaleOnHover}
        {...fadeInRight}
      >
        <ChevronRight size={24} />
      </motion.button>

      {/* Main Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-8 text-center text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              {...slideInFromBottom}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-[#8B2131]/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                {...microSlide}
              >
                <Home size={16} />
                <span className="text-sm font-medium">{currentProperty.type}</span>
              </motion.div>

              <motion.h1
                className="text-3xl md:text-4xl font-normal opacity-[0.5]"
                {...fadeInUp}
              >
                {currentProperty.title}
              </motion.h1>

              <motion.div
                className="flex items-center justify-center gap-2 mb-8"
                {...microSlide}
              >
                <MapPin size={20} className="text-[#8B2131]" />
                <span className="text-xl">{currentProperty.location}</span>
              </motion.div>

              <motion.div
                className="text-3xl md:text-4xl text-[#8B2131] mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                {currentProperty.price}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Property Details on Hover - Reduced Opacity & Font Weight */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            {...slideInFromBottom}
            className="absolute bottom-8 left-8 right-8 z-20"
          >
            <div className="bg-white/8 backdrop-blur-lg rounded-2xl border border-white/15 p-8 max-w-6xl mx-auto">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                {...staggerContainer}
              >
                {/* Property Stats */}
                <motion.div {...microSlide} className="space-y-4">
                  <h3 className="text-white/80 text-lg font-normal mb-4">Property Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-white/60">
                      <Bed size={18} className="text-[#8B2131]/80" />
                      <span className="text-sm font-light">{currentProperty.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                      <Bath size={18} className="text-[#8B2131]/80" />
                      <span className="text-sm font-light">{currentProperty.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                      <Square size={18} className="text-[#8B2131]/80" />
                      <span className="text-sm font-light">{currentProperty.sqft} sqft</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                      <Star size={18} className="text-yellow-400/80 fill-current" />
                      <span className="text-sm font-light">{currentProperty.rating}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div {...microSlide} className="space-y-4">
                  <h3 className="text-white/80 text-lg font-normal mb-4">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {currentProperty.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.25 }}
                        className="bg-white/8 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white/60 font-light"
                      >
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Description & Actions */}
                <motion.div {...microSlide} className="space-y-4">
                  <h3 className="text-white/80 text-lg font-normal mb-4">Description</h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                    {currentProperty.description}
                  </p>
                  <div className="flex gap-4">
                    <motion.button
                      {...cardHover}
                      className="flex items-center gap-2 bg-[#8B2131]/80 text-white px-5 py-2.5 rounded-lg font-light text-sm hover:bg-[#8B2131]/70 transition-colors"
                    >
                      <Eye size={16} />
                      View Details
                    </motion.button>
                    <motion.button
                      {...cardHover}
                      className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/80 px-5 py-2.5 rounded-lg font-light text-sm hover:bg-white/20 transition-colors border border-white/20"
                    >
                      <Heart size={16} />
                      Save
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {showcaseProperties.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#8B2131] scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            {...scaleOnHover}
            {...quickFade}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
        <motion.div
          className="h-full bg-gradient-to-r from-[#8B2131] to-[#B91C1C]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          key={currentIndex}
          transition={{ 
            duration: isHovered ? 0 : 4,
            ease: "linear"
          }}
        />
      </div>
    </section>
  );
};

export default PropertyShowcase;