// data/blogData.ts

import { BlogPost } from "@/lib/types";


export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'IMTIAZ ANNOUNCES KHABIB NURMAGOMEDOV AS...',
    excerpt: 'IMTIAZ announces Khabib Nurmagomedov as brand ambassador at launch of Beach Walk 4 in Dubai Islands During a special press...',
    image: '/images/property1.jpg',
    date: '05-05-2025',
    category: 'NEWS',
    slug: 'imtiaz-announces-khabib-nurmagomedov',
    readTime: '3 min read'
  },
  {
    id: '2',
    title: 'THE DUBAI PHENOMENON',
    excerpt: 'The emirate offers one of the world\'s most dynamic real estate markets for investors. This article is not merely a reflection on Dubai success...',
    image: '/images/property2.jpg',
    date: '04-04-2025',
    category: 'NEWS',
    slug: 'the-dubai-phenomenon',
    readTime: '5 min read'
  },
  {
    id: '3',
    title: 'IMTIAZ DEVELOPMENTS RECEIVES PRESTIGIOUS...',
    excerpt: 'In a landmark event, His Highness Shaikh Mohammad Bin Rashid Al Maktoum, Vice President and Prime Minister of the UAE and Ruler of...',
    image: '/images/property3.jpg',
    date: '27-03-2025',
    category: 'NEWS',
    slug: 'imtiaz-developments-receives-prestigious',
    readTime: '4 min read'
  }
];

export const getBlogPosts = (): BlogPost[] => {
  return mockBlogPosts;
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return mockBlogPosts.find(post => post.slug === slug);
};

export const getLatestPosts = (limit: number = 3): BlogPost[] => {
  return mockBlogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};