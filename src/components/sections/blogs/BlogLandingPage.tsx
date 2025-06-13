// pages/blog/BlogLandingPage.tsx
"use client";
import { HeroSection } from '@/components/common/Hero';
import { getRegularPosts, sampleBlogPosts } from '@/data/blogs/data';
import { BlogLandingPageProps } from '@/lib/blogs/types';
import React, { useState, useCallback } from 'react';
import FeaturedBlog from './FeaturedBlogs';
import BlogGrid from './BlogGrid';
const BlogLandingPage: React.FC<BlogLandingPageProps> = ({
  featuredPost,
  regularPosts: initialPosts,
  hasMore = true,
  onLoadMore,
  loading = false
}) => {
  const [posts, setPosts] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(hasMore);

  // Handle load more functionality
  const handleLoadMore = useCallback(async () => {
    if (onLoadMore) {
      setIsLoading(true);
      try {
        await onLoadMore();
      } catch (error) {
        console.error('Error loading more posts:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Default behavior - simulate loading more posts
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const currentLength = posts.length;
        const remainingPosts = getRegularPosts(sampleBlogPosts).slice(currentLength);
        const newPosts = remainingPosts.slice(0, 6); // Load 6 more posts
        
        setPosts(prev => [...prev, ...newPosts]);
        setHasMorePosts(remainingPosts.length > 6);
        setIsLoading(false);
      }, 1000);
    }
  }, [onLoadMore, posts.length]);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Blog"
        subtitle="Insights & Updates"
        backgroundImage="/images/Booking3.jpg"
        page="Blogs"
      />

      {/* Featured Blog Section */}
      <FeaturedBlog post={featuredPost} />

      {/* Blog Grid Section */}
      <BlogGrid
        posts={posts}
        showLoadMore={hasMorePosts}
        onLoadMore={handleLoadMore}
        loading={isLoading || loading}
      />
    </>
  );
};

export default BlogLandingPage;