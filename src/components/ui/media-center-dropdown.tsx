// components/MediaCenterDropdown.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Camera, Video, FileText, Play, Image as ImageIcon, BookOpen } from "lucide-react";

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
  {
    name: "Press Releases",
    href: "/media/press",
    icon: BookOpen,
    description: "Latest news & updates",
    gradient: "from-teal-500 to-blue-500"
  }
];

interface MediaCenterDropdownProps {
  scrolled: boolean;
}

const MediaCenterDropdown: React.FC<MediaCenterDropdownProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
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
      setHoveredItem(null);
    }, 150);
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
        className={`flex items-center gap-1 transition-all text-sm duration-500 font-medium relative group ${
          scrolled
            ? "text-foreground hover:text-[rgb(140,46,71)] hover:font-bold text-xs"
            : "text-white hover:text-[rgb(140,46,71)] hover:font-bold"
        }`}
      >
        MEDIA CENTER
        <ChevronDown 
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
        <span
          className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-[rgb(140,46,71)]`}
        />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Media Center
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Explore our luxury properties through various media
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {MEDIA_ITEMS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} ${
                        hoveredItem === index ? 'scale-110' : 'scale-100'
                      } transition-transform duration-200`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
              <Link
                href="/media"
                className="text-sm text-[rgb(140,46,71)] hover:text-[rgb(120,36,61)] font-medium transition-colors duration-200"
              >
                View All Media →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaCenterDropdown;