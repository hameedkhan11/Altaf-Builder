// common/components/HeroBackground.tsx
import React from 'react';
import { CldImage } from 'next-cloudinary';

interface HeroBackgroundProps {
  type: 'video' | 'image';
  src: string;
  fallbackImage?: string;
  overlay?: 'light' | 'medium' | 'dark' | 'gradient' | 'none';
  className?: string;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  type,
  src,
  fallbackImage,
  overlay = 'medium',
  className = "absolute inset-0 w-full h-full"
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

  return (
    <div className={className}>
      {type === 'video' ? (
        <>
          <video
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/q_auto,f_auto/${src}`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
            onError={(e) => console.error('Video error:', e)}
          />
          {fallbackImage && (
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
              style={{
                backgroundImage: `url(https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_1920,h_1080/${fallbackImage})`
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