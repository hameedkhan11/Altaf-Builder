// common/components/HeroBackground.tsx
"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CldImage } from 'next-cloudinary';

interface HeroBackgroundProps {
  type: 'video' | 'image';
  src: string;
  fallbackImage?: string;
  overlay?: 'light' | 'medium' | 'dark' | 'gradient' | 'none';
  className?: string;
  enableParallax?: boolean;
  parallaxSpeed?: number;
  videoOptimization?: {
    quality?: 'auto' | 'auto:low' | 'auto:good' | 'auto:best' | number;
    format?: 'auto' | 'mp4' | 'webm';
    width?: number;
    height?: number;
    bitrate?: string;
    fps?: number;
  };
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  type,
  src,
  fallbackImage,
  overlay = 'medium',
  className = "absolute inset-0 w-full h-full",
  enableParallax = true,
  parallaxSpeed = 0.5,
  videoOptimization = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Smooth scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Ultra-smooth spring animation for parallax
  const smoothY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll into parallax movement
  const y = useTransform(smoothY, [0, 1], [0, -100 * parallaxSpeed]);
  const scale = useTransform(smoothY, [0, 1], [1, 1.1]);

  const getOverlayClass = () => {
    switch (overlay) {
      case 'light':
        return 'bg-black/20';
      case 'medium':
        return 'bg-black/40';
      case 'dark':
        return 'bg-black/70';
      case 'gradient':
        return 'bg-gradient-to-b from-black/20 via-black/30 to-black/40';
      case 'none':
        return '';
      default:
        return 'bg-black/40';
    }
  };

  const buildVideoUrl = () => {
    const {
      quality = 'auto:good',
      format = 'auto',
      width = 1920,
      height = 1080,
      bitrate = '1000k',
      fps = 30
    } = videoOptimization;

    const transformations = [
      `q_${quality}`,
      `f_${format}`,
      `w_${width}`,
      `h_${height}`,
      `c_fill`,
      `br_${bitrate}`,
      `fps_${fps}`,
      'ac_none'
    ].join(',');

    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${transformations}/${src}`;
  };

  const buildResponsiveVideoSources = () => {
    const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`;
    
    return [
      {
        src: `${baseUrl}/q_auto,f_auto,w_640,h_360,c_fill,ac_none/${src}`,
        media: '(max-width: 640px)'
      },
      {
        src: `${baseUrl}/q_auto,f_auto,w_1280,h_720,c_fill,ac_none/${src}`,
        media: '(max-width: 1024px)'
      },
      {
        src: `${baseUrl}/q_auto,f_auto,w_1920,h_1080,c_fill,ac_none/${src}`,
        media: '(min-width: 1025px)'
      }
    ];
  };

  return (
    <div ref={containerRef} className={className}>
      {enableParallax ? (
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <ParallaxContent
            type={type}
            src={src}
            fallbackImage={fallbackImage}
            buildVideoUrl={buildVideoUrl}
            buildResponsiveVideoSources={buildResponsiveVideoSources}
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <ParallaxContent
            type={type}
            src={src}
            fallbackImage={fallbackImage}
            buildVideoUrl={buildVideoUrl}
            buildResponsiveVideoSources={buildResponsiveVideoSources}
          />
        </div>
      )}
      
      {overlay !== 'none' && (
        <div className={`absolute inset-0 z-10 ${getOverlayClass()}`} />
      )}
    </div>
  );
};

// Separated content component for cleaner code
const ParallaxContent: React.FC<{
  type: 'video' | 'image';
  src: string;
  fallbackImage?: string;
  buildVideoUrl: () => string;
  buildResponsiveVideoSources: () => Array<{src: string; media: string}>;
}> = ({ type, src, fallbackImage, buildVideoUrl, buildResponsiveVideoSources }) => {
  return (
    <>
      {type === 'video' ? (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover z-0"
            onError={(e) => console.error('Video error:', e)}
            poster={fallbackImage ? 
              `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_1920,h_1080,f_auto,q_auto/${fallbackImage}` 
              : undefined
            }
          >
            {buildResponsiveVideoSources().map((source, index) => (
              <source
                key={index}
                src={source.src}
                media={source.media}
                type="video/mp4"
              />
            ))}
            
            <source
              src={buildVideoUrl()}
              type="video/mp4"
            />
          </video>
          
          {fallbackImage && (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
              style={{
                backgroundImage: `url(https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_1920,h_1080,f_auto,q_auto/${fallbackImage})`
              }}
            />
          )}
        </>
      ) : (
        <CldImage
          src={src}
          alt="Hero Background"
          fill
          sizes="100vw"
          priority
          className="absolute inset-0 object-cover z-0"
        />
      )}
    </>
  );
};