// components/cards/BlogCard.tsx (Optimized Server Component)
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User } from 'lucide-react';
import { BlogCardProps } from '@/lib/blogs/types';
import { BlogCardAnimations } from '@/lib/styles/BlogsAnimation';

const BlogCard: React.FC<BlogCardProps> = ({
  post,
  index = 0,
  prioritizeLoading = false,
  enableAnimations = true,
}) => {
  const shouldPrioritize = prioritizeLoading || index < 3;
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const isoDate = post.publishedAt.toISOString();

  // Structured data for SEO (only include essential fields)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "url": `/blogs/${post.slug}`,
    "datePublished": isoDate,
    "author": {
      "@type": "Person",
      "name": post.author || "Author"
    },
    ...(post.image && {
      "image": {
        "@type": "ImageObject",
        "url": post.image
      }
    })
  };

  return (
    <>
      <article 
        className="blog-card group bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
        data-index={index}
        itemScope 
        itemType="https://schema.org/BlogPosting"
        style={{
          opacity: enableAnimations ? 0 : 1,
          transform: enableAnimations ? 'translateY(32px) scale(0.95)' : 'none',
        }}
      >
        {/* Image Container */}
        <div className="relative w-full h-48 sm:h-56 md:h-80 bg-gray-200 overflow-hidden">
          {post.image ? (
            <Image
              src={post.image}
              alt={`Featured image for ${post.title}`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={shouldPrioritize}
              loading={shouldPrioritize ? "eager" : "lazy"}
              itemProp="image"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <svg 
                className="w-12 h-12" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
          )}

          {/* Category Badge */}
          {post.category && (
            <div className="absolute top-3 left-3 animate-child" style={{ opacity: enableAnimations ? 0 : 1, transform: enableAnimations ? 'translateY(8px)' : 'none' }}>
              <span 
                className="bg-gradient-to-r from-[#8B2131] to-[#B91C1C] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg"
                itemProp="articleSection"
              >
                {post.category}
              </span>
            </div>
          )}

          {/* Featured badge */}
          {post.featured && (
            <div className="absolute top-3 right-3 animate-child" style={{ opacity: enableAnimations ? 0 : 1, transform: enableAnimations ? 'translateY(8px)' : 'none' }}>
              <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold uppercase">
                Featured
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
          {/* Meta Info */}
          <div className="flex items-center gap-3 text-sm mb-3 animate-child" style={{ opacity: enableAnimations ? 0 : 1, transform: enableAnimations ? 'translateY(8px)' : 'none' }}>
            <time dateTime={isoDate} itemProp="datePublished">
              {formattedDate}
            </time>
            
            {post.author && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <User className="w-3 h-3" />
                  <span className="truncate" itemProp="name">{post.author}</span>
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
          </div>

          {/* Title */}
          <h3 
            className="text-lg sm:text-xl mb-2 sm:mb-3 line-clamp-1 leading-tight group-hover:text-[#8B2131] transition-colors duration-300 animate-child"
            itemProp="headline"
            style={{ opacity: enableAnimations ? 0 : 1, transform: enableAnimations ? 'translateY(12px)' : 'none' }}
          >
            <Link 
              href={`/blogs/${post.slug}`}
              aria-label={`Read more about ${post.title}`}
              itemProp="url"
              className="hover:no-underline"
            >
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p 
            className="text-sm sm:text-base mb-4 line-clamp-2 flex-1 leading-relaxed animate-child"
            itemProp="description"
            style={{ opacity: enableAnimations ? 0 : 1, transform: enableAnimations ? 'translateY(8px)' : 'none' }}
          >
            {post.excerpt}
          </p>

          {/* Read More Link */}
          <div className="mt-auto pt-4 animate-child" style={{ opacity: enableAnimations ? 0 : 1, transform: enableAnimations ? 'translateY(8px)' : 'none' }}>
            <Link
              href={`/blogs/${post.slug}`}
              className="inline-flex items-center text-[#8B2131] hover:text-[#B91C1C] font-semibold text-sm uppercase tracking-wide transition-all duration-300 group/link"
              aria-label={`Read full article: ${post.title}`}
            >
              <span className="group-hover/link:translate-x-1 transition-transform duration-200">
                Read More
              </span>
              <svg 
                className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </article>

      {/* Client-side animations - only render if animations are enabled */}
      {enableAnimations && <BlogCardAnimations index={index} />}

      {/* Structured Data for SEO - only for first few posts to reduce HTML size */}
      {index < 10 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </>
  );
};

export default BlogCard;