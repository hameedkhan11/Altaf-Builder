// components/cards/BlogCardClient.tsx (Client Component)
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import {
  fadeInUp,
  microSlide,
  viewportOnce,
  delays,
  getPerformanceVariant,
} from "@/lib/constants";
import { BlogPost } from '@/lib/blogs/types';

interface BlogCardClientProps {
  post: BlogPost;
  index: number;
  priority: boolean;
  serverContent: React.ReactNode;
}

const BlogCardClient: React.FC<BlogCardClientProps> = ({ 
  post, 
  index,
  priority,
  serverContent
}) => {
  const [isClient, setIsClient] = useState(false);
  const cardRef = React.useRef(null);
  const isInView = useInView(cardRef, { once: true });

  // Hydration handling - show server content until client is ready
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Format date
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const isoDate = post.publishedAt.toISOString();

  // Performance-aware animations from lib/constants
  const cardAnimation = getPerformanceVariant(fadeInUp);
  const contentAnimation = getPerformanceVariant(microSlide);

  // Show server content during SSR and hydration
  if (!isClient) {
    return <>{serverContent}</>;
  }

  return (
    <motion.article 
      ref={cardRef}
      className="group cursor-pointer rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col bg-white"
      {...cardAnimation}
      transition={{
        ...cardAnimation.transition,
        delay: delays.stagger(index),
      }}
      viewport={viewportOnce}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Image Container */}
      <motion.div 
        className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden bg-gray-200"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={post.image}
            alt={`Featured image for ${post.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </motion.div>
        
        {/* Category Badge */}
        <motion.div 
          className="absolute top-4 left-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: delays.stagger(index) + delays.short, duration: 0.3 }}
        >
          <span className="px-3 py-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] text-white rounded-full text-xs uppercase font-semibold tracking-wide shadow-lg">
            {post.category}
          </span>
        </motion.div>

        {/* Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
           
      {/* Content Container */}
      <motion.div 
        className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col space-y-4"
        {...contentAnimation}
        transition={{
          ...contentAnimation.transition,
          delay: delays.stagger(index) + delays.short,
        }}
        viewport={viewportOnce}
      >
        {/* Meta Info */}
        <motion.div 
          className="flex items-center gap-3 text-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delays.stagger(index) + delays.medium }}
          viewport={viewportOnce}
        >
          <time dateTime={isoDate}>{formattedDate}</time>
          
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
          className="text-lg sm:text-xl font-bold line-clamp-1 group-hover:text-[#8B2131] transition-colors leading-tight"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delays.stagger(index) + delays.long }}
          viewport={viewportOnce}
        >
          <Link 
            href={`/blogs/${post.slug}`}
            aria-label={`Read more about ${post.title}`}
          >
            {post.title}
          </Link>
        </motion.h3>
                
        {/* Excerpt */}
        <motion.p 
          className=" text-sm sm:text-base leading-relaxed line-clamp-2 flex-1"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delays.stagger(index) + delays.long + 0.1 }}
          viewport={viewportOnce}
        >
          {post.excerpt}
        </motion.p>
                
        {/* Read More Link */}
        <motion.div
          className="pt-2 mt-auto"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: delays.stagger(index) + delays.long + 0.2 }}
          viewport={viewportOnce}
        >
          <Link 
            href={`/blogs/${post.slug}`}
            className="inline-flex items-center font-bold text-[#8B2131] gap-2 transition-colors group/link text-sm uppercase tracking-wide hover:text-[#B91C1C]"
            aria-label={`Read full article: ${post.title}`}
          >
            <motion.span
              whileHover={{ x: 3 }}
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
    </motion.article>
  );
};

export default BlogCardClient;