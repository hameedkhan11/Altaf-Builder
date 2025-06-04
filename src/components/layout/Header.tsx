"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import MobileMenu from "./MobileMenu";
import Image from "next/image";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Start transition when scrolled more than 100px
      setScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed w-full h-20 transition-all duration-500 ease-in-out ${
          scrolled
            ? "z-50 backdrop-blur-lg border-b bg-white/95 dark:bg-purple-950/95 shadow-lg"
            : "z-20 bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background image overlay for initial state */}
        {!scrolled && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url('/images/ravi-patel-qsMGnaxDGuw-unsplash.jpg')",
            }}
          />
        )}

        {/* Gradient overlay for better text readability */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            scrolled
              ? "bg-transparent"
              : "bg-gradient-to-r from-black/60 via-black/40 to-black/20"
          }`}
        />

        <div className="container mx-auto px-6 h-full relative z-10">
          <div className="flex items-center justify-between h-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              {/* Logo section with two images */}
              <div className="relative flex items-center">
                <Image
                  src="/logos/removal-809.png"
                  alt="Altaf Builder Logo"
                  width={100}
                  height={34}
                  className="object-contain z-10 pt-4"
                  priority
                />
                <Image
                  src="/logos/altaf.png"
                  alt="Altaf Builder Text"
                  width={100}
                  height={32}
                  className="object-contain -ml-12 z-0"
                  priority
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`transition-all duration-500 font-medium relative group ${
                    scrolled
                      ? "text-foreground hover:text-indigo-600"
                      : "text-white hover:text-indigo-300"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      scrolled ? "bg-indigo-600" : "bg-indigo-400"
                    }`}
                  />
                </a>
              ))}

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`transition-colors duration-500 ${
                    scrolled
                      ? "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className={`transition-colors duration-500 ${
                    scrolled
                      ? "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {isDark ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden transition-colors duration-500 ${
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
