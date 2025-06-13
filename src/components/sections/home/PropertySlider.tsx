"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleOnHover,
  slideInFromBottom,
  microSlide,
  shouldAnimate,
  simpleFadeSlide
} from '@/lib/constants';

// Property data - moved outside component to prevent recreating on each render
const showcaseProperties = [
  {
    id: 1,
    title: "Luxury Villa Paradise",
    location: "Beverly Hills, CA",
    price: "$2,850,000",
    image: "/images/property1.jpg",
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
    image: "/images/property2.jpg",
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
    image: "/images/property3.jpg",
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
  const [isMobile, setIsMobile] = useState(false);
  const [, setDirection] = useState(0);

  // Memoize performance checks
  const animationEnabled = useMemo(() => shouldAnimate(), []);
  // const performanceMode = useMemo(() => getPerformanceMode(), []);

  // Memoize current property to prevent unnecessary recalculations
  const currentProperty = useMemo(() => showcaseProperties[currentIndex], [currentIndex]);

  // Optimized mobile detection with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100); // Debounce resize events
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Optimized auto-switch with proper cleanup
  useEffect(() => {
    if (!isHovered && animationEnabled) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % showcaseProperties.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isHovered, animationEnabled]);

  // Memoized navigation functions
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % showcaseProperties.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + showcaseProperties.length) % showcaseProperties.length);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Simple Fade Effect */}
      <div className="absolute inset-0 bg-black">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={currentIndex}
            {...simpleFadeSlide}
            className="absolute inset-0 z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${currentProperty.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls - Only show on larger screens or when hovered */}
      <motion.button
        onClick={prevSlide}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 ${
          isMobile ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } md:opacity-100`}
        {...scaleOnHover}
        {...fadeInLeft}
      >
        <ChevronLeft size={24} />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 ${
          isMobile ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } md:opacity-100`}
        {...scaleOnHover}
        {...fadeInRight}
      >
        <ChevronRight size={24} />
      </motion.button>

      {/* Main Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="w-full p-6 sm:p-8 lg:p-12">
          <motion.div 
            className="max-w-4xl mx-auto"
            {...fadeInUp}
          >
            <motion.div className="mb-6" {...microSlide}>
              
              <motion.h1 
                className="text-2xl sm:text-3xl text-center lg:text-5xl text-white leading-tight"
                {...slideInFromBottom}
              >
                {currentProperty.title}
              </motion.h1>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyShowcase;