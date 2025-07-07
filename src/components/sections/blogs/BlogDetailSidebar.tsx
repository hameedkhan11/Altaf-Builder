// components/blog-detail/BlogDetailSidebar.tsx
import React from "react";
import { BlogPost } from "@/lib/blogs/types";
import SocialShare from "./SocialShare";
import TableOfContents from "./TableOfContent";

interface BlogDetailSidebarProps {
  post: BlogPost;
  currentUrl: string;
  tocSections: { heading: string; id: string }[];
}

const BlogDetailSidebar: React.FC<BlogDetailSidebarProps> = ({
  post,
  currentUrl,
  tocSections,
}) => {
  return (
    <aside 
      className="space-y-6" 
      role="complementary" 
      aria-label="Blog sidebar"
    >
      {/* Table of Contents - Hidden on mobile, shown on larger screens */}
      <div className="hidden lg:block">
        <TableOfContents sections={tocSections} />
      </div>
      
      {/* Social Share */}
      <SocialShare post={post} currentUrl={currentUrl} />
    </aside>
  );
};

export default BlogDetailSidebar;