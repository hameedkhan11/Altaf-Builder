// components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import MediaCenterDropdown from "../ui/media-center-dropdown";

// Import SVG as React component
import AltafLogo from "../../../public/logos/altaf-logo.svg"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  const [showBackgroundOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side rendering flag
    setIsClient(true);
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initial mobile state
    checkMobile();

    // Check initial scroll position on component mount
    const checkInitialScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldBeScrolled = scrollPosition > 100;
      
      setScrolled(shouldBeScrolled);
      // If already scrolled on load, skip the logo animation
      if (shouldBeScrolled) {
        setInitialLoad(false);
      }
    };

    // Check scroll position immediately
    checkInitialScroll();

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);
    };

    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Logo animation variants - responsive scale based on device
  const logoVariants = {
    initial: {
      opacity: 1,
      scale: initialLoad && !scrolled ? (isClient && isMobile ? 1.2 : 4) : 1,
      y: initialLoad && !scrolled ? (isClient && isMobile ? "25vh" : "50vh") : 0,
      x: 0,
      rotate: 0,
    },
    animate: {
      opacity: 1,
      scale: 1, // Shrink to normal size
      y: 0, // Move to header position
      x: 0,
      rotate: 0,
      transition: {
        duration: initialLoad && !scrolled ? 2.5 : 0,
        delay: initialLoad && !scrolled ? 1 : 0,
        ease: [0.25, 0.1, 0.25, 1],
        onComplete: () => {
          setInitialLoad(false);
        }
      }
    },
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <motion.header
        className={`fixed w-full h-20 transition-all duration-500 ease-in-out font-avenir ${
          scrolled
            ? "z-30 backdrop-blur-lg border-b bg-white dark:bg-purple-950/95 shadow-lg"
            : "z-20"
        } ${showBackgroundOverlay ? "opacity-0" : "opacity-100"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background image overlay for initial state */}
        {!scrolled && (
          <div className="absolute inset-0 bg-cover bg-center opacity-0" />
        )}

        <div className="container mx-auto px-6 h-full relative z-10">
          <div className="flex items-center justify-between h-full">
            {/* Left Navigation */}
            <nav className={`hidden lg:flex items-center space-x-8 ml-12 transition-opacity duration-500 ${
              showBackgroundOverlay ? "opacity-0" : "opacity-100"
            }`}>
              {NAVIGATION_ITEMS.map((item) => (
                <React.Fragment key={item.name}>
                  {item.name === "MEDIA CENTER" ? (
                    <MediaCenterDropdown scrolled={scrolled} />
                  ) : (
                    <Link
                      href={item.href}
                      className={`transition-all duration-500 text-sm relative group ${
                        scrolled
                          ? "text-foreground hover:text-[rgb(140,46,71)] hover:font-bold text-xs"
                          : "text-white hover:text-[rgb(140,46,71)] hover:font-bold"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-[rgb(140,46,71)]`}
                      />
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>

            {/* Center Logo with Screen Center to Header Animation */}
            <motion.div
              className="flex items-center absolute left-1/2 transform -translate-x-1/2"
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <Link
                href={"/"}
                className="cursor-pointer pt-6 flex items-center relative"
              >
                {/* Logo using SVGR */}
                <AltafLogo 
                  className={`cursor-pointer transition-all duration-500 ${
                    isClient && isMobile ? 'w-[120px] h-[88px]' : 'w-[188px] h-[138px]'
                  } ${
                    !scrolled 
                      ? "text-white" // White when not scrolled
                      : "text-[#8c2e47]" // Brand color when scrolled
                  }`}
                />
              </Link>
            </motion.div>

            {/* Right Side - Contact Button & Theme Toggle */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/contact">
                <Button
                  className={`group relative transition-all duration-500 px-5 bg-transparent cursor-pointer rounded-full font-bold mr-8 overflow-hidden py-6 ${
                    scrolled
                      ? "bg-[rgb(140,46,71)] text-white hover:bg-[rgb(120,40,61)] shadow-lg hover:shadow-xl"
                      : "bg-white text-[rgb(140,46,71)] hover:bg-gray-100 shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center space-x-2 relative z-10 py-8">
                    <span className="transition-all duration-300 group-hover:tracking-wider">
                      Contact Now
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden transition-all duration-500 ${
                scrolled
                  ? "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                  : "text-white hover:bg-white/20"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    </>
  );
};

export default Header;