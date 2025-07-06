// components/BlogGrid.tsx
"use client";
import React from 'react';
import { motion } from "framer-motion";
import { BlogGridProps } from '@/lib/blogs/types';
import BlogCard from '@/components/cards/BlogCard';
import {
  fadeInUp,
  batchStagger,
  viewportDefault,
  viewportOnce,
  delays,
  getPerformanceVariant,
} from "@/lib/constants";

const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  showLoadMore = true,
  onLoadMore,
  loading = false
}) => {
  // Performance-aware animations
  const headerAnimation = getPerformanceVariant(fadeInUp);
  const lazyBatchStagger = batchStagger;

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          {...headerAnimation}
          viewport={viewportDefault}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: delays.short }}
            viewport={viewportOnce}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">
              Latest Articles
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] mx-auto rounded-full" />
          </motion.div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-4 mb-8 sm:mb-10 md:mb-12"
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

        {/* Load More Button */}
        {showLoadMore && onLoadMore && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: delays.medium }}
            viewport={viewportOnce}
          >
            <motion.button
              onClick={onLoadMore}
              disabled={loading}
              className="comic-btn inline-block px-4 sm:px-5 py-2 sm:py-2.5 text-xl sm:text-2xl font-bold text-white bg-[rgb(140,46,71)] border-2 border-black rounded-[10px] shadow-[5px_5px_0px_#000] transition-all duration-300 ease-in-out cursor-pointer hover:bg-white hover:text-[rgb(140,46,71)] hover:border-[#35003c] hover:shadow-[5px_5px_0px_#820853] active:bg-[#820853] active:shadow-none active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <motion.div
                    className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full mr-2 sm:mr-3"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-base sm:text-xl md:text-2xl">Loading...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="text-base sm:text-xl md:text-2xl">Load More Articles</span>
                  <motion.div
                    className="ml-2"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    ↓
                  </motion.div>
                </span>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Empty State */}
        {posts.length === 0 && (
          <motion.div
            className="text-center py-12 sm:py-16"
            {...fadeInUp}
            viewport={viewportOnce}
          >
            <div className="max-w-md mx-auto">
              <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 sm:w-12 h-10 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Articles Found</h3>
              <p className="text-gray-500 text-base sm:text-lg">
                We couldn&apos;t find any articles at the moment. Please check back later for new content.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;