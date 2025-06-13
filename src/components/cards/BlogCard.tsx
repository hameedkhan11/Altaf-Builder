// components/cards/BlogCard.tsx (Updated)
"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from 'lucide-react';

import {
  fadeInUp,
  microSlide,
  viewportOnce,
  delays,
  getPerformanceVariant,
} from "@/lib/constants";
import { BlogCardProps } from '@/lib/blogs/types';

const BlogCard: React.FC<BlogCardProps & { index?: number }> = ({ 
  post, 
  index = 0 
}) => {
  // Performance-aware animations
  const cardAnimation = getPerformanceVariant(fadeInUp);
  const contentAnimation = getPerformanceVariant(microSlide);
  
  return (
    <motion.div 
      className="group cursor-pointer rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      {...cardAnimation}
      transition={{
        ...cardAnimation.transition,
        delay: delays.stagger(index),
      }}
      viewport={viewportOnce}
      whileHover={{ y: -5 }}
    >
      {/* Image Container */}
      <motion.div 
        className="relative h-[340px] w-full overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] text-white rounded-full text-xs uppercase font-semibold tracking-wide">
            {post.category}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
           
      {/* Content Container */}
      <motion.div 
        className="p-6 space-y-4"
        {...contentAnimation}
        transition={{
          ...contentAnimation.transition,
          delay: delays.stagger(index) + delays.short,
        }}
        viewport={viewportOnce}
      >
        {/* Meta Info */}
        <motion.div 
          className="flex items-center gap-2 text-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delays.stagger(index) + delays.medium }}
          viewport={viewportOnce}
        >
          <div className="flex items-center gap-1">
            <span>{post.date}</span>
          </div>
          
          {post.author && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span className='line-clamp-1'>{post.author}</span>
              </div>
            </>
          )}
          
          {post.readTime && (
            <>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime}</span>
              </div>
            </>
          )}
        </motion.div>
                
        {/* Title */}
        <motion.h3 
          className="text-xl font-semibold  line-clamp-1 group-hover:text-[#8B2131] transition-colors leading-tight"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delays.stagger(index) + delays.long }}
          viewport={viewportOnce}
        >
          {post.title}
        </motion.h3>
                
        {/* Excerpt */}
        <motion.p 
          className="text-sm leading-relaxed line-clamp-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delays.stagger(index) + delays.long + 0.1 }}
          viewport={viewportOnce}
        >
          {post.excerpt}
        </motion.p>
                
        {/* Read More Link */}
        <motion.div
          className="pt-2"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: delays.stagger(index) + delays.long + 0.2 }}
          viewport={viewportOnce}
        >
          <Link 
            href={`/blogs/${post.slug}`}
            className="inline-flex items-center font-bold text-[#8B2131] gap-2 transition-colors group/link text-sm uppercase tracking-wide hover:text-[#B91C1C]"
          >
            <motion.span
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              READ MORE
            </motion.span>
            <motion.div
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BlogCard;