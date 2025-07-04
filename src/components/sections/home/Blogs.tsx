// components/BlogSection.tsx (Updated)
"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import BlogCard from '@/components/cards/BlogCard';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleOnHover,
  batchStagger,
  viewportOnce,
  viewportDefault,
  delays,
  // shouldAnimate,
  // getPerformanceMode,
  getPerformanceVariant,
} from "@/lib/constants";
import { BlogSectionProps } from '@/lib/blogs/types';

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
  // const underlineAnimation = shouldAnimate()
  //   ? {
  //       initial: { scaleX: 0 },
  //       animate: { scaleX: 1 },
  //       transition: {
  //         duration:
  //           getPerformanceMode() === "fast"
  //             ? 0.6
  //             : getPerformanceMode() === "slow"
  //             ? 1.0
  //             : 0.8,
  //         delay: delays.medium,
  //         ease: "easeOut",
  //       },
  //     }
  //   : {
  //       initial: { scaleX: 1 },
  //       animate: { scaleX: 1 },
  //       transition: { duration: 0 },
  //     };

  // Get latest posts (sorted by publishedAt date)
  const latestPosts = posts
    .sort((a, b) => new Date(b.publishedAt || b.date).getTime() - new Date(a.publishedAt || a.date).getTime())
    .slice(0, 6); // Show maximum 6 posts

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Header - Performance optimized */}
        <motion.div
          className="flex flex-col sm:flex-row items-start justify-between mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6"
          {...headerAnimation}
          viewport={viewportDefault}
        >
          <motion.div 
            className="flex items-center w-full sm:w-auto"
            {...titleAnimation} 
            viewport={viewportOnce}
          >
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide leading-tight">
                {title}
              </h2>
              {/* <motion.div
                className="w-full h-0.5 bg-[rgb(140,46,71)] rounded-full mt-1 sm:mt-2"
                {...underlineAnimation}
                viewport={viewportOnce}
                style={{ transformOrigin: "left" }}
              /> */}
            </div>
          </motion.div>
          
          {showSeeAll && (
          <motion.div
              {...buttonAnimation}
              viewport={viewportOnce}
              className='w-full sm:w-auto flex justify-center sm:justify-end'
            >
              <Link
                href="/blogs"
                className="comic-button text-white py-2 sm:py-3 px-4 sm:px-6 text-xs sm:text-sm uppercase tracking-wide object-cover"
              >
                <motion.span
                  {...scaleOnHover}
                  className="flex font-bold active:text-white"
                >
                  SEE ALL BLOGS
                  {/* <ArrowIcon /> */}
                </motion.span>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Blog Grid - Batch staggered for performance */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          {...lazyBatchStagger.container}
          viewport={viewportDefault}
        >
          {latestPosts.map((post, index) => (
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

        {/* Empty State */}
        {latestPosts.length === 0 && (
          <motion.div
            className="text-center py-8 sm:py-12 px-4"
            {...fadeInUp}
            viewport={viewportOnce}
          >
            <div className="max-w-sm sm:max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Blog Posts Available</h3>
              <p className="text-gray-500 text-base sm:text-lg font-optima">Check back later for new content and updates.</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;