// components/BlogDetailPage.tsx
"use client";
import React from "react";
import { BlogPost } from "@/lib/blogs/types";
import { fadeInUp, getPerformanceVariant, viewportOnce } from "@/lib/constants";
import { motion } from "framer-motion";
import Head from "next/head";
import { getBlogContent } from "@/data/blogs/blog-content";
import { generateBlogSEO, generateBreadcrumbSchema } from "@/lib/seo/seo-utils";
import BlogDetailHero from "./BlogDetailHero";
import BlogDetailContent from "./BlogDetailContent";
import BlogDetailSidebar from "./BlogDetailSidebar";
import RelatedBlogs from "./RelatedBlogs";

interface BlogDetailPageProps {
  post: BlogPost;
  currentUrl: string;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  post,
  currentUrl,
}) => {
  const containerAnimation = getPerformanceVariant(fadeInUp);
  const blogContent = getBlogContent(post);

  // Generate table of contents
  const tocSections = [
    { heading: "Introduction", id: "introduction" },
    ...blogContent.mainContent.map(section => ({
      heading: section.heading,
      id: section.id
    })),
    { heading: "Conclusion", id: "conclusion" }
  ];

  // Generate SEO data
  const seoData = generateBlogSEO(post, blogContent, currentUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(post, currentUrl);

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta property="og:title" content={seoData.ogTitle} />
        <meta property="og:description" content={seoData.ogDescription} />
        <meta property="og:url" content={seoData.ogUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={seoData.ogImage} />
        <meta property="og:site_name" content="Altaf Development" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.twitterTitle} />
        <meta name="twitter:description" content={seoData.twitterDescription} />
        <meta name="twitter:image" content={seoData.twitterImage} />
        <meta name="author" content={seoData.author} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={seoData.canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Article Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.articleSchema)
          }}
        />
        
        {/* Breadcrumb Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
      </Head>

      <div className="min-h-screen">
        {/* Hero Section */}
        <BlogDetailHero post={post} />

        {/* Main Content Container */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 md:py-16">
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8 items-start">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <motion.article
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                {...containerAnimation}
                viewport={viewportOnce}
                id="main-article"
              >
                <BlogDetailContent post={post} blogContent={blogContent} />
              </motion.article>
            </div>

            {/* Sidebar - This will contain the sticky elements */}
            <div className="lg:col-span-1">
              <div className="relative">
                <BlogDetailSidebar 
                  post={post} 
                  currentUrl={currentUrl} 
                  tocSections={tocSections} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Related Blogs Section */}
        <RelatedBlogs currentPost={post} />
      </div>
    </>
  );
};

export default BlogDetailPage;