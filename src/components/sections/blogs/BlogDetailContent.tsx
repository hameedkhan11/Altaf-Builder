// components/blog-detail/BlogDetailContent.tsx
"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  User,
  Calendar,
  ArrowLeft,
  Quote,
} from "lucide-react";
import { BlogPost } from "@/lib/blogs/types";
import {
  fadeInLeft,
  viewportOnce,
  getPerformanceVariant,
} from "@/lib/constants";
import { BlogContentData } from "@/data/blogs/blog-content";
import { CldImage } from "next-cloudinary";

interface BlogDetailContentProps {
  post: BlogPost;
  blogContent: BlogContentData;
}

const BlogDetailContent: React.FC<BlogDetailContentProps> = ({
  post,
  blogContent,
}) => {
  const contentAnimation = getPerformanceVariant(fadeInLeft);

  return (
    <>
      {/* Article Header */}
      <header className="p-4 sm:p-6 md:p-8 border-b border-gray-100">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 hover:text-[#8B2131] transition-colors mb-4 md:mb-6 text-sm md:text-base"
          aria-label="Back to Blogs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blogs</span>
        </Link>

        {/* Category and Meta */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm mb-4">
          <span className="px-3 py-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] text-white rounded-full text-xs uppercase font-semibold tracking-wide">
            {post.category}
          </span>

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            {post.author && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm">{post.author}</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm">{post.date}</span>
            </div>

            {post.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm">{post.readTime}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="p-4 sm:p-6 md:p-8">
        {/* Introduction */}
        <motion.section
          id="introduction"
          className="mb-6 md:mb-8"
          {...contentAnimation}
          viewport={viewportOnce}
        >
          <h2 className="text-xl md:text-2xl mb-3 md:mb-4">Introduction</h2>
          <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6">
            {blogContent.introduction}
          </p>
        </motion.section>

        {/* First Image Section */}
        <motion.figure
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={viewportOnce}
        >
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[600px] w-full overflow-hidden">
            <CldImage
              src="imgi_9_1746009430376_esejfm"
              alt="Luxury Interior Design - Modern luxury living spaces"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              priority
            />
          </div>
          <figcaption className="text-xs md:text-sm mt-2 text-center italic">
            Modern luxury living spaces that define contemporary elegance
          </figcaption>
        </motion.figure>

        {/* Main Content Sections */}
        {blogContent.mainContent.map((section, index) => (
          <motion.section
            key={section.id}
            id={section.id}
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            viewport={viewportOnce}
          >
            <h2 className="text-xl md:text-2xl mb-3 md:mb-4">
              {section.heading}
            </h2>
            <p className="leading-relaxed mb-4 md:mb-6">
              {section.content}
            </p>
          </motion.section>
        ))}

        {/* Second Image Section */}
        <motion.figure
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={viewportOnce}
        >
          <div className="relative  w-full overflow-hidden rounded-">
            <CldImage
              src="imgi_4_default_is216q"
              alt="Sustainable Architecture - Eco-friendly luxury development"
              height={400}
              width={1000}
              className="object-cover hover:scale-105 transition-transform duration-500 bg-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
            />
          </div>
          <figcaption className="text-xs md:text-sm mt-2 text-center italic">
            Sustainable luxury development practices for the future
          </figcaption>
        </motion.figure>

        {/* Quote Section */}
        <motion.blockquote
          className="bg-gradient-to-r from-[#8B2131]/5 to-[#B91C1C]/5 rounded-xl p-4 md:p-8 mb-6 md:mb-8 border-l-4 border-[#8B2131]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          viewport={viewportOnce}
        >
          <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#8B2131] mb-3 md:mb-4" />
          <p className="text-base md:text-lg italic mb-3 md:mb-4 ">
            &quot;Luxury is not about having the most expensive things,
            but about creating spaces that enhance and elevate the human
            experience.&quot;
          </p>
          <cite className="text-sm font-semibold ">
            - Altaf Development Philosophy
          </cite>
        </motion.blockquote>

        {/* Conclusion */}
        <motion.section
          id="conclusion"
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={viewportOnce}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Conclusion</h2>
          <p className="leading-relaxed">{blogContent.conclusion}</p>
        </motion.section>

        {/* CTA Section */}
        <motion.div
          className="bg-[rgb(140,46,71)] rounded-xl p-6 md:p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={viewportOnce}
        >
          <h3 className="text-xl md:text-2xl mb-3 md:mb-4 text-white">
            Ready to Experience Luxury Living?
          </h3>
          <p className="mb-4 md:mb-6 opacity-90 text-sm md:text-base">
            Discover our latest developments and find your dream home
            with Altaf Development.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#8B2131] px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
            aria-label="Contact us to learn more about luxury properties"
          >
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default BlogDetailContent;