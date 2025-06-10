// components/BlogCard.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import { BlogCardProps } from '@/lib/types';
import {
  fadeInUp,
  microSlide,
  scaleOnHover,
  viewportOnce,
  delays,
  getPerformanceVariant,
} from "@/lib/constants";

const BlogCard: React.FC<BlogCardProps & { index?: number }> = ({ 
  post, 
  variant = 'default',
  index = 0 
}) => {
  // Performance-aware animations
  const cardAnimation = getPerformanceVariant(fadeInUp);
  const contentAnimation = getPerformanceVariant(microSlide);
  
  return (
    <motion.div 
      className="group cursor-pointer"
      {...cardAnimation}
      transition={{
        ...cardAnimation.transition,
        delay: delays.stagger(index),
      }}
      viewport={viewportOnce}
    >
      {/* Image Container */}
      <motion.div 
        className="relative h-[360px] w-full overflow-hidden mb-4 rounded-md"
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
      </motion.div>
           
      {/* Content Container */}
      <motion.div 
        className="space-y-3"
        {...contentAnimation}
        transition={{
          ...contentAnimation.transition,
          delay: delays.stagger(index) + delays.short,
        }}
        viewport={viewportOnce}
      >
        {/* Category and Date */}
        <motion.div 
          className="flex items-center gap-2 text-sm text-gray-500 uppercase tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delays.stagger(index) + delays.medium }}
          viewport={viewportOnce}
        >
          <span className="font-medium">{post.category}</span>
          <span>-</span>
          <span>{post.date}</span>
        </motion.div>
                
        {/* Title */}
        <motion.h3 
          className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-gray-700 transition-colors leading-tight"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delays.stagger(index) + delays.long }}
          viewport={viewportOnce}
        >
          {post.title}
        </motion.h3>
                
        {/* Excerpt */}
        <motion.p 
          className="text-gray-600 text-sm leading-relaxed line-clamp-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delays.stagger(index) + delays.long + 0.1 }}
          viewport={viewportOnce}
        >
          {post.excerpt}
        </motion.p>
                
        {/* Read More Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: delays.stagger(index) + delays.long + 0.2 }}
          viewport={viewportOnce}
        >
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center font-bold text-[rgb(140,46,71)] gap-2 transition-colors group/link text-sm uppercase tracking-wide"
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
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BlogCard;