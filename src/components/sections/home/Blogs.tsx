// components/BlogSection.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { BlogSectionProps } from '@/lib/types';
import BlogCard from '@/components/common/BlogCard';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleOnHover,
  batchStagger,
  viewportOnce,
  viewportDefault,
  delays,
  shouldAnimate,
  getPerformanceMode,
  getPerformanceVariant,
} from "@/lib/constants";

const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  title = "RECENT BLOGS",
  showSeeAll = true
}) => {
  // Performance-aware animations
  const headerAnimation = getPerformanceVariant(fadeInUp);
  const titleAnimation = getPerformanceVariant(fadeInLeft);
  const buttonAnimation = getPerformanceVariant(fadeInRight);
  const lazyBatchStagger = batchStagger;

  // Custom underline animation with performance awareness
  const underlineAnimation = shouldAnimate()
    ? {
        initial: { scaleX: 0 },
        animate: { scaleX: 1 },
        transition: {
          duration:
            getPerformanceMode() === "fast"
              ? 0.6
              : getPerformanceMode() === "slow"
              ? 1.0
              : 0.8,
          delay: delays.medium,
          ease: "easeOut",
        },
      }
    : {
        initial: { scaleX: 1 },
        animate: { scaleX: 1 },
        transition: { duration: 0 },
      };

  return (
    <section className="py-16">
      <div className="container mx-auto px-16 max-w-8xl">
        {/* Header - Performance optimized */}
        <motion.div
          className="flex items-start justify-between mb-12"
          {...headerAnimation}
          viewport={viewportDefault}
        >
          <motion.div 
            className="flex items-center"
            {...titleAnimation} 
            viewport={viewportOnce}
          >
            <div>
              <h2 className="uppercase tracking-wide dark:text-white">
                {title}
              </h2>
              <motion.div
                className="w-full h-0.5 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-full mt-2"
                {...underlineAnimation}
                viewport={viewportOnce}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </motion.div>
          
          {showSeeAll && (
            <motion.div
              {...buttonAnimation}
              viewport={viewportOnce}
            >
              <Link
                href="/blog"
                className="bg-red-700 text-white px-8 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-red-800 transition-colors"
              >
                <motion.span
                  {...scaleOnHover}
                  className="inline-block"
                >
                  SEE ALL BLOGS
                </motion.span>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Blog Grid - Batch staggered for performance */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          {...lazyBatchStagger.container}
          viewport={viewportDefault}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              {...lazyBatchStagger.item}
              transition={{
                ...lazyBatchStagger.item.transition,
                delay: delays.stagger(index),
              }}
            >
              <BlogCard
                post={post}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

        {posts.length === 0 && (
          <motion.div
            className="text-center py-12"
            {...fadeInUp}
            viewport={viewportOnce}
          >
            <p className="text-gray-500 text-lg">No blog posts available at the moment.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;