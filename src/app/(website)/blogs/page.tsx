// app/blog/page.tsx - Usage Example
"use client";
import BlogLandingPage from '@/components/sections/blogs/BlogLandingPage';
import { getFeaturedPost, getRegularPosts, sampleBlogPosts } from '@/data/blogs/data';
import React from 'react';

export default function BlogPage() {
  // Get the featured post (latest or marked as featured)
  const featuredPost = getFeaturedPost(sampleBlogPosts);
  
  // Get regular posts excluding the featured one, limit to 6 for initial load
  const regularPosts = getRegularPosts(sampleBlogPosts, true).slice(0, 6);

  // If no featured post found, use the first post as featured
  const displayFeaturedPost = featuredPost || regularPosts[0];
  const displayRegularPosts = featuredPost ? regularPosts : regularPosts.slice(1);

  return (
    <BlogLandingPage
      featuredPost={displayFeaturedPost}
      regularPosts={displayRegularPosts}
      hasMore={getRegularPosts(sampleBlogPosts, true).length > 6}
    />
  );
}