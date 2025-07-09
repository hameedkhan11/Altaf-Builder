
// common/components/Hero.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HeroBackground } from './HeroBackground';
import { Breadcrumb } from './Breadcrumb';
import { HeroProps } from '@/lib/types';
import { ScrollIndicator } from './ScrollIndicator';
// import HeroButtons from './HeroButtons';

// Extended HeroProps interface
interface ExtendedHeroProps extends HeroProps {
  showHeroButtons?: boolean;
  isHomePage?: boolean;
  enableParallax?: boolean;
  parallaxSpeed?: number;
}

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Content variants for coordinating with logo animation
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export const Hero: React.FC<ExtendedHeroProps> = ({
  title,
  isHomePage,
  subtitle,
  backgroundType,
  backgroundSrc,
  fallbackImage,
  height = 'screen',
  overlay = 'medium',
  contentAlignment = 'left',
  breadcrumbs,
  showScrollIndicator = false,
  showHeroButtons = false,
  enableAnimations = true,
  enableParallax = true,
  parallaxSpeed = 0.5,
  children,
  ariaLabel = "Hero section"
}) => {
  const [showContent, setShowContent] = useState(false);
  const [setInitialLoad] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  // Parallax for content elements
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Ultra-smooth spring animations for content
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Different parallax speeds for layered effect
  const contentY = useTransform(smoothProgress, [0, 1], [0, -50]);
  const titleY = useTransform(smoothProgress, [0, 1], [0, -30]);
  const subtitleY = useTransform(smoothProgress, [0, 1], [0, -20]);

  useEffect(() => {
    const checkInitialScroll = () => {
      const scrollPosition = window.scrollY;
      const isScrolled = scrollPosition > 100;
      
      if (isScrolled) {
        setShowContent(true);
      } else {
        const timer = setTimeout(() => {
          setShowContent(true);
        }, 3500);
        
        return () => clearTimeout(timer);
      }
    };

    checkInitialScroll();
  }, [setInitialLoad]);

  const getHeightClass = () => {
    switch (height) {
      case 'screen':
        return 'h-screen min-h-screen';
      case 'half':
        return 'h-[50vh] min-h-[400px]';
      case 'auto':
        return 'min-h-[60vh]';
      default:
        return 'h-screen min-h-screen';
    }
  };

  const getContentAlignmentClass = () => {
    switch (contentAlignment) {
      case 'center':
        return 'items-center justify-center text-center';
      case 'right':
        return 'items-center justify-end text-right';
      case 'left':
      default:
        return 'items-center justify-start text-left';
    }
  };

  const MotionWrapper = enableAnimations ? motion.section : 'section';
  const MotionDiv = enableAnimations ? motion.div : 'div';
  // const MotionH1 = enableAnimations ? motion.h1 : 'h1';
  // const MotionP = enableAnimations ? motion.p : 'p';

  return (
    <MotionWrapper
      ref={heroRef}
      className={`relative ${getHeightClass()} overflow-hidden flex ${getContentAlignmentClass()}`}
      aria-label={ariaLabel}
      {...(enableAnimations && {
        variants: containerVariants,
        initial: "initial",
        animate: "animate"
      })}
    >
      {/* Background with Parallax */}
      <HeroBackground
        type={backgroundType}
        src={backgroundSrc}
        fallbackImage={fallbackImage}
        overlay={overlay}
        enableParallax={enableParallax}
        parallaxSpeed={parallaxSpeed}
      />

      {/* Breadcrumb */}
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}

      {/* Content with Parallax */}
      <div className="container mx-auto px-6 relative z-20 w-full mt-24">
        <motion.div
          style={enableParallax ? { y: contentY } : {}}
          className={`${contentAlignment === 'center' && !isHomePage ? 'max-w-6xl mx-auto' : contentAlignment === 'right' ? 'ml-auto max-w-2xl' : 'max-w-2xl mx-auto'} will-change-transform`}
          {...(enableAnimations && {
            variants: showContent ? contentVariants : { hidden: { opacity: 0 } },
            initial: "hidden",
            animate: showContent ? "visible" : "hidden"
          })}
        >
          {title && (
            <motion.h1
              style={enableParallax ? { y: titleY } : {}}
              className={`text-3xl md:text-4xl ${ isHomePage ? "lg:text-6xl" : "lg:text-5xl"} text-white leading-tight will-change-transform`}
              {...(enableAnimations && {
                variants: itemVariants
              })}
            >
              {title}
            </motion.h1>
          )}
          {subtitle && (
            <motion.p
              style={enableParallax ? { y: subtitleY } : {}}
              className="text-xl text-white/90 mb-8 leading-relaxed will-change-transform"
              {...(enableAnimations && {
                variants: itemVariants
              })}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Hero Buttons */}
          {showHeroButtons && (
            <MotionDiv
              className="mb-8 flex justify-center pt-8"
              {...(enableAnimations && {
                variants: itemVariants
              })}
            >
              {/* <HeroButtons 
                enableAnimations={enableAnimations}
                className={contentAlignment === 'center' ? 'justify-center' : contentAlignment === 'right' ? 'justify-end' : 'justify-start'}
              /> */}
            </MotionDiv>
          )}

          {children && (
            <MotionDiv
              {...(enableAnimations && {
                variants: itemVariants
              })}
            >
              {children}
            </MotionDiv>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </MotionWrapper>
  );
};