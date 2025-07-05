// common/components/HeroBackground.tsx
import React from 'react';
import { CldImage } from 'next-cloudinary';

interface HeroBackgroundProps {
  type: 'video' | 'image';
  src: string;
  fallbackImage?: string;
  overlay?: 'light' | 'medium' | 'dark' | 'gradient' | 'none';
  className?: string;
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
  videoOptimization = {}
}) => {
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
      'ac_none' // Remove audio for hero videos
    ].join(',');

    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${transformations}/${src}`;
  };

  const buildResponsiveVideoSources = () => {
    const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`;
    
    return [
      // Mobile - let Cloudinary auto-optimize but constrain dimensions
      {
        src: `${baseUrl}/q_auto,f_auto,w_640,h_360,c_fill,ac_none/${src}`,
        media: '(max-width: 640px)'
      },
      // Tablet - balanced optimization
      {
        src: `${baseUrl}/q_auto,f_auto,w_1280,h_720,c_fill,ac_none/${src}`,
        media: '(max-width: 1024px)'
      },
      // Desktop - high quality but size-constrained
      {
        src: `${baseUrl}/q_auto,f_auto,w_1920,h_1080,c_fill,ac_none/${src}`,
        media: '(min-width: 1025px)'
      }
    ];
  };

  return (
    <div className={className}>
      {type === 'video' ? (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata" // Changed from "auto" to reduce initial load
            className="absolute inset-0 w-full h-full object-cover z-0"
            onError={(e) => console.error('Video error:', e)}
            poster={fallbackImage ? 
              `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_1920,h_1080,f_auto,q_auto/${fallbackImage}` 
              : undefined
            }
          >
            {/* Responsive video sources */}
            {buildResponsiveVideoSources().map((source, index) => (
              <source
                key={index}
                src={source.src}
                media={source.media}
                type="video/mp4"
              />
            ))}
            
            {/* Fallback source */}
            <source
              src={buildVideoUrl()}
              type="video/mp4"
            />
          </video>
          
          {/* Fallback image for when video fails to load */}
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
      
      {overlay !== 'none' && (
        <div className={`absolute inset-0 z-10 ${getOverlayClass()}`} />
      )}
    </div>
  );
};