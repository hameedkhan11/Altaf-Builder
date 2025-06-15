// page.tsx
import { notFound } from 'next/navigation';
import BlogDetailPage from '@/components/sections/blogs/BlogDetail';
import { Metadata } from 'next';
import { getMetadata, getStaticParams } from '@/lib/actions/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // Await the params
  return await getMetadata(slug);
}

export default async function BlogSlugPage({ params }: PageProps) {
  const { slug } = await params; // Await the params
  const post = (await import('@/data/blogs/data')).sampleBlogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://altafdevelopment.com || altaf-builder.vercel.app'}/blogs/${slug}`;
  return <BlogDetailPage post={post} currentUrl={currentUrl} />;
}