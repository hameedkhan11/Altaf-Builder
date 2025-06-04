"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Home, Bed, Bath, Square, Star, Eye, Heart } from 'lucide-react';
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  scaleOnHover, 
  cardHover, 
  staggerContainer, 
  slideInFromBottom, 
  quickFade, 
  microSlide 
} from '@/lib/constants';
import Image from 'next/image';

// Property data
const showcaseProperties = [
  {
    id: 1,
    title: "Luxury Villa Paradise",
    location: "Beverly Hills, CA",
    price: "$2,850,000",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&crop=center",
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
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop&crop=center",
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
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      <div className="absolute inset-0 w-full h-full">
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
            className="absolute inset-0 w-full h-full"
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
              width={1920}
              height={1080}
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
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border border-white/30 text-white p-3 sm:p-4 rounded-full hover:bg-white/30 transition-all duration-300"
        {...scaleOnHover}
        {...fadeInLeft}
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border border-white/30 text-white p-3 sm:p-4 rounded-full hover:bg-white/30 transition-all duration-300"
        {...scaleOnHover}
        {...fadeInRight}
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </motion.button>

      {/* Main Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-8">
        <div className="container mx-auto text-center text-white max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              {...slideInFromBottom}
              className="w-full"
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-[#8B2131]/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6"
                {...microSlide}
              >
                <Home size={14} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">{currentProperty.type}</span>
              </motion.div>

              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal opacity-[0.9] mb-2 sm:mb-4 px-4"
                {...fadeInUp}
              >
                {currentProperty.title}
              </motion.h1>

              <motion.div
                className="flex items-center justify-center gap-2 mb-6 sm:mb-8"
                {...microSlide}
              >
                <MapPin size={16} className="text-[#8B2131] sm:w-5 sm:h-5" />
                <span className="text-lg sm:text-xl">{currentProperty.location}</span>
              </motion.div>

              <motion.div
                className="text-2xl sm:text-3xl md:text-4xl text-[#8B2131] mb-6 sm:mb-8"
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

      {/* Property Details on Hover - Mobile: Always Show on Small Screens */}
      <AnimatePresence>
        {(showDetails || isMobile) && (
          <motion.div
            {...slideInFromBottom}
            className="absolute bottom-4 sm:bottom-8 left-4 right-4 sm:left-8 sm:right-8 z-20"
          >
            <div className="bg-white/8 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/15 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                {...staggerContainer}
              >
                {/* Property Stats */}
                <motion.div {...microSlide} className="space-y-3 sm:space-y-4">
                  <h3 className="text-white/80 text-base sm:text-lg font-normal mb-3 sm:mb-4">Property Details</h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3 text-white/60">
                      <Bed size={16} className="text-[#8B2131]/80 sm:w-[18px] sm:h-[18px]" />
                      <span className="text-xs sm:text-sm font-light">{currentProperty.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-white/60">
                      <Bath size={16} className="text-[#8B2131]/80 sm:w-[18px] sm:h-[18px]" />
                      <span className="text-xs sm:text-sm font-light">{currentProperty.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-white/60">
                      <Square size={16} className="text-[#8B2131]/80 sm:w-[18px] sm:h-[18px]" />
                      <span className="text-xs sm:text-sm font-light">{currentProperty.sqft} sqft</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-white/60">
                      <Star size={16} className="text-yellow-400/80 fill-current sm:w-[18px] sm:h-[18px]" />
                      <span className="text-xs sm:text-sm font-light">{currentProperty.rating}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div {...microSlide} className="space-y-3 sm:space-y-4">
                  <h3 className="text-white/80 text-base sm:text-lg font-normal mb-3 sm:mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                <motion.div {...microSlide} className="space-y-3 sm:space-y-4 md:col-span-2 lg:col-span-1">
                  <h3 className="text-white/80 text-base sm:text-lg font-normal mb-3 sm:mb-4">Description</h3>
                  <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed mb-4 sm:mb-6">
                    {currentProperty.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <motion.button
                      {...cardHover}
                      className="flex items-center justify-center gap-2 bg-[#8B2131]/80 text-white px-4 sm:px-5 py-2.5 rounded-lg font-light text-xs sm:text-sm hover:bg-[#8B2131]/70 transition-colors"
                    >
                      <Eye size={14} className="sm:w-4 sm:h-4" />
                      View Details
                    </motion.button>
                    <motion.button
                      {...cardHover}
                      className="flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm text-white/80 px-4 sm:px-5 py-2.5 rounded-lg font-light text-xs sm:text-sm hover:bg-white/20 transition-colors border border-white/20"
                    >
                      <Heart size={14} className="sm:w-4 sm:h-4" />
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
      <div className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {showcaseProperties.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
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