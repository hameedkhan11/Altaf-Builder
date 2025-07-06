// components/blog-detail/BlogDetailHero.tsx
"use client";
import React from "react";
import { BlogPost } from "@/lib/blogs/types";
import { Hero } from "@/components/common/Hero";

interface BlogDetailHeroProps {
  post: BlogPost;
}

const BlogDetailHero: React.FC<BlogDetailHeroProps> = ({ post }) => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blogs" },
    { label: post.title, href: "#" }
  ];

  return (
    <Hero
      // title={post.title}
      backgroundType="image"
      backgroundSrc="Booking2_wltkjn"
      breadcrumbs={breadcrumbs}
      height="screen"
      overlay="gradient"
      contentAlignment="left"
      enableAnimations={true}
      enableParallax={true}
      parallaxSpeed={0.3}
      ariaLabel={`Blog post: ${post.title}`}
    />
  );
};

export default BlogDetailHero;