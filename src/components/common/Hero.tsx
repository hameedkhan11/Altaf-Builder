// common/components/Hero.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { HeroBackground } from './HeroBackground';
import { Breadcrumb } from './Breadcrumb';
import { HeroProps } from '@/lib/types';
import { ScrollIndicator } from './ScrollIndicator';
import HeroButtons from './HeroButtons';

// Extended HeroProps interface to include showHeroButtons
interface ExtendedHeroProps extends HeroProps {
  showHeroButtons?: boolean;
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

export const Hero: React.FC<ExtendedHeroProps> = ({
  title,
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
  children,
  ariaLabel = "Hero section"
}) => {
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
  const MotionH1 = enableAnimations ? motion.h1 : 'h1';
  const MotionP = enableAnimations ? motion.p : 'p';

  return (
    <MotionWrapper
      className={`relative ${getHeightClass()} overflow-hidden flex ${getContentAlignmentClass()}`}
      aria-label={ariaLabel}
      {...(enableAnimations && {
        variants: containerVariants,
        initial: "initial",
        animate: "animate"
      })}
    >
      {/* Background */}
      <HeroBackground
        type={backgroundType}
        src={backgroundSrc}
        fallbackImage={fallbackImage}
        overlay={overlay}
      />

      {/* Breadcrumb */}
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 w-full mt-24">
        <MotionDiv
          className={`${contentAlignment === 'center' ? 'max-w-4xl mx-auto' : contentAlignment === 'right' ? 'ml-auto max-w-2xl' : 'max-w-2xl'}`}
          {...(enableAnimations && {
            variants: containerVariants,
            initial: "initial",
            animate: "animate"
          })}
        >
          {title && (
            <MotionH1
              className="text-3xl md:text-4xl lg:text-7xl text-white mb-6 leading-tight"
              {...(enableAnimations && {
                variants: itemVariants
              })}
            >
              {title}
            </MotionH1>
          )}

          {subtitle && (
            <MotionP
              className="text-xl text-white/90 mb-8 leading-relaxed"
              {...(enableAnimations && {
                variants: itemVariants
              })}
            >
              {subtitle}
            </MotionP>
          )}

          {/* Hero Buttons */}
          {showHeroButtons && (
            <MotionDiv
              className="mb-8 flex justify-center pt-24"
              {...(enableAnimations && {
                variants: itemVariants
              })}
            >
              
              <HeroButtons 
                enableAnimations={enableAnimations}
                className={contentAlignment === 'center' ? 'justify-center' : contentAlignment === 'right' ? 'justify-end' : 'justify-start'}
              />
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
        </MotionDiv>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </MotionWrapper>
  );
};