import React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";

interface PropertyCardProps {
  image: string;
  title: string;
}

export const ProjectCard = ({ image, title }: PropertyCardProps) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl w-full">
      {/* Image Container - Using width/height with responsive sizing */}
      <div className="relative w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={800}
          height={300}
          className="w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] xl:h-[320px] object-cover transition-all duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={false}
        />

        {/* Overlay with opacity animation */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Animated overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Floating particles effect - Responsive positioning */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
        <div
          className="absolute top-4 right-4 sm:top-8 sm:right-8 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="absolute top-3 right-6 sm:top-6 sm:right-12 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-600 animate-pulse"
          style={{ animationDelay: "0.4s" }}
        />
      </div>

      {/* Content Container - Responsive padding */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-end justify-between gap-2 sm:gap-3">
          {/* Title with sliding animation - Responsive text */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 transform translate-x-2 group-hover:translate-x-0 transition-transform duration-500 truncate">
              {title}
            </h3>

            {/* Animated underline - Responsive width */}
            <div className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-10 sm:group-hover:w-12 md:group-hover:w-16 transition-all duration-700 ease-out" />

            {/* Subtitle that appears on hover - Responsive text */}
            <p className="text-white/80 text-xs sm:text-sm mt-1 sm:mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-200">
              Explore Details
            </p>
          </div>

          {/* Animated Arrow Icon - Responsive size */}
          <div className="relative flex-shrink-0">
            {/* Background circle */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-500 group-hover:bg-white/30">
              {/* Arrow that rotates on hover */}
              <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white transform rotate-0 group-hover:rotate-45 transition-all duration-500 group-hover:scale-110" />

              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 opacity-100 group-hover:opacity-0 transition-all duration-700" />
            </div>

            {/* Secondary arrow for extra effect */}
            <ArrowRight className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 delay-100" />
          </div>
        </div>

        {/* Animated border */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:w-full transition-all duration-1000 ease-out" />
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-shimmer" />
      </div>
    </div>
  );
};