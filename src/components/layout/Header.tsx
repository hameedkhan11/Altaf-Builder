"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import Link from "next/link";

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
        className={`fixed w-full h-20 transition-all duration-500 ease-in-out font-avenir ${
          scrolled
            ? "z-50 backdrop-blur-lg border-b bg-white dark:bg-purple-950/95 shadow-lg"
            : "z-50"
        } bg:opacity-0`}
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Link href={"/"} className="pl-12 cursor-pointer pt-6 flex items-center">
                <Image
                  src="/logos/altaf-logo.svg"
                  alt="Altaf Builder Text"
                  width={188}
                  height={138}
                  className="z-10"
                  priority
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-all duration-500 font-medium relative group ${
                    scrolled
                      ? "text-foreground hover:text-[rgb(140,46,71)] hover:font-bold"
                      : "text-white hover:text-[rgb(140,46,71)] hover:font-bold"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-[rgb(140,46,71)]
                    }`}
                  />
                </Link>
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
