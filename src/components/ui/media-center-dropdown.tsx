// components/MediaCenterDropdown.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ChevronRight, Camera, Video, FileText, Play, Image as ImageIcon } from "lucide-react";

interface MediaItem {
  name: string;
  href: string;
  icon: React.ElementType;
  description: string;
  gradient: string;
}

const MEDIA_ITEMS: MediaItem[] = [
  {
    name: "Photo Gallery",
    href: "/media/photos",
    icon: Camera,
    description: "Stunning property visuals",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Video Tours",
    href: "/media/videos",
    icon: Video,
    description: "Immersive property tours",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Virtual Tours",
    href: "/media/virtual-tours",
    icon: Play,
    description: "360° interactive experiences",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    name: "Floor Plans",
    href: "/media/floor-plans",
    icon: ImageIcon,
    description: "Detailed layout designs",
    gradient: "from-orange-500 to-red-500"
  },
  {
    name: "Brochures",
    href: "/media/brochures",
    icon: FileText,
    description: "Download property details",
    gradient: "from-indigo-500 to-purple-500"
  },
  // {
  //   name: "Press Releases",
  //   href: "/media/press",
  //   icon: BookOpen,
  //   description: "Latest news & updates",
  //   gradient: "from-teal-500 to-blue-500"
  // }
];

interface MediaCenterDropdownProps {
  scrolled: boolean;
}

const MediaCenterDropdown: React.FC<MediaCenterDropdownProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={"/media"}
        className={`flex items-center gap-1 transition-all text-sm duration-500 relative group ${
          scrolled
            ? "text-foreground hover:text-[rgb(140,46,71)] text-xs"
            : "text-white hover:text-[rgb(140,46,71)]"
        }`}
      >
        MEDIA CENTER
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
        {scrolled && <span
          className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-[rgb(140,46,71)]`}
        />}
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 w-72 z-[9999]"
          >
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
              {/* Menu Items */}
              <div className="py-2">
                {MEDIA_ITEMS.map((item) => {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-6 py-3 hover:bg-[rgb(140,46,71)] hover:text-white transition-all duration-200 group text-gray-700"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium tracking-wide">
                          {item.name}
                        </span>
                        <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaCenterDropdown;