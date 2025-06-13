// components/BlogDetailPage.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  User,
  Calendar,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ArrowLeft,
  Quote,
} from "lucide-react";
import { BlogPost } from "@/lib/blogs/types";
import {
  fadeInUp,
  fadeInLeft,
  viewportOnce,
  getPerformanceVariant,
  scaleOnHover,
  fadeInRight,
} from "@/lib/constants";
import { HeroSection } from "@/components/common/Hero";
import BlogCard from "@/components/cards/BlogCard";
import { sampleBlogPosts } from "@/data/blogs/data";

// Social Share Component
const buttonAnimation = getPerformanceVariant(fadeInRight);
const SocialShare: React.FC<{ post: BlogPost; currentUrl: string }> = ({
  post,
  currentUrl,
}) => {
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      currentUrl
    )}&text=${encodeURIComponent(post.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`,
  };

  return (
    <motion.div
      className="sticky top-8 bg-white rounded-lg shadow-lg p-4 border"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-semibold">Share</span>
      </div>

      <div className="flex flex-col gap-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
        >
          <Facebook className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-blue-600">Facebook</span>
        </a>

        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors group"
        >
          <Twitter className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-sky-600">Twitter</span>
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
        >
          <Linkedin className="w-4 h-4 text-blue-700 group-hover:scale-110 transition-transform" />
          <span className="text-sm text-blue-700">LinkedIn</span>
        </a>
      </div>
    </motion.div>
  );
};

// Related Blogs Component
const RelatedBlogs: React.FC<{ currentPost: BlogPost }> = ({ currentPost }) => {
  // Get related posts based on category, excluding current post
  const getRelatedPosts = (
    currentPost: BlogPost,
    limit: number = 3
  ): BlogPost[] => {
    // First, try to get posts from the same category
    const sameCategoryPosts = sampleBlogPosts.filter(
      (post) =>
        post.category === currentPost.category && post.id !== currentPost.id
    );

    // If we have enough posts from the same category, return them
    if (sameCategoryPosts.length >= limit) {
      return sameCategoryPosts.slice(0, limit);
    }

    // Otherwise, fill with other recent posts
    const otherPosts = sampleBlogPosts.filter(
      (post) => post.id !== currentPost.id
    );
    const relatedPosts = [...sameCategoryPosts];

    // Add other posts until we reach the limit
    for (const post of otherPosts) {
      if (relatedPosts.length >= limit) break;
      if (!relatedPosts.some((p) => p.id === post.id)) {
        relatedPosts.push(post);
      }
    }

    return relatedPosts.slice(0, limit);
  };

  const relatedPosts = getRelatedPosts(currentPost);

  if (relatedPosts.length === 0) return null;

  return (
    <motion.section
      className="py-16 bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={viewportOnce}
    >
      <div className="container mx-auto px-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={viewportOnce}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Related Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover more insights and trends in luxury real estate
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
          {relatedPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View All Blogs Link */}
        <span className="flex mx-auto justify-center items-center">
          <motion.div {...buttonAnimation} viewport={viewportOnce}>
            <Link
              href="/blogs"
              className="comic-button text-white py-3 text-sm uppercase tracking-wide object-cover"
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
        </span>
      </div>
    </motion.section>
  );
};

// Main Blog Detail Component
interface BlogDetailPageProps {
  post: BlogPost;
  currentUrl: string;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  post,
  currentUrl,
}) => {
  const containerAnimation = getPerformanceVariant(fadeInUp);
  const contentAnimation = getPerformanceVariant(fadeInLeft);

  // Sample detailed content for the blog post
  const getBlogContent = (post: BlogPost) => {
    switch (post.id) {
      case "1":
        return {
          introduction:
            "The luxury real estate market in 2025 is experiencing unprecedented transformation. As we navigate through changing consumer preferences and technological advancements, Altaf Development remains at the forefront of innovation, creating spaces that redefine modern luxury living.",

          mainContent: [
            {
              heading: "Smart Integration Revolution",
              content:
                "Today's luxury buyers expect seamless integration of technology into their living spaces. From AI-powered climate control systems to voice-activated home automation, smart homes are no longer a luxury—they're an expectation. Our latest developments feature cutting-edge IoT integration that learns from residents' habits and preferences, creating truly personalized living experiences.",
            },
            {
              heading: "Sustainable Luxury Redefined",
              content:
                "Environmental consciousness has become a cornerstone of luxury living. Our developments incorporate solar energy systems, rainwater harvesting, and energy-efficient designs without compromising on opulence. Green buildings not only reduce environmental impact but also offer significant long-term cost savings for homeowners.",
            },
            {
              heading: "Wellness-Centered Design",
              content:
                "The pandemic has shifted focus toward health and wellness in residential design. Our properties feature dedicated wellness zones, air purification systems, and biophilic design elements that promote mental and physical well-being. Natural light optimization and green spaces are integral to our architectural philosophy.",
            },
          ],

          conclusion:
            "As we look toward the future, Altaf Development continues to innovate and set new standards in luxury real estate. Our commitment to excellence, sustainability, and cutting-edge design ensures that our properties remain valuable investments for generations to come.",
        };

      case "2":
        return {
          introduction:
            "The integration of smart home technology in luxury properties has evolved from a novelty to an essential feature. At Altaf Development, we understand that modern luxury is defined by seamless connectivity and intelligent automation.",

          mainContent: [
            {
              heading: "Advanced Home Automation Systems",
              content:
                "Our luxury properties feature comprehensive automation systems that control lighting, temperature, security, and entertainment through unified platforms. These systems learn from user behavior to optimize energy consumption while maintaining perfect comfort levels throughout the day.",
            },
            {
              heading: "Security and Privacy Enhancement",
              content:
                "State-of-the-art security systems with facial recognition, biometric access, and AI-powered monitoring ensure complete privacy and safety. Smart locks, surveillance cameras, and alarm systems are seamlessly integrated into the home's architecture without compromising aesthetic appeal.",
            },
            {
              heading: "Energy Management and Efficiency",
              content:
                "Intelligent energy management systems monitor and optimize power consumption across all connected devices. Solar panels, smart thermostats, and automated lighting systems work together to reduce environmental impact while maintaining luxury standards.",
            },
          ],

          conclusion:
            "Smart home technology in luxury properties represents the perfect marriage of convenience, security, and sustainability. Our developments ensure that residents enjoy the ultimate in modern living while maintaining the highest standards of luxury and comfort.",
        };

      default:
        return {
          introduction:
            "This comprehensive guide explores the latest trends and innovations in luxury real estate, providing insights into what defines premium living in today's market.",

          mainContent: [
            {
              heading: "Market Dynamics and Trends",
              content:
                "The luxury real estate market continues to evolve with changing consumer preferences and economic conditions. Understanding these dynamics is crucial for both investors and homebuyers seeking premium properties.",
            },
            {
              heading: "Design and Architecture Excellence",
              content:
                "Contemporary luxury properties showcase innovative architectural designs that blend functionality with aesthetic appeal. From minimalist modern styles to classical elegance, each development tells a unique story.",
            },
            {
              heading: "Investment Opportunities",
              content:
                "Luxury real estate remains a stable investment option with strong potential for appreciation. Strategic location selection and premium amenities contribute to long-term value growth.",
            },
          ],

          conclusion:
            "The luxury real estate sector continues to thrive, driven by innovation, quality, and attention to detail. Altaf Development remains committed to creating exceptional properties that exceed expectations.",
        };
    }
  };

  const blogContent = getBlogContent(post);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title={post.title}
        subtitle={post.excerpt}
        backgroundImage="/images/Booking1.jpg"
        page="Blogs"
        blogTitle={post.title}
      />

      {/* Main Content */}
      <div className="container mx-auto px-16 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <motion.article
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              {...containerAnimation}
              viewport={viewportOnce}
            >
              {/* Article Header */}
              <div className="p-8 border-b border-gray-100">
                {/* Back Button */}
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 hover:text-[#8B2131] transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Blogs</span>
                </Link>

                {/* Category and Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#8B2131] to-[#B91C1C] text-white rounded-full text-xs uppercase font-semibold tracking-wide">
                    {post.category}
                  </span>

                  <div className="flex items-center gap-4">
                    {post.author && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>

                    {post.readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl lg:text-5xl leading-tight mb-4">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-lg leading-relaxed">{post.excerpt}</p>
              </div>

              {/* Article Content */}
              <div className="p-8">
                {/* Introduction */}
                <motion.div
                  className="mb-8"
                  {...contentAnimation}
                  viewport={viewportOnce}
                >
                  <p className="text-lg leading-relaxed mb-6">
                    {blogContent.introduction}
                  </p>
                </motion.div>

                {/* First Image Section */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={viewportOnce}
                >
                  <div className="relative h-[600px] w-full overflow-hidden rounded-xl">
                    <Image
                      src="/images/event6.jpg"
                      alt="Luxury Interior Design"
                      fill
                      className="object-cover bg-cover"
                      sizes="(max-width: 768px) 100vw, 75vw"
                    />
                  </div>
                  <p className="text-sm mt-2 text-center italic">
                    Modern luxury living spaces that define contemporary
                    elegance
                  </p>
                </motion.div>

                {/* Main Content Sections */}
                {blogContent.mainContent.map((section, index) => (
                  <motion.div
                    key={index}
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={viewportOnce}
                  >
                    <h2 className="text-2xl font-bold mb-4">
                      {section.heading}
                    </h2>
                    <p className="leading-relaxed mb-6">{section.content}</p>
                  </motion.div>
                ))}

                {/* Second Image Section */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={viewportOnce}
                >
                  <div className="relative h-96 w-full overflow-hidden rounded-xl">
                    <Image
                      src="/images/event5.jpg"
                      alt="Sustainable Architecture"
                      fill
                      className="object-cover bg-center bg-cover"
                      sizes="(max-width: 768px) 100vw, 75vw"
                    />
                  </div>
                  <p className="text-sm mt-2 text-center italic">
                    Sustainable luxury development practices for the future
                  </p>
                </motion.div>

                {/* Quote Section */}
                <motion.div
                  className="bg-gradient-to-r from-[#8B2131]/5 to-[#B91C1C]/5 rounded-xl p-8 mb-8 border-l-4 border-[#8B2131]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={viewportOnce}
                >
                  <Quote className="w-8 h-8 text-[#8B2131] mb-4" />
                  <blockquote className="text-lg italic mb-4">
                    &quot;Luxury is not about having the most expensive things,
                    but about creating spaces that enhance and elevate the human
                    experience.&quot;
                  </blockquote>
                  <cite className="text-sm font-semibold">
                    - Altaf Development Philosophy
                  </cite>
                </motion.div>

                {/* Conclusion */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={viewportOnce}
                >
                  <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                  <p className="leading-relaxed">{blogContent.conclusion}</p>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                  className="bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-xl p-8 text-white text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={viewportOnce}
                >
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    Ready to Experience Luxury Living?
                  </h3>
                  <p className="mb-6 opacity-90">
                    Discover our latest developments and find your dream home
                    with Altaf Development.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block bg-white text-[#8B2131] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get In Touch
                  </Link>
                </motion.div>
              </div>
            </motion.article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SocialShare post={post} currentUrl={currentUrl} />
          </div>
        </div>
      </div>

      {/* Related Blogs Section */}
      <RelatedBlogs currentPost={post} />
    </div>
  );
};

export default BlogDetailPage;
